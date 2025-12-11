// src/pages/MyApplications.jsx
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { motion } from "framer-motion";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "applications"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setApplications(list);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user)
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Please login to view applications
      </div>
    );

  return (
    <div className="min-h-screen px-6 py-10 md:px-20 dark:bg-gray-900 bg-gray-50 transition-colors">
      <motion.h2
        className="text-3xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Job Applications
      </motion.h2>

      {loading ? (
        <div className="text-center text-lg text-gray-600 dark:text-gray-300">
          Loading...
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300 text-lg">
          You haven't applied for any jobs yet.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {applications.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl shadow-lg p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {app.jobTitle}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {app.companyName}
              </p>

              <p className="mt-3 text-sm">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Applied on:
                </span>{" "}
                {app.createdAt?.toDate().toLocaleDateString()}
              </p>

              <p className="mt-2">
                <span className="font-semibold text-gray-700 dark:text-gray-300">
                  Status:
                </span>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    app.status === "Selected"
                      ? "bg-green-100 text-green-800"
                      : app.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {app.status || "Pending"}
                </span>
              </p>

              <button
                onClick={() => (window.location.href = `/job/${app.jobId}`)}
                className="mt-5 w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition"
              >
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
