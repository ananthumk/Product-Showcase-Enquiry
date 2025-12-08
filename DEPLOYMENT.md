# Deployment Guide

## Backend Deployment Issues & Solutions

### Problem: SQLite doesn't work on serverless platforms
SQLite is a file-based database that doesn't persist data on serverless/cloud platforms (Render, Railway, Vercel, Heroku) because:
- File system is ephemeral (temporary)
- Data is lost when server restarts
- No shared storage between instances

### Current Status
❌ **SQLite (Local)** - Works on local machine only
✅ **Need cloud database** - For production deployment

---

## Solution: Switch to PostgreSQL or MySQL

### Option 1: PostgreSQL (Recommended)
Best for serverless deployments

**Steps:**
1. Create free PostgreSQL database:
   - Go to [Render.com](https://render.com) → Create PostgreSQL instance
   - Or use [Railway.app](https://railway.app) → Add PostgreSQL
   - Or use [Elephant SQL](https://www.elephantsql.com) (Free tier)

2. Copy your connection string (e.g., `postgresql://user:pass@host:port/db`)

3. Update your `backend/db/db.js` to use PostgreSQL:
```javascript
const pg = require('pg');
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

module.exports = pool;
```

4. Install PostgreSQL driver:
```bash
cd backend
npm install pg
```

5. Update your queries from SQLite to PostgreSQL syntax (minimal changes)

6. Set environment variable on your hosting platform:
   - `DATABASE_URL=postgresql://...`

---

## Deploying Backend

### 1. **Render.com** (Easiest)
1. Go to [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect GitHub repository
4. Choose `backend` as root directory
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables:
   - `DATABASE_URL=your_postgres_url`
8. Click "Create Web Service"

### 2. **Railway.app**
1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repo
4. Add PostgreSQL service
5. Set `DATABASE_URL` from PostgreSQL connection
6. Deploy backend service
7. Configure start command: `npm start`

### 3. **Heroku** (Paid - $5/month minimum)
1. `npm install -g heroku`
2. `heroku login`
3. `heroku create your-app-name`
4. `heroku addons:create heroku-postgresql:hobby-dev`
5. `git push heroku main`

---

## Deploying Frontend

### Vercel (Recommended)
1. Go to [Vercel.com](https://vercel.com)
2. Import GitHub repository
3. **Root Directory:** Set to `./frontend`
4. Environment variable:
   - `REACT_APP_API_URL=https://your-backend-url.com`
5. Deploy

### Update Frontend for Production Backend
Edit `frontend/src/App.js`:
```javascript
const url = process.env.REACT_APP_API_URL || 'http://localhost:4000/api'
```

---

## Quick Fix: Test Deployed Backend

1. Visit: `https://your-backend-url.com/health`
2. Should return: `{"status":"Server is running"}`
3. If error → Check logs and environment variables

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find database" | Add DATABASE_URL environment variable |
| "Connection refused" | Database URL is incorrect or database is down |
| "404 on /health" | Backend didn't deploy (check build logs) |
| Frontend can't reach backend | Add CORS origin URL to backend |
| Data disappearing | Using SQLite - migrate to PostgreSQL |

---

## Environment Variables Checklist

**Backend needs:**
- ✅ `PORT` (optional, defaults to 4000)
- ✅ `DATABASE_URL` (for PostgreSQL/MySQL)
- ✅ `NODE_ENV=production` (optional but recommended)

**Frontend needs:**
- ✅ `REACT_APP_API_URL` (production backend URL)

---

## After Deployment

1. Update `frontend/src/App.js` with your backend URL
2. Test API endpoints:
   - GET `/api/products` - Should return products
   - GET `/health` - Should return 200 OK
3. Commit and push changes
4. Frontend will auto-redeploy on GitHub push

