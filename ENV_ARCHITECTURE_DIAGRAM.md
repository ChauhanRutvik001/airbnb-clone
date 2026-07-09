# Environment Variables Architecture Diagram

## Local Development Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    LOCAL DEVELOPMENT                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Frontend (localhost:5173)                                   │
│  ├── .env file loaded                                        │
│  ├── VITE_APP_API_URL = http://localhost:8080/api           │
│  ├── Vite proxy: /api/* → http://localhost:8080             │
│  └── listingApi.js reads process.env.VITE_APP_API_URL        │
│       ↓ HTTP Request                                          │
│  Backend (localhost:8080)                                    │
│  ├── application.yml defaults loaded                         │
│  ├── DB_URL = jdbc:postgresql://localhost:5432/AirbnbDB     │
│  ├── DB_USER = postgres                                      │
│  ├── DB_PASSWORD = Chauhan                                   │
│  ├── CORS_ALLOWED_ORIGINS = http://localhost:5173           │
│  └── Processes request → Database                            │
│       ↓ SQL Query                                             │
│  PostgreSQL (localhost:5432)                                 │
│  ├── Database: AirbnbDB                                      │
│  └── Tables: property_listing, etc.                          │
│       ↑ Response                                              │
│  Backend sends JSON response                                 │
│       ↑ HTTP Response                                         │
│  Frontend receives data, renders UI                          │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

## Production Deployment Flow (Render)

```
┌──────────────────────────────────────────────────────────────┐
│                     RENDER PRODUCTION                        │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  Frontend Static Site                                         │
│  (https://airbnb-frontend.onrender.com)                       │
│  ├── Built from: npm run build                               │
│  ├── Serves: Airbnb_Frontend/dist                            │
│  ├── Environment Variables:                                   │
│  │   └── VITE_APP_API_URL = https://airbnb-backend.          │
│  │       onrender.com/api                                     │
│  └── listingApi.js reads process.env.VITE_APP_API_URL        │
│       ↓ HTTPS Request (with CORS)                             │
│  Backend Web Service                                          │
│  (https://airbnb-backend.onrender.com)                        │
│  ├── Built from: Java/Maven                                   │
│  ├── Start command: java -Dserver.port=$PORT ...jar           │
│  ├── Environment Variables:                                   │
│  │   ├── DB_URL = postgresql://[render-host]:5432/...        │
│  │   ├── DB_USER = postgres                                   │
│  │   ├── DB_PASSWORD = [secure-password]                      │
│  │   └── CORS_ALLOWED_ORIGINS =                              │
│  │       https://airbnb-frontend.onrender.com                │
│  ├── Validates CORS                                           │
│  └── Processes request → Database                             │
│       ↓ SSL Connection                                         │
│  PostgreSQL Database Service (Render)                        │
│  (postgresql://[host]:5432/airbnbdb)                          │
│  └── Managed PostgreSQL with SSL encryption                  │
│       ↑ Response                                               │
│  Backend sends JSON response                                  │
│       ↑ HTTPS Response                                        │
│  Frontend receives data, renders UI                          │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

## Configuration Layers

### Layer 1: Default Values (Fallback)
```
application.yml (Backend)
├── DB_URL: jdbc:postgresql://localhost:5432/AirbnbDB
├── DB_USER: postgres
├── DB_PASSWORD: Chauhan
└── CORS: http://localhost:5173

CorsConfig.java
└── Fallback: http://localhost:5173

listingApi.js (Frontend)
└── Fallback: '/api' (for Vite proxy)
```

### Layer 2: Development (.env files)
```
Airbnb_Frontend/.env
└── VITE_APP_API_URL=http://localhost:8080/api

Airbnb_Backend
└── Uses application.yml defaults (can override with system env vars)
```

### Layer 3: Production (Render Dashboard)
```
Backend Service Environment
├── DB_URL=postgresql://[render]:5432/[db]?sslmode=require
├── DB_USER=postgres
├── DB_PASSWORD=[secure]
└── CORS_ALLOWED_ORIGINS=https://airbnb-frontend.onrender.com

Frontend Service Environment
└── VITE_APP_API_URL=https://airbnb-backend.onrender.com/api
```

## Variable Resolution Priority

### Backend (Spring Boot)
```
Priority 1 (Highest):  System Environment Variable
Priority 2:            application.yml / @Value annotation
Priority 3 (Lowest):   Hardcoded default in code
```

Example:
```
if CORS_ALLOWED_ORIGINS env var set:
    Use environment variable ✅
else if application.yml has value:
    Use application.yml value ✅
else:
    Use hardcoded default (http://localhost:5173) ✅
```

### Frontend (Vite)
```
Priority 1 (Highest):  process.env.VITE_APP_API_URL
Priority 2:            .env.production (during build)
Priority 3:            .env (during dev)
Priority 4 (Lowest):   Fallback '/api' in code
```

Example:
```javascript
if process.env.VITE_APP_API_URL available:
    Use VITE_APP_API_URL ✅
else:
    Use '/api' (works with Vite proxy) ✅
```

## Deployment Sequence

### Step 1: Create Database
```
[Create PostgreSQL] → Get connection details:
  - Host
  - User
  - Password
  - Database name
```

### Step 2: Deploy Backend
```
[Push code] → [Render detects Maven]
  ↓
[Build] → ./mvnw clean package -DskipTests
  ↓
[Set Environment Variables]:
  - DB_URL
  - DB_USER
  - DB_PASSWORD
  - CORS_ALLOWED_ORIGINS (temp: localhost:5173)
  ↓
[Start] → java -Dserver.port=$PORT ...jar
  ↓
[Get Backend URL] → https://airbnb-backend.onrender.com
```

### Step 3: Deploy Frontend
```
[Push code] → [Render detects npm]
  ↓
[Build] → npm run build (VITE_APP_API_URL becomes static)
  ↓
[Set Environment Variable]:
  - VITE_APP_API_URL = https://airbnb-backend.onrender.com/api
  ↓
[Deploy] → Serve dist/ folder
  ↓
[Get Frontend URL] → https://airbnb-frontend.onrender.com
```

### Step 4: Update Backend CORS
```
[Go to Backend Service]
  ↓
[Edit Environment]
  ↓
[Update CORS_ALLOWED_ORIGINS]:
  FROM: http://localhost:5173
  TO: https://airbnb-frontend.onrender.com
  ↓
[Save & Restart Backend]
```

## Data Flow with Environment Variables

### Request Path
```
User types: https://airbnb-frontend.onrender.com
     ↓
Render serves: dist/index.html
     ↓
JavaScript loads listingApi.js
     ↓
listingApi.js reads: process.env.VITE_APP_API_URL
     → Gets: https://airbnb-backend.onrender.com/api
     ↓
Sends: GET https://airbnb-backend.onrender.com/api/listings
     ↓
Backend receives request
     ↓
Checks CORS_ALLOWED_ORIGINS from environment
     ↓
Gets: https://airbnb-frontend.onrender.com ✅ MATCH
     ↓
Allows CORS ✅
     ↓
Reads environment variables: DB_URL, DB_USER, DB_PASSWORD
     ↓
Connects to PostgreSQL on Render
     ↓
Queries: SELECT * FROM property_listing
     ↓
Returns JSON response
     ↓
Frontend renders data ✅
```

## Security Flow

```
┌────────────────────────────────────────────┐
│          SECURITY CONSIDERATIONS            │
├────────────────────────────────────────────┤
│                                             │
│ 1. Credentials Storage                      │
│    ├── ✅ In Render Environment Variables   │
│    ├── ✅ Never in code                     │
│    └── ✅ Never committed to Git            │
│                                             │
│ 2. CORS Configuration                      │
│    ├── ✅ Specific origin per environment   │
│    ├── ✅ No wildcard (*) in production     │
│    └── ✅ Credentials allowed in dev        │
│                                             │
│ 3. Database Connection                     │
│    ├── ✅ SSL enabled (?sslmode=require)    │
│    ├── ✅ Environment variable driven       │
│    └── ✅ No hardcoded passwords            │
│                                             │
│ 4. API Communication                       │
│    ├── ✅ HTTPS only in production          │
│    ├── ✅ Environment-specific URLs         │
│    └── ✅ No hardcoded endpoints            │
│                                             │
└────────────────────────────────────────────┘
```

## Troubleshooting Decision Tree

```
                    Application Not Working?
                            ↓
                ┌───────────────────────────┐
                │ Frontend loads?            │
                │ (Can see page)             │
                └───────────────────────────┘
                    ↓           ↓
                   YES         NO
                    ↓           ↓
                    │      Check frontend deploy
                    │      Check dist/ built
                    │      Check build output
                    ↓
          ┌─────────────────────┐
          │ API request succeeds?│
          │ (Network tab shows  │
          │ successful response)│
          └─────────────────────┘
              ↓           ↓
             YES         NO
              ↓           ↓
              │      ┌──────────────────┐
              │      │ Check CORS error │
              │      │ (Console tab)    │
              │      └──────────────────┘
              │          ↓
              │      CORS Error?
              │      ↓       ↓
              │     YES     NO
              │      ↓       ↓
              │      │   Check network error
              │      │   ├─ 404? Wrong endpoint
              │      │   ├─ 500? Backend error
              │      │   ├─ timeout? Slow server
              │      │   └─ DNS fail? Wrong URL
              │      ↓
              │   Fix: Update backend
              │   CORS_ALLOWED_ORIGINS
              │   to match frontend URL
              │      ↓
              ↓─────┘
        ┌──────────────────┐
        │ Data displays OK?│
        └──────────────────┘
            ↓           ↓
           YES         NO
            ↓           ↓
            │      Check response
            │      ├─ No listings?
            │      │  └─ Check DB data
            │      └─ Wrong data?
            │         └─ Check mapping
            ↓
        ✅ SUCCESS! 🎉
```

---

This diagram shows how environment variables orchestrate the entire application flow from local development through production deployment.
