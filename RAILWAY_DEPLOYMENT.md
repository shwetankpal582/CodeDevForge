# Railway Deployment Guide for CodeDevForge

## Prerequisites

1. Railway account at https://railway.app
2. GitHub repository connected to Railway
3. MongoDB Atlas database set up

## Step-by-Step Deployment

### 1. Connect Repository to Railway

1. Go to Railway dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your CodeDevForge repository
5. Select the `backend` directory as the source

### 2. Set Environment Variables

In Railway dashboard, go to your project → Variables tab and add:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/codedevforge?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
PORT=5000
CLIENT_URL=https://codedevforge.netlify.app
```

**Important Notes:**

- Replace `username`, `password`, and `cluster` with your actual MongoDB Atlas credentials
- Generate a strong JWT_SECRET (you can use: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`)
- The PORT will be automatically set by Railway

### 3. Configure Build Settings

Railway will automatically detect the Node.js project and use the configuration files we've added:

- `railway.json` - Main configuration
- `railway.toml` - Alternative configuration
- `.nvmrc` - Node.js version specification
- `package.json` - Dependencies and scripts

### 4. Deploy

1. Railway will automatically start building when you connect the repository
2. Monitor the build logs for any errors
3. Once deployed, Railway will provide a URL like: `https://your-app-name.railway.app`

### 5. Update Frontend Configuration

After successful backend deployment, update your frontend's backend URL:

1. Go to Netlify dashboard
2. Navigate to Site settings → Environment variables
3. Add/update: `VITE_BACKEND_URL=https://your-app-name.railway.app`
4. Redeploy the frontend

## Troubleshooting Common Issues

### Build Failures

**Issue: "Module not found" errors**

- Solution: Ensure all dependencies are in `package.json`
- Check that `node_modules` is in `.gitignore`

**Issue: "Port already in use"**

- Solution: Railway handles port assignment automatically
- Remove any hardcoded port in your code

**Issue: "Environment variables not found"**

- Solution: Double-check all required environment variables are set in Railway dashboard
- Ensure variable names match exactly (case-sensitive)

**Issue: "MongoDB connection failed"**

- Solution: Verify MONGO_URI is correct
- Check MongoDB Atlas network access settings
- Ensure IP whitelist includes Railway's IPs or use 0.0.0.0/0 for testing

### Runtime Errors

**Issue: "JWT_SECRET not defined"**

- Solution: Set JWT_SECRET environment variable in Railway

**Issue: "CORS errors"**

- Solution: Update CORS configuration in `index.js` to include your frontend URL

## Monitoring and Logs

1. **View Logs**: Railway dashboard → Deployments → View logs
2. **Health Checks**: Railway automatically checks the `/` endpoint
3. **Metrics**: Monitor CPU, memory usage in Railway dashboard

## Production Checklist

- [ ] All environment variables set
- [ ] MongoDB Atlas configured and accessible
- [ ] Frontend backend URL updated
- [ ] CORS settings configured
- [ ] Health check endpoint responding
- [ ] SSL certificate active (automatic with Railway)

## Support

If you continue to have issues:

1. Check Railway's status page
2. Review build logs carefully
3. Verify all configuration files are present
4. Ensure repository is properly connected

## Alternative: Quick Deploy with Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

