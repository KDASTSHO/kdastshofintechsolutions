// src/components/AboutUsSection.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaFileInvoiceDollar,
  FaChartLine,
  FaAd,
} from "react-icons/fa";
import useTheme from "../hooks/useTheme";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Confetti from "react-confetti";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { AnimatePresence } from "framer-motion";
// Fix default marker icon issue (Leaflet requires this in React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const AboutUsSection = () => {
  const [darkMode] = useTheme();
  const [showSpinWheel, setShowSpinWheel] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [prize, setPrize] = useState("");
  const [rotation, setRotation] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [showResultPopup, setShowResultPopup] = useState(false);
  const [wheelSize, setWheelSize] = useState(300);

  // Prize list with icons

  const textColor = darkMode ? "text-white" : "text-gray-900";

  // ------------------- Animation Variants -------------------
  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };
  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };
  const float = {
    animate: {
      y: [0, -10, 0, 10, 0],
      transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
  };
  const waveVariants = {
    left: {
      hidden: { opacity: 0, x: -100 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 1, ease: "easeOut" },
      },
    },
    top: {
      hidden: { opacity: 0, y: -100 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: "easeOut" },
      },
    },
    right: {
      hidden: { opacity: 0, x: 100 },
      visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 1, ease: "easeOut" },
      },
    },
  };

  // ------------------- Services Data -------------------
  const services = [
    {
      title: "Software Development",
      description:
        "We offer complete software development services, creating scalable, safe, and quick digital solutions that are suited to your company's requirements. We manage UI/UX, development, testing, and deployment with excellent quality and dependability from concept to launch.",
      icon: (
        <FaLaptopCode
          size={30}
          className={darkMode ? "text-green-400" : "text-green-700"}
        />
      ),
      animation: waveVariants.left,
    },
    {
      title: "Company Registration & Tax Filing",
      description:
        "With our easy company formation help, you can get your business off to a great start. We take care of the whole process, from picking the right business form to completing legal paperwork and getting government approvals.",
      icon: (
        <FaFileInvoiceDollar
          size={30}
          className={darkMode ? "text-green-400" : "text-green-700"}
        />
      ),
      animation: waveVariants.top,
    },
    {
      title: "Investments",
      description:
        "Investment Services offer personalized financial solutions designed to help you build long-term wealth. Services include portfolio management, risk assessment, goal-based planning, mutual funds, stocks, bonds, and digital investment tools.",
      icon: (
        <FaChartLine
          size={30}
          className={darkMode ? "text-green-400" : "text-green-700"}
        />
      ),
      animation: waveVariants.right,
    },
  ];

  // ------------------- Ads Data -------------------
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const handleAdSubmit = async () => {
    if (!formName || !formPhone || !formMessage) {
      alert("Please fill all fields");
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, "ads_info"), {
        name: formName,
        phone: formPhone,
        message: formMessage,
        timestamp: serverTimestamp(),
      });

      alert("Submitted successfully!");
      setFormName("");
      setFormPhone("");
      setFormMessage("");
      setShowForm(false);
    } catch (err) {
      alert("Error submitting data!");
      console.error(err);
    }
    setSubmitting(false);
  };

  const adData = {
    title: "Boost Your Business with Targeted Ads",
    description:
      "Reach thousands of potential customers and increase conversions with our premium advertising service. Simple, fast, and effective.",
  };
  // ------------------- Contact Form State -------------------
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // 🔥 Submit handler - store in Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !message) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await addDoc(collection(db, "contact_details"), {
        firstName,
        lastName,
        email,
        phone,
        message,
        createdAt: serverTimestamp(),
      });

      alert("Message submitted successfully!");

      // Clear input fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Error saving contact details:", error);
      alert("Failed to submit message!");
    }
  };

  // ------------------- Color Classes -------------------
  const sectionBg = darkMode ? "bg-gray-900" : "bg-[#F7F1EC]";
  const headingColor = darkMode ? "text-green-400" : "text-green-800";
  const cardBg = darkMode ? "bg-gray-800" : "bg-[#BFA695]";
  const cardText = darkMode ? "text-gray-100" : "text-stone-800";
  const buttonBg = darkMode ? "bg-green-600" : "bg-stone-800";
  const buttonText = "text-white";
  const formBg = darkMode ? "bg-gray-800" : "bg-[#F7F1EC]";
  const inputBg = darkMode
    ? "bg-gray-700 text-gray-100"
    : "bg-white text-gray-800";

  return (
    <section
      className={`pt-32 md:pt-36 pb-16 transition-colors duration-500 ${sectionBg} min-h-screen`}
    >
      {/* RESULT POPUP AFTER WIN (Rest of your code remains the same) */}
      <AnimatePresence>
        {showResultPopup && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-3xl p-7 text-center shadow-xl max-w-sm w-[85%]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <h2 className={`text-3xl font-bold ${textColor}`}>You Won!!</h2>

              <motion.div
                className="mt-4 text-6xl"
                initial={{ scale: 0 }}
                animate={{ scale: 1.3 }}
                transition={{ duration: 0.6 }}
              >
                {prize.icon}
              </motion.div>

              <p className={`mt-2 text-xl font-bold ${textColor}`}>
                {prize.text}
              </p>

              <button
                className="mt-5 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md"
                onClick={() => setShowResultPopup(false)}
              >
                Close
              </button>
            </motion.div>

            {celebrate && (
              <>
                <Confetti
                  width={window.innerWidth}
                  height={window.innerHeight}
                  numberOfPieces={300}
                  gravity={0.25}
                />
                <Fireworks />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* ------------------- About Us Heading ------------------- */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold transition-colors duration-500 text-[#8D5A3A]">
            About Us
          </h2>

          <div
            className={`w-24 h-1 mx-auto mt-2 rounded-full transition-colors duration-500 ${headingColor}`}
          ></div>
        </motion.div>

        {/* ------------------- About Us Content ------------------- */}
        <div className="grid md:grid-cols-2 gap-12 items-start md:items-center">
          <motion.div
            className="relative"
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.img
              src="/images/team.jpg"
              alt="Team"
              className="w-full md:w-[90%] rounded-lg shadow-xl mb-8 relative z-10"
              variants={float}
              animate="animate"
            />
            <motion.p
              className={`mt-6 md:mt-10 text-base md:text-lg font-sans relative z-10 p-5 rounded-xl shadow-lg backdrop-blur-md border transition-all duration-500 ${
                darkMode
                  ? "bg-gray-900/40 border-gray-700 text-gray-100"
                  : "bg-white/50 border-gray-300 text-gray-800"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            >
              <span className="font-semibold text-[#8D5A3A]">
                KDASTSHO Fintech Solutions Private Limited
              </span>{" "}
              develops impactful products and services for small and medium
              businesses and individuals, empowering their daily lives through
              seamless, technology-driven solutions.
            </motion.p>
          </motion.div>

          <motion.div
            className={`p-6 md:p-8 rounded-lg shadow-xl leading-relaxed text-sm md:text-base transition-colors duration-500 ${
              darkMode
                ? "bg-gray-800 text-gray-100"
                : "bg-stone-200 text-stone-900"
            }`}
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 text-[#8D5A3A]">Vision</h3>

            <p>
              Clear & Concise Vision Statement “Kdastsho’s long-term vision is
              to build products and services that create wealth and prosperity
              for individuals and businesses of all sizes. Through technology,
              we enable faster, more robust, and impactful business outcomes,
              contributing to economic growth at both company and national
              levels.
            </p>
          </motion.div>
        </div>

        {/* ------------------- Services Section ------------------- */}
        <section className="mt-20">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#8D5A3A]">
              Services We Offer
            </h2>

            <div className="w-24 h-1 mx-auto mt-2 rounded-full bg-green-800"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg shadow-lg flex flex-col justify-between ${cardBg} ${cardText}`}
                variants={service.animation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.3 }}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-sm mb-6">{service.description}</p>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
                  }}
                  className={`mt-auto ${buttonBg} ${buttonText} px-4 py-2 rounded transition-all duration-300`}
                >
                  Read More
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ------------------- Ads Section ------------------- */}
        <section className="mt-20">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#8D5A3A]">
              Sponsored Ad
            </h2>
            <div className="w-24 h-1 mx-auto mt-2 rounded-full bg-green-800"></div>
          </motion.div>

          {/* POPUP — will show when user clicks Contact Now */}
          {showForm && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ scale: 0.7 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.7 }}
                transition={{ duration: 0.35 }}
                className={`w-full max-w-md p-6 rounded-2xl shadow-xl ${
                  darkMode
                    ? "bg-[#101010] text-white"
                    : "bg-white text-gray-900"
                }`}
              >
                <h3 className="text-2xl font-bold mb-4 text-center">
                  Contact Now
                </h3>

                <div className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className={`p-3 rounded-lg border ${
                      darkMode
                        ? "bg-black border-gray-600 text-white"
                        : "bg-gray-100 border-gray-300"
                    }`}
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className={`p-3 rounded-lg border ${
                      darkMode
                        ? "bg-black border-gray-600 text-white"
                        : "bg-gray-100 border-gray-300"
                    }`}
                  />

                  <textarea
                    placeholder="Message..."
                    rows="4"
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    className={`p-3 rounded-lg border ${
                      darkMode
                        ? "bg-black border-gray-600 text-white"
                        : "bg-gray-100 border-gray-300"
                    }`}
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    className="flex-1 py-3 rounded-lg font-semibold bg-gradient-to-r from-[#F69B2E] to-[#DB6A2E] text-white hover:scale-105 transition-all"
                    onClick={handleAdSubmit}
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>

                  <button
                    className="flex-1 py-3 rounded-lg font-semibold bg-gray-400 hover:bg-gray-500 transition-all"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* AD CARD */}
          <motion.div
            className={`rounded-2xl overflow-hidden shadow-xl border ${cardBg} ${cardText}`}
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <div className="w-full">
              <img
                src="/images/Ad.png"
                alt="Sponsored Ad"
                className="w-full aspect-[1200/628] object-cover"
              />
            </div>

            <div className="p-6 md:p-8 flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">
                {adData.title}
              </h3>
              <p className="text-base md:text-lg mb-6 leading-relaxed">
                {adData.description}
              </p>

              {/* NEW CONTACT BUTTON */}
              <motion.button
                onClick={() => setShowForm(true)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
                }}
                className={`mt-auto self-start px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${buttonBg} ${buttonText}`}
              >
                Contact Now
              </motion.button>
            </div>
          </motion.div>
        </section>

        {/* ------------------- Contact Us Section ------------------- */}
        <section className="mt-20">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#8D5A3A]">
              Contact Us
            </h2>
            <div
              className={`w-24 h-1 mx-auto mt-2 rounded-full ${headingColor}`}
            ></div>
          </motion.div>

          {/* Form & Map */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              className={`p-6 md:p-10 rounded-lg shadow-lg ${formBg}`}
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className={`w-full rounded p-2 border border-gray-300 ${inputBg}`}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={`w-full rounded p-2 border border-gray-300 ${inputBg}`}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full rounded p-2 border border-gray-300 ${inputBg}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className={`w-full rounded p-2 border border-gray-300 ${inputBg}`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <textarea
                  placeholder="Message"
                  className={`w-full rounded p-2 border border-gray-300 ${inputBg} h-32 resize-none`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
                  }}
                  className="bg-[#8D5A3A] hover:bg-[#7a4b2f] text-white px-6 py-2 rounded transition-all duration-300"
                  type="submit"
                >
                  Send
                </motion.button>
              </form>
            </motion.div>

            {/* Map */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <MapContainer
                center={[28.6139, 77.209]}
                zoom={13}
                scrollWheelZoom={false}
                className="w-full h-96 rounded-lg shadow-lg relative z-0"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; OpenStreetMap contributors"
                />
                <Marker position={[28.6139, 77.209]}>
                  <Popup>KDASTSHO Fintech Solutions Pvt Ltd</Popup>
                </Marker>
              </MapContainer>
            </motion.div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AboutUsSection;
