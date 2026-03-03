# 🚀 TranspoLink Translation System - Quick Start

## ⚡ 30-Second Overview

Your website now supports **English ↔ Hindi** switching with a single button click in the navbar.

---

## 🎯 For Users

### How to Switch Language:
1. Look at the **top-right corner** of the navbar
2. Click the **language button**:
   - Shows **"हिंदी"** when in English mode
   - Shows **"English"** when in Hindi mode
3. **All text changes instantly** - no page reload!
4. Your preference is **saved automatically**

---

## 👨‍💻 For Developers

### Using Translations in Your Component

```javascript
// 1. Import the hook
import { useUser } from '../context/UserContext';

// 2. Get the translation function
const MyComponent = () => {
  const { t } = useUser();
  
  // 3. Use t(key) for all text
  return (
    <div>
      <h1>{t('postYourGoods')}</h1>
      <p>{t('description')}</p>
      <button>{t('submit')}</button>
    </div>
  );
};
```

### Adding New Translations

**File**: `src/context/UserContext.js`

```javascript
// Add to English section
en: {
  myNewText: 'Hello World',
}

// Add to Hindi section
hi: {
  myNewText: 'नमस्ते दुनिया',
}
```

---

## 📋 Common Translation Keys

```javascript
// Navigation
t('home')              // Home / होम
t('trucks')            // Available Trucks / उपलब्ध ट्रक
t('goods')             // Available Goods / उपलब्ध सामान
t('postGoods')         // Post Goods / सामान पोस्ट करें
t('contact')           // Contact / संपर्क

// Actions
t('search')            // Search / खोजें
t('submit')            // Submit / जमा करें
t('next')              // Next / अगला
t('previous')          // Previous / पिछला

// Form Fields
t('emailAddress')      // Email Address / ईमेल पता
t('phoneNumber')       // Phone Number / फोन नंबर
t('description')       // Description / विवरण
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `src/context/UserContext.js` | All translations (204 keys) |
| `src/components/Navbar.js` | Language toggle button |
| `TRANSLATION_GUIDE.md` | Complete documentation |
| `TRANSLATION_EXAMPLE.md` | Real-world examples |
| `TRANSLATION_STATUS.md` | Current status |

---

## ✅ What's Translated

✅ Navbar (all links)  
✅ Footer (all sections)  
✅ Post Goods (4-step form, 65 keys)  
✅ Contact Page (form + FAQs)  
✅ Available Trucks (filters + listings)  
✅ Available Goods (filters + listings)  
✅ Auth Pages (login + signup)  

**Total: 204 translation keys**

---

## 🎨 Features

✅ Instant switching (no reload)  
✅ Persistent preference (localStorage)  
✅ Same design in both languages  
✅ Mobile responsive  
✅ Clean, maintainable code  

---

## 🐛 Troubleshooting

**Q: Text not changing?**  
A: Make sure you're using `t(key)` instead of hardcoded strings.

**Q: Seeing translation key instead of text?**  
A: Check if the key exists in both `en` and `hi` objects.

**Q: Language not persisting?**  
A: Check browser localStorage for `transpolink_lang`.

---

## 📞 Need Help?

Read the full documentation:
- **TRANSLATION_GUIDE.md** - Complete guide
- **TRANSLATION_EXAMPLE.md** - Real examples
- **TRANSLATION_STATUS.md** - Current status

---

**Status**: ✅ Production Ready  
**Last Updated**: October 10, 2025
