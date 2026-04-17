'use client'

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react'

/* ── Types ────────────────────────────────────────────────────────────── */
// Shape of the form's controlled inputs. Keys must match the `name` attribute
// on each <input>/<select>/<textarea> so the generic change handler works.
type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

// Per-field error bag. Each field may be missing (no error) or carry an array
// of string messages — matching the shape returned by Zod's `fieldErrors`.
type FieldErrors = Partial<Record<keyof FormState, string[]>>

// Lifecycle state of the form:
//   idle     → user is filling it out
//   loading  → submit is in-flight
//   success  → server confirmed the email was queued
//   error    → submit failed for reasons other than field validation
type Status = 'idle' | 'loading' | 'success' | 'error'

// Options shown in the Subject <select>. Kept in sync with the enum in
// app/api/contact/route.ts so server-side validation accepts them.
const SUBJECTS = [
  'Full-time Role',
  'Contract / Freelance',
  'Collaboration',
  'General Inquiry',
]

// Social links rendered in the left column of the contact section.
// `icon` is a short 2-letter glyph shown in the square avatar on the left.
const links = [
  { label: 'LinkedIn', value: 'linkedin.com/in/altaimee', href: 'https://linkedin.com/in/altaimee', icon: 'in' },
  { label: 'GitHub',   value: 'github.com/altaimeh',     href: 'https://github.com/altaimeh',      icon: 'gh' },
]

// Blank form used as the initial value and to reset the form after success.
const INITIAL: FormState = { name: '', email: '', subject: '', message: '' }

/* ── Component ────────────────────────────────────────────────────────── */
/**
 * Contact
 * -------
 * Section 05 — Contact. Left column shows an availability badge, a short
 * blurb and social links; right column shows a controlled contact form.
 *
 * The form validates inline on blur, then POSTs to /api/contact which
 * forwards the message to the site owner via Resend. Success swaps the
 * form out for a confirmation panel; errors are shown inline per field
 * (for 422s) or as a banner above the submit button (for 5xx / network).
 */
