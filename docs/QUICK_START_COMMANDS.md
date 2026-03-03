# 🚀 TranspoLink Bharat - Quick Start Commands

Copy and paste these commands to get started quickly!

---

## 📋 Prerequisites Check

```bash
# Check Node.js version (should be v16+)
node --version

# Check npm version
npm --version

# Check if MongoDB is installed
mongod --version
```

---

## ⚙️ One-Time Setup

### 1. Create Backend .env File

```bash
cd backend
copy .env.example .env
```

**Then edit `backend\.env` and set:**
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - A random secure string (e.g., `my_super_secret_key_12345`)

### 2. Install All Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## 🚀 Running the Application

### Option 1: Two Separate Terminals (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Option 2: Using PowerShell (Both at Once)

```powershell
# Start backend in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"

# Start frontend in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"
```

---

## 🧪 Testing Commands

### Test Backend Health

```bash
curl http://localhost:5000/api/health
```

Or open in browser:
```
http://localhost:5000/api/health
```

### Test Frontend

Open in browser:
```
http://localhost:3000
```

### Test API Endpoints

**Register User:**
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@example.com\",\"phone\":\"9876543210\",\"password\":\"test123\",\"userType\":\"client\",\"companyName\":\"Test Company\"}"
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"test123\"}"
```

**Get All Goods:**
```bash
curl http://localhost:5000/api/goods
```

**Get All Trucks:**
```bash
curl http://localhost:5000/api/trucks
```

---

## 🗄️ MongoDB Commands

### Start MongoDB

**Windows:**
```bash
net start MongoDB
```

**Linux/Mac:**
```bash
sudo systemctl start mongod
```

### Check MongoDB Status

**Windows:**
```bash
sc query MongoDB
```

**Linux/Mac:**
```bash
sudo systemctl status mongod
```

### Stop MongoDB

**Windows:**
```bash
net stop MongoDB
```

**Linux/Mac:**
```bash
sudo systemctl stop mongod
```

### Connect to MongoDB Shell

```bash
mongosh
```

Then in MongoDB shell:
```javascript
// Show all databases
show dbs

// Use TranspoLink database
use transpolink-bharat

// Show all collections
show collections

// Find all users
db.users.find()

// Find all goods
db.goods.find()

// Find all trucks
db.trucks.find()
```

---

## 🛑 Stopping the Application

### Stop Backend
Press `Ctrl + C` in the backend terminal

### Stop Frontend
Press `Ctrl + C` in the frontend terminal

### Kill Processes (if needed)

**Find process using port 5000 (backend):**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F
```

**Find process using port 3000 (frontend):**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F
```

---

## 🔄 Restart After Changes

### Restart Backend (after code changes)
The backend auto-restarts with `npm run dev` (nodemon)

### Restart Frontend (after code changes)
The frontend auto-reloads with `npm start` (react-scripts)

### Restart After .env Changes
You MUST restart both servers after changing .env files:
1. Press `Ctrl + C` to stop
2. Run `npm run dev` or `npm start` again

---

## 📦 Update Dependencies

### Update Backend Dependencies
```bash
cd backend
npm update
```

### Update Frontend Dependencies
```bash
cd frontend
npm update
```

### Install New Package

**Backend:**
```bash
cd backend
npm install package-name
```

**Frontend:**
```bash
cd frontend
npm install package-name
```

---

## 🧹 Clean Install (if issues occur)

### Backend Clean Install
```bash
cd backend
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Frontend Clean Install
```bash
cd frontend
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

## 🏗️ Build for Production

### Build Frontend
```bash
cd frontend
npm run build
```

Output will be in `frontend/build/` directory

### Run Backend in Production Mode
```bash
cd backend
set NODE_ENV=production
npm start
```

---

## 📊 Useful Development Commands

### View Backend Logs
Backend logs appear in the terminal where you ran `npm run dev`

### View Frontend Logs
Frontend logs appear in:
1. Terminal where you ran `npm start`
2. Browser console (F12)

### Clear Browser Cache
Press `Ctrl + Shift + Delete` in browser

### Clear React Cache
```bash
cd frontend
rmdir /s /q node_modules\.cache
```

---

## 🔍 Debugging Commands

### Check if ports are in use
```bash
netstat -ano | findstr :5000
netstat -ano | findstr :3000
```

### Check Node.js processes
```bash
tasklist | findstr node
```

### View environment variables (backend)
```bash
cd backend
type .env
```

### View environment variables (frontend)
```bash
cd frontend
type .env
```

---

## 📝 Git Commands (Optional)

### Initialize Git (if not already done)
```bash
git init
```

### Add all files
```bash
git add .
```

### Commit changes
```bash
git commit -m "Project restructured with frontend/backend separation"
```

### Create .gitignore (already exists)
The .gitignore file is already configured to ignore:
- node_modules/
- .env files
- build/
- dist/

---

## ✅ Daily Development Workflow

1. **Start MongoDB**
   ```bash
   net start MongoDB
   ```

2. **Start Backend** (Terminal 1)
   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend** (Terminal 2)
   ```bash
   cd frontend
   npm start
   ```

4. **Open Browser**
   ```
   http://localhost:3000
   ```

5. **Start Coding!** 🚀

---

## 🆘 Emergency Commands

### Everything is broken, start fresh:

```bash
# 1. Stop all servers (Ctrl + C)

# 2. Clean install backend
cd backend
rmdir /s /q node_modules
del package-lock.json
npm install

# 3. Clean install frontend
cd ../frontend
rmdir /s /q node_modules
del package-lock.json
npm install

# 4. Restart MongoDB
net stop MongoDB
net start MongoDB

# 5. Start backend
cd ../backend
npm run dev

# 6. Start frontend (new terminal)
cd frontend
npm start
```

---

**Keep this file handy for quick reference!** 📌
