# Deployment Guide: Render Cloud Platform

## Airbnb Clone - Complete Render Deployment

**Target**: Deploy React Frontend + Spring Boot Backend to Render  
**Database**: PostgreSQL on Render  
**Date**: 2026-07-09

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Database Setup (PostgreSQL)](#database-setup)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Environment Configuration](#environment-configuration)
6. [Testing & Verification](#testing--verification)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts & Tools
- ✅ GitHub account (repository connected)
- ✅ Render account (free tier available)
- ✅ Git installed locally
- ✅ Project pushed to GitHub

### Render Account Setup
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Connect your GitHub repositories
4. Allow Render to access your repositories

---

## Database Setup

### Step 1: Create PostgreSQL Database on Render

1. **Login to Render Dashboard**
   - Go to https://dashboard.render.com
   - Click "New +" button → "PostgreSQL"

2. **Configure Database**
   ```
   Name: airbnb-db
   Database: AirbnbDB
   User: postgres
   Region: Choose closest to you (e.g., Singapore, US-East)
   PostgreSQL Version: 15
   ```

3. **Billing Plan**
   - Free tier available
   - Click "Create Database"

4. **Save Connection Details**
   ```
   External Database URL: (copy this)
   Internal Database URL: (copy this - for internal services)
   Host: (save)
   User: (save)
   Password: (save)
   ```

### Step 2: Database Migration

Your Liquibase migrations will run automatically with Spring Boot startup.

### Step 3: Verify Database Created

```bash
# You can test connection later after backend is deployed
```

---

## Backend Deployment

### Step 1: Prepare Your Spring Boot Application

#### 1.1 Update `application.yml` for Production

```yaml
spring:
  datasource:
    url: ${DB_URL}
    username: ${DB_USER}
    password: ${DB_PASSWORD}
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
  liquibase:
    enabled: true
    change-log: classpath:db/changelog/db.changelog-master.yaml
server:
  port: ${PORT:8080}

# CORS for production
app:
  cors:
    allowed-origins: ${CORS_ALLOWED_ORIGINS}
```

#### 1.2 Update `CorsConfig.java` for Environment Variable

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Value("${app.cors.allowed-origins:http://localhost:5173}")
    private String allowedOrigins;
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
            .allowedOrigins(allowedOrigins)
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
}
```

#### 1.3 Create `Procfile` (if needed)

In your `Airbnb_Backend` root directory, create `Procfile`:

```
web: java -Dserver.port=$PORT $JAVA_OPTS -jar target/Airbnb_Backend-0.0.1-SNAPSHOT.jar
```

#### 1.4 Update `.gitignore` to exclude build artifacts (if not already present)

```
target/
.DS_Store
.classpath
.factorypath
.project
.settings/
```

#### 1.5 Build JAR locally to verify

```bash
cd Airbnb_Backend
./mvnw.cmd clean package -DskipTests
```

Should create: `target/Airbnb_Backend-0.0.1-SNAPSHOT.jar`

### Step 2: Create Web Service on Render

1. **Go to Render Dashboard**
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Select `ChauhanRutvik001/airbnb-clone` (or your repo)
   - Click "Connect"

3. **Configure Service**
   ```
   Name: airbnb-backend
   Environment: Docker
   Build Command: ./mvnw clean package -DskipTests
   Start Command: java -Dserver.port=$PORT $JAVA_OPTS -jar target/Airbnb_Backend-0.0.1-SNAPSHOT.jar
   ```

4. **Root Directory**
   ```
   Airbnb_Backend
   ```

5. **Select Plan**
   - Free tier (with limitations) or Paid tier

6. **Environment Variables**
   Click "Advanced" → "Add Environment Variable"

   Add these variables:
   ```
   DB_URL: postgresql://[host]:[port]/AirbnbDB?sslmode=require
   DB_USER: postgres
   DB_PASSWORD: [your-password]
   CORS_ALLOWED_ORIGINS: https://your-frontend-url.onrender.com
   ```

   (Replace with your actual database credentials from Step 1)

7. **Click "Create Web Service"**

### Step 3: Monitor Backend Deployment

1. **Watch Deployment Logs**
   - Service page will show real-time logs
   - Look for "Tomcat started on port"
   - Should see database migrations running

2. **Expected Output**
   ```
   HikariPool-1 - Added connection
   Hibernate ORM core version
   Tomcat started on port 8080
   Started SpringBootTaskApplication
   ```

3. **Get Backend URL**
   - Render assigns a URL like: `https://airbnb-backend.onrender.com`
   - Note this for frontend configuration

---

## Frontend Deployment

### Step 1: Prepare React Application

#### 1.1 Update `src/services/listingApi.js`

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

export const fetchDefaultListing = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/listings`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    
    const listings = await response.json();
    return listings[0] || null;
  } catch (error) {
    console.error('Error fetching listing:', error);
    throw error;
  }
};

export const fetchAllListings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/listings`);
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};
```

#### 1.2 Update `vite.config.js` for Production

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    outDir: 'dist',
    sourcemap: false
  }
})
```

