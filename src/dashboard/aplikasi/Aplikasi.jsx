import React from "react";
import {
  RiUser3Line,
  RiImageLine,
  RiInformationLine,
  RiFileDownloadLine,
} from "react-icons/ri";

const Aplikasi = () => {
  const cards = [
    {
      title: "Total Users",
      total: 20,
      bg: "from-blue-500 to-blue-700",
      icon: <RiUser3Line size={40} />,
    },
    {
      title: "Total Banner Sekolah",
      total: 2,
      bg: "from-green-400 to-green-600",
      icon: <RiImageLine size={40} />,
    },
    {
      title: "Total Informasi Lembaga",
      total: 2,
      bg: "from-yellow-400 to-yellow-600",
      icon: <RiInformationLine size={40} />,
    },
    {
      title: "Total Backup File",
      total: 4,
      bg: "from-red-500 to-red-700",
      icon: <RiFileDownloadLine size={40} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center mb-8">
        Dashboard Statistik Aplikasi
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${card.bg} p-6 shadow-lg`}
          >
            {/* ICON */}
            <div className="absolute top-4 right-4 opacity-20 text-white">
              {card.icon}
            </div>

            {/* TITLE */}
            <h2 className="text-white text-sm font-semibold mb-4">
              {card.title}
            </h2>

            {/* TOTAL */}
            <h1 className="text-5xl font-bold text-white mb-8">
              {card.total}
            </h1>

            {/* SVG GRAPH */}
            <svg
              viewBox="0 0 300 80"
              preserveAspectRatio="none"
              className="absolute bottom-0 left-0 w-full h-20"
            >
              <path
                d="M0,60 C40,40 60,20 100,40 C140,60 160,0 200,40 C240,80 260,60 300,55"
                fill="rgba(255,255,255,0.2)"
              />

              <path
                d="M0,60 C40,40 60,20 100,40 C140,60 160,0 200,40 C240,80 260,60 300,55"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aplikasi;