import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const S = {
  page: { minHeight: 'calc(100vh - 52px)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  card: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '2.5rem', width: '100%', maxWidth: '380px' },
  title: { fontFamily: 'Syne, sans-serif', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: '0.4rem' },
  sub: { color: '#555', fontSize: '12px', fontFamily: 'DM Mono, monospace', marginBottom: '2rem' },
  group: { marginBottom: '14px' },
  label: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px', display: 'block' },
  input: { width: '100%', background: '#161616', border: '1px solid rgba(255,255,255,0.08)', color: '#eaeaea', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', padding: '10px 14px', borderRadius: '7px', outline: 'none' },
  btn: { width: '100%', background: '#C8FF00', color: '#000', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '13px', padding: '11px', border: 'none', borderRadius: '7px', cursor: 'pointer', marginTop: '6px' },
  error: { color: '#f87171', fontFamily: 'DM Mono, monospace', fontSize: '11px', marginTop: '10px' },
  hint: { marginTop: '1.5rem', padding: '10px 14px', background: '#161616', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '7px', fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555' },
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={S.page}>
      <div style={S.card} className="fade-in">
        <div style={S.title}>Dashboard Login</div>
        <div style={S.sub}>admin access only</div>
        <div style={S.group}>
          <label style={S.label}>Email</label>
          <input style={S.input} type="email" placeholder="admin@email.com" value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
        </div>
        <div style={S.group}>
          <label style={S.label}>Password</label>
          <input style={S.input} type="password" placeholder="••••••••" value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.2)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
        </div>
        <button style={S.btn} onClick={handleLogin} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        {error && <div style={S.error}>{error}</div>}
        <div style={S.hint}>
          Default: harshs288375@gmail.com / admin123<br />
          Run <code>node backend/seed.js</code> to create admin account
        </div>
      </div>
    </div>
  )
}
