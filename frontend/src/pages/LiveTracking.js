import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  MapPin, 
  Truck, 
  Package, 
  Clock, 
  Shield, 
  Phone, 
  MessageCircle,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Share2,
  Download,
  Bell,
  Star
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const LiveTracking = () => {
  const [searchParams] = useSearchParams();
  const { language } = useUser();
  const trackingId = searchParams.get('id') || 'DEMO123';
  
  const [trackingData, setTrackingData] = useState({
    status: 'in_transit',
    currentLocation: 'Ludhiana, Punjab',
    estimatedDelivery: '2024-01-20 14:30',
    driver: 'Ravi Kumar',
    driverPhone: '+91 98765 43210',
    vehicleNumber: 'PB-10-AB-1234',
    vehicleType: 'Box Truck',
    lastUpdate: '2 minutes ago',
    route: [
      { city: 'Mumbai', time: '2024-01-18 08:00', status: 'completed' },
      { city: 'Pune', time: '2024-01-18 16:00', status: 'completed' },
      { city: 'Indore', time: '2024-01-19 10:00', status: 'completed' },
      { city: 'Bhopal', time: '2024-01-19 18:00', status: 'completed' },
      { city: 'Gwalior', time: '2024-01-20 08:00', status: 'in_progress' },
      { city: 'Agra', time: '2024-01-20 12:00', status: 'pending' },
      { city: 'Delhi', time: '2024-01-20 16:00', status: 'pending' }
    ],
    safetyScore: 95,
    alerts: [
      { type: 'info', message: 'Driver taking scheduled break', time: '5 min ago' },
      { type: 'warning', message: 'Heavy traffic on NH48', time: '15 min ago' },
      { type: 'success', message: 'Package scanned at checkpoint', time: '1 hour ago' }
    ]
  });

  const [showDriverDetails, setShowDriverDetails] = useState(false);
  const [isTracking, setIsTracking] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!isTracking) return;
    
    const interval = setInterval(() => {
      setTrackingData(prev => ({
        ...prev,
        lastUpdate: 'Just now',
        safetyScore: Math.max(85, Math.min(100, prev.safetyScore + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [isTracking]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in_progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'info': return <Clock className="w-4 h-4 text-blue-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSafetyColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {language === 'hi' ? 'लाइव ट्रैकिंग' : 'Live Tracking'}
              </h1>
              <p className="text-gray-600 mt-2">
                {language === 'hi' ? 'ट्रैकिंग ID:' : 'Tracking ID:'} <span className="font-mono font-semibold">{trackingId}</span>
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsTracking(!isTracking)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isTracking 
                    ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isTracking ? (
                  <>
                    <Eye className="w-4 h-4 inline mr-2" />
                    {language === 'hi' ? 'ट्रैकिंग चालू' : 'Tracking ON'}
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4 inline mr-2" />
                    {language === 'hi' ? 'ट्रैकिंग बंद' : 'Tracking OFF'}
                  </>
                )}
              </button>
              <button className="px-4 py-2 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors">
                <Share2 className="w-4 h-4 inline mr-2" />
                {language === 'hi' ? 'शेयर करें' : 'Share'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tracking Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Status Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {language === 'hi' ? 'वर्तमान स्थिति' : 'Current Status'}
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">
                    {language === 'hi' ? 'लाइव अपडेट' : 'Live Updates'}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary-green" />
                    <div>
                      <p className="text-sm text-gray-600">
                        {language === 'hi' ? 'वर्तमान स्थान' : 'Current Location'}
                      </p>
                      <p className="font-medium">{trackingData.currentLocation}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary-orange" />
                    <div>
                      <p className="text-sm text-gray-600">
                        {language === 'hi' ? 'अनुमानित डिलीवरी' : 'Estimated Delivery'}
                      </p>
                      <p className="font-medium">{trackingData.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-sm text-gray-600">
                        {language === 'hi' ? 'वाहन संख्या' : 'Vehicle Number'}
                      </p>
                      <p className="font-medium">{trackingData.vehicleNumber}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm text-gray-600">
                        {language === 'hi' ? 'अंतिम अपडेट' : 'Last Update'}
                      </p>
                      <p className="font-medium">{trackingData.lastUpdate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Route Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {language === 'hi' ? 'मार्ग प्रगति' : 'Route Progress'}
              </h2>
              
              <div className="space-y-4">
                {trackingData.route.map((stop, index) => (
                  <div key={index} className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        stop.status === 'completed' ? 'bg-green-100' :
                        stop.status === 'in_progress' ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        {stop.status === 'completed' ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : stop.status === 'in_progress' ? (
                          <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{stop.city}</p>
                          <p className="text-sm text-gray-600">{stop.time}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(stop.status)}`}>
                          {stop.status === 'completed' ? (language === 'hi' ? 'पूर्ण' : 'Completed') :
                           stop.status === 'in_progress' ? (language === 'hi' ? 'चल रहा' : 'In Progress') :
                           language === 'hi' ? 'बाकी' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    
                    {index < trackingData.route.length - 1 && (
                      <div className="ml-4 w-px h-8 bg-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Safety Monitoring */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {language === 'hi' ? 'सुरक्षा निगरानी' : 'Safety Monitoring'}
                </h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSafetyColor(trackingData.safetyScore)}`}>
                  {language === 'hi' ? 'सुरक्षा स्कोर:' : 'Safety Score:'} {trackingData.safetyScore}%
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {language === 'hi' ? 'ड्राइवर सत्यापित' : 'Driver Verified'}
                  </p>
                  <p className="font-semibold text-green-700">✓</p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Truck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {language === 'hi' ? 'वाहन बीमित' : 'Vehicle Insured'}
                  </p>
                  <p className="font-semibold text-blue-700">✓</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Package className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    {language === 'hi' ? 'पैकेज सुरक्षित' : 'Package Secure'}
                  </p>
                  <p className="font-semibold text-purple-700">✓</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Driver Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {language === 'hi' ? 'ड्राइवर जानकारी' : 'Driver Information'}
                </h3>
                <button
                  onClick={() => setShowDriverDetails(!showDriverDetails)}
                  className="text-primary-green hover:text-green-700"
                >
                  {showDriverDetails ? 'Hide' : 'Show'}
                </button>
              </div>
              
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl font-semibold">
                    {trackingData.driver.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900">{trackingData.driver}</h4>
                <div className="flex items-center justify-center space-x-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">(4.8)</span>
                </div>
              </div>
              
              {showDriverDetails && (
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{trackingData.driverPhone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{trackingData.vehicleType}</span>
                  </div>
                  <button className="w-full bg-primary-green text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    <MessageCircle className="w-4 h-4 inline mr-2" />
                    {language === 'hi' ? 'संदेश भेजें' : 'Send Message'}
                  </button>
                </div>
              )}
            </motion.div>

            {/* Live Alerts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'hi' ? 'लाइव अलर्ट' : 'Live Alerts'}
              </h3>
              
              <div className="space-y-3">
                {trackingData.alerts.map((alert, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                <Bell className="w-4 h-4 inline mr-2" />
                {language === 'hi' ? 'सभी अलर्ट देखें' : 'View All Alerts'}
              </button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {language === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}
              </h3>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  {language === 'hi' ? 'दिशा-निर्देश प्राप्त करें' : 'Get Directions'}
                </button>
                
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4 inline mr-2" />
                  {language === 'hi' ? 'ट्रैकिंग रिपोर्ट' : 'Download Report'}
                </button>
                
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                  <Phone className="w-4 h-4 inline mr-2" />
                  {language === 'hi' ? '24/7 सहायता' : '24/7 Support'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;
