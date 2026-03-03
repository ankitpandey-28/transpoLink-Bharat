# 🚀 TranspoLink Bharat - Complete Setup Guide

This guide will walk you through setting up the complete TranspoLink Bharat application from scratch.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure Overview](#project-structure-overview)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Database Setup](#database-setup)
6. [Running the Application](#running-the-application)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js** (v16 or higher)
  - Download: https://nodejs.org/
  - Verify: `node --version`

- **npm** (comes with Node.js)
  - Verify: `npm --version`

- **MongoDB** (v5.0 or higher)
  - Option 1: Local installation - https://www.mongodb.com/try/download/community
  - Option 2: MongoDB Atlas (cloud) - https://www.mongodb.com/cloud/atlas
  - Verify: `mongod --version`

- **Git** (for version control)
  - Download: https://git-scm.com/
  - Verify: `git --version`

### Optional Tools

- **Postman** - For API testing (https://www.postman.com/)
- **MongoDB Compass** - GUI for MongoDB (https://www.mongodb.com/products/compass)
- **VS Code** - Recommended code editor (https://code.visualstudio.com/)

---

## 📁 Project Structure Overview

```
TranspoLink-Bharat/
├── frontend/          # React application
├── backend/           # Node.js + Express API
├── .gitignore
├── README.md
└── SETUP_GUIDE.md    # This file
```

---

## 🔧 Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- express (web framework)
- mongoose (MongoDB ODM)
- jsonwebtoken (authentication)
- bcryptjs (password hashing)
- cors (cross-origin requests)
- dotenv (environment variables)
- express-validator (input validation)
- multer (file uploads)

### Step 3: Create Environment File

```bash
cp .env.example .env
```

Edit `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/transpolink-bharat

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

**Important**: Change `JWT_SECRET` to a random secure string!

### Step 4: Start MongoDB

#### Option A: Local MongoDB

**Windows:**
```bash
net start MongoDB
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas (Cloud)

1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free tier available)
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get connection string and update `MONGODB_URI` in `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/transpolink-bharat
```

### Step 5: Start Backend Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

You should see:
```
🚀 TranspoLink Bharat API Server running on port 5000
📍 Environment: development
✅ MongoDB Connected: localhost
📊 Database: transpolink-bharat
🌐 Health check: http://localhost:5000/api/health
```

### Step 6: Test Backend

Open browser or use curl:
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "TranspoLink Bharat API is running",
  "timestamp": "2025-10-10T05:30:00.000Z",
  "environment": "development"
}
```

---

## 🎨 Frontend Setup

### Step 1: Navigate to Frontend Directory

Open a **new terminal** (keep backend running) and:

```bash
cd frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- react & react-dom
- react-router-dom (routing)
- axios (HTTP client)
- framer-motion (animations)
- lucide-react (icons)
- tailwindcss (styling)

### Step 3: Create Environment File

```bash
cp .env.example .env
```

The default `.env` should work:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=TranspoLink Bharat
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development
```

### Step 4: Start Frontend Development Server

```bash
npm run dev
```

You should see:
```
VITE v5.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

### Step 5: Access Application

Open your browser and navigate to:
```
http://localhost:5173
```

You should see the TranspoLink Bharat home page!

---

## 💾 Database Setup

### Understanding the Database Structure

The application uses 3 main collections:

1. **users** - Driver and client accounts
2. **goods** - Posted cargo/goods
3. **trucks** - Posted vehicles

### Initial Data (Optional)

You can manually create test data through the API or use MongoDB Compass to insert sample documents.

#### Sample User (Driver)

```json
{
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "phone": "9876543210",
  "password": "password123",
  "userType": "driver",
  "licenseNumber": "DL1234567890",
  "vehicleType": "truck"
}
```

Register via API:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "phone": "9876543210",
    "password": "password123",
    "userType": "driver",
    "licenseNumber": "DL1234567890",
    "vehicleType": "truck"
  }'
```

---

## 🏃 Running the Application

### Development Mode (Both Servers)

You need **2 terminal windows**:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health
- **API Docs**: http://localhost:5000 (root endpoint shows all routes)

---

## 🧪 Testing

### 1. Test Backend API

#### Health Check
```bash
curl http://localhost:5000/api/health
```

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "9876543210",
    "password": "test123",
    "userType": "client",
    "companyName": "Test Company"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

Save the `token` from the response!

#### Get All Goods
```bash
curl http://localhost:5000/api/goods
```

#### Get All Trucks
```bash
curl http://localhost:5000/api/trucks
```

### 2. Test Frontend

1. **Home Page**: Navigate to http://localhost:5173
2. **Language Toggle**: Click the 🌐 button in navbar
3. **Registration**: Click "Sign In / Sign Up" → Register
4. **Login**: Login with your credentials
5. **Post Goods**: Navigate to "Post Goods" (clients only)
6. **Post Truck**: Navigate to "Post Truck" (drivers only)
7. **Browse**: Check "Available Trucks" and "Available Goods"

---

## 🐛 Troubleshooting

### Backend Issues

#### Problem: MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
- Make sure MongoDB is running: `net start MongoDB` (Windows) or `sudo systemctl start mongod` (Linux/Mac)
- Check if MongoDB is listening on port 27017
- If using Atlas, check connection string and network access

#### Problem: Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
- Change PORT in `.env` to a different port (e.g., 5001)
- Or kill the process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -i :5000
  kill -9 <PID>
  ```

#### Problem: JWT Secret Error
```
Error: secretOrPrivateKey must have a value
```

**Solution:**
- Make sure `JWT_SECRET` is set in `.env` file
- Restart the backend server after changing `.env`

### Frontend Issues

#### Problem: API Connection Error
```
Network Error
```

**Solution:**
- Make sure backend is running on http://localhost:5000
- Check `VITE_API_URL` in frontend `.env`
- Check browser console for CORS errors

#### Problem: Blank Page
**Solution:**
- Check browser console for errors
- Make sure all dependencies are installed: `npm install`
- Clear browser cache and reload

#### Problem: Tailwind Styles Not Working
**Solution:**
- Make sure `tailwind.config.js` exists
- Restart dev server: `Ctrl+C` then `npm run dev`
- Check if `index.css` imports Tailwind directives

### Database Issues

#### Problem: Database Not Created
**Solution:**
- MongoDB creates databases automatically when first document is inserted
- Try registering a user to create the database

#### Problem: Can't See Data
**Solution:**
- Use MongoDB Compass to view data visually
- Connect to: `mongodb://localhost:27017`
- Database name: `transpolink-bharat`

---

## 📝 Next Steps

After successful setup:

1. ✅ Create test user accounts (driver and client)
2. ✅ Post some test goods
3. ✅ Post some test trucks
4. ✅ Test search and filter functionality
5. ✅ Test language toggle (English ↔ Hindi)
6. ✅ Explore all pages and features

---

## 🎓 Learning Resources

- **React**: https://react.dev/
- **Express.js**: https://expressjs.com/
- **MongoDB**: https://www.mongodb.com/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **JWT**: https://jwt.io/introduction

---

## 📞 Need Help?

If you encounter any issues:

1. Check this troubleshooting guide
2. Read the README files in `frontend/` and `backend/`
3. Check browser console and terminal logs
4. Contact: transpolinkbharat@gmail.com

---

## ✅ Setup Complete!

You now have a fully functional TranspoLink Bharat application running locally!

**Happy Coding! 🚀**
