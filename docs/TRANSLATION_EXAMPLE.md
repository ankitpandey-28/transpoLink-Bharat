# 📖 Translation System - Complete Example

## Example: Post Goods Page

This example shows how the **Post Goods** page (`src/pages/PostGoods.js`) uses the translation system.

---

## Before & After Comparison

### ❌ BEFORE (Hardcoded Text)
```javascript
const PostGoods = () => {
  return (
    <div>
      <h1>Post Your Goods</h1>
      <p>Fill out the form below to post your goods</p>
      
      <form>
        <label>Request Title *</label>
        <input placeholder="e.g., Transport 500kg Electronics..." />
        
        <label>Description *</label>
        <textarea placeholder="Describe your goods in detail..." />
        
        <button>Next</button>
      </form>
    </div>
  );
};
```

### ✅ AFTER (Fully Translated)
```javascript
import { useUser } from '../context/UserContext';

const PostGoods = () => {
  const { t } = useUser();  // 👈 Get translation function
  
  return (
    <div>
      <h1>{t('postYourGoods')}</h1>
      <p>{t('postGoodsDescription')}</p>
      
      <form>
        <label>{t('requestTitle')} *</label>
        <input placeholder={t('requestTitlePlaceholder')} />
        
        <label>{t('description')} *</label>
        <textarea placeholder={t('descriptionPlaceholder')} />
        
        <button>{t('next')}</button>
      </form>
    </div>
  );
};
```

---

## How It Works

### 1. **Import the hook**
```javascript
import { useUser } from '../context/UserContext';
```

### 2. **Get the translation function**
```javascript
const { t } = useUser();
```

### 3. **Replace all text with t(key)**
Every piece of text becomes a function call:
- `"Post Your Goods"` → `{t('postYourGoods')}`
- `"Next"` → `{t('next')}`
- `"Description"` → `{t('description')}`

---

## Real Example from PostGoods.js

### Step 1: Goods Information Form

```javascript
const renderStep1 = () => (
  <div className="space-y-6">
    {/* Title Field */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t('requestTitle')} *
      </label>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
        placeholder={t('requestTitlePlaceholder')}
        className="input-field"
        required
      />
    </div>

    {/* Description Field */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t('description')} *
      </label>
      <textarea
        value={formData.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
        placeholder={t('descriptionPlaceholder')}
        rows={4}
        className="input-field"
        required
      />
    </div>

    {/* Category Dropdown */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t('category')} *
      </label>
      <select
        value={formData.category}
        onChange={(e) => handleInputChange('category', e.target.value)}
        className="input-field"
        required
      >
        <option value="">{t('selectCategory')}</option>
        <option value="electronics">{t('electronics')}</option>
        <option value="furniture">{t('furniture')}</option>
        <option value="machinery">{t('heavyMachinery')}</option>
      </select>
    </div>

    {/* Weight Field */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {t('weightKg')} *
      </label>
      <input
        type="number"
        value={formData.weight}
        onChange={(e) => handleInputChange('weight', e.target.value)}
        placeholder={t('weightPlaceholder')}
        className="input-field"
        required
      />
    </div>
  </div>
);
```

### What happens when user clicks Hindi button?

**English (Default):**
- Label: "Request Title *"
- Placeholder: "e.g., Transport 500kg Electronics from Delhi to Mumbai"
- Category: "Electronics"
- Weight: "Weight (kg) *"

**Hindi (After Toggle):**
- Label: "अनुरोध शीर्षक *"
- Placeholder: "उदा., दिल्ली से मुंबई तक 500 किलो इलेक्ट्रॉनिक्स का परिवहन"
- Category: "इलेक्ट्रॉनिक्स"
- Weight: "वजन (किलो) *"

---

## Dynamic Arrays with Translations

### Categories Array
```javascript
const categories = [
  t('electronics'),      // Electronics / इलेक्ट्रॉनिक्स
  t('furniture'),        // Furniture / फर्नीचर
  t('heavyMachinery'),   // Heavy Machinery / भारी मशीनरी
  t('foodBeverages'),    // Food & Beverages / खाद्य और पेय पदार्थ
  t('constructionMaterials'), // Construction Materials / निर्माण सामग्री
  t('other')             // Other / अन्य
];
```

### Truck Types Array
```javascript
const truckTypes = [
  t('boxTruck'),         // Box Truck / बॉक्स ट्रक
  t('flatbed'),          // Flatbed / फ्लैटबेड
  t('refrigerated'),     // Refrigerated / रेफ्रिजेरेटेड
  t('tanker'),           // Tanker / टैंकर
  t('container'),        // Container / कंटेनर
  t('anyType')           // Any Type / कोई भी प्रकार
];
```

---

## Step Navigation Buttons

