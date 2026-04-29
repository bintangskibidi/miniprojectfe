import React from "react";
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
  // DATA (contoh sesuai gambar)
  const stats = [
    {
      title: "Total Guru",
      value: 15,
      icon: <FaUserTie />,
      bg: "bg-blue-600",
    },
    {
      title: "Mata Pelajaran",
      value: 5,
      icon: <FaBookOpen />,
      bg: "bg-green-600",
    },
    {
      title: "Total Jam Mengajar",
      value: "14 Jam",
      icon: <FaClock />,
      bg: "bg-yellow-500",
    },
  ];

  const data = {
    labels: ["Eka Prasetyo", "Fitriani", "Bayu Aji lesmana eka putra"],
    datasets: [
      {
        label: "Total Jam",
        data: [5, 5, 4],
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
      legend: { display: false },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: "#e5e7eb" },
      },
      y: {
        grid: { display: false },
      },
    },
  };

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
              <p className="text-sm opacity-90">{item.title}</p>
              <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
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
          <Bar data={data} options={options} />
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
                <th className="p-2 border">Mata Pelajaran</th>
                <th className="p-2 border">Guru</th>
                <th className="p-2 border">Kelas</th>
              </tr>
            </thead>

            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="p-2 border">Senin</td>
                <td className="p-2 border">12:00 - 17:00</td>
                <td className="p-2 border">Bahasa Jawa</td>
                <td className="p-2 border">Eka Prasetyo</td>
                <td className="p-2 border">VII A</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="p-2 border">Selasa</td>
                <td className="p-2 border italic text-gray-400">
                  Tidak ada jadwal
                </td>
                <td className="p-2 border"></td>
                <td className="p-2 border"></td>
                <td className="p-2 border"></td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="p-2 border">Rabu</td>
                <td className="p-2 border">08:00 - 10:00</td>
                <td className="p-2 border">Bahasa Jepang</td>
                <td className="p-2 border">
                  Bayu Aji lesmana eka putra
                </td>
                <td className="p-2 border">VII A</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="p-2 border">Kamis</td>
                <td className="p-2 border">07:00 - 12:00</td>
                <td className="p-2 border">Bahasa Jawa</td>
                <td className="p-2 border">Fitriani</td>
                <td className="p-2 border">VII B</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="p-2 border">Jumat</td>
                <td className="p-2 border">10:00 - 12:00</td>
                <td className="p-2 border">
                  Pendidikan Agama Islam
                </td>
                <td className="p-2 border">
                  Bayu Aji lesmana eka putra
                </td>
                <td className="p-2 border">VII A</td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="p-2 border">Sabtu</td>
                <td className="p-2 border italic text-gray-400">
                  Tidak ada jadwal
                </td>
                <td className="p-2 border"></td>
                <td className="p-2 border"></td>
                <td className="p-2 border"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManajemenGuru;