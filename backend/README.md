# 🚛 TranspoLink Bharat - Backend API

Backend API for TranspoLink Bharat, an Indian logistics and transportation platform connecting truck drivers with businesses.

---

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/      # Request handlers
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── goodsController.js
│   │   └── truckController.js
│   ├── models/          # Database schemas
│   │   ├── User.js
│   │   ├── Goods.js
│   │   └── Truck.js
│   ├── routes/          # API routes
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── goodsRoutes.js
│   │   └── truckRoutes.js
│   ├── middleware/      # Custom middleware
│   │   └── auth.js
│   └── server.js        # Entry point
├── config/
│   └── db.js           # Database connection
├── .env.example        # Environment variables template
├── package.json
└── README.md
```

---

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/transpolink-bharat
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### 3. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

Or use MongoDB Atlas (cloud):
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string and update MONGODB_URI in .env

### 4. Run the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start on `http://localhost:5000`

---

## 📡 API Endpoints

### Health Check
```
GET /api/health
```
Returns server status and health information.

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| GET | `/api/auth/me` | Get current user | Private |
| POST | `/api/auth/logout` | Logout user | Private |

### Users

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users` | Get all users | Private |
| GET | `/api/users/:id` | Get single user | Private |
| PUT | `/api/users/:id` | Update user | Private |
| DELETE | `/api/users/:id` | Delete user | Private |

### Goods (Cargo)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/goods` | Get all goods | Public |
| GET | `/api/goods/:id` | Get single goods | Public |
| POST | `/api/goods` | Post new goods | Private (Client) |
| PUT | `/api/goods/:id` | Update goods | Private (Owner) |
| DELETE | `/api/goods/:id` | Delete goods | Private (Owner) |
| POST | `/api/goods/:id/assign` | Assign driver | Private (Client) |

### Trucks

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/trucks` | Get all trucks | Public |
| GET | `/api/trucks/:id` | Get single truck | Public |
| POST | `/api/trucks` | Post new truck | Private (Driver) |
| PUT | `/api/trucks/:id` | Update truck | Private (Owner) |
| DELETE | `/api/trucks/:id` | Delete truck | Private (Owner) |
| PATCH | `/api/trucks/:id/availability` | Update availability | Private (Owner) |

---

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Register Example

```bash
POST /api/auth/register
Content-Type: application/json

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

### Login Example

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "rajesh@example.com",
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
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "userType": "driver",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Using Token

Include the token in the Authorization header for protected routes:

```bash
GET /api/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📊 Database Models

### User Model
- name, email, phone, password
- userType: 'driver' | 'client'
- Driver fields: licenseNumber, vehicleType
- Client fields: companyName, gstNumber
- address, isVerified, isActive, rating

### Goods Model
- postedBy (User reference)
- cargoType, description, weight, quantity
- pickupLocation, deliveryLocation
- pickupDate, deliveryDate
- status: 'posted' | 'assigned' | 'in-transit' | 'delivered' | 'cancelled'
- assignedDriver (User reference)
- features: requiresRefrigeration, requiresInsurance, fragile

### Truck Model
- postedBy (User reference)
- vehicleType, vehicleNumber, vehicleModel
- capacity (weight, volume), dimensions
- currentLocation
- availableFrom, availableTo, isAvailable
- pricePerKm, minimumCharge
- features: gpsTracking, refrigerated, covered, insurance
- status: 'available' | 'booked' | 'in-transit' | 'maintenance' | 'inactive'

---

## 🧪 Testing API

### Using cURL

```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","phone":"9876543210","password":"test123","userType":"client","companyName":"Test Company"}'

# Get all goods
curl http://localhost:5000/api/goods
```

### Using Postman

1. Import the API endpoints
2. Set base URL: `http://localhost:5000`
3. For protected routes, add Authorization header:
   - Type: Bearer Token
   - Token: (paste your JWT token)

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ CORS enabled for frontend
- ✅ Input validation
- ✅ Protected routes
- ✅ User type authorization
- ✅ MongoDB injection prevention

---

## 🐛 Common Issues

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Make sure MongoDB is running
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
```

### JWT Secret Error
```
Error: secretOrPrivateKey must have a value
```
**Solution**: Make sure JWT_SECRET is set in .env file

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution**: Change PORT in .env or kill the process using port 5000

---

## 📝 Development Notes

### Adding New Routes

1. Create controller in `src/controllers/`
2. Create route in `src/routes/`
3. Import and use in `src/server.js`

### Adding New Models

1. Create model in `src/models/`
2. Define schema with validation
3. Export model

### Adding Middleware

1. Create middleware in `src/middleware/`
2. Apply to routes as needed

---

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/transpolink
JWT_SECRET=super_secure_random_string_for_production
FRONTEND_URL=https://your-frontend-domain.com
```

### Deployment Platforms

- **Heroku**: Easy deployment with MongoDB Atlas
- **Railway**: Modern platform with auto-deploy
- **DigitalOcean**: VPS with more control
- **AWS EC2**: Enterprise-grade hosting

---

## 📄 License

MIT License - See LICENSE file for details

---

## 👥 Contributors

TranspoLink Bharat Team

---

## 📞 Support

For issues and questions:
- Email: transpolinkbharat@gmail.com
- Phone: +91 99310 82500
