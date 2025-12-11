import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LearnMorePage: React.FC = () => {
  const navigate = useNavigate();

  const vibrantGreen = "#5DE03A";
  const darkCardBackground = "#1A1A1A";

  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 17L9 20l-1 1h8l-1-1l-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "Online + Offline Learning Model",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.001 12.001 0 002.92 12c0 3.072 1.578 5.757 3.92 7.322A12.001 12.001 0 0012 21.055c3.123 0 5.918-1.464 7.859-3.734.392-.512.656-1.111.776-1.78l-.352-.395C18.435 15.541 15.618 14 12 14c-3.618 0-6.435 1.541-7.147 3.126l-.352.395a10.978 10.978 0 011.776-1.78c1.94-2.27 4.735-3.734 7.858-3.734s5.918 1.464 7.859 3.734a10.978 10.978 0 011.776 1.78l-.352.395C21.08 17.055 21.12 12 21.055 12c.075-2.613-.505-5.071-1.684-7.26z"
          />
        </svg>
      ),
      title: "Certified and Affiliated Training",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 12v-1m-4-1h8m-4 0a3 3 0 00-3-3H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-5m-4 0h4"
          />
        </svg>
      ),
      title: "Affordable & Transparent Fee Structure",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h-1a1 1 0 01-1-1V3a1 1 0 011-1h1a1 1 0 011 1v16a1 1 0 01-1 1zm-8 0h-1a1 1 0 01-1-1V9a1 1 0 011-1h1a1 1 0 011 1v10a1 1 0 01-1 1zm8 0H9m-4 0h-1a1 1 0 01-1-1V5a1 1 0 011-1h1a1 1 0 011 1v14a1 1 0 01-1 1z"
          />
        </svg>
      ),
      title: "Expert Instructors",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10v6l5 5h10a2 2 0 002-2V5a2 2 0 00-2-2H8L3 10zm8 0l-5 5-5-5M9 7h12M9 13h12m-6 6h6"
          />
        </svg>
      ),
      title: "Pathway to National & International Platforms",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 5h18M5 10h14M8 15h8m-11-2h2m-2-4h2m-2-4h2M12 21a9 9 0 100-18 9 9 0 000 18zm0-16a7 7 0 100 14 7 7 0 000-14z"
          />
        </svg>
      ),
      title: "Expanding Across Karnataka",
    },
  ];

  return (
    <section className="min-h-screen bg-white font-sans text-black flex flex-col items-center py-16 px-4 sm:px-8 lg:px-16 transition-colors duration-500">
      {/* Back Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/")}
        className="self-start mb-6 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition duration-300"
        style={{ backgroundColor: vibrantGreen }}
      >
        ← Back
      </motion.button>

      {/* Heading Section */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-5xl sm:text-6xl font-extrabold mb-4 text-center"
        style={{ color: vibrantGreen }}
      >
        Why Choose Us?
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-xl sm:text-2xl text-gray-800 mb-12 text-center"
      >
        Because We Help You Level Up
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="max-w-4xl text-lg text-gray-700 leading-relaxed mb-16 text-center"
      >
        At KOASTSHO Sports & Esports, we go beyond traditional karate training.
        We combine expert coaching, technology, and accessibility to create a
        complete learning experience for every student.
      </motion.p>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="rounded-lg p-8 flex flex-col items-center text-center shadow-xl transform transition-all duration-300"
            style={{ backgroundColor: darkCardBackground }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              {feature.icon}
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-xl sm:text-2xl font-semibold text-white leading-tight"
            >
              {feature.title}
            </motion.h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default LearnMorePage;
