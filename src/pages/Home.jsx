import React, { useState, useEffect } from "react";
import SpinWheel from "../components/SpinWheel.jsx";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

import FooterBanner from "../components/FooterBanner";


const demoSegments = [
  { id: "s2", name: "Better Luck", color: "#f97316", value: null },
  { id: "s3", name: "100K-Coins", color: "#f59e0b", value: null },
  { id: "s1", name: "Better Luck.", color: "#ef4444", value: null },
  { id: "s4", name: "50K-Coins", color: "#eab308", value: null },
  { id: "s5", name: "Shoe Reward", color: "#84cc16", value: null },
  { id: "s6", name: "Movie Ticket", color: "#06b6d4", value: null },
  { id: "s7", name: "VIP Pass", color: "#8b5cf6", value: null },
  { id: "s8", name: "Free Sample", color: "#ec4899", value: null },
];

export default function Home() {
  const [user, setUser] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [canSpin, setCanSpin] = useState(false);
  const [waitTime, setWaitTime] = useState(null);
  const [spinHistory, setSpinHistory] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      if (u) {
        setUser(u);
        await checkSpinAvailability(u.uid);
        await fetchSpinHistory(u.uid);
      } else {
        setUser(null);
        setCanSpin(false);
        setSpinHistory([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const checkSpinAvailability = async (uid) => {
    const spinRef = doc(db, "spins", uid);
    const spinSnap = await getDoc(spinRef);

    if (spinSnap.exists()) {
      const last = spinSnap.data().createdAt?.toDate().getTime();
      setLastResult(last);
    } else {
      setLastResult(null);
      setCanSpin(true);
    }
  };

  useEffect(() => {
    if (!user) {
      setCanSpin(false);
      setWaitTime("0h 0m 0s");
      return;
    }

    if (!lastResult) {
      setCanSpin(true);
      setWaitTime("0h 0m 0s");
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diffMs = now - lastResult;
      const diffHours = diffMs / (1000 * 60 * 60);

      if (diffHours >= 24) {
        setCanSpin(true);
        setWaitTime("0h 0m 0s");
        clearInterval(interval);
        return;
      }

      const remainingMs = 24 * 60 * 60 * 1000 - diffMs;
      const hours = Math.floor(remainingMs / (1000 * 60 * 60));
      const minutes = Math.floor(
        (remainingMs % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remainingMs % (1000 * 60)) / 1000);

      setCanSpin(false);
      setWaitTime(`${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [user, lastResult]);

  const fetchSpinHistory = async (uid) => {
    const spinsCol = collection(db, "spins_history", uid, "records");
    const q = query(spinsCol, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    const history = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    }));

    setSpinHistory(history);
  };

  const handleSpinComplete = async (result) => {
    setLastResult(result);
    if (!user) return;

    const spinRef = doc(db, "spins", user.uid);
    await setDoc(spinRef, {
      result: result.name,
      segmentId: result.id,
      color: result.color,
      createdAt: serverTimestamp(),
    });

    const historyRef = doc(
      collection(db, "spins_history", user.uid, "records")
    );
    await setDoc(historyRef, {
      result: result.name,
      segmentId: result.id,
      color: result.color,
      createdAt: serverTimestamp(),
    });

    await checkSpinAvailability(user.uid);
    await fetchSpinHistory(user.uid);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 via-amber-800 to-orange-900 text-slate-50 pt-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-4 pb-10 pt-8 sm:pt-10">
        <header className="w-full max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-orange-700 sm:text-sm">
            Promo wheel
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-orange-950 sm:text-4xl">
            Spin the Wheel &amp; Win
          </h1>

          {!user && (
            <p className="mt-2 text-red-400 font-semibold">
              ⚠ Login required to spin the wheel.
            </p>
          )}

          {user && !canSpin && (
            <p className="mt-2 text-sm font-bold text-black sm:text-base">
              You can spin again in {waitTime}.
            </p>
          )}
        </header>

        <main className="mt-6 flex w-full flex-col items-center gap-6 sm:mt-8">
          <section className="w-full flex flex-col items-center">
            <div className="w-full max-w-xl rounded-[2rem] bg-gradient-to-b from-amber-800/80 via-amber-700/80 to-orange-800/80 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/80 px-3 pb-5 pt-4 sm:px-5">
                <SpinWheel
                  segments={demoSegments}
                  onSpinComplete={handleSpinComplete}
                  disabledByAuth={!user || !canSpin}
                  waitTime={waitTime}
                />
              </div>
            </div>

            {lastResult && (
              <div className="mt-4 inline-flex items-center rounded-full border border-emerald-300 bg-emerald-50/90 px-4 py-1.5 text-xs text-emerald-800">
                Last result:{" "}
                <span className="ml-1 font-semibold">{lastResult.name}</span>
              </div>
            )}
          </section>

          {user && spinHistory.length > 0 && (
            <section className="mt-8 w-full max-w-xl">
              <h2 className="mb-3 text-lg font-semibold text-orange-100">
                Your Spin History
              </h2>
              <div className="flex flex-col gap-2">
                {spinHistory.map((spin) => (
                  <div
                    key={spin.id}
                    className="flex justify-between rounded-lg bg-slate-800/70 px-4 py-2 text-sm text-slate-200"
                  >
                    <span>{spin.result}</span>
                    <span>{spin.createdAt?.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* ✅ Footer Banner added just above footer */}
        <div className="w-full flex justify-center mt-10 mb-16">
          <div className="w-[92%] max-w-5xl">
            <FooterBanner />
          </div>
        </div>
      </div>
    </div>
  );
}
