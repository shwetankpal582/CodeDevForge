# Railway Deployment Troubleshooting Guide

## Common Build Failures and Solutions

### 1. "Build failed: No buildpack detected"

**Error Message:**

```
Build failed: No buildpack detected
```

**Solution:**

- Ensure you're deploying from the `backend` directory
- Verify `package.json` exists in the root of your deployment directory
- Check that `package.json` has valid JSON syntax

### 2. "Module not found" Errors

**Error Message:**

```
Error: Cannot find module 'express'
Error: Cannot find module 'mongoose'
```

**Solution:**

- Verify all dependencies are listed in `package.json`
- Check that `node_modules` is in `.gitignore`
- Ensure `package-lock.json` is committed to the repository

### 3. "Environment variable not defined"

**Error Message:**

```
ReferenceError: process.env.MONGO_URI is not defined
ReferenceError: process.env.JWT_SECRET is not defined
```

**Solution:**

1. Go to Railway dashboard → Your project → Variables
2. Add the missing environment variables:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
   JWT_SECRET=your-secret-key-here
   ```
3. Redeploy the application

### 4. "MongoDB connection failed"

**Error Message:**

```
MongoServerSelectionError: connect ECONNREFUSED
MongoServerSelectionError: Authentication failed
```

**Solution:**

1. Verify your MongoDB Atlas connection string
2. Check MongoDB Atlas Network Access settings
3. Ensure your IP is whitelisted or use `0.0.0.0/0` for testing
4. Verify username/password in the connection string

### 5. "Port already in use"

**Error Message:**

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

- Railway automatically assigns ports, so remove any hardcoded port usage
- Use `process.env.PORT || 5000` in your code

### 6. "Build timeout"

**Error Message:**

```
Build timed out after 15 minutes
```

**Solution:**

- Check for infinite loops in your code
- Ensure all dependencies are properly specified
- Remove any unnecessary build steps

## Runtime Errors

### 1. "Application crashed"

**Check the logs for:**

- Missing environment variables
- Database connection issues
- Syntax errors in your code

**Solution:**

1. View logs in Railway dashboard
2. Fix the specific error mentioned in logs
3. Redeploy

### 2. "Health check failed"

**Error Message:**

```
Health check failed: GET / returned 500
```

**Solution:**

- Ensure your root endpoint (`/`) returns a 200 status
- Check that the application starts without errors
- Verify all required services (MongoDB) are accessible

## Debugging Steps

### Step 1: Check Build Logs

1. Go to Railway dashboard
2. Click on your project
3. Go to "Deployments" tab
4. Click on the failed deployment
5. Review the build logs for specific error messages

### Step 2: Validate Environment Variables

Run the validation script locally:

```bash
cd backend
npm run validate-env
```

### Step 3: Test Locally

1. Set up environment variables locally
2. Run `npm start`
3. Test all endpoints
4. Ensure MongoDB connection works

### Step 4: Check Dependencies

Verify all required packages are in `package.json`:

```json
{
  "dependencies": {
    "express": "^4.21.2",
    "mongoose": "^8.9.4",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "socket.io": "^4.8.1"
  }
}
```

## Quick Fixes

### Fix 1: Update Railway Configuration

Ensure you have these files in your `backend` directory:

- `railway.json`
- `railway.toml`
- `.nvmrc`
- `package.json`

### Fix 2: Environment Variables Template

Use this template for Railway environment variables:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/codedevforge?retryWrites=true&w=majority
JWT_SECRET=your-64-character-secret-key-here
NODE_ENV=production
PORT=5000
CLIENT_URL=https://codedevforge.netlify.app
```

### Fix 3: MongoDB Atlas Setup

1. Create MongoDB Atlas account
2. Create a cluster
3. Create a database user
4. Get connection string
5. Update Network Access to allow all IPs (`0.0.0.0/0`)

## Getting Help

If you're still having issues:

1. **Check Railway Status**: https://status.railway.app
2. **Review Documentation**: https://docs.railway.app
3. **Join Discord**: Railway has an active Discord community
4. **Check Logs**: Always check the detailed logs in Railway dashboard

## Common Configuration Issues

### Issue: Wrong deployment directory

**Solution**: Make sure you're deploying from the `backend` directory, not the root

### Issue: Missing Node.js version

**Solution**: Add `.nvmrc` file with Node.js version (e.g., `18.17.0`)

### Issue: CORS errors after deployment

**Solution**: Update CORS configuration to include your frontend URL

### Issue: JWT token validation fails

**Solution**: Ensure JWT_SECRET is the same across all environments

