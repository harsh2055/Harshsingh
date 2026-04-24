import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

const S = {
  container: { maxWidth: '960px', margin: '0 auto', padding: '3rem 2rem' },
  title: { fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '0.5rem' },
  sub: { color: '#777', fontSize: '13px', marginBottom: '2.5rem' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '2.5rem' },
  statCard: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '16px' },
  statLabel: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#777', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '8px' },
  statValue: { fontFamily: 'Syne, sans-serif', fontSize: '26px', fontWeight: 800 },
  tabs: { display: 'flex', gap: '6px', marginBottom: '2rem' },
  tab: (active) => ({ background: active ? 'rgba(200,255,0,0.06)' : 'none', border: `1px solid ${active ? '#C8FF00' : 'rgba(255,255,255,0.1)'}`, color: active ? '#C8FF00' : '#777', fontFamily: 'DM Mono, monospace', fontSize: '11px', padding: '7px 16px', borderRadius: '6px', cursor: 'pointer' }),
  sLabel: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', letterSpacing: '2px', textTransform: 'uppercase', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)', letterSpacing: '1px', textTransform: 'uppercase' },
  td: { fontSize: '12px', padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', color: '#aaa', verticalAlign: 'middle' },
  tdName: { fontSize: '13px', fontWeight: 500, color: '#eaeaea' },
  badge: (cat) => ({ fontFamily: 'DM Mono, monospace', fontSize: '9px', padding: '2px 7px', borderRadius: '3px', background: '#161616', border: '1px solid rgba(255,255,255,0.08)', color: '#C8FF00' }),
  deleteBtn: { background: 'none', border: '1px solid rgba(248,113,113,0.3)', color: '#f87171', fontSize: '10px', fontFamily: 'DM Mono, monospace', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' },
  input: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', color: '#eaeaea', fontFamily: 'DM Sans, sans-serif', fontSize: '12px', padding: '7px 10px', borderRadius: '6px', outline: 'none', width: '100%' },
  addForm: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1.5rem', marginTop: '1.5rem' },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' },
  addBtn: { background: '#C8FF00', color: '#000', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '11px', padding: '8px 18px', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  msgCard: { background: '#111', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '14px', marginBottom: '8px' },
  msgName: { fontFamily: 'Syne, sans-serif', fontSize: '13px', fontWeight: 600, marginBottom: '3px' },
  msgEmail: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#C8FF00', marginBottom: '8px' },
  msgText: { fontSize: '12px', color: '#777', lineHeight: 1.7 },
  msgDate: { fontFamily: 'DM Mono, monospace', fontSize: '10px', color: '#555', marginTop: '6px' },
}

export default function Dashboard() {
  const { user } = useAuth()
  const [tab, setTab] = useState('projects')
  const [stats, setStats] = useState(null)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [messages, setMessages] = useState([])
  const [newProject, setNewProject] = useState({ name: '', description: '', category: 'saas', techStack: '', liveUrl: '', githubUrl: '' })

  useEffect(() => {
    api.get('/dashboard/stats').then(r => setStats(r.data)).catch(() => {})
    api.get('/projects').then(r => setProjects(r.data)).catch(() => {})
    api.get('/skills').then(r => setSkills(r.data)).catch(() => {})
    api.get('/contact').then(r => setMessages(r.data)).catch(() => {})
  }, [])

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return
    await api.delete(`/projects/${id}`)
    setProjects(p => p.filter(x => x._id !== id))
  }

  const addProject = async () => {
    try {
      const payload = { ...newProject, techStack: newProject.techStack.split(',').map(s => s.trim()).filter(Boolean) }
      const r = await api.post('/projects', payload)
      setProjects(p => [r.data, ...p])
      setNewProject({ name: '', description: '', category: 'saas', techStack: '', liveUrl: '', githubUrl: '' })
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding project')
    }
  }

  const markRead = async (id) => {
    await api.put(`/contact/${id}/read`)
    setMessages(m => m.map(x => x._id === id ? { ...x, read: true } : x))
  }

  return (
    <div style={S.container} className="fade-in">
      <div style={S.title}>Dashboard</div>
      <div style={S.sub}>Logged in as <span style={{ color: '#C8FF00', fontFamily: 'DM Mono, monospace' }}>{user?.name}</span> · {user?.role}</div>

      {stats && (
        <div style={S.statsRow}>
          <div style={S.statCard}><div style={S.statLabel}>Total Projects</div><div style={S.statValue}>{stats.totalProjects}</div></div>
          <div style={S.statCard}><div style={S.statLabel}>Completed</div><div style={S.statValue}>{stats.completedProjects}</div></div>
          <div style={S.statCard}><div style={S.statLabel}>Skills</div><div style={S.statValue}>{stats.totalSkills}</div></div>
          <div style={S.statCard}><div style={S.statLabel}>Unread Msgs</div><div style={{ ...S.statValue, color: stats.unreadMessages > 0 ? '#C8FF00' : '#eaeaea' }}>{stats.unreadMessages}</div></div>
        </div>
      )}

      <div style={S.tabs}>
        {['projects', 'skills', 'messages'].map(t => (
          <button key={t} style={S.tab(tab === t)} onClick={() => setTab(t)}>{t}</button>
        ))}
      </div>

      {tab === 'projects' && (
        <div>
          <div style={S.sLabel}>All projects ({projects.length})</div>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Name</th>
                <th style={S.th}>Category</th>
                <th style={S.th}>Status</th>
                <th style={S.th}>Live URL</th>
                <th style={S.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p._id}>
                  <td style={{ ...S.td, ...S.tdName }}>{p.name}</td>
                  <td style={S.td}><span style={S.badge(p.category)}>{p.category}</span></td>
                  <td style={S.td}><span style={{ color: p.status === 'completed' ? '#4ade80' : '#C8FF00', fontFamily: 'DM Mono, monospace', fontSize: '10px' }}>{p.status}</span></td>
                  <td style={S.td}>{p.liveUrl ? <a href={p.liveUrl} target="_blank" rel="noreferrer" style={{ color: '#C8FF00', fontFamily: 'DM Mono, monospace', fontSize: '10px' }}>↗ visit</a> : '—'}</td>
                  <td style={S.td}><button style={S.deleteBtn} onClick={() => deleteProject(p._id)}>delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={S.addForm}>
            <div style={{ ...S.sLabel, marginTop: 0 }}>Add new project</div>
            <div style={S.formGrid}>
              <input style={S.input} placeholder="Project name" value={newProject.name} onChange={e => setNewProject(p => ({ ...p, name: e.target.value }))} />
              <select style={{ ...S.input, background: '#161616' }} value={newProject.category} onChange={e => setNewProject(p => ({ ...p, category: e.target.value }))}>
                {['saas', 'ai', 'devtools', 'health', 'other'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input style={S.input} placeholder="Tech stack (comma-separated)" value={newProject.techStack} onChange={e => setNewProject(p => ({ ...p, techStack: e.target.value }))} />
              <input style={S.input} placeholder="Live URL" value={newProject.liveUrl} onChange={e => setNewProject(p => ({ ...p, liveUrl: e.target.value }))} />
            </div>
            <input style={{ ...S.input, marginBottom: '10px' }} placeholder="Description" value={newProject.description} onChange={e => setNewProject(p => ({ ...p, description: e.target.value }))} />
            <button style={S.addBtn} onClick={addProject}>Add Project</button>
          </div>
        </div>
      )}

      {tab === 'skills' && (
        <div>
          <div style={S.sLabel}>All skills ({skills.length})</div>
          <table style={S.table}>
            <thead>
              <tr>
                <th style={S.th}>Name</th>
                <th style={S.th}>Category</th>
                <th style={S.th}>Status</th>
                <th style={S.th}>Projects Used</th>
                <th style={S.th}>Progress</th>
              </tr>
            </thead>
            <tbody>
              {skills.map(s => (
                <tr key={s._id}>
                  <td style={{ ...S.td, ...S.tdName }}>{s.name}</td>
                  <td style={S.td}><span style={S.badge()}>{s.category}</span></td>
                  <td style={S.td}><span style={{ color: s.status === 'known' ? '#4ade80' : '#C8FF00', fontFamily: 'DM Mono, monospace', fontSize: '10px' }}>{s.status}</span></td>
                  <td style={{ ...S.td, fontFamily: 'DM Mono, monospace' }}>{s.projectsUsed || '—'}</td>
                  <td style={{ ...S.td, fontFamily: 'DM Mono, monospace' }}>{s.progress ? `${s.progress}%` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'messages' && (
        <div>
          <div style={S.sLabel}>Contact messages ({messages.length})</div>
          {messages.length === 0 && <div style={{ color: '#555', fontFamily: 'DM Mono, monospace', fontSize: '12px' }}>No messages yet.</div>}
          {messages.map(m => (
            <div key={m._id} style={{ ...S.msgCard, borderColor: m.read ? 'rgba(255,255,255,0.08)' : 'rgba(200,255,0,0.2)' }}>
              <div style={S.msgName}>{m.name} {!m.read && <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '9px', color: '#C8FF00', marginLeft: '6px' }}>NEW</span>}</div>
              <div style={S.msgEmail}>{m.email}</div>
              <div style={S.msgText}>{m.message}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={S.msgDate}>{new Date(m.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                {!m.read && <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#777', fontFamily: 'DM Mono, monospace', fontSize: '10px', padding: '3px 8px', borderRadius: '4px', cursor: 'pointer' }} onClick={() => markRead(m._id)}>mark read</button>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
