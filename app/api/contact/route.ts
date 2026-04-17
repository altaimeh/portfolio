import { NextResponse } from 'next/server'
import { z } from 'zod'

/* ── Validation schema ─────────────────────────────────────────────────── */
// Zod schema that mirrors the shape + rules the client-side form enforces.
// Running the same validation on the server prevents malformed or malicious
// payloads from reaching the email provider. Each `.min/.max/.email/.enum`
// doubles as the error message shown back to the user when validation fails.
const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').max(80),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.enum(['Full-time Role', 'Contract / Freelance', 'Collaboration', 'General Inquiry'], {
    error: () => 'Please select a subject.',
  }),
  message: z.string().min(1, 'Please enter a message.').max(2000),
})

/* ── POST /api/contact ─────────────────────────────────────────────────── */
/**
 * POST handler for the contact form endpoint.
 *
 * Flow:
 *   1. Parse the incoming JSON body.
 *   2. Validate it against `ContactSchema` — on failure return HTTP 422 so the
 *      client can render per-field error messages next to each input.
 *   3. Ensure the Resend API key is available — fail fast with HTTP 500 if not,
 *      so deploy misconfigurations surface clearly instead of silently dropping
 *      messages.
 *   4. Dynamically import the `resend` SDK (keeps cold-start bundles small) and
 *      call `resend.emails.send` with a styled HTML body.
 *   5. On a Resend error return HTTP 500 with the provider's error message;
 *      on success return `{ success: true, id }` so the client can show a
 *      confirmation state.
 *
 * The outer try/catch guards against thrown exceptions (e.g. malformed JSON,
 * network failures) and converts them into a generic 500 response.
 */
export async function POST(req: Request) {
  try {
    // Parse the request body as JSON, then run it through the Zod schema.
    // `safeParse` returns `{ success, data | error }` without throwing.
    const body = await req.json()
    const parsed = ContactSchema.safeParse(body)

    if (!parsed.success) {
      // 422 Unprocessable Entity — the request was well-formed JSON but the
      // values failed validation. `fieldErrors` is a { fieldName: [msg] } map
      // the UI uses to highlight the offending inputs.
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      )
    }

    // Pull the validated values and resolve the recipient address.
    // `CONTACT_EMAIL` lets the inbox be swapped without code changes;
    // falls back to a hard-coded default if the env var is missing.
    const { name, email, subject, message } = parsed.data
    const recipientEmail = process.env.CONTACT_EMAIL ?? 'taimeeh12@gmail.com'

    /* ── Send via Resend ─────────────────────────────────────────────── */
    // IMPORTANT: RESEND_API_KEY must be set in the deployment environment
    // (e.g. Vercel → Project → Settings → Environment Variables).
    // `.env.local` is only loaded during local `next dev` and is NOT uploaded
    // with your git push — so production deployments need the key added there.
    if (!process.env.RESEND_API_KEY) {
      // Guard against a deploy where the env var wasn't configured. We'd
      // rather return a clear error (so the form shows a visible failure)
      // than silently pretend the message was sent.
      console.error('[contact] RESEND_API_KEY is not set in this environment.')
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      )
    }

    // Dynamic import keeps the Resend SDK out of the initial route bundle —
    // it's only loaded once an actual submission arrives, which speeds up
    // cold starts on serverless platforms (Vercel, etc.).
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Fire the actual email send.
    // NOTE: With Resend's free tier, `from` must be onboarding@resend.dev
    // and `to` must be the email address that owns your Resend account.
    // Once you verify a custom domain at resend.com/domains, update `from`
    // to something like: Portfolio Contact <contact@yourdomain.com>.
    // `replyTo` is set to the visitor's email so hitting "Reply" in Gmail
    // responds to them directly, not to the onboarding@resend.dev mailbox.
    const { data, error } = await resend.emails.send({
      from: 'My website <onboarding@resend.dev>',
      to: [recipientEmail],
      replyTo: email,
      subject: `${subject} opportunity — from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
          <h2 style="border-bottom:2px solid #E0C58F;padding-bottom:8px;color:#112250">
            New message from your portfolio
          </h2>
          <table style="width:100%;border-collapse:collapse;margin:16px 0">
            <tr>
              <td style="padding:8px 0;color:#555;width:90px"><strong>Name</strong></td>
              <td style="padding:8px 0">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#555"><strong>Email</strong></td>
              <td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#555"><strong>Subject</strong></td>
              <td style="padding:8px 0">${subject}</td>
            </tr>
          </table>
          <div style="background:#f5f5f5;padding:16px;border-radius:8px;white-space:pre-wrap;line-height:1.6">
            ${message.replace(/\n/g, '<br/>')}
          </div>
          <p style="color:#999;font-size:12px;margin-top:24px">
            Sent from your website.
          </p>
        </div>
      `,
    })

    if (error) {
      // Resend returned a structured error (auth failure, invalid address,
      // free-tier restriction, rate limit, etc.). Surface its message to the
      // client and log the full object server-side for debugging.
      console.error('[contact] Resend error:', error)
      return NextResponse.json(
        { error: `Failed to send email: ${error.message ?? 'unknown error'}` },
        { status: 500 }
      )
    }

    // Success path — log the Resend message id for tracing in the dashboard
    // and hand it back to the client.
    console.log('[contact] Email queued with Resend:', data?.id)
    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    // Safety net for anything the happy path didn't anticipate
    // (invalid JSON body, Resend SDK throwing, network issues, etc.).
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
