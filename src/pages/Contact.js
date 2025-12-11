// src/components/ContactUsSection.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import useTheme from "../hooks/useTheme";

// Firebase
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// ⭐ ADD FOOTER BANNER
import FooterBanner from "../components/FooterBanner"; 

// Fix default marker icon in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const ContactUsSection = () => {
  const [darkMode] = useTheme();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Submit → Firebase
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

  // Animations
  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  const sectionBg = darkMode ? "bg-gray-900" : "bg-white";
  const headingColor = darkMode ? "text-green-400" : "text-green-800";
  const formBg = darkMode
    ? "bg-gray-800 text-gray-100"
    : "bg-[#E8D8C9] text-stone-800";
  const inputBg = darkMode
    ? "bg-gray-700 text-gray-100"
    : "bg-white text-gray-800";

  return (
    <>
      <section
        className={`relative z-0 pt-44 md:pt-48 pb-16 transition-colors duration-500 ${sectionBg}`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          {/* Heading */}
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

          {/* Form + Map */}
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
                  <Popup>Kadastho Fintech Solutions Pvt Ltd</Popup>
                </Marker>
              </MapContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ⭐ Footer Banner BELOW contact section and ABOVE website footer */}
      <div className="mt-10 mb-20 flex justify-center">
        <div className="w-[92%] max-w-5xl">
          <FooterBanner />
        </div>
      </div>
    </>
  );
};

export default ContactUsSection;
