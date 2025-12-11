import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";

export default function Dashboard() {
  const [data, setData] = useState({
    applications: [],
    contactDetails: [],
    ads: [],
    contacts: [],
    users: [],
    investorCalls: [],
    softwareCalls: [],
  });

  const [activeCollection, setActiveCollection] = useState("ads");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    const fetchCollection = async (collectionName) => {
      const q = query(
        collection(db, collectionName),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    };

    const fetchAll = async () => {
      const applications = await fetchCollection("applications");
      const contactDetails = await fetchCollection("contact_details");
      const ads = await fetchCollection("request_Ads");
      const contacts = await fetchCollection("contacts");
      const users = await fetchCollection("users");
      const investorCalls = await fetchCollection("Calls_from_investments");
      const softwareCalls = await fetchCollection(
        "Calls_from_softwareDevelopment"
      );

      setData({
        applications,
        contactDetails,
        ads,
        contacts,
        users,
        investorCalls,
        softwareCalls,
      });
    };

    fetchAll();
  }, []);

  const collections = [
    { key: "applications", label: "Applications" },
    { key: "contactDetails", label: "Contact Details" },
    { key: "ads", label: "Requested Ads" },
    { key: "contacts", label: "Contacts" },
    { key: "users", label: "Users" },
    { key: "investorCalls", label: "Booked Calls from Investors" },
    { key: "softwareCalls", label: "Software Development Calls" },
  ];

  const handleReviewUpdate = async (id, value) => {
    try {
      const collectionMap = {
        ads: { firestore: "request_Ads", field: "status" },
        contactDetails: { firestore: "contact_details", field: "status" },
        investorCalls: {
          firestore: "Calls_from_investments",
          field: "status",
        },
        softwareCalls: {
          firestore: "Calls_from_softwareDevelopment",
          field: "status",
        },
        applications: { firestore: "applications", field: "reviewStatus" },
        contacts: { firestore: "contacts", field: "status" },
        users: { firestore: "users", field: "status" },
      };

      const { firestore, field } = collectionMap[activeCollection];

      await updateDoc(doc(db, firestore, id), { [field]: value });

      setData((prev) => ({
        ...prev,
        [activeCollection]: prev[activeCollection].map((item) =>
          item.id === id ? { ...item, [field]: value } : item
        ),
      }));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const filteredData = data[activeCollection]
    .filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((item) => {
      if (!statusFilter) return true;
      const checkField =
        activeCollection === "applications" ? item.reviewStatus : item.status;
      return checkField?.toLowerCase() === statusFilter.toLowerCase();
    });

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-white dark:bg-gray-900 shadow-md h-16 flex items-center px-6">
        <h1 className="text-2xl font-bold dark:text-white">Admin Dashboard</h1>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <aside className="bg-white dark:bg-gray-800 w-64 flex-shrink-0 p-4 shadow-md overflow-y-auto">
          {collections.map((col) => (
            <button
              key={col.key}
              onClick={() => setActiveCollection(col.key)}
              className={`w-full text-left p-2 mb-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition ${
                activeCollection === col.key
                  ? "bg-blue-500 text-white"
                  : "dark:text-white"
              }`}
            >
              {col.label} ({data[col.key].length})
            </button>
          ))}
        </aside>

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-4 flex-col md:flex-row gap-2">
            <h2 className="text-xl font-semibold dark:text-white">
              {collections.find((c) => c.key === activeCollection).label}
            </h2>
            <div className="flex gap-2 flex-col sm:flex-row">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 rounded shadow border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />

              {(activeCollection === "ads" ||
                activeCollection === "applications") && (
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 rounded shadow border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Progressing">Progressing</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              )}
            </div>
          </div>

          <Section>
            <Table
              data={filteredData}
              updateReview={handleReviewUpdate}
              activeCollection={activeCollection}
              onRowClick={setSelectedRow}
            />
          </Section>
        </main>
      </div>

      {selectedRow && (
        <Modal row={selectedRow} onClose={() => setSelectedRow(null)} />
      )}
    </div>
  );
}

const Section = ({ children }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
    {children}
  </div>
);

const Table = ({ data, updateReview, activeCollection, onRowClick }) => {
  if (data.length === 0)
    return <p className="dark:text-white">No data available.</p>;

  const columns = Object.keys(data[0]);

  const fieldName =
    activeCollection === "applications" ? "reviewStatus" : "status";

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-200 text-yellow-800";
      case "Progressing":
        return "bg-blue-200 text-blue-800";
      case "Accepted":
        return "bg-green-200 text-green-800";
      case "Rejected":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="p-2 border border-gray-300 dark:border-gray-600 text-left"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => onRowClick(row)}
            >
              {columns.map((col) => (
                <td
                  key={col}
                  className="p-2 border border-gray-300 dark:border-gray-600"
                >
                  {col === fieldName ? (
                    <select
                      value={row[fieldName] || "Pending"}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateReview(row.id, e.target.value)}
                      className={`p-1 rounded ${getStatusClass(
                        row[fieldName] || "Pending"
                      )}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Progressing">Progressing</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  ) : row[col]?.seconds ? (
                    new Date(row[col].seconds * 1000).toLocaleString()
                  ) : Array.isArray(row[col]) ? (
                    row[col].join(", ")
                  ) : row[col] ? (
                    row[col].toString()
                  ) : (
                    "-"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Modal = ({ row, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl p-6 relative overflow-auto max-h-[90vh]">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300"
      >
        ✖
      </button>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.keys(row).map((key) => (
          <div
            key={key}
            className="p-2 border rounded border-gray-300 dark:border-gray-600"
          >
            <p className="font-semibold dark:text-gray-300">{key}</p>
            <p className="dark:text-white">
              {Array.isArray(row[key])
                ? row[key].join(", ")
                : row[key]?.seconds
                ? new Date(row[key].seconds * 1000).toLocaleString()
                : row[key]?.toString() || "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);
