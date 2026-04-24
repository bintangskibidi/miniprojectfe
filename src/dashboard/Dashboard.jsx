import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaLaptop,
  FaCogs,
  FaSchool,
  FaClipboardList,
  FaMoneyBillWave,
  FaSignOutAlt,
  FaIdCard,
} from "react-icons/fa";
import Aduca from "../../src/assets/Aduca.png";
import Swal from "sweetalert2";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Yakin logout?",
      text: "Kamu akan keluar dari sistem",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e40af", // Biru Aduca
      cancelButtonColor: "#f97316", // Orange Aduca
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
        setTimeout(() => navigate("/login"), 1500);
      }
    });
  };

  const menu = [
    { icon: <FaUserGraduate />, title: "Manajemen Siswa", path: "/dashboard/siswa" },
    { icon: <FaChalkboardTeacher />, title: "Manajemen Guru", path: "/dashboard/guru" },
    { icon: <FaMoneyBillWave />, title: "Keuangan", path: "/dashboard/keuangan" },
    { icon: <FaBookOpen />, title: "Perpustakaan", path: "/dashboard/perpustakaan" },
    { icon: <FaLaptop />, title: "Aplikasi", path: "/aplikasi" },
    { icon: <FaClipboardList />, title: "PPDB", path: "/ppdb" },
    { icon: <FaSchool />, title: "Manajemen Sekolah", path: "/dashboard/profilesekolah" },
    { icon: <FaIdCard />, title: "Kepegawaian", path: "/kepegawaian" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50">
      {/* HEADER (Style Aduca) */}
      <header className="bg-blue-900 px-8 py-4 flex justify-between items-center shadow-2xl relative overflow-hidden">
        {/* Ornamen Background Header */}
        <div className="absolute top-0 right-0 w-64 h-full bg-orange-500/10 skew-x-12 translate-x-20"></div>
        
        <div className="flex items-center gap-4 z-10">
          <img src={Aduca} alt="logo" className="h-12 w-12 bg-white p-1.5 rounded-xl shadow-lg" />
          <div className="text-white">
            <h1 className="text-2xl font-black tracking-tighter uppercase italic">Aduca</h1>
            <p className="text-xs font-bold text-blue-200 uppercase tracking-widest">Sistem Manajemen Sekolah</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-white z-10">
          <div className="text-right mr-3">
            <p className="text-xs opacity-70">Selamat Datang,</p>
            <p className="font-bold text-sm">Administrator</p>
          </div>
          <img src={Aduca} className="w-10 h-10 rounded-full border-2 border-orange-400 p-0.5 bg-white" alt="profile"/>
        </div>
      </header>

      {/* MAIN CONTENT (Grid View) */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: `radial-gradient(#1e40af 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-10">
          {menu.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(item.path)}
              className="group relative bg-white p-8 rounded-[32px] shadow-sm border border-slate-200 hover:border-orange-400 hover:shadow-2xl hover:shadow-blue-200 transition-all duration-300 cursor-pointer flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Hover Background Accent */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-50 rounded-full group-hover:scale-[5] transition-transform duration-500 ease-in-out -z-0"></div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="text-5xl text-blue-900 mb-5 group-hover:text-orange-500 group-hover:scale-110 transition-all duration-300">
                  {item.icon}
                </div>
                <h2 className="text-sm font-black text-slate-700 text-center uppercase tracking-tight group-hover:text-blue-900">
                  {item.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-blue-950 text-slate-400  text-[10px] py-4 px-10 flex justify-between items-center uppercase tracking-[0.2em] font-bold border-t border-white/5">
        <p>© 2026 A-Count. All rights reserved.</p>
        
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-5 py-2 rounded-xl transition-all duration-300 text-[10px]"
        >
          <FaSignOutAlt /> KELUAR SISTEM
        </button>
      </footer>
    </div>
  );
};

export default Dashboard;