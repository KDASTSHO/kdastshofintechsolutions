// src/pages/BlogPost.js
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FooterBanner from "../components/FooterBanner";

export default function BlogPost() {
    return (
        <>
            <main className="pt-24 min-h-screen bg-[#FFF3EA]">
                <div className="max-w-4xl mx-auto px-6 py-12">

                    {/* ARTICLE */}
                    <article
                        className="bg-white rounded-xl shadow-lg p-10 border border-[#F8D5C5]"
                        style={{
                            boxShadow:
                                "0 8px 20px rgba(255, 176, 158, 0.25), 0 4px 10px rgba(0,0,0,0.05)",
                        }}
                    >
                       

                        <header className="mb-6">
                            <h1 className="text-3xl md:text-4xl font-bold leading-tight"
                                style={{ color: "#6B4EFF" }}>
                                Nifty 50 & Bank Nifty Outlook | Week 50: December 8–12, 2025
                            </h1>

                            <p className="text-sm mt-2" style={{ color: "#9A8FAE" }}>
                                Indian equities step into Week 50 in a phase of tight consolidation.
                            </p>
                        </header>

                        <section className="prose prose-md max-w-none text-gray-800 mb-6">

                            <p>
                                Indian equities step into Week 50 in a phase of tight consolidation.
                                Strong domestic inflows continue to cushion downside moves, even as
                                global uncertainty keeps markets capped in a narrow range. Here is
                                your comprehensive weekly outlook.
                            </p>

                            {/* Centered Image */}
                            <div className="w-full flex justify-center my-6">
                                <img
                                    src="/images/blogpost.jpg"
                                    alt="Market Candlestick Chart"
                                    className="max-w-md w-full rounded-lg shadow"
                                />
                            </div>

                            {/* Section headings now purple */}
                            <h2 style={{ color: "#4B2E83" }}>Guarded Optimism Amid Tight Consolidation</h2>

                            <p>
                                The Nifty 50 ended Week 49 nearly flat despite the RBI’s surprise
                                25 bps rate cut...
                            </p>

                            <h3 style={{ color: "#6B4EFF" }}>Expected Nifty Trading Range</h3>
                            <ul>
                                <li><strong>Support:</strong> 25,900</li>
                                <li><strong>Resistance:</strong> 26,300</li>
                                <li><strong>Breakout Trigger:</strong> Close above 26,450</li>
                                <li><strong>Breakdown Risk:</strong> Close below 25,750</li>
                            </ul>

                            <p>
                                Domestic Institutional Investors continue to offer solid downside protection...
                            </p>

                            <h3 style={{ color: "#6B4EFF" }}>Watching for Reversal Signals</h3>

                            <p>
                                Bank Nifty touched a new all-time high at <strong>60,114</strong>, but closed flat...
                            </p>

                            <h3 style={{ color: "#6B4EFF" }}>GLOBAL CUES: All Eyes on the US FED</h3>

                            <h4 style={{ color: "#4B2E83" }}>Possible Scenarios</h4>
                            <ul>
                                <li><strong>Dovish:</strong> Nifty could break above 26,450</li>
                                <li><strong>Hawkish:</strong> Risk of slipping below 25,750</li>
                            </ul>

                            <h4 style={{ color: "#4B2E83" }}>Other Global Events to Track</h4>
                            <ul>
                                <li>China Trade Balance</li>
                                <li>Brazil Inflation Data</li>
                            </ul>

                            <p>
                                With indices locked in a tight zone, non-directional derivative strategies remain attractive.
                            </p>

                            <h3 style={{ color: "#6B4EFF" }}>Featured Strategy: Short Strangle</h3>
                            <ul>
                                <li>Sell 26,500 CE (OTM)</li>
                                <li>Sell 25,700 PE (OTM)</li>
                            </ul>

                            <p className="italic text-sm">
                                Strict stop-loss if Nifty breaks 25,750 or 26,450.
                            </p>

                            <h3 style={{ color: "#6B4EFF" }}>NBFCs & Real Estate Outperform</h3>

                            <p>
                                The RBI’s rate cut enhances prospects for NBFCs and Real Estate...
                            </p>

                            <h3 style={{ color: "#6B4EFF" }}>Structural Trend to Watch: Gold ETFs</h3>
                            <ul>
                                <li>AUM surpasses ₹1 lakh crore</li>
                                <li>₹27,500+ crore inflows</li>
                            </ul>

                            <h3 style={{ color: "#6B4EFF" }}>Operational Alert</h3>
                            <p>
                                NSE will reduce lot sizes effective Dec 30, 2025...
                            </p>

                            <h3 style={{ color: "#6B4EFF" }}>Conclusion</h3>

                            <p>
                                Indian markets remain structurally strong but tactically range-bound...
                            </p>

                            <h3 className="mt-6" style={{ color: "#4B2E83" }}>Disclaimer</h3>
                            <p className="text-sm text-gray-500">
                                This article is for informational and educational purposes only...
                            </p>
                        </section>
                    </article>
                </div>
            </main>
        </>
    );
}