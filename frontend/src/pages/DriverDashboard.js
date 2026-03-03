import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Package, 
  DollarSign, 
  Calendar, 
  Star,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Phone,
  Mail,
  Navigation,
  FileText,
  Settings,
  User,
  Shield
} from 'lucide-react';


const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: "Total Earnings",
      value: "₹9,80,450",
      change: "+12%",
      trend: "up",
      icon: <DollarSign className="w-6 h-6" />
    },
    {
      title: "Active Shipments",
      value: "3",
      change: "+1",
      trend: "up",
      icon: <Truck className="w-6 h-6" />
    },
    {
      title: "Completed This Month",
      value: "15",
      change: "+4",
      trend: "up",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      title: "Average Rating",
      value: "4.7",
      change: "+0.1",
      trend: "up",
      icon: <Star className="w-6 h-6" />
    }
  ];

  const activeShipments = [
    {
      id: 1,
      customer: "Reliance Retail",
      pickup: "Mumbai, MH",
      delivery: "Delhi, DL",
      status: "In Transit",
      progress: 65,
      estimatedDelivery: "2025-08-28",
      earnings: "₹1,20,000",
      contact: "+91 98765 12345",
      email: "logistics@reliance.com"
    },
    {
      id: 2,
      customer: "ITC Foods",
      pickup: "Kolkata, WB",
      delivery: "Patna, BR",
      status: "Loading",
      progress: 20,
      estimatedDelivery: "2025-08-30",
      earnings: "₹85,000",
      contact: "+91 99333 45678",
      email: "dispatch@itcfoods.in"
    },
    {
      id: 3,
      customer: "Tata Chemicals",
      pickup: "Ahmedabad, GJ",
      delivery: "Pune, MH",
      status: "Scheduled",
      progress: 0,
      estimatedDelivery: "2025-09-02",
      earnings: "₹1,50,000",
      contact: "+91 90220 78901",
      email: "supply@tatachemicals.com"
    }
  ];

  const recentEarnings = [
    {
      date: "2025-08-22",
      customer: "Adani Agro",
      amount: "₹75,000",
      status: "Completed"
    },
    {
      date: "2025-08-18",
      customer: "Flipkart Logistics",
      amount: "₹98,500",
      status: "Completed"
    },
    {
      date: "2025-08-15",
      customer: "Hindustan Unilever",
      amount: "₹1,20,000",
      status: "Completed"
    },
    {
      date: "2025-08-10",
      customer: "Big Bazaar",
      amount: "₹65,000",
      status: "Completed"
    }
  ];

  const upcomingDeliveries = [
    {
      id: 1,
      customer: "Amazon India",
      pickup: "Bengaluru, KA",
      delivery: "Hyderabad, TS",
      date: "2025-08-27",
      time: "15:30",
      status: "In Transit"
    },
    {
      id: 2,
      customer: "Spice Trade Co.",
      pickup: "Kochi, KL",
      delivery: "Chennai, TN",
      date: "2025-08-29",
      time: "09:45",
      status: "Loading"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Transit': return 'text-blue-600 bg-blue-100';
      case 'Loading': return 'text-yellow-600 bg-yellow-100';
      case 'Scheduled': return 'text-gray-600 bg-gray-100';
      case 'Completed': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* -------- Header -------- */}
      <section className="gradient-bg text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Driver Dashboard
              </h1>
              <p className="text-gray-200">
                Welcome back, Rajesh Kumar! Here's your transport overview.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="btn-outline border-white text-white hover:bg-white hover:text-primary-green">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
              <div className="w-10 h-10 bg-primary-orange rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* -------- Stats Overview -------- */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="card"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <div className={`flex items-center text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      {stat.change} from last month
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary-green rounded-lg flex items-center justify-center">
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* -------- Main Content -------- */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tabs */}
          <div className="flex space-x-1 bg-white rounded-lg p-1 mb-8">
            {[
              { id: 'overview', label: 'Overview', icon: <Truck className="w-4 h-4" /> },
              { id: 'shipments', label: 'Active Shipments', icon: <Package className="w-4 h-4" /> },
              { id: 'earnings', label: 'Earnings', icon: <DollarSign className="w-4 h-4" /> },
              { id: 'schedule', label: 'Schedule', icon: <Calendar className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary-green text-white'
                    : 'text-gray-600 hover:text-primary-green'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Active Shipments */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="card"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Active Shipments
                  </h2>
                  <span className="text-sm text-gray-500">
                    {activeShipments.length} shipments
                  </span>
                </div>

                <div className="space-y-6">
                  {activeShipments.map((shipment) => (
                    <div key={shipment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{shipment.customer}</h3>
                          <p className="text-sm text-gray-600">
                            {shipment.pickup} → {shipment.delivery}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                            {shipment.status}
                          </span>
                          <p className="text-lg font-bold text-primary-green mt-1">
                            {shipment.earnings}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{shipment.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getProgressColor(shipment.progress)}`}
                            style={{ width: `${shipment.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Est. Delivery:</span>
                          <p className="font-medium">{shipment.estimatedDelivery}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Contact:</span>
                          <p className="font-medium">{shipment.contact}</p>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <button className="flex-1 btn-primary text-sm py-2">
                          <Phone className="w-4 h-4 mr-2 inline" />
                          Call
                        </button>
                        <button className="flex-1 btn-outline text-sm py-2">
                          <Mail className="w-4 h-4 mr-2 inline" />
                          Email
                        </button>
                        <button className="flex-1 btn-outline text-sm py-2">
                          <Navigation className="w-4 h-4 mr-2 inline" />
                          Navigate
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full btn-primary text-sm py-3">
                    <FileText className="w-4 h-4 mr-2 inline" />
                    Update Status
                  </button>
                  <button className="w-full btn-outline text-sm py-3">
                    <Navigation className="w-4 h-4 mr-2 inline" />
                    Start Navigation
                  </button>
                  <button className="w-full btn-outline text-sm py-3">
                    <Shield className="w-4 h-4 mr-2 inline" />
                    Report Issue
                  </button>
                </div>
              </motion.div>

              {/* Recent Earnings */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Recent Earnings
                </h3>
                <div className="space-y-3">
                  {recentEarnings.map((earning, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{earning.customer}</p>
                        <p className="text-sm text-gray-600">{earning.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary-green">{earning.amount}</p>
                        <span className="text-xs text-green-600">{earning.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Deliveries */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Upcoming Deliveries
                </h3>
                <div className="space-y-3">
                  {upcomingDeliveries.map((delivery) => (
                    <div key={delivery.id} className="p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{delivery.customer}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                          {delivery.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        {delivery.pickup} → {delivery.delivery}
                      </p>
                      <p className="text-sm text-gray-600">
                        {delivery.date} at {delivery.time}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DriverDashboard;