```javascript
{/* Previous Button */}
<button
  type="button"
  onClick={prevStep}
  disabled={currentStep === 1}
  className="btn-secondary"
>
  <ArrowLeft className="w-4 h-4" />
  <span>{t('previous')}</span>
</button>

{/* Next Button */}
{currentStep < 4 ? (
  <button
    type="button"
    onClick={nextStep}
    className="btn-primary"
  >
    <span>{t('next')}</span>
    <ArrowRight className="w-4 h-4" />
  </button>
) : (
  <button
    type="submit"
    className="btn-secondary"
  >
    <span>{t('postRequest')}</span>
    <Upload className="w-4 h-4" />
  </button>
)}
```

---

## Tips Section with Translations

```javascript
<div className="card bg-blue-50 border-blue-200 p-6">
  <div className="flex items-start space-x-3">
    <AlertCircle className="w-5 h-5 text-blue-600" />
    <div>
      <h3 className="text-lg font-semibold text-blue-900 mb-2">
        {t('tipsForBetterResponses')}
      </h3>
      <ul className="text-blue-800 space-y-1 text-sm list-disc list-inside">
        <li>{t('tip1')}</li>
        <li>{t('tip2')}</li>
        <li>{t('tip3')}</li>
        <li>{t('tip4')}</li>
        <li>{t('tip5')}</li>
      </ul>
    </div>
  </div>
</div>
```

**Output in English:**
- Tips for Better Responses
  - Provide accurate weight and dimensions for better quotes
  - Mention any special handling requirements upfront
  - Be flexible with pickup/delivery dates when possible
  - Include high-quality photos of your goods if available
  - Respond promptly to driver inquiries

**Output in Hindi:**
- बेहतर प्रतिक्रियाओं के लिए सुझाव
  - बेहतर उद्धरण के लिए सटीक वजन और आयाम प्रदान करें
  - किसी भी विशेष हैंडलिंग आवश्यकताओं का पहले से उल्लेख करें
  - जब संभव हो तो पिकअप/डिलीवरी तिथियों के साथ लचीले रहें
  - यदि उपलब्ध हो तो अपने माल की उच्च गुणवत्ता वाली तस्वीरें शामिल करें
  - ड्राइवर की पूछताछ का तुरंत जवाब दें

---

## Success Message

```javascript
const handleSubmit = (e) => {
  e.preventDefault();
  // ... submit logic ...
  alert(t('postRequestSuccess'));
};
```

**English:** "Your request has been posted successfully! Drivers will contact you soon."

**Hindi:** "आपका अनुरोध सफलतापूर्वक पोस्ट किया गया है! ड्राइवर जल्द ही आपसे संपर्क करेंगे।"

---

## Complete Translation Keys Used in Post Goods Page

```javascript
// Header
t('postYourGoods')
t('postGoodsDescription')

// Step 1
t('goodsInformation')
t('requestTitle')
t('requestTitlePlaceholder')
t('description')
t('descriptionPlaceholder')
t('category')
t('selectCategory')
t('electronics')
t('furniture')
t('heavyMachinery')
t('foodBeverages')
t('constructionMaterials')
t('automotiveParts')
t('textiles')
t('chemicals')
t('other')
t('weightKg')
t('weightPlaceholder')
t('dimensionsFeet')
t('dimensionsPlaceholder')

// Step 2
t('locationTiming')
t('pickupLocation')
t('pickupLocationPlaceholder')
t('deliveryLocation')
t('deliveryLocationPlaceholder')
t('pickupDate')
t('deliveryDate')
t('urgentDeliveryRequired')

// Step 3
t('requirementsBudget')
t('preferredTruckType')
t('selectTruckType')
t('boxTruck')
t('flatbed')
t('refrigerated')
t('tanker')
t('container')
t('anyType')
t('specialRequirements')
t('specialRequirementsPlaceholder')
t('budgetRange')
t('budgetPlaceholder')
t('paymentTerms')
t('selectPaymentTerms')
t('immediatePayment')
t('net30')
t('net60')
t('uponDelivery')
t('negotiable')

// Step 4
t('contactDetails')
t('contactName')
t('yourFullName')
t('companyName')
t('yourCompanyName')
t('emailAddress')
t('yourEmailExample')
t('phoneNumber')
t('phonePlaceholder')
t('additionalNotes')
t('additionalNotesPlaceholder')

// Navigation
t('previous')
t('next')
t('postRequest')
t('postRequestSuccess')

// Tips
t('tipsForBetterResponses')
t('tip1')
t('tip2')
t('tip3')
t('tip4')
t('tip5')
```

**Total: 65 translation keys** for the Post Goods page alone!

---

## 🎯 Key Takeaways

1. **Every visible text** uses `t(key)`
2. **No hardcoded strings** in JSX
3. **Consistent naming** (descriptive keys)
4. **Works automatically** when user toggles language
5. **No page reload** required
6. **Persists** across sessions via localStorage

---

**This pattern is used across ALL pages in TranspoLink Bharat!**
