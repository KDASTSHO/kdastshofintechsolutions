// src/pages/ComplexSolutionsPage.jsx
import React from "react";
import { useState, useEffect } from "react";
import FooterBanner from "../../components/FooterBanner";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { IoIosArrowUp } from "react-icons/io";
import { FaRocket, FaBuilding, FaIndustry } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import { db } from "../../firebase"; // adjust path if needed
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth } from "../../firebase";

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

/**
 * ComplexSolutionsPage
 *
 * - Fully responsive
 * - Dark/Light mode support (Tailwind CSS)
 * - Pixel-perfect layout based on image_97bc20.jpg
 * - Uses brand colors:
 *      Primary/Teal: #1E4E45 (text-green-800 / dark:text-teal-400)
 *      Button/Dark Brown: #4F372C (bg-stone-800)
 *      Subtle Background: bg-stone-100 / dark:bg-stone-700
 *
 * - Animations powered by framer-motion
 * - Uses local images from public/images folder
 */

const ComplexSolutionsPage = () => {
  // ----------------------
  // Animation Variants
  // ----------------------
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };
  const slideLeft = {
    hidden: { x: -80, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8 } },
  };
  const slideUp = {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };
  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  // ----------------------
  // Brand Color Classes
  // ----------------------
  const primaryHeadingClass =
    "text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-800 dark:text-teal-400 leading-tight";
  const darkButtonClass =
    "bg-stone-800 hover:bg-stone-700 text-white px-6 py-3 rounded-md font-semibold shadow-md";
  const subtleSectionBg = "bg-stone-100 dark:bg-stone-700";

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
      const currentUser = auth.currentUser;

      await addDoc(collection(db, "Calls_from_softwareDevelopment"), {
        uid: currentUser ? currentUser.uid : null, // use null if not logged in
        name: callForm.name,
        phone: callForm.phone,
        email: callForm.email,
        note: callForm.note,
        solutionTitle: selectedSolution.name,
        solutionDescription: selectedSolution.short,
        status: "pending", // default status
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
    <div className="bg-[#F7F1EC] dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <main className="w-full">
        {/* =======================
          HERO BANNER
      ======================= */}

        <section className="w-full py-24 px-6 md:px-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <motion.div
            className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 items-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {/* Left Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className={primaryHeadingClass}>
                End-to-End Software Solutions to Power Your Growth
              </h1>
              <p className="text-lg md:text-xl text-stone-700 dark:text-gray-300">
                Developing dependable, scalable, and feature-rich applications
                that have an impact. From idea to delivery — UI/UX, development,
                testing, deployment and continual support.
              </p>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative">
              <img
                src="/images/monitoring.png"
                alt="Team collaboration"
                className="w-full h-80 md:h-96 object-cover rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800 -translate-y-8 lg:translate-y-0"
              />
            </div>
          </motion.div>
        </section>

        {/* =======================
          APP DEVELOPMENT SECTION
      ======================= */}
        <section className="relative py-20">
          <div
            className="absolute inset-0 bg-blue-500 dark:bg-blue-800 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/BGD.jpeg')" }}
          ></div>
          <div className="absolute inset-0 bg-white/40 dark:bg-black/50 backdrop-blur-sm"></div>

          <motion.div
            className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideLeft}
          >
            {/* Left Image & Salary Badge */}
            <div className="md:col-span-4 flex flex-col items-center md:items-start gap-4">
              <img
                src="/images/monitoring.png"
                alt="Phone mockup"
                className="w-48 h-56 object-cover rounded-lg shadow-lg border-2 border-white"
              />
            </div>

            {/* Right Text */}
            <div className="md:col-span-8 space-y-8 text-white dark:text-white">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Android App Development
                </h3>
                <p className="mt-2 text-sm md:text-base">
                  High-performance Android apps with secure architecture,
                  offline features, backend integration, and Play Store
                  deployment.
                </p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  iOS App Development
                </h3>
                <p className="mt-2 text-sm md:text-base">
                  Premium iOS apps following Apple guidelines, delivering pure
                  performance, stunning UI, and long-term scalability.
                </p>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">
                  Hybrid / Flutter App Development
                </h3>
                <p className="mt-2 text-sm md:text-base">
                  Cross-platform apps using Flutter for native-like performance
                  on Android & iOS with a single codebase, reducing development
                  time.
                </p>
              </div>
            </div>
          </motion.div>
        </section>
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
              businesses, and enterprises — helping you innovate across every
              stage.
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
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
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
                  {/* Updated Plan Now button to behave like Book a Call */}
                  <button
                    className="px-5 py-2.5 text-sm font-medium rounded-xl bg-[#8D5A3A] text-white hover:bg-[#7a4b2f] transition"
                    onClick={() => {
                      if (!auth.currentUser) {
                        alert("Please login to book a call");
                        return;
                      }
                      openCallModal(solution);
                    }}
                  >
                    Plan Now
                  </button>

                  <button
                    className="px-5 py-2.5 text-sm font-medium rounded-xl border border-[#8D5A3A] text-[#8D5A3A] dark:text-[#C8A48F] dark:border-[#C8A48F] hover:bg-[#f4e9e2] dark:hover:bg-[#5a3c28] transition"
                    onClick={() => {
                      if (!auth.currentUser) {
                        alert("Please login to book a call");
                        return;
                      }
                      openCallModal(solution);
                    }}
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

        {/* =======================
          WHY CHOOSE SECTION
      ======================= */}
        <motion.section
          className={`mt-12 py-10 rounded-2xl ${subtleSectionBg}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-5xl mx-auto px-6 text-center">
            <motion.h2
              variants={slideUp}
              className="text-2xl md:text-3xl font-bold text-green-800 dark:text-teal-400"
            >
              Why to choose ?
            </motion.h2>
            <motion.div
              variants={staggerContainer}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            >
             {[
                {
                  num: "01",
                  title: "Security Features",
                  desc: "Included in all apps: encryption at rest & transit, OWASP best practices, role-based access control, secure auth flows.",
                },
                {
                  num: "02",
                  title: "Maintenance & Support",
                  desc: "Ongoing maintenance, SLA-driven support, regular updates and monitoring to keep your product healthy and reliable.",
                },
                {
                  num: "03",
                  title: "Domain, Hosting & Server Features",
                  desc: "Managed hosting, automated backups, CDN, SSL/TLS and optimized deployments for performance and uptime.",
                },
              ].map((card, i) => (
                <motion.article
                  key={i}
                  variants={fadeIn}
                  custom={i * 0.2}
                  className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-stone-100 dark:bg-stone-700 font-bold text-stone-800 dark:text-stone-100">
                        {card.num}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-stone-800 dark:text-stone-100">
                        {card.title}
                      </h4>
                      <p className="mt-2 text-sm text-stone-600 dark:text-gray-300">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>
        {/* =======================
          FEATURE LIST SECTION
      ======================= */}
        <section className="py-20">
          <motion.div
            className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* Left Circular Graphic */}
            <motion.div
              className="lg:col-span-5 flex justify-center lg:justify-start"
              variants={fadeIn}
            >
              <div className="w-96 h-96 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-2xl border-4 border-stone-100 dark:border-stone-700 overflow-hidden">
                <img
                  src="/images/security.jpg"
                  alt="shield graphic"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right Features List */}
            <motion.div
              className="lg:col-span-7 space-y-6"
              variants={staggerContainer}
            >
              <motion.h3
                className="text-3xl font-bold text-green-800 dark:text-teal-300"
                variants={slideUp}
              >
                Security Features
              </motion.h3>
              <ul className="list-disc ml-6 space-y-2 text-stone-700 dark:text-gray-200">
                <li>
                  Data encryption at rest and in transit (AES-256 / TLS 1.2+)
                </li>
                <li>OWASP top 10 mitigations and secure coding standards</li>
                <li>
                  Role-based access control (RBAC) and granular permissions
                </li>
                <li>
                  Secure authentication: OAuth2, JWT, multi-factor
                  authentication (optional)
                </li>
                <li>
                  Input validation and output encoding to prevent injection
                  attacks
                </li>
              </ul>

              <motion.h4
                className="text-2xl font-semibold text-green-800 dark:text-teal-300 mt-6"
                variants={slideUp}
              >
                Monthly Security Patch Updates
              </motion.h4>
              <ul className="list-disc ml-6 space-y-2 text-stone-700 dark:text-gray-200">
                <li>Scheduled dependency and platform updates</li>
                <li>Regular vulnerability scanning and remediation</li>
                <li>Patch notes and versioning for traceability</li>
              </ul>

              <motion.h4
                className="text-2xl font-semibold text-green-800 dark:text-teal-300 mt-6"
                variants={slideUp}
              >
                Domain Services & Hosting
              </motion.h4>
              <ul className="list-disc ml-6 space-y-2 text-stone-700 dark:text-gray-200">
                <li>Managed domain registration and renewal</li>
                <li>
                  CDN integration for global fast delivery (Cloudflare / AWS
                  CloudFront)
                </li>
                <li>Automated daily backups and restore processes</li>
                <li>SSL/TLS certificate management and renewal</li>
                <li>
                  Auto-scaling servers and containerized deployments (Docker /
                  Kubernetes)
                </li>
              </ul>

              <motion.div className="mt-6" variants={fadeIn}></motion.div>
            </motion.div>
          </motion.div>
        </section>
      </main>
      {/* Footer Banner ABOVE actual footer */}
      <div className="w-full flex justify-center mt-10 mb-16">
        <div className="w-[92%] max-w-5xl">
          <FooterBanner />
        </div>
      </div>
    </div>
  );
};

export default ComplexSolutionsPage;

