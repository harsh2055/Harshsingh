import { useState, useEffect } from 'react'
import api from '../utils/api'

const FALLBACK = [
  { _id: '1', name: 'DriveX', description: 'Peer-to-peer car rental SaaS. Owners list vehicles, verified users book. Airbnb model for cars.', category: 'saas', techStack: ['React', 'Node.js', 'Supabase', 'REST APIs'], liveUrl: 'https://drivex.qzz.io', githubUrl: 'https://github.com/harsh2055', proof: { problem: 'No verified P2P car rental in India at accessible price point', challenge: 'Real-time booking conflicts when multiple users book the same vehicle', solution: 'Supabase row-level security + optimistic UI + server-side booking lock' } },
  { _id: '2', name: 'Stackbase', description: 'Full-stack developer platform. Visually design databases, generate APIs, and deploy backend services.', category: 'devtools', techStack: ['React', 'Node.js', 'Supabase', 'AI'], liveUrl: 'https://stackbase-navy.vercel.app', githubUrl: 'https://github.com/harsh2055', proof: { problem: 'Backend setup wastes days in rapid prototyping', challenge: 'Integrating real-time capabilities with serverless execution', solution: 'Unified AI+realtime+serverless interface with Supabase backbone' } },
  { _id: '3', name: 'HerCare', description: "Women's health companion. Menstrual tracking, pregnancy monitoring, symptom logging, personalized plans.", category: 'health', techStack: ['React', 'Flask', 'Firebase', 'Node.js'], liveUrl: 'https://hercare-tau.vercel.app', githubUrl: 'https://github.com/harsh2055', proof: { problem: "No unified women's health tracker with AI-driven personalization", challenge: 'Sensitive health data security + personalization at scale', solution: 'Firebase auth with user-specific data isolation and personalization engine' } },
  { _id: '4', name: 'StudyAI', description: 'AI study assistant. Upload PDFs → summaries, exam questions, real-time Q&A.', category: 'ai', techStack: ['React', 'Python', 'LLM APIs', 'PDF Processing'], liveUrl: 'https://studyai-cc5l.onrender.com', githubUrl: 'https://github.com/harsh2055', proof: { problem: 'Students waste hours extracting key content from large PDFs', challenge: 'LLM latency + PDF parsing accuracy across document formats', solution: 'Chunked PDF processing + streaming LLM output for near-instant response' } },
  { _id: '5', name: 'WeatherVue', description: 'Full-stack weather app with AI chatbot and PWA support. Real-time visualization.', category: 'ai', techStack: ['React', 'Node.js', 'Supabase', 'OpenWeatherMap'], liveUrl: 'https://weather-vue-ruddy.vercel.app', githubUrl: 'https://github.com/harsh2055', proof: { problem: 'Weather apps lack conversational context for follow-up queries', challenge: 'PWA offline support + real-time API + rate limiting', solution: 'Service worker with intelligent caching + request debouncing' } },
  { _id: '6', name: 'ProposalAI', description: 'AI proposal generator. Structured professional proposals for business, freelance, academic use.', category: 'ai', techStack: ['React', 'Node.js', 'Generative AI'], liveUrl: 'https://proposal-ai-eosin.vercel.app', githubUrl: 'https://github.com/harsh2055', proof: { problem: 'Writing client proposals is time-intensive and inconsistent in quality', challenge: 'Consistent structured output quality from generative LLMs', solution: 'Structured prompt engineering with output templates' } },
  { _id: '7', name: 'CodeCritic AI', description: 'AI code reviewer. Analyzes source code → quality scores, issue severity, strengths, suggestions.', category: 'devtools', techStack: ['React', 'AI APIs'], liveUrl: 'https://code-critic-ai-de7cf6dc.base44.app', githubUrl: 'https://github.com/harsh2055', proof: { problem: 'Code review bottlenecked by senior developer availability', challenge: 'Generating consistent, actionable AI feedback', solution: 'Structured scoring rubrics embedded in system prompts' } },
  { _id: '8', name: 'ExpenseFlow', description: 'Personal finance tracker with dynamic chart-driven visualization for income and expense analysis.', category: 'saas', techStack: ['React', 'JavaScript', 'Chart.js'], liveUrl: 'https://expense-flow-a4f205d8.base44.app', githubUrl: 'https://github.com/harsh2055', proof: { problem: 'Manual expense spreadsheets lack visual clarity for spending patterns', challenge: 'Real-time chart updates on data mutations without full re-renders', solution: 'Chart.js reactive datasets + local state management' } },
]