export default function Contact() {
  // Wrapper ref used by the IntersectionObserver to trigger the reveal
  // animation the first time the section scrolls into view.
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // `form` holds the live values of the four inputs.
  // `errors` is the current per-field validation error bag.
  // `touched` tracks which fields the user has blurred at least once, so
  //   we don't show "required" errors on untouched fields while they're
  //   still filling the form out.
  // `status` drives the submit button / success state / error banner.
  // `serverMsg` holds a human-readable message returned by the API for
  //   non-validation failures (500s, network problems).
  const [form, setForm]         = useState<FormState>(INITIAL)
  const [errors, setErrors]     = useState<FieldErrors>({})
  const [touched, setTouched]   = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [status, setStatus]     = useState<Status>('idle')
  const [serverMsg, setServerMsg] = useState('')

  /* Intersection observer */
  // Standard one-shot scroll reveal — flips `visible` the first time the
  // section enters view and then disconnects the observer.
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.05 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  /* ── Client-side validation (mirrors server schema) ─────────────────── */
  /**
   * Pure function that inspects the current form values and returns a
   * per-field error map. Mirrors the Zod schema on the server so the user
   * gets instant feedback without a round-trip, but the server still
   * re-validates on receipt as the source of truth.
   */
  function validate(data: FormState): FieldErrors {
    const errs: FieldErrors = {}
    if (!data.name || data.name.trim().length < 2)
      errs.name = ['Name must be at least 2 characters.']
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errs.email = ['Please enter a valid email address.']
    if (!data.subject)
      errs.subject = ['Please select a subject.']
    if (!data.message || data.message.trim().length < 20)
      errs.message = ['Message must be at least 20 characters.']
    return errs
  }

  /**
   * Generic onChange handler shared by all form inputs. Keeps the form
   * object in sync with the user's keystrokes, and — if the field has
   * already been blurred once — re-runs validation so the error message
   * for that field updates live as they type.
   */
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target
    const updated = { ...form, [name]: value }
    setForm(updated)
    if (touched[name as keyof FormState]) {
      setErrors(validate(updated))
    }
  }

  /**
   * onBlur handler for every input. Marks the field as "touched" (so its
   * errors may now render) and validates the whole form so the blurred
   * field's error message appears the moment focus leaves it.
   */
  function handleBlur(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    setErrors(validate(form))
  }

  /**
   * Form submission handler.
   *
   * Steps:
   *   1. Prevent the default full-page POST.
   *   2. Force every field to "touched" and validate — if anything is
   *      invalid, bail out (the inline errors are now visible).
   *   3. Flip status to `loading` and POST the payload to /api/contact.
   *   4. Branch on the server response:
   *        success        → clear form, show confirmation panel
   *        422 validation → adopt the server's per-field messages
   *        anything else  → surface a generic error banner
   *   5. If the fetch itself throws (offline, DNS, etc.), show a network
   *      error message.
   */
  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    // Mark all fields touched and validate
    setTouched({ name: true, email: true, subject: true, message: true })
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setStatus('loading')
    setServerMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        setStatus('success')
        setForm(INITIAL)
        setTouched({})
        setErrors({})
      } else if (res.status === 422 && data.issues) {
        setErrors(data.issues)
        setStatus('idle')
      } else {
        setServerMsg(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setServerMsg('Network error — please check your connection and try again.')
      setStatus('error')
    }
  }

  /* ── Helpers ─────────────────────────────────────────────────────────── */
  /**
   * Builds the Tailwind class string for a form input. Starts from a shared
   * base style and then appends either the "error" border/ring colors or
   * the normal focus colors, depending on whether that field currently has
   * a visible validation error.
   */
  const fieldClass = (name: keyof FormState) => {
    const base = 'w-full bg-royal-900/60 border rounded-xl px-4 py-3.5 text-sm text-shellstone-300 placeholder-shellstone-700 focus:outline-none transition-all duration-300 focus:bg-royal-900'
    const hasErr = touched[name] && errors[name]
    return `${base} ${hasErr
      ? 'border-red-400/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/30'
      : 'border-sapphire-800/60 focus:border-quicksand-400/60 focus:ring-1 focus:ring-quicksand-400/20'}`
  }

  /**
   * Renders the inline red error message under a field, but only if the
   * field has been touched AND has at least one validation error. Returns
   * `null` otherwise so the DOM stays clean.
   */
  const errMsg = (name: keyof FormState) =>
    touched[name] && errors[name]
      ? <p className="mt-1.5 text-xs text-red-400/80">{errors[name]![0]}</p>
      : null

  // Live character count shown next to the Message label. Turns red once
  // the user is within 200 characters of the 2000-char server-side cap.
  const charCount = form.message.length

  /* ── Render ──────────────────────────────────────────────────────────── */
  return (
    <section id="contact" ref={ref} className="bg-[#0D1A35] px-8 sm:px-12 pt-28 pb-16">
      <div className="max-w-7xl mx-auto">

        {/* Headline */}
        <div className={`mb-16 reveal ${visible ? 'revealed' : ''}`}>
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-sapphire-500 block mb-6">05 — Contact</span>
          <h2 className="font-serif leading-[0.95] tracking-tight">
            <span className="block text-shellstone-300" style={{ fontSize: 'clamp(48px,7vw,110px)' }}>Let&apos;s build</span>
            <span className="block text-quicksand-400" style={{ fontSize: 'clamp(48px,7vw,110px)' }}>something.</span>
          </h2>
        </div>

        <div className="rule opacity-30 mb-14" />

        {/* Main grid — info left, form right */}
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mb-16 reveal reveal-delay-1 ${visible ? 'revealed' : ''}`}>

          {/* ── Left column ─────────────────────────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-10">

            {/* Availability badge */}
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-quicksand-400 animate-pulse" />
              <span className="text-xs font-medium tracking-[0.14em] uppercase text-shellstone-500">
                Available for opportunities
              </span>
            </div>

            <p className="text-sm text-shellstone-600 leading-relaxed">
              I&apos;m currently open to full-time roles and select freelance projects. Whether you have a position, a product idea, or just want to connect — drop a message and I&apos;ll get back to you within 24 hours.
            </p>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 px-5 py-4 rounded-xl bg-royal-800/30 border border-sapphire-800/40 hover:border-quicksand-400/30 hover:bg-royal-800/60 transition-all duration-300 group"
                >
                  <span className="w-8 h-8 rounded-lg bg-sapphire-900/60 border border-sapphire-700/50 flex items-center justify-center font-mono text-xs font-semibold text-quicksand-400 flex-shrink-0">
                    {link.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium tracking-[0.12em] uppercase text-shellstone-600 mb-0.5">{link.label}</p>
                    <p className="text-sm text-shellstone-400 group-hover:text-quicksand-300 transition-colors duration-300 truncate">{link.value}</p>
                  </div>
                  <span className="ml-auto text-shellstone-600 group-hover:text-quicksand-400 transition-colors duration-300 flex-shrink-0">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* ── Right column — contact form ──────────────────────────────── */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              /* Success state */
              <div className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-2xl border border-quicksand-400/20 bg-royal-900/40">
                <div className="w-14 h-14 rounded-full bg-quicksand-400/10 border border-quicksand-400/30 flex items-center justify-center mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E0C58F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-shellstone-300 mb-3">Message sent!</h3>
                <p className="text-sm text-shellstone-600 leading-relaxed max-w-xs mb-8">
                  Thanks for reaching out. I&apos;ll be in touch within 24 hours.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-xs font-medium tracking-[0.14em] uppercase text-quicksand-400 hover:text-quicksand-300 transition-colors duration-300 link-hover"
                >
                  Send another message
                </button>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} noValidate className="space-y-5">

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium tracking-[0.12em] uppercase text-shellstone-600 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Al-Taimee Hassan"
                      className={fieldClass('name')}
                      disabled={status === 'loading'}
                    />
                    {errMsg('name')}
                  </div>
                  <div>
                    <label className="block text-xs font-medium tracking-[0.12em] uppercase text-shellstone-600 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="hello@example.com"
                      className={fieldClass('email')}
                      disabled={status === 'loading'}
                    />
                    {errMsg('email')}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-medium tracking-[0.12em] uppercase text-shellstone-600 mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${fieldClass('subject')} appearance-none pr-10 cursor-pointer`}
                      disabled={status === 'loading'}
                    >
                      <option value="" disabled hidden>Select a subject…</option>
                      {SUBJECTS.map(s => (
                        <option key={s} value={s} className="bg-[#0D1A35] text-shellstone-300">{s}</option>
                      ))}
                    </select>
                    {/* Chevron */}
                    <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-shellstone-600">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <polyline points="2 4 6 8 10 4" />
                      </svg>
                    </span>
                  </div>
                  {errMsg('subject')}
                </div>

                {/* Message */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-medium tracking-[0.12em] uppercase text-shellstone-600">
                      Message
                    </label>
                    <span className={`text-xs transition-colors duration-300 ${charCount > 1800 ? 'text-red-400/80' : 'text-shellstone-700'}`}>
                      {charCount} / 2000
                    </span>
                  </div>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={6}
                    placeholder="Tell me about your project, role, or idea…"
                    className={`${fieldClass('message')} resize-none`}
                    disabled={status === 'loading'}
                  />
                  {errMsg('message')}
                </div>

                {/* Server-level error */}
                {status === 'error' && serverMsg && (
                  <p className="text-sm text-red-400/80 bg-red-400/5 border border-red-400/20 rounded-xl px-4 py-3">
                    {serverMsg}
                  </p>
                )}

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-quicksand-400/10 border border-quicksand-400/30 text-quicksand-400 text-sm font-medium tracking-wide hover:bg-quicksand-400/20 hover:border-quicksand-400/60 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 group"
                  >
                    {status === 'loading' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-sapphire-800/40 reveal reveal-delay-3 ${visible ? 'revealed' : ''}`}>
          <span className="text-xs text-shellstone-700 tracking-wide">
            Al-Taimee Hassan © {new Date().getFullYear()}
          </span>
          <span className="text-xs text-shellstone-700 tracking-wide">
            Next.js · TypeScript · Tailwind CSS
          </span>
        </div>

      </div>
    </section>
  )
}
