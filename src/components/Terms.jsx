import React, { useEffect } from "react";
import Navbar from "./Navbar"; // adjust path if needed
import Footer from "./Footer"; // Assuming you want to keep the Footer imported

// Data structure to hold your original terms content, adapted for the image's format
const originalTermsAdapted = [
  {
    type: "1. Introduction",
    color: "bg-purple-600",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        ></path>
      </svg>
    ),
    content: (
      <p>
        These Terms and Conditions govern your use of the website and the services
        provided by Kdastsho Fintech Solutions. By accessing or using our
        platform, you agree to follow all the terms listed here.
      </p>
    ),
  },
  {
    type: "2. Eligibility",
    color: "bg-blue-600",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
        ></path>
      </svg>
    ),
    content: (
      <p>
        You must be at least 18 years of age to use our services. By using the
        website, you confirm that you meet this requirement.
      </p>
    ),
  },
  {
    type: "3. Use of the Platform",
    color: "bg-teal-500",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.75 17L9 20l-1 1h8l-1-1-1-3m-6.938-9h11.876l2-7H7.75l-.98 3.5zm4.832 0l-1.397-4.89l-1.397 4.89h2.794z"
        ></path>
      </svg>
    ),
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>You agree not to misuse the website.</li>
        <li>All information you provide must be accurate.</li>
        <li>
          You must not attempt to hack, damage, or interfere with any part of the
          website.
        </li>
      </ul>
    ),
  },
  {
    type: "4. Financial Disclaimer",
    color: "bg-cyan-600",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V6m0 4v4m-3.414 1.586L7 17h10l-1.586-1.586m-4.828 0a2 2 0 11-2.828 0 2 2 0 012.828 0z"
        ></path>
      </svg>
    ),
    content: (
      <p>
        Our investment suggestions are educational and do not guarantee profits.
        Clients must understand financial risks before making any decisions.
      </p>
    ),
  },
  {
    type: "5. User Data",
    color: "bg-yellow-600",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 0a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
    ),
    content: (
      <p>
        We collect certain personal details to provide better services. Your data
        is handled securely as mentioned in our Privacy Policy.
      </p>
    ),
  },
  {
    type: "6. Amendments to Terms",
    color: "bg-orange-600",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        ></path>
      </svg>
    ),
    content: (
      <p>
        Kdastsho Fintech Solutions reserves the right to modify these Terms at
        any time. Updated terms will be posted on this page.
      </p>
    ),
  },
  {
    type: "7. Contact Us",
    color: "bg-red-600",
    icon: (
      <svg
        className="w-8 h-8 text-white"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        ></path>
      </svg>
    ),
    content: (
      <>
        <p className="mb-2">
          If you have any questions regarding these Terms, reach us at:
        </p>
        <p className="font-semibold">info@kdasthofintechsolutions.com</p>
      </>
    ),
  },
];

const Terms = ({ darkMode }) => {
  // Scroll to top when page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Component to render a single Term block, based on the image's design
  const TermBlock = ({ type, color, icon, content, isLast }) => (
    <div className="flex">
      {/* Icon and Connector Line */}
      <div className="flex flex-col items-center mr-6">
        {/* Icon Circle */}
        <div
          className={`w-14 h-14 ${color} rounded-full flex items-center justify-center shadow-lg`}
        >
          {icon}
        </div>
        {/* Vertical Line - Hidden on the last item */}
        {!isLast && (
          <div
            className={`w-1 h-full ${
              darkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          ></div>
        )}
      </div>

      {/* Content Box */}
      <div
        className={`flex-grow border-l-4 ${
          darkMode ? "border-gray-700" : "border-gray-300"
        } pl-6 pb-10 ${isLast ? "pb-0" : ""}`}
      >
        {/* Term Type Header */}
        <div
          className={`inline-block px-3 py-1 text-sm font-semibold text-white ${color} rounded-md uppercase tracking-wider -translate-y-1/2`}
        >
          {type}
        </div>

        {/* Term Points/Content */}
        <div className="mt-2 text-base leading-relaxed">{content}</div>
      </div>
    </div>
  );

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
      
      {/* CONTENT SECTION */}
      <main className="flex-grow pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Title Section matching the image, adapted for your context */}
          <div className="flex items-center justify-center mb-12">
            <span
              className={`text-8xl font-extrabold ${
                darkMode ? "text-gray-600" : "text-gray-400"
              } opacity-70 mr-4 leading-none`}
            >
              7
            </span>
            <h1 className="text-4xl font-bold leading-tight">
              Our <br /> Terms and Conditions
            </h1>
          </div>

          {/* CARD CONTAINER - Timeline structure */}
          <div
            className={`max-w-3xl mx-auto ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {originalTermsAdapted.map((term, index) => (
              <TermBlock
                key={index}
                {...term}
                isLast={index === originalTermsAdapted.length - 1}
              />
            ))}
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default Terms;