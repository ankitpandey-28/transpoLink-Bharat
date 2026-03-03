import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState('en');

  // Check for existing user data on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('transpolink_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAuthenticated(true);
      
      // Debug log to help identify user type issues
      console.log('🔐 User logged in:', {
        name: userData.name,
        email: userData.email,
        userType: userData.userType,
        isAuthenticated: true
      });
      
      // Alert if user type is not correct
      if (userData.userType !== 'truck_driver' && userData.userType !== 'businessman') {
        console.warn('⚠️ Invalid user type detected:', userData.userType);
        console.warn('Valid types are: "truck_driver" or "businessman"');
      }
    }
    const savedLang = localStorage.getItem('transpolink_lang');
    if (savedLang === 'en' || savedLang === 'hi') {
      setLanguage(savedLang);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('transpolink_user', JSON.stringify(userData));
    
    // Debug log on login
    console.log('✅ Login successful:', {
      name: userData.name,
      email: userData.email,
      userType: userData.userType
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('transpolink_user');
    localStorage.removeItem('token');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('transpolink_user', JSON.stringify(userData));
  };

  const toggleLanguage = () => {
    setLanguage(prev => {
      const next = prev === 'en' ? 'hi' : 'en';
      localStorage.setItem('transpolink_lang', next);
      return next;
    });
  };

  const translations = {
    en: {
      // Navigation
      home: 'Home',
      trucks: 'Available Trucks',
      goods: 'Available Goods',
      postGoods: 'Post Goods',
      postTruck: 'Post Truck',
      contact: 'Contact',
      account: 'Account',
      signOut: 'Sign Out',
      login: 'Login',
      profile: 'Profile',
      driverDashboard: 'Driver Dashboard',
      clientDashboard: 'Client Dashboard',
      authCta: 'Sign In / Sign Up',
      liveTracking: 'Live Tracking',
      
      // Auth Forms
      signIn: 'Sign In',
      signUp: 'Sign Up',
      signInToAccount: 'Sign in to your account',
      joinTranspoLink: 'Join TranspoLink',
      createNewAccount: 'create a new account',
      alreadyHaveAccount: 'Already have an account?',
      signInHere: 'Sign in here',
      
      // Form Labels
      iAmA: 'I am a...',
      businessOwner: 'Business Owner',
      driver: 'Driver',
      needTransport: 'I need to transport goods',
      provideTransport: 'I provide transport services',
      wantProvideTransport: 'I want to provide transport services',
      firstName: 'First Name',
      lastName: 'Last Name',
      companyName: 'Company Name',
      emailAddress: 'Email Address',
      phoneNumber: 'Phone Number',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot your password?',
      
      // Form Placeholders
      enterEmail: 'Enter your email',
      enterPassword: 'Enter your password',
      createPassword: 'Create a password',
      confirmYourPassword: 'Confirm your password',
      first_name: 'First name',
      last_name: 'Last name',
      company_name: 'Company name',
      phone_placeholder: '+91 98765 43210',
      
      // Buttons
      signInButton: 'Sign in',
      createAccount: 'Create Account',
      
      // Validation Messages
      emailRequired: 'Email is required',
      validEmail: 'Please enter a valid email address',
      passwordRequired: 'Password is required',
      passwordLength: 'Password must be at least 6 characters',
      passwordLength8: 'Password must be at least 8 characters',
      passwordStrength: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      confirmPasswordRequired: 'Please confirm your password',
      passwordsDontMatch: 'Passwords do not match',
      userTypeRequired: 'Please select your user type',
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      phoneRequired: 'Phone number is required',
      validPhone: 'Please enter a valid phone number',
      companyRequired: 'Company name is required for business accounts',
      acceptTerms: 'You must accept the terms and conditions',
      
      // Other
      or: 'Or',
      demoAccounts: 'Demo Accounts:',
      passwordStrengthLabel: 'Password strength:',
      veryWeak: 'Very Weak',
      weak: 'Weak',
      fair: 'Fair',
      good: 'Good',
      strong: 'Strong',
      termsPrivacy: 'I agree to the Terms of Service and Privacy Policy',
      marketingConsent: 'I would like to receive updates and marketing communications from TranspoLink',
      accountCreated: 'Account created successfully! Please check your email to verify your account.',
      
      // Navbar specific
      transpoLinkBharat: 'TranspoLink Bharat',
      signInButtonNavbar: 'Sign In',
      signUpButtonNavbar: 'Sign Up',

      // Footer specific
      smartMoves: 'Smart moves for your business — fast, reliable, nationwide transport at your fingertips',
      quickLinks: 'Quick Links',
      services: 'Services',
      expressDelivery: 'Express Delivery',
      bulkTransport: 'Bulk Transport',
      refrigeratedTransport: 'Refrigerated Transport',
      heavyEquipment: 'Heavy Equipment',
      crossCountryShipping: 'Cross-Country Shipping',
      realtimeTracking: 'Real-time Tracking',
      contactUs: 'Contact Us',
      address: 'Hostel A, Thapar University, 147004',
      
      // Available Goods Page
      availableGoods: 'Available Goods',
      findGoodsDescription: 'Find goods that need transportation along your route. Connect with businesses and earn money.',
      searchBusinessesContacts: 'Search businesses, contacts...',
      cargoType: 'Cargo Type',
      allTypes: 'All Types',
      generalCargo: 'General Cargo',
      heavyMachinery: 'Heavy Machinery',
      furniture: 'Furniture',
      electronics: 'Electronics',
      constructionMaterials: 'Construction Materials',
      agriculturalProducts: 'Agricultural Products',
      industrialEquipment: 'Industrial Equipment',
      retailGoods: 'Retail Goods',
      location: 'Location',
      allLocations: 'All Locations',
      mumbai: 'Mumbai',
      delhi: 'Delhi',
      bangalore: 'Bangalore',
      chennai: 'Chennai',
      kolkata: 'Kolkata',
      sortBy: 'Sort By',
      dateEarliestFirst: 'Date: Earliest First',
      dateLatestFirst: 'Date: Latest First',
      weightLowToHigh: 'Weight: Low to High',
      weightHighToLow: 'Weight: High to Low',
      priceHighToLow: 'Price: High to Low',
      clearFilters: 'Clear Filters',
      searchResultsFor: 'Search Results for:',
      from: 'From',
      to: 'To',
      date: 'Date',
      goodsAvailable: 'Goods Available',
      showingResults: 'Showing {count} of {total} results',
      verified: 'Verified',
      route: 'Route',
      pickup: 'Pickup',
      special: 'Special',
      transportFee: 'Transport Fee',
      call: 'Call',
      email: 'Email',
      getDirections: 'Get Directions',
      noGoodsFound: 'No goods found',
      noGoodsFoundDescription: 'Try adjusting your search criteria or check back later for new listings.',
      clearAllFilters: 'Clear All Filters',

      // Available Trucks Page
      availableTrucks: 'Available Trucks',
      findTrucksDescription: 'Find the perfect truck for your cargo. All drivers are verified and insured.',
      truckType: 'Truck Type',
      boxTruck: 'Box Truck',
      flatbed: 'Flatbed',
      refrigerated: 'Refrigerated',
      tanker: 'Tanker',
      container: 'Container',
      hyderabad: 'Hyderabad',
      priceLowToHigh: 'Price: Low to High',
      highestRating: 'Highest Rating',
      searchDriversCompanies: 'Search drivers, companies...',
      trucksAvailable: 'Trucks Available',
      available: 'Available',
      totalPrice: 'Total Price',
      noTrucksFound: 'No trucks found',
      noTrucksFoundDescription: 'Try adjusting your search criteria or check back later for new listings.',

      // Common UI
      search: 'Search',
      weight: 'Weight',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      loading: 'Loading...',
      noData: 'No data available',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',

      // Post Goods Page - Step 1
      postYourGoods: 'Post Your Goods',
      postGoodsDescription: 'Fill out the form below to post your goods and connect with verified drivers.',
      goodsInformation: 'Goods Information',
      requestTitle: 'Request Title',
      requestTitlePlaceholder: 'e.g., Transport 500kg Electronics from Delhi to Mumbai',
      description: 'Description',
      descriptionPlaceholder: 'Describe your goods in detail...',
      category: 'Category',
      selectCategory: 'Select a category',
      foodBeverages: 'Food & Beverages',
      automotiveParts: 'Automotive Parts',
      textiles: 'Textiles',
      chemicals: 'Chemicals',
      other: 'Other',
      weightKg: 'Weight (kg)',
      weightPlaceholder: 'e.g., 500',
      dimensionsFeet: 'Dimensions (L x W x H in feet)',
      dimensionsPlaceholder: 'e.g., 10 x 8 x 6',

      // Post Goods Page - Step 2
      locationTiming: 'Location & Timing',
      pickupLocation: 'Pickup Location',
      pickupLocationPlaceholder: 'Enter pickup city and address',
      deliveryLocation: 'Delivery Location',
      deliveryLocationPlaceholder: 'Enter delivery city and address',
      pickupDate: 'Pickup Date',
      deliveryDate: 'Delivery Date (Optional)',
      urgentDeliveryRequired: 'Urgent delivery required',

      // Post Goods Page - Step 3
      requirementsBudget: 'Requirements & Budget',
      preferredTruckType: 'Preferred Truck Type',
      selectTruckType: 'Select truck type',
      anyType: 'Any Type',
      specialRequirements: 'Special Requirements',
      specialRequirementsPlaceholder: 'e.g., Temperature controlled, fragile handling, etc.',
      budgetRange: 'Budget Range (₹)',
      budgetPlaceholder: 'e.g., 15000-20000',
      selectPaymentTerms: 'Select payment terms',
      immediatePayment: 'Immediate Payment',
      net30: 'Net 30 Days',
      net60: 'Net 60 Days',
      uponDelivery: 'Upon Delivery',
      negotiable: 'Negotiable',

      // Post Goods Page - Step 4
      contactDetails: 'Contact Details',
      contactName: 'Contact Name',
      yourFullName: 'Your full name',
      yourCompanyName: 'Your company name (optional)',
      yourEmailExample: 'your.email@example.com',
      phonePlaceholder: '+91 98765 43210',
      additionalNotes: 'Additional Notes',
      additionalNotesPlaceholder: 'Any other information you want to share...',

      // Post Goods Page - Navigation
      previous: 'Previous',
      next: 'Next',
      postRequest: 'Post Request',
      postRequestSuccess: 'Your request has been posted successfully! Drivers will contact you soon.',

      // Post Goods Page - Tips
      tipsForBetterResponses: 'Tips for Better Responses',
      tip1: 'Provide accurate weight and dimensions for better quotes',
      tip2: 'Mention any special handling requirements upfront',
      tip3: 'Be flexible with pickup/delivery dates when possible',
      tip4: 'Include high-quality photos of your goods if available',
      tip5: 'Respond promptly to driver inquiries',

      // Contact Page
      contactUsDescription: 'Have questions? We\'re here to help. Reach out to us anytime.',
      getInTouch: 'Get in Touch',
      getInTouchDescription: 'We\'re available 24/7 to assist you with any questions or concerns.',
      phone: 'Phone',
      phoneDescription: 'Available 24/7 for urgent inquiries',
      emailResponseTime: 'We respond within 24 hours',
      office: 'Office',
      officeAddress: 'Hostel A, Thapar University, 147004',
      officeVisitHours: 'Visit us Mon-Fri, 9 AM - 6 PM',

      // Contact Page - FAQs
      faq1Question: 'How do I post goods for transport?',
      faq1Answer: 'Register as a Client, then go to "Post Goods" page. Fill in pickup location, delivery location, cargo type (choose from 9 Indian categories), weight, and date. Drivers will be able to see your posting.',
      faq2Question: 'What types of cargo can I transport?',
      faq2Answer: 'We support 9 Indian cargo categories: Household Goods, Construction Material, Agricultural Produce, Industrial Equipment, FMCG/Consumer Goods, Automobile Parts, Textiles & Garments, Electronic Appliances, and Perishable Goods.',
      faq3Question: 'How do I register as a driver or client?',
      faq3Answer: 'Click "Sign In / Sign Up" in the navbar. Choose your user type (Driver or Client), fill in your details. Drivers need license number and vehicle type. Clients need company name. The platform is available in both English and Hindi.',
      faq4Question: 'Can I browse available trucks and goods?',
      faq4Answer: 'Yes! Visit "Available Trucks" to see all posted vehicles with their capacity, location, and pricing. Visit "Available Goods" to browse cargo postings. You can filter by location, cargo type, and other criteria.',

      // Post Truck Page
      postTruckDescription: 'List your available truck and connect with businesses looking for transport services.',
      truckInformation: 'Truck Information',
      truckTitle: 'Truck Title',
      truckTitlePlaceholder: 'e.g., Available 10-Ton Truck from Delhi to Jaipur',
      openTruck: 'Open Truck',
      closedTruck: 'Closed Truck',
      containerTruck: 'Container Truck',
      refrigeratedTruck: 'Refrigerated Truck',
      flatbedTruck: 'Flatbed Truck',
      tankerTruck: 'Tanker Truck',
      capacity: 'Capacity (in tons)',
      capacityPlaceholder: 'e.g., 10',
      routePlaceholder: 'e.g., Delhi to Jaipur via NH-8',
      fromLocation: 'From Location',
      fromLocationPlaceholder: 'Starting city/location',
      toLocation: 'To Location',
      toLocationPlaceholder: 'Destination city/location',
      availableFrom: 'Available From',
      availableTo: 'Available Until (Optional)',
      pricePerKm: 'Price per KM (₹)',
      pricePerKmPlaceholder: 'e.g., 25',
      contactNumber: 'Contact Number',
      contactNumberPlaceholder: '+91 98765 43210',
      alternateContact: 'Alternate Contact (Optional)',
      truckRegistration: 'Truck Registration Number',
      truckRegistrationPlaceholder: 'e.g., DL-1234-AB-5678',
      driverName: 'Driver Name',
      driverNamePlaceholder: 'Your name or driver\'s name',
      additionalDetails: 'Additional Details',
      additionalDetailsPlaceholder: 'Any other information about your truck...',
      submitTruck: 'Post Truck Details',
      postTruckSuccess: 'Your truck has been posted successfully! Businesses will contact you soon.',
      
      // Post Truck - Tips
      tipsForTruckOwners: 'Tips for Truck Owners',
      truckTip1: 'Provide accurate truck capacity and dimensions',
      truckTip2: 'Keep your contact number active and reachable',
      truckTip3: 'Update availability dates regularly',
      truckTip4: 'Mention any special features (GPS, insurance coverage)',
      truckTip5: 'Respond quickly to business inquiries',

      // Indian Cargo Categories - Home Page
      cargoTypeDescription: 'We handle all types of cargo across India',
      householdGoods: 'Household Goods',
      householdGoodsDesc: 'Furniture, appliances, and home items',
      constructionMaterial: 'Construction Material',
      constructionMaterialDesc: 'Cement, bricks, steel, and building supplies',
      agriculturalProduce: 'Agricultural Produce',
      agriculturalProduceDesc: 'Grains, vegetables, fruits, and farm products',
      industrialEquipmentDesc: 'Machinery, tools, and industrial goods',
      fmcgGoods: 'FMCG / Consumer Goods',
      fmcgGoodsDesc: 'Packaged foods, beverages, and daily essentials',
      automobileParts: 'Automobile Parts',
      automobilePartsDesc: 'Vehicle parts, accessories, and components',
      textilesDesc: 'Fabrics, clothing, and textile products',
      electronicsDesc: 'TVs, computers, phones, and electronic goods',
      perishableGoods: 'Perishable Goods',
      perishableGoodsDesc: 'Temperature-sensitive and time-critical items',
    },
    hi: {
      // Navigation
      home: 'मुख्य पृष्ठ',
      trucks: 'उपलब्ध ट्रक',
      goods: 'उपलब्ध माल',
      postGoods: 'माल पोस्ट करें',
      postTruck: 'ट्रक पोस्ट करें',
      contact: 'संपर्क करें',
      account: 'खाता',
      signOut: 'साइन आउट',
      login: 'लॉगिन',
      profile: 'प्रोफ़ाइल',
      driverDashboard: 'ड्राइवर डैशबोर्ड',
      clientDashboard: 'क्लाइंट डैशबोर्ड',
      authCta: 'साइन इन / साइन अप',
      liveTracking: 'लाइव ट्रैकिंग',
      
      // Auth Forms
      signIn: 'साइन इन',
      signUp: 'साइन अप',
      signInToAccount: 'अपने खाते में साइन इन करें',
      joinTranspoLink: 'TranspoLink में शामिल हों',
      createNewAccount: 'नया खाता बनाएं',
      alreadyHaveAccount: 'क्या आपका पहले से खाता है?',
      signInHere: 'यहां साइन इन करें',
      
      // Form Labels
      iAmA: 'मैं हूं...',
      businessOwner: 'व्यवसाय मालिक',
      driver: 'ड्राइवर',
      needTransport: 'मुझे सामान परिवहन की आवश्यकता है',
      provideTransport: 'मैं परिवहन सेवाएं प्रदान करता हूं',
      wantProvideTransport: 'मैं परिवहन सेवाएं प्रदान करना चाहता हूं',
      firstName: 'पहला नाम',
      lastName: 'अंतिम नाम',
      companyName: 'कंपनी का नाम',
      emailAddress: 'ईमेल पता',
      phoneNumber: 'फोन नंबर',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      rememberMe: 'मुझे याद रखें',
      forgotPassword: 'पासवर्ड भूल गए?',
      
      // Form Placeholders
      enterEmail: 'अपना ईमेल दर्ज करें',
      enterPassword: 'अपना पासवर्ड दर्ज करें',
      createPassword: 'पासवर्ड बनाएं',
      confirmYourPassword: 'अपना पासवर्ड पुष्टि करें',
      first_name: 'पहला नाम',
      last_name: 'अंतिम नाम',
      company_name: 'कंपनी का नाम',
      phone_placeholder: '+91 (987) 654-3210',
      
      // Buttons
      signInButton: 'साइन इन करें',
      createAccount: 'खाता बनाएं',
      
      // Validation Messages
      emailRequired: 'ईमेल आवश्यक है',
      validEmail: 'कृपया एक वैध ईमेल पता दर्ज करें',
      passwordRequired: 'पासवर्ड आवश्यक है',
      passwordLength: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
      passwordLength8: 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए',
      passwordStrength: 'पासवर्ड में कम से कम एक बड़ा अक्षर, एक छोटा अक्षर और एक संख्या होनी चाहिए',
      confirmPasswordRequired: 'कृपया अपना पासवर्ड पुष्टि करें',
      passwordsDontMatch: 'पासवर्ड मेल नहीं खाते',
      userTypeRequired: 'कृपया अपना उपयोगकर्ता प्रकार चुनें',
      firstNameRequired: 'पहला नाम आवश्यक है',
      lastNameRequired: 'अंतिम नाम आवश्यक है',
      phoneRequired: 'फोन नंबर आवश्यक है',
      validPhone: 'कृपया एक वैध फोन नंबर दर्ज करें',
      companyRequired: 'व्यवसाय खातों के लिए कंपनी का नाम आवश्यक है',
      acceptTerms: 'आपको नियम और शर्तें स्वीकार करनी होंगी',
      
      // Other
      or: 'या',
      demoAccounts: 'डेमो खाते:',
      passwordStrengthLabel: 'पासवर्ड की ताकत:',
      veryWeak: 'बहुत कमजोर',
      weak: 'कमजोर',
      fair: 'सामान्य',
      good: 'अच्छा',
      strong: 'मजबूत',
      termsPrivacy: 'मैं सेवा की शर्तें और गोपनीयता नीति से सहमत हूं',
      marketingConsent: 'मैं TranspoLink से अपडेट और मार्केटिंग संचार प्राप्त करना चाहता हूं',
      accountCreated: 'खाता सफलतापूर्वक बनाया गया! कृपया अपना खाता सत्यापित करने के लिए अपना ईमेल जांचें।',
      
      // Navbar specific
      transpoLinkBharat: 'ट्रांसपोलिंक भारत',
      signInButtonNavbar: 'साइन इन करें',
      signUpButtonNavbar: 'साइन अप करें',

      // Footer specific
      smartMoves: 'आपके व्यवसाय के लिए स्मार्ट चालें — आपकी उंगलियों पर तेज़, विश्वसनीय, राष्ट्रव्यापी परिवहन',
      quickLinks: 'त्वरित लिंक',
      services: 'सेवाएं',
      expressDelivery: 'एक्सप्रेस डिलीवरी',
      bulkTransport: 'बल्क ट्रांसपोर्ट',
      refrigeratedTransport: 'रेफ्रिजेरेटेड ट्रांसपोर्ट',
      heavyEquipment: 'भारी उपकरण',
      crossCountryShipping: 'क्रॉस-कंट्री शिपिंग',
      realtimeTracking: 'रीयल-टाइम ट्रैकिंग',
      contactUs: 'हमसे संपर्क करें',
      address: 'छात्रावास ए, थापर विश्वविद्यालय, 147004',

      // Available Goods Page
      availableGoods: 'उपलब्ध सामान',
      findGoodsDescription: 'अपनी मार्ग पर परिवहन की आवश्यकता वाले सामान खोजें। व्यवसायों से जुड़ें और पैसे कमाएं।',
      searchBusinessesContacts: 'व्यवसायों, संपर्कों को खोजें...',
      cargoType: 'माल का प्रकार',
      allTypes: 'सभी प्रकार',
      generalCargo: 'सामान्य माल',
      heavyMachinery: 'भारी मशीनरी',
      furniture: 'फर्नीचर',
      electronics: 'इलेक्ट्रॉनिक्स',
      constructionMaterials: 'निर्माण सामग्री',
      agriculturalProducts: 'कृषि उत्पाद',
      industrialEquipment: 'औद्योगिक उपकरण',
      retailGoods: 'खुदरा सामान',
      location: 'स्थान',
      allLocations: 'सभी स्थान',
      mumbai: 'मुंबई',
      delhi: 'दिल्ली',
      bangalore: 'बेंगलुरु',
      chennai: 'चेन्नई',
      kolkata: 'कोलकाता',
      sortBy: 'इसके द्वारा क्रमबद्ध करें',
      dateEarliestFirst: 'दिनांक: सबसे पहले',
      dateLatestFirst: 'दिनांक: सबसे नया पहले',
      weightLowToHigh: 'वजन: कम से ज्यादा',
      weightHighToLow: 'वजन: ज्यादा से कम',
      priceHighToLow: 'मूल्य: ज्यादा से कम',
      clearFilters: 'फ़िल्टर साफ़ करें',
      searchResultsFor: 'इसके लिए खोज परिणाम:',
      from: 'से',
      to: 'तक',
      date: 'तारीख',
      goodsAvailable: 'सामान उपलब्ध',
      showingResults: '{total} में से {count} परिणाम दिखा रहा है',
      verified: 'सत्यापित',
      route: 'मार्ग',
      pickup: 'पिकअप',
      special: 'विशेष',
      transportFee: 'परिवहन शुल्क',
      call: 'कॉल करें',
      email: 'ईमेल करें',
      getDirections: 'दिशा-निर्देश प्राप्त करें',
      noGoodsFound: 'कोई सामान नहीं मिला',
      noGoodsFoundDescription: 'अपनी खोज मानदंड समायोजित करने का प्रयास करें या नई लिस्टिंग के लिए बाद में जांचें।',
      clearAllFilters: 'सभी फ़िल्टर साफ़ करें',

      // Available Trucks Page
      availableTrucks: 'उपलब्ध ट्रक',
      findTrucksDescription: 'अपने माल के लिए सही ट्रक खोजें। सभी ड्राइवर सत्यापित और बीमाकृत हैं।',
      truckType: 'ट्रक का प्रकार',
      boxTruck: 'बॉक्स ट्रक',
      flatbed: 'फ्लैटबेड',
      refrigerated: 'रेफ्रिजेरेटेड',
      tanker: 'टैंकर',
      container: 'कंटेनर',
      hyderabad: 'हैदराबाद',
      priceLowToHigh: 'मूल्य: कम से ज्यादा',
      highestRating: 'उच्चतम रेटिंग',
      searchDriversCompanies: 'ड्राइवरों, कंपनियों को खोजें...',
      trucksAvailable: 'ट्रक उपलब्ध',
      available: 'उपलब्ध',
      totalPrice: 'कुल मूल्य',
      noTrucksFound: 'कोई ट्रक नहीं मिला',
      noTrucksFoundDescription: 'अपनी खोज मानदंड समायोजित करने का प्रयास करें या नई लिस्टिंग के लिए बाद में जांचें।',

      // Common UI
      search: 'खोजें',
      weight: 'वजन',
      submit: 'जमा करें',
      cancel: 'रद्द करें',
      save: 'सहेजें',
      edit: 'संपादित करें',
      delete: 'हटाएं',
      view: 'देखें',
      loading: 'लोड हो रहा है...',
      noData: 'कोई डेटा उपलब्ध नहीं है',
      error: 'त्रुटि',
      success: 'सफलता',
      warning: 'चेतावनी',
      info: 'जानकारी',

      // Post Goods Page - Step 1
      postYourGoods: 'अपना माल पोस्ट करें',
      postGoodsDescription: 'अपना माल पोस्ट करने और सत्यापित ड्राइवरों से जुड़ने के लिए नीचे दिया गया फॉर्म भरें।',
      goodsInformation: 'माल की जानकारी',
      requestTitle: 'अनुरोध शीर्षक',
      requestTitlePlaceholder: 'उदा., दिल्ली से मुंबई तक 500 किलो इलेक्ट्रॉनिक्स का परिवहन',
      description: 'विवरण',
      descriptionPlaceholder: 'अपने माल का विस्तार से वर्णन करें...',
      category: 'श्रेणी',
      selectCategory: 'एक श्रेणी चुनें',
      foodBeverages: 'खाद्य और पेय पदार्थ',
      automotiveParts: 'ऑटोमोटिव पार्ट्स',
      textiles: 'वस्त्र',
      chemicals: 'रसायन',
      other: 'अन्य',
      weightKg: 'वजन (किलो)',
      weightPlaceholder: 'उदा., 500',
      dimensionsFeet: 'आयाम (L x W x H फीट में)',
      dimensionsPlaceholder: 'उदा., 10 x 8 x 6',

      // Post Goods Page - Step 2
      locationTiming: 'स्थान और समय',
      pickupLocation: 'पिकअप स्थान',
      pickupLocationPlaceholder: 'पिकअप शहर और पता दर्ज करें',
      deliveryLocation: 'डिलीवरी स्थान',
      deliveryLocationPlaceholder: 'डिलीवरी शहर और पता दर्ज करें',
      pickupDate: 'पिकअप तारीख',
      deliveryDate: 'डिलीवरी तारीख (वैकल्पिक)',
      urgentDeliveryRequired: 'तत्काल डिलीवरी आवश्यक है',

      // Post Goods Page - Step 3
      requirementsBudget: 'आवश्यकताएं और बजट',
      preferredTruckType: 'पसंदीदा ट्रक प्रकार',
      selectTruckType: 'ट्रक प्रकार चुनें',
      anyType: 'कोई भी प्रकार',
      specialRequirements: 'विशेष आवश्यकताएं',
      specialRequirementsPlaceholder: 'उदा., तापमान नियंत्रित, नाजुक हैंडलिंग, आदि।',
      budgetRange: 'बजट रेंज (₹)',
      budgetPlaceholder: 'उदा., 15000-20000',
      selectPaymentTerms: 'भुगतान शर्तें चुनें',
      immediatePayment: 'तत्काल भुगतान',
      net30: 'नेट 30 दिन',
      net60: 'नेट 60 दिन',
      uponDelivery: 'डिलीवरी पर',
      negotiable: 'परक्राम्य',

      // Post Goods Page - Step 4
      contactDetails: 'संपर्क विवरण',
      contactName: 'संपर्क नाम',
      yourFullName: 'आपका पूरा नाम',
      yourCompanyName: 'आपकी कंपनी का नाम (वैकल्पिक)',
      yourEmailExample: 'your.email@example.com',
      phonePlaceholder: '+91 98765 43210',
      additionalNotes: 'अतिरिक्त नोट्स',
      additionalNotesPlaceholder: 'कोई अन्य जानकारी जो आप साझा करना चाहते हैं...',

      // Post Goods Page - Navigation
      previous: 'पिछला',
      next: 'अगला',
      postRequest: 'अनुरोध पोस्ट करें',
      postRequestSuccess: 'आपका अनुरोध सफलतापूर्वक पोस्ट किया गया है! ड्राइवर जल्द ही आपसे संपर्क करेंगे।',

      // Post Goods Page - Tips
      tipsForBetterResponses: 'बेहतर प्रतिक्रियाओं के लिए सुझाव',
      tip1: 'बेहतर उद्धरण के लिए सटीक वजन और आयाम प्रदान करें',
      tip2: 'किसी भी विशेष हैंडलिंग आवश्यकताओं का पहले से उल्लेख करें',
      tip3: 'जब संभव हो तो पिकअप/डिलीवरी तिथियों के साथ लचीले रहें',
      tip4: 'यदि उपलब्ध हो तो अपने माल की उच्च गुणवत्ता वाली तस्वीरें शामिल करें',
      tip5: 'ड्राइवर की पूछताछ का तुरंत जवाब दें',

      // Contact Page
      contactUsDescription: 'क्या आपके पास प्रश्न हैं? हम मदद के लिए यहां हैं। किसी भी समय हमसे संपर्क करें।',
      getInTouch: 'संपर्क में रहें',
      getInTouchDescription: 'हम किसी भी प्रश्न या चिंता में आपकी सहायता के लिए 24/7 उपलब्ध हैं।',
      phone: 'फोन',
      phoneDescription: 'तत्काल पूछताछ के लिए 24/7 उपलब्ध',
      emailResponseTime: 'हम 24 घंटे के भीतर जवाब देते हैं',
      office: 'कार्यालय',
      officeAddress: 'छात्रावास ए, थापर विश्वविद्यालय, 147004',
      officeVisitHours: 'सोमवार-शुक्रवार, सुबह 9 बजे - शाम 6 बजे हमसे मिलें',

      // Contact Page - FAQs
      faq1Question: 'मैं परिवहन के लिए सामान कैसे पोस्ट करूं?',
      faq1Answer: 'क्लाइंट के रूप में रजिस्टर करें, फिर "सामान पोस्ट करें" पेज पर जाएं। पिकअप स्थान, डिलीवरी स्थान, कार्गो प्रकार (9 भारतीय श्रेणियों में से चुनें), वजन और तारीख भरें। ड्राइवर आपकी पोस्टिंग देख सकेंगे।',
      faq2Question: 'मैं किस प्रकार का कार्गो परिवहन कर सकता हूं?',
      faq2Answer: 'हम 9 भारतीय कार्गो श्रेणियों का समर्थन करते हैं: घर का सामान, निर्माण सामग्री, कृषि उपज, औद्योगिक उपकरण, एफएमसीजी/उपभोक्ता वस्तुएं, वाहन पुर्जे, कपड़े और वस्त्र, इलेक्ट्रॉनिक उपकरण, और नाशवान वस्तुएं।',
      faq3Question: 'मैं ड्राइवर या क्लाइंट के रूप में कैसे रजिस्टर करूं?',
      faq3Answer: 'नेवबार में "साइन इन / साइन अप" पर क्लिक करें। अपना उपयोगकर्ता प्रकार (ड्राइवर या क्लाइंट) चुनें, अपना विवरण भरें। ड्राइवरों को लाइसेंस नंबर और वाहन प्रकार चाहिए। क्लाइंट को कंपनी का नाम चाहिए। प्लेटफॉर्म अंग्रेजी और हिंदी दोनों में उपलब्ध है।',
      faq4Question: 'क्या मैं उपलब्ध ट्रक और सामान ब्राउज़ कर सकता हूं?',
      faq4Answer: 'हां! सभी पोस्ट किए गए वाहनों को उनकी क्षमता, स्थान और मूल्य निर्धारण के साथ देखने के लिए "उपलब्ध ट्रक" पर जाएं। कार्गो पोस्टिंग ब्राउज़ करने के लिए "उपलब्ध सामान" पर जाएं। आप स्थान, कार्गो प्रकार और अन्य मानदंडों के अनुसार फ़िल्टर कर सकते हैं।',

      // Post Truck Page
      postTruckDescription: 'अपने उपलब्ध ट्रक को सूचीबद्ध करें और परिवहन सेवाओं की तलाश कर रहे व्यवसायों से जुड़ें।',
      truckInformation: 'ट्रक की जानकारी',
      truckTitle: 'ट्रक शीर्षक',
      truckTitlePlaceholder: 'उदा., दिल्ली से जयपुर तक 10-टन ट्रक उपलब्ध',
      openTruck: 'ओपन ट्रक',
      closedTruck: 'बंद ट्रक',
      containerTruck: 'कंटेनर ट्रक',
      refrigeratedTruck: 'रेफ्रिजेरेटेड ट्रक',
      flatbedTruck: 'फ्लैटबेड ट्रक',
      tankerTruck: 'टैंकर ट्रक',
      capacity: 'क्षमता (टन में)',
      capacityPlaceholder: 'उदा., 10',
      routePlaceholder: 'उदा., दिल्ली से जयपुर NH-8 के माध्यम से',
      fromLocation: 'प्रारंभिक स्थान',
      fromLocationPlaceholder: 'शुरुआती शहर/स्थान',
      toLocation: 'गंतव्य स्थान',
      toLocationPlaceholder: 'गंतव्य शहर/स्थान',
      availableFrom: 'से उपलब्ध',
      availableTo: 'तक उपलब्ध (वैकल्पिक)',
      pricePerKm: 'प्रति किमी मूल्य (₹)',
      pricePerKmPlaceholder: 'उदा., 25',
      contactNumber: 'संपर्क नंबर',
      contactNumberPlaceholder: '+91 98765 43210',
      alternateContact: 'वैकल्पिक संपर्क (वैकल्पिक)',
      truckRegistration: 'ट्रक पंजीकरण संख्या',
      truckRegistrationPlaceholder: 'उदा., DL-1234-AB-5678',
      driverName: 'ड्राइवर का नाम',
      driverNamePlaceholder: 'आपका नाम या ड्राइवर का नाम',
      additionalDetails: 'अतिरिक्त विवरण',
      additionalDetailsPlaceholder: 'आपके ट्रक के बारे में कोई अन्य जानकारी...',
      submitTruck: 'ट्रक विवरण पोस्ट करें',
      postTruckSuccess: 'आपका ट्रक सफलतापूर्वक पोस्ट किया गया है! व्यवसाय जल्द ही आपसे संपर्क करेंगे।',
      
      // Post Truck - Tips
      tipsForTruckOwners: 'ट्रक मालिकों के लिए सुझाव',
      truckTip1: 'सटीक ट्रक क्षमता और आयाम प्रदान करें',
      truckTip2: 'अपना संपर्क नंबर सक्रिय और पहुंच योग्य रखें',
      truckTip3: 'उपलब्धता तिथियों को नियमित रूप से अपडेट करें',
      truckTip4: 'किसी भी विशेष सुविधा का उल्लेख करें (GPS, बीमा कवरेज)',
      truckTip5: 'व्यवसाय पूछताछ का तुरंत जवाब दें',

      // Indian Cargo Categories - Home Page
      cargoTypeDescription: 'हम पूरे भारत में सभी प्रकार के माल को संभालते हैं',
      householdGoods: 'घर का सामान',
      householdGoodsDesc: 'फर्नीचर, उपकरण और घरेलू सामान',
      constructionMaterial: 'निर्माण सामग्री',
      constructionMaterialDesc: 'सीमेंट, ईंट, स्टील और निर्माण सामग्री',
      agriculturalProduce: 'कृषि उपज',
      agriculturalProduceDesc: 'अनाज, सब्जियां, फल और कृषि उत्पाद',
      industrialEquipmentDesc: 'मशीनरी, उपकरण और औद्योगिक सामान',
      fmcgGoods: 'एफएमसीजी / उपभोक्ता वस्तुएं',
      fmcgGoodsDesc: 'पैकेज्ड खाद्य पदार्थ, पेय और दैनिक आवश्यकताएं',
      automobileParts: 'वाहन के पुर्जे',
      automobilePartsDesc: 'वाहन पार्ट्स, सहायक उपकरण और घटक',
      textilesDesc: 'कपड़े, वस्त्र और टेक्सटाइल उत्पाद',
      electronicsDesc: 'टीवी, कंप्यूटर, फोन और इलेक्ट्रॉनिक सामान',
      perishableGoods: 'नाशवान वस्तुएं',
      perishableGoodsDesc: 'तापमान-संवेदनशील और समय-महत्वपूर्ण वस्तुएं',
    }
  };

  const t = (key) => translations[language]?.[key] || key;

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
    userType: user?.userType || null,
    language,
    toggleLanguage,
    t
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
