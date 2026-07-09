# Airbnb Frontend - React + Vite

A modern, responsive React frontend for the Airbnb Clone application, built with Vite for fast development and optimal performance.

## Overview

This is a single-page application (SPA) that provides users with an intuitive interface to:
- Browse property listings
- View property details, gallery images, and amenities
- Check availability calendars
- Read guest reviews
- Explore nearby properties
- View host information

## Technology Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Module Bundler**: ES Modules
- **Styling**: CSS3 with custom components
- **API Client**: Fetch API with proxy configuration
- **Code Quality**: ESLint
- **Development Server**: Vite dev server (port 5173)

## Project Structure

```
src/
├── main.jsx                      # React entry point
├── App.jsx                       # Main application component
├── App.css                       # Global styles
├── index.css                     # Base styles
├── components/
│   ├── GuestFavouriteBanner.jsx      # Guest favorites section
│   ├── MeetHost.jsx                  # Host information component
│   ├── MoreStaysNearby.jsx           # Nearby properties
│   ├── PropertyListing.jsx           # Main listing display
│   ├── PropertyLocationSection.jsx   # Location information
│   ├── PropertyReviewsSection.jsx    # Reviews section
│   ├── ThingsToKnow.jsx              # Property guidelines
│   └── propertyListing/
│       ├── data.js                   # Mock/sample data
│       ├── ListingSections.jsx       # Listing subsections
│       └── sharedComponents.jsx      # Reusable components
├── pages/
│   └── PhotoTourPage.jsx        # Full-page photo gallery tour
├── services/
│   └── listingApi.js            # API communication layer
└── assets/                       # Images and static files

public/
└── assets/                       # Public assets
```

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher (or yarn)
- Backend API running on `http://localhost:8080`

## Setup Instructions

### 1. Install Dependencies

```bash
cd Airbnb_Frontend
npm install
```

### 2. Configure Environment

The application expects the backend API to be running on `http://localhost:8080`. 
Vite is configured to proxy `/api` requests to the backend.

Check `vite.config.js` for proxy configuration:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

### Development
```bash
npm run dev
```
Starts Vite development server with hot module replacement (HMR)

### Production Build
```bash
npm run build
```
Creates optimized production build in `dist/` directory

### Preview Production Build
```bash
npm run preview
```
Previews the production build locally

### Linting
```bash
npm run lint
```
Runs ESLint to check code quality

## Component Architecture

### PropertyListing Component
Main component that displays property details:
- Gallery image carousel
- Property information
- Amenities and perks
- Calendar availability
- Guest reviews
- Host information
- Nearby properties

**Props**: 
- `listing` - Property listing data object

**Data Structure**:
```javascript
{
  id: number,
  uuid: string,
  slug: string,
  title: string,
  content: {
    galleryImages: [{ src, alt, className, overlay }],
    perks: [{ icon, title, description }],
    sleepCards: [{ src, title, subtitle }],
    amenities: [{ title, items: [{ icon, label }] }],
    // ... other content
  }
}
```

### listingApi Service
Handles all backend API communication:
- Fetches property listings
- Manages API errors
- Returns formatted data for components

**Key Functions**:
```javascript
export const fetchDefaultListing = async () => {
  // Fetches all listings and returns the first one
}
```

## Features

### Image Gallery
- Displays property photos
- Responsive grid layout
- Supports alt text for accessibility

### Amenities Section
- Organized by categories
- Icon-based display
- Expandable sections

### Availability Calendar
- Shows booking availability
- Month-by-month view
- Visual indicators for booked/available dates

### Guest Reviews
- Display of guest feedback
- Rating information
- Review details

### Responsive Design
- Mobile-first approach
- Desktop and tablet optimizations
- Flexible layouts with CSS Grid/Flexbox

## API Integration

### Base URL
```
/api
```

### Endpoints Used
- `GET /api/listings` - Fetch all property listings

### Error Handling
The application handles API errors gracefully:
- Network errors show fallback messages
- Failed requests are logged to console
- User-friendly error messages displayed

## Development Guidelines

### Component Creation
1. Create new components in `src/components/`
2. Use functional components with hooks
3. Import necessary styles
4. Add PropTypes validation (optional but recommended)

### Styling
- Use CSS files co-located with components
- Follow BEM naming convention for classes
- Maintain responsive design

### API Calls
- Use `src/services/listingApi.js` for backend communication
- Handle loading and error states
- Provide user feedback during data fetching

### Performance Optimization
- Use code splitting for large components
- Lazy load images
- Minimize bundle size with Vite

## Common Issues & Solutions

### Issue: "GET http://localhost:5173/api/listings 404 (Not Found)"
**Solution**: Ensure backend is running on port 8080 and Vite proxy is configured correctly

### Issue: CORS errors when calling backend
**Solution**: Verify backend has CORS configuration that allows requests from `http://localhost:5173`

### Issue: Images not loading
**Solution**: Check image URLs are correct and accessible from the backend

### Issue: Hot Module Replacement (HMR) not working
**Solution**: Check Vite dev server is running and browser has WebSocket connection to it

## Build & Deployment

### Development Build
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy to Static Hosting
1. Run `npm run build`
2. Upload `dist/` folder to your hosting provider
3. Configure backend API URL if different from localhost

## Environment Configuration

For production, update API base URL in `src/services/listingApi.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Metrics

- Vite bundle size: Optimized with tree-shaking
- Fast dev server startup: ~0.5s
- HMR updates: Near-instantaneous
- Production build: Minified and optimized

## Troubleshooting

### Clear Vite Cache
```bash
rm -rf node_modules/.vite
```

### Reinstall Dependencies
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 5173 Already in Use
```bash
# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# On macOS/Linux
lsof -i :5173
kill -9 <PID>
```

### Check Vite Configuration
```bash
npm run dev -- --debug
```

## Testing

Unit tests and integration tests can be added using:
- Jest for unit testing
- React Testing Library for component testing
- Playwright or Cypress for E2E testing

```bash
npm install --save-dev jest @testing-library/react
npm test
```

## Code Quality

Run ESLint to check code quality:
```bash
npm run lint
npm run lint -- --fix
```

## Performance Optimization Tips

1. **Lazy Load Components**
   ```javascript
   const PhotoTourPage = lazy(() => import('./pages/PhotoTourPage'));
   ```

2. **Optimize Images**
   - Use WebP format
   - Serve appropriately sized images
   - Use lazy loading

3. **Code Splitting**
   - Vite automatically code splits routes
   - Use dynamic imports for heavy components

4. **Monitor Bundle Size**
   ```bash
   npm install -g rollup-plugin-visualizer
   ```

## License

MIT License - See LICENSE file for details

## Contributing

1. Create a feature branch
2. Make your changes
3. Run linting: `npm run lint`
4. Submit a pull request

## Contact & Support

For issues or questions, please open a GitHub issue or contact the development team.
