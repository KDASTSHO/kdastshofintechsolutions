// BusinessSolutions.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosArrowUp } from "react-icons/io";
import { FaRocket, FaBuilding, FaIndustry } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { db } from "../../firebase"; // adjust path if needed
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const solutions = [
  {
    name: "For Startups",
    icon: (
      <FaRocket className="text-blue-500 dark:text-blue-300 text-5xl mx-auto mb-3" />
    ),
    short:
      "Ideal for early-stage founders looking for websites and mobile apps",
    features: [
      "End-to-end guidance from design to deployment",
      "Hosting & domain setup + secure monitoring",
      "Security & compliance with cyber threat protection",
      "Maintenance & upgrades with performance improvements",
      "Cost-effective & scalable solutions for early growth",
    ],
  },
  {
    name: "For Medium-Size Businesses",
    icon: (
      <FaBuilding className="text-purple-500 dark:text-purple-300 text-5xl mx-auto mb-3" />
    ),
    short:
      "Structured execution and scalable digital products for growing companies",
    features: [
      "End-to-end execution for redesign & new development",
      "Hosting & infrastructure with performance monitoring",
      "Security & risk management for reliable operations",
      "Maintenance & optimization with feature upgrades",
      "Growth-driven solutions for automation & scaling",
    ],
  },
  {
    name: "For Enterprises",
    icon: (
      <FaIndustry className="text-yellow-500 dark:text-yellow-300 text-5xl mx-auto mb-3" />
    ),
    short: "Enterprise-grade digital transformation & mission-critical systems",
    features: [
      "Strategic digital transformation & governance models",
      "Hybrid / cloud infrastructure with global performance",
      "Advanced enterprise security & regulatory compliance",
      "SLA-based maintenance & real-time incident management",
      "Systems built for large teams & high-volume data",
    ],
  },
];

export default function BusinessSolutions() {
  const [openIndex, setOpenIndex] = useState(null);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [callForm, setCallForm] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const openCallModal = (solution) => {
    setSelectedSolution(solution);
    setCallModalOpen(true);
    setSuccessMsg("");
  };

  const submitCall = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "contacts"), {
        name: callForm.name,
        phone: callForm.phone,
        email: callForm.email,
        note: callForm.note,
        solutionTitle: selectedSolution.name,
        solutionDescription: selectedSolution.short,
        createdAt: serverTimestamp(),
      });
      setSuccessMsg(
        `Thanks ${callForm.name || "there"} — we'll contact you shortly.`
      );
      setCallForm({ name: "", phone: "", email: "", note: "" });
      setTimeout(() => setCallModalOpen(false), 1400);
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  return (
    <section
      id="business-solutions"
      className="pt-[calc(var(--navbar-height,80px)+2rem)] scroll-mt-[var(--navbar-height,80px)] bg-gray-100 dark:bg-gray-900 py-16 transition-all"
    >
      <div className="max-w-7xl w-[92%] mx-auto text-center">
        <h2
          data-aos="fade-up"
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-snug"
        >
          End-to-End Software Solutions to Power Your Growth
        </h2>

        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="mt-4 text-gray-600 dark:text-gray-300 max-w-4xl mx-auto text-lg"
        >
          Scalable and secure applications tailored for startups, mid-size
          businesses, and enterprises — helping you innovate across every stage.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl w-[92%] mx-auto">
        {solutions.map((solution, index) => (
          <motion.div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.25 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col"
          >
            {solution.icon}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
              {solution.name}
            </h3>

            <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
              {solution.short}
            </p>

            <button
              className="mt-6 mx-auto p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <IoIosArrowUp
                className={`text-gray-700 dark:text-gray-300 text-2xl transition ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            {openIndex === index && (
              <motion.ul
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-5 space-y-3 text-gray-700 dark:text-gray-300"
              >
                {solution.features.map((f, i) => (
                  <li key={i} className="flex items-start text-sm">
                    ✦ <span className="ml-1">{f}</span>
                  </li>
                ))}
              </motion.ul>
            )}

            {/* CTA Buttons */}
            <div className="mt-8 flex gap-3 justify-center flex-wrap">
              <button className="px-5 py-2.5 text-sm font-medium rounded-xl bg-[#8D5A3A] text-white hover:bg-[#7a4b2f] transition">
                Plan Now
              </button>

              <button
                className="px-5 py-2.5 text-sm font-medium rounded-xl border border-[#8D5A3A] text-[#8D5A3A] dark:text-[#C8A48F] dark:border-[#C8A48F] hover:bg-[#f4e9e2] dark:hover:bg-[#5a3c28] transition"
                onClick={() => openCallModal(solution)}
              >
                Book a Call
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Call Modal */}
      {callModalOpen && selectedSolution && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setCallModalOpen(false)}
          />
          <motion.form
            onSubmit={submitCall}
            initial={{ y: 20, scale: 0.98 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ duration: 0.22 }}
            className="relative z-10 max-w-lg w-full bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl border dark:border-gray-700"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Book a Call — {selectedSolution.name}
            </h4>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {selectedSolution.short}
            </p>

            <div className="mt-4 grid grid-cols-1 gap-3">
              <input
                className="px-3 py-2 rounded-md border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm"
                placeholder="Name"
                value={callForm.name}
                onChange={(e) =>
                  setCallForm({ ...callForm, name: e.target.value })
                }
                required
              />
              <input
                className="px-3 py-2 rounded-md border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm"
                placeholder="Phone"
                value={callForm.phone}
                onChange={(e) =>
                  setCallForm({ ...callForm, phone: e.target.value })
                }
                required
              />
              <input
                className="px-3 py-2 rounded-md border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm"
                placeholder="Email (optional)"
                value={callForm.email}
                onChange={(e) =>
                  setCallForm({ ...callForm, email: e.target.value })
                }
              />
              <textarea
                className="px-3 py-2 rounded-md border bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-sm"
                placeholder="Brief note (your goals / best time to call)"
                value={callForm.note}
                onChange={(e) =>
                  setCallForm({ ...callForm, note: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-[#8D5A3A] text-white"
              >
                Request Call
              </button>
              <button
                type="button"
                onClick={() => setCallModalOpen(false)}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>
            </div>

            {successMsg && (
              <div className="mt-4 text-sm text-green-700 dark:text-green-300">
                {successMsg}
              </div>
            )}
          </motion.form>
        </motion.div>
      )}
    </section>
  );
}
