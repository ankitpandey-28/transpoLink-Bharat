import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  Truck,
  MapPin,
  Calendar,
  Package,
  Star,
  Filter,
  Search,
  Phone,
  Mail,
  Shield,
  DollarSign,
} from "lucide-react";
import { useUser } from '../context/UserContext';
import { trucksAPI } from '../utils/api';
import toast from 'react-hot-toast';
import BookingModal from '../components/BookingModal';

const AvailableTrucks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState("price-low");
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, user, userType, isAuthenticated } = useUser();
  const [bookingItem, setBookingItem] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Get search parameters from URL (from homepage search)
  const fromLocation = searchParams.get("from") || "";
  const toLocation = searchParams.get("to") || "";
  const searchDate = searchParams.get("date") || "";
  const searchCargoType = searchParams.get("cargoType") || "";

  // Fetch trucks from API
  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    try {
      setLoading(true);
      const response = await trucksAPI.getAll();
      if (response.success) {
        setTrucks(response.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch trucks:', error);
      toast.error('Failed to load trucks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const truckTypes = [
    { id: "all", name: t('allTypes') },
    { id: "box", name: t('boxTruck') },
    { id: "flatbed", name: t('flatbed') },
    { id: "refrigerated", name: t('refrigerated') },
    { id: "tanker", name: t('tanker') },
    { id: "container", name: t('container') },
  ];
  const locations = [
    { id: "all", name: t('allLocations') },
    { id: "mumbai", name: t('mumbai') },
    { id: "delhi", name: t('delhi') },
    { id: "chennai", name: t('chennai') },
    { id: "bangalore", name: t('bangalore') },
    { id: "hyderabad", name: t('hyderabad') },
  ];
  const sortOptions = [
    {
      id: "price-low",
      name: t('priceLowToHigh'),
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      id: "price-high",
      name: t('priceHighToLow'),
      icon: <DollarSign className="w-4 h-4" />,
    },
    {
      id: "date-earliest",
      name: t('dateEarliestFirst'),
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: "date-latest",
      name: t('dateLatestFirst'),
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: "rating",
      name: t('highestRating'),
      icon: <Star className="w-4 h-4" />,
    },
  ];

  // Filter trucks based on search parameters and filters
  const filteredTrucks = trucks.filter((truck) => {
    const driverName = (truck.driverContact?.name || truck.postedBy?.name || '').toLowerCase();
    const companyName = (truck.postedBy?.companyName || '').toLowerCase();
    const vehicleType = (truck.vehicleType || '').toLowerCase();
    const vehicleModel = (truck.vehicleModel || '').toLowerCase();
    const vehicleNumber = (truck.vehicleNumber || '').toLowerCase();
    const currentCity = (truck.currentLocation?.city || '').toLowerCase();
    const currentState = (truck.currentLocation?.state || '').toLowerCase();
    const destinationCity = (truck.destinationLocation?.city || '').toLowerCase();
    const destinationState = (truck.destinationLocation?.state || '').toLowerCase();
    
    // Debug logging
    if (fromLocation || toLocation) {
      console.log('Filtering truck:', {
        vehicleNumber: truck.vehicleNumber,
        currentCity,
        currentState,
        destinationCity,
        destinationState,
        searchFrom: fromLocation?.toLowerCase(),
        searchTo: toLocation?.toLowerCase()
      });
    }
    
    const searchTermLower = searchTerm.toLowerCase();
    
    const matchesSearch =
      searchTerm === "" ||
      driverName.includes(searchTermLower) ||
      companyName.includes(searchTermLower) ||
      vehicleType.includes(searchTermLower) ||
      vehicleModel.includes(searchTermLower) ||
      vehicleNumber.includes(searchTermLower) ||
      currentCity.includes(searchTermLower) ||
      currentState.includes(searchTermLower) ||
      destinationCity.includes(searchTermLower) ||
      destinationState.includes(searchTermLower);

    const matchesType =
      selectedType === "all" || vehicleType === selectedType.toLowerCase();
    const matchesLocation =
      selectedLocation === "all" ||
      currentCity.includes(selectedLocation.toLowerCase()) ||
      currentState.includes(selectedLocation.toLowerCase());

    // Match "from" location with truck's current location
    const matchesFrom =
      !fromLocation ||
      currentCity.includes(fromLocation.toLowerCase()) ||
      currentState.includes(fromLocation.toLowerCase());
    
    // Match "to" location with truck's destination
    const matchesTo =
      !toLocation ||
      destinationCity.includes(toLocation.toLowerCase()) ||
      destinationState.includes(toLocation.toLowerCase());
    
    const matchesDate = !searchDate || 
      new Date(truck.availableFrom).toISOString().split('T')[0] === searchDate;

    // Debug logging for filter results
    if (fromLocation || toLocation) {
      console.log('Filter results:', {
        vehicleNumber: truck.vehicleNumber,
        matchesFrom,
        matchesTo,
        matchesSearch,
        matchesType,
        matchesLocation,
        matchesDate,
        finalResult: matchesSearch && matchesType && matchesLocation && matchesFrom && matchesTo && matchesDate
      });
    }

    return (
      matchesSearch &&
      matchesType &&
      matchesLocation &&
      matchesFrom &&
      matchesTo &&
      matchesDate
    );
  });

  // Sort trucks based on selected sort option
  const sortedTrucks = [...filteredTrucks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.pricePerKm - b.pricePerKm;
      case "price-high":
        return b.pricePerKm - a.pricePerKm;
      case "date-earliest":
        return new Date(a.availableFrom) - new Date(b.availableFrom);
      case "date-latest":
        return new Date(b.availableFrom) - new Date(a.availableFrom);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
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
    if (field === "searchTerm") {
      setSearchTerm(value);
    } else if (field === "selectedType") {
      setSelectedType(value);
      updateSearchParams({ type: value });
    } else if (field === "selectedLocation") {
      setSelectedLocation(value);
      updateSearchParams({ location: value });
    } else if (field === "sortBy") {
      setSortBy(value);
      updateSearchParams({ sort: value });
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedType("all");
    setSelectedLocation("all");
    setSortBy("price-low");
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
              {t('availableTrucks')}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('findTrucksDescription')}
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
              <label className="text-sm font-medium text-gray-700">
                {t('search')}
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder={t('searchDriversCompanies')}
                  value={searchTerm}
                  onChange={(e) =>
                    handleSearchChange("searchTerm", e.target.value)
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                />
              </div>
            </div>
            {/* Truck Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {t('truckType')}
              </label>
              <select
                value={selectedType}
                onChange={(e) =>
                  handleSearchChange("selectedType", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              >
                {truckTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Location Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                {t('location')}
              </label>
              <select
                value={selectedLocation}
                onChange={(e) =>
                  handleSearchChange("selectedLocation", e.target.value)
                }
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
              <label className="text-sm font-medium text-gray-700">
                {t('sortBy')}
              </label>
              <select
                value={sortBy}
                onChange={(e) => handleSearchChange("sortBy", e.target.value)}
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
          {(fromLocation || toLocation || searchDate || searchCargoType) && (
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
                {searchCargoType && (
                  <span className="bg-white px-3 py-1 rounded-full border">
                    {t('cargoType')}: {searchCargoType}
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
              {sortedTrucks.length} {t('trucksAvailable')}
            </h2>
            <div className="text-gray-600">
              {t('showingResults')
                .replace('{count}', sortedTrucks.length)
                .replace('{total}', trucks.length)}
            </div>
          </div>
          {/* Trucks Grid */}
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green mx-auto"></div>
              <p className="mt-4 text-gray-600">{t('loading')}</p>
            </div>
          ) : sortedTrucks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedTrucks.map((truck, index) => (
                <motion.div
                  key={truck._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  {/* Truck Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                    <Truck className="w-20 h-20 text-white opacity-50" />
                    {truck.postedBy?.isVerified && (
                      <div className="absolute top-3 right-3 bg-white text-primary-green px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        {t('verified')}
                      </div>
                    )}
                  </div>
                  {/* Truck Details */}
                  <div className="p-6">
                    {/* Driver and Company */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {truck.driverContact?.name || truck.postedBy?.name || 'Driver'}
                      </h3>
                      <p className="text-gray-600">{truck.postedBy?.companyName || truck.vehicleModel}</p>
                    </div>
                    {/* Location and Availability */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg border-l-4 border-primary-green">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          Route
                        </span>
                        <span className="text-xs text-gray-500">
                          Available: {new Date(truck.availableFrom).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Current Location</div>
                          <div className="flex items-center gap-2 text-gray-900">
                            <MapPin className="w-4 h-4 text-primary-green" />
                            <span className="font-medium">
                              {truck.currentLocation?.city || 'N/A'}
                              {truck.currentLocation?.state && truck.currentLocation?.state !== 'Unknown' ? `, ${truck.currentLocation.state}` : ''}
                            </span>
                          </div>
                        </div>
                        {truck.destinationLocation?.city && (
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Destination</div>
                            <div className="flex items-center gap-2 text-gray-900">
                              <MapPin className="w-4 h-4 text-primary-orange" />
                              <span className="font-medium">
                                {truck.destinationLocation.city}
                                {truck.destinationLocation.state ? `, ${truck.destinationLocation.state}` : ''}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Truck Specifications */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Truck className="w-4 h-4" />
                        <span className="capitalize">{truck.vehicleType?.replace(/-/g, ' ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Package className="w-4 h-4" />
                        <span>
                          {truck.capacity?.weight ? `${truck.capacity.weight} kg` : 'N/A'}
                        </span>
                      </div>
                      {truck.dimensions?.length && (
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <span>📏 {truck.dimensions.length}' × {truck.dimensions.width}' × {truck.dimensions.height}'</span>
                        </div>
                      )}
                    </div>
                    {/* Price */}
                    <div className="mb-4 text-right">
                      <div className="text-2xl font-bold text-primary-green">
                        ₹{Math.round(truck.pricePerKm)}/km
                      </div>
                      <div className="text-xs text-gray-500">Per kilometer</div>
                    </div>
                    {/* Action Buttons */}
                    {isAuthenticated && userType === 'businessman' && truck.postedBy?._id !== user?.id ? (
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            setBookingItem(truck);
                            setShowBookingModal(true);
                          }}
                          className="w-full bg-primary-green text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2 font-semibold"
                        >
                          <Truck className="w-5 h-5" />
                          Book This Truck
                        </button>
                        <div className="flex gap-2">
                          <a
                            href={`tel:${truck.driverContact?.phone || truck.postedBy?.phone}`}
                            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
                          >
                            <Phone className="w-4 h-4" />
                            Call
                          </a>
                          <a
                            href={`mailto:${truck.postedBy?.email}`}
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
                          href={`tel:${truck.driverContact?.phone || truck.postedBy?.phone}`}
                          className="flex-1 bg-primary-green text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <Phone className="w-4 h-4" />
                          {t('call')}
                        </a>
                        <a
                          href={`mailto:${truck.postedBy?.email}`}
                          className="flex-1 bg-primary-orange text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          {t('email')}
                        </a>
                      </div>
                    )}
                    {/* Additional Info */}
                    <div className="mt-3 text-center">
                      <p className="text-xs text-gray-500">
                        Vehicle: {truck.vehicleNumber}
                      </p>
                      {truck.status && (
                        <span className={`inline-block mt-1 px-2 py-1 text-xs rounded ${
                          truck.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {truck.status}
                        </span>
                      )}
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
              <Truck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('noTrucksFound')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('noTrucksFoundDescription')}
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
          bookingType="truck-booking"
          user={user}
        />
      )}
    </div>
  );
};

export default AvailableTrucks;
