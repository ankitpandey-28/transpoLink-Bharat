# 🚛 TranspoLink Bharat - Complete Setup & Running Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Installation Steps](#installation-steps)
4. [Running the Application](#running-the-application)
5. [Testing the Application](#testing-the-application)
6. [API Documentation](#api-documentation)
7. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**TranspoLink Bharat** is a full-stack MERN application connecting truck drivers with businesses across India.

### Tech Stack
- **Frontend**: React 18 + TailwindCSS + Framer Motion
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

### Key Features
- ✅ Dual role authentication (Truck Driver & Businessman)
- ✅ Role-based navigation and dashboards
- ✅ Post trucks (Drivers only)
- ✅ Post goods (Businessmen only)
- ✅ Browse available trucks and goods
- ✅ Bilingual support (English/Hindi)
- ✅ Modern, responsive UI

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download: https://nodejs.org/
   - Verify: `node --version`

2. **MongoDB**
   - **Option A**: Local MongoDB
     - Download: https://www.mongodb.com/try/download/community
     - Start MongoDB service
   - **Option B**: MongoDB Atlas (Cloud)
     - Sign up: https://www.mongodb.com/cloud/atlas
     - Create a free cluster
     - Get connection string

3. **Git** (optional, for cloning)
   - Download: https://git-scm.com/

4. **Code Editor** (VS Code recommended)
   - Download: https://code.visualstudio.com/

---

## 🚀 Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd d:\TranspoLink
```

### Step 2: Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file (if not exists)
copy .env.example .env
```

**Edit `backend/.env` file:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
# For Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/transpolink-bharat

# For MongoDB Atlas (Cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/transpolink-bharat

# JWT Secret (IMPORTANT: Change this!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345

# JWT Expiration
JWT_EXPIRE=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

**Important Notes:**
- Replace `JWT_SECRET` with a strong random string
- If using MongoDB Atlas, replace the connection string with your actual credentials
- Keep the `.env` file secure and never commit it to version control

### Step 3: Setup Frontend

```bash
# Navigate to frontend folder (from project root)
cd ..\frontend

# Install dependencies
npm install

# Create .env file (if not exists)
copy .env.example .env
```

**Edit `frontend/.env` file:**

```env
# Backend API URL
REACT_APP_API_URL=http://localhost:5000/api

# App Configuration
REACT_APP_NAME=TranspoLink Bharat
REACT_APP_VERSION=1.0.0

# Environment
NODE_ENV=development
```

---

## 🏃 Running the Application

### Method 1: Run Backend and Frontend Separately

#### Terminal 1 - Start Backend Server

```bash
# From project root
cd backend
npm run dev
```

**Expected Output:**
```
🚀 TranspoLink Bharat API Server running on port 5000
📍 Environment: development
🌐 Health check: http://localhost:5000/api/health
✅ MongoDB Connected: localhost
📊 Database: transpolink-bharat
```

#### Terminal 2 - Start Frontend Development Server

```bash
# From project root (open new terminal)
cd frontend
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view transpolink-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### Method 2: Quick Start Script (Windows)

Create a file `start.bat` in the project root:

```batch
@echo off
echo Starting TranspoLink Bharat...
echo.

echo Starting Backend Server...
start cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start cmd /k "cd frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
```

Run: `start.bat`

---

## 🧪 Testing the Application

### 1. Check Backend Health

Open browser and visit:
```
http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "TranspoLink Bharat API is running",
  "timestamp": "2025-10-10T12:11:00.000Z",
  "environment": "development"
}
```

### 2. Access Frontend

Open browser and visit:
```
http://localhost:3000
```

You should see the TranspoLink Bharat homepage.

### 3. Test User Registration

#### Register as Businessman:

1. Click on the **Profile icon** (top right)
2. Click **Sign Up**
3. Fill in the form:
   - Select: **Business Owner**
   - First Name: `John`
   - Last Name: `Doe`
   - Company Name: `ABC Logistics`
   - Email: `john@example.com`
   - Phone: `9876543210`
   - Password: `password123`
   - Confirm Password: `password123`
   - Check: Accept terms
4. Click **Create Account**

**Expected Result:** Redirected to Client Dashboard

#### Register as Truck Driver:

1. Logout (if logged in)
2. Click **Profile icon** → **Sign Up**
3. Fill in the form:
   - Select: **Truck Driver**
   - First Name: `Raj`
   - Last Name: `Kumar`
   - Email: `raj@example.com`
   - Phone: `9876543211`
   - Password: `password123`
   - Confirm Password: `password123`
   - Check: Accept terms
4. Click **Create Account**

**Expected Result:** Redirected to Driver Dashboard

### 4. Test Login

1. Logout
2. Click **Profile icon** → **Sign In**
3. Enter credentials:
   - Email: `john@example.com`
   - Password: `password123`
4. Click **Sign in**

**Expected Result:** Redirected to appropriate dashboard based on role

### 5. Test Role-Based Features

#### As Businessman:
- Navigate to **Post Goods** (should work)
- Try to access **Post Truck** (should work but ideally for drivers)
- View **Available Trucks**

#### As Truck Driver:
- Navigate to **Post Truck** (should work)
- Try to access **Post Goods** (should work but ideally for businessmen)
- View **Available Goods**

### 6. Test Navbar Behavior

**Before Login:**
- Home | Available Trucks | Available Goods | Post Goods | Post Truck | Contact | Language | Login

**Logged in as Truck Driver:**
- Home | Available Goods | Post Truck | Contact | Language | Logout

**Logged in as Businessman:**
- Home | Available Trucks | Post Goods | Contact | Language | Logout

### 7. Test Language Toggle

Click the **🌐 Globe icon** to switch between English and Hindi.

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "password": "password123",
  "userType": "businessman",
  "companyName": "ABC Logistics"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "userType": "businessman",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "userType": "businessman",
    "isVerified": false,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 3. Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

#### 4. Logout
```http
POST /auth/logout
Authorization: Bearer <token>
```

### Goods Endpoints

#### 1. Get All Goods
```http
GET /goods
```

#### 2. Create Goods (Businessman only)
```http
POST /goods
Authorization: Bearer <token>
Content-Type: application/json

{
  "cargoType": "householdGoods",
  "description": "Furniture items",
  "weight": 500,
  "pickupLocation": {
    "address": "123 Main St",
    "city": "Delhi",
    "state": "Delhi",
    "pincode": "110001"
  },
  "deliveryLocation": {
    "address": "456 Park Ave",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "pickupDate": "2025-10-15"
}
```

### Truck Endpoints

#### 1. Get All Trucks
```http
GET /trucks
```

#### 2. Create Truck (Truck Driver only)
```http
POST /trucks
Authorization: Bearer <token>
Content-Type: application/json

{
  "vehicleType": "truck",
  "vehicleNumber": "DL01AB1234",
  "vehicleModel": "Tata 407",
  "capacity": {
    "weight": 5000
  },
  "currentLocation": {
    "city": "Delhi",
    "state": "Delhi"
  },
  "availableFrom": "2025-10-10",
  "pricePerKm": 25
}
```

---

## 🔧 Troubleshooting

### Issue 1: MongoDB Connection Error

**Error:**
```
❌ MongoDB Connection Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solution:**
1. Make sure MongoDB service is running
2. For Windows: Open Services → Start "MongoDB Server"
3. Or use MongoDB Atlas cloud connection string

### Issue 2: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**
1. Kill the process using the port:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```
2. Or change the PORT in `backend/.env`

### Issue 3: CORS Error

**Error:**
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solution:**
1. Check `FRONTEND_URL` in `backend/.env` matches your frontend URL
2. Restart backend server after changing `.env`

### Issue 4: JWT Token Invalid

**Error:**
```
Not authorized to access this route. Invalid token.
```

**Solution:**
1. Clear browser localStorage
2. Login again to get a new token

### Issue 5: Module Not Found

**Error:**
```
Cannot find module 'express'
```

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue 6: React App Won't Start

**Solution:**
```bash
# Clear cache and reinstall
cd frontend
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
npm start
```

---

## 📝 Important Notes

### User Types
- **truck_driver**: Can post trucks, view available goods
- **businessman**: Can post goods, view available trucks

### Default Navbar Behavior
- **Before Login**: Shows all navigation items
- **After Login**: Shows role-specific navigation

### Token Storage
- JWT tokens are stored in `localStorage` as `token`
- User data is stored in `localStorage` as `transpolink_user`

### Database Collections
- **users**: Stores user accounts (drivers and businessmen)
- **trucks**: Stores posted trucks/vehicles
- **goods**: Stores posted goods/cargo

---

## 🎉 Success Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] MongoDB connected successfully
- [ ] Can register as Businessman
- [ ] Can register as Truck Driver
- [ ] Can login with both roles
- [ ] Navbar changes based on user role
- [ ] Can post goods as Businessman
- [ ] Can post truck as Truck Driver
- [ ] Language toggle works (English ↔ Hindi)
- [ ] Logout works correctly

---

## 🆘 Need Help?

If you encounter any issues:

1. Check the console logs (both frontend and backend)
2. Verify all environment variables are set correctly
3. Ensure MongoDB is running
4. Clear browser cache and localStorage
5. Restart both servers

---

**Made with ❤️ in India 🇮🇳**

**Last Updated:** October 10, 2025
