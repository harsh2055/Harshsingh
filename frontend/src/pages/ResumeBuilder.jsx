import { useState } from 'react'
import api from '../utils/api'

const ROLES = ['frontend', 'backend', 'fullstack']

const ROLE_META = {
  frontend: {
    label: 'Frontend Developer',
    summary: 'Frontend-focused Full Stack Developer with 2+ years building React-based SaaS and AI-powered web applications. Shipped 8 production projects using React.js, JavaScript ES6+, HTML5/CSS3, REST APIs, and PWA development. Experienced in real-time UI and LLM frontend integration.',
    skills: 'React.js · JavaScript (ES6+) · HTML5 · CSS3 · Tailwind CSS · Chart.js · REST API Integration · Firebase · Vercel · PWA Development · AI/LLM Frontend Integration',
    projects: [
      { name: 'DriveX', desc: 'P2P car rental SaaS — React frontend with real-time booking UX and optimistic updates', stack: 'React · Supabase · Node.js', url: 'drivex.qzz.io' },
      { name: 'StudyAI', desc: 'AI study assistant — streaming LLM UI + PDF processing interface with real-time Q&A', stack: 'React · Python · LLM APIs', url: 'studyai-cc5l.onrender.com' },
      { name: 'WeatherVue', desc: 'PWA weather app with AI chatbot, real-time data visualization and offline support', stack: 'React · Node.js · OpenWeatherMap', url: 'weather-vue-ruddy.vercel.app' },
    ]
  },
  backend: {
    label: 'Backend Developer',
    summary: 'Backend-focused Full Stack Developer with hands-on experience building production REST APIs, designing database schemas, and deploying server-side applications. Built 8+ backends using Node.js, Python/Flask, Supabase, Firebase, and PostgreSQL. Completed JPMorgan Chase SWE simulation (Kafka, H2, REST).',
    skills: 'Node.js · Python · Flask · REST API Design · PostgreSQL · MySQL · MongoDB · Supabase · Firebase · Render · LLM/AI API Integration · Spring Boot (Basic) · Kafka (Simulation)',
    projects: [
      { name: 'Stackbase', desc: 'No-code backend builder — API generation, DB schema design, serverless execution engine', stack: 'Node.js · Supabase · REST APIs', url: 'stackbase-navy.vercel.app' },
      { name: 'HerCare', desc: 'Health app backend — secure user auth, data isolation, smart reminder engine', stack: 'Flask · Firebase · Node.js', url: 'hercare-tau.vercel.app' },
      { name: 'StudyAI', desc: 'LLM backend — PDF chunking pipeline, query routing, streaming response architecture', stack: 'Python · LLM APIs', url: 'studyai-cc5l.onrender.com' },
    ]
  },
  fullstack: {
    label: 'Full Stack Developer',
    summary: 'Full Stack Developer with 2+ years independently designing, building, and deploying 8+ production-grade SaaS and AI-powered applications. Proficient across the entire stack: React frontends, Node.js/Python backends, cloud databases (Supabase, Firebase, PostgreSQL), and LLM integration. All projects live on production domains.',
    skills: 'React.js · Node.js · Python/Flask · JavaScript ES6+ · REST API Design · Supabase · Firebase · MongoDB · PostgreSQL · Vercel · Render · LLM/AI APIs · Git/GitHub · PWA Development',
    projects: [
      { name: 'DriveX', desc: 'Full-stack P2P car rental SaaS — auth, booking flow, real-time availability, production domain', stack: 'React · Node.js · Supabase', url: 'drivex.qzz.io' },
      { name: 'Stackbase', desc: 'Full-stack developer platform — DB design, API generation, AI features, serverless execution', stack: 'React · Node.js · Supabase · AI', url: 'stackbase-navy.vercel.app' },
      { name: 'StudyAI', desc: 'Full-stack AI study tool — PDF processing, LLM integration, streaming UI, production deploy', stack: 'React · Python · LLM APIs', url: 'studyai-cc5l.onrender.com' },
      { name: 'HerCare', desc: "Full-stack women's health companion — personalized tracking, Firebase auth, live domain", stack: 'React · Flask · Firebase', url: 'hercare-tau.vercel.app' },
    ]
  }
}

