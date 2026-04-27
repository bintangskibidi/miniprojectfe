import React, { useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DistribusiJam() {
  const [tahun, setTahun] = useState("2024/2025");

  // Dummy data (nanti ganti dari API)
  const dataGuru = [
    { nama: "Ambasatanic", jam: 5 },
    { nama: "Andre Nugroho", jam: 5 },
    { nama: "Bayu Aji mani", jam: 4 },
  ];

  // Chart config
  const chartData = {
    labels: dataGuru.map((item) => item.nama),
    datasets: [
      {
        label: "Total Jam Mengajar",
        data: dataGuru.map((item) => item.jam),
        backgroundColor: "#60a5fa",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* TITLE */}
      <h1 className="text-2xl font-semibold mb-4">
        Distribusi Jam Mengajar
      </h1>

      {/* CARD TAHUN AJARAN */}
      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <label className="block mb-2 font-medium">Tahun Ajaran</label>
        <select
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          className="border p-2 rounded w-60"
        >
          <option value="2024/2025">2024/2025</option>
          <option value="2023/2024">2023/2024</option>
        </select>
      </div>

      {/* CARD CHART */}
      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <h2 className="font-semibold mb-3">
          Grafik Distribusi Jam Mengajar
        </h2>
        <Bar data={chartData} options={options} />
      </div>

      {/* CARD TABLE */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-3">
          Tabel Distribusi Jam Mengajar
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">No</th>
                <th className="p-2 border">Nama Guru</th>
                <th className="p-2 border">Total Jam</th>
              </tr>
            </thead>
            <tbody>
              {dataGuru.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{item.nama}</td>
                  <td className="p-2 border">
                    {item.jam} Jam 0 Menit
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}