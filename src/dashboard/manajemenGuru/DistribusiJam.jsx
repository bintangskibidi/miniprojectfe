import React, { useEffect, useState } from "react";
import api from "../../utils/api";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function DistribusiJam() {

  const [tahun, setTahun] = useState("2024/2025");
  const [dataGuru, setDataGuru] = useState([]);

  // ================= FETCH API =================
  const fetchDistribusiJam = async () => {
    try {

      const res = await api.get("/distribusi-jam", {
        params: {
          tahun_ajaran: tahun,
        },
      });

      setDataGuru(res.data.data || []);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDistribusiJam();
  }, [tahun]);

  // ================= CHART CONFIG =================
  const chartData = {
    labels: dataGuru.map((item) => item.nama),

    datasets: [
      {
        label: "Total Jam Mengajar",

        data: dataGuru.map(
          (item) => item.jam + item.menit / 60
        ),

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

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* TITLE */}
      <h1 className="text-2xl font-semibold mb-4">
        Distribusi Jam Mengajar
      </h1>

      {/* FILTER TAHUN AJARAN */}
      <div className="bg-white p-4 rounded-xl shadow mb-4">

        <label className="block mb-2 font-medium">
          Tahun Ajaran
        </label>

        <select
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          className="border p-2 rounded w-60"
        >
          <option value="2024/2025">
            2024/2025
          </option>

          <option value="2023/2024">
            2023/2024
          </option>

          <option value="2025/2026">
            2025/2026
          </option>

          <option value="2026/2027">
            2026/2027
          </option>
        </select>
      </div>

      {/* CHART */}
      <div className="bg-white p-4 rounded-xl shadow mb-4">

        <h2 className="font-semibold mb-3">
          Grafik Distribusi Jam Mengajar
        </h2>

        {dataGuru.length === 0 ? (
          <div className="text-gray-500 text-sm">
            Tidak ada data
          </div>
        ) : (
          <Bar data={chartData} options={options} />
        )}
      </div>

      {/* TABLE */}
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

              {dataGuru.length === 0 ? (

                <tr>
                  <td
                    colSpan={3}
                    className="text-center p-4 text-gray-500"
                  >
                    Tidak ada data
                  </td>
                </tr>

              ) : (

                dataGuru.map((item, index) => (

                  <tr
                    key={index}
                    className="hover:bg-gray-50"
                  >

                    <td className="p-2 border">
                      {index + 1}
                    </td>

                    <td className="p-2 border">
                      {item.nama}
                    </td>

                    <td className="p-2 border">
                      {item.jam} Jam {item.menit} Menit
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}