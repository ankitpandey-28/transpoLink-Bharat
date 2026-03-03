import React from "react";
import { motion } from "framer-motion";
import { Quote, Mail, Phone } from "lucide-react";

const About = () => {
  const team = [
    {
      name: "Ankit Pandey",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop", // generic nature photo
      bio: "A dreamer at heart who loves turning bold ideas into meaningful realities.",
    },
    {
      name: "Vansh Rattan",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop", // same placeholder
      bio: "Tech explorer who finds joy in learning, experimenting, and innovating.",
    },
    {
      name: "Aryan Sood",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop",
      bio: "Passionate about teamwork, problem-solving, and bringing structure to ideas.",
    },
    {
      name: "Aditya Chauhan",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=300&fit=crop",
      bio: "Believes growth comes from challenges and thrives on creating new opportunities.",
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-100">
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet the <span className="text-primary-orange">Dream Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate minds shaping the future of transport.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative backdrop-blur-md bg-white/70 rounded-2xl shadow-lg 
                           p-6 hover:shadow-2xl hover:-translate-y-3 
                           transition-all duration-500 border border-gray-200 
                           hover:border-transparent hover:bg-gradient-to-br 
                           hover:from-primary-green/10 hover:to-primary-orange/10"
              >
                {/* Decorative quote icon */}
                <div className="absolute -top-4 -left-4 bg-primary-orange text-white p-2 rounded-full shadow-md">
                  <Quote className="w-4 h-4" />
                </div>

                {/* Image */}
                <div className="relative w-28 h-28 mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 rounded-full object-cover ring-4 ring-primary-green/20 
                              transition-all duration-500 hover:ring-primary-orange/50"
                  />
                  {/* Animated ring pulse */}
                  <span className="absolute inset-0 rounded-full border-2 border-primary-orange animate-ping opacity-20"></span>
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {member.name}
                </h3>

                {/* Bio */}
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  {member.bio}
                </p>

                {/* Decorative underline */}
                <div className="mt-4 h-1 w-16 mx-auto bg-gradient-to-r from-primary-green to-primary-orange rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Have questions about our team or services? We'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center space-x-3">
                <Mail className="w-6 h-6 text-primary-green" />
                <a 
                  href="mailto:transpolinkbharat@gmail.com" 
                  className="text-lg font-medium text-primary-green hover:text-primary-orange hover:underline transition-all duration-200 cursor-pointer"
                >
                  transpolinkbharat@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-primary-green" />
                <a 
                  href="tel:+919931082500" 
                  className="text-lg font-medium text-primary-green hover:text-primary-orange hover:underline transition-all duration-200 cursor-pointer"
                >
                  +91 99310 82500
                </a>
              </div>
            </div>
            <div className="mt-8">
              <a
                href="/contact"
                className="bg-primary-green text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-lg inline-block"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
