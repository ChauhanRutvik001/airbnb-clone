# Simple Render Deployment - Quick Start

**Deploy in 10 minutes!**

---

## 3 Easy Steps

### Step 1: Create Database (2 min)

1. Go to https://render.com → Sign in with GitHub
2. Click **"New +" → "PostgreSQL"**
3. Name: `airbnb-db`
4. Click **"Create Database"**
5. **Copy these 4 things** from the dashboard:
   ```
   Host: (copy)
   User: (copy)
   Password: (copy)
   Database: (copy)
   ```

---

### Step 2: Deploy Backend (5 min)

1. In Render: Click **"New +" → "Web Service"**
2. Select your GitHub repo (`airbnb-clone`)
3. Fill in:
   ```
   Name: airbnb-backend
   Root Directory: Airbnb_Backend
   Build: ./mvnw clean package -DskipTests
   Start: java -Dserver.port=$PORT $JAVA_OPTS -jar target/Airbnb_Backend-0.0.1-SNAPSHOT.jar
   ```

4. Click **"Advanced"** → Add Environment Variables:
   ```
   DB_URL = postgresql://[host]:5432/[database]?sslmode=require
   DB_USER = postgres
   DB_PASSWORD = [your-password]
   CORS_ALLOWED_ORIGINS = https://airbnb-frontend.onrender.com
   ```
   
   **How to get these values:**
   - From Step 1 (Database): Copy host, user, password, database name
   - Example: `postgresql://dpg-xyz.postgres.render.com:5432/airbnbdb_xyz?sslmode=require`
   - `CORS_ALLOWED_ORIGINS`: You'll get this URL after deploying frontend (Step 3)
   - For now, use: `http://localhost:5173` (you'll update it later)

5. Click **"Create Web Service"** → Wait for green checkmark (~3-5 min)

6. **Copy the URL** shown (something like `https://airbnb-backend.onrender.com`)

---

### Step 3: Deploy Frontend (3 min)

1. In Render: Click **"New +" → "Static Site"**
2. Select your GitHub repo (`airbnb-clone`)
3. Fill in:
   ```
   Name: airbnb-frontend
   Root Directory: Airbnb_Frontend
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. Click **"Advanced"** → Add Environment Variable:
   ```
   VITE_APP_API_URL = https://airbnb-backend.onrender.com/api
   ```
   (Use the backend URL from Step 2, with `/api` appended)

5. Click **"Create Static Site"** → Wait for green checkmark (~2-3 min)

6. **Copy the URL** shown (something like `https://airbnb-frontend.onrender.com`)

---

## Done! ✅

Your app is now live:
- **Frontend**: `https://airbnb-frontend.onrender.com`
- **Backend**: `https://airbnb-backend.onrender.com`

---

## Step 4: Update Backend CORS (1 min)

1. Go to **Backend Service** on Render
2. Click **"Settings"** → **"Environment"**
3. Update `CORS_ALLOWED_ORIGINS`:
   ```
   CORS_ALLOWED_ORIGINS = https://airbnb-frontend.onrender.com
   ```
4. Click **"Save"** → Backend restarts automatically

---

## Test It

Open your frontend URL in browser. If you see the property listing page with images, **you're done!** 🎉

---

## Troubleshooting (Quick Fixes)

| Problem | Fix |
|---------|-----|
| CORS Error | Update `CORS_ALLOWED_ORIGINS` in backend |
| Blank page | Check browser console (F12) for errors |
| 404 API error | Wait 5 min for backend to fully start |
| DB connection error | Check `DB_URL` format is correct |

---

**That's it! Your app is deployed to production.** 🚀

Free tier has limitations (spins down after 15 min idle).  
For always-on: Upgrade to Starter plan (~$7/month).
