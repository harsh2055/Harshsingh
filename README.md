# Harsh Singh — Developer Portfolio Platform

A production-grade, multi-page developer portfolio built with React + Vite (frontend) and Node.js + Express + MongoDB (backend).

---

## Tech Stack

**Frontend:** React 18, Vite, React Router v6, Tailwind CSS, Axios  
**Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT Auth  
**APIs:** GitHub REST API  
**Deployment:** Vercel (frontend), Render (backend)

---

## Folder Structure

```
harsh-portfolio/
├── frontend/               # React + Vite app
│   ├── src/
│   │   ├── pages/          # Home, About, Projects, Skills, GitHub, Resume, Languages, Contact, Login, Dashboard
│   │   ├── components/     # Navbar, RecruiterToggle
│   │   ├── context/        # AuthContext (JWT)
│   │   └── utils/          # api.js (Axios instance)
│   ├── index.html
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                # Express API
│   ├── models/             # User, Project, Skill, Contact
│   ├── routes/             # auth, projects, skills, github, contact, resume, dashboard
│   ├── middleware/         # auth.js (JWT protect + adminOnly)
│   ├── seed.js             # Seeds all real data into MongoDB
│   ├── server.js
│   └── .env.example
```

---

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git

---

### 1. Clone & Install

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

### 2. Configure Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/harsh-portfolio
JWT_SECRET=change_this_to_a_long_random_string
JWT_EXPIRES_IN=7d
GITHUB_USERNAME=harsh2055
GITHUB_TOKEN=your_github_pat_optional_but_recommended
EMAIL_USER=harshs288375@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=harshs288375@gmail.com
```

> **GitHub Token:** Go to github.com → Settings → Developer settings → Personal access tokens → Generate token (public_repo scope). This enables live GitHub stats.

> **Email (optional):** Use a Gmail App Password (not your main password). Go to Google Account → Security → 2-Step Verification → App Passwords.

---

### 3. Seed the Database

```bash
cd backend
node seed.js
```

This will:
- Create all 8 projects with real data
- Create all skills (known + learning)
- Create admin user: `harshs288375@gmail.com` / `admin123`

> **Important:** Change the admin password after first login via the Dashboard.

---

### 4. Run Backend

```bash
cd backend
npm run dev      # development (nodemon)
# or
npm start        # production
```

Backend runs at: `http://localhost:5000`

---

### 5. Run Frontend

```bash
cd frontend
npm run dev
```

Frontend runs at: `http://localhost:5173`

The Vite dev server proxies `/api/*` → `http://localhost:5000` automatically.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — asymmetric layout, live GitHub stats, featured projects |
| `/about` | Bio, education timeline, certifications |
| `/projects` | All 8 projects with filterable categories + problem/solution proof |
| `/skills` | Skills by category with usage credibility + learning tracker |
| `/github` | GitHub activity, heatmap, language stats, recent repos |
| `/resume` | Role-based resume builder (Frontend/Backend/Fullstack) with PDF export |
| `/languages` | Programming + spoken languages |
| `/contact` | Contact form (saves to DB + sends email) |
| `/login` | Admin login |
| `/dashboard` | Protected — manage projects, skills, messages |

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register user |
| POST | `/api/auth/login` | Login, returns JWT |
| GET | `/api/auth/me` | Get current user (protected) |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects (public) |
| GET | `/api/projects/:id` | Get single project |
| POST | `/api/projects` | Add project (admin) |
| PUT | `/api/projects/:id` | Update project (admin) |
| DELETE | `/api/projects/:id` | Delete project (admin) |

### Skills
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/skills` | Get all skills |
| POST | `/api/skills` | Add skill (admin) |
| PUT | `/api/skills/:id` | Update skill (admin) |
| DELETE | `/api/skills/:id` | Delete skill (admin) |

### GitHub
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/github/stats` | GitHub profile + repos + languages |
| GET | `/api/github/contributions` | Repo summary stats |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all messages (admin) |
| PUT | `/api/contact/:id/read` | Mark as read (admin) |

### Resume
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/resume/generate` | Generate role-based resume |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/stats` | Get platform stats (admin) |

---

## Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Deploy dist/ to Vercel
# Set environment variable: VITE_API_URL=https://your-backend.onrender.com
```

Update `vite.config.js` proxy to use `VITE_API_URL` for production, or set the axios baseURL in `src/utils/api.js` to your backend URL.

### Backend → Render
1. Create a new Web Service on Render
2. Connect your GitHub repo
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add all environment variables from `.env`

### MongoDB → Atlas
1. Create free cluster at mongodb.com/atlas
2. Get connection string
3. Replace `MONGODB_URI` in your environment

---

## Features

- ✅ 10 pages fully functional
- ✅ JWT authentication + protected dashboard
- ✅ Admin CRUD for projects/skills
- ✅ GitHub live API integration
- ✅ Role-based resume generator (Frontend/Backend/Fullstack)
- ✅ Recruiter Mode toggle
- ✅ Contact form with DB storage + email notification
- ✅ Skeleton loaders + fade-in animations
- ✅ Dark premium design (Syne + DM Sans + DM Mono)
- ✅ Real data — no placeholders

---

## Admin Credentials (after seeding)

```
Email:    harshs288375@gmail.com
Password: admin123
```

**Change this immediately after first login.**

---

Built for Harsh Rajesh Singh · github.com/harsh2055
