import React, { useEffect } from "react";
import Navbar from "./Navbar"; // adjust path if needed
import Footer from "./Footer"; // Assuming you want to keep the Footer imported

// Data structure to hold your Privacy Policy content
// Retaining color property for the colored heading box
const privacyPolicyContent = [
  {
    type: "1. Information We Collect",
    color: "bg-purple-600",
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Name, email, phone number</li>
        <li>KYC details (only if required for services)</li>
        <li>Usage data, device information, browser type</li>
        <li>
          Financial information (only with your consent and only for required
          services)
        </li>
      </ul>
    ),
  },
  {
    type: "2. How We Use Information",
    color: "bg-teal-600",
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Provide and improve our services</li>
        <li>Verify identity and comply with applicable laws</li>
        <li>Communicate with you</li>
        <li>Ensure website security</li>
      </ul>
    ),
  },
  {
    type: "3. Data Protection",
    color: "bg-red-500",
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>
          We do not sell, rent, or trade your personal information to any third
          party.
        </li>
        <li>
          Information is shared only if required by law, government authorities,
          or to provide essential services.
        </li>
      </ul>
    ),
  },
  {
    type: "4. User Rights",
    color: "bg-indigo-500",
    content: (
      <ul className="list-disc pl-6 space-y-2">
        <li>Access your data</li>
        <li>Request correction or deletion</li>
        <li>Withdraw consent (where applicable)</li>
        <li>Lodge a complaint under applicable data-protection laws</li>
      </ul>
    ),
  },
  {
    type: "5. Cookies & Tracking",
    color: "bg-orange-500",
    content: (
      <p>
        We may use cookies to improve user experience. You may disable cookies in
        your browser settings.
      </p>
    ),
  },
  {
    type: "6. Data Retention",
    color: "bg-green-500",
    content: (
      <p>
        We retain your data only as long as necessary for business or legal
        purposes.
      </p>
    ),
  },
  {
    type: "7. Security",
    color: "bg-yellow-600",
    content: (
      <p>
        We use appropriate security measures to protect your information from
        unauthorized access, alteration, or disclosure.
      </p>
    ),
  },
  {
    type: "8. Policy Updates",
    color: "bg-pink-600",
    content: (
      <p>
        This Privacy Policy may be updated periodically. Continued use of the
        website means you accept the revised policy.
      </p>
    ),
  },
  {
    type: "9. Contact Us",
    color: "bg-gray-600",
    content: (
      <>
        <p className="mb-2">
          For any privacy-related queries, reach us at:
        </p>
        <p className="font-semibold">info@kdasthofintechsolutions.com</p>
      </>
    ),
  },
];

const Privacy = ({ darkMode }) => {
  // Scroll to top when page opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Removed PolicyBlock component and the timeline structure

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-900"
      }`}
    >
     

      {/* MAIN CONTENT */}
      <main className="flex-grow pt-28 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Title - Simplified */}
          <h1 className="text-4xl font-bold text-center mb-10">
            Privacy Policy
          </h1>

          <div
            className={`rounded-2xl shadow-lg p-8 md:p-10 leading-relaxed ${
              darkMode ? "bg-gray-800 border border-gray-700" : "bg-white"
            }`}
          >
            {/* Introduction Paragraph */}
            <p className="mb-8">
              KDASTSHO Fintech Solutions Pvt. Ltd. is committed to protecting
              your personal information and respecting your privacy.
            </p>
            
            {/* Rendering all content sections with colored heading boxes */}
            {privacyPolicyContent.map((section, index) => (
              <div key={index} className="mb-8 last:mb-0">
                
                {/* Colored Heading Box (Replaces h2) */}
                <div
                  className={`inline-block px-4 py-2 text-lg font-bold text-white ${section.color} rounded-lg mb-4 shadow-md`}
                >
                  {section.type}
                </div>

                {/* Section Content */}
                <div className="text-base leading-relaxed pl-1">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      
    </div>
  );
};

export default Privacy;