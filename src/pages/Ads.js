// src/pages/AdvertisementPortal.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import {
  FaBullhorn,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaSpinner,
} from "react-icons/fa";

const plans = [
  {
    title: "Basic",
    price: "₹99 / day",
    features: ["24 hrs visibility", "Website promotion", "Fast Approval"],
    color: "bg-blue-500",
  },
  {
    title: "Standard",
    price: "₹399 / 3 days",
    features: ["High visibility", "Prime placement", "Brand awareness boost"],
    color: "bg-purple-500",
  },
  {
    title: "Premium",
    price: "₹699 / 1 week",
    features: ["Top position", "Maximum reach", "Full priority & support"],
    color: "bg-yellow-500",
  },
];

export default function AdvertisementPortal() {
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        getUserAds(user.uid);
      } else {
        setUser(null);
      }
    });
  }, []);

  const getUserAds = async (uid) => {
    const q = query(collection(db, "request_Ads"), where("uid", "==", uid));
    const snap = await getDocs(q);
    setAds(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const handleSubmit = async () => {
    if (!user) return alert("Please login to submit advertisement.");
    if (!selectedPlan) return alert("Please select a plan.");
    if (!email || !contact || !image || !description)
      return alert("All fields are required.");

    setLoading(true);
    await addDoc(collection(db, "request_Ads"), {
      uid: user.uid,
      email,
      contact,
      image,
      description,
      plan: selectedPlan.title,
      price: selectedPlan.price,
      status: "Pending",
      createdAt: serverTimestamp(),
    });
    setLoading(false);
    alert("Advertisement request submitted!");
    getUserAds(user.uid);
    setEmail("");
    setContact("");
    setImage("");
    setDescription("");
  };

  return (
    <div className="pt-[90px] px-4 text-gray-900 dark:text-white transition-all">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <FaBullhorn className="inline mr-3 text-blue-500" />
        Advertise With Us
      </motion.h1>

      {/* Pricing Plans */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
        {plans.map((p, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`rounded-2xl p-6 shadow-xl cursor-pointer border 
              ${selectedPlan?.title === p.title ? "ring-4 ring-green-400" : ""}
              ${p.color} text-white`}
            onClick={() => setSelectedPlan(p)}
          >
            <h2 className="text-2xl font-bold">{p.title}</h2>
            <p className="text-xl mt-2 font-semibold">{p.price}</p>
            <ul className="mt-4 space-y-1">
              {p.features.map((f, i) => (
                <li key={i}>✔ {f}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Submit Form */}
      <div className="max-w-3xl mx-auto mb-20 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-5">Submit Advertisement</h2>

        {user ? (
          <>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label>Email</label>
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <FaEnvelope className="mr-2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent outline-none w-full"
                  />
                </div>
              </div>

              <div>
                <label>Contact Number</label>
                <div className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <FaPhone className="mr-2" />
                  <input
                    type="tel"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="bg-transparent outline-none w-full"
                  />
                </div>
              </div>
            </div>

            <label className="mt-5 block">Advertisement Image URL</label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-lg outline-none mb-3"
            />

            <label>Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-700 p-3 rounded-lg outline-none"
            ></textarea>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="mt-5 w-full py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold text-white"
            >
              {loading ? (
                <FaSpinner className="animate-spin mx-auto" />
              ) : (
                "Submit Advertisement"
              )}
            </button>
          </>
        ) : (
          <p className="text-center font-semibold">
            🔒 Login required to submit advertisement.
          </p>
        )}
      </div>

      {/* User Dashboard */}
      {user && (
        <div className="max-w-5xl mx-auto mb-32">
          <h2 className="text-3xl font-bold mb-6">📌 My Advertisements</h2>
          {ads.length === 0 ? (
            <p>No advertisements submitted yet.</p>
          ) : (
            <div className="grid gap-6">
              {ads.map((a) => (
                <motion.div
                  key={a.id}
                  className="p-5 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>
                    <strong>Plan:</strong> {a.plan} ({a.price})
                  </p>
                  <p>
                    <strong>Contact:</strong> {a.contact}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`${
                        a.status === "Approved"
                          ? "text-green-500"
                          : "text-yellow-400"
                      }`}
                    >
                      {a.status}
                    </span>
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
