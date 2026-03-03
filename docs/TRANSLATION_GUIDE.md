# 🌐 TranspoLink Bharat - Translation System Guide

## Overview
TranspoLink Bharat uses a **centralized translation system** built with React Context API. The language toggle button in the navbar allows users to switch between **English** and **Hindi** instantly across the entire website.

---

## 🎯 How It Works

### 1. **UserContext** (Central Translation Hub)
Location: `src/context/UserContext.js`

The `UserContext` provides:
- **`language`**: Current language (`'en'` or `'hi'`)
- **`toggleLanguage()`**: Function to switch languages
- **`t(key)`**: Translation function that returns the translated text for a given key

### 2. **Language Toggle Button**
Location: `src/components/Navbar.js` (Lines 122-128)

```javascript
<button
  onClick={toggleLanguage}
  className="px-3 py-1 rounded border border-gray-200 text-sm font-medium hover:bg-gray-50"
>
  {language === 'en' ? 'हिंदी' : 'English'}
</button>
```

When clicked, it toggles between English and Hindi and saves the preference to `localStorage`.

---

## 📝 How to Use Translations in Your Components

### Step 1: Import the `useUser` hook
```javascript
import { useUser } from '../context/UserContext';
```

### Step 2: Get the `t` function
```javascript
const MyComponent = () => {
  const { t } = useUser();
  
  return (
    <div>
      <h1>{t('postYourGoods')}</h1>
      <p>{t('postGoodsDescription')}</p>
    </div>
  );
};
```

### Step 3: Use `t(key)` for all text content
Replace hardcoded text with translation keys:

**❌ Before (Hardcoded):**
```javascript
<h1>Post Your Goods</h1>
<p>Fill out the form below</p>
```

**✅ After (Translated):**
```javascript
<h1>{t('postYourGoods')}</h1>
<p>{t('postGoodsDescription')}</p>
```

---

## ➕ How to Add New Translations

### Example: Adding a new "About Us" page

1. **Open** `src/context/UserContext.js`

2. **Add English translations** in the `en` object:
```javascript
en: {
  // ... existing translations ...
  
  // About Page
  aboutUs: 'About Us',
  ourStory: 'Our Story',
  ourMission: 'Our Mission',
  ourVision: 'Our Vision',
  companyDescription: 'TranspoLink Bharat is revolutionizing logistics...',
}
```

3. **Add Hindi translations** in the `hi` object:
```javascript
hi: {
  // ... existing translations ...
  
  // About Page
  aboutUs: 'हमारे बारे में',
  ourStory: 'हमारी कहानी',
  ourMission: 'हमारा मिशन',
  ourVision: 'हमारी दृष्टि',
  companyDescription: 'ट्रांसपोलिंक भारत लॉजिस्टिक्स में क्रांति ला रहा है...',
}
```

4. **Use in your component**:
```javascript
const About = () => {
  const { t } = useUser();
  
  return (
    <div>
      <h1>{t('aboutUs')}</h1>
      <h2>{t('ourStory')}</h2>
      <p>{t('companyDescription')}</p>
    </div>
  );
};
```

---

## 📋 Current Translation Coverage

### ✅ Fully Translated Pages:
- **Navbar** - All navigation links
- **Footer** - All sections and links
- **Available Trucks** - Filters, search, listings
- **Available Goods** - Filters, search, listings
- **Post Goods** - All 4 steps, form fields, tips
- **Contact** - Form, contact info, FAQs
- **Auth Pages** - Login, Signup, validation messages

### 🔄 Partially Translated Pages:
- **Home** - Uses inline translations (needs migration to `t()`)
- **Live Tracking** - Uses inline translations (needs migration to `t()`)

---

## 🎨 Translation Best Practices

### 1. **Use Descriptive Keys**
```javascript
// ❌ Bad
t('text1')
t('msg')

// ✅ Good
t('postYourGoods')
t('contactUsDescription')
```

### 2. **Group Related Translations**
Organize translations by page or feature:
```javascript
// Post Goods Page - Step 1
postYourGoods: 'Post Your Goods',
goodsInformation: 'Goods Information',
requestTitle: 'Request Title',

// Post Goods Page - Step 2
locationTiming: 'Location & Timing',
pickupLocation: 'Pickup Location',
```

### 3. **Keep Placeholders Consistent**
```javascript
requestTitlePlaceholder: 'e.g., Transport 500kg Electronics...',
```

### 4. **Handle Dynamic Content**
For content with variables, use template strings:
```javascript
// In UserContext
showingResults: 'Showing {count} of {total} results',

// In component
const resultText = t('showingResults')
  .replace('{count}', filteredCount)
  .replace('{total}', totalCount);
```

---

## 🔧 Technical Details

### Language Persistence
The selected language is saved to `localStorage` as `transpolink_lang`:
```javascript
localStorage.setItem('transpolink_lang', 'hi');
```

### Fallback Behavior
If a translation key is missing, it returns the key itself:
```javascript
const t = (key) => translations[language]?.[key] || key;
```

### Context Provider
Wrap your app with `UserProvider` in `src/App.js`:
```javascript
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      {/* Your app components */}
    </UserProvider>
  );
}
```

---

## 📊 Translation Statistics

| Category | English Keys | Hindi Keys | Status |
|----------|-------------|------------|--------|
| Navigation | 12 | 12 | ✅ Complete |
| Auth Forms | 35 | 35 | ✅ Complete |
| Post Goods | 45 | 45 | ✅ Complete |
| Contact Page | 15 | 15 | ✅ Complete |
| Available Trucks | 25 | 25 | ✅ Complete |
| Available Goods | 25 | 25 | ✅ Complete |
| Common UI | 15 | 15 | ✅ Complete |

**Total Translation Keys: 172**

---

## 🚀 Quick Reference

### Common Translation Keys

```javascript
// Navigation
t('home')           // Home / होम
t('trucks')         // Available Trucks / उपलब्ध ट्रक
t('goods')          // Available Goods / उपलब्ध सामान
t('postGoods')      // Post Goods / सामान पोस्ट करें
t('contact')        // Contact / संपर्क

// Actions
t('search')         // Search / खोजें
t('submit')         // Submit / जमा करें
t('cancel')         // Cancel / रद्द करें
t('save')           // Save / सहेजें
t('next')           // Next / अगला
t('previous')       // Previous / पिछला

// Form Fields
t('emailAddress')   // Email Address / ईमेल पता
t('phoneNumber')    // Phone Number / फोन नंबर
t('password')       // Password / पासवर्ड
t('description')    // Description / विवरण
```

---

## 🐛 Troubleshooting

### Issue: Text not changing when switching language
**Solution**: Make sure you're using `t(key)` instead of hardcoded strings.

### Issue: Translation key showing instead of text
**Solution**: Check if the key exists in both `en` and `hi` objects in `UserContext.js`.

### Issue: Language not persisting after refresh
**Solution**: Verify `localStorage` is working and `UserContext` loads saved language on mount.

---

## 📞 Need Help?

If you need to add translations for a new page or feature:
1. Identify all text content that needs translation
2. Create descriptive keys in `UserContext.js`
3. Add translations in both `en` and `hi` objects
4. Use `t(key)` in your component
5. Test by toggling the language button

---

**Last Updated**: October 10, 2025  
**Maintained By**: TranspoLink Bharat Team
