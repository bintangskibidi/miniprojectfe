import React, { useEffect, useMemo, useState } from "react";
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
  AreaChart,
  Area,
} from "recharts";

import api from "../../utils/api";

export default function DashboardSiswa() {
  const [loading, setLoading] = useState(true);

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
      setLoading(true);

      const [siswaRes, kelasRes, jurusanRes] = await Promise.all([
        api.get("/siswa"),
        api.get("/kelas"),
        api.get("/jurusan"),
      ]);

      const siswa = normalize(siswaRes.data);
      const kelas = normalize(kelasRes.data);
      const jurusan = normalize(jurusanRes.data);

      // =========================
      // STATISTIK
      // =========================

      const totalSiswa = siswa.length;

      const totalKelas = kelas.length;

      const totalJurusan = jurusan.length;

      const alumni = siswa.filter(
        (s) =>
          s.status?.toLowerCase() === "lulus"
      ).length;

      // dummy presensi
      const masukHariIni = Math.floor(
        totalSiswa * 0.82
      );

      const belumMasuk =
        totalSiswa - masukHariIni;

      const kegiatanHariIni = 3;

      setStats([
        {
          title: "Total Siswa",
          value: totalSiswa,
          icon: <RiGroupLine size={30} />,
          color:
            "from-blue-500 via-blue-600 to-indigo-600",
          bg: "bg-blue-100",
          text: "text-blue-600",
        },
        {
          title: "Total Kelas",
          value: totalKelas,
          icon: <RiHomeOfficeLine size={30} />,
          color:
            "from-cyan-500 via-sky-500 to-blue-500",
          bg: "bg-cyan-100",
          text: "text-cyan-600",
        },
        {
          title: "Total Jurusan",
          value: totalJurusan,
          icon: <RiBuildingLine size={30} />,
          color:
            "from-violet-500 via-purple-500 to-fuchsia-500",
          bg: "bg-violet-100",
          text: "text-violet-600",
        },
        {
          title: "Total Alumni",
          value: alumni,
          icon: <RiGraduationCapLine size={30} />,
          color:
            "from-emerald-500 via-green-500 to-lime-500",
          bg: "bg-emerald-100",
          text: "text-emerald-600",
        },
        {
          title: "Masuk Hari Ini",
          value: masukHariIni,
          icon: <RiLoginBoxLine size={30} />,
          color:
            "from-green-500 via-emerald-500 to-teal-500",
          bg: "bg-green-100",
          text: "text-green-600",
        },
        {
          title: "Belum Masuk",
          value: belumMasuk,
          icon: <RiUserUnfollowLine size={30} />,
          color:
            "from-yellow-400 via-amber-500 to-orange-500",
          bg: "bg-yellow-100",
          text: "text-yellow-600",
        },
        {
          title: "Kegiatan Hari Ini",
          value: kegiatanHariIni,
          icon: <RiCalendarEventLine size={30} />,
          color:
            "from-pink-500 via-rose-500 to-red-500",
          bg: "bg-pink-100",
          text: "text-pink-600",
        },
      ]);

      // =========================
      // CHART DATA
      // =========================

      const chart = [
        {
          day: "Sen",
          hadir: 220,
          izin: 12,
        },
        {
          day: "Sel",
          hadir: 235,
          izin: 8,
        },
        {
          day: "Rab",
          hadir: 240,
          izin: 5,
        },
        {
          day: "Kam",
          hadir: 228,
          izin: 10,
        },
        {
          day: "Jum",
          hadir: 245,
          izin: 4,
        },
        {
          day: "Sab",
          hadir: 210,
          izin: 14,
        },
        {
          day: "Min",
          hadir: 0,
          izin: 0,
        },
      ];

      setChartData(chart);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // PERSENTASE KEHADIRAN
  // =========================

  const attendancePercent = useMemo(() => {
    if (!stats.length) return 0;

    const hadir =
      stats.find(
        (x) => x.title === "Masuk Hari Ini"
      )?.value || 0;

    const total =
      stats.find(
        (x) => x.title === "Total Siswa"
      )?.value || 1;

    return ((hadir / total) * 100).toFixed(1);
  }, [stats]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 p-6">
      {/* HEADER */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard Manajemen Siswa
          </h1>

          <p className="text-slate-500 mt-1">
            Monitoring data siswa, kelas,
            jurusan dan absensi.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow px-5 py-3 border">
          <p className="text-sm text-slate-500">
            Kehadiran Hari Ini
          </p>

          <h2 className="text-2xl font-bold text-blue-600">
            {attendancePercent}%
          </h2>
        </div>
      </div>

      {/* CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-3xl shadow-lg bg-white border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* TOP */}
            <div
              className={`h-2 bg-gradient-to-r ${item.color}`}
            />

            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-sm">
                    {item.title}
                  </p>

                  <h2 className="text-4xl font-bold mt-3 text-slate-800">
                    {loading ? "..." : item.value}
                  </h2>
                </div>

                <div
                  className={`${item.bg} ${item.text} p-4 rounded-2xl`}
                >
                  {item.icon}
                </div>
              </div>
            </div>

            {/* DECORATION */}
            <div
              className={`absolute -right-8 -bottom-8 w-28 h-28 rounded-full opacity-10 bg-gradient-to-r ${item.color}`}
            />
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        {/* LINE CHART */}
        <div className="xl:col-span-2 bg-white rounded-3xl shadow-lg border p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-800">
              Grafik Absensi Mingguan
            </h2>

            <p className="text-sm text-slate-500">
              Statistik kehadiran siswa 7
              hari terakhir
            </p>
          </div>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.2}
              />

              <XAxis dataKey="day" />

              <YAxis allowDecimals={false} />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="hadir"
                stroke="#2563eb"
                strokeWidth={4}
                dot={{
                  r: 5,
                  strokeWidth: 2,
                  fill: "#fff",
                }}
                activeDot={{ r: 8 }}
                name="Hadir"
              />

              <Line
                type="monotone"
                dataKey="izin"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{
                  r: 4,
                }}
                name="Izin"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* AREA CHART */}
        <div className="bg-white rounded-3xl shadow-lg border p-6">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-slate-800">
              Trend Kehadiran
            </h2>

            <p className="text-sm text-slate-500">
              Ringkasan aktivitas siswa
            </p>
          </div>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <AreaChart data={chartData}>
              <defs>
                <linearGradient
                  id="colorHadir"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#3b82f6"
                    stopOpacity={0.8}
                  />

                  <stop
                    offset="95%"
                    stopColor="#3b82f6"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                opacity={0.2}
              />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="hadir"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorHadir)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}