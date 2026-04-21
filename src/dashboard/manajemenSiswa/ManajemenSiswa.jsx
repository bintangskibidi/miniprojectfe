import React from "react";
import {
  RiGroupLine,
  RiHomeOfficeLine,
  RiBuildingLine,
  RiGraduationCapLine,
  RiLoginBoxLine,
  RiUserUnfollowLine,
  RiCalendarEventLine,
} from "@remixicon/react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function DashboardSiswa() {
  // ===== DATA CARD =====
  const stats = [
    {
      title: "Total Siswa",
      value: 221,
      icon: <RiGroupLine size={28} />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Kelas",
      value: 11,
      icon: <RiHomeOfficeLine size={28} />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Jurusan",
      value: 3,
      icon: <RiBuildingLine size={28} />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Total Alumni",
      value: 6,
      icon: <RiGraduationCapLine size={28} />,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Masuk Hari Ini",
      value: 0,
      icon: <RiLoginBoxLine size={28} />,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Belum Masuk",
      value: 221,
      icon: <RiUserUnfollowLine size={28} />,
      color: "from-yellow-400 to-yellow-500",
    },
    {
      title: "Kegiatan Hari Ini",
      value: 0,
      icon: <RiCalendarEventLine size={28} />,
      color: "from-purple-500 to-purple-600",
    },
  ];

  // ===== DATA CHART =====
  const chartData = [
    { date: "15/04", hadir: 1 },
    { date: "16/04", hadir: 0 },
    { date: "17/04", hadir: 1 },
    { date: "18/04", hadir: 0 },
    { date: "19/04", hadir: 1 },
    { date: "20/04", hadir: 0 },
    { date: "21/04", hadir: 1 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* TITLE */}
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-8">
        Dashboard Manajemen Siswa
      </h1>

      {/* ===== CARD GRID ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${item.color} text-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center transition hover:-translate-y-1`}
          >
            {/* ICON */}
            <div className="bg-white/20 p-4 rounded-full mb-4">
              {item.icon}
            </div>

            {/* TITLE */}
            <p className="text-sm opacity-90">{item.title}</p>

            {/* VALUE */}
            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* ===== CHART ===== */}
      <div className="mt-10 bg-white p-6 rounded-2xl shadow">
        <h2 className="text-center text-lg font-semibold text-gray-700 mb-4">
          Grafik Absensi 7 Hari Terakhir
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />

            <Tooltip />
            <Legend />

            <Line
              type="monotone"
              dataKey="hadir"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}