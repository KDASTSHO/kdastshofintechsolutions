import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const vibrantGreen = "#6AFF33";

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform authentication logic here
    navigate("/dashboard"); // redirect after login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0b0b0b] relative overflow-hidden">
      {/* Top gradient bar */}
      <motion.div
        className="absolute top-0 left-0 w-full h-2"
        style={{
          background: `linear-gradient(90deg, rgba(255,255,255,1), ${vibrantGreen})`,
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Floating background circles */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-20 h-20 rounded-full blur-3xl opacity-30"
        style={{ background: vibrantGreen }}
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />
      <motion.div
        className="absolute bottom-[10%] right-[15%] w-24 h-24 rounded-full blur-3xl opacity-20"
        style={{ background: vibrantGreen }}
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />

      {/* Login card */}
      <motion.div
        className="bg-white dark:bg-[#141414] shadow-2xl rounded-2xl p-8 sm:p-10 w-[90%] sm:w-[400px] relative z-10 border border-gray-100 dark:border-gray-800"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2
          className="text-3xl font-bold text-center mb-6"
          style={{ color: vibrantGreen }}
        >
          Welcome Back
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-[#0b0b0b] text-black dark:text-white focus:outline-none focus:ring-2"
              style={{ focus: { borderColor: vibrantGreen } }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-[#0b0b0b] text-black dark:text-white focus:outline-none focus:ring-2"
              style={{ focus: { borderColor: vibrantGreen } }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-black shadow-md transition-all"
            style={{ backgroundColor: vibrantGreen }}
          >
            Login
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-6">
          Don’t have an account?{" "}
          <span
            className="font-semibold cursor-pointer"
            style={{ color: vibrantGreen }}
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
}
