import { NextResponse } from 'next/server'
import { z } from 'zod'

/* ── Validation schema ─────────────────────────────────────────────────── */
const ContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.').max(80),
  email: z.string().email('Please enter a valid email address.'),
  subject: z.enum(['Full-time Role', 'Contract / Freelance', 'Collaboration', 'General Inquiry'], {
    error: () => 'Please select a subject.',
  }),
  message: z.string().min(20, 'Message must be at least 20 characters.').max(2000),
})

/* ── POST /api/contact ─────────────────────────────────────────────────── */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = ContactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.flatten().fieldErrors },
        { status: 422 }
      )
    }

    const { name, email, subject, message } = parsed.data
    const recipientEmail = process.env.CONTACT_EMAIL ?? 'taimeeh12@gmail.com'

    /* ── Send via Resend ─────────────────────────────────────────────── */
    // IMPORTANT: RESEND_API_KEY must be set in the deployment environment
    // (e.g. Vercel → Project → Settings → Environment Variables).
    // `.env.local` is only loaded during local `next dev` and is NOT uploaded
    // with your git push — so production deployments need the key added there.
    if (!process.env.RESEND_API_KEY) {
      console.error('[contact] RESEND_API_KEY is not set in this environment.')
      return NextResponse.json(
        { error: 'Email service is not configured. Please try again later.' },
        { status: 500 }
      )
    }

    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    // NOTE: With Resend's free tier, `from` must be onboarding@resend.dev
    // and `to` must be the email address that owns your Resend account.
    // Once you verify a custom domain at resend.com/domains, update `from`
    // to something like: Portfolio Contact <contact@yourdomain.com>
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [recipientEmail],
      replyTo: email,
      subject: `[Portfolio] ${subject} — from ${name}`,
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
            Sent via portfolio contact form · altaimeehassan.com
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('[contact] Resend error:', error)
      return NextResponse.json(
        { error: `Failed to send email: ${error.message ?? 'unknown error'}` },
        { status: 500 }
      )
    }

    console.log('[contact] Email queued with Resend:', data?.id)
    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
