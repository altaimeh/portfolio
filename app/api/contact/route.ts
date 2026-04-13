import { NextResponse } from 'next/server'
import { z } from 'zod'

/* ── Validation schema ─────────────────────────────────────────────────── */
const ContactSchema = z.object({
  name:    z.string().min(2,  'Name must be at least 2 characters.').max(80),
  email:   z.string().email('Please enter a valid email address.'),
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
    const recipientEmail = process.env.CONTACT_EMAIL ?? 'altaimee@example.com'

    /* ── Send via Resend (requires RESEND_API_KEY in .env.local) ─────── */
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(process.env.RESEND_API_KEY)

      const { error } = await resend.emails.send({
        from:    'Portfolio Contact <onboarding@resend.dev>',   // update to your verified domain
        to:      [recipientEmail],
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
        return NextResponse.json({ error: 'Failed to send email.' }, { status: 500 })
      }
    } else {
      /* ── Dev fallback — log to console when no API key is present ─── */
      console.log('\n📬 [contact] New message (RESEND_API_KEY not set — logging only)\n', {
        to: recipientEmail,
        from: `${name} <${email}>`,
        subject,
        message,
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