#### 1.3 Verify `package.json` Build Script

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

#### 1.4 Create `.env.production`

In `Airbnb_Frontend` root:

```
VITE_APP_API_URL=https://airbnb-backend.onrender.com/api
```

### Step 2: Create Static Site on Render

1. **Go to Render Dashboard**
   - Click "New +" → "Static Site"

2. **Connect Repository**
   - Select `ChauhanRutvik001/airbnb-clone`
   - Click "Connect"

3. **Configure Site**
   ```
   Name: airbnb-frontend
   
   Build Command: 
   npm install && npm run build
   
   Publish Directory: 
   Airbnb_Frontend/dist
   ```

4. **Click "Create Static Site"**

### Step 3: Add Environment Variable for Frontend

1. **Go to Environment Variables**
   - Click "Environment" in left sidebar
   - Add environment variable:

   ```
   VITE_APP_API_URL: https://airbnb-backend.onrender.com/api
   ```

2. **Note**: Render will rebuild automatically

3. **Get Frontend URL**
   - Render assigns URL like: `https://airbnb-frontend.onrender.com`

---

## Environment Configuration

### Update Backend CORS for Production

After getting frontend URL, update backend environment variable:

1. **Go to Backend Service on Render**
2. **Environment** → Click "CORS_ALLOWED_ORIGINS"
3. **Update to**:
   ```
   https://airbnb-frontend.onrender.com
   ```
4. **Save** → Backend will redeploy

### Database Configuration Summary

| Variable | Value |
|----------|-------|
| `DB_URL` | `postgresql://host:port/AirbnbDB?sslmode=require` |
| `DB_USER` | `postgres` |
| `DB_PASSWORD` | Your password |
| `CORS_ALLOWED_ORIGINS` | `https://airbnb-frontend.onrender.com` |

---

## Testing & Verification

### Step 1: Verify Backend API

Test backend endpoints:

```bash
# Get all listings
curl https://airbnb-backend.onrender.com/api/listings

# Get specific listing
curl https://airbnb-backend.onrender.com/api/listings/default-listing

# Check health
curl https://airbnb-backend.onrender.com/api/health
```

### Step 2: Verify Frontend

1. **Open**: `https://airbnb-frontend.onrender.com`
2. **Check Browser Console**:
   - Should NOT see CORS errors
   - Should NOT see 404 errors
   - Should see API response data

3. **Verify Data Display**:
   - Gallery images should load
   - Amenities should display
   - Reviews should show

### Step 3: Test Full Flow

1. **Frontend loads** → Check network tab
2. **API calls** → Should show `200 OK`
3. **JSON response** → Should parse correctly
4. **Components render** → Data should display

---

## Troubleshooting

### Issue 1: Backend Not Starting

**Symptoms**: Red status, "Build failed"

**Solutions**:
1. Check build logs for errors
2. Verify `pom.xml` dependencies
3. Check Java version compatibility
4. Try rebuild: Click "Manual Deploy" → "Deploy latest commit"

```bash
# Locally test build
./mvnw.cmd clean package -DskipTests
```

### Issue 2: Database Connection Error

**Error**: `FATAL: all connections used`

**Solutions**:
1. Check `DB_URL` format is correct
2. Verify credentials are right
3. Add `?sslmode=require` to URL
4. Check database exists on Render
5. Restart database service

**Correct URL format**:
```
postgresql://username:password@host:port/database?sslmode=require
```

### Issue 3: CORS Errors in Frontend

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solutions**:
1. Verify `CORS_ALLOWED_ORIGINS` in backend matches frontend URL
2. Check backend is running (status should be green)
3. Restart backend service
4. Clear browser cache (Ctrl+Shift+Delete)

```javascript
// Check request origin in browser console
console.log(window.location.origin)
```

### Issue 4: 404 API Endpoints

**Error**: `GET https://airbnb-backend.onrender.com/api/listings 404`

**Solutions**:
1. Verify backend is actually running
2. Check endpoint exists in controller
3. Verify URL is correct
4. Check logs in Render dashboard

### Issue 5: Blank Frontend or Images Not Loading

**Symptoms**: Frontend loads but no data visible

**Solutions**:
1. Check browser console for errors (F12 → Console)
2. Check Network tab → API calls
3. Verify `VITE_APP_API_URL` is set correctly
4. Check CORS headers in response

