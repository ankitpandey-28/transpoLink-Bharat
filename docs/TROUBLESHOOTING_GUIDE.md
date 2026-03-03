# TranspoLink Troubleshooting Guide

## Common Issues and Solutions

### Issue: "Only truck drivers can post trucks" Error

**Symptoms:**
- Logged in as a driver
- Trying to post truck details
- Getting error: "Only truck drivers can post trucks" or similar

**Root Causes & Solutions:**

#### 1. **User Type Mismatch**
**Check:** Your user account's `userType` field in MongoDB

**Solution:**
```javascript
// In MongoDB, check your user document:
db.users.findOne({ email: "your-email@example.com" })

// The userType field should be exactly: "truck_driver"
// NOT "driver" or "Driver" or "truck-driver"

// If wrong, update it:
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { userType: "truck_driver" } }
)
```

#### 2. **Missing Required Fields**
**Check:** All required fields are filled in the form

**Required Fields:**
- ✅ Truck Title
- ✅ Truck Type (select from dropdown)
- ✅ Capacity (in tons)
- ✅ **From Location** (format: "City, State" e.g., "Mumbai, Maharashtra")
- ✅ Available From (date)
- ✅ Price per KM
- ✅ Contact Number
- ✅ **Truck Registration Number**
- ✅ Driver Name

**Important:** The "From Location" field must include both city AND state separated by comma:
- ✅ Correct: "Mumbai, Maharashtra"
- ✅ Correct: "Delhi, Delhi"
- ❌ Wrong: "Mumbai" (missing state)
- ❌ Wrong: "Mumbai Maharashtra" (missing comma)

#### 3. **JWT Token Issues**
**Check:** Token is valid and not expired

**Solution:**
```javascript
// In browser console:
localStorage.getItem('token')

// If null or undefined, you're not logged in
// If present, check if it's valid by making an API call

// To re-login:
localStorage.removeItem('token');
localStorage.removeItem('transpolink_user');
// Then login again
```

#### 4. **Backend Validation Error**
**Check:** Browser console and network tab for actual error

**Steps:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try to submit the form
4. Look for error messages
5. Go to Network tab
6. Find the POST request to `/api/trucks`
7. Check the Response tab for detailed error

**Common Validation Errors:**
```javascript
// Error: "Please specify vehicle type"
// Solution: Select a truck type from dropdown

// Error: "Please provide vehicle number"
// Solution: Fill in truck registration number

// Error: "Please provide vehicle model"
// Solution: Fill in truck title/model

// Error: "Please specify weight capacity in kg"
// Solution: Fill in capacity field

// Error: "Truck with this vehicle number already exists"
// Solution: Use a different registration number
```

---

### Issue: Location Format Error

**Problem:** Location not being parsed correctly

**Solution:**
Always use format: `City, State`

**Examples:**
```
✅ Mumbai, Maharashtra
✅ Delhi, Delhi
✅ Bangalore, Karnataka
✅ Chennai, Tamil Nadu
✅ Kolkata, West Bengal
✅ Hyderabad, Telangana
✅ Pune, Maharashtra
✅ Ahmedabad, Gujarat
✅ Jaipur, Rajasthan
✅ Lucknow, Uttar Pradesh
```

---

### Issue: Form Submission Hangs

**Symptoms:**
- Click submit button
- Loading spinner appears
- Never completes

**Solutions:**

1. **Check Backend Server**
```bash
# Make sure backend is running
cd backend
npm run dev

# Should see:
# 🚀 TranspoLink Bharat API Server running on port 5000
```

2. **Check MongoDB Connection**
```bash
# In backend terminal, look for:
# ✅ MongoDB Connected: <connection-string>

# If not connected, check .env file:
MONGODB_URI=mongodb://localhost:27017/transpolink
```

3. **Check Network**
- Open DevTools → Network tab
- Look for failed requests (red)
- Check if request is even being sent

---

### Issue: "Failed to post truck. Please try again."

**Generic error - need more details**

**Debug Steps:**

1. **Enable Debug Logging**
   - Open browser console (F12)
   - Look for: `Sending truck data: {...}`
   - Check if all fields are present

2. **Check Backend Logs**
   - Look at backend terminal
   - Should see the POST request
   - Look for error messages

3. **Common Causes:**
   - Missing required fields
   - Invalid data format
   - Database connection issue
   - Duplicate vehicle number

---

### Issue: Token Expired / 401 Unauthorized

**Symptoms:**
- Was logged in before
- Now getting 401 errors
- Redirected to login

**Solution:**
```javascript
// JWT tokens expire after 30 days by default
// Simply login again

// Or check token expiration:
const token = localStorage.getItem('token');
const payload = JSON.parse(atob(token.split('.')[1]));
console.log('Expires:', new Date(payload.exp * 1000));
```

---

### Issue: Data Not Appearing in Available Trucks

**Symptoms:**
- Successfully posted truck
- Got success message
- But truck not showing in Available Trucks page

**Solutions:**

1. **Refresh the Page**
   - Press F5 or Ctrl+R
   - Data should appear

2. **Check Filters**
   - Clear all filters
   - Check if truck matches current filter criteria

3. **Check Database**
```javascript
// In MongoDB:
db.trucks.find().pretty()

// Should see your truck document
```

4. **Check API Response**
   - Go to Available Trucks page
   - Open DevTools → Network
   - Find GET request to `/api/trucks`
   - Check response data

---

## Quick Diagnostic Commands

### Check User Type
```javascript
// In browser console:
const user = JSON.parse(localStorage.getItem('transpolink_user'));
console.log('User Type:', user.userType);
// Should be: "truck_driver" for posting trucks
// Should be: "businessman" for posting goods
```

### Check Token
```javascript
// In browser console:
const token = localStorage.getItem('token');
console.log('Token exists:', !!token);
console.log('Token:', token);
```

### Check API Endpoint
```javascript
// In browser console:
console.log('API URL:', process.env.REACT_APP_API_URL || 'http://localhost:5000/api');
```

### Test API Connection
```javascript
// In browser console:
fetch('http://localhost:5000/api/health')
  .then(r => r.json())
  .then(d => console.log('API Status:', d))
  .catch(e => console.error('API Error:', e));
```

---

## Error Messages Reference

| Error Message | Cause | Solution |
|---------------|-------|----------|
| "Only truck drivers can post trucks" | User type is not "truck_driver" | Update userType in database |
| "Only business owners can post goods" | User type is not "businessman" | Update userType in database |
| "Not authorized to access this route" | No JWT token or invalid token | Login again |
| "Truck with this vehicle number already exists" | Duplicate registration number | Use different number |
| "Please specify vehicle type" | Missing truck type | Select from dropdown |
| "Please provide vehicle number" | Missing registration | Fill in registration field |
| "Failed to post truck" | Generic error | Check console for details |

---

## Contact Support

If none of these solutions work:

1. **Collect Information:**
   - Browser console errors
   - Network tab screenshot
   - Backend terminal logs
   - User email/ID

2. **Check Documentation:**
   - `AUTHENTICATION_IMPLEMENTATION.md`
   - `DATA_FLOW_IMPLEMENTATION.md`
   - `AUTH_QUICK_REFERENCE.md`

3. **Common Fixes:**
   - Clear browser cache
   - Restart backend server
   - Restart MongoDB
   - Re-login to application

---

**Last Updated:** October 11, 2025
