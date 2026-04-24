export default function RecruiterToggle({ enabled, onToggle }) {
  return (
    <div
      onClick={onToggle}
      style={{
        position: 'fixed', bottom: '24px', right: '24px', zIndex: 200,
        background: '#111', border: `1px solid ${enabled ? '#C8FF00' : 'rgba(255,255,255,0.14)'}`,
        borderRadius: '10px', padding: '10px 16px',
        display: 'flex', alignItems: 'center', gap: '10px',
        cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        transition: 'border-color 0.2s'
      }}
    >
      <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#777' }}>Recruiter mode</span>
      <div style={{
        width: '32px', height: '18px',
        background: enabled ? '#C8FF00' : '#222',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '9px', position: 'relative', transition: 'background 0.3s'
      }}>
        <div style={{
          width: '12px', height: '12px', background: 'white',
          borderRadius: '50%', position: 'absolute', top: '2px',
          left: enabled ? '16px' : '2px', transition: 'left 0.3s'
        }} />
      </div>
    </div>
  )
}
