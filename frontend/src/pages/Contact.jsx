import { useState } from 'react'
import api from '../utils/api'

const S = {
  container: { maxWidth: '860px', margin: '0 auto', padding: '3rem 2rem' },
  title: { fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '0.5rem' },
  sub: { color: '#777', fontSize: '13px', marginBottom: '2rem' },
  badge: { display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', fontFamily: 'DM Mono, monospace', fontSize: '11px', padding: '6px 12px', borderRadius: '6px', marginBottom: '2rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem' },
  infoTitle: { fontFamily: 'Syne, sans-serif', fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-0.5px' },
  detail: { display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px' },
  detailIcon: { width: '32px', height: '32px', background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', flexShrink: 0 },
  detailLabel: { fontSize: '10px', color: '#555', fontFamily: 'DM Mono, monospace', display: 'block', marginBottom: '1px' },
  detailVal: { fontSize: '12px', color: '#eaeaea' },
  group: { marginBottom: '14px' },
  label: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px', display: 'block' },
  input: { width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.08)', color: '#eaeaea', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', padding: '10px 14px', borderRadius: '7px', outline: 'none' },
  textarea: { width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.08)', color: '#eaeaea', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', padding: '10px 14px', borderRadius: '7px', outline: 'none', minHeight: '110px', resize: 'vertical' },
  btn: { background: '#C8FF00', color: '#000', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.5px', padding: '10px 22px', border: 'none', borderRadius: '6px', cursor: 'pointer' },
  success: { marginTop: '10px', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#4ade80' },
  error: { marginTop: '10px', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#f87171' },
}

const DETAILS = [
  { icon: '✉', label: 'Email', val: 'harshs288375@gmail.com', href: 'mailto:harshs288375@gmail.com' },
  { icon: '📱', label: 'Phone', val: '+91-9967254145', href: 'tel:+919967254145' },
  { icon: '📍', label: 'Location', val: 'Nallasopara, Mumbai, Maharashtra' },
  { icon: '🔗', label: 'GitHub', val: 'github.com/harsh2055', href: 'https://github.com/harsh2055' },
  { icon: '💼', label: 'LinkedIn', val: 'linkedin.com/in/harsh-singh', href: 'https://linkedin.com/in/harsh-singh-b5836b350' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setStatus({ type: 'error', msg: 'Please fill in all fields.' })
      return
    }
    setLoading(true)
    try {
      await api.post('/contact', form)
      setStatus({ type: 'success', msg: 'Message sent! I\'ll get back to you soon.' })
      setForm({ name: '', email: '', message: '' })
    } catch {
      setStatus({ type: 'error', msg: 'Could not send. Try emailing directly: harshs288375@gmail.com' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={S.container} className="fade-in">
      <div style={S.title}>Contact</div>
      <div style={S.sub}>Open to internships, freelance, and full-time opportunities</div>
      <div style={S.badge}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s infinite' }} />
        Available for internship / freelance / full-time
      </div>
      <div style={S.grid}>
        <div>
          <div style={S.infoTitle}>Get in touch</div>
          {DETAILS.map(d => (
            <div key={d.label} style={S.detail}>
              <div style={S.detailIcon}>{d.icon}</div>
              <div>
                <span style={S.detailLabel}>{d.label}</span>
                {d.href
                  ? <a href={d.href} target="_blank" rel="noreferrer" style={{ ...S.detailVal, color: '#C8FF00', textDecoration: 'none' }}>{d.val}</a>
                  : <span style={S.detailVal}>{d.val}</span>
                }
              </div>
            </div>
          ))}
        </div>
        <div>
          <div style={S.group}>
            <label style={S.label}>Name</label>
            <input style={S.input} placeholder="Your name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
          </div>
          <div style={S.group}>
            <label style={S.label}>Email</label>
            <input style={S.input} type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
              onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
          </div>
          <div style={S.group}>
            <label style={S.label}>Message</label>
            <textarea style={S.textarea} placeholder="Tell me about the opportunity..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
          </div>
          <button style={S.btn} onClick={handleSubmit} disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
          {status && <div style={status.type === 'success' ? S.success : S.error}>{status.msg}</div>}
        </div>
      </div>
    </div>
  )
}
