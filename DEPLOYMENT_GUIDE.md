# HealthSync Deployment Guide - Render

## 🚀 Quick Deployment Steps

### 1. Set Up PostgreSQL Database (Free on Render)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "PostgreSQL"
3. Choose free tier
4. Get connection string (save for step 3)

### 2. Deploy Backend on Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `healthsync-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### 3. Set Environment Variables (Backend)
In Render dashboard, add these environment variables:
```
NODE_ENV=production
PORT=10000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
```

### 4. Deploy Frontend on Render
1. Click "New +" → "Static Site"
2. Connect same GitHub repository
3. Configure:
   - **Name**: `healthsync-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `out`

### 5. Set Environment Variables (Frontend)
```
NEXT_PUBLIC_API_URL=https://healthsync-backend.onrender.com
```

## 🖥️ Accessing Your Backend Portal

### Admin Dashboard
- **URL**: `https://your-frontend-url.onrender.com/admin`
- **Features**: User management, analytics, appointments, settings

### Render Dashboard
- **URL**: `https://dashboard.render.com`
- **Features**: 
  - View application logs
  - Monitor resource usage
  - Manage environment variables
  - Database connection status

### PostgreSQL Dashboard (Render)
- **URL**: `https://dashboard.render.com`
- **Features**:
  - Query and manage data
  - View database metrics
  - Monitor connections
  - Database logs

### API Endpoints
- **Base URL**: `https://healthsync-backend.onrender.com/api`
- **Health Check**: `https://healthsync-backend.onrender.com/api/health`
- **Auth**: `/api/auth/login`, `/api/auth/register`
- **Appointments**: `/api/appointments`
- **Records**: `/api/records`

## 🔧 Post-Deployment Setup

### 1. Test Your Deployment
```bash
# Test backend health
curl https://healthsync-backend.onrender.com/api/health

# Test frontend
curl https://healthsync-frontend.onrender.com
```

### 2. Set Up Custom Domain (Optional)
1. In Render dashboard → Settings → Custom Domains
2. Add your domain
3. Configure DNS records

### 3. Monitor Your App
- Check logs in Render dashboard
- Monitor MongoDB Atlas metrics
- Set up alerts for downtime

## 📊 Free Tier Limits
- **Render Web Service**: 750 hours/month, sleeps after 15min inactivity
- **Render PostgreSQL**: 1GB storage, 1 month retention
- **Bandwidth**: 100GB/month

## 🔒 Security Checklist
- [ ] Strong JWT secret
- [ ] PostgreSQL connection secured
- [ ] Environment variables set
- [ ] CORS properly configured
- [ ] Admin routes secured

## 🆘 Troubleshooting
- **Backend won't start**: Check environment variables
- **Database connection failed**: Verify DATABASE_URL
- **Frontend can't reach backend**: Check NEXT_PUBLIC_API_URL
- **App sleeping**: Upgrade to paid plan or use uptime monitoring
