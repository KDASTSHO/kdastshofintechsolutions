import React, { useEffect, useState } from "react";
import { FaLinkedinIn, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = ({ darkMode }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      className={`w-full pt-10 pb-6 px-6 lg:px-16 relative transition-all duration-700
      ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      ${
        darkMode
          ? "bg-[#0b0b0b] text-gray-200"
          : "bg-gradient-to-r from-[#A55D19] to-[#5D3A09] text-white"
      }`}
    >
      <div
        className={`absolute top-0 left-0 w-60 h-60 rounded-full blur-[80px] transition-opacity duration-700
        ${darkMode ? "bg-white/5" : "bg-white/10"}`}
      ></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* LOGO + INTRO */}
        <div className="flex flex-col items-start gap-4">
          <Link to="/" onClick={scrollToTop}>
            <img
              src="/images/logok.png"
              alt="KDastsho Logo"
              className="w-24 md:w-28 rounded-full shadow-md hover:scale-105 hover:shadow-[0_0_18px_#DB6A2E] transition-all duration-500 cursor-pointer"
            />
          </Link>

          <h2 className="text-2xl font-bold tracking-wide">
            Kdastsho Fintech Solutions
          </h2>

          <p
            className={`${
              darkMode ? "text-gray-400" : "text-gray-200"
            } text-base leading-relaxed`}
          >
            KDASTSHO Fintech Solutions Private Limited delivers simple, smart &
            innovative digital solutions to SMEs, MSMEs, and individuals.
          </p>

          {/* SOCIAL — Only LinkedIn */}
          <div className="flex gap-3 mt-2">
            <a
              href="https://www.linkedin.com/company/106791872/admin/page-posts/published/"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-9 h-9 flex justify-center items-center rounded-full border cursor-pointer
                transition-all duration-300 hover:-translate-y-1
                ${
                  darkMode
                    ? "border-white/40 hover:bg-white hover:text-black"
                    : "border-white/40 hover:bg-white hover:text-black"
                }`}
            >
              <FaLinkedinIn size={16} />
            </a>
          </div>
        </div>

        {/* COMPANY */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold mb-1">Company</h3>
          {[
            { label: "Blog", link: "/Blog" },
            { label: "About Us", link: "/about" },
            { label: "Contact Us", link: "/contact" },
            { label: "Career", link: "/Careers" },
            { label: "Advertise With Us 🚀", link: "/ads" },
            { label: "Reward Policies", link: "/Rewards" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className={`cursor-pointer text-base transition-all group
              ${darkMode ? "hover:text-white" : "hover:text-gray-100"}`}
            >
              <span
                className={`inline-block transition-transform duration-300 
                group-hover:translate-x-1
                group-hover:underline group-hover:decoration-[2px] group-hover:underline-offset-4`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* SERVICES */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-semibold mb-1">Services</h3>
          {[
            {
              label: "Software Development",
              link: "/services/software-development",
            },
            {
              label: "Company Registration & Tax Filing",
              link: "/services/company-tax",
            },
            { label: "Investment Service", link: "/services/investments" },
          ].map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className={`cursor-pointer text-base transition-all group
              ${darkMode ? "hover:text-white" : "hover:text-gray-100"}`}
            >
              <span
                className={`inline-block transition-transform duration-300 
                group-hover:translate-x-1
                group-hover:underline group-hover:decoration-[2px] group-hover:underline-offset-4`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* ADDRESS */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold mb-1">Address</h3>
          <div>
            <p className="font-semibold">Head Office</p>
            <p
              className={`${
                darkMode ? "text-gray-400" : "text-gray-100"
              } text-base leading-relaxed`}
            >
              KDASTSHO Fintech Solutions Pvt Ltd <br />
              Opp SAIBABA Temple, Ramapuram, Nandyal District, AP 518122 <br />
              <a
                href="mailto:info@kdasthofintechsolutions.com"
                className="underline cursor-pointer hover:text-white transition-all"
              >
                info@kdasthofintechsolutions.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div
        className={`text-center text-lg mt-6 font-medium relative z-10
        ${darkMode ? "text-gray-400" : "text-gray-200"}`}
      >
        <span className="text-gray-200">© {new Date().getFullYear()}</span>
        &nbsp;
        <span className="font-semibold bg-gradient-to-r from-[#F69B2E] to-[#DB6A2E] bg-clip-text text-transparent animate-[shine_3s_ease-in-out_infinite]">
          Kdastsho Fintech Solutions India
        </span>
        &nbsp;|&nbsp;
        <Link
          to="/terms"
          className="cursor-pointer hover:scale-105 transition-all duration-300 hover:drop-shadow-[0_0_6px_#DB6A2E]"
        >
          Terms & Conditions
        </Link>
        &nbsp;|&nbsp;
        <Link
          to="/privacy"
          className="cursor-pointer hover:scale-105 transition-all duration-300 hover:drop-shadow-[0_0_6px_#DB6A2E]"
        >
          Privacy Policy
        </Link>
      </div>

      {/* SCROLL TOP */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 shadow-lg w-11 h-11 rounded-full flex justify-center items-center
        transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)]
        ${
          darkMode
            ? "bg-white/90 text-black hover:bg-white"
            : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        <FaArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
