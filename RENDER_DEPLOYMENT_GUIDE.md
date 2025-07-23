# HealthSync - Complete Render Deployment Guide

Deploy your HealthSync healthcare application to production using Render's free hosting platform with PostgreSQL database.

## 🎯 **Deployment Overview**

This guide deploys:
- **Backend API**: Node.js/Express server with PostgreSQL (Port 10000)
- **Frontend**: Next.js static site with optimized build
- **Database**: PostgreSQL with sample data (Free tier)

## 📋 **Prerequisites**

- ✅ GitHub account with HealthSync repository
- ✅ Render account (free at [render.com](https://render.com))
- ✅ Repository pushed to GitHub with latest changes

## 🚀 **Step-by-Step Deployment**

### **Step 1: Create PostgreSQL Database**

1. **Access Render Dashboard**
   ```
   URL: https://dashboard.render.com
   Action: Sign up/Login with GitHub
   ```

2. **Create Database Service**
   - Click **"New +"** → **"PostgreSQL"**
   - Configuration:
     - **Name**: `healthsync-database`
     - **Database**: `healthsync`
     - **User**: `healthsync_user`
     - **Region**: Oregon (or closest to you)
     - **PostgreSQL Version**: 15
     - **Plan**: **Free**
   - Click **"Create Database"**

3. **Wait for Database Creation**
   - Status will show "Creating..." (takes 2-3 minutes)
   - Once ready, status shows "Available"

4. **Get Database Connection Details**
   - Go to database dashboard
   - Copy **"External Database URL"**
   - Format: `postgresql://healthsync_user:[PASSWORD]@[HOST]/healthsync`
   - **Save this URL** - needed for backend deployment

### **Step 2: Initialize Database Schema**

1. **Access Database**
   - In database dashboard, click **"Connect"**
   - Use provided connection details with PostgreSQL client
   - Or use Render's web-based query interface

2. **Run Schema Script**
   - Copy contents of `database-schema.sql` from your repository
   - Execute the entire script in your database
   - This creates all tables, indexes, and sample data

3. **Verify Setup**
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```
   - Should show: users, appointments, health_records, notifications, device_data, ai_insights

### **Step 3: Deploy Backend API**

1. **Create Web Service**
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Select **HealthSync** repository

2. **Configure Backend Service**
   ```yaml
   Name: healthsync-backend
   Region: Oregon
   Branch: main
   Runtime: Node
   Build Command: cd backend && npm install && npm run build
   Start Command: cd backend && npm start
   Plan: Free
   ```

3. **Set Environment Variables**
   - In service settings, go to **"Environment"**
   - Add these variables:
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=[Your PostgreSQL URL from Step 1]
   JWT_SECRET=[Generate strong 32+ character secret]
   CORS_ORIGIN=https://healthsync-frontend.onrender.com
   ```

4. **Generate JWT Secret**
   ```bash
   # Use this command to generate a secure JWT secret:
   openssl rand -base64 32
   ```

5. **Deploy Backend**
   - Click **"Create Web Service"**
   - Deployment will start automatically
   - Monitor logs for any errors
   - Service URL: `https://healthsync-backend.onrender.com`

### **Step 4: Deploy Frontend**

1. **Create Static Site**
   - Click **"New +"** → **"Static Site"**
   - Connect same GitHub repository
   - Select **HealthSync** repository

2. **Configure Frontend Service**
   ```yaml
   Name: healthsync-frontend
   Region: Oregon
   Branch: main
   Build Command: npm install && npm run build
   Publish Directory: ./out
   Plan: Free
   ```

3. **Set Environment Variables**
   ```
   NEXT_PUBLIC_API_URL=https://healthsync-backend.onrender.com/api
   NODE_ENV=production
   ```

4. **Deploy Frontend**
   - Click **"Create Static Site"**
   - Build will start automatically
   - Service URL: `https://healthsync-frontend.onrender.com`

### **Step 5: Update CORS Configuration**

1. **Update Backend Environment**
   - Go to backend service settings
   - Update `CORS_ORIGIN` with actual frontend URL:
   ```
   CORS_ORIGIN=https://healthsync-frontend.onrender.com
   ```

2. **Redeploy Backend**
   - Backend will automatically redeploy with new CORS settings

## 🔧 **Environment Variables Reference**

### **Backend Environment Variables**
```env
NODE_ENV=production
PORT=10000
DATABASE_URL=postgresql://healthsync_user:[PASSWORD]@[HOST]/healthsync
JWT_SECRET=[32+ character secure string]
CORS_ORIGIN=https://healthsync-frontend.onrender.com
```

### **Frontend Environment Variables**
```env
NEXT_PUBLIC_API_URL=https://healthsync-backend.onrender.com/api
NODE_ENV=production
```

## 🧪 **Testing Your Deployment**

### **1. Backend Health Check**
```bash
curl https://healthsync-backend.onrender.com/api/health
# Expected: {"status":"OK","timestamp":"..."}
```

### **2. Frontend Access**
- Visit: `https://healthsync-frontend.onrender.com`
- Should load HealthSync homepage

### **3. Test User Registration**
- Go to: `https://healthsync-frontend.onrender.com/register`
- Create a test account
- Verify database connection works

### **4. Test Login**
- Use sample accounts:
  - **Admin**: admin@healthsync.com / password
  - **Doctor**: doctor@healthsync.com / password
  - **Patient**: patient@healthsync.com / password

## 📊 **Free Tier Limits**

### **Render Free Plan Includes:**
- **Web Services**: 750 hours/month (sleeps after 15min inactivity)
- **Static Sites**: Unlimited bandwidth
- **PostgreSQL**: 1GB storage, 1 month retention
- **Build Minutes**: 500 minutes/month

### **Important Notes:**
- Services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- Database has 1GB storage limit
- Automatic SSL certificates included

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **Backend Won't Start**
   - Check environment variables are set correctly
   - Verify DATABASE_URL format
   - Check build logs for errors

2. **Database Connection Failed**
   - Verify DATABASE_URL is correct
   - Ensure database is in "Available" status
   - Check if schema was initialized

3. **Frontend Can't Reach Backend**
   - Verify NEXT_PUBLIC_API_URL is correct
   - Check CORS_ORIGIN matches frontend URL
   - Ensure backend service is running

4. **CORS Errors**
   - Update CORS_ORIGIN in backend environment
   - Redeploy backend service
   - Clear browser cache

### **Monitoring & Logs:**
- **Backend Logs**: Service dashboard → "Logs" tab
- **Frontend Logs**: Static site dashboard → "Deploys" tab
- **Database Logs**: Database dashboard → "Logs" tab

## 🎉 **Deployment Complete!**

Your HealthSync application is now live:
- **Frontend**: `https://healthsync-frontend.onrender.com`
- **Backend API**: `https://healthsync-backend.onrender.com`
- **Admin Portal**: `https://healthsync-frontend.onrender.com/admin`

### **Next Steps:**
1. Test all functionality with sample data
2. Customize with your branding
3. Set up monitoring and alerts
4. Consider upgrading to paid plans for production use

## 🔒 **Security Considerations**

- ✅ HTTPS enabled by default
- ✅ Environment variables secured
- ✅ Database access restricted
- ✅ CORS properly configured
- ✅ JWT tokens for authentication

Your HealthSync application is production-ready! 🚀