const FILTERS = ['all', 'saas', 'ai', 'devtools', 'health']

const S = {
  container: { maxWidth: '960px', margin: '0 auto', padding: '3rem 2rem' },
  title: { fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '0.5rem' },
  sub: { color: '#777', fontSize: '13px', marginBottom: '2rem' },
  filterRow: { display: 'flex', gap: '6px', marginBottom: '2rem', flexWrap: 'wrap' },
  filterBtn: (active) => ({ background: active ? 'rgba(200,255,0,0.06)' : 'none', border: `1px solid ${active ? '#C8FF00' : 'rgba(255,255,255,0.1)'}`, color: active ? '#C8FF00' : '#777', fontSize: '11px', fontFamily: 'DM Mono, monospace', padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.2s' }),
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  card: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', overflow: 'hidden', transition: 'border-color 0.2s, transform 0.2s' },
  cardHeader: { padding: '20px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)' },
  cardName: { fontFamily: 'Syne, sans-serif', fontSize: '16px', fontWeight: 700, marginBottom: '6px' },
  cardDesc: { fontSize: '12px', color: '#777', lineHeight: 1.7 },
  cardBody: { padding: '14px 20px 16px' },
  proofItem: { display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '8px', fontSize: '11px' },
  arrow: { color: '#C8FF00', fontFamily: 'DM Mono, monospace', flexShrink: 0, marginTop: '1px' },
  proofLabel: { display: 'block', fontSize: '11px', fontWeight: 500, color: '#eaeaea' },
  proofText: { color: '#777' },
  stackRow: { display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '12px' },
  stackTag: { fontFamily: 'DM Mono, monospace', fontSize: '9px', padding: '2px 7px', background: '#161616', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '3px', color: '#777' },
  linksRow: { display: 'flex', gap: '8px', marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)' },
  liveLink: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C8FF00', textDecoration: 'none', padding: '4px 10px', border: '1px solid #C8FF00', borderRadius: '4px' },
  ghLink: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#777', textDecoration: 'none', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px' },
}

export default function Projects({ recruiterMode }) {
  const [projects, setProjects] = useState(FALLBACK)
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/projects').then(r => { if (r.data?.length) setProjects(r.data) }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const filtered = projects.filter(p => filter === 'all' || p.category === filter).slice(0, recruiterMode ? 4 : undefined)

  return (
    <div style={S.container} className="fade-in">
      <div style={S.title}>Projects</div>
      <div style={S.sub}>{projects.length} production-deployed applications · Full stack · Real domains</div>
      <div style={S.filterRow}>
        {FILTERS.map(f => (
          <button key={f} style={S.filterBtn(filter === f)} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ color: '#555', fontFamily: 'DM Mono, monospace', fontSize: '12px' }}>Loading projects...</div>
      ) : (
        <div style={S.grid}>
          {filtered.map(p => (
            <div key={p._id} style={S.card}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={S.cardHeader}>
                <div style={S.cardName}>{p.name}</div>
                <div style={S.cardDesc}>{p.description}</div>
              </div>
              <div style={S.cardBody}>
                {p.proof && (
                  <>
                    <div style={S.proofItem}>
                      <span style={S.arrow}>→</span>
                      <div style={S.proofText}><strong style={S.proofLabel}>Problem:</strong>{p.proof.problem}</div>
                    </div>
                    <div style={S.proofItem}>
                      <span style={S.arrow}>→</span>
                      <div style={S.proofText}><strong style={S.proofLabel}>Challenge:</strong>{p.proof.challenge}</div>
                    </div>
                    <div style={S.proofItem}>
                      <span style={S.arrow}>→</span>
                      <div style={S.proofText}><strong style={S.proofLabel}>Solution:</strong>{p.proof.solution}</div>
                    </div>
                  </>
                )}
                <div style={S.stackRow}>
                  {(p.techStack || []).map(t => <span key={t} style={S.stackTag}>{t}</span>)}
                </div>
                <div style={S.linksRow}>
                  {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" style={S.liveLink}>↗ Live Demo</a>}
                  {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" style={S.ghLink}>GitHub</a>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
