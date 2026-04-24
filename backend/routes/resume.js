const express = require('express');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const router = express.Router();

const PROFILE = {
  name: 'Harsh Rajesh Singh',
  email: 'harshs288375@gmail.com',
  phone: '+91-9967254145',
  location: 'Nallasopara, Mumbai, Maharashtra',
  github: 'github.com/harsh2055',
  linkedin: 'linkedin.com/in/harsh-singh-b5836b350',
  education: 'BSc. Information Technology · Reena Mehta College, Mumbai University · 2023–2026',
  certifications: [
    'Google Gemini Certified Educator (Jan 2026)',
    'Google Gemini Certified Student – University (Jan 2026)',
    'JPMorgan Chase Software Engineering Job Simulation (Feb 2026)',
    'Deloitte Data Analytics Job Simulation (Feb 2026)'
  ]
};

const ROLE_CONFIG = {
  frontend: {
    label: 'Frontend Developer',
    summary: 'Frontend-focused Full Stack Developer with 2+ years building React-based SaaS and AI-powered applications. Shipped 8 production projects. Experienced in real-time UI, PWA development, and LLM frontend integration. All applications deployed on live production domains.',
    skillCategories: ['frontend'],
    projectCategories: ['saas', 'ai'],
    keywords: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind', 'Chart.js', 'REST API', 'Vercel']
  },
  backend: {
    label: 'Backend Developer',
    summary: 'Backend-focused Full Stack Developer with hands-on experience building REST APIs, designing database schemas, and deploying server-side applications. Built 8+ production backends using Node.js, Python/Flask, Supabase, and Firebase. Experienced in LLM API integration and cloud deployment.',
    skillCategories: ['backend', 'database', 'cloud'],
    projectCategories: ['devtools', 'ai'],
    keywords: ['Node.js', 'Python', 'Flask', 'REST API', 'PostgreSQL', 'MongoDB', 'Supabase', 'Firebase', 'Kafka', 'H2']
  },
  fullstack: {
    label: 'Full Stack Developer',
    summary: 'Full Stack Developer with 2+ years independently designing, building, and deploying 8+ production-grade SaaS and AI-powered applications. Proficient across the entire stack: React frontends, Node.js/Python backends, cloud databases, and LLM integration. All projects live on production domains.',
    skillCategories: ['frontend', 'backend', 'database', 'cloud', 'ai'],
    projectCategories: ['saas', 'ai', 'devtools', 'health'],
    keywords: ['React', 'Node.js', 'Python', 'REST API', 'Supabase', 'Firebase', 'MongoDB', 'LLM', 'Vercel']
  }
};

// POST /api/resume/generate
router.post('/generate', async (req, res) => {
  try {
    const { role = 'fullstack', jobDescription } = req.body;
    const config = ROLE_CONFIG[role] || ROLE_CONFIG.fullstack;

    // Extract keywords from JD if provided
    let extraKeywords = [];
    if (jobDescription) {
      const commonTech = ['react', 'node', 'python', 'java', 'javascript', 'typescript', 'mongodb', 'postgresql',
        'mysql', 'aws', 'docker', 'kubernetes', 'flask', 'django', 'express', 'spring', 'firebase',
        'graphql', 'rest', 'api', 'git', 'ci/cd', 'agile', 'scrum', 'sql', 'nosql', 'redis', 'kafka'];
      const jdLower = jobDescription.toLowerCase();
      extraKeywords = commonTech.filter(k => jdLower.includes(k));
    }

    const [skills, projects] = await Promise.all([
      Skill.find({ category: { $in: config.skillCategories }, status: 'known' }).sort({ order: 1 }),
      Project.find({ category: { $in: config.projectCategories }, status: 'completed' }).sort({ featured: -1, order: 1 }).limit(4)
    ]);

    const resume = {
      profile: PROFILE,
      role: config.label,
      summary: config.summary,
      skills: skills.map(s => s.name),
      skillsByCategory: skills.reduce((acc, s) => {
        if (!acc[s.category]) acc[s.category] = [];
        acc[s.category].push(s.name);
        return acc;
      }, {}),
      projects: projects.map(p => ({
        name: p.name,
        description: p.description,
        techStack: p.techStack,
        liveUrl: p.liveUrl,
        githubUrl: p.githubUrl,
        proof: p.proof
      })),
      education: PROFILE.education,
      certifications: PROFILE.certifications,
      matchedKeywords: jobDescription ? extraKeywords : config.keywords,
      generatedFor: role,
      generatedAt: new Date().toISOString()
    };

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
