import EduSys from "../assets/EduSys.png";
import {
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import {
  FaUserGraduate,
  FaBell,
  FaChartLine,
  FaDollarSign,
  FaCalendarAlt,
  FaFileAlt,
} from "react-icons/fa";

function LandingPage() {
  const scrollToTentang = () => {
    document.getElementById("tentang")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToModul = () => {
    document.getElementById("Modul")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const scrollToHarga = () => {
    document.getElementById("Harga")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const scrollToKerjasama = () => {
    document.getElementById("Modul")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const scrollToDokumentasi = () => {
    document.getElementById("Modul")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const scrollToKontak = () => {
    document.getElementById("Modul")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="font-sans">
      {/* NAVBAR */}
      <div className="flex justify-between items-center px-12 py-4 bg-white shadow-sm fixed top-0 left-0 w-full z-50">
        <h1 className="text-2xl font-bold text-blue-900">EduSys</h1>

        <ul className="flex gap-8 text-gray-600 font-medium">
          <li
            onClick={scrollToTop}
            className="cursor-pointer hover:text-blue-800"
          >
            Beranda
          </li>

          <li
            onClick={scrollToTentang}
            className="cursor-pointer hover:text-blue-800"
          >
            Tentang
          </li>

          <li
            onClick={scrollToModul}
            className="cursor-pointer hover:text-blue-800"
          >
            Modul
          </li>
          <li
            onClick={scrollToHarga}
            className="cursor-pointer hover:text-blue-800"
          >
            Harga
          </li>
          <li
            onClick={scrollToKerjasama}
            className="cursor-pointer hover:text-blue-800"
          >
            Kerjasama
          </li>
          <li
            onClick={scrollToDokumentasi}
            className="cursor-pointer hover:text-blue-800"
          >
            Dokumentasi
          </li>
          <li
            onClick={scrollToKontak}
            className="cursor-pointer hover:text-blue-800"
          >
            Kontak
          </li>
        </ul>

        <button className="bg-gradient-to-r from-orange-500 to-blue-800 text-white px-5 py-2 rounded-xl shadow hover:scale-105 transition">
          Login
        </button>
      </div>

      {/* HERO */}
      <div className="flex flex-col md:flex-row items-center justify-between px-12 py-24 bg-gradient-to-br from-blue-50 to-orange-50">
        <div className="max-w-xl">
          <span className="text-sm text-blue-700 font-semibold">
            Trusted School System
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-blue-900 leading-tight mt-3 mb-6">
            Digitalisasi Sekolah Jadi Lebih Mudah
          </h1>

          <p className="text-gray-600 text-lg mb-8">
            Kelola administrasi, siswa, dan keuangan dalam satu platform modern.
          </p>

          <div className="flex gap-4">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-xl shadow hover:bg-orange-600 transition">
              Mulai Sekarang
            </button>

            <button className="border-2 border-blue-800 text-blue-800 px-6 py-3 rounded-xl hover:bg-blue-800 hover:text-white transition">
              Lihat Demo
            </button>
          </div>
        </div>

        <div className="mt-10 md:mt-0 p-4">
          <img
            src={EduSys}
            alt="EduSys"
            className="w-[400px] rounded-xl mix-blend-multiply"
          />
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-12 bg-white">
        <div>
          <h2 className="text-4xl font-bold text-blue-900">1000+</h2>
          <p className="text-gray-500 mt-2">Pengguna Aktif</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-blue-900">500+</h2>
          <p className="text-gray-500 mt-2">Sekolah Terdaftar</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-blue-900">24/7</h2>
          <p className="text-gray-500 mt-2">Support System</p>
        </div>
      </div>

      {/* TENTANG */}
      <div id="tentang" className="py-20 px-12 bg-white text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-10">Tentang Kami</h2>

        <p className="text-gray-600 mt-4 max-w-2xl mx-auto mb-12">
          EduSys adalah platform digital untuk membantu sekolah mengelola data
          siswa, keuangan, dan administrasi secara modern dan efisien.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition border border-orange-300">
            <CurrencyDollarIcon className="w-12 h-12 text-orange-500 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              Biaya Terjangkau
            </h3>
            <p className="text-gray-600">
              Sistem dengan biaya ringan dan fleksibel untuk semua sekolah.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition border border-orange-300">
            <ShieldCheckIcon className="w-12 h-12 text-orange-500 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              Keamanan Data
            </h3>
            <p className="text-gray-600">
              Data sekolah terlindungi dengan sistem keamanan modern.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition border border-orange-300">
            <ChartBarIcon className="w-12 h-12 text-orange-500 mb-4 mx-auto" />
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              Analytics Real-time
            </h3>
            <p className="text-gray-600">
              Pantau performa sekolah secara langsung dan akurat.
            </p>
          </div>
        </div>
      </div>

      {/* MODUL */}
      <div id="Modul" className="py-20 px-12 bg-blue-50">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-900 to-orange-500 text-transparent bg-clip-text mb-12">
          Fitur Unggulan
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <FaUserGraduate />, title: "Manajemen Siswa" },
            { icon: <FaBell />, title: "Notifikasi" },
            { icon: <FaChartLine />, title: "Analitik" },
            { icon: <FaDollarSign />, title: "Keuangan" },
            { icon: <FaCalendarAlt />, title: "Jadwal" },
            { icon: <FaFileAlt />, title: "Raport" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-2 transition border border-orange-300"
            >
              <div className="text-orange-500 text-4xl mb-4 text-center">
                {item.icon}
              </div>

              <h2 className="text-xl font-bold text-blue-900 text-center mb-2">
                {item.title}
              </h2>

              <p className="text-gray-600 text-center">
                Sistem modern untuk mendukung aktivitas sekolah lebih efisien.
              </p>
            </div>
          ))}
        </div>
      </div>
      {/*HARGA*/}
      <div id="Harga" className="py-20 px-12 bg-blue-50">
        <h4 className="text-xl text-blue-700 text-center font-semibold mb-2">
          PAKET HARGA
        </h4>

        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-900 to-orange-500 text-transparent bg-clip-text mb-4">
          Investasi Terjangkau untuk Sekolah
        </h1>

        <p className="text-center text-gray-500 mb-12">
          Instalasi Rp 1.000.000 + Maintenance Rp 300.000/bulan
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* STANDAR */}
          <div
            className="bg-gradient-to-b from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl border border-orange-300 
    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer active:scale-95"
          >
            <h3 className="text-lg font-semibold mb-4 text-center">
              Paket Standar
            </h3>

            <h1 className="text-4xl font-bold text-center mb-2">
              Rp 1.000.000.000.000
            </h1>

            <p className="text-sm text-center mb-6">Instalasi (sekali bayar)</p>

            <div className="bg-white text-blue-900 rounded-lg py-2 text-center mb-6 font-semibold">
              Rp 300.000 / bulan
            </div>

            <ul className="space-y-3 text-sm mb-6">
              <li>✔ Modul Utama A-COUNT</li>
              <li>✔ Manajemen Siswa</li>
              <li>✔ Payment Gateway</li>
              <li>✔ Maintenance</li>
              <li>✔ Backup Otomatis</li>
              <li>✔ Laporan Sekolah</li>
            </ul>

            <button
              className="w-full bg-white text-blue-700 py-2 rounded-lg font-semibold 
      hover:bg-gray-200 active:scale-95 transition"
            >
              Pilih Paket Ini
            </button>
          </div>

          {/* ABSENSI */}
          <div
            className="bg-white p-8 rounded-2xl shadow border border-orange-300 
    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer active:scale-95"
          >
            <h3 className="text-lg font-semibold mb-4 text-center text-blue-900">
              Paket Absensi
            </h3>

            <h1 className="text-4xl font-bold text-center mb-2 text-blue-900">
              Rp 1.000.000
            </h1>

            <p className="text-sm text-center mb-4 text-gray-500">Instalasi</p>

            <div className="bg-green-100 text-green-700 rounded-lg py-2 text-center mb-6 font-semibold">
              Rp 50.000 / bulan
            </div>

            <ul className="space-y-3 text-sm mb-6 text-gray-600">
              <li>✔ Absensi RFID</li>
              <li>✔ Integrasi A-COUNT</li>
              <li>✔ Laporan Real-time</li>
              <li>✔ Notifikasi Orang Tua</li>
            </ul>

            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg 
      hover:bg-blue-700 active:scale-95 transition"
            >
              Info Lengkap
            </button>
          </div>

          {/* ADDON */}
          <div
            className="bg-white p-8 rounded-2xl shadow border border-orange-300 
    hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer active:scale-95"
          >
            <h3 className="text-lg font-semibold mb-4 text-center text-blue-900">
              Add-on RFID
            </h3>

            <h1 className="text-3xl font-bold text-center text-blue-900 mb-2">
              Rp 20.000
            </h1>

            <p className="text-sm text-center mb-6 text-gray-500">per kartu</p>

            <ul className="space-y-3 text-sm mb-6 text-gray-600">
              <li>✔ Desain ID Card</li>
              <li>✔ Integrasi Sistem</li>
              <li>✔ Cetak Kartu</li>
            </ul>

            <button
              className="w-full bg-blue-600 text-white py-2 rounded-lg 
      hover:bg-blue-700 active:scale-95 transition"
            >
              Pilih Add-on
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
