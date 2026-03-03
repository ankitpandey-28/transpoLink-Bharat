import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Package, 
  Trash2, 
  MapPin,
  Calendar,
  Phone
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { trucksAPI, goodsAPI } from '../utils/api';
import toast from 'react-hot-toast';

const MyListings = () => {
  const { user, userType } = useUser();
  const [myTrucks, setMyTrucks] = useState([]);
  const [myGoods, setMyGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(userType === 'truck_driver' ? 'trucks' : 'goods');

  const fetchMyListings = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch all trucks and goods, then filter by user
      const [trucksResponse, goodsResponse] = await Promise.all([
        trucksAPI.getAll(),
        goodsAPI.getAll()
      ]);

      // Filter to show only current user's listings
      const userTrucks = (trucksResponse.data || []).filter(
        truck => truck.postedBy?._id === user?.id || truck.postedBy?.email === user?.email
      );
      
      const userGoods = (goodsResponse.data || []).filter(
        goods => goods.postedBy?._id === user?.id || goods.postedBy?.email === user?.email
      );

      setMyTrucks(userTrucks);
      setMyGoods(userGoods);
    } catch (error) {
      console.error('Failed to fetch listings:', error);
      toast.error('Failed to load your listings');
    } finally {
      setLoading(false);
    }
  }, [user?.id, user?.email]);

  useEffect(() => {
    fetchMyListings();
  }, [fetchMyListings]);

  const handleDeleteTruck = async (truckId) => {
    if (!window.confirm('Are you sure you want to delete this truck listing?')) {
      return;
    }

    try {
      await trucksAPI.delete(truckId);
      toast.success('Truck listing deleted successfully!');
      setMyTrucks(myTrucks.filter(truck => truck._id !== truckId));
    } catch (error) {
      console.error('Failed to delete truck:', error);
      toast.error('Failed to delete truck listing');
    }
  };

  const handleDeleteGoods = async (goodsId) => {
    if (!window.confirm('Are you sure you want to delete this goods listing?')) {
      return;
    }

    try {
      await goodsAPI.delete(goodsId);
      toast.success('Goods listing deleted successfully!');
      setMyGoods(myGoods.filter(goods => goods._id !== goodsId));
    } catch (error) {
      console.error('Failed to delete goods:', error);
      toast.error('Failed to delete goods listing');
    }
  };

  const renderTruckCard = (truck) => (
    <motion.div
      key={truck._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Truck className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">
              {truck.vehicleModel || 'Truck'}
            </h3>
            <p className="text-sm text-gray-500">{truck.vehicleNumber}</p>
          </div>
        </div>
        <button
          onClick={() => handleDeleteTruck(truck._id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete listing"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-gray-600">
          <Package className="w-4 h-4" />
          <span className="text-sm capitalize">{truck.vehicleType?.replace(/-/g, ' ')}</span>
          <span className="text-sm">• {truck.capacity?.weight} kg</span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">
            {truck.currentLocation?.city || 'N/A'}
            {truck.currentLocation?.state && truck.currentLocation?.state !== 'Unknown' ? `, ${truck.currentLocation.state}` : ''}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            Available from: {new Date(truck.availableFrom).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span className="text-sm">{truck.driverContact?.phone}</span>
        </div>

        <div className="pt-3 border-t flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            truck.status === 'available' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {truck.status || 'available'}
          </span>
          <span className="text-lg font-bold text-primary-green">
            ₹{truck.pricePerKm}/km
          </span>
        </div>
      </div>
    </motion.div>
  );

  const renderGoodsCard = (goods) => (
    <motion.div
      key={goods._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900 capitalize">
              {goods.cargoType?.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <p className="text-sm text-gray-500">{goods.weight} kg</p>
          </div>
        </div>
        <button
          onClick={() => handleDeleteGoods(goods._id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Delete listing"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-3">
        {goods.description && (
          <p className="text-sm text-gray-600">{goods.description}</p>
        )}

        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">
            {goods.pickupLocation?.city} → {goods.deliveryLocation?.city}
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            Pickup: {new Date(goods.pickupDate).toLocaleDateString()}
          </span>
        </div>

        {goods.deliveryDate && (
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              Delivery: {new Date(goods.deliveryDate).toLocaleDateString()}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="w-4 h-4" />
          <span className="text-sm">{goods.contactPerson?.phone}</span>
        </div>

        {(goods.requiresRefrigeration || goods.fragile || goods.requiresInsurance) && (
          <div className="flex flex-wrap gap-1">
            {goods.requiresRefrigeration && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                ❄️ Refrigerated
              </span>
            )}
            {goods.fragile && (
              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                ⚠️ Fragile
              </span>
            )}
            {goods.requiresInsurance && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                🛡️ Insured
              </span>
            )}
          </div>
        )}

        <div className="pt-3 border-t flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            goods.status === 'posted' 
              ? 'bg-green-100 text-green-800' 
              : goods.status === 'assigned'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-gray-100 text-gray-800'
          }`}>
            {goods.status || 'posted'}
          </span>
          {goods.estimatedPrice && (
            <span className="text-lg font-bold text-primary-green">
              ₹{goods.estimatedPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Listings</h1>
          <p className="text-gray-600">Manage your posted trucks and goods</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setActiveTab('trucks')}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === 'trucks'
                ? 'text-primary-green border-b-2 border-primary-green'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              <span>My Trucks ({myTrucks.length})</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('goods')}
            className={`pb-3 px-4 font-medium transition-colors ${
              activeTab === 'goods'
                ? 'text-primary-green border-b-2 border-primary-green'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              <span>My Goods ({myGoods.length})</span>
            </div>
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your listings...</p>
          </div>
        ) : (
          <>
            {/* Trucks Tab */}
            {activeTab === 'trucks' && (
              <div>
                {myTrucks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myTrucks.map(renderTruckCard)}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-lg">
                    <Truck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No trucks posted yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start by posting your first truck listing
                    </p>
                    <a
                      href="/post-truck"
                      className="inline-block px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Post a Truck
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Goods Tab */}
            {activeTab === 'goods' && (
              <div>
                {myGoods.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myGoods.map(renderGoodsCard)}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-lg">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No goods posted yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start by posting your first goods listing
                    </p>
                    <a
                      href="/post-goods"
                      className="inline-block px-6 py-3 bg-primary-green text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Post Goods
                    </a>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyListings;
