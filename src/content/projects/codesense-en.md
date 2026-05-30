---
title: CodeSense (AI Project Manager)
description: A production-grade AI DevOps assistant that listens to GitHub webhooks, runs multi-language static analysis asynchronously, generates AI suggestions, and applies automated fixes via PR.
lang: en
category: commercial
tags: [AI, DevOps, CI/CD]
technologies: [FastAPI, Python, Celery, Redis, PostgreSQL, SQLAlchemy]
images: ['./_images/codesense.png']
publicUrl: https://ai-project-manager-khaki.vercel.app/
featured: true
publishDate: 2026-05-30
order: 1
status: production
---

A **production-grade AI DevOps assistant** that listens to GitHub webhooks, runs multi-language static analysis asynchronously, generates AI suggestions, applies automated fixes via PR, and presents everything through a real-time dashboard with auth.

**Key Features:**
- **Async Job Queue:** Redis + Celery for background analysis
- **Auto-Fix PR:** AI suggestions applied to files, new branch created, PR opened automatically
- **Multi-Language Analysis:** Python (flake8/pylint/bandit), JS/TS (eslint), Docker (hadolint)
- **PostgreSQL Database:** Full ORM with SQLAlchemy, Alembic migrations
- **Advanced Dashboard:** Severity trend chart, filter pills, search, sort, job status polling
