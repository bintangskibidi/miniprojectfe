import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaFingerprint,
  FaCogs,
  FaSchool,
  FaClipboardList,
  FaMoneyBillWave,
} from "react-icons/fa";
import Aduca from "../assets/Aduca.png";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Yakin logout?",
      text: "Kamu akan keluar dari sistem",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4f46e5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, logout!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");

        Swal.fire({
          title: "Berhasil!",
          text: "Kamu telah logout",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    });
  };
  const menu = [
    {
      icon: <FaUserGraduate />,
      title: "Manajemen Siswa",
      path: "/dashboard/siswa",
    },
    {
      icon: <FaChalkboardTeacher />,
      title: "Manajemen Guru",
      path: "/dashboard/guru",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "Manajemen Keuangan",
      path: "/dashboard/keuangan",
    },
    {
      icon: <FaBookOpen />,
      title: "Perpustakaan Digital",
      path: "/dashboard/perpustakaan",
    },
    { icon: <FaFingerprint />, title: "Absensi RFID", path: "/absensi" },
    { icon: <FaCogs />, title: "Manajemen Aplikasi", path: "/aplikasi" },
    {
      icon: <FaSchool />,
      title: "Manajemen Sekolah",
      path: "/dashboard/profilesekolah",
    },
    { icon: <FaClipboardList />, title: "PPDB Online", path: "/ppdb" },
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
          backgroundColor: "#f8fafc",
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="flex justify-center">
          <div className="max-w-7xl w-full px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {menu.map((item, i) => (
                <div
                  key={i}
                  onClick={() => navigate(item.path)}
                  className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer border border-gray-100"
                >
                  {/* ICON */}
                  <div className="flex justify-center mb-4">
                    <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full text-3xl group-hover:scale-110 transition">
                      {item.icon}
                    </div>
                  </div>

                  {/* TITLE */}
                  <h2 className="text-md font-semibold text-gray-700 text-center group-hover:text-indigo-600 transition">
                    {item.title}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-auto bg-blue-900 text-gray-200 text-sm py-3 px-6 flex justify-between items-center">
        <p>© 2024 A-Count. All rights reserved.</p>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </footer>
    </div>
  );
};

export default Dashboard;
