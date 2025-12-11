// src/components/KadasthoLanding.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import FooterBanner from "../../components/FooterBanner";   // ⬅️ ADDED

const services = [
  {
    id: "01",
    title: "Sole Proprietorship Registration",
    description:
      "A simple and cost-effective business structure for individuals.",
    includes:
      "Udyam Registration, GST Registration, ITR Filing, Shop & Establishment License.",
  },
  {
    id: "02",
    title: "Partnership Firm Registration",
    description: "A traditional business structure for 2 or more partners.",
    includes:
      "Registration Deed Preparation, Name Approval, Stamp Duty & Registration support, PAN/TAN/GST Registration, Optional GST Registration.",
  },
  {
    id: "03",
    title: "Private Limited (Pvt Ltd) Company Registration",
    description:
      "A highly trusted and scalable company structure recognized across the globe.",
    includes:
      "Digital Signature Certificate (DSC), Director Identification Number (DIN), Name Approval (RUN/Spice+), Memorandum (MoA), Certificate of Incorporation (CoI), PAN/TAN, Commencement of Business Filing.",
  },
  {
    id: "04",
    title: "One Person Company (OPC) Registration",
    description: "A special company type for single founders.",
    includes:
      "DIN, DSC + DIN, Name Approval, MOA/AOA, Incorporation Certificate, PAN/TAN.",
  },
  {
    id: "05",
    title: "GST Registration",
    description:
      "Fast and hassle-free GST Registration for businesses selling goods or services.",
    includes:
      "Document preparation, Application filing, Follow up with tax officers, ARN & GSTIN Issuance, Full implementation guidance.",
  },
  {
    id: "06",
    title: "Income Tax Return (ITR) Filing",
    description:
      "Professional ITR Filing for individuals, freelancers, businesses, and corporates.",
    includes:
      "TDS/TCS Certification, Deduction analysis, Tax Computation, Filing ITR for individuals, businesses, or rental income, Filing ITR for companies & partners.",
  },
];

const KadasthoLanding = () => {
  const navigate = useNavigate();
  const handleRegister = (service) =>
    navigate("/register", { state: { service } });

  return (
    <div className="min-h-screen bg-[#F7F1EC] dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <div className="h-20 md:h-24" />

      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 gap-10">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold">
            Complete Company Registration & Tax Filing Solutions
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Quick setup, accurate filing, and complete legal support.
          </p>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 flex justify-center"
        >
          <motion.img
            src="/images/plain.png"
            alt="Business Team"
            className="w-full max-w-md rounded-lg shadow-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </header>

      {/* Services Cards */}
      <section className="px-6 md:px-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 15px 25px rgba(0,0,0,0.15)",
              }}
              className="border rounded-xl p-6 bg-white dark:bg-gray-800 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-3xl font-bold text-[#B8860B] mb-3">
                  {service.id}
                </h2>
                <h3 className="text-xl font-semibold mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  {service.description}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {service.includes}
                </p>
              </div>

              {/* Button at bottom */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => handleRegister(service)}
                  className="bg-[#8D5A3A] hover:bg-[#704228] text-white px-5 py-2 rounded-lg shadow-md transition-all"
                >
                  Register for this Service
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer Banner ABOVE actual footer */}
      <div className="w-full flex justify-center mt-10 mb-16">
        <div className="w-[92%] max-w-5xl">
          <FooterBanner />
        </div>
      </div>

    </div>
  );
};

export default KadasthoLanding;
