# Scheme Management System - Frontend

A modern React frontend for the Scheme Management System backend built with Vite, providing user registration, authentication, profile management, and scheme discovery features.

## Features

✨ **User Authentication**
- User registration with email and password
- Secure login with JWT token storage
- Token persistence with localStorage

👤 **Profile Management**
- Create and update user profiles
- Store demographic information (age, income, caste, occupation, state)
- View personal profile information

📊 **Scheme Management**
- Browse all available schemes
- View schemes you're eligible for based on profile
- View detailed scheme information including income ranges, age limits, and eligibility criteria
- Add new schemes (Admin only)

🔐 **Security**
- JWT token-based authentication
- Protected routes that require login
- Automatic token inclusion in API requests

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **CSS** - Custom styling

## Prerequisites

- Node.js 16+ and npm
- Backend API running on `http://localhost:8080`

## Installation & Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Backend URL

Edit `vite.config.js` to match your backend URL (default is `http://localhost:8080`):

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
```

### 3. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx              # Login component
│   │   ├── Register.jsx           # Registration component
│   │   ├── Dashboard.jsx          # Main dashboard
│   │   ├── Profile.jsx            # User profile management
│   │   ├── AllSchemes.jsx         # View all schemes
│   │   ├── EligibleSchemes.jsx    # View eligible schemes
│   │   ├── AddScheme.jsx          # Admin: Add new scheme
│   │   └── PrivateRoute.jsx       # Protected route wrapper
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication context
│   ├── services/
│   │   └── api.js                 # API client and endpoints
│   ├── styles/
│   │   ├── Auth.css               # Auth pages styling
│   │   ├── Dashboard.css          # Dashboard styling
│   │   ├── Profile.css            # Profile styling
│   │   ├── Schemes.css            # Schemes styling
│   │   └── index.css              # Global styles
│   ├── App.jsx                    # Main app component with routing
│   ├── main.jsx                   # React entry point
│   └── App.css                    # App styling
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite configuration
├── package.json                   # Dependencies
└── .gitignore                     # Git ignore rules
```

## Usage Guide

### 1. Register a New Account

- Go to the registration page (`/register`)
- Enter your name, email, and password
- Click "Register"
- You'll be redirected to login

### 2. Login

- Go to the login page (`/login`)
- Enter your email and password
- JWT token will be automatically saved
- You'll be redirected to the dashboard

### 3. Complete Your Profile

- Navigate to "Profile" from the dashboard
- Fill in your demographic information:
  - Age
  - Annual Income
  - Caste Category
  - Occupation
  - State
- Click "Save Profile"

### 4. View Your Eligibility

- Go to "My Eligibility" to see schemes you qualify for
- The system will match your profile against scheme criteria automatically

### 5. Browse All Schemes

- Click "All Schemes" to view all available schemes
- See detailed information about each scheme

### 6. Add New Schemes (Admin Only)

- Navigate to "Add Scheme (Admin)"
- Fill in scheme details:
  - Name and description
  - Income range (min and max)
  - Age range (min and max)
  - Caste category
  - State
  - Occupation
- Click "Create Scheme"

## API Endpoints

The frontend communicates with these backend endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Profile
- `POST /api/profile` - Create/update profile
- `GET /api/profile/me` - Get current user's profile

### Schemes
- `POST /api/schemes` - Create new scheme (Admin)
- `GET /api/schemes` - Get all schemes
- `GET /api/schemes/eligible` - Get eligible schemes for user
- `GET /api/schemes/{id}` - Get scheme by ID

## Authentication Flow

1. User registers with email and password
2. User logs in with credentials
3. Backend returns JWT token
4. Token is stored in localStorage as `token`
5. Token is automatically included in all API requests via interceptor
6. Protected routes check for valid token

## Error Handling

- All API errors are caught and displayed to users
- Network errors show user-friendly messages
- Form validation prevents invalid submissions
- Loading states indicate in-progress operations

## Styling

The application uses a modern purple gradient color scheme:
- Primary: `#667eea` to `#764ba2`
- Backgrounds: Light gray (`#f5f5f5`)
- Text: Dark gray (`#555`, `#333`)
- Accents: Green for success (`#4caf50`)

All components are responsive and work on mobile, tablet, and desktop devices.

## Development Tips

### Running Backend and Frontend Together

1. Terminal 1 - Start backend:
```bash
cd .. # Go to backend directory
mvn spring-boot:run
```

2. Terminal 2 - Start frontend:
```bash
cd frontend
npm run dev
```

### Testing API Calls

Use the browser's Network tab in DevTools to inspect API requests and responses.

### Debugging

- Use React DevTools browser extension for component debugging
- Check browser console for JavaScript errors
- Check Network tab for API failures

## Deployment

### Deploy to Production

1. Build the project:
```bash
npm run build
```

2. This creates a `dist` folder with static files

3. Deploy the `dist` folder to:
   - GitHub Pages
   - Netlify
   - Vercel
   - Your own server (nginx, Apache, etc.)

### Note on CORS

If deploying frontend and backend separately, ensure CORS is properly configured in the backend to accept requests from your frontend URL.

## Troubleshooting

### Login not working
- Check if backend is running on port 8080
- Verify email and password are correct
- Check browser console for errors

### Profile not saving
- Ensure you're logged in (check localStorage for token)
- Verify all required fields are filled
- Check backend logs for errors

### Schemes not loading
- Check if backend is running
- Verify you have permission to access the endpoint
- Check network tab for API errors

### Port 3000 already in use
```bash
# Kill process on port 3000 (Mac/Linux)
lsof -i :3000
kill -9 <PID>

# Or use different port in vite.config.js
server: {
  port: 3001
}
```

## Future Enhancements

- [ ] Add scheme application tracking
- [ ] Implement admin dashboard for scheme management
- [ ] Add email notifications
- [ ] Implement file upload for documents
- [ ] Add pagination for scheme lists
- [ ] Implement search and filter for schemes
- [ ] Add user profile picture upload
- [ ] Implement two-factor authentication

## License

This project is part of the Scheme Management System.

## Support

For issues or questions, please check:
1. Browser console for errors
2. Network tab for API issues
3. Backend logs for server errors

---

**Happy coding! 🚀**
