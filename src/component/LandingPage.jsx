import { FaUserGraduate, FaChalkboardTeacher, FaChartLine, FaBell, FaDollarSign, FaCalendarAlt, FaFileAlt } from "react-icons/fa";
import ohim from "../assets/ohim.png"

function LandingPage() {
  return (
    <div className="font-sans">
      
      {/* NAVBAR */}
      <div className="flex justify-between items-center px-12 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">EduSys</h1>

        <ul className="flex gap-8 text-gray-600 font-medium">
          <li className="hover:text-indigo-600 cursor-pointer">Beranda</li>
          <li className="hover:text-indigo-600 cursor-pointer">Tentang</li>
          <li className="hover:text-indigo-600 cursor-pointer">Modul</li>
          <li className="hover:text-indigo-600 cursor-pointer">Harga</li>
        </ul>

        <button className="bg-gradient-to-r from-indigo-500 to-cyan-500 text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition">
          Get Demo
        </button>
      </div>

      {/* HERO */}
      <div className="flex flex-col md:flex-row items-center justify-between px-12 py-20 bg-gradient-to-br from-indigo-50 to-cyan-100">
        
        <div className="max-w-xl">
          <span className="text-sm text-indigo-500 font-semibold">
            Trusted School System
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-indigo-700 leading-tight mt-3 mb-6">
            Digitalisasi Sekolah Jadi Lebih Mudah
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            Kelola administrasi, siswa, dan keuangan dalam satu platform modern.
          </p>

          <div className="flex gap-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow hover:bg-indigo-700 transition">
              Mulai Sekarang
            </button>

            <button className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-600 hover:text-white transition">
              Lihat Demo
            </button>
          </div>
        </div>

        <div className="mt-10 md:mt-0 bg-white p-4 rounded-2xl shadow-xl">
<img src={ohim} alt="ohim" className="w-150 rounded-xl"/>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-12 bg-white">
        <div>
          <h2 className="text-4xl font-bold text-indigo-600">1000+</h2>
          <p className="text-gray-500 mt-2">Pengguna Aktif</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-indigo-600">500+</h2>
          <p className="text-gray-500 mt-2">Sekolah Terdaftar</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-indigo-600">24/7</h2>
          <p className="text-gray-500 mt-2">Support System</p>
        </div>
</div>
      <div className="my-10 px-12">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text py-2 bg-gradient-to-r from-indigo-600 to-cyan-300 mb-12">
          Fitur Unggulan
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="max-w-md bg-white rounded-2xl border-2 hover:border-blue-500 border-indigo-500 p-6 shadow-lg transform transition-transform duration-300 hover:scale-105">
                  <FaUserGraduate className="text-indigo-600 text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 mx-auto">Manajemen Siswa</h2>
          <p className="text-gray-600">
            Memudahkan pencatatan data siswa, absensi, dan nilai dalam satu platform
            yang terintegrasi.
          </p>
        </div>
                <div className="max-w-md bg-white rounded-2xl border-2 hover:border-blue-500 border-indigo-500 p-6 shadow-lg transform transition-transform duration-300 hover:scale-105">
                  <FaBell className="text-indigo-600 text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Pengumuman dan Notifikasi</h2>
          <p className="text-gray-600">
            Memudahkan guru dan siswa menerima info penting secara real-time.
          </p>
        </div>
                <div className="max-w-md bg-white rounded-2xl border-2 hover:border-blue-500 border-indigo-500 p-6 shadow-lg transform transition-transform duration-300 hover:scale-105">
                  <FaChartLine className="text-indigo-600 text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-indigo-700 mb-4">Analitik & Laporan Sekolah</h2>
          <p className="text-gray-600">
            Bisa menampilkan statistik kehadiran, performa siswa, atau laporan keuangan secara visual.
          </p>
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-3">
                <div className="max-w-md bg-white rounded-2xl border-2 hover:border-blue-500 border-indigo-500 p-6 shadow-lg transform transition-transform duration-300 hover:scale-105">
                  <FaDollarSign className="text-indigo-600 text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 mx-auto text-nowrap">Manajemen Keuangan</h2>
          <p className="text-gray-600">
            Memudahkan pencatatan pemasukan dan pengeluaran sekolah, pembuatan laporan keuangan secara otomatis, serta pemantauan anggaran dan keuangan secara realtime.
          </p>
        </div>
                <div className="max-w-md bg-white rounded-2xl border-2 hover:border-blue-500 border-indigo-500 p-6 shadow-lg transform transition-transform duration-300 hover:scale-105">
                  <FaCalendarAlt className="text-indigo-600 text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 mx-auto">Jadwal & Kalender Sekolah</h2>
          <p className="text-gray-600">
            Memudahkan guru dan siswa melihat jadwal pelajaran, ujian, dan kegiatan sekolah secara realtime.
          </p>
        </div>
                <div className="max-w-md bg-white rounded-2xl border-2 hover:border-blue-500 border-indigo-500 p-6 shadow-lg transform transition-transform duration-300 hover:scale-105">
                  <FaFileAlt className="text-indigo-600 text-4xl mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 mx-auto">Evaluasi & Raport</h2>
          <p className="text-gray-600">
            Membuat dan memantau nilai siswa, rapor, dan evaluasi belajar secara digital.
          </p>
        </div>
        </div>
      </div>
      

    </div>
  );
}

export default LandingPage;