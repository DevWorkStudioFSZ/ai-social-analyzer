# MarketMate – Full Stack Social Media Audit & Insights Platform

MarketMate is a **full-stack AI-powered platform** that helps businesses and creators audit their social media presence, discover trends, analyze competitors, and get actionable insights for content strategy.  

- **Frontend:** Next.js + Bootstrap + Recharts (glassmorphism-inspired UI)  
- **Backend:** FastAPI + PostgreSQL + AI integrations (OpenAI, SerpAPI)  
- **Architecture:** Monorepo with separate `frontend` and `backend` branches, while `main` holds documentation.

---

## Features

### 🔹 Frontend
- Responsive **glassmorphism UI** built with Next.js & Bootstrap  
- Competitor insights with charts (Recharts)  
- Planned: Baseline posting times, Trends dashboard  
- Integrates with backend APIs for AI-powered insights  

### 🔹 Backend
- Built with **FastAPI** and **PostgreSQL**  
- AI-powered caption & hashtag generation  
- SEO recommendations and discovery insights  
- Competitor analysis & scheduling  
- RESTful API with Swagger docs at `/docs`  

---

## Tech Stack

**Frontend**  
- Next.js (React 18)  
- Bootstrap 5 + custom SCSS  
- Recharts (data visualization)  

**Backend**  
- FastAPI  
- PostgreSQL + SQLAlchemy  
- APScheduler (task scheduling)  
- OpenAI + NLP models  
- External APIs (e.g. SerpAPI)  

---

## Repository Structure

marketmate/
├── backend/ # Backend branch (FastAPI + PostgreSQL)
├── frontend/ # Frontend branch (Next.js + Bootstrap)
└── main/ # Documentation branch (this README)

yaml
Copy code

---

## Installation & Setup

### Backend (FastAPI)

1. Switch to backend branch:
   ```bash
   git checkout backend
   cd backend
Install dependencies:

bash
Copy code
pip install -r requirements.txt
Run server:

bash
Copy code
uvicorn main:app --reload
Open API docs: http://localhost:8000/docs

Frontend (Next.js)
Switch to frontend branch:

bash
Copy code
git checkout frontend
cd frontend
Install dependencies:

bash
Copy code
npm install
Run development server:

bash
Copy code
npm run dev
Open app: http://localhost:3000

## API Endpoints (Backend)

Method	Endpoint	Description
POST	/generate-post-ideas	Generate content ideas
POST	/analyze	Analyze social content
GET	/analyze	Fetch competitor analysis
POST	/generate-caption-hashtags	AI captions & hashtags
POST	/discover	Competitor & market insights
POST	/recommend-strategy	Strategy recommendations
POST	/best-post-times	Suggest posting times
POST	/generate-seo	SEO recommendations

## Roadmap

 User authentication (JWT-based)

 Save & export reports (PDF/CSV)

 AI-powered hashtag recommendations

 Advanced analytics dashboard

 Deployment (Docker + CI/CD)

## License

This project is licensed under the MIT License.

## Contribution

Fork this repository

Work on backend or frontend branch

Commit changes and push

Open a Pull Request

## Collaborators

Hanzala Salaheen

Syeda Sadaf

Humaira Batool

Khansa Urooj
