import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/github', label: 'GitHub' },
  { to: '/resume', label: 'Resume' },
  { to: '/languages', label: 'Languages' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2rem', height: '52px'
    }}>
      <Link to="/" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '16px', letterSpacing: '-0.5px' }}>
        HS<span style={{ color: '#C8FF00' }}>.</span>
      </Link>

      <div style={{ display: 'flex', gap: '2px' }}>
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              border: 'none',
              color: isActive ? '#C8FF00' : '#777',
              fontFamily: 'DM Sans, sans-serif', fontSize: '12px',
              padding: '6px 12px', borderRadius: '6px', cursor: 'pointer',
              textDecoration: 'none',
              background: isActive ? '#161616' : 'transparent',
              transition: 'color 0.2s'
            })}
          >
            {label}
          </NavLink>
        ))}
        {user && (
          <NavLink to="/dashboard" style={({ isActive }) => ({
            color: isActive ? '#C8FF00' : '#777', fontFamily: 'DM Sans, sans-serif',
            fontSize: '12px', padding: '6px 12px', borderRadius: '6px',
            textDecoration: 'none', background: isActive ? '#161616' : 'transparent'
          })}>
            Dashboard
          </NavLink>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Mono, monospace', fontSize: '11px', color: '#777' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', animation: 'pulse 2s infinite' }} />
          Open to work
        </div>
        {user && (
          <button
            onClick={logout}
            style={{ marginLeft: '8px', background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#777', fontSize: '11px', padding: '4px 10px', borderRadius: '5px', cursor: 'pointer', fontFamily: 'DM Mono, monospace' }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  )
}
