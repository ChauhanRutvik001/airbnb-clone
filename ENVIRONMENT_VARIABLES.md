# Environment Variables Setup Guide

For both **Backend** and **Frontend** deployments on Render

---

## Backend Environment Variables

### For Local Development

Create a `.env` file in `Airbnb_Backend/` directory (don't commit this):

```env
# Database Configuration
DB_URL=jdbc:postgresql://localhost:5432/AirbnbDB
DB_USER=postgres
DB_PASSWORD=Chauhan

# CORS Configuration
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

**In application.yml**, these are already configured:
```yaml
spring:
  datasource:
    url: ${DB_URL:jdbc:postgresql://localhost:5432/AirbnbDB}
    username: ${DB_USER:postgres}
    password: ${DB_PASSWORD:Chauhan}

app:
  cors:
    allowed-origins: ${CORS_ALLOWED_ORIGINS:http://localhost:5173}
```

### For Production (Render)

In **Render Dashboard** → Backend Service → Environment:

```
DB_URL = postgresql://[render-host]:5432/[database]?sslmode=require
DB_USER = postgres
DB_PASSWORD = [your-postgres-password]
CORS_ALLOWED_ORIGINS = https://airbnb-frontend.onrender.com
```

**Example**:
```
DB_URL = postgresql://dpg-xyz123.postgres.render.com:5432/airbnbdb_abcd?sslmode=require
DB_USER = postgres
DB_PASSWORD = MySecurePassword123
CORS_ALLOWED_ORIGINS = https://airbnb-frontend.onrender.com
```

---

## Frontend Environment Variables

### For Local Development

Create a `.env` file in `Airbnb_Frontend/` directory:

```env
VITE_APP_API_URL=http://localhost:8080/api
```

**In src/services/listingApi.js**, update:

```javascript
const API_BASE_URL = process.env.VITE_APP_API_URL || '/api';

export const fetchDefaultListing = async () => {
  const response = await fetch(`${API_BASE_URL}/listings`);
  const listings = await response.json();
  return listings[0] || null;
};
```

### For Production (Render)

In **Render Dashboard** → Frontend Static Site → Environment:

```
VITE_APP_API_URL = https://airbnb-backend.onrender.com/api
```

**In vite.config.js**:

```javascript
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    outDir: 'dist',
  }
})
```

---

## Complete Setup Checklist

### Backend Setup

- ✅ **application.yml** updated with:
  ```yaml
  DB_URL: ${DB_URL:...}
  DB_USER: ${DB_USER:...}
  DB_PASSWORD: ${DB_PASSWORD:...}
  app.cors.allowed-origins: ${CORS_ALLOWED_ORIGINS:...}
  ```

- ✅ **CorsConfig.java** updated:
  ```java
  @Value("${app.cors.allowed-origins:http://localhost:5173}")
  private String allowedOrigins;
  ```

- ✅ Environment variables in Render:
  - `DB_URL`
  - `DB_USER`
  - `DB_PASSWORD`
  - `CORS_ALLOWED_ORIGINS`

### Frontend Setup

- ✅ **listingApi.js** uses:
  ```javascript
  process.env.VITE_APP_API_URL
  ```

- ✅ **vite.config.js** has build configuration

- ✅ Environment variable in Render:
  - `VITE_APP_API_URL`

---

## Local Testing

### Step 1: Backend Local

```bash
cd Airbnb_Backend

# Run with default values (from application.yml)
./mvnw.cmd clean spring-boot:run

# Test endpoint
curl http://localhost:8080/api/listings
```

### Step 2: Frontend Local

```bash
cd Airbnb_Frontend

# Install dependencies
npm install

# Run dev server (uses VITE_APP_API_URL or default /api)
npm run dev
```

Open `http://localhost:5173` in browser.

---

## Render Deployment Steps

### Step 1: Create Backend Service

1. New Web Service
2. Set environment variables:
   ```
   DB_URL = postgresql://[host]:5432/[db]?sslmode=require
   DB_USER = postgres
   DB_PASSWORD = [password]
   CORS_ALLOWED_ORIGINS = https://airbnb-frontend.onrender.com
   ```
3. Deploy

### Step 2: Create Frontend Service

1. New Static Site
2. Set environment variable:
   ```
   VITE_APP_API_URL = https://airbnb-backend.onrender.com/api
   ```
3. Deploy

---

## Troubleshooting

### Issue: CORS Error in Frontend

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Fix**:
1. Verify backend `CORS_ALLOWED_ORIGINS` matches frontend URL exactly
2. Check backend is running (green status)
3. Restart backend service

### Issue: API 404 in Frontend

**Error**: `GET https://airbnb-backend.onrender.com/api/listings 404`

**Fix**:
1. Verify `VITE_APP_API_URL` is set correctly
2. Check backend URL is accessible (test in browser)
3. Wait for backend to fully start (~5 min)

### Issue: Blank Frontend Page

**Error**: No data displays

**Fix**:
1. Open browser console (F12)
2. Check Network tab for API responses
3. Verify environment variables are set
4. Check browser console for JavaScript errors

---

## Summary Table

| Variable | Backend/Frontend | Local Value | Production Value |
|----------|------------------|-------------|-------------------|
| `DB_URL` | Backend only | `jdbc:postgresql://localhost:5432/AirbnbDB` | `postgresql://[render-host]:5432/[db]?sslmode=require` |
| `DB_USER` | Backend only | `postgres` | `postgres` |
| `DB_PASSWORD` | Backend only | `Chauhan` | Your secure password |
| `CORS_ALLOWED_ORIGINS` | Backend only | `http://localhost:5173` | `https://airbnb-frontend.onrender.com` |
| `VITE_APP_API_URL` | Frontend only | `http://localhost:8080/api` | `https://airbnb-backend.onrender.com/api` |

---

## Files Modified

- ✅ `Airbnb_Backend/src/main/resources/application.yml` - Added env variables
- ✅ `Airbnb_Backend/src/main/java/com/cr/main/config/CorsConfig.java` - Use env variable
- ✅ `Airbnb_Frontend/src/services/listingApi.js` - Use env variable
- ✅ `Airbnb_Frontend/vite.config.js` - Build config

---

**Your application is now fully configurable for both local and production environments!** 🚀

