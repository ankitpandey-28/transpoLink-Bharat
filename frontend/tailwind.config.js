/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Professional Color Palette for TranspoLink Bharat
        primary: {
          green: '#0F5132',      // Deep green - reliability & logistics
          'green-light': '#198754', // Lighter green for hover
          'green-dark': '#0A3622',  // Darker green for active states
          orange: '#FF7F50',     // Legacy orange (kept for compatibility)
        },
        accent: {
          amber: '#FFD166',      // Soft amber/golden - highlights & buttons
          'amber-light': '#FFE499', // Lighter amber for hover
          'amber-dark': '#FFBF33',  // Darker amber for active
        },
        neutral: {
          bg: '#F9FAFB',         // Light grayish background
          'bg-dark': '#F3F4F6',  // Slightly darker background
          text: '#1E293B',       // Dark slate gray text
          'text-light': '#64748B', // Lighter text for secondary content
          border: '#E2E8F0',     // Subtle borders
        },
        secondary: {
          light: '#f8f9fa',
          dark: '#343a40',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'], // For headings
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'scale-in': 'scaleIn 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
} 