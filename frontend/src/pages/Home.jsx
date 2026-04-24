import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'

const S = {
  page: { display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 52px)' },
  left: { padding: '5rem 3rem 3rem', borderRight: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  right: { padding: '5rem 3rem 3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  eyebrow: { fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#C8FF00', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem' },
  name: { fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '1rem' },
  desc: { color: '#777', fontSize: '14px', lineHeight: 1.85, maxWidth: '400px', marginBottom: '2rem' },
  tagRow: { display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '2.5rem' },
  tag: { fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.5px', padding: '4px 10px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.14)', color: '#777' },
  tagAccent: { fontFamily: 'DM Mono, monospace', fontSize: '10px', letterSpacing: '0.5px', padding: '4px 10px', borderRadius: '100px', border: '1px solid #C8FF00', color: '#C8FF00', background: 'rgba(200,255,0,0.06)' },
  ctaRow: { display: 'flex', gap: '10px' },
  btnPrimary: { background: '#C8FF00', color: '#000', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.5px', padding: '10px 22px', border: 'none', borderRadius: '6px', cursor: 'pointer', textDecoration: 'none', display: 'inline-block' },
  btnGhost: { background: 'none', color: '#777', fontSize: '12px', padding: '10px 20px', border: '1px solid rgba(255,255,255,0.14)', borderRadius: '6px', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif', textDecoration: 'none', display: 'inline-block' },
  statGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  statCard: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '16px' },
  statLabel: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#777', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' },
  statValue: { fontFamily: 'Syne, sans-serif', fontSize: '28px', fontWeight: 800 },
  statSub: { fontSize: '11px', color: '#555', marginTop: '2px' },
  sectionLabel: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '2px', textTransform: 'uppercase', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '14px' },
  projMini: { padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' },
  projName: { fontFamily: 'Syne, sans-serif', fontSize: '13px', fontWeight: 700 },
  projDesc: { fontSize: '11px', color: '#777', marginTop: '2px' },
  liveLink: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C8FF00', textDecoration: 'none', whiteSpace: 'nowrap', border: '1px solid #C8FF00', padding: '3px 8px', borderRadius: '4px' },
}

const FEATURED = [
  { name: 'DriveX', desc: 'Peer-to-peer car rental SaaS · React + Supabase', url: 'https://drivex.qzz.io' },
  { name: 'Stackbase', desc: 'No-code backend builder · React + Node.js', url: 'https://stackbase-navy.vercel.app' },
  { name: 'StudyAI', desc: 'AI study assistant · Python + LLM APIs', url: 'https://studyai-cc5l.onrender.com' },
  { name: 'HerCare', desc: "Women's health app · React + Firebase", url: 'https://hercare-tau.vercel.app' },
]

export default function Home({ recruiterMode }) {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/github/stats').then(r => setStats(r.data)).catch(() => {})
  }, [])

  return (
    <div style={S.page} className="fade-in">
      <div style={S.left}>
        <div style={S.eyebrow}>Full Stack Developer · Mumbai, India</div>
        <div style={S.name}>
          Harsh<br />
          <span style={{ color: '#555' }}>Rajesh Singh</span>
        </div>
        <div style={S.desc}>
          Building production-grade SaaS and AI-powered applications from concept to live deployment. 8+ shipped projects spanning health tech, developer tooling, and consumer SaaS.
        </div>
        <div style={S.tagRow}>
          <span style={S.tagAccent}>Available for internship</span>
          <span style={S.tag}>React</span>
          <span style={S.tag}>Node.js</span>
          <span style={S.tag}>Python</span>
          <span style={S.tag}>AI Integration</span>
          <span style={S.tag}>Full Stack</span>
        </div>
        <div style={S.ctaRow}>
          <Link to="/projects" style={S.btnPrimary}>View Projects</Link>
          <Link to="/resume" style={S.btnGhost}>Generate Resume</Link>
        </div>
      </div>

      <div style={S.right}>
        <div style={S.statGrid}>
          <div style={S.statCard}>
            <div style={S.statLabel}>Projects Shipped</div>
            <div style={S.statValue}>8+</div>
            <div style={S.statSub}>Production deployed</div>
          </div>
          <div style={S.statCard}>
            <div style={S.statLabel}>GitHub Repos</div>
            <div style={S.statValue}>{stats ? stats.publicRepos : '—'}</div>
            <div style={S.statSub}>{stats ? 'Public repositories' : 'Loading...'}</div>
          </div>
          <div style={S.statCard}>
            <div style={S.statLabel}>Certifications</div>
            <div style={S.statValue}>5</div>
            <div style={S.statSub}>Google, Deloitte, JPMorgan</div>
          </div>
          <div style={S.statCard}>
            <div style={S.statLabel}>Building Since</div>
            <div style={S.statValue}>2023</div>
            <div style={S.statSub}>Self-directed engineering</div>
          </div>
        </div>

        <div>
          <div style={S.sectionLabel}>Featured projects</div>
          {FEATURED.slice(0, recruiterMode ? 3 : 4).map(p => (
            <div key={p.name} style={S.projMini}>
              <div>
                <div style={S.projName}>{p.name}</div>
                <div style={S.projDesc}>{p.desc}</div>
              </div>
              <a style={S.liveLink} href={p.url} target="_blank" rel="noreferrer">↗ Live</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
