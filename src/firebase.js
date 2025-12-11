// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // ✅ add this line

const firebaseConfig = {
  apiKey: "AIzaSyAvPql2CnMOQa3lLhNblPghtGIDOrimveU",
  authDomain: "web-data-47f85.firebaseapp.com",
  projectId: "web-data-47f85",
  storageBucket: "web-data-47f85.firebasestorage.app",
  messagingSenderId: "573976663778",
  appId: "1:573976663778:web:f0d4c24207344750c370bb",
  measurementId: "G-TRGW0KNL3J",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Export everything needed across your app
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app); // ✅ added this
