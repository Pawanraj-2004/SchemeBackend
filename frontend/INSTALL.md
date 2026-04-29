# Installation & Setup Instructions

Complete step-by-step guide to install and run the Scheme Management System frontend.

## Prerequisites

Before you begin, ensure you have:

- **Node.js 16+** - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - For cloning and version control
- **Backend API** running on `http://localhost:8080`

### Verify Prerequisites

```bash
node --version        # Should be 16.0.0 or higher
npm --version         # Should be 8.0.0 or higher
```

---

## Installation Steps

### Step 1: Navigate to Frontend Directory

```bash
cd /workspaces/SchemeBackend/frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json`:
- React and React DOM
- React Router for navigation
- Axios for HTTP requests
- Vite as build tool
- And development dependencies

**Expected output:**
```
added 200+ packages, and audited 201 packages in 30s
```

### Step 3: Verify Installation

Check if all dependencies are installed:
```bash
npm list --depth=0
```

Expected to see:
```
scheme-frontend@0.0.1
├── axios@1.6.2
├── react@18.2.0
├── react-dom@18.2.0
├── react-router-dom@6.20.0
└── (dev dependencies...)
```

---

## Running the Application

### Option 1: Development Mode (Recommended)

```bash
npm run dev
```

**Output will show:**
```
  VITE v5.0.8  ready in 123 ms

  ➜  Local:   http://localhost:3000/
  ➜  Press h to show help
```

**Visit:** http://localhost:3000 in your browser

### Option 2: Production Build

```bash
# Build optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## Pre-Flight Checks

Before testing the application, verify:

### ✅ 1. Backend is Running

```bash
curl http://localhost:8080/api/health
```

Expected response: `UP` or similar health response

If fails, start the backend:
```bash
# In another terminal
cd /workspaces/SchemeBackend
mvn spring-boot:run
```

### ✅ 2. Port 3000 is Available

```bash
lsof -i :3000
```

If something is using port 3000:
```bash
# Kill the process (Mac/Linux)
kill -9 <PID>

# Or use a different port in vite.config.js
```

### ✅ 3. Network Access

```bash
# Test network connectivity to backend
curl -X GET http://localhost:8080/api/schemes
```

---

## First Time Running

### 1. Start the Frontend

```bash
npm run dev
```

### 2. Open in Browser

- Go to: `http://localhost:3000`
- You should see a purple login page

### 3. Test Registration

```
URL: http://localhost:3000/register

Fill form:
- Name: Test User
- Email: test@example.com
- Password: password123

Click Register
```

### 4. Test Login

```
URL: http://localhost:3000/login

Fill form:
- Email: test@example.com
- Password: password123

Click Login
```

If successful:
- You'll see the Dashboard
- Token will be saved in localStorage
- You'll be able to access protected pages

---

## Configuration

### Default Configuration

The application is pre-configured to work with:
- **Frontend:** `http://localhost:3000`
- **Backend:** `http://localhost:8080`
- **Database:** Connected to your backend

### Custom Configuration

To change the backend URL, edit `vite.config.js`:

```javascript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://your-backend-url:port',  // Change this
      changeOrigin: true
    }
  }
}
```

Then restart the dev server (Ctrl+C and run `npm run dev` again).

---

## Project Structure After Installation

```
frontend/
├── node_modules/          ← Installed packages (200+)
├── dist/                  ← Build output (created after npm run build)
├── src/                   ← Source code
├── index.html            ← HTML template
├── package.json          ← Dependencies
├── vite.config.js        ← Build config
└── README.md             ← Full documentation
```

---

## npm Commands Reference

```bash
# Development server
npm run dev              # Start dev server on port 3000

# Production build
npm run build            # Create optimized dist/ folder
npm run preview          # View production build locally

# Code quality
npm run lint             # Check for code issues

# Other
npm list                 # Show installed packages
npm update               # Update all packages
npm cache clean --force  # Clear npm cache
```

---

## Troubleshooting

