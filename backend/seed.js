require('dotenv').config();
const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const User = require('./models/User');

const PROJECTS = [
  {
    name: 'DriveX',
    description: 'Peer-to-peer car rental SaaS platform. Owners list vehicles, verified users book. Airbnb model for cars.',
    longDescription: 'Built a full-scale P2P car rental marketplace enabling vehicle owners to list and rent cars to verified users. Implemented end-to-end booking flow with real-time availability, user authentication, and payment-ready infrastructure.',
    status: 'completed',
    category: 'saas',
    techStack: ['React', 'Node.js', 'Supabase', 'REST APIs'],
    liveUrl: 'https://drivex.qzz.io',
    githubUrl: 'https://github.com/harsh2055',
    featured: true,
    order: 1,
    proof: {
      problem: 'No verified peer-to-peer car rental platform existed in the Indian market at an accessible price point',
      challenge: 'Handling real-time booking conflicts when multiple users attempt to book the same vehicle simultaneously',
      solution: 'Implemented Supabase row-level security with optimistic UI updates and server-side booking lock validation'
    }
  },
  {
    name: 'Stackbase',
    description: 'Full-stack developer platform. Visually design databases, generate APIs, and deploy backend services — no-code/low-code.',
    longDescription: 'Developer platform enabling users to visually design databases, generate REST APIs, and deploy backend services. Integrated AI features, real-time capabilities, and serverless function execution within a unified interface.',
    status: 'completed',
    category: 'devtools',
    techStack: ['React', 'Node.js', 'REST APIs', 'Supabase', 'AI'],
    liveUrl: 'https://stackbase-navy.vercel.app',
    githubUrl: 'https://github.com/harsh2055',
    featured: true,
    order: 2,
    proof: {
      problem: 'Backend setup and API scaffolding wastes days in rapid prototyping workflows',
      challenge: 'Integrating real-time capabilities with serverless execution in a unified interface',
      solution: 'Built unified AI+realtime+serverless interface with Supabase as the backbone'
    }
  },
  {
    name: 'HerCare',
    description: 'Women\'s health companion app. Menstrual tracking, pregnancy monitoring, symptom logging, personalized diet and exercise plans.',
    longDescription: 'Comprehensive women\'s health companion app with menstrual cycle tracking, pregnancy monitoring, symptom logging, and personalized diet and exercise plan modules with smart reminders driven by user health data.',
    status: 'completed',
    category: 'health',
    techStack: ['React', 'Flask', 'Node.js', 'Firebase'],
    liveUrl: 'https://hercare-tau.vercel.app',
    githubUrl: 'https://github.com/harsh2055',
    featured: true,
    order: 3,
    proof: {
      problem: 'No unified women\'s health tracker with AI-driven personalization existed for the Indian user base',
      challenge: 'Handling sensitive health data securely with user-specific personalization at scale',
      solution: 'Firebase auth with user-specific data isolation and ML-based personalization engine'
    }
  },
  {
    name: 'StudyAI',
    description: 'AI-powered study assistant. Upload PDFs → structured summaries, exam questions, interactive Q&A with intelligent document understanding.',
    longDescription: 'AI study assistant that converts uploaded PDFs into structured summaries, exam questions, and interactive Q&A sessions. Leveraged LLM integration to enable intelligent document understanding and real-time student query resolution.',
    status: 'completed',
    category: 'ai',
    techStack: ['React', 'Python', 'LLM APIs', 'PDF Processing'],
    liveUrl: 'https://studyai-cc5l.onrender.com',
    githubUrl: 'https://github.com/harsh2055',
    featured: true,
    order: 4,
    proof: {
      problem: 'Students waste hours manually extracting key content from large PDF documents',
      challenge: 'LLM latency issues and maintaining PDF parsing accuracy across different document formats',
      solution: 'Chunked PDF processing pipeline with streaming LLM output for near-instant first response'
    }
  },
  {
    name: 'WeatherVue',
    description: 'Full-stack weather app with AI chatbot and PWA support. Real-time visualization and conversational weather queries.',
    longDescription: 'Production-ready full-stack weather app with integrated AI chatbot and Progressive Web App support. Implemented real-time weather data visualization and conversational AI assistance for weather queries.',
    status: 'completed',
    category: 'ai',
    techStack: ['React', 'Node.js', 'Supabase', 'OpenWeatherMap API'],
    liveUrl: 'https://weather-vue-ruddy.vercel.app',
    githubUrl: 'https://github.com/harsh2055',
    featured: false,
    order: 5,
    proof: {
      problem: 'Weather apps lack conversational context — users cannot ask follow-up questions about forecasts',
      challenge: 'PWA offline support combined with real-time API data and rate limiting',
      solution: 'Service worker with intelligent caching strategy and request debouncing'
    }
  },
  {
    name: 'ProposalAI',
    description: 'AI-powered proposal generator. Structured professional proposals for business, freelance, and academic use — instant generation.',
    longDescription: 'Full-stack AI-powered proposal generator enabling users to produce structured professional proposals for business, freelance, and academic use. Integrated LLM backend with customizable output formats.',
    status: 'completed',
    category: 'ai',
    techStack: ['React', 'Node.js', 'Generative AI'],
    liveUrl: 'https://proposal-ai-eosin.vercel.app',
    githubUrl: 'https://github.com/harsh2055',
    featured: false,
    order: 6,
    proof: {
      problem: 'Writing client proposals is time-intensive and often inconsistent in quality',
      challenge: 'Achieving consistent, structured output quality from generative LLMs',
      solution: 'Structured prompt engineering with output templates and customizable output formats'
    }
  },
  {
    name: 'CodeCritic AI',
    description: 'AI code reviewer. Analyzes source code and returns quality scores, issue severity ratings, strengths, and improvement suggestions.',
    longDescription: 'AI-powered code review web app that analyzes source code and returns quality scores, issue severity ratings, strengths, and improvement suggestions.',
    status: 'completed',
    category: 'devtools',
    techStack: ['React', 'AI APIs'],
    liveUrl: 'https://code-critic-ai-de7cf6dc.base44.app',
    githubUrl: 'https://github.com/harsh2055',
    featured: false,
    order: 7,
    proof: {
      problem: 'Code review is bottlenecked by senior developer availability in small teams',
      challenge: 'Generating consistent, actionable AI feedback rather than generic suggestions',
      solution: 'Structured scoring rubrics embedded in system prompts with severity classification'
    }
  },
  {
    name: 'ExpenseFlow',
    description: 'Personal finance tracker with dynamic chart-driven visualization for income and expense analysis.',
    longDescription: 'Personal finance tracker with dynamic chart-driven visualization for income and expense analysis using Chart.js reactive datasets.',
    status: 'completed',
    category: 'saas',
    techStack: ['React', 'JavaScript', 'Chart.js'],
    liveUrl: 'https://expense-flow-a4f205d8.base44.app',
    githubUrl: 'https://github.com/harsh2055',
    featured: false,
    order: 8,
    proof: {
      problem: 'Manual expense tracking spreadsheets lack visual clarity for spending pattern analysis',
      challenge: 'Real-time chart updates when data changes without full re-renders',
      solution: 'Chart.js reactive datasets with local state management for instant updates'
    }
  }
];

