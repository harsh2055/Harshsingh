const S = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '3rem 2rem' },
  title: { fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '0.5rem' },
  sub: { color: '#777', fontSize: '13px', marginBottom: '3rem' },
  grid: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem' },
  bio: { fontSize: '14px', lineHeight: 1.9, color: '#777' },
  sLabel: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '2px', textTransform: 'uppercase', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '14px' },
  certItem: { display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px', background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', marginBottom: '8px' },
  certName: { fontSize: '12px', fontWeight: 500 },
  certIssuer: { fontSize: '11px', color: '#777', marginTop: '2px' },
  certDate: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C8FF00', marginTop: '3px' },
  tlItem: { display: 'flex', gap: '20px', marginBottom: '20px' },
  tlDot: { flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' },
  tlCircle: { width: '8px', height: '8px', borderRadius: '50%', background: '#C8FF00', marginTop: '5px' },
  tlLine: { width: '1px', background: 'rgba(255,255,255,0.1)', flex: 1, marginTop: '4px' },
  tlTitle: { fontFamily: 'Syne, sans-serif', fontSize: '13px', fontWeight: 700 },
  tlSchool: { fontSize: '12px', color: '#777', marginTop: '2px' },
  tlYear: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C8FF00', marginTop: '4px' },
}

const CERTS = [
  { icon: '🏅', name: 'Gemini Certified Educator', issuer: 'Google for Education', date: 'Jan 2026 · Valid through Jan 2029' },
  { icon: '🏅', name: 'Gemini Certified Student (University)', issuer: 'Google for Education', date: 'Jan 2026 · Valid through Jan 2029' },
  { icon: '🏢', name: 'Software Engineering Job Simulation', issuer: 'JPMorgan Chase & Co. via Forage', date: 'Feb 2026 · Kafka, H2, REST API, Spring Boot' },
  { icon: '🏢', name: 'Data Analytics Job Simulation', issuer: 'Deloitte via Forage', date: 'Feb 2026 · Data Analysis, Forensic Technology' },
  { icon: '🎓', name: 'Cyber Awareness Day — Online Quiz', issuer: 'J.K. College of Science and Commerce', date: 'Nov 2024' },
]

export default function About() {
  return (
    <div style={S.container} className="fade-in">
      <div style={S.title}>About</div>
      <div style={S.sub}>BSc.IT student · Full Stack Developer · Mumbai</div>
      <div style={S.grid}>
        <div>
          <div style={S.bio}>
            I'm a <strong style={{ color: '#eaeaea', fontWeight: 500 }}>final-year BSc. Information Technology</strong> student at Reena Mehta College, Mumbai University. Since 2023, I've independently designed, built, and deployed <strong style={{ color: '#eaeaea', fontWeight: 500 }}>8+ full-stack applications</strong> — from peer-to-peer SaaS platforms to AI-powered study tools.
            <br /><br />
            My focus is on <strong style={{ color: '#eaeaea', fontWeight: 500 }}>backend engineering, system design, and LLM integration</strong>. I architect systems that solve real problems — booking flows, real-time databases, AI document processing, and code review automation.
            <br /><br />
            Every project in my portfolio has a <strong style={{ color: '#eaeaea', fontWeight: 500 }}>live domain, real deployment, and a documented problem-solution cycle</strong>. I work across Vercel, Render, Supabase, and Firebase for production deployments.
            <br /><br />
            Currently seeking a <strong style={{ color: '#eaeaea', fontWeight: 500 }}>software engineering internship or full-time role</strong> where I can contribute to high-impact backend or full-stack teams.
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '2rem 0' }} />
          <div style={S.sLabel}>Certifications</div>
          {CERTS.map(c => (
            <div key={c.name} style={S.certItem}>
              <div style={{ fontSize: '18px', flexShrink: 0 }}>{c.icon}</div>
              <div>
                <div style={S.certName}>{c.name}</div>
                <div style={S.certIssuer}>{c.issuer}</div>
                <div style={S.certDate}>{c.date}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div style={S.sLabel}>Education timeline</div>
          <div>
            {[
              { title: 'BSc. Information Technology', school: 'Reena Mehta College · Mumbai University', year: '2023 – 2026', last: false },
              { title: 'HSC – 12th Grade', school: 'Thakur College of Science and Commerce · Mumbai', year: '2022 – 2023', last: false },
              { title: 'SSC – 10th Grade', school: 'Chandresh Lodha Memorial School · Mumbai', year: '2020 – 2021', last: true },
            ].map(item => (
              <div key={item.title} style={S.tlItem}>
                <div style={S.tlDot}>
                  <div style={S.tlCircle} />
                  {!item.last && <div style={S.tlLine} />}
                </div>
                <div style={{ paddingBottom: '10px' }}>
                  <div style={S.tlTitle}>{item.title}</div>
                  <div style={S.tlSchool}>{item.school}</div>
                  <div style={S.tlYear}>{item.year}</div>
                </div>
              </div>
            ))}
          </div>
          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '2rem 0' }} />
          <div style={S.sLabel}>Contact</div>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#777', lineHeight: 2.2 }}>
            <div>📧 harshs288375@gmail.com</div>
            <div>📞 +91-9967254145</div>
            <div>📍 Nallasopara, Mumbai, Maharashtra</div>
            <div>🔗 <a href="https://github.com/harsh2055" target="_blank" style={{ color: '#C8FF00' }}>github.com/harsh2055</a></div>
            <div>🔗 <a href="https://linkedin.com/in/harsh-singh-b5836b350" target="_blank" style={{ color: '#C8FF00' }}>linkedin.com/in/harsh-singh</a></div>
          </div>
        </div>
      </div>
    </div>
  )
}
