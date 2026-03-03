# 🚛 TranspoLink Bharat - Frontend

Modern React frontend for TranspoLink Bharat, an Indian logistics and transportation platform.

---

## 🚀 Tech Stack

- **Framework**: React 18
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Build Tool**: Vite

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   └── ...
│   ├── pages/              # Page components
│   │   ├── Home.js
│   │   ├── AvailableTrucks.js
│   │   ├── AvailableGoods.js
│   │   ├── PostGoods.js
│   │   ├── PostTruck.js
│   │   ├── Contact.js
│   │   └── Auth.js
│   ├── context/            # React Context
│   │   └── UserContext.js
│   ├── utils/              # Utility functions
│   │   └── api.js          # API calls
│   ├── assets/             # Images, fonts, etc.
│   ├── App.js              # Main app component
│   └── main.jsx            # Entry point
├── public/                 # Static files
├── .env                    # Environment variables
├── .env.example            # Environment template
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 🛠️ Installation & Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Setup Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=TranspoLink Bharat
VITE_APP_VERSION=1.0.0
VITE_NODE_ENV=development
```

### 3. Run Development Server

```bash
npm run dev
```

Frontend will start on `http://localhost:5173`

### 4. Build for Production

```bash
npm run build
```

Production files will be in `dist/` folder.

---

## 🌐 Features

### ✅ Bilingual Support (English/Hindi)
- Global language toggle in navbar
- All content translates instantly
- Stored in UserContext

### ✅ Modern UI/UX
- Clean, professional design
- Smooth animations with Framer Motion
- Responsive layout (mobile, tablet, desktop)
- Gradient effects and hover animations

### ✅ Pages

1. **Home** - Hero section with search, features, cargo categories
2. **Available Trucks** - Browse trucks with filters
3. **Available Goods** - Browse posted goods with filters
4. **Post Goods** - Form for clients to post cargo
5. **Post Truck** - Form for drivers to post vehicles
6. **Contact** - Contact information and form
7. **Auth** - Login/Register with tabs

### ✅ Authentication
- JWT token-based authentication
- Protected routes
- User type: Driver or Client
- Profile management

---

## 🔌 API Integration

### Using the API Utility

The `src/utils/api.js` file provides centralized API functions:

```javascript
import { authAPI, goodsAPI, trucksAPI } from './utils/api';

// Login
const loginUser = async () => {
  try {
    const data = await authAPI.login({
      email: 'user@example.com',
      password: 'password123'
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// Get all goods
const fetchGoods = async () => {
  try {
    const data = await goodsAPI.getAll({ from: 'Mumbai', to: 'Delhi' });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

// Create new truck
const postTruck = async () => {
  try {
    const data = await trucksAPI.create({
      vehicleType: 'truck',
      vehicleNumber: 'MH01AB1234',
      capacity: { weight: 5000 },
      currentLocation: { city: 'Mumbai', state: 'Maharashtra' },
      pricePerKm: 15
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
```

### API Functions Available

**Authentication:**
- `authAPI.register(userData)`
- `authAPI.login(credentials)`
- `authAPI.getMe()`
- `authAPI.logout()`

**Users:**
- `usersAPI.getAll()`
- `usersAPI.getById(id)`
- `usersAPI.update(id, userData)`
- `usersAPI.delete(id)`

**Goods:**
- `goodsAPI.getAll(filters)`
- `goodsAPI.getById(id)`
- `goodsAPI.create(goodsData)`
- `goodsAPI.update(id, goodsData)`
- `goodsAPI.delete(id)`
- `goodsAPI.assignDriver(id, driverId)`

**Trucks:**
- `trucksAPI.getAll(filters)`
- `trucksAPI.getById(id)`
- `trucksAPI.create(truckData)`
- `trucksAPI.update(id, truckData)`
- `trucksAPI.delete(id)`
- `trucksAPI.updateAvailability(id, data)`

---

## 🎨 Styling & Theming

### Color Palette

