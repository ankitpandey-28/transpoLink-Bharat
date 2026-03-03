import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';
import emailjs from 'emailjs-com';
import { useUser } from '../context/UserContext';

const Contact = () => {
  const { t } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize EmailJS
  useEffect(() => {
    try {
      // EmailJS API Key
      emailjs.init("2fMfEdV1W1q1ppGO-");
      console.log("EmailJS initialized successfully with API key");
    } catch (error) {
      console.error("EmailJS initialization failed:", error);
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setIsLoading(true);
    setError('');

    // Check if EmailJS is available
    if (!emailjs) {
      setError('EmailJS is not loaded. Please refresh the page and try again.');
      setIsLoading(false);
      return;
    }

    try {
      // EmailJS template parameters
      const templateParams = {
        to_email: 'transpolinkbharat@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email
      };

      console.log("Sending email with template params:", templateParams);
      console.log("EmailJS object:", emailjs);

      // Send email using EmailJS
      const response = await emailjs.send(
        'service_q2z0fp6',
        'template_97xp7qn',
        templateParams
      );

      console.log("EmailJS response:", response);

      if (response.status === 200) {
        console.log("Email sent successfully!");
        setIsSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }
    } catch (err) {
      console.error('Email sending failed:', err);
      console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        response: err.response,
        error: err
      });
      
      // Better error message handling
      let errorMessage = 'Failed to send message. ';
      if (err.message) {
        errorMessage += err.message;
      } else if (err.text) {
        errorMessage += err.text;
      } else if (err.status) {
        errorMessage += `Status: ${err.status}`;
      } else {
        errorMessage += 'Unknown error occurred.';
      }
      
      // Add helpful guidance for template ID errors
      if (err.message && err.message.includes('template')) {
        errorMessage += '\n\nTo fix this: Go to https://dashboard.emailjs.com/admin/templates and create a template, then update the template ID in the code.';
      }
      
      errorMessage += ' Please try again or contact us directly.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('phone'),
      details: [
        <a key="phone1" href="tel:+919931082500" className="text-primary-green hover:underline">+91 99310 82500</a>,
        <a key="phone2" href="tel:+919418141428" className="text-primary-green hover:underline">+91 94181 41428</a>
      ],
      description: t('phoneDescription')
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('email'),
      details: [
        <a 
          key="email" 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=transpolinkbharat@gmail.com&su=Inquiry from TranspoLink Website" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-green hover:underline hover:text-primary-orange transition-colors duration-200 cursor-pointer font-medium"
        >
          transpolinkbharat@gmail.com
        </a>
      ],
      description: t('emailResponseTime')
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('office'),
      details: [
        <a 
          key="office" 
          href="https://www.google.com/maps/search/?api=1&query=Hostel+A+Thapar+University+Patiala+147004" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-green hover:underline hover:text-primary-orange transition-colors duration-200 cursor-pointer font-medium"
        >
          {t('officeAddress')}
        </a>
      ],
      description: t('officeVisitHours')
    }
  ];

  const faqs = [
    {
      question: t('faq1Question'),
      answer: t('faq1Answer')
    },
    {
      question: t('faq2Question'),
      answer: t('faq2Answer')
    },
    {
      question: t('faq3Question'),
      answer: t('faq3Answer')
    },
    {
      question: t('faq4Question'),
      answer: t('faq4Answer')
    }
  ];

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t('contactUs')}
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              {t('contactUsDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('getInTouch')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('getInTouchDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-orange transition-colors duration-300">
                  <div className="text-white">
                    {info.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-3">
                  {info.details.map((detail, idx) => (
                    <div key={idx} className="text-gray-600 font-medium">
                      {detail}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  {info.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Location */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="card">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>



                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn-primary"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Your full name"
                          className="input-field"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="your.email@example.com"
                          className="input-field"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+91 91234 567800"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="subject">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange('subject', e.target.value)}
                          className="input-field"
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="general">General Inquiry</option>
                          <option value="support">Technical Support</option>
                          <option value="billing">Billing Question</option>
                          <option value="partnership">Partnership Opportunity</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="message">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        className="input-field"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-secondary flex items-center justify-center space-x-2"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                    {error && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center space-x-2 text-red-700">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm">{error}</span>
                        </div>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </motion.div>

            {/* Location & Office Info with updated Google Maps Satellite View */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="card">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Our Office Location
                </h3>
                <div className="rounded-lg overflow-hidden h-64 shadow-lg">
                  <iframe
                    title="Hostel A, Thapar University"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3540.117297188479!2d76.364528!3d30.351305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fedb46635cc9f%3A0x32d69678ce5d7825!2sThapar%20University!5e0!3m2!1sen!2sin!4v1704000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Hostel A, Thapar University, 147004
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find quick answers to common questions about our services.
            </p>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