### Problem: "npm: command not found"
**Solution:** Node.js is not installed
```bash
# Install from https://nodejs.org/
# Then verify:
node --version
npm --version
```

### Problem: "Module not found" error
**Solution:** Dependencies not installed
```bash
npm install
```

### Problem: "Port 3000 already in use"
**Solution:** Change the port
```javascript
// vite.config.js
server: {
  port: 3001  // Change to 3001 or any available port
}
```

### Problem: Cannot connect to backend
**Solution:** Check backend status
```bash
# Check if backend is running
curl http://localhost:8080/api/health

# If not, start it
cd /workspaces/SchemeBackend
mvn spring-boot:run
```

### Problem: "404 Not Found" on login
**Solution:** Check proxy configuration
```bash
# Verify vite.config.js has correct proxy settings
# Restart dev server: Ctrl+C then npm run dev
```

---

## Development Tips

### Using VS Code

1. **Open workspace:**
   ```bash
   code /workspaces/SchemeBackend
   ```

2. **Useful Extensions:**
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter
   - ESLint
   - Thunder Client or REST Client (for API testing)

### Hot Module Replacement (HMR)

Vite automatically reloads your app when you make changes to files. Just save and see the changes instantly!

### Debug in Browser

1. Open DevTools (F12)
2. Go to Console tab to see errors
3. Go to Network tab to see API requests
4. Go to Application tab to see localStorage

### IDE Setup

**For VS Code:**

Create `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## Testing Checklist

After installation, verify everything works:

- [ ] Frontend loads at `http://localhost:3000`
- [ ] Can navigate to login page
- [ ] Can register a new user
- [ ] Can log in with credentials
- [ ] Token appears in localStorage after login
- [ ] Can view dashboard
- [ ] Can navigate between pages
- [ ] API calls work (check Network tab)
- [ ] Error messages display properly
- [ ] Responsive design works on mobile view

---

## Performance Optimization

### For Development

- Vite uses ES modules for fast refresh
- Hot Module Replacement (HMR) enabled
- Source maps for debugging

### For Production

```bash
npm run build
```

Creates optimized bundle:
- Code minification
- Tree shaking
- Lazy loading
- Caching strategies

---

## Deployment Preparation

Before deploying, ensure:

1. **Build works:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Environment variables are set:**
   - Copy `.env.example` to `.env`
   - Update API URLs for production

3. **Backend URL is correct:**
   - Update backend URL in `vite.config.js` or environment variables

4. **No console errors:**
   - Check browser console for warnings/errors
   - Run `npm run lint` to check code quality

---

## Getting Help

If you encounter issues:

1. **Check logs:**
   - Terminal output when running `npm run dev`
   - Browser console (F12)
   - Developer tools Network tab

2. **Verify setup:**
   - Node.js version: `node --version`
   - npm packages: `npm list --depth=0`
   - Backend running: `curl http://localhost:8080`

3. **Review documentation:**
   - [README.md](./README.md) - Full documentation
   - [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
   - [INTEGRATION.md](./INTEGRATION.md) - API integration details

4. **Common issues:**
   - See [README.md#troubleshooting](./README.md#troubleshooting)

---

## Next Steps

1. ✅ Read [QUICKSTART.md](./QUICKSTART.md) for first-time usage
2. ✅ Review [README.md](./README.md) for full documentation
3. ✅ Check [INTEGRATION.md](./INTEGRATION.md) for API details
4. ✅ Start developing!

---

## Additional Resources

- **Node.js:** https://nodejs.org/
- **React:** https://react.dev
- **Vite:** https://vitejs.dev
- **React Router:** https://reactrouter.com
- **Axios:** https://axios-http.com

---

## Summary

You're now ready to develop! 🚀

```bash
# Quick start (3 commands)
cd frontend
npm install
npm run dev
```

Then visit `http://localhost:3000`

---

Questions? Check:
1. **Installation issues** → This file
2. **How to use** → QUICKSTART.md
3. **API details** → INTEGRATION.md
4. **Full documentation** → README.md

Happy coding! 💻
