import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Login from './Login';
import Signup from './Signup';
import { useUser } from '../context/UserContext';

const Auth = () => {
  const [tab, setTab] = useState('login');
  const { language } = useUser();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="auth-container"
        >
          <button
            onClick={() => setTab('login')}
            className={`auth-tab-button ${tab === 'login' ? 'active' : 'inactive'}`}
          >
            {language === 'hi' ? 'साइन इन' : 'Sign In'}
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`auth-tab-button ${tab === 'signup' ? 'active' : 'inactive'}`}
          >
            {language === 'hi' ? 'साइन अप' : 'Sign Up'}
          </button>
        </motion.div>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="auth-content">
          {tab === 'login' ? <Login /> : <Signup />}
        </div>
      </div>
    </div>
  );
};

export default Auth;


