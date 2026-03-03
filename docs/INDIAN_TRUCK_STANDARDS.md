# Indian Truck Standards - Post Truck Form Updates

## Changes Made - October 11, 2025

### Overview
Updated the Post Truck form to use Indian truck standards and measurements instead of foreign standards.

---

## 1. Truck Types - Updated to Indian Standards

### **Before (Foreign Standards):**
- Open Truck
- Closed Truck
- Container Truck
- Refrigerated Truck
- Flatbed Truck
- Tanker Truck

### **After (Indian Standards):**

| Truck Type | Description | Typical Capacity |
|------------|-------------|------------------|
| **Tata Ace / Chota Hathi** | Small pickup truck | 750 kg - 1 ton |
| **Pickup / Chhota Truck** | Small commercial truck | 1-2 ton |
| **Mini Truck** | Light commercial vehicle | 2-3 ton |
| **Truck / LCV** | Light Commercial Vehicle | 3-7 ton |
| **Container / Closed Body** | Enclosed cargo truck | 7-10 ton |
| **Trailer / Heavy Vehicle** | Heavy duty truck | 10-20 ton |
| **Multi-Axle / ODC** | Over-Dimensional Cargo | 20+ ton |
| **Tanker** | Liquid transport | Varies |
| **Refrigerated / Cold Storage** | Temperature controlled | Varies |
| **Tempo / Auto Rickshaw** | Very small loads | Small loads |

---

## 2. Capacity Measurement - Changed to Kilograms

### **Before:**
- Label: "Capacity (in tons)"
- Input: User enters tons (e.g., 5)
- Backend: Converted to kg (5 * 1000 = 5000 kg)

### **After:**
- Label: "Capacity (in kg) *"
- Input: User enters kilograms directly (e.g., 5000)
- Placeholder: "e.g., 5000 (for 5 ton truck)"
- Helper text: "Enter capacity in kilograms (1 ton = 1000 kg)"
- Min value: 100 kg
- Step: 100 kg
- Backend: No conversion needed, value used as-is

### **Benefits:**
- More precise capacity specification
- No confusion with decimal tons
- Direct input in standard Indian measurement
- Easier for drivers to specify exact capacity

---

## 3. Available Until Field - Removed

### **Before:**
- Two date fields:
  - Available From (required)
  - Available Until (optional)

### **After:**
- Single date field:
  - Available From (required)
  - Helper text: "Select the date from which your truck is available"

### **Reason for Removal:**
- Most truck drivers don't have a fixed end date
- Trucks are typically available until booked
- Simplifies the form
- Reduces confusion
- Backend still supports `availableTo` if needed in future

---

## 4. Truck Type Mapping to Backend

The frontend truck types are mapped to backend enum values:

```javascript
Frontend Value → Backend Enum
'tata-ace' → 'mini-truck'
'pickup' → 'pickup'
'mini-truck' → 'mini-truck'
'truck' → 'truck'
'container' → 'container'
'trailer' → 'trailer'
'multi-axle' → 'trailer'
'tanker' → 'trailer'
'refrigerated' → 'container'
'tempo' → 'tempo'
```

---

## 5. Form Validation Updates

### **Capacity Field:**
```javascript
- Type: number
- Required: Yes
- Min: 100 kg
- Step: 100 kg
- Placeholder: "e.g., 5000 (for 5 ton truck)"
```

### **Removed Fields:**
- `availableTo` (Available Until date)

---

## 6. Common Indian Truck Capacities

For driver reference:

| Truck Type | Typical Capacity (kg) | Typical Capacity (tons) |
|------------|----------------------|------------------------|
| Tata Ace | 750 - 1,000 | 0.75 - 1 |
| Pickup | 1,000 - 2,000 | 1 - 2 |
| Mini Truck | 2,000 - 3,000 | 2 - 3 |
| LCV | 3,000 - 7,000 | 3 - 7 |
| Container | 7,000 - 10,000 | 7 - 10 |
| Trailer | 10,000 - 20,000 | 10 - 20 |
| Multi-Axle | 20,000+ | 20+ |

