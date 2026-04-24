const PROG_LANGS = [
  { name: 'JavaScript (ES6+)', pct: 90, meta: 'Primary · Used in 8 projects · Active' },
  { name: 'Python', pct: 75, meta: 'Backend + AI · Flask, LLM APIs · Active' },
  { name: 'HTML / CSS', pct: 88, meta: 'Frontend foundation · All projects' },
  { name: 'SQL', pct: 65, meta: 'MySQL, PostgreSQL · Used in 3 projects' },
  { name: 'Java', pct: 55, meta: 'OOP, Spring Boot Basic · DSA practice' },
]

const SPOKEN_LANGS = [
  { name: 'English', level: 'Professional' },
  { name: 'Hindi', level: 'Native' },
  { name: 'Marathi', level: 'Conversational' },
]

const S = {
  container: { maxWidth: '800px', margin: '0 auto', padding: '3rem 2rem' },
  title: { fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '0.5rem' },
  sub: { color: '#777', fontSize: '13px', marginBottom: '3rem' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' },
  sLabel: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '2px', textTransform: 'uppercase', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.5rem' },
  progItem: { marginBottom: '20px' },
  progName: { fontSize: '13px', fontWeight: 500, marginBottom: '6px' },
  progTrack: { height: '3px', background: '#1a1a1a', borderRadius: '2px' },
  progFill: (pct) => ({ height: '100%', width: `${pct}%`, background: '#C8FF00', borderRadius: '2px', transition: 'width 0.8s ease' }),
  progMeta: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', marginTop: '5px' },
  spokenCard: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px 16px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  spokenName: { fontSize: '13px', fontWeight: 500 },
  spokenBadge: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C8FF00', padding: '3px 8px', border: '1px solid #C8FF00', borderRadius: '4px' },
}

export default function Languages() {
  return (
    <div style={S.container} className="fade-in">
      <div style={S.title}>Languages</div>
      <div style={S.sub}>Programming languages and spoken languages</div>
      <div style={S.grid}>
        <div>
          <div style={S.sLabel}>Programming languages</div>
          {PROG_LANGS.map(l => (
            <div key={l.name} style={S.progItem}>
              <div style={S.progName}>{l.name}</div>
              <div style={S.progTrack}><div style={S.progFill(l.pct)} /></div>
              <div style={S.progMeta}>{l.meta}</div>
            </div>
          ))}
        </div>
        <div>
          <div style={S.sLabel}>Spoken languages</div>
          {SPOKEN_LANGS.map(l => (
            <div key={l.name} style={S.spokenCard}>
              <span style={S.spokenName}>{l.name}</span>
              <span style={S.spokenBadge}>{l.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
