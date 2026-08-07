# SmartOps Dashboard (Frontend)

React frontend for SmartOps — a DevOps monitoring dashboard with AI-powered code review.

## Live Demo
https://smartops-frontend-coral.vercel.app

## Backend Repo
https://github.com/161606/smartops-backend

## Features
- Live dashboard stats (total builds, success rate, AI reviews)
- Recent builds list
- AI Code Review — paste code, get instant feedback on bugs, security issues, and suggestions (powered by Groq's Llama 3.3 70B)

## Tech Stack
- React
- Fetch API for backend communication
- Deployed on Vercel

## Setup
1. Clone the repo
2. `npm install`
3. Create a `.env` file with:
4. 3. Create a `.env` file with:

REACT_APP_API_URL=https://smartops-backend-og6l.onrender.com

4. `npm start`
