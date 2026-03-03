# TranspoLink Data Flow Implementation

## Overview
Complete end-to-end implementation of data posting and retrieval for goods and trucks in the TranspoLink logistics platform.

**Implementation Date:** October 11, 2025

---

## Architecture

```
User → Frontend (React) → Backend API (Express) → MongoDB
                ↓
         Toast Notifications
                ↓
         Auto-refresh Display
```

---

## Backend Implementation

### 1. Database Models

#### **Goods Model** (`backend/src/models/Goods.js`)
```javascript
{
  postedBy: ObjectId (ref: User),
  cargoType: String (enum),
  description: String,
  weight: Number (kg),
  pickupLocation: {
    address, city, state, pincode, coordinates
  },
  deliveryLocation: {
    address, city, state, pincode, coordinates
  },
  pickupDate: Date,
  deliveryDate: Date,
  estimatedPrice: Number,
  status: String (posted/assigned/in-transit/delivered/cancelled),
  contactPerson: { name, phone },
  requiresRefrigeration: Boolean,
  fragile: Boolean,
  notes: String
}
```

#### **Truck Model** (`backend/src/models/Truck.js`)
```javascript
{
  postedBy: ObjectId (ref: User),
  vehicleType: String (enum),
  vehicleNumber: String (unique),
  vehicleModel: String,
  capacity: { weight, volume },
  currentLocation: {
    address, city, state, pincode, coordinates
  },
  availableFrom: Date,
  availableTo: Date,
  pricePerKm: Number,
  features: {
    gpsTracking, refrigerated, covered, insurance
  },
  driverContact: { name, phone, alternatePhone },
  status: String (available/booked/in-transit/maintenance/inactive),
  rating: Number,
  notes: String
}
```

### 2. API Endpoints

#### **Goods Endpoints**
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/goods` | Public | Fetch all goods |
| GET | `/api/goods/:id` | Public | Fetch single goods |
| POST | `/api/goods` | Protected (businessman) | Create new goods |
| PUT | `/api/goods/:id` | Protected (owner) | Update goods |
| DELETE | `/api/goods/:id` | Protected (owner) | Delete goods |

#### **Truck Endpoints**
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/trucks` | Public | Fetch all trucks |
| GET | `/api/trucks/:id` | Public | Fetch single truck |
| POST | `/api/trucks` | Protected (truck_driver) | Create new truck |
| PUT | `/api/trucks/:id` | Protected (owner) | Update truck |
| DELETE | `/api/trucks/:id` | Protected (owner) | Delete truck |

### 3. Controllers

#### **Goods Controller** (`backend/src/controllers/goodsController.js`)
- ✅ User type validation (businessman only)
- ✅ Automatic user association (`postedBy`)
- ✅ Population of user details in responses
- ✅ Status management
- ✅ Error handling

#### **Truck Controller** (`backend/src/controllers/truckController.js`)
- ✅ User type validation (truck_driver only)
- ✅ Automatic user association (`postedBy`)
- ✅ Vehicle number uniqueness check
- ✅ Population of user details in responses
- ✅ Error handling

### 4. Middleware Protection

**Auth Middleware** (`backend/src/middleware/auth.js`)
- JWT token verification
- User authentication check
- User type authorization
- Applied to all POST/PUT/DELETE routes

---

## Frontend Implementation

### 1. Post Goods Page (`frontend/src/pages/PostGoods.js`)

#### **Data Mapping**
```javascript
Form Data → Backend Schema:
- category → cargoType (mapped to enum)
- pickupLocation → parsed to { address, city, state, pincode }
- deliveryLocation → parsed to { address, city, state, pincode }
- weight → Number (kg)
- budget → estimatedPrice
- specialRequirements → requiresRefrigeration, fragile flags
- contactName + phone → contactPerson object
```

#### **Features**
- ✅ 4-step form wizard
- ✅ Real-time validation
- ✅ Location parsing helper
- ✅ Category mapping to backend enums
- ✅ Loading states during submission
- ✅ Success/error toast notifications
- ✅ Form reset after successful submission
- ✅ JWT token auto-attached to requests

### 2. Post Truck Page (`frontend/src/pages/PostTruck.js`)

#### **Data Mapping**
```javascript
Form Data → Backend Schema:
- truckType → vehicleType (mapped to enum)
- capacity (tons) → capacity.weight (kg)
- fromLocation → currentLocation (parsed)
- truckRegistration → vehicleNumber
- pricePerKm → Number
- driverName + contactNumber → driverContact object
- truckType → features (refrigerated, covered flags)
```

#### **Features**
- ✅ Single-page form
- ✅ Real-time validation
- ✅ Truck type mapping
- ✅ Capacity unit conversion (tons → kg)
- ✅ Loading states during submission
- ✅ Success/error toast notifications
- ✅ Form reset after successful submission
- ✅ JWT token auto-attached to requests

### 3. Available Goods Page (`frontend/src/pages/AvailableGoods.js`)

#### **Data Fetching**
```javascript
useEffect(() => {
  fetchGoods(); // Calls goodsAPI.getAll()
}, []);
```

