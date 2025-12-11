// src/components/EditProfile.jsx  (or src/pages/EditProfile.jsx — use your original path)
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useTheme from "../hooks/useTheme";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function EditProfile() {
  const [darkMode] = useTheme();
  const db = getFirestore();
  const auth = getAuth();

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
  ];
  const genders = ["Male", "Female", "Other"];

  // existing states
  const [bookedCalls, setBookedCalls] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const [selectedPage, setSelectedPage] = useState("profile");

  // new: rewards
  const [rewards, setRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState(null);
  const [showRewardModal, setShowRewardModal] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneCode: "+91",
    address: "",
    city: "",
    state: "",
    country: "India",
    cgpa: "",
    qualification: "",
    gender: "",
    certifications: [],
    skills: [],
    portfolioLink: "",
    githubLink: "",
    resumeLink: "",
  });

  // ---------- FETCH HELPERS ----------
  const fetchBookedCalls = async (userId) => {
    if (!userId) return;
    const paths = ["Calls_from_investments", "Calls_from_softwareDevelopment"];
    let allCalls = [];
    for (const path of paths) {
      const collectionRef = collection(db, path);
      const q = query(collectionRef, where("uid", "==", userId));
      const querySnap = await getDocs(q);
      const calls = querySnap.docs.map((d) => ({ id: d.id, ...d.data(), source: path }));
      allCalls = [...allCalls, ...calls];
    }
    setBookedCalls(allCalls);
  };

  const fetchApplications = async (id) => {
    if (!id) return;
    const appRef = collection(db, "applications");
    const q = query(appRef, where("uid", "==", id));
    const querySnap = await getDocs(q);
    const apps = querySnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setApplications(apps);
  };

  const fetchRegistrations = async (userId) => {
    if (!userId) return;
    const regRef = collection(db, "REGISTER_DEATILS_INVESTMENTS", userId, "user_registrations");
    const q = query(regRef, where("uid", "==", userId));
    const querySnap = await getDocs(q);
    const regs = querySnap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setRegistrations(regs);
  };

  // NEW: fetch rewards stored under users/{uid}/rewards
  const fetchRewards = async (userId) => {
    if (!userId) return;
    try {
      const rewardsRef = collection(db, "users", userId, "rewards");
      const q = query(rewardsRef);
      const qSnap = await getDocs(q);
      const items = qSnap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .sort((a, b) => {
          // sort latest first by createdAt if present
          const at = (x) => (x.createdAt?.toMillis ? x.createdAt.toMillis() : x.createdAt || 0);
          return at(b) - at(a);
        });
      setRewards(items);
    } catch (err) {
      console.error("Error fetching rewards:", err);
    }
  };

  // ---------- AUTH EFFECTS ----------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);

        // fetch profile
        const userRef = doc(db, "users", user.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) setUserData((prev) => ({ ...prev, ...snap.data() }));

        // fetch related data
        fetchApplications(user.uid);
        fetchRegistrations(user.uid);
        fetchBookedCalls(user.uid);
        fetchRewards(user.uid); // fetch rewards
      } else {
        setUid(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- FORM HANDLERS ----------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uid) return;
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, userData);
    alert("Profile updated successfully!");
  };

  // ---------- UI ----------
  if (loading)
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-gray-900" : "bg-amber-50"}`}>
        <p className={darkMode ? "text-white" : "text-stone-900"}>Loading...</p>
      </div>
    );

  // Open reward detail
  const openReward = (reward) => {
    setSelectedReward(reward);
    setShowRewardModal(true);
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? "bg-gray-900" : "bg-amber-50"} pt-24`}>
      {/* SIDEBAR */}
      <aside className="w-1/4 hidden md:flex flex-col bg-stone-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">My Account</h2>

        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => setSelectedPage("profile")}
            className={`text-left px-4 py-2 rounded-md ${selectedPage === "profile" ? "bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}
          >
            Edit Profile
          </button>

          <button
            onClick={() => setSelectedPage("registrations")}
            className={`text-left px-4 py-2 rounded-md ${selectedPage === "registrations" ? "bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}
          >
            My Registrations
          </button>

          <button
            onClick={() => setSelectedPage("applications")}
            className={`text-left px-4 py-2 rounded-md ${selectedPage === "applications" ? "bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}
          >
            My Applications
          </button>

          <button
            onClick={() => setSelectedPage("bookedCalls")}
            className={`text-left px-4 py-2 rounded-md ${selectedPage === "bookedCalls" ? "bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}
          >
            My Booked Calls
          </button>

          {/* NEW: My Rewards */}
          <button
            onClick={() => setSelectedPage("rewards")}
            className={`text-left px-4 py-2 rounded-md ${selectedPage === "rewards" ? "bg-gray-600" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}
          >
            My Rewards
            <span className="ml-2 inline-block rounded-full bg-white text-stone-800 px-2 text-xs font-semibold">
              {rewards.length}
            </span>
          </button>
        </nav>
      </aside>

      {/* RIGHT SIDE */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex-1 p-6 md:p-12 relative">
        {/* Avatar */}
        <div
          className={`absolute top-6 right-6 w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold border-2 ${
            darkMode ? "bg-gray-700 text-white border-gray-500" : "bg-gray-200 text-gray-900 border-gray-300"
          }`}
        >
          {userData.firstName ? userData.firstName.split(" ").map((n) => n[0]).join("").toUpperCase() : "NA"}
        </div>

        {/* PROFILE */}
        {selectedPage === "profile" && (
          <>
            <h1 className={`text-3xl font-bold mb-8 ${darkMode ? "text-white" : "text-stone-900"}`}>Edit Your Profile</h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* (Your existing profile form fields remain unchanged) */}
              <div className="flex flex-col md:flex-row gap-4">
                <input type="text" name="firstName" placeholder="First Name" value={userData.firstName} onChange={handleChange} className="flex-1 p-3 rounded-md border dark:border-gray-700 border-gray-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" name="lastName" placeholder="Last Name" value={userData.lastName} onChange={handleChange} className="flex-1 p-3 rounded-md border dark:border-gray-700 border-gray-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <input type="email" name="email" placeholder="Enter E-mail id" value={userData.email} onChange={handleChange} className="flex-1 p-3 rounded-md border dark:border-gray-700 border-gray-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <div className="flex flex-1 items-center rounded-md border dark:border-gray-700 border-gray-300 overflow-hidden bg-white dark:bg-gray-900">
                  <span className="px-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">{userData.phoneCode || "+91"}</span>
                  <input type="tel" name="phone" placeholder="Phone Number" value={userData.phone} onChange={handleChange} className="flex-1 p-3 bg-transparent text-gray-900 dark:text-white focus:outline-none" />
                </div>
              </div>

              <textarea name="address" placeholder="Address" rows="3" value={userData.address} onChange={handleChange} className="w-full p-3 rounded-md border dark:border-gray-700 border-gray-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>

              <div className="flex flex-col md:flex-row gap-4">
                <input type="text" name="city" placeholder="City" value={userData.city} onChange={handleChange} className="flex-1 p-3 rounded-md border dark:border-gray-700 border-gray-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <select name="state" value={userData.state} onChange={handleChange} className="flex-1 p-3 rounded-md border dark:border-gray-700 border-gray-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <option value="">Select State</option>
                  {indianStates.map((state) => (<option key={state} value={state}>{state}</option>))}
                </select>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <select name="gender" value={userData.gender} onChange={handleChange} className="flex-1 p-3 rounded-md border dark:border-gray-700 border-gray-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                  <option value="">Select Gender</option>
                  {genders.map((g) => (<option key={g} value={g}>{g}</option>))}
                </select>

                <input type="text" name="country" placeholder="Country" value={userData.country} onChange={handleChange} className="flex-1 p-3 rounded-md border dark:border-gray-700 border-gray-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <input type="text" name="portfolioLink" placeholder="Portfolio Link" value={userData.portfolioLink} onChange={handleChange} className="flex-1 p-3 rounded-md border dark:border-gray-700 border-gray-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="text" name="githubLink" placeholder="GitHub Link" value={userData.githubLink} onChange={handleChange} className="flex-1 p-3 rounded-md border dark:border-gray-700 border-gray-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <input type="text" name="resumeLink" placeholder="Resume Link (Drive / Web URL)" value={userData.resumeLink} onChange={handleChange} className="w-full p-3 rounded-md border dark:border-gray-700 border-gray-300 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />

              <div className="flex flex-col md:flex-row gap-4 mt-6">
                <button type="button" className="flex-1 py-3 px-6 rounded-md border border-gray-500 bg-gray-200 dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition">Cancel</button>
                <button type="submit" className="flex-1 py-3 px-6 rounded-md bg-stone-800 text-white hover:bg-stone-900 dark:bg-stone-700 dark:hover:bg-stone-600 transition">Update</button>
              </div>
            </form>
          </>
        )}

        {/* REGISTRATIONS */}
        {selectedPage === "registrations" && (
          <>
            <h1 className={`text-3xl font-bold mb-8 ${darkMode ? "text-white" : "text-stone-900"}`}>My Registrations</h1>
            {registrations.length === 0 ? (
              <p className={`text-lg ${darkMode ? "text-white" : "text-stone-900"}`}>⚠️ You haven't registered for any services yet.</p>
            ) : (
              <div className="space-y-6">
                {registrations.map((reg) => (
                  <div key={reg.id} className={`p-6 rounded-lg shadow-md border space-y-3 ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-stone-900"}`}>
                    <h2 className="text-2xl font-bold">{reg.serviceTitle}</h2>
                    <p><span className="font-semibold">Description:</span> {reg.serviceDescription}</p>
                    <p><span className="font-semibold">Includes:</span> {reg.serviceIncludes}</p>
                    <p><span className="font-semibold">Name:</span> {reg.firstName} {reg.lastName}</p>
                    <p><span className="font-semibold">Email:</span> {reg.email}</p>
                    <p><span className="font-semibold">Phone:</span> {reg.phone}</p>
                    <p><span className="font-semibold">Details:</span> {reg.details}</p>
                    <p><span className="font-semibold">Date:</span> {reg.date} | <span className="font-semibold">Time:</span> {reg.time}</p>
                    <p><span className="font-semibold">Registration ID:</span> {reg.uid}</p>
                    <p><span className="font-semibold">Application Status:</span> <span className="font-bold">{reg.status}</span></p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* BOOKED CALLS */}
        {selectedPage === "bookedCalls" && (
          <>
            <h1 className={`text-3xl font-bold mb-8 ${darkMode ? "text-white" : "text-stone-900"}`}>My Booked Calls</h1>
            {bookedCalls.length === 0 ? (
              <p className={`text-lg ${darkMode ? "text-white" : "text-stone-900"}`}>⚠️ You have no booked calls.</p>
            ) : (
              <div className="space-y-6">
                {bookedCalls.map((call) => (
                  <div key={call.id} className={`p-6 rounded-lg shadow-md border space-y-2 ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-stone-900"}`}>
                    <h2 className="text-2xl font-bold">{call.planTitle || call.solutionTitle}</h2>
                    <p><span className="font-semibold">Description:</span> {call.planDescription || call.solutionDescription}</p>
                    <p><span className="font-semibold">Name:</span> {call.name}</p>
                    <p><span className="font-semibold">Email:</span> {call.email}</p>
                    <p><span className="font-semibold">Phone:</span> {call.phone}</p>
                    {call.note && <p><span className="font-semibold">Note:</span> {call.note}</p>}
                    <p><span className="font-semibold">Status:</span> <span className="font-bold">{call.status}</span></p>
                    <p className="text-sm opacity-80">Booked On: {call.createdAt?.toDate ? call.createdAt.toDate().toLocaleString() : call.createdAt}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* APPLICATIONS */}
        {selectedPage === "applications" && (
          <>
            <h1 className={`text-3xl font-bold mb-8 ${darkMode ? "text-white" : "text-stone-900"}`}>My Applications</h1>
            {applications.length === 0 ? (
              <p className={`text-lg ${darkMode ? "text-white" : "text-stone-900"}`}>⚠️ You haven't applied to any jobs yet.</p>
            ) : (
              <div className="space-y-6">
                {applications.map((app) => (
                  <div key={app.id} className={`p-6 rounded-lg shadow-md border space-y-3 ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-stone-900"}`}>
                    <h2 className="text-2xl font-bold">{app.role || app.jobTitle}</h2>
                    <p className="opacity-80">{app.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mt-3">
                      <p><span className="font-semibold">Full Name:</span> {app.fullName}</p>
                      <p><span className="font-semibold">Email:</span> {app.email}</p>
                      <p><span className="font-semibold">Phone:</span> {app.phone}</p>
                      <p><span className="font-semibold">Experience:</span> {app.experience}</p>
                      {app.experience === "Experienced" && <p><span className="font-semibold">Experience Years:</span> {app.experienceYears}</p>}
                      <p><span className="font-semibold">Year Passed:</span> {app.yearPassed}</p>
                      <p><span className="font-semibold">Resume Link:</span> <a href={app.resumeLink} target="_blank" rel="noreferrer" className="text-blue-500 underline">View Resume</a></p>
                      <p><span className="font-semibold">Application ID:</span> {app.applicationID}</p>
                    </div>
                    <p className="text-sm opacity-80 mt-2">Applied On: {new Date(app.createdAt.seconds * 1000).toLocaleString()}</p>
                    <p className={`font-semibold mt-1 ${app.reviewStatus === "Selected" ? "text-green-500" : app.reviewStatus === "Rejected" ? "text-red-500" : "text-yellow-500"}`}>Status: {app.reviewStatus}</p>
                    {app.adminReview && <p className="mt-1 text-sm italic opacity-90"><span className="font-semibold">Admin Review:</span> {app.adminReview}</p>}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* NEW: REWARDS */}
        {selectedPage === "rewards" && (
          <>
            <h1 className={`text-3xl font-bold mb-8 ${darkMode ? "text-white" : "text-stone-900"}`}>My Rewards</h1>

            {rewards.length === 0 ? (
              <p className={`text-lg ${darkMode ? "text-white" : "text-stone-900"}`}>You have no rewards yet. Spin the wheel to win rewards!</p>
            ) : (
              <div className="space-y-4">
                {rewards.map((r) => (
                  <div key={r.id} className={`p-4 rounded-lg border flex items-center justify-between ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-stone-900"}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-md flex items-center justify-center" style={{ background: r.color || "#22c55e" }}>
                        {/* small color block */}
                      </div>
                      <div>
                        <div className="font-semibold">{r.name || r.title || "Reward"}</div>
                        <div className="text-xs opacity-80">{r.description || r.type || ""}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-xs text-gray-500">{r.createdAt?.toDate ? r.createdAt.toDate().toLocaleString() : (r.createdAt?.seconds ? new Date(r.createdAt.seconds * 1000).toLocaleString() : r.createdAt)}</div>
                      <button onClick={() => openReward(r)} className="px-3 py-1 rounded bg-[#8D5A3A] text-white text-sm">View</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Reward modal */}
        {showRewardModal && selectedReward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4" onClick={() => setShowRewardModal(false)}>
            <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900/95 p-5 text-sm text-slate-100 shadow-2xl shadow-black/70" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 flex-shrink-0 rounded-full" style={{ background: selectedReward.color || "#22c55e" }} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Reward</p>
                  <h2 className="text-lg font-bold leading-tight text-slate-50">{selectedReward.name || selectedReward.title || "Reward"}</h2>
                </div>
              </div>

              {selectedReward.description && <p className="mt-3 text-sm text-slate-200">{selectedReward.description}</p>}

              <div className="mt-4 flex justify-end gap-3">
                <button onClick={() => setShowRewardModal(false)} className="inline-flex items-center justify-center rounded-full border border-slate-600 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-slate-400 hover:text-white">Close</button>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