```javascript
// In browser console:
fetch('https://airbnb-backend.onrender.com/api/listings')
  .then(r => r.json())
  .then(console.log)
```

### Issue 6: Database Migrations Not Running

**Symptoms**: Tables don't exist, seeding didn't happen

**Solutions**:
1. Check Liquibase logs in backend
2. Verify `application.yml` has `liquibase.enabled: true`
3. Check `db.changelog-master.yaml` exists
4. Verify database user has permissions

### Issue 7: Images Not Displaying

**Solutions**:
1. Check image URLs in database
2. Verify JSON structure in PostgreSQL
3. Check frontend component receiving data
4. Inspect `content_json` in database

```sql
-- Check data in database
SELECT id, slug, title, content_json FROM property_listing LIMIT 1;
```

---

## Performance Tips

### Frontend Optimization

1. **Enable Gzip Compression**: Render enables by default
2. **Minify Assets**: Vite does this in build
3. **Use CDN**: Render serves from edge
4. **Lazy Load Images**:
   ```javascript
   <img loading="lazy" src={url} alt={alt} />
   ```

### Backend Optimization

1. **Connection Pooling**: HikariCP configured automatically
2. **Database Indexing**: Add indexes to frequently queried columns
3. **Caching**: Implement if needed
4. **Pagination**: For large datasets

```sql
-- Add index for slug queries
CREATE INDEX idx_property_listing_slug ON property_listing(slug);
```

### Database Optimization

1. **Free Tier Limits**: 
   - Database auto-pauses after 15 mins of inactivity
   - Takes ~30 seconds to wake up
   - Limit to small projects

2. **Upgrade to Standard Plan** for production

---

## Monitoring & Logs

### Backend Logs

1. Go to Backend Service on Render
2. Click "Logs" tab
3. Real-time logs showing:
   - Build progress
   - Application startup
   - Request logs
   - Errors

### Frontend Logs

1. Go to Static Site on Render
2. Click "Logs" tab
3. Shows build logs

### Database Logs

1. Go to PostgreSQL Instance
2. Click "Logs" tab
3. Database connection logs

---

## Deployment Checklist

### Pre-Deployment
- ✅ Code pushed to GitHub
- ✅ `.gitignore` updated
- ✅ `application.yml` uses environment variables
- ✅ `package.json` has correct build script
- ✅ No hardcoded localhost URLs

### During Deployment
- ✅ Backend service created
- ✅ Frontend static site created
- ✅ Environment variables configured
- ✅ Database credentials secured

### Post-Deployment
- ✅ Backend API responds with 200
- ✅ Frontend loads without errors
- ✅ Data displays correctly
- ✅ CORS working properly
- ✅ Database has seeded data

---

## Common Commands & Queries

### Check Backend Health

```bash
curl https://airbnb-backend.onrender.com/api/health
```

### List All Listings

```bash
curl https://airbnb-backend.onrender.com/api/listings | jq .
```

### Query Database

```bash
# From Render PostgreSQL Dashboard
SELECT COUNT(*) FROM property_listing;
SELECT * FROM property_listing WHERE slug = 'default-listing';
```

---

## Cost & Limits

### Free Tier
- Backend: Spins down after 15 min inactivity (slow startup)
- Frontend: Static site (always fast)
- Database: 90 days retention, connection limit
- Total Cost: $0/month (limited)

### Paid Tier (Starter)
- Backend: Always running (~$7/month)
- Frontend: Static site (~$2/month)
- Database: Full features (~$15/month)
- Total Cost: ~$24/month

---

## Next Steps

1. **Set Up CI/CD**: Render auto-deploys on push to main
2. **Custom Domain**: Add your own domain (optional paid)
3. **SSL Certificate**: Automatically included
4. **Backup Database**: Enable backups in Render dashboard
5. **Monitoring**: Set up alerts for downtime

---

## Support & Resources

- **Render Docs**: https://render.com/docs
- **Spring Boot on Render**: https://render.com/docs/deploy-spring-boot
- **PostgreSQL on Render**: https://render.com/docs/databases
- **Troubleshooting**: https://render.com/docs/troubleshooting
- **GitHub Issues**: Your repository

---

## Summary

**Backend**: Spring Boot service on Render  
**Frontend**: Static site on Render  
**Database**: PostgreSQL on Render  
**Connection**: REST API via HTTPS  
**Status**: Production ready after testing

Your Airbnb Clone is now deployed and accessible to the world! 🚀

---

*Last Updated: 2026-07-09*  
*For questions: Check Render dashboard logs or GitHub issues*
