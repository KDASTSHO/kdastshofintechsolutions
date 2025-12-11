import React, { useState, useEffect } from "react";
import { FaSearch, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // ✅ ADDED
import AOS from "aos";
import "aos/dist/aos.css";

export default function CareersPage() {
  const [searchValue, setSearchValue] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const navigate = useNavigate(); // ✅ ADDED

  const jobs = [
    {
      title: "UI/UX Designer",
      desc: "Create outstanding user interfaces and intuitive user experiences.",
      img: "https://picsum.photos/800/600?1",
    },
    {
      title: "Frontend Developer",
      desc: "Build high-performance web apps using React and Tailwind.",
      img: "https://picsum.photos/800/600?2",
    },
    {
      title: "Backend Developer",
      desc: "Develop scalable APIs and microservices with Node.js.",
      img: "https://picsum.photos/800/600?3",
    },
    {
      title: "Mobile App Engineer",
      desc: "Craft smooth Android/iOS experiences using Flutter/React Native.",
      img: "https://picsum.photos/800/600?4",
    },
    {
      title: "QA Automation Engineer",
      desc: "Ensure product stability with strong test automation.",
      img: "https://picsum.photos/800/600?5",
    },
    {
      title: "Product Manager",
      desc: "Define product vision, sprint strategy and stakeholder roadmaps.",
      img: "https://picsum.photos/800/600?6",
    },
  ];

  useEffect(() => {
    setFilteredJobs(jobs);
    AOS.init({ duration: 900, once: true });
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        job.desc.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchValue]);

  return (
    <div className="w-full bg-[#F7F1EC] dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500">
      {/* ========================= HERO BANNER ========================= */}
      <section className="relative w-full h-screen flex items-center overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://res.cloudinary.com/dhpgznidl/video/upload/v1752660725/8201837-uhd_3840_2160_25fps_rgd2so.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-black/40 dark:bg-black/50"></div>

        <div className="relative z-10 w-full px-6 md:px-12 flex flex-col md:flex-row items-center justify-between h-full">
          <div className="text-left max-w-xl md:max-w-lg animate-bounce-slow">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
              Join the KDASTSHO FINTECH SOLUTIONS.
            </h1>
            <p className="text-white text-lg md:text-xl">
              Grow with us. Explore exciting opportunities.
            </p>
          </div>

          <div className="mt-6 md:mt-0 w-full md:w-96">
            <div className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-md px-4 py-3 w-full transition-colors duration-500">
              <FaSearch className="text-gray-500 dark:text-gray-300 text-lg mr-3" />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={`Search jobs like "UI/UX Designer"`}
                className="flex-1 outline-none text-gray-700 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 bg-transparent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========================= JOB LISTING GRID ========================= */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Open Positions</h2>

        {filteredJobs.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No jobs match your search.
          </p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="relative rounded-2xl overflow-hidden group cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
              >
                <img
                  src={job.img}
                  alt={job.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 dark:bg-black/40 flex flex-col justify-end p-6 backdrop-blur-sm">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {job.title}
                  </h3>
                  <p className="text-gray-200 text-sm mb-4">{job.desc}</p>

                  {/* ========= Apply Button with Navigation ========= */}
                  <button
                    className="bg-[#8D5A3A] hover:bg-[#7a4b2f] text-white px-5 py-2 rounded-full flex items-center gap-2 self-start transition-all duration-300"
                    onClick={() =>
                      navigate("/Applyform", {
                        state: { role: job.title, description: job.desc },
                      })
                    }
                  >
                    Apply <FaArrowRight className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <style>
        {`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2.2s infinite; }
        `}
      </style>
    </div>
  );
}
