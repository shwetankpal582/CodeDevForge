# CodeDevForge Deployment Guide

## Backend Deployment

Your backend needs to be deployed to a hosting service. Here are the recommended options:

### Option 1: Heroku (Recommended for beginners)
1. Create a Heroku account at https://heroku.com
2. Install Heroku CLI
3. Run: `heroku create your-backend-app-name`
4. Set environment variables in Heroku dashboard:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A secure random string for JWT
   - `PORT`: 5000 (Heroku will set this automatically)
   - `CLIENT_URL`: https://codedevforge.netlify.app
5. Deploy: `git push heroku main`

### Option 2: Railway
1. Create Railway account at https://railway.app
2. Connect your GitHub repository
3. Set environment variables in Railway dashboard
4. Deploy automatically

### Option 3: DigitalOcean App Platform
1. Create DigitalOcean account
2. Create new App from GitHub repository
3. Set environment variables
4. Deploy

## MongoDB Setup
1. Create MongoDB Atlas account at https://mongodb.com/atlas
2. Create a cluster
3. Get connection string
4. Replace username, password, and database name

## Environment Variables for Backend
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Random secret for JWT tokens
- `PORT`: Server port (5000)
- `CLIENT_URL`: https://codedevforge.netlify.app

## Frontend Configuration
Once backend is deployed, update the `netlify.toml` file:
```toml
[build.environment]
VITE_BACKEND_URL = "https://your-backend-url.herokuapp.com" # or your actual backend URL
```

## Current Frontend Status
✅ Frontend deployed to: https://codedevforge.netlify.app

## Next Steps
1. Deploy backend to Heroku/Railway/DigitalOcean
2. Set up MongoDB Atlas database
3. Update backend URL in Netlify environment variables
4. Redeploy frontend with correct backend URL
