import React, { useEffect, useState } from "react";
import api from "../../utils/api";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { FaUserTie, FaBookOpen, FaClock } from "react-icons/fa";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const ManajemenGuru = () => {
  const [jadwal, setJadwal] = useState([]);
  const [guru, setGuru] = useState([]);
  const [mapel, setMapel] = useState([]);

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async () => {
    try {
      // jadwal
      const jadwalRes = await api.get("/jadwal");

      // dropdown
      const dropdownRes = await api.get("/jadwal/dropdown");

      const jadwalData = jadwalRes.data.data || [];
      const dropdownData =
        dropdownRes.data.data || dropdownRes.data;

      setJadwal(jadwalData);
      setGuru(dropdownData.guru || []);
      setMapel(dropdownData.mapel || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =========================
  // HITUNG TOTAL JAM
  // =========================
  const totalJam = jadwal.reduce((acc, item) => {
    if (!item.jam_mulai || !item.jam_selesai) return acc;

    const mulai = item.jam_mulai.split(":");
    const selesai = item.jam_selesai.split(":");

    const mulaiMenit =
      parseInt(mulai[0]) * 60 + parseInt(mulai[1]);

    const selesaiMenit =
      parseInt(selesai[0]) * 60 + parseInt(selesai[1]);

    return acc + (selesaiMenit - mulaiMenit);
  }, 0);

  const totalJamFormatted = `${Math.floor(totalJam / 60)} Jam`;

  // =========================
  // DISTRIBUSI JAM GURU
  // =========================
  const distribusiGuru = {};

  jadwal.forEach((item) => {
    if (!item.guru) return;

    const mulai = item.jam_mulai?.split(":");
    const selesai = item.jam_selesai?.split(":");

    if (!mulai || !selesai) return;

    const mulaiMenit =
      parseInt(mulai[0]) * 60 + parseInt(mulai[1]);

    const selesaiMenit =
      parseInt(selesai[0]) * 60 + parseInt(selesai[1]);

    const durasi = (selesaiMenit - mulaiMenit) / 60;

    distribusiGuru[item.guru] =
      (distribusiGuru[item.guru] || 0) + durasi;
  });

  // =========================
  // CARD STATS
  // =========================
  const stats = [
    {
      title: "Total Guru",
      value: guru.length,
      icon: <FaUserTie />,
      bg: "bg-blue-600",
    },
    {
      title: "Mata Pelajaran",
      value: mapel.length,
      icon: <FaBookOpen />,
      bg: "bg-green-600",
    },
    {
      title: "Total Jam Mengajar",
      value: totalJamFormatted,
      icon: <FaClock />,
      bg: "bg-yellow-500",
    },
  ];

  // =========================
  // CHART DATA
  // =========================
  const data = {
    labels: Object.keys(distribusiGuru),

    datasets: [
      {
        label: "Total Jam",
        data: Object.values(distribusiGuru),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
        barThickness: 18,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: "#e5e7eb",
        },
      },

      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  // =========================
  // GROUP JADWAL PER HARI
  // =========================
  const hariList = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block shadow">
        📁 Manajemen Guru
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`${item.bg} text-white rounded-lg p-5 shadow flex justify-between items-center`}
          >
            <div>
              <p className="text-sm opacity-90">
                {item.title}
              </p>

              <h2 className="text-2xl font-bold mt-1">
                {item.value}
              </h2>
            </div>

            <div className="text-2xl bg-white/20 p-3 rounded-full">
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="bg-white rounded-lg shadow border mb-6">
        <div className="px-4 py-2 border-b font-medium text-gray-700">
          📊 Distribusi Jam Mengajar
        </div>

        <div className="p-4">
          {Object.keys(distribusiGuru).length === 0 ? (
            <p className="text-gray-500 text-sm">
              Tidak ada data chart
            </p>
          ) : (
            <Bar data={data} options={options} />
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-4 py-2 border-b font-medium text-gray-700">
          📅 Jadwal Mengajar Mingguan
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-2 border">Hari</th>
                <th className="p-2 border">Jam</th>
                <th className="p-2 border">
                  Mata Pelajaran
                </th>
                <th className="p-2 border">Guru</th>
                <th className="p-2 border">Kelas</th>
              </tr>
            </thead>

            <tbody>
              {hariList.map((hari, index) => {
                const jadwalHari = jadwal.filter(
                  (j) => j.hari === hari
                );

                if (jadwalHari.length === 0) {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50"
                    >
                      <td className="p-2 border">
                        {hari}
                      </td>

                      <td className="p-2 border italic text-gray-400">
                        Tidak ada jadwal
                      </td>

                      <td className="p-2 border"></td>
                      <td className="p-2 border"></td>
                      <td className="p-2 border"></td>
                    </tr>
                  );
                }

                return jadwalHari.map((item, i) => (
                  <tr
                    key={`${hari}-${i}`}
                    className="hover:bg-gray-50"
                  >
                    <td className="p-2 border">
                      {i === 0 ? hari : ""}
                    </td>

                    <td className="p-2 border">
                      {item.jam_mulai} -{" "}
                      {item.jam_selesai}
                    </td>

                    <td className="p-2 border">
                      {item.mapel}
                    </td>

                    <td className="p-2 border">
                      {item.guru}
                    </td>

                    <td className="p-2 border">
                      {item.kelas}
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManajemenGuru;