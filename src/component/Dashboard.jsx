
import React from "react";
import {
  FaUserGraduate,
  FaBell,
  FaChartLine,
  FaDollarSign,
  FaCalendarAlt,
  FaFileAlt,
} from "react-icons/fa";
import Aduca from "../assets/Aduca.png";

const Dashboard = () => {
  const menu = [
    { icon: <FaUserGraduate />, title: "Manajemen Siswa" },
    { icon: <FaBell />, title: "Manajemen Guru" },
    { icon: <FaChartLine />, title: "Perpustakaan" },
    { icon: <FaDollarSign />, title: "Keuangan" },
    { icon: <FaCalendarAlt />, title: "Aplikasi" },
    { icon: <FaFileAlt />, title: "PPDB" },
    { icon: <FaFileAlt />, title: "Manajemen Sekolah" },
    { icon: <FaFileAlt />, title: "Kepegawaian" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-6 bg-gradient-to-r from-orange-700 to-indigo-600 shadow-md fixed top-0 left-0 w-full z-50">
        
        <div className="flex items-center gap-3 text-white">
          <img
            src={Aduca}
            alt="logo"
            className="h-12 w-12 bg-white p-1 rounded-xl"
          />
          <div>
            <h1 className="text-xl font-bold">Aduca</h1>
            <p className="text-sm opacity-80">Sistem Manajemen Digital</p>
          </div>
        </div>

         

      </div>

      {/* CONTENT */}
      <main
        className="flex-1 pt-28 pb-10"
        style={{
          backgroundColor: "#e5e7eb",
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="flex justify-center">
          <div className="max-w-7xl w-full px-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
              
              {menu.map((item, i) => (
                <div
                  key={i}
                  className="w-full max-w-sm bg-gray-100 p-12 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition duration-300 cursor-pointer"
                >
                  <div className="text-indigo-600 text-6xl mb-5 flex justify-center">
                    {item.icon}
                  </div>

                  <h2 className="text-lg font-semibold text-gray-700 text-center">
                    {item.title}
                  </h2>
                </div>
              ))}

            </div>

          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-auto bg-blue-900 text-center text-gray-300 text-sm py-4">
        © 2024 A-Count. All rights reserved.Ambatukam
      </footer>

    </div>
  );
};

export default Dashboard;