const SKILLS = [
  // Frontend
  { name: 'React.js', category: 'frontend', projectsUsed: 7, lastUsed: 'Active', status: 'known', order: 1 },
  { name: 'JavaScript (ES6+)', category: 'frontend', projectsUsed: 8, lastUsed: 'Active', status: 'known', order: 2 },
  { name: 'HTML5 / CSS3', category: 'frontend', projectsUsed: 8, lastUsed: 'Active', status: 'known', order: 3 },
  { name: 'Tailwind CSS', category: 'frontend', projectsUsed: 4, lastUsed: '2025', status: 'known', order: 4 },
  { name: 'Chart.js', category: 'frontend', projectsUsed: 2, lastUsed: '2025', status: 'known', order: 5 },
  // Backend
  { name: 'Node.js', category: 'backend', projectsUsed: 6, lastUsed: 'Active', status: 'known', order: 6 },
  { name: 'Python', category: 'backend', projectsUsed: 3, lastUsed: 'Active', status: 'known', order: 7 },
  { name: 'Flask', category: 'backend', projectsUsed: 2, lastUsed: 'Active', status: 'known', order: 8 },
  { name: 'REST API Design', category: 'backend', projectsUsed: 8, lastUsed: 'Active', status: 'known', order: 9 },
  { name: 'LLM / AI API Integration', category: 'ai', projectsUsed: 4, lastUsed: 'Active', status: 'known', order: 10 },
  { name: 'Spring Boot (Basic)', category: 'backend', projectsUsed: 1, lastUsed: '2025', status: 'known', order: 11 },
  // Databases
  { name: 'Supabase', category: 'database', projectsUsed: 3, lastUsed: 'Active', status: 'known', order: 12 },
  { name: 'Firebase', category: 'database', projectsUsed: 2, lastUsed: '2025', status: 'known', order: 13 },
  { name: 'MongoDB', category: 'database', projectsUsed: 2, lastUsed: '2025', status: 'known', order: 14 },
  { name: 'PostgreSQL', category: 'database', projectsUsed: 2, lastUsed: '2025', status: 'known', order: 15 },
  { name: 'MySQL', category: 'database', projectsUsed: 1, lastUsed: '2025', status: 'known', order: 16 },
  // Cloud
  { name: 'Vercel', category: 'cloud', projectsUsed: 8, lastUsed: 'Active', status: 'known', order: 17 },
  { name: 'Render', category: 'cloud', projectsUsed: 2, lastUsed: 'Active', status: 'known', order: 18 },
  { name: 'Cloudinary', category: 'cloud', projectsUsed: 1, lastUsed: '2025', status: 'known', order: 19 },
  { name: 'Git / GitHub', category: 'tools', projectsUsed: 8, lastUsed: 'Active', status: 'known', order: 20 },
  // Learning
  { name: 'System Design', category: 'backend', status: 'learning', progress: 60, learningSource: 'Self-study + books', order: 21 },
  { name: 'TypeScript', category: 'frontend', status: 'learning', progress: 35, learningSource: 'Side projects', order: 22 },
  { name: 'Docker / DevOps', category: 'cloud', status: 'learning', progress: 25, learningSource: 'Self-study', order: 23 },
  { name: 'Java (Advanced DSA)', category: 'language', status: 'learning', progress: 45, learningSource: 'Practice + projects', order: 24 }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    await Project.deleteMany({});
    await Skill.deleteMany({});
    console.log('Cleared existing data');

    await Project.insertMany(PROJECTS);
    console.log(`Seeded ${PROJECTS.length} projects`);

    await Skill.insertMany(SKILLS);
    console.log(`Seeded ${SKILLS.length} skills`);

    // Create admin user if not exists
    const adminExists = await User.findOne({ email: 'harshs288375@gmail.com' });
    if (!adminExists) {
      await User.create({
        name: 'Harsh Singh',
        email: 'harshs288375@gmail.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created: harshs288375@gmail.com / admin123');
      console.log('IMPORTANT: Change the password after first login!');
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
