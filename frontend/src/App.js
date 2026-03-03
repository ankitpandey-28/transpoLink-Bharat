import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import AvailableTrucks from './pages/AvailableTrucks';
import AvailableGoods from './pages/AvailableGoods';
import PostGoods from './pages/PostGoods';
import PostTruck from './pages/PostTruck';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDebug from './pages/UserDebug';
import MyListings from './pages/MyListings';
import Bookings from './pages/Bookings';
// LiveTracking removed as per requirement
// import LiveTracking from './pages/LiveTracking';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Toaster />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trucks" element={<AvailableTrucks />} />
              <Route path="/goods" element={<AvailableGoods />} />
              <Route path="/post-goods" element={
                <PrivateRoute>
                  <PostGoods />
                </PrivateRoute>
              } />
              <Route path="/post-truck" element={
                <PrivateRoute>
                  <PostTruck />
                </PrivateRoute>
              } />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/debug" element={<UserDebug />} />
              <Route path="/my-listings" element={
                <PrivateRoute>
                  <MyListings />
                </PrivateRoute>
              } />
              <Route path="/bookings" element={
                <PrivateRoute>
                  <Bookings />
                </PrivateRoute>
              } />
              {/* Live Tracking route removed as per requirement */}
              {/* <Route path="/tracking" element={<LiveTracking />} /> */}
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App; 