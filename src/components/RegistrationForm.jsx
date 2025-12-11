import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { CalendarIcon } from "@heroicons/react/24/solid";
import { auth, db } from "../firebase";
import { doc, setDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const service = location.state?.service;

  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    details: "",
  });

  // Check login state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) setUid(user.uid);
      else setUid(null);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uid) {
      toast.error("⚠ Please login to continue.");
      return;
    }

    setLoading(true);
    try {
      await setDoc(
        doc(
          collection(
            db,
            "REGISTER_DEATILS_INVESTMENTS",
            uid,
            "user_registrations"
          )
        ),
        {
          uid: uid,
          ...formData,
          serviceTitle: service?.title || "",
          serviceDescription: service?.description || "",
          serviceIncludes: service?.includes || "",
          status: "pending", // <-- Added default status field
          createdAt: new Date(),
        }
      );

      toast.success("🎉 Registration Successful!");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3A1F0B] via-[#5C2D0C] to-[#8D5A3A] flex flex-col items-center justify-center text-gray-900 dark:text-gray-100 font-sans">
      <ToastContainer theme="dark" />
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-extrabold text-[#FFA500] mb-12 text-center px-4"
      >
        Register with your details
      </motion.h1>

      {/* Show login message if not logged in */}
      {!uid && (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl mb-5 text-center shadow-md">
          <p className="text-lg mb-3 font-semibold">
            ⚠ You must login to register
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-[#FFA500] text-white px-6 py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 md:p-12 w-full max-w-4xl"
      >
        {service && (
          <div className="mb-8 bg-yellow-100 dark:bg-yellow-700 p-4 rounded-xl text-gray-900 dark:text-gray-100">
            <h2 className="font-bold text-xl mb-2 text-[#8D5A3A]">
              {service.title}
            </h2>
            <p>{service.description}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              Includes: {service.includes}
            </p>
          </div>
        )}

        <p className="text-gray-800 dark:text-gray-200 text-lg md:text-xl mb-8 text-center">
          Become a part of our growing community.
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="flex flex-col">
            <label className="mb-2 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium">Enter E-mail id</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium">Phone Number</label>
            <div className="flex items-center">
              <span className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-l-lg border text-gray-700 dark:text-gray-200">
                +91
              </span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="flex-1 rounded-r-lg border border-gray-300 dark:border-gray-600 px-4 py-2"
              />
            </div>
          </div>

          <div className="flex flex-col relative">
            <label className="mb-2 font-medium">Select Date</label>
            <div className="relative">
              <CalendarIcon className="w-5 h-5 absolute top-3 left-3 text-gray-400" />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-10 py-2"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium">Enter Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label className="mb-2 font-medium">
              Describe what you are looking
            </label>
            <textarea
              rows="4"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Describe your service details..."
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 resize-none"
            ></textarea>
          </div>
        </form>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-b from-[#5C2D0C] to-[#FFA500] text-white px-10 py-3 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RegistrationForm;
