import { useState, useEffect } from 'react'
import api from '../utils/api'

const FALLBACK_KNOWN = [
  { _id: 's1', name: 'React.js', category: 'frontend', projectsUsed: 7, lastUsed: 'Active' },
  { _id: 's2', name: 'JavaScript (ES6+)', category: 'frontend', projectsUsed: 8, lastUsed: 'Active' },
  { _id: 's3', name: 'HTML5 / CSS3', category: 'frontend', projectsUsed: 8, lastUsed: 'Active' },
  { _id: 's4', name: 'Tailwind CSS', category: 'frontend', projectsUsed: 4, lastUsed: '2025' },
  { _id: 's5', name: 'Chart.js', category: 'frontend', projectsUsed: 2, lastUsed: '2025' },
  { _id: 's6', name: 'Node.js', category: 'backend', projectsUsed: 6, lastUsed: 'Active' },
  { _id: 's7', name: 'Python', category: 'backend', projectsUsed: 3, lastUsed: 'Active' },
  { _id: 's8', name: 'Flask', category: 'backend', projectsUsed: 2, lastUsed: 'Active' },
  { _id: 's9', name: 'REST API Design', category: 'backend', projectsUsed: 8, lastUsed: 'Active' },
  { _id: 's10', name: 'Spring Boot (Basic)', category: 'backend', projectsUsed: 1, lastUsed: '2025' },
  { _id: 's11', name: 'LLM / AI API Integration', category: 'ai', projectsUsed: 4, lastUsed: 'Active' },
  { _id: 's12', name: 'Supabase', category: 'database', projectsUsed: 3, lastUsed: 'Active' },
  { _id: 's13', name: 'Firebase', category: 'database', projectsUsed: 2, lastUsed: '2025' },
  { _id: 's14', name: 'MongoDB', category: 'database', projectsUsed: 2, lastUsed: '2025' },
  { _id: 's15', name: 'PostgreSQL', category: 'database', projectsUsed: 2, lastUsed: '2025' },
  { _id: 's16', name: 'Vercel', category: 'cloud', projectsUsed: 8, lastUsed: 'Active' },
  { _id: 's17', name: 'Render', category: 'cloud', projectsUsed: 2, lastUsed: 'Active' },
  { _id: 's18', name: 'Git / GitHub', category: 'tools', projectsUsed: 8, lastUsed: 'Active' },
]

const FALLBACK_LEARNING = [
  { _id: 'l1', name: 'System Design', progress: 60, learningSource: 'Self-study + books' },
  { _id: 'l2', name: 'Java (Advanced DSA)', progress: 45, learningSource: 'Practice + projects' },
  { _id: 'l3', name: 'TypeScript', progress: 35, learningSource: 'Side projects' },
  { _id: 'l4', name: 'Docker / DevOps', progress: 25, learningSource: 'Self-study' },
]

const CAT_ORDER = ['frontend', 'backend', 'ai', 'database', 'cloud', 'tools']

const S = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' },
  title: { fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '0.5rem' },
  sub: { color: '#777', fontSize: '13px', marginBottom: '3rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' },
  catTitle: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C8FF00', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' },
  skillItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  skillName: { fontSize: '12px' },
  skillMeta: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', textAlign: 'right' },
  sLabel: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '2px', textTransform: 'uppercase', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '14px', marginTop: '2.5rem' },
  learnGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxWidth: '600px' },
  learnCard: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '16px' },
  learnTitle: { fontSize: '13px', fontWeight: 500, marginBottom: '4px' },
  learnSrc: { fontSize: '11px', color: '#555', marginBottom: '8px' },
  barTrack: { height: '2px', background: '#222', borderRadius: '1px' },
  barFill: (pct) => ({ height: '100%', width: `${pct}%`, background: '#C8FF00', borderRadius: '1px', transition: 'width 0.8s ease' }),
  barLabel: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', marginTop: '5px' },
}

export default function Skills() {
  const [known, setKnown] = useState(FALLBACK_KNOWN)
  const [learning, setLearning] = useState(FALLBACK_LEARNING)

  useEffect(() => {
    api.get('/skills?status=known').then(r => { if (r.data?.length) setKnown(r.data) }).catch(() => {})
    api.get('/skills?status=learning').then(r => { if (r.data?.length) setLearning(r.data) }).catch(() => {})
  }, [])

  const grouped = CAT_ORDER.reduce((acc, cat) => {
    const items = known.filter(s => s.category === cat)
    if (items.length) acc[cat] = items
    return acc
  }, {})

  return (
    <div style={S.container} className="fade-in">
      <div style={S.title}>Skills</div>
      <div style={S.sub}>Credibility over percentages — usage across real production projects</div>

      <div style={S.grid}>
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <div style={S.catTitle}>{cat}</div>
            {items.map(s => (
              <div key={s._id} style={S.skillItem}>
                <span style={S.skillName}>{s.name}</span>
                <span style={S.skillMeta}>
                  {s.projectsUsed ? `${s.projectsUsed} projects` : ''}<br />
                  {s.lastUsed}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={S.sLabel}>Currently learning</div>
      <div style={S.learnGrid}>
        {learning.map(s => (
          <div key={s._id} style={S.learnCard}>
            <div style={S.learnTitle}>{s.name}</div>
            <div style={S.learnSrc}>{s.learningSource}</div>
            <div style={S.barTrack}>
              <div style={S.barFill(s.progress || 0)} />
            </div>
            <div style={S.barLabel}>{s.progress || 0}% complete</div>
          </div>
        ))}
      </div>
    </div>
  )
}