#### **Features**
- ✅ Real-time data fetching from MongoDB
- ✅ Loading spinner during fetch
- ✅ Dynamic filtering by:
  - Search term (business name, contact, cargo type)
  - Cargo type
  - Location
  - Date
- ✅ Sorting by:
  - Date (earliest/latest)
  - Weight (low/high)
  - Price (high/low)
- ✅ Responsive card grid layout
- ✅ Contact buttons (call, email)
- ✅ Google Maps directions integration
- ✅ Empty state handling
- ✅ Error handling with toast notifications

#### **Display Fields**
- Business/Company name
- Contact person
- Cargo type
- Weight (kg)
- Pickup & delivery locations
- Pickup date
- Estimated price
- Special requirements (refrigeration, fragile)
- Status badge
- Verified badge (if user verified)

### 4. Available Trucks Page (`frontend/src/pages/AvailableTrucks.js`)

#### **Data Fetching**
```javascript
useEffect(() => {
  fetchTrucks(); // Calls trucksAPI.getAll()
}, []);
```

#### **Features**
- ✅ Real-time data fetching from MongoDB
- ✅ Loading spinner during fetch
- ✅ Dynamic filtering by:
  - Search term (driver name, company, vehicle type)
  - Vehicle type
  - Location
  - Date
- ✅ Sorting by:
  - Price per km (low/high)
  - Date (earliest/latest)
  - Rating
- ✅ Responsive card grid layout
- ✅ Contact buttons (call, email)
- ✅ Empty state handling
- ✅ Error handling with toast notifications

#### **Display Fields**
- Driver name
- Company name (if available)
- Vehicle type
- Capacity (weight in kg)
- Current location
- Available from date
- Price per km
- Features (GPS, refrigerated, covered)
- Rating
- Status badge
- Verified badge (if user verified)

---

## Data Flow Diagrams

### **Posting Goods Flow**
```
1. User fills Post Goods form (4 steps)
2. Form data validated on frontend
3. Data mapped to backend schema
4. POST /api/goods with JWT token
5. Backend validates token & user type
6. Data saved to MongoDB goods collection
7. Success response returned
8. Toast notification shown
9. Form reset
10. New goods immediately visible in Available Goods page
```

### **Posting Truck Flow**
```
1. User fills Post Truck form
2. Form data validated on frontend
3. Data mapped to backend schema
4. POST /api/trucks with JWT token
5. Backend validates token & user type
6. Data saved to MongoDB trucks collection
7. Success response returned
8. Toast notification shown
9. Form reset
10. New truck immediately visible in Available Trucks page
```

### **Viewing Goods/Trucks Flow**
```
1. User navigates to Available Goods/Trucks page
2. useEffect triggers on component mount
3. GET /api/goods or /api/trucks (no auth required)
4. Backend fetches from MongoDB with populated user data
5. Data returned to frontend
6. Filtering & sorting applied
7. Cards rendered in grid layout
8. User can filter, sort, contact, or get directions
```

---

## API Integration

### **Axios Configuration** (`frontend/src/utils/api.js`)

```javascript
// Base configuration
baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

// Request interceptor
- Automatically attaches JWT token from localStorage
- Sets Authorization: Bearer <token> header

// Response interceptor
- Handles 401 errors (redirects to login)
- Extracts error messages
- Handles network errors
```

### **API Methods**

```javascript
// Goods API
goodsAPI.getAll(filters) // GET /api/goods
goodsAPI.getById(id) // GET /api/goods/:id
goodsAPI.create(data) // POST /api/goods
goodsAPI.update(id, data) // PUT /api/goods/:id
goodsAPI.delete(id) // DELETE /api/goods/:id

// Trucks API
trucksAPI.getAll(filters) // GET /api/trucks
trucksAPI.getById(id) // GET /api/trucks/:id
trucksAPI.create(data) // POST /api/trucks
trucksAPI.update(id, data) // PUT /api/trucks/:id
trucksAPI.delete(id) // DELETE /api/trucks/:id
```

---

## Toast Notifications

### **Implementation** (react-hot-toast)

```javascript
// Success
toast.success('Posted successfully!', {
  duration: 4000,
  position: 'top-center'
});

// Error
toast.error('Failed to post. Please try again.', {
  duration: 4000,
  position: 'top-center'
});

// Loading
const loadingToast = toast.loading('Posting...');
toast.dismiss(loadingToast);
```

### **Notification Triggers**
- ✅ Successful goods posting
- ✅ Successful truck posting
- ✅ Failed goods posting
- ✅ Failed truck posting
- ✅ Failed data fetching
- ✅ Authentication required (from PrivateRoute)
- ✅ Successful login

---

## Security Features

### **Frontend**
- JWT token stored in localStorage
- Token automatically attached to protected requests
- PrivateRoute guards Post pages
- Redirect to login if unauthenticated
- Redirect back after login

### **Backend**
- JWT verification on protected routes
- User type validation in controllers
- Ownership verification for updates/deletes
- Input validation via Mongoose schemas
- Password hashing with bcrypt
- CORS configuration

