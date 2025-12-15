import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAllowed(false);
        setLoading(false);
        return;
      }

      const email = user.email?.toLowerCase().trim();

      // ✅ ADMIN EMAIL CHECK
      if (email === "ceo@kdastshofintechsolutions.com") {
        setAllowed(true);
      } else {
        setAllowed(false);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return null; // or loader

  if (!allowed) {
    return <Navigate to="/" replace />;
  }

  return children;
}

