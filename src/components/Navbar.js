// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useTheme from "../hooks/useTheme";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [darkMode, setDarkMode] = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // 🔥 admin check state
  const location = useLocation();
  const navigate = useNavigate();
  const db = getFirestore();
  const auth = getAuth();

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Fetch user details + check admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setIsAdmin(false);
        return;
      }

      const uid = currentUser.uid;
      const userDocRef = doc(db, "users", uid);
      const userSnap = await getDoc(userDocRef);

      const email = currentUser.email?.toLowerCase().trim();

      setUser({
        uid,
        firstName: userSnap.exists() ? userSnap.data().firstName : "User",
      });

      // 🔥 Email-based admin access
      setIsAdmin(email === "ceo@kdastshofintechsolutions.com");
    });

    return () => unsubscribe();
  }, []);

  const navItems = [
    { name: "About", to: "/About1" },
    { name: "Careers", to: "/Careers" },
    { name: "Blog", to: "/Blog" },
    { name: "Spin", to: "/Home" },

    // ❌ Dashboard removed from public nav — now shown only in user dropdown when admin
    {
      name: "Services",
      dropdown: [
        { name: "Software Development", to: "/services/software-development" },
        {
          name: "Company Registration & Tax Filing",
          to: "/services/company-tax",
        },
        { name: "Investments", to: "/services/investments" },
      ],
    },
    { name: "Contact Us", to: "/contact" },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setUserDropdown(false);
    navigate("/login");
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <motion.nav
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md py-4"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <motion.img
            src="/logok.png"
            alt="logo"
            className="w-16 h-16 rounded-full object-cover cursor-pointer"
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center bg-[#ceb197] px-10 py-4 rounded-full shadow-xl">
          {navItems.map((item, idx) =>
            item.dropdown ? (
              <div
                key={idx}
                className="relative"
                onMouseEnter={() => setServiceOpen(true)}
                onMouseLeave={() => setServiceOpen(false)}
              >
                <button className="cursor-pointer text-lg font-semibold text-black">
                  {item.name} ▾
                </button>
                <AnimatePresence>
                  {serviceOpen && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 bg-white dark:bg-black shadow-xl rounded-xl py-2 w-56 flex flex-col mt-2 z-50"
                    >
                      {item.dropdown.map((subItem, i) => (
                        <Link
                          key={i}
                          to={subItem.to}
                          className="block px-4 py-2 text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={idx}
                to={item.to}
                className="cursor-pointer text-lg font-semibold text-black"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Icons + Mobile Toggle */}
        <div className="flex items-center space-x-4 relative">
          {/* User Icon */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center cursor-pointer text-black dark:text-white text-xl hover:scale-110 transition-transform duration-200"
              >
                <FaUserCircle />
              </button>

              {/* USER DROPDOWN */}
              <AnimatePresence>
                {userDropdown && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 bg-white dark:bg-black shadow-xl rounded-xl py-2 w-52 flex flex-col z-50"
                  >
                    {/* My Profile */}
                    <button
                      onClick={() => {
                        navigate("/Myprofile");
                        setUserDropdown(false);
                      }}
                      className="text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      My Profile
                    </button>

                    {/* My Applications */}
                    {!isAdmin && (
                      <button
                        onClick={() => {
                          navigate("/MyApplications");
                          setUserDropdown(false);
                        }}
                        className="text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors"
                      >
                        My Applications
                      </button>
                    )}

                    {/* 🔥 Dashboard visible only for admin */}
                    {isAdmin && (
                      <button
                        onClick={() => {
                          navigate("/dashboard");
                          setUserDropdown(false);
                        }}
                        className="text-left px-4 py-2 font-semibold text-white bg-green-600 hover:bg-green-700 rounded-md transition-colors mt-1"
                      >
                        🛡️ Dashboard
                      </button>
                    )}

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md transition-colors mt-1"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center cursor-pointer text-black dark:text-white text-xl hover:scale-110 transition-transform duration-200">
                <FaUserCircle />
              </div>
            </Link>
          )}

          {/* Dark Mode Toggle */}
          <div
            className="cursor-pointer text-xl text-black dark:text-white"
            onClick={toggleDarkMode}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-3xl text-black dark:text-white font-bold"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="md:hidden bg-[#ceb197] px-6 py-5 mt-3 mx-5 rounded-3xl shadow-xl space-y-2"
          >
            {navItems.map((item, i) =>
              item.dropdown ? (
                <div key={i} className="space-y-1">
                  <button
                    onClick={() => setServiceOpen(!serviceOpen)}
                    className="w-full text-left py-2 px-4 font-semibold text-black rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                  >
                    {item.name} ▾
                  </button>
                  <AnimatePresence>
                    {serviceOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className="ml-4 flex flex-col space-y-1"
                      >
                        {item.dropdown.map((sub, j) => (
                          <Link
                            key={j}
                            to={sub.to}
                            onClick={() => setMenuOpen(false)}
                            className="block py-2 px-4 text-black dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={i}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2 px-4 font-semibold text-black rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
            )}
            {/* Mobile user dropdown */}
            {user && (
              <div className="mt-2 border-t border-gray-300 dark:border-gray-700 pt-2 space-y-1">
                {/* Profile */}
                <button
                  onClick={() => {
                    navigate("/Myprofile");
                    setMenuOpen(false);
                  }}
                  className="block text-left py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  My Profile
                </button>

                {!isAdmin && (
                  <button
                    onClick={() => {
                      navigate("/MyApplications");
                      setMenuOpen(false);
                    }}
                    className="block text-left py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                  >
                    My Applications
                  </button>
                )}

                {/* 🔥 Admin Dashboard only for CEO */}
                {isAdmin && (
                  <button
                    onClick={() => {
                      navigate("/dashboard");
                      setMenuOpen(false);
                    }}
                    className="block text-left py-2 px-4 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors font-semibold"
                  >
                    🛡️ Dashboard
                  </button>
                )}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="block text-left py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
