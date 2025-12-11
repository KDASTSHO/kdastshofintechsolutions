import React, { useState } from "react";
import { Gift, Coins, ShoppingBag, Film } from "lucide-react";

export default function RewardsInfo() {
  const [dark, setDark] = useState(false);

  const rewards = [
    {
      id: 1,
      title: "Better Luck Next Time (×2)",
      icon: Gift,
      description:
        "These segments indicate no reward for the current spin. You can spin again after 24 hours to try for a reward.",
    },
    {
      id: 2,
      title: "K-Coin Reward (×2)",
      icon: Coins,
      description: `K-Coins are our digital reward currency.
• Each K-Coin holds a redemption value of ₹0.01.
• Use K-Coins for mobile recharges and across KdashTo products.
• Future products may also be purchased with K-Coins, subject to terms.
• Accumulated coins can be viewed and redeemed within your account.`,
    },
    {
      id: 3,
      title: "Shoe Reward (×1)",
      icon: ShoppingBag,
      description:
        "If you win this reward, submit your shipping address. The product will be dispatched within 15 days.",
    },
    {
      id: 4,
      title: "Movie Ticket Reward (×1)",
      icon: Film,
      description:
        "Winners receive a complimentary movie ticket. Ticket or redemption details will be delivered within 48 hours.",
    },
  ];

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors pt-[calc(var(--navbar-height,80px)+2rem)]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Rewards Section</h1>
          </div>

          {/* Description */}
          <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            As part of our customer engagement initiative, we have introduced an
            interactive rewards wheel. Upon participating, customers have the
            opportunity to receive one of six potential outcomes. The rewards
            are structured as follows:
          </p>

          {/* Rewards Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rewards.map((reward) => {
              const Icon = reward.icon;
              return (
                <div
                  key={reward.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col gap-4 hover:scale-105 transition-transform"
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={28}
                      className="text-indigo-500 dark:text-indigo-400"
                    />
                    <h2 className="text-lg md:text-xl font-semibold">
                      {reward.title}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {reward.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-xs text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} KdashTo — Rewards subject to
            availability.
          </footer>
        </div>
      </div>
    </div>
  );
}
