// src/components/SignUpForm.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { auth, db } from "../firebase"; // adjust path if needed
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setShowCard(true), 120);
  }, []);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "India",
    code: "+91",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCountryChange = (e) => {
    const country = e.target.value;
    const callingCode = country === "India" ? "+91" : "";
    setFormData({ ...formData, country, code: callingCode });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.email || !formData.password) {
      setError("Email and password are required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;

      // Optionally set displayName in Auth profile
      try {
        await updateProfile(user, {
          displayName: `${formData.firstName} ${formData.lastName}`,
        });
      } catch (err) {
        // non-fatal
        console.warn("updateProfile error:", err);
      }

      // Create Firestore document with UID as doc id
      const userDocRef = doc(db, "users", user.uid);
      const payload = {
        uid: user.uid,
        firstName: formData.firstName || "",
        lastName: formData.lastName || "",
        email: formData.email,
        country: formData.country,
        phoneCode: formData.code || "",
        phone: "", // user may enter later
        // Additional fields requested (empty/default)
        gender: "",
        address: "",
        state: "",
        city: "",
        qualification: "",
        cgpa: "",
        skills: [], // array
        certifications: [], // array
        createdAt: serverTimestamp(),
      };

      await setDoc(userDocRef, payload);

      // Redirect to profile page (edit) after sign up
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center relative 
      bg-gradient-to-br from-[#8B4629] via-[#A0522D] to-[#4B2E19]
      dark:from-[#2b1407] dark:via-[#3d1c10] dark:to-[#160a05]
      px-4 pt-[90px] md:pt-[110px]"
    >
      {/* Sign In top right */}
      <button
        onClick={() => navigate("/login")}
        className="absolute top-6 right-6 text-white font-semibold border border-white/30 px-4 py-2 rounded-lg hover:bg-white/10 transition"
      >
        Sign In
      </button>

      {/* Logo top left */}
      <img
        src="/images/logo.png"
        alt="logo"
        className="absolute top-6 left-6 w-14 h-14 rounded-full shadow-lg object-cover"
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 25 }}
        animate={showCard ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="w-full max-w-lg p-10 rounded-3xl 
        bg-[#c7b199]/60 dark:bg-[#7b604e]/50 
        backdrop-blur-xl shadow-2xl border border-white/10 dark:border-black/20"
      >
        <h2 className="text-center text-[18px] md:text-[20px] font-medium text-[#2b1d16] dark:text-[#f5e8da] mb-6">
          Hey, Enter your details to create your account
        </h2>

        {error && (
          <div className="text-sm text-red-600 bg-red-100 p-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First + Last Name Row */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
            ].map((input, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label className="text-sm text-[#2b1d16] dark:text-[#f5e8da]">
                  {input.label}
                </label>
                <input
                  type="text"
                  name={input.name}
                  value={formData[input.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl 
                bg-white/30 dark:bg-black/20 outline-none 
                text-[#2b1d16] dark:text-white
                border border-transparent focus:border-orange-400 dark:focus:border-yellow-500
                transition-all shadow-sm focus:shadow-md"
                  placeholder={input.label}
                />
              </div>
            ))}
          </div>

          {/* Country */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#2b1d16] dark:text-[#f5e8da]">
              Select Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleCountryChange}
              className="w-full px-4 py-3 rounded-xl 
            bg-white/30 dark:bg-black/20 outline-none 
            text-[#2b1d16] dark:text-white
            border border-transparent focus:border-orange-400 dark:focus:border-yellow-500
            transition-all shadow-sm focus:shadow-md"
            >
              <option value="India">India (+91)</option>
            </select>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-[#2b1d16] dark:text-[#f5e8da]">
              Email / Phone Number
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl 
            bg-white/30 dark:bg-black/20 outline-none 
            text-[#2b1d16] dark:text-white
            border border-transparent focus:border-orange-400 dark:focus:border-yellow-500
            transition-all shadow-sm focus:shadow-md"
              placeholder="Enter Email"
            />
          </div>

          {/* Password */}
          <div className="space-y-4">
            {[
              { label: "Enter Password", name: "password", type: "password" },
              {
                label: "Re-Enter Password",
                name: "confirmPassword",
                type: "password",
              },
            ].map((input, index) => (
              <div key={index} className="flex flex-col gap-1">
                <label className="text-sm text-[#2b1d16] dark:text-[#f5e8da]">
                  {input.label}
                </label>
                <input
                  type={input.type}
                  name={input.name}
                  value={formData[input.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl 
                bg-white/30 dark:bg-black/20 outline-none 
                text-[#2b1d16] dark:text-white
                border border-transparent focus:border-orange-400 dark:focus:border-yellow-500
                transition-all shadow-sm focus:shadow-md"
                  placeholder={input.label}
                />
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-3 rounded-xl font-semibold text-white
            bg-gradient-to-r from-[#d07a3e] via-[#e88d4f] to-[#c56c32]
            hover:scale-[1.03] hover:shadow-xl transition-all duration-300 active:scale-95 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm mt-5 text-[#2b1d16] dark:text-[#f5e8da]">
          or
        </p>

        {/* Social Icons */}
        <div className="flex justify-center items-center gap-6 mt-5">
          <div className="p-3 rounded-full bg-white hover:scale-110 transition shadow-md cursor-pointer">
            <FaFacebookF className="text-[#1773EA] text-xl" />
          </div>
          <div className="p-3 rounded-full bg-white hover:scale-110 transition shadow-md cursor-pointer">
            <FcGoogle className="text-2xl" />
          </div>
          <div className="p-3 rounded-full bg-white hover:scale-110 transition shadow-md cursor-pointer">
            <FaApple className="text-black text-2xl" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpForm;
