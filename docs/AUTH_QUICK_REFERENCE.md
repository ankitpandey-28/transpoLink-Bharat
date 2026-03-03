# Authentication Quick Reference Guide

## Quick Start

### Protecting a New Route (Frontend)

```jsx
// In App.js
import PrivateRoute from './components/PrivateRoute';

<Route path="/your-protected-page" element={
  <PrivateRoute>
    <YourComponent />
  </PrivateRoute>
} />
```

### Protecting a New API Endpoint (Backend)

```javascript
// In your routes file
import { protect } from '../middleware/auth.js';

// Apply to all routes below
router.use(protect);

// Or apply to specific route
router.post('/your-endpoint', protect, yourController);
```

### Checking User Type in Controller

```javascript
export const yourController = async (req, res) => {
  // Check user type
  if (req.user.userType !== 'businessman') {
    return res.status(403).json({
      success: false,
      message: 'Only business owners can access this'
    });
  }
  
  // Your logic here
};
```

## Common Code Snippets

### Show Toast Notification

```javascript
import toast from 'react-hot-toast';

// Success
toast.success('Operation successful!', {
  duration: 3000,
  position: 'top-center',
});

// Error
toast.error('Something went wrong!', {
  duration: 4000,
  position: 'top-center',
});

// Loading
const loadingToast = toast.loading('Processing...');
// Later: toast.dismiss(loadingToast);
```

### Make Authenticated API Call

```javascript
import { goodsAPI } from '../utils/api';

try {
  const response = await goodsAPI.create(data);
  if (response.success) {
    toast.success('Posted successfully!');
  }
} catch (error) {
  toast.error(error);
}
```

### Check Authentication in Component

```javascript
import { useUser } from '../context/UserContext';

const YourComponent = () => {
  const { isAuthenticated, user } = useUser();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <div>Welcome, {user.name}!</div>;
};
```

### Get Current User Info

```javascript
const { user, isAuthenticated } = useUser();

// User object contains:
// - user.name
// - user.email
// - user.userType ('businessman' or 'truck_driver')
// - user.phone
// - user.companyName (if businessman)
// - user.licenseNumber (if truck_driver)
```

## API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* your data */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description"
}
```

## User Types

- `businessman` - Can post goods
- `truck_driver` - Can post trucks

## Token Storage

- **Key:** `token`
- **Location:** `localStorage`
- **Format:** JWT string
- **Header:** `Authorization: Bearer <token>`

## Protected Pages

- `/post-goods` - Requires authentication
- `/post-truck` - Requires authentication

## Protected API Endpoints

### Goods
- `POST /api/goods` - businessman only
- `PUT /api/goods/:id` - owner only
- `DELETE /api/goods/:id` - owner only

### Trucks
- `POST /api/trucks` - truck_driver only
- `PUT /api/trucks/:id` - owner only
- `DELETE /api/trucks/:id` - owner only

## Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| 401 Unauthorized | Check if token exists and is valid |
| 403 Forbidden | Check user type matches requirement |
| Toast not showing | Ensure `<Toaster />` is in App.js |
| Redirect loop | Check authentication logic in PrivateRoute |
| Token not sent | Verify axios interceptor is configured |

## Environment Variables

```env
# Backend
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d

# Frontend
REACT_APP_API_URL=http://localhost:5000/api
```

## Testing Commands

```bash
# Frontend
cd frontend
npm start

# Backend
cd backend
npm run dev

# Test authentication
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## Useful Links

- [JWT Documentation](https://jwt.io/)
- [React Hot Toast Docs](https://react-hot-toast.com/)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)

---

**Last Updated:** October 11, 2025
