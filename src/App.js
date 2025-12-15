import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Myprofile from "./pages/Myprofile";
import MyApplications from "./pages/MyApplications";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import SoftwareDevelopment from "./pages/Services/SoftwareDevelopment";
import CompanyTax from "./pages/Services/CompanyTax";
import Investments from "./pages/Services/Investments";
import RegistrationForm from "./components/RegistrationForm";
import LoginCard from "./components/LoginCard";
import SignUpForm from "./components/SignUpForm";
import Applyform from "./components/Applyform";
import About1 from "./pages/About1";
import Softgetstart from "./pages/Services/Softgetstart";
import Investments2 from "./pages/Services/Investments2";
import Dashboard from "./pages/Dashboard";
import Ads from "./pages/Ads";
import Rewards from "./pages/Rewards";
import Home from "./pages/Home";
import Terms from "./components/Terms";
import Privacy from "./components/Privacy";
import BlogPost from "./pages/BlogPost";
import AdminRoute from "./routes/AdminRoute";

function App() {
  // global dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" ? true : false;
  });

  // apply theme to html root
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div
      className={
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }
    >
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<About darkMode={darkMode} />} />
        <Route path="/Myprofile" element={<Myprofile darkMode={darkMode} />} />
        <Route path="/MyApplications" element={<MyApplications />} />
        <Route path="/Blog" element={<Blog darkMode={darkMode} />} />
        <Route path="/About1" element={<About1 darkMode={darkMode} />} />
        <Route path="/Careers" element={<Careers darkMode={darkMode} />} />
        <Route path="/contact" element={<Contact darkMode={darkMode} />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/Applyform" element={<Applyform />} />
        <Route path="/softgetstart" element={<Softgetstart />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="Rewards" element={<Rewards />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy darkMode={darkMode} />} />
        <Route path="/blog/digital-transformation" element={<BlogPost />} />


        <Route
          path="/services/software-development"
          element={<SoftwareDevelopment />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/services/company-tax" element={<CompanyTax />} />
        <Route path="/services/investments" element={<Investments />} />
        <Route path="/investments2" element={<Investments2 />} />
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

        <Route path="/login" element={<LoginCard />} />
      </Routes>

      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;
