// src/components/JobApplicationForm.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";

const JobApplicationForm = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(false);
  const [user, setUser] = useState(null);
  const [canApply, setCanApply] = useState(true);
  const [nextApplyDate, setNextApplyDate] = useState(null);
  const location = useLocation();

  const auth = getAuth();
  const db = getFirestore();

  const images = ["/images/job.png", "/images/job1.png", "/images/job2.png"];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 3500);
    return () => clearInterval(interval);
  }, []);

  // Firebase authentication tracking
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u || null));
    return () => unsubscribe();
  }, []);

  const formFields = [
    { label: "Full Name", name: "fullName" },
    { label: "E-mail ID", name: "email" },
    { label: "Contact Number", name: "phone" },
    { label: "Experience / Fresher", name: "experience" },
    { label: "Role Applying", name: "role" },
    { label: "Job Description", name: "description" },
    { label: "Year Of Passed", name: "yearPassed" },
    { label: "Resume Link (Google Drive / Website)", name: "resumeLink" },
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    experienceYears: "",
    role: location.state?.role || "",
    yearPassed: "",
    resumeLink: "",
    description: location.state?.description || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Prevent applying within 7 days
  useEffect(() => {
    const checkLastApplication = async () => {
      if (!user) return;

      const q = query(
        collection(db, "applications"),
        where("uid", "==", user.uid)
      );
      const snap = await getDocs(q);
      if (snap.empty) return;

      let latest = null;
      snap.forEach((doc) => {
        const data = doc.data();
        if (data.createdAt?.toDate) {
          if (!latest || data.createdAt.toDate() > latest) {
            latest = data.createdAt.toDate();
          }
        }
      });

      if (latest) {
        const diff = (new Date() - latest) / (1000 * 60 * 60 * 24);
        if (diff < 7) {
          setCanApply(false);
          const next = new Date(latest);
          next.setDate(next.getDate() + 7);
          setNextApplyDate(next.toDateString());
        }
      }
    };

    checkLastApplication();
  }, [user]);

  const formVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.4 },
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please login to apply for a job.");
    if (!canApply) return alert("You can apply only once every 7 days.");

    setSubmitting(true);
    try {
      await addDoc(collection(db, "applications"), {
        ...formData,
        uid: user.uid,
        reviewStatus: "Pending",
        adminReview: "",
        applicationID: `${user.uid}-${Date.now()}`,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setSubmitting(false);
      setToast(true);
      setTimeout(() => setToast(false), 3200);
      setCanApply(false);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        experience: "",
        experienceYears: "",
        role: "",
        yearPassed: "",
        resumeLink: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
      alert("Error submitting application.");
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full min-h-[calc(100vh-64px)] flex items-start justify-center bg-neutral-900 dark:bg-neutral-950 text-white font-sans px-4 py-10 pt-24 md:pt-32"
    >
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl shadow-2xl"
      >
        {/* Carousel */}
        <div className="relative bg-black dark:bg-gray-900 rounded-l-xl">
          <img
            src={images[currentSlide]}
            alt="job"
            className="w-full h-full object-cover opacity-90 rounded-l-xl"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/15 hover:bg-white/25 transition"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/15 hover:bg-white/25 transition"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="bg-amber-900/80 dark:bg-[#3c2d1f]/90 px-8 md:px-10 py-10 md:py-12 rounded-r-xl">
          <h2 className="text-3xl font-semibold mb-8 text-center">
            Apply For Job
          </h2>

          {!user && (
            <p className="text-yellow-300 mb-4 text-center">
              Please login to apply for a job.
            </p>
          )}

          {!canApply && (
            <p className="text-red-400 font-semibold text-center mb-4">
              You applied recently. Next apply date:{" "}
              <span className="underline">{nextApplyDate}</span>
            </p>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Dynamic Fields */}
            {formFields.map((field, index) => {
              if (field.name === "experience") {
                return (
                  <motion.div
                    key={field.name}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={formVariants}
                    className="flex flex-col gap-1"
                  >
                    <label className="text-sm text-gray-200">
                      {field.label} <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="experience"
                      required
                      disabled={!canApply}
                      value={formData.experience}
                      onChange={handleChange}
                      className="
    bg-white text-black dark:bg-gray-800 dark:text-white
    border border-gray-300 dark:border-gray-600
    rounded-md px-3 py-2
    focus:ring-2 focus:ring-orange-500 outline-none
    transition
  "
                    >
                      <option
                        value=""
                        disabled
                        className="text-gray-500 dark:text-gray-400"
                      >
                        Select
                      </option>
                      <option
                        value="Fresher"
                        className="text-black dark:text-white bg-white dark:bg-gray-800"
                      >
                        Fresher
                      </option>
                      <option
                        value="Experience"
                        className="text-black dark:text-white bg-white dark:bg-gray-800"
                      >
                        Experience
                      </option>
                    </select>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={field.name}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={formVariants}
                  className="flex flex-col gap-1"
                >
                  <label className="text-sm text-gray-200">
                    {field.label} <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    placeholder={field.label}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    disabled={
                      field.name === "role" || field.name === "description"
                        ? true
                        : !canApply
                    }
                    className="bg-transparent border-b border-gray-300 focus:border-orange-400 transition outline-none text-white py-2 placeholder-gray-300"
                  />
                </motion.div>
              );
            })}

            {/* Show Years of Experience conditionally */}
            {formData.experience === "Experience" && (
              <motion.div
                custom={10}
                initial="hidden"
                animate="visible"
                variants={formVariants}
                className="flex flex-col gap-1"
              >
                <label className="text-sm text-gray-200">
                  How many years of experience?{" "}
                  <span className="text-red-400">*</span>
                </label>
                <input
                  type="number"
                  min={0}
                  name="experienceYears"
                  required
                  disabled={!canApply}
                  value={formData.experienceYears}
                  onChange={handleChange}
                  placeholder="Enter years of experience"
                  className="bg-transparent border-b border-gray-300 focus:border-orange-400 transition outline-none text-white py-2 placeholder-gray-300"
                />
              </motion.div>
            )}

            <motion.div
              custom={12}
              initial="hidden"
              animate="visible"
              variants={formVariants}
            >
              <button
                type="submit"
                disabled={submitting || !canApply || !user}
                className={`w-full py-3 rounded-lg bg-gradient-to-r from-orange-600 to-amber-700 font-medium transition ${
                  submitting || !canApply || !user
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:scale-[1.03] hover:shadow-lg"
                }`}
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>

      {toast && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-bounce">
          Application Submitted Successfully 🎉
        </div>
      )}
    </motion.div>
  );
};

export default JobApplicationForm;
