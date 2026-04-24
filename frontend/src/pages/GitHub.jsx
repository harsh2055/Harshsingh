import { useState, useEffect } from 'react'
import api from '../utils/api'

const S = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' },
  title: { fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '0.5rem' },
  sub: { color: '#777', fontSize: '13px', marginBottom: '2rem' },
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '2rem' },
  statCard: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '16px' },
  statLabel: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#777', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' },
  statValue: { fontFamily: 'Syne, sans-serif', fontSize: '26px', fontWeight: 800 },
  statSub: { fontSize: '11px', color: '#555', marginTop: '2px' },
  insight: { background: 'rgba(200,255,0,0.06)', border: '1px solid rgba(200,255,0,0.2)', borderRadius: '8px', padding: '10px 14px', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#C8FF00', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' },
  sLabel: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '2px', textTransform: 'uppercase', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '14px', marginTop: '2rem' },
  langItem: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' },
  langName: { fontSize: '12px', width: '100px', flexShrink: 0 },
  langTrack: { flex: 1, height: '3px', background: '#1a1a1a', borderRadius: '2px' },
  langPct: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', width: '35px', textAlign: 'right' },
  repoGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '1rem' },
  repoCard: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px' },
  repoName: { fontFamily: 'Syne, sans-serif', fontSize: '13px', fontWeight: 700, marginBottom: '4px' },
  repoDesc: { fontSize: '11px', color: '#777', marginBottom: '8px', lineHeight: 1.5 },
  repoMeta: { display: 'flex', gap: '10px', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555' },
  repoLang: { color: '#C8FF00' },
  hmCell: { width: '10px', height: '10px', borderRadius: '2px' },
}

const LANG_COLORS = { JavaScript: '#C8FF00', Python: '#4ade80', Java: '#60a5fa', 'HTML/CSS': '#f87171', TypeScript: '#818cf8', Other: '#555' }

function Heatmap() {
  const cells = Array.from({ length: 260 }, (_, i) => {
    const r = Math.random()
    const level = r < 0.4 ? 0 : r < 0.6 ? 1 : r < 0.75 ? 2 : r < 0.88 ? 3 : 4
    const colors = ['#1a1a1a', '#1a3a0a', '#2d6b11', '#4ade80', '#C8FF00']
    return colors[level]
  })
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
      {cells.map((c, i) => <div key={i} style={{ ...S.hmCell, background: c }} />)}
    </div>
  )
}

export default function GitHub() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    api.get('/github/stats')
      .then(r => setStats(r.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const langs = stats?.languages || [
    { lang: 'JavaScript', pct: 55 },
    { lang: 'Python', pct: 25 },
    { lang: 'Java', pct: 10 },
    { lang: 'HTML/CSS', pct: 10 },
  ]

  return (
    <div style={S.container} className="fade-in">
      <div style={S.title}>GitHub Activity</div>
      <div style={S.sub}>
        <a href="https://github.com/harsh2055" target="_blank" rel="noreferrer" style={{ color: '#C8FF00' }}>github.com/harsh2055</a>
        {' '}· Consistent builder since 2023
      </div>

      <div style={S.statGrid}>
        <div style={S.statCard}>
          <div style={S.statLabel}>Public Repos</div>
          <div style={S.statValue}>{loading ? '—' : (stats?.publicRepos || '12+')}</div>
          <div style={S.statSub}>Open source</div>
        </div>
        <div style={S.statCard}>
          <div style={S.statLabel}>Followers</div>
          <div style={S.statValue}>{loading ? '—' : (stats?.followers ?? '—')}</div>
          <div style={S.statSub}>GitHub network</div>
        </div>
        <div style={S.statCard}>
          <div style={S.statLabel}>Top Language</div>
          <div style={{ ...S.statValue, fontSize: '18px', marginTop: '4px' }}>JavaScript</div>
          <div style={S.statSub}>React + Node.js</div>
        </div>
        <div style={S.statCard}>
          <div style={S.statLabel}>Shipped Apps</div>
          <div style={S.statValue}>8+</div>
          <div style={S.statSub}>Live deployments</div>
        </div>
      </div>

      <div style={S.insight}>→ Most active in JavaScript — used across all 8 shipped production projects</div>
      <div style={S.insight}>→ Consistent shipping cadence since 2023 — 8+ production apps deployed to live domains</div>
      <div style={S.insight}>→ Full-stack coverage: React frontend + Node.js/Python backend + Supabase/Firebase</div>

      <div style={S.sLabel}>Contribution activity</div>
      <Heatmap />
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', marginTop: '8px' }}>
        Simulated heatmap — visit <a href="https://github.com/harsh2055" target="_blank" rel="noreferrer" style={{ color: '#C8FF00' }}>github.com/harsh2055</a> for live contribution data
      </div>

      <div style={S.sLabel}>Languages used</div>
      {langs.map(({ lang, pct }) => (
        <div key={lang} style={S.langItem}>
          <span style={S.langName}>{lang}</span>
          <div style={S.langTrack}>
            <div style={{ height: '100%', width: `${pct}%`, background: LANG_COLORS[lang] || '#C8FF00', borderRadius: '2px', transition: 'width 0.8s ease' }} />
          </div>
          <span style={S.langPct}>{pct}%</span>
        </div>
      ))}

      {stats?.recentRepos?.length > 0 && (
        <>
          <div style={S.sLabel}>Recent repositories</div>
          <div style={S.repoGrid}>
            {stats.recentRepos.slice(0, 6).map(r => (
              <a key={r.name} href={r.url} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <div style={S.repoCard}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                >
                  <div style={S.repoName}>{r.name}</div>
                  {r.description && <div style={S.repoDesc}>{r.description.slice(0, 80)}{r.description.length > 80 ? '…' : ''}</div>}
                  <div style={S.repoMeta}>
                    {r.language && <span style={S.repoLang}>{r.language}</span>}
                    <span>★ {r.stars}</span>
                    <span>{new Date(r.updatedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </>
      )}

      {error && (
        <div style={{ marginTop: '1rem', padding: '12px 16px', background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#555' }}>
          Add GITHUB_TOKEN to .env for live data. Visit <a href="https://github.com/harsh2055" target="_blank" rel="noreferrer" style={{ color: '#C8FF00' }}>github.com/harsh2055</a> directly.
        </div>
      )}
    </div>
  )
}
