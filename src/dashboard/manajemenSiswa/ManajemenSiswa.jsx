import React, { useEffect, useState } from "react";
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

import api from "../../utils/api";

export default function DashboardSiswa() {
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);

  const normalize = (res) => {
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.data)) return res.data.data;
    return [];
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [siswaRes, kelasRes, jurusanRes] = await Promise.all([
        api.get("/siswa"),
        api.get("/kelas"),
        api.get("/jurusan"),
      ]);

      const siswa = normalize(siswaRes.data);
      const kelas = normalize(kelasRes.data);
      const jurusan = normalize(jurusanRes.data);

      // ===== HITUNG DATA =====
      const totalSiswa = siswa.length;
      const totalKelas = kelas.length;
      const totalJurusan = jurusan.length;

      const alumni = siswa.filter(s => s.status === "lulus").length;

      // contoh sederhana (bisa lu ubah nanti)
      const masukHariIni = 0;
      const belumMasuk = totalSiswa - masukHariIni;

      // ===== SET CARD =====
      setStats([
        {
          title: "Total Siswa",
          value: totalSiswa,
          icon: <RiGroupLine size={28} />,
          color: "from-blue-500 to-blue-600",
        },
        {
          title: "Total Kelas",
          value: totalKelas,
          icon: <RiHomeOfficeLine size={28} />,
          color: "from-blue-500 to-blue-600",
        },
        {
          title: "Total Jurusan",
          value: totalJurusan,
          icon: <RiBuildingLine size={28} />,
          color: "from-blue-500 to-blue-600",
        },
        {
          title: "Total Alumni",
          value: alumni,
          icon: <RiGraduationCapLine size={28} />,
          color: "from-blue-500 to-blue-600",
        },
        {
          title: "Masuk Hari Ini",
          value: masukHariIni,
          icon: <RiLoginBoxLine size={28} />,
          color: "from-green-500 to-green-600",
        },
        {
          title: "Belum Masuk",
          value: belumMasuk,
          icon: <RiUserUnfollowLine size={28} />,
          color: "from-yellow-400 to-yellow-500",
        },
        {
          title: "Kegiatan Hari Ini",
          value: 0,
          icon: <RiCalendarEventLine size={28} />,
          color: "from-purple-500 to-purple-600",
        },
      ]);

      // ===== CHART DUMMY DINAMIS =====
      // sementara ambil dari jumlah siswa biar gak kosong
      const dummyChart = Array.from({ length: 7 }).map((_, i) => ({
        date: `Day ${i + 1}`,
        hadir: Math.floor(Math.random() * totalSiswa),
      }));

      setChartData(dummyChart);

    } catch (err) {
      console.error("Error dashboard:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-8">
        Dashboard Manajemen Siswa
      </h1>

      {/* CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${item.color} text-white rounded-2xl p-6 shadow-lg flex flex-col items-center justify-center transition hover:-translate-y-1`}
          >
            <div className="bg-white/20 p-4 rounded-full mb-4">
              {item.icon}
            </div>

            <p className="text-sm opacity-90">{item.title}</p>
            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* CHART */}
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