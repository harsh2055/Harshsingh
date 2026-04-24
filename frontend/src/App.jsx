import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import RecruiterToggle from './components/RecruiterToggle'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import GitHub from './pages/GitHub'
import ResumeBuilder from './pages/ResumeBuilder'
import Languages from './pages/Languages'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { useState } from 'react'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex items-center justify-center h-screen text-muted font-mono text-sm">Loading...</div>
  return user ? children : <Navigate to="/login" />
}

function AppContent() {
  const [recruiterMode, setRecruiterMode] = useState(false)
  return (
    <>
      <Navbar />
      {recruiterMode && (
        <div style={{ background: '#C8FF00', color: '#000', textAlign: 'center', padding: '6px', fontFamily: 'DM Mono, monospace', fontSize: '11px', letterSpacing: '1px' }}>
          RECRUITER VIEW ENABLED — SHOWING TOP HIGHLIGHTS
        </div>
      )}
      <Routes>
        <Route path="/" element={<Home recruiterMode={recruiterMode} />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects recruiterMode={recruiterMode} />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/github" element={<GitHub />} />
        <Route path="/resume" element={<ResumeBuilder />} />
        <Route path="/languages" element={<Languages />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
      <RecruiterToggle enabled={recruiterMode} onToggle={() => setRecruiterMode(v => !v)} />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