const S = {
  container: { maxWidth: '740px', margin: '0 auto', padding: '3rem 2rem' },
  title: { fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '0.5rem' },
  sub: { color: '#777', fontSize: '13px', marginBottom: '3rem' },
  sLabel: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '2px', textTransform: 'uppercase', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '14px' },
  roleGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '2rem' },
  roleBtn: (active) => ({ background: active ? 'rgba(200,255,0,0.06)' : '#111', border: `1px solid ${active ? '#C8FF00' : 'rgba(255,255,255,0.08)'}`, color: active ? '#C8FF00' : '#777', fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '12px', padding: '14px', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s' }),
  jdInput: { width: '100%', background: '#111', border: '1px solid rgba(255,255,255,0.08)', color: '#eaeaea', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', padding: '14px', borderRadius: '8px', resize: 'vertical', minHeight: '100px', outline: 'none' },
  btnPrimary: { background: '#C8FF00', color: '#000', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.5px', padding: '10px 22px', border: 'none', borderRadius: '6px', cursor: 'pointer', marginTop: '12px' },
  resume: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '2rem', marginTop: '2rem' },
  resName: { fontFamily: 'Syne, sans-serif', fontSize: '20px', fontWeight: 800 },
  resContact: { fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#777', marginTop: '4px' },
  resLink: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C8FF00', marginTop: '2px' },
  resSec: { marginBottom: '1.5rem' },
  resSecTitle: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C8FF00', letterSpacing: '2px', textTransform: 'uppercase', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '6px', marginBottom: '10px' },
  resText: { fontSize: '12px', color: '#999', lineHeight: 1.8 },
  resProjTitle: { fontSize: '13px', fontWeight: 500, color: '#eaeaea' },
  resProjSub: { fontSize: '11px', color: '#777', marginTop: '2px' },
  badge: { display: 'inline-block', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C8FF00', border: '1px solid #C8FF00', padding: '3px 8px', borderRadius: '4px' },
  footer: { marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555' },
  printBtn: { background: 'none', border: '1px solid rgba(255,255,255,0.14)', color: '#777', fontFamily: 'DM Mono, monospace', fontSize: '10px', padding: '6px 14px', borderRadius: '5px', cursor: 'pointer', marginLeft: '12px' },
}

export default function ResumeBuilder() {
  const [role, setRole] = useState('fullstack')
  const [jd, setJd] = useState('')
  const [generated, setGenerated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [resumeData, setResumeData] = useState(null)

  const generate = async () => {
    setLoading(true)
    try {
      const r = await api.post('/resume/generate', { role, jobDescription: jd })
      setResumeData(r.data)
      setGenerated(true)
    } catch {
      // Fall back to local data
      setResumeData({ role: ROLE_META[role].label, ...ROLE_META[role] })
      setGenerated(true)
    } finally {
      setLoading(false)
    }
  }

  const meta = ROLE_META[role]
  const display = resumeData || meta

  return (
    <div style={S.container} className="fade-in">
      <div style={S.title}>Resume Builder</div>
      <div style={S.sub}>Role-based · ATS-friendly · Generated from real project data</div>

      <div style={S.sLabel}>Select target role</div>
      <div style={S.roleGrid}>
        {ROLES.map(r => (
          <button key={r} style={S.roleBtn(role === r)} onClick={() => { setRole(r); setGenerated(false) }}>
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>

      <div style={S.sLabel}>Or paste job description</div>
      <textarea
        style={S.jdInput}
        placeholder="Paste job description here to auto-extract keywords and tailor the resume..."
        value={jd}
        onChange={e => setJd(e.target.value)}
        onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
      />
      <button style={S.btnPrimary} onClick={generate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Resume'}
      </button>

      {generated && (
        <div style={S.resume}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
            <div>
              <div style={S.resName}>Harsh Rajesh Singh</div>
              <div style={S.resContact}>harshs288375@gmail.com · +91-9967254145 · Nallasopara, Mumbai, Maharashtra</div>
              <div style={S.resLink}>github.com/harsh2055 · linkedin.com/in/harsh-singh-b5836b350</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
              <span style={S.badge}>{display.label || display.role}</span>
              <button style={S.printBtn} onClick={() => window.print()}>↓ Print / PDF</button>
            </div>
          </div>

          <div style={S.resSec}>
            <div style={S.resSecTitle}>Summary</div>
            <div style={S.resText}>{display.summary}</div>
          </div>

          <div style={S.resSec}>
            <div style={S.resSecTitle}>Technical Skills</div>
            <div style={S.resText}>{display.skills || (Array.isArray(display.skills) ? display.skills.join(' · ') : '')}</div>
          </div>

          <div style={S.resSec}>
            <div style={S.resSecTitle}>Featured Projects</div>
            {(display.projects || meta.projects).map(p => (
              <div key={p.name} style={{ marginBottom: '10px' }}>
                <div style={S.resProjTitle}>{p.name} {p.url && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C8FF00' }}>· {p.url}</span>}</div>
                <div style={S.resProjSub}>{p.desc} · {p.stack}</div>
              </div>
            ))}
          </div>

          <div style={S.resSec}>
            <div style={S.resSecTitle}>Experience</div>
            <div style={S.resText}>
              <strong style={{ color: '#eaeaea' }}>Full Stack Developer</strong> — Independent / Self-Directed Projects · 2023–Present · Mumbai, India<br />
              Independently designed, developed, and deployed 8+ full-stack applications spanning SaaS, AI, health tech, and developer tooling. Applied modern engineering practices: REST API design, cloud deployment, database design, and LLM integration.
            </div>
          </div>

          <div style={S.resSec}>
            <div style={S.resSecTitle}>Education</div>
            <div style={S.resText}>BSc. Information Technology · Reena Mehta College, Mumbai University · 2023–2026</div>
          </div>

          <div style={S.resSec}>
            <div style={S.resSecTitle}>Certifications</div>
            <div style={S.resText}>
              Google Gemini Certified Educator (Jan 2026) · Google Gemini Certified Student — University (Jan 2026)<br />
              JPMorgan Chase Software Engineering Job Simulation (Feb 2026) · Deloitte Data Analytics Job Simulation (Feb 2026)
            </div>
          </div>

          <div style={S.footer}>
            ATS-optimized resume generated for <span style={{ color: '#C8FF00' }}>{display.label || display.role}</span> role
            {jd && <span> · Keywords extracted from job description</span>}
          </div>
        </div>
      )}
    </div>
  )
}