```javascript
// Primary Colors
primary-green: #0F5132      // Deep green - reliability
primary-green-light: #198754 // Lighter green
primary-green-dark: #0A3622  // Darker green

// Accent Colors
accent-amber: #FFD166        // Soft amber/golden
accent-amber-light: #FFE499  // Lighter amber
accent-amber-dark: #FFBF33   // Darker amber

// Neutral Colors
neutral-bg: #F9FAFB          // Light background
neutral-text: #1E293B        // Dark text
neutral-text-light: #64748B  // Secondary text
neutral-border: #E2E8F0      // Borders
```

### Typography

- **Display Font**: Poppins (headings)
- **Body Font**: Inter (content)

### Custom Classes

```css
.btn-primary        // Green gradient button
.btn-secondary      // Amber gradient button
.btn-outline        // Outlined button
.card               // Card with shadow
.input-field        // Styled input
.gradient-bg        // Green gradient background
.gradient-text      // Gradient text
```

---

## 🌍 Language System

### Using Translations

```javascript
import { useUser } from './context/UserContext';

function MyComponent() {
  const { t, language, setLanguage } = useUser();

  return (
    <div>
      <h1>{t('home')}</h1>
      <p>{t('cargoType')}</p>
      
      {/* Toggle language */}
      <button onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}>
        {language === 'en' ? 'हिंदी' : 'English'}
      </button>
    </div>
  );
}
```

### Adding New Translations

Edit `src/context/UserContext.js`:

```javascript
const translations = {
  en: {
    myNewKey: 'My New Text',
    // ... more keys
  },
  hi: {
    myNewKey: 'मेरा नया पाठ',
    // ... more keys
  }
};
```

---

## 📱 Responsive Design

### Breakpoints

```javascript
sm: '640px'   // Mobile landscape
md: '768px'   // Tablet
lg: '1024px'  // Desktop
xl: '1280px'  // Large desktop
2xl: '1536px' // Extra large
```

### Usage

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* 1 column on mobile, 2 on tablet, 3 on desktop */}
</div>
```

---

## 🔐 Authentication Flow

### 1. User Registration/Login

```javascript
import { authAPI } from './utils/api';

// Register
const register = async (userData) => {
  const response = await authAPI.register(userData);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data));
};

// Login
const login = async (credentials) => {
  const response = await authAPI.login(credentials);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data));
};
```

### 2. Protected Routes

```javascript
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/auth" />;
  }
  
  return children;
}
```

### 3. Logout

```javascript
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  navigate('/');
};
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] All pages load correctly
- [ ] Language toggle works on all pages
- [ ] Forms validate input
- [ ] API calls succeed
- [ ] Authentication works
- [ ] Protected routes redirect to login
- [ ] Responsive design works on mobile
- [ ] Animations are smooth

---

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Environment Variables for Production

Update `.env` for production:

```env
VITE_API_URL=https://your-backend-api.com/api
VITE_NODE_ENV=production
```

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2",
  "framer-motion": "^10.16.16",
  "lucide-react": "^0.294.0",
  "tailwindcss": "^3.3.6"
}
```

---

## 🐛 Common Issues

### API Connection Error
```
Error: Network error. Please check your connection.
```
**Solution**: Make sure backend is running on `http://localhost:5000`

### Environment Variables Not Working
**Solution**: Restart dev server after changing `.env`

### Tailwind Styles Not Applying
**Solution**: Make sure `tailwind.config.js` content paths are correct

---

## 📝 Development Tips

### Hot Module Replacement (HMR)
Vite provides instant HMR. Changes appear immediately without page reload.

### Code Organization
- Keep components small and focused
- Use custom hooks for reusable logic
- Centralize API calls in `utils/api.js`
- Use Context for global state

### Performance
- Use React.memo for expensive components
- Lazy load routes with React.lazy()
- Optimize images
- Use production build for deployment

---

## 📄 License

MIT License

---

## 👥 Contributors

TranspoLink Bharat Team

---

## 📞 Support

- Email: transpolinkbharat@gmail.com
- Phone: +91 99310 82500