---

## User Experience

### **For Business Owners (Posting Goods)**
1. Navigate to "Post Goods"
2. If not logged in → redirected to login
3. After login → redirected back to Post Goods
4. Fill 4-step form with goods details
5. Submit → loading indicator shown
6. Success toast → form resets
7. Goods immediately visible in "Available Goods"
8. Truck drivers can see and contact

### **For Truck Drivers (Posting Trucks)**
1. Navigate to "Post Truck"
2. If not logged in → redirected to login
3. After login → redirected back to Post Truck
4. Fill form with truck details
5. Submit → loading indicator shown
6. Success toast → form resets
7. Truck immediately visible in "Available Trucks"
8. Business owners can see and contact

### **For All Users (Viewing Listings)**
1. Navigate to "Available Goods" or "Available Trucks"
2. No login required
3. See all posted goods/trucks
4. Filter by type, location, date
5. Sort by various criteria
6. Click call/email to contact
7. Click directions for Google Maps route

---

## Testing Checklist

### **Backend Tests**
- [ ] POST /api/goods without auth returns 401
- [ ] POST /api/goods with truck_driver returns 403
- [ ] POST /api/goods with businessman succeeds
- [ ] POST /api/trucks without auth returns 401
- [ ] POST /api/trucks with businessman returns 403
- [ ] POST /api/trucks with truck_driver succeeds
- [ ] GET /api/goods returns all goods
- [ ] GET /api/trucks returns all trucks
- [ ] Goods include populated user data
- [ ] Trucks include populated user data

### **Frontend Tests**
- [ ] Post Goods redirects if not logged in
- [ ] Post Truck redirects if not logged in
- [ ] Form submission shows loading state
- [ ] Success toast appears on successful post
- [ ] Error toast appears on failed post
- [ ] Form resets after successful post
- [ ] Available Goods fetches and displays data
- [ ] Available Trucks fetches and displays data
- [ ] Filtering works correctly
- [ ] Sorting works correctly
- [ ] Contact buttons work (call/email)
- [ ] Directions button opens Google Maps

---

## Environment Variables

### **Backend (.env)**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/transpolink
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### **Frontend (.env)**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## File Structure

```
TranspoLink/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── Goods.js ✅
│   │   │   ├── Truck.js ✅
│   │   │   └── User.js ✅
│   │   ├── controllers/
│   │   │   ├── goodsController.js ✅
│   │   │   └── truckController.js ✅
│   │   ├── routes/
│   │   │   ├── goodsRoutes.js ✅
│   │   │   └── truckRoutes.js ✅
│   │   ├── middleware/
│   │   │   └── auth.js ✅
│   │   └── server.js ✅
│   └── config/
│       └── db.js ✅
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── PostGoods.js ✅
│   │   │   ├── PostTruck.js ✅
│   │   │   ├── AvailableGoods.js ✅
│   │   │   └── AvailableTrucks.js ✅
│   │   ├── components/
│   │   │   └── PrivateRoute.js ✅
│   │   ├── utils/
│   │   │   └── api.js ✅
│   │   ├── context/
│   │   │   └── UserContext.js ✅
│   │   └── App.js ✅
│   └── package.json ✅
└── docs/
    ├── AUTHENTICATION_IMPLEMENTATION.md ✅
    ├── AUTH_QUICK_REFERENCE.md ✅
    └── DATA_FLOW_IMPLEMENTATION.md ✅ (this file)
```

---

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check if JWT token exists in localStorage |
| 403 Forbidden | Verify user type matches requirement |
| Data not appearing | Check MongoDB connection and collection names |
| Toast not showing | Ensure `<Toaster />` is in App.js |
| Form not submitting | Check network tab for API errors |
| Empty listings | Post some data first or check API response |

---

## Future Enhancements

1. **Real-time Updates**
   - WebSocket integration for live updates
   - Automatic refresh when new data posted

2. **Advanced Filtering**
   - Price range slider
   - Distance-based filtering
   - Multi-select filters

3. **Image Upload**
   - Add image upload for goods/trucks
   - Cloudinary or S3 integration

4. **Pagination**
   - Implement pagination for large datasets
   - Infinite scroll option

5. **Search Optimization**
   - Full-text search with MongoDB Atlas
   - Autocomplete for locations

6. **Notifications**
   - Email notifications for new matches
   - Push notifications for mobile

7. **Analytics**
   - Dashboard for posted items
   - View count tracking
   - Contact tracking

---

## Performance Optimization

- ✅ Lazy loading of components
- ✅ Debounced search inputs
- ✅ Memoized filtered/sorted data
- ✅ Optimized MongoDB queries with indexes
- ✅ Populated user data in single query
- ✅ Compressed API responses

---

## Maintenance Notes

- MongoDB indexes created on frequently queried fields
- Regular backup of database recommended
- Monitor API response times
- Keep dependencies updated
- Review and rotate JWT secret periodically

---

**Document Version:** 1.0  
**Last Updated:** October 11, 2025  
**Author:** TranspoLink Development Team
