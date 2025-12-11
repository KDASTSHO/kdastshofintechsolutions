// src/pages/BlogPost.js
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FooterBanner from "../components/FooterBanner";
import useTheme from "../hooks/useTheme";

export default function BlogPost() {
    const [darkMode] = useTheme();

    return (
        <>
            <main
                className={`pt-24 min-h-screen transition-all duration-300 ${
                    darkMode ? "bg-[#0F0A1F]" : "bg-[#FFF3EA]"
                }`}
            >
                <div className="max-w-4xl mx-auto px-6 py-12">
                    
                    {/* ARTICLE */}
                    <article
                        className={`rounded-xl p-10 border transition-all duration-300 ${
                            darkMode
                                ? "bg-[#1A1330] border-[#3A2F55] shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
                                : "bg-white border-[#F8D5C5] shadow-lg"
                        }`}
                        style={
                            darkMode
                                ? {}
                                : {
                                      boxShadow:
                                          "0 8px 20px rgba(255, 176, 158, 0.25), 0 4px 10px rgba(0,0,0,0.05)",
                                  }
                        }
                    >
                        {/* HEADER */}
                        <header className="mb-6">
                            <h1
                                className="text-3xl md:text-4xl font-bold leading-tight"
                                style={{ color: darkMode ? "#9F8CFF" : "#6B4EFF" }}
                            >
                                Nifty 50 & Bank Nifty Outlook | Week 50: December 8–12, 2025
                            </h1>

                            <p
                                className="text-sm mt-2"
                                style={{ color: darkMode ? "#B9AEE3" : "#9A8FAE" }}
                            >
                                Indian equities step into Week 50 in a phase of tight consolidation.
                            </p>
                        </header>

                        {/* CONTENT */}
                        <section
                            className={`prose prose-md max-w-none mb-6 ${
                                darkMode ? "text-gray-300" : "text-gray-800"
                            }`}
                        >
                            <p>
                                Indian equities step into Week 50 in a phase of tight consolidation.
                                Strong domestic inflows continue to cushion downside moves, even as
                                global uncertainty keeps markets capped in a narrow range.
                            </p>

                            {/* IMAGE */}
                            <div className="w-full flex justify-center my-6">
                                <img
                                    src="/images/blogpost.jpg"
                                    alt="Market Candlestick Chart"
                                    className="max-w-md w-full rounded-lg shadow"
                                />
                            </div>

                            {/* PURPLE HEADING */}
                            <h2 style={{ color: darkMode ? "#C7B8FF" : "#4B2E83" }}>
                                Guarded Optimism Amid Tight Consolidation
                            </h2>

                            <p>
                                The Nifty 50 ended Week 49 nearly flat despite the RBI’s surprise
                                25 bps rate cut...
                            </p>

                            <h3 style={{ color: darkMode ? "#B8A5FF" : "#6B4EFF" }}>
                                Expected Nifty Trading Range
                            </h3>

                            <ul>
                                <li><strong>Support:</strong> 25,900</li>
                                <li><strong>Resistance:</strong> 26,300</li>
                                <li><strong>Breakout Trigger:</strong> Close above 26,450</li>
                                <li><strong>Breakdown Risk:</strong> Close below 25,750</li>
                            </ul>

                            <p>
                                Domestic Institutional Investors continue to offer solid downside protection.
                            </p>

                            <h3 style={{ color: darkMode ? "#B8A5FF" : "#6B4EFF" }}>
                                Watching for Reversal Signals
                            </h3>

                            <p>
                                Bank Nifty touched a new all-time high at <strong>60,114</strong>, but closed flat...
                            </p>

                            <h3 style={{ color: darkMode ? "#B8A5FF" : "#6B4EFF" }}>
                                GLOBAL CUES: All Eyes on the US FED
                            </h3>

                            <h4 style={{ color: darkMode ? "#C7B8FF" : "#4B2E83" }}>
                                Possible Scenarios
                            </h4>

                            <ul>
                                <li><strong>Dovish:</strong> Nifty could break above 26,450</li>
                                <li><strong>Hawkish:</strong> Risk of slipping below 25,750</li>
                            </ul>

                            <h4 style={{ color: darkMode ? "#C7B8FF" : "#4B2E83" }}>
                                Other Global Events to Track
                            </h4>

                            <ul>
                                <li>China Trade Balance</li>
                                <li>Brazil Inflation Data</li>
                            </ul>

                            <p>
                                With indices locked in a tight zone, non-directional derivative 
                                strategies remain attractive.
                            </p>

                            <h3 style={{ color: darkMode ? "#B8A5FF" : "#6B4EFF" }}>
                                Featured Strategy: Short Strangle
                            </h3>

                            <ul>
                                <li>Sell 26,500 CE (OTM)</li>
                                <li>Sell 25,700 PE (OTM)</li>
                            </ul>

                            <p className="italic text-sm">
                                Strict stop-loss if Nifty breaks 25,750 or 26,450.
                            </p>

                            <h3 style={{ color: darkMode ? "#B8A5FF" : "#6B4EFF" }}>
                                NBFCs & Real Estate Outperform
                            </h3>

                            <p>The RBI’s rate cut enhances prospects for NBFCs and Real Estate...</p>

                            <h3 style={{ color: darkMode ? "#B8A5FF" : "#6B4EFF" }}>
                                Structural Trend to Watch: Gold ETFs
                            </h3>

                            <ul>
                                <li>AUM surpasses ₹1 lakh crore</li>
                                <li>₹27,500+ crore inflows</li>
                            </ul>

                            <h3 style={{ color: darkMode ? "#B8A5FF" : "#6B4EFF" }}>
                                Operational Alert
                            </h3>

                            <p>NSE will reduce lot sizes effective Dec 30, 2025...</p>

                            <h3 style={{ color: darkMode ? "#B8A5FF" : "#6B4EFF" }}>
                                Conclusion
                            </h3>

                            <p>Indian markets remain structurally strong but tactically range-bound...</p>

                            <h3
                                className="mt-6"
                                style={{ color: darkMode ? "#C7B8FF" : "#4B2E83" }}
                            >
                                Disclaimer
                            </h3>

                            <p
                                className={`text-sm ${
                                    darkMode ? "text-gray-400" : "text-gray-500"
                                }`}
                            >
                                This article is for informational and educational purposes only...
                            </p>
                        </section>
                    </article>
                </div>
            </main>
        </>
    );
}
