# 🚀 TranspoLink Bharat - Quick Reference Card

## ⚡ Start Application (2 Commands)

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm start
```

**URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

---

## 👥 User Roles

| Role | Value | Can Do |
|------|-------|--------|
| **Truck Driver** | `truck_driver` | Post trucks, view goods, access Driver Dashboard |
| **Businessman** | `businessman` | Post goods, view trucks, access Client Dashboard |

---

## 🔑 Test Accounts (Create These)

### Businessman
```
Email: john@example.com
Password: password123
Name: John Doe
Company: ABC Logistics
Phone: 9876543210
```

### Truck Driver
```
Email: raj@example.com
Password: password123
Name: Raj Kumar
Phone: 9876543211
```

---

## 📡 Key API Endpoints

### Authentication
```http
POST /api/auth/register  # Register
POST /api/auth/login     # Login
GET  /api/auth/me        # Get current user (protected)
POST /api/auth/logout    # Logout (protected)
```

### Goods (Businessman only for POST)
```http
GET  /api/goods          # List all goods
POST /api/goods          # Create goods (businessman only)
GET  /api/goods/:id      # Get single goods
```

### Trucks (Truck Driver only for POST)
```http
GET  /api/trucks         # List all trucks
POST /api/trucks         # Create truck (truck_driver only)
GET  /api/trucks/:id     # Get single truck
```

---

## 🗂️ Database Collections

1. **users** - User accounts (truck_driver, businessman)
2. **trucks** - Posted trucks/vehicles
3. **goods** - Posted goods/cargo

---

## 🎨 Navbar Behavior

### Before Login
```
Home | Available Trucks | Available Goods | Post Goods | Post Truck | Contact | 🌐 | 👤
```

### Truck Driver (Logged In)
```
Home | Available Goods | Post Truck | Contact | 🌐 | 👤
```

### Businessman (Logged In)
```
Home | Available Trucks | Post Goods | Contact | 🌐 | 👤
```

---

## 🔧 Environment Setup

### Backend `.env`
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/transpolink-bharat
JWT_SECRET=your_super_secret_jwt_key
FRONTEND_URL=http://localhost:3000
```

### Frontend `.env`
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐛 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB not connecting | Start MongoDB service or use Atlas |
| Port 5000 in use | Change PORT in backend/.env |
| CORS error | Check FRONTEND_URL in backend/.env |
| Token invalid | Clear localStorage and login again |
| Module not found | Run `npm install` in that directory |

---

## 📦 Tech Stack

- **Frontend**: React 18 + TailwindCSS + Framer Motion
- **Backend**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (JSON Web Tokens)
- **Styling**: TailwindCSS
- **Icons**: Lucide React

---

## ✅ Feature Checklist

- [x] Dual role authentication (Truck Driver & Businessman)
- [x] JWT token-based security
- [x] Role-based navigation
- [x] Post trucks (drivers only)
- [x] Post goods (businessmen only)
- [x] Browse available trucks and goods
- [x] Bilingual support (English/Hindi)
- [x] Responsive design
- [x] Modern UI with animations
- [x] Protected routes
- [x] MongoDB integration

---

## 🎯 Quick Test Flow

1. **Start servers** (backend + frontend)
2. **Register as Businessman** → Redirects to Client Dashboard
3. **Logout**
4. **Register as Truck Driver** → Redirects to Driver Dashboard
5. **Test navigation** → Navbar changes based on role
6. **Toggle language** → Click 🌐 icon
7. **Post goods** (as businessman)
8. **Post truck** (as driver)

---

## 📚 Documentation Files

- `COMPLETE_SETUP_GUIDE.md` - Full setup instructions
- `IMPLEMENTATION_SUMMARY.md` - What was built/fixed
- `QUICK_REFERENCE.md` - This file
- `README.md` - Project overview

---

## 🆘 Need Help?

1. Check console logs (browser + terminal)
2. Verify environment variables
3. Ensure MongoDB is running
4. Clear browser localStorage
5. Restart both servers

---

**Last Updated:** October 10, 2025
**Status:** ✅ Production Ready