---

## 7. Example Form Submissions

### **Example 1: Tata Ace**
```
Truck Title: Tata Ace 2020 Model
Truck Type: Tata Ace / Chota Hathi (750 kg - 1 ton)
Capacity: 1000 (kg)
From Location: Mumbai, Maharashtra
Available From: 2025-10-15
Price per KM: ₹15
```

### **Example 2: Container Truck**
```
Truck Title: Eicher 10 Ton Container
Truck Type: Container / Closed Body (7-10 ton)
Capacity: 10000 (kg)
From Location: Delhi, Delhi
Available From: 2025-10-20
Price per KM: ₹30
```

### **Example 3: Heavy Trailer**
```
Truck Title: Ashok Leyland 16 Wheeler
Truck Type: Trailer / Heavy Vehicle (10-20 ton)
Capacity: 18000 (kg)
From Location: Bangalore, Karnataka
Available From: 2025-10-25
Price per KM: ₹45
```

---

## 8. Backend Schema Compatibility

The backend Truck model supports:

```javascript
vehicleType: {
  enum: ['mini-truck', 'pickup', 'truck', 'container', 'trailer', 'tempo']
}

capacity: {
  weight: Number (in kg)
}

availableFrom: Date (required)
availableTo: Date (optional, not used from frontend now)
```

All frontend truck types are properly mapped to these backend enums.

---

## 9. User Experience Improvements

### **Clearer Labels:**
- "Capacity (in kg) *" instead of "Capacity (in tons)"
- "Available From *" instead of date range

### **Helper Text:**
- Capacity field: "Enter capacity in kilograms (1 ton = 1000 kg)"
- Available From: "Select the date from which your truck is available"

### **Better Placeholders:**
- Capacity: "e.g., 5000 (for 5 ton truck)"

### **Indian Context:**
- Truck types familiar to Indian drivers
- Capacity ranges shown in dropdown
- Common Indian truck brands mentioned (Tata Ace, etc.)

---

## 10. Testing Checklist

- [ ] All 10 truck types appear in dropdown
- [ ] Capacity accepts values from 100 kg upwards
- [ ] Capacity field shows helper text
- [ ] Available Until field is removed
- [ ] Form submits successfully with kg values
- [ ] Backend receives correct vehicleType enum
- [ ] Backend receives capacity in kg (not converted)
- [ ] Truck appears in Available Trucks page
- [ ] Truck type displays correctly in listings

---

## 11. Migration Notes

### **For Existing Data:**
- Old trucks posted with tons will still work
- Backend stores capacity in kg regardless
- Display logic should handle both formats

### **For Future:**
- All new trucks will use kg directly
- No conversion needed
- More accurate capacity specification

---

## 12. Files Modified

```
frontend/src/pages/PostTruck.js
- Updated truck types array (10 Indian types)
- Changed capacity label and placeholder
- Removed availableTo field
- Updated capacity validation (min: 100, step: 100)
- Removed ton-to-kg conversion
- Updated truck type mapping
```

---

## 13. Quick Reference for Drivers

### **How to Fill Capacity:**

**For Tata Ace (1 ton):**
- Enter: 1000 kg

**For Mini Truck (2.5 ton):**
- Enter: 2500 kg

**For Container (8 ton):**
- Enter: 8000 kg

**For Trailer (15 ton):**
- Enter: 15000 kg

**Formula:**
```
Capacity in kg = Tons × 1000
```

---

## 14. Support Information

If drivers have questions about:
- Which truck type to select
- How to calculate capacity in kg
- What to enter for mixed-use trucks

Refer them to this document or provide examples from Section 7.

---

**Document Version:** 1.0  
**Last Updated:** October 11, 2025  
**Changes By:** TranspoLink Development Team
