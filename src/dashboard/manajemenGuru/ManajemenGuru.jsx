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
  // DATA CARD (sementara 0)
  const stats = [
    {
      title: "Total Guru",
      value: 0,
      icon: <FaUserTie />,
      color: "from-indigo-500 to-indigo-700",
    },
    {
      title: "Mata Pelajaran",
      value: 0,
      icon: <FaBookOpen />,
      color: "from-purple-500 to-purple-700",
    },
    {
      title: "Total Jam Mengajar",
      value: "0 Jam",
      icon: <FaClock />,
      color: "from-blue-400 to-blue-500",
    },
  ];

  // DATA CHART (kosong dulu)
  const data = {
    labels: ["-", "-", "-", "-", "-"],
    datasets: [
      {
        label: "Total Jam",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "#4e73df",
        borderRadius: 8,
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
    <div className=" pt-24 p-6 bg-gray-100 min-h-screen">

      {/* CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`bg-gradient-to-r ${item.color} text-white rounded-xl p-6 shadow flex justify-between items-center`}
          >
            <div>
              <p className="text-sm opacity-80">{item.title}</p>
              <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
            </div>

            <div className="text-3xl bg-white/20 p-3 rounded-full">
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* CHART */}
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h2 className="font-semibold text-gray-700 mb-4">
          📊 Distribusi Jam Mengajar
        </h2>

        <Bar data={data} options={options} />
      </div>
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <h2 className="font-semibold text-gray-700 mb-4">
          📅 Jadwal Mingguan
        </h2>
        <div className="card-body p-0">
          <div className="table-responsive ">
            <table className="table table-bordered mb-0 table-hover">
              <thead className="table-light">
                <tr className="bg-blue-200">
                  <th>Hari</th>
                  <th>Jam</th>
                  <th>Mapel</th>
                  <th>Guru</th>
                  <th>Kelas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Senin</td>
                  <td>06:00-10:00</td>
                  <td>Bahasa Indonesia</td>
                  <td>Sakti Wicaksono</td>
                  <td>X TKJ</td>
                </tr>
                <tr>
                  <td>Senin</td>
                  <td>06:00-10:00</td>
                  <td>Bahasa Indonesia</td>
                  <td>Sakti Wicaksono</td>
                  <td>X TKJ</td>
                </tr>
                <tr>
                  <td>Senin</td>
                  <td>06:00-10:00</td>
                  <td>Bahasa Indonesia</td>
                  <td>Sakti Wicaksono</td>
                  <td>X TKJ</td>
                </tr>
                <tr>
                  <td>Senin</td>
                  <td>06:00-10:00</td>
                  <td>Bahasa Indonesia</td>
                  <td>Sakti Wicaksono</td>
                  <td>X TKJ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </div>
    </div>
    
  );
};

export default ManajemenGuru;