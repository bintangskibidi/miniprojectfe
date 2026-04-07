function LandingPage() {
  return (
    <div className="font-sans">
      
      {/* NAVBAR */}
      <div className="flex justify-between items-center px-12 py-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-indigo-600">EduSys</h1>

        <ul className="flex gap-8 text-gray-600 font-medium">
          <li className="hover:text-indigo-600 cursor-pointer">Beranda</li>
          <li className="hover:text-indigo-600 cursor-pointer">Tenatng</li>
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
          <img
            src="https://via.placeholder.com/400"
            alt="dashboard"
            className="rounded-xl"
          />
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

    </div>
  );
}

export default LandingPage;