import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { 
  Package, 
  MapPin, 
  Calendar, 
  Scale, 
  Filter, 
  Search,
  Phone,
  Mail,
  Shield,
  ArrowUpDown,
  DollarSign,
  Navigation
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { goodsAPI } from '../utils/api';
import toast from 'react-hot-toast';
import BookingModal from '../components/BookingModal';

const AvailableGoods = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCargoType, setSelectedCargoType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [sortBy, setSortBy] = useState('date-earliest');
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, user, userType, isAuthenticated } = useUser();
  const [bookingItem, setBookingItem] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // URL search params (from another page)
  const fromLocation = searchParams.get('from') || '';
  const toLocation = searchParams.get('to') || '';
  const searchDate = searchParams.get('date') || '';

  // Fetch goods from API
  useEffect(() => {
    fetchGoods();
  }, []);

  const fetchGoods = async () => {
    try {
      setLoading(true);
      const response = await goodsAPI.getAll();
      if (response.success) {
        setGoods(response.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch goods:', error);
      toast.error('Failed to load goods. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const cargoTypes = [
    { id: 'all', name: t('allTypes') },
    { id: 'general', name: t('generalCargo') },
    { id: 'heavy', name: t('heavyMachinery') },
    { id: 'furniture', name: t('furniture') },
    { id: 'electronics', name: t('electronics') },
    { id: 'construction', name: t('constructionMaterials') },
    { id: 'agricultural', name: t('agriculturalProducts') },
    { id: 'industrial', name: t('industrialEquipment') },
    { id: 'retail', name: t('retailGoods') }
  ];

  const locations = [
    { id: 'all', name: t('allLocations') },
    { id: 'mumbai', name: t('mumbai') },
    { id: 'delhi', name: t('delhi') },
    { id: 'bangalore', name: t('bangalore') },
    { id: 'chennai', name: t('chennai') },
    { id: 'kolkata', name: t('kolkata') }
  ];

  const sortOptions = [
    { id: 'date-earliest', name: t('dateEarliestFirst'), icon: <Calendar className="w-4 h-4" /> },
    { id: 'date-latest', name: t('dateLatestFirst'), icon: <Calendar className="w-4 h-4" /> },
    { id: 'weight-low', name: t('weightLowToHigh'), icon: <Scale className="w-4 h-4" /> },
    { id: 'weight-high', name: t('weightHighToLow'), icon: <Scale className="w-4 h-4" /> },
    { id: 'price-high', name: t('priceHighToLow'), icon: <DollarSign className="w-4 h-4" /> }
  ];

  // Filtering logic
  const filteredGoods = goods.filter(item => {
    const searchTermLower = searchTerm.toLowerCase();
    const businessName = (item.postedBy?.companyName || item.postedBy?.name || '').toLowerCase();
    const contactName = (item.contactPerson?.name || item.postedBy?.name || '').toLowerCase();
    const cargoType = (item.cargoType || '').toLowerCase();
    const pickupCity = (item.pickupLocation?.city || '').toLowerCase();
    const pickupState = (item.pickupLocation?.state || '').toLowerCase();
    const deliveryCity = (item.deliveryLocation?.city || '').toLowerCase();
    const deliveryState = (item.deliveryLocation?.state || '').toLowerCase();
    
    const matchesSearch = searchTerm === '' ||
      businessName.includes(searchTermLower) ||
      contactName.includes(searchTermLower) ||
      cargoType.includes(searchTermLower) ||
      pickupCity.includes(searchTermLower) ||
      pickupState.includes(searchTermLower) ||
      deliveryCity.includes(searchTermLower) ||
      deliveryState.includes(searchTermLower);
      
    const matchesCargoType = selectedCargoType === 'all' ||
      cargoType === selectedCargoType.toLowerCase();
      
    const matchesLocation = selectedLocation === 'all' ||
      pickupCity.includes(selectedLocation.toLowerCase()) ||
      pickupState.includes(selectedLocation.toLowerCase());
      
    const matchesFrom = !fromLocation || 
      pickupCity.includes(fromLocation.toLowerCase()) ||
      pickupState.includes(fromLocation.toLowerCase());
      
    const matchesTo = !toLocation || 
      deliveryCity.includes(toLocation.toLowerCase()) ||
      deliveryState.includes(toLocation.toLowerCase());
      
    const matchesDate = !searchDate || 
      new Date(item.pickupDate).toISOString().split('T')[0] === searchDate;
    
    return matchesSearch && matchesCargoType && matchesLocation && matchesFrom && matchesTo && matchesDate;
  });

  // Sorting logic
  const sortedGoods = [...filteredGoods].sort((a, b) => {
    switch (sortBy) {
      case 'date-earliest':
        return new Date(a.pickupDate) - new Date(b.pickupDate);
      case 'date-latest':
        return new Date(b.pickupDate) - new Date(a.pickupDate);
      case 'weight-low':
        return a.weight - b.weight;
      case 'weight-high':
        return b.weight - a.weight;
      case 'price-high':
        return (b.estimatedPrice || 0) - (a.estimatedPrice || 0);
      default:
        return 0;
    }
  });

  const updateSearchParams = (newParams) => {
    const current = Object.fromEntries(searchParams.entries());
    const updated = { ...current, ...newParams };
    setSearchParams(updated);
  };

  const handleSearchChange = (field, value) => {
    if (field === 'searchTerm') {
      setSearchTerm(value);
    } else if (field === 'selectedCargoType') {
      setSelectedCargoType(value);
      updateSearchParams({ cargoType: value });
    } else if (field === 'selectedLocation') {
      setSelectedLocation(value);
      updateSearchParams({ location: value });
    } else if (field === 'sortBy') {
      setSortBy(value);
      updateSearchParams({ sort: value });
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCargoType('all');
    setSelectedLocation('all');
    setSortBy('date-earliest');
    setSearchParams({});
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('availableGoods')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('findGoodsDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">

            {/* Search Term */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t('search')}</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t('searchBusinessesContacts')}
                  value={searchTerm}
                  onChange={(e) => handleSearchChange('searchTerm', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                />
              </div>
            </div>

            {/* Cargo Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t('cargoType')}</label>
              <select
                value={selectedCargoType}
                onChange={(e) => handleSearchChange('selectedCargoType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              >
                {cargoTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t('location')}</label>
              <select
                value={selectedLocation}
                onChange={(e) => handleSearchChange('selectedLocation', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t('sortBy')}</label>
              <select
                value={sortBy}
                onChange={(e) => handleSearchChange('sortBy', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters Button */}
            <div>
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
              >
                {t('clearFilters')}
              </button>
            </div>
          </div>

          {/* Show search parameters from homepage if any */}
          {(fromLocation || toLocation || searchDate) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 p-4 bg-primary-green bg-opacity-10 rounded-lg border border-primary-green"
            >
              <div className="flex items-center gap-2 text-primary-green font-medium">
                <Filter className="w-4 h-4" />
                <span>{t('searchResultsFor')}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-sm">
                {fromLocation && (
                  <span className="bg-white px-3 py-1 rounded-full border">
                    {t('from')}: {fromLocation}
                  </span>
                )}
                {toLocation && (
                  <span className="bg-white px-3 py-1 rounded-full border">
                    {t('to')}: {toLocation}
                  </span>
                )}
                {searchDate && (
                  <span className="bg-white px-3 py-1 rounded-full border">
                    {t('date')}: {searchDate}
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Results Count */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              {sortedGoods.length} {t('goodsAvailable')}
            </h2>
            <div className="text-gray-600">
              {t('showingResults')
                .replace('{count}', sortedGoods.length)
                .replace('{total}', goods.length)}
            </div>
          </div>

          {/* Goods Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>
              <p className="mt-4 text-gray-600">{t('loading')}</p>
            </div>
          ) : sortedGoods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedGoods.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* Goods Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-green to-green-700 flex items-center justify-center">
                    <Package className="w-20 h-20 text-white opacity-50" />
                    {item.postedBy?.isVerified && (
                      <div className="absolute top-3 right-3 bg-white text-primary-green px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {t('verified')}
                      </div>
                    )}
                  </div>

                  {/* Goods Details */}
                  <div className="p-6">
                    {/* Contact Person Name */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {item.contactPerson?.name || item.postedBy?.name || 'Contact Person'}
                      </h3>
                      {item.postedBy?.companyName && (
                        <p className="text-gray-600 text-sm">{item.postedBy.companyName}</p>
                      )}
                    </div>

                    {/* Route Information */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-primary-green">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{t('route')}</span>
                        <span className="text-xs text-gray-500">
                          {t('pickup')}: {new Date(item.pickupDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-900 text-sm">
                        <MapPin className="w-4 h-4 text-primary-green flex-shrink-0" />
                        <span className="font-medium">{item.pickupLocation?.city}</span>
                        <ArrowUpDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="font-medium">{item.deliveryLocation?.city}</span>
                      </div>
                    </div>

                    {/* Cargo Specifications */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Package className="w-4 h-4" />
                        <span className="capitalize">{item.cargoType?.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Scale className="w-4 h-4" />
                        <span>{item.weight ? `${item.weight} kg` : 'N/A'}</span>
                      </div>
                      {item.quantity && item.quantity > 1 && (
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <span>📦 Quantity: {item.quantity}</span>
                        </div>
                      )}
                      {(item.requiresRefrigeration || item.fragile || item.requiresInsurance) && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.requiresRefrigeration && (
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">❄️ Refrigerated</span>
                          )}
                          {item.fragile && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">⚠️ Fragile</span>
                          )}
                          {item.requiresInsurance && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">🛡️ Insured</span>
                          )}
                        </div>
                      )}
                      {item.notes && (
                        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded mt-2">
                          <strong>Note:</strong> {item.notes}
                        </div>
                      )}
                    </div>

                    {/* Delivery Date */}
                    {item.deliveryDate && (
                      <div className="mb-3 text-sm text-gray-600 bg-blue-50 p-2 rounded">
                        <strong>Delivery by:</strong> {new Date(item.deliveryDate).toLocaleDateString()}
                      </div>
                    )}

                    {/* Price and Status */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            item.status === 'posted' ? 'bg-green-100 text-green-800' :
                            item.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                            item.status === 'in-transit' ? 'bg-yellow-100 text-yellow-800' :
                            item.status === 'delivered' ? 'bg-gray-100 text-gray-800' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {item.status || 'Posted'}
                          </span>
                        </div>
                      </div>
                      {item.estimatedPrice && (
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary-green">
                            ₹{item.estimatedPrice.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-500">{t('transportFee')}</div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {isAuthenticated && userType === 'truck_driver' && item.postedBy?._id !== user?.id ? (
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            setBookingItem(item);
                            setShowBookingModal(true);
                          }}
                          className="w-full bg-primary-green text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 font-semibold"
                        >
                          <Package className="w-5 h-5" />
                          Book This Goods
                        </button>
                        <div className="flex gap-2">
                          <a 
                            href={`tel:${item.contactPerson?.phone || item.postedBy?.phone}`}
                            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
                          >
                            <Phone className="w-4 h-4" />
                            Call
                          </a>
                          <a 
                            href={`mailto:${item.postedBy?.email}`}
                            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
                          >
                            <Mail className="w-4 h-4" />
                            Email
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <a 
                          href={`tel:${item.contactPerson?.phone || item.postedBy?.phone}`}
                          className="flex-1 bg-primary-green text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <Phone className="w-4 h-4" />
                          {t('call')}
                        </a>
                        <a 
                          href={`mailto:${item.postedBy?.email}`}
                          className="flex-1 bg-primary-orange text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          {t('email')}
                        </a>
                      </div>
                    )}

                    {/* Navigation Button */}
                    <div className="mt-3">
                      <button 
                        onClick={() => {
                          const pickup = `${item.pickupLocation?.city}, ${item.pickupLocation?.state}`;
                          const delivery = `${item.deliveryLocation?.city}, ${item.deliveryLocation?.state}`;
                          const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(pickup)}&destination=${encodeURIComponent(delivery)}&travelmode=driving`;
                          window.open(googleMapsUrl, '_blank');
                        }}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-4 h-4" />
                        {t('getDirections')}
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('noGoodsFound')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('noGoodsFoundDescription')}
              </p>
              <button
                onClick={clearFilters}
                className="bg-primary-green text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                {t('clearAllFilters')}
              </button>
            </motion.div>
          )}

        </div>
      </section>

      {/* Booking Modal */}
      {showBookingModal && bookingItem && (
        <BookingModal
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false);
            setBookingItem(null);
          }}
          item={bookingItem}
          bookingType="goods-booking"
          user={user}
        />
      )}
    </div>
  );
};

export default AvailableGoods;
