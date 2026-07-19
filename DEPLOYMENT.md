# Deployment Guide: Transport Optimizer on Vercel

## Architecture Overview
- **Frontend**: React + Vite (deployed as static site)
- **Backend**: Express.js (deployed as Vercel serverless functions)
- **Database**: MongoDB Atlas

## Deployment Steps

### Step 1: Prepare Your Repository

1. **Fix the MongoDB URI** in `backend/.env`:
   ```
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
   NODE_ENV=production
   ```

2. **Commit all changes**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel CLI (Fastest)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Authenticate**:
   ```bash
   vercel login
   ```

3. **Deploy from root directory**:
   ```bash
   cd c:\projects\transport_optimizer
   vercel
   ```

4. **Set environment variables when prompted**:
   - `MONGO_URI` - Your MongoDB connection string
   - `NODE_ENV` - Set to `production`

#### Option B: Deploy via GitHub Integration (Recommended)

1. **Push your project to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/transport_optimizer.git
   git branch -M main
   git push -u origin main
   ```

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

3. **Click "Add New..."** → **"Project"**

4. **Select your GitHub repository**

5. **Configure project settings**:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (keep default)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: Leave blank (or `npm install`)

6. **Add Environment Variables**:
   ```
   MONGO_URI = mongodb+srv://username:password@cluster...
   NODE_ENV = production
   ```

7. **Click Deploy** 🚀

### Step 3: Verify Deployment

1. Your app will be available at: `https://transport-optimizer-xyz.vercel.app`

2. **Test the backend API**:
   ```bash
   curl https://transport-optimizer-xyz.vercel.app/api/test
   ```

3. **Check logs** in Vercel Dashboard → Project → Logs

### Step 4: Update Frontend API Calls (if needed)

In production, API calls should use relative paths `/api/*`:

```javascript
// ✅ Works in production
const API_BASE_URL = "/api";

// Or use environment variable set in Vercel:
const API_BASE_URL = process.env.VITE_API_BASE_URL || "/api";
```

Your `frontend/src/lib/api.js` already handles this correctly! ✓

---

## Common Issues & Fixes

### ❌ "Authentication failed" Error
**Solution**: Verify MongoDB URI in Vercel environment variables
```bash
vercel env list  # View current env vars
vercel env add MONGO_URI  # Add/update
```

### ❌ "Cannot find module" Error
**Solution**: Ensure `package.json` dependencies are in place:
```bash
cd backend && npm install
cd ../frontend && npm install
```

### ❌ CORS Errors
**Solution**: Already configured in `backend/src/app.js`. Verify:
```javascript
app.use(cors());  // ✓ Already in place
```

### ❌ API returns 404
**Solution**: Check route in `backend/src/routes/` files. Prefix should be:
- `/api/test` → test.routes.js
- `/api/auth/*` → auth.routes.js
- `/api/requests/*` → request.routes.js
- `/api/drivers/*` → driver.routes.js
- `/api/match/*` → match.routes.js

---

## Rollback / Re-deployment

To redeploy or rollback:
```bash
# Pull latest code
git pull origin main

# Deploy again (will auto-detect changes)
vercel --prod
```

---

## Production Checklist

- [ ] MongoDB URI is correct and IP whitelist includes Vercel IPs
- [ ] Environment variables set in Vercel dashboard
- [ ] Frontend build completes without errors
- [ ] API routes return expected responses
- [ ] Database queries execute successfully
- [ ] Error handling is robust
- [ ] Sensitive data not logged

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Connection**: https://docs.mongodb.com/guides/cloud/connectionstring/
- **Express + Vercel**: https://vercel.com/docs/frameworks/express

