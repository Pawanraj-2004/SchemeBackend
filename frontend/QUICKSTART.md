# Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js 16+ installed
- ✅ Backend Spring Boot application running on `http://localhost:8080`
- ✅ Database configured and running

## Step-by-Step Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

This installs all required packages:
- react
- react-dom  
- react-router-dom
- axios
- vite
- And development dependencies

### 3. Start Development Server
```bash
npm run dev
```

**Output:**
```
  VITE v5.0.8  ready in 123 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

### 4. Visit the Application
Open your browser and go to: `http://localhost:3000`

You should see the login page!

---

## First Time Testing

### Test Registration
1. Click "Register here"
2. Fill in the form:
   - Name: `Pawan`
   - Email: `pawan@test.com`
   - Password: `123456`
3. Click "Register"
4. You'll be redirected to login

### Test Login
1. Enter the credentials you just registered
2. Click "Login"
3. You'll see the dashboard

### Test Profile Creation
1. Click "Profile" in the navigation
2. Fill in the profile details:
   - Age: `24`
   - Income: `250000`
   - Caste: `OBC`
   - Occupation: `Student`
   - State: `Madhya Pradesh`
3. Click "Save Profile"
4. Your profile is now created!

### Test Scheme Viewing
1. Click "All Schemes" to see all schemes
2. Note: This will be empty until an admin creates schemes in the backend

### Admin Setup (Required for Full Testing)

To test scheme creation, you need to make someone an admin:

1. Go to your database and run:
```sql
UPDATE user SET role = 'ADMIN' WHERE email = 'pawan@test.com';
```

2. Log out and log back in

3. Now you can click "Add Scheme (Admin)" to create schemes

### Test Scheme Creation
1. Click "Add Scheme (Admin)"
2. Fill in scheme details:
   - Name: `Student Scholarship`
   - Description: `Financial aid for students`
   - Min Income: `0`
   - Max Income: `300000`
   - Min Age: `18`
   - Max Age: `30`
   - Caste: `ALL`
   - State: `ALL`
   - Occupation: `Student`
3. Click "Create Scheme"

### View Eligible Schemes
1. Click "My Eligibility"
2. You should see the Student Scholarship scheme (since your profile matches)

---

## Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linter
npm run lint
```

---

## Important Notes

### Token Storage
Your JWT token is automatically saved in browser's `localStorage` under the key `token`. It will persist even after closing the browser.

### API Base URL
The frontend is configured to proxy all `/api` requests to `http://localhost:8080` (configured in `vite.config.js`).

### Port Configuration
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8080`

If you need to change these, edit:
- Frontend port: `vite.config.js` → `server.port`
- Backend URL: `vite.config.js` → `server.proxy['/api'].target`

---

## Troubleshooting

### Port Already in Use
If port 3000 is already in use:
```bash
# Find and kill the process
lsof -i :3000
kill -9 <PID>

# Or use a different port in vite.config.js
```

### Backend Not Responding
- Check if Spring Boot backend is running: `curl http://localhost:8080/api/health`
- Check backend logs for errors
- Verify database is running

### Module Not Found Error
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Token Issues
- Clear localStorage: Open DevTools → Application → Local Storage → Delete token
- Log out from the application
- Log in again

---

## Next Steps

1. ✅ Frontend is running
2. ✅ Backend API is working
3. ✅ Database is configured
4. ✅ User can register, login, and manage profile
5. ✅ Admin can create schemes
6. ✅ Users can view eligible schemes

Start exploring and testing! 🚀

---

## File Structure Quick Reference

```
frontend/
├── src/
│   ├── components/           # All React components
│   ├── context/              # Auth context (login state)
│   ├── services/             # API calls (api.js)
│   ├── styles/               # CSS files
│   ├── App.jsx               # Main app & routes
│   └── main.jsx              # Entry point
├── index.html                # HTML template
├── vite.config.js            # Build config
└── package.json              # Dependencies
```

For more detailed information, see [README.md](./README.md)
