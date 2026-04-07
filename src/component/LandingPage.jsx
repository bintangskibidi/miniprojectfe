import dashboard from "../assets/dashboard.jpg"
import { CurrencyDollarIcon, ShieldCheckIcon, ChartBarIcon,} from "@heroicons/react/24/solid";
function LandingPage() {
  const scrollToTentang = () => {
    document.getElementById("tentang").scrollIntoView({
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
    <>
      <div className="font-sans">
        
        {/* NAVBAR */}
       <div className="flex justify-between items-center px-12 py-4 bg-white shadow-sm fixed top-0 left-0 w-full z-50">
          <h1 className="text-2xl font-bold text-indigo-600">EduSys</h1>
          <ul className="flex gap-8 text-gray-600 font-medium">
             <li
  onClick={scrollToTop}
  className="relative cursor-pointer group"
>
  <span className="hover:text-indigo-600">
    Beranda
  </span>

  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
</li>

          <li
  onClick={scrollToTentang}
  className="relative cursor-pointer group"
>
  <span className="hover:text-indigo-600">
    Tentang
  </span>

  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
</li>

           <li className="relative cursor-pointer group">
  <span className="hover:text-indigo-600">
    Modul
  </span>

  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
</li>
            <li className="relative cursor-pointer group">
  <span className="hover:text-indigo-600">
    Harga
  </span>

  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
</li>
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
            <img src={dashboard} alt="dashboard" className="w-150 rounded-xl"/>
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
      

      
    {/* TENTANG */}
<div id="tentang" className="py-20 px-12 bg-white text-center">
  <h2 className="text-3xl font-bold text-indigo-600 mb-10">
    Tentang Kami
  </h2>

  <p className="text-gray-600 mt-4 max-w-2xl mx-auto mb-12">
    EduSys adalah platform digital untuk membantu sekolah mengelola data siswa,
    keuangan, dan administrasi secara modern dan efisien.
  </p>

  {/* CARD */}
  <div className="grid md:grid-cols-3 gap-8">
    
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300">

  <CurrencyDollarIcon className="w-12 ml-40 h-12 text-indigo-600 mb-4" />

  <h3 className="text-xl font-bold text-gray-800 mb-2">
    Biaya Terjangkau
  </h3>

  <p className="text-gray-600">
     Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis magnam nihil perferendis voluptates. Vero suscipit odit similique animi libero deleniti. Recusandae voluptatum tempore distinctio animi ex quisquam tenetur libero nam.
  </p>

</div>

    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 ease-in-out cursor-pointer">
       <ShieldCheckIcon className="w-12 ml-40 h-12 text-indigo-600 mb-4" />
      <h3 className="text-xl font-bold text-indigo-600 mb-2">
        Keamanan Data
      </h3>
      <p className="text-gray-600">
  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet tempore ipsa alias hic aspernatur ipsum quis nobis aperiam facilis commodi. Asperiores explicabo voluptatem dolor nesciunt earum sequi, ex eum sint.
      </p>
    </div>

    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 ease-in-out cursor-pointer">
       <ChartBarIcon className="w-12 ml-40 h-12 text-indigo-600 mb-4" />
      <h3 className="text-xl font-bold text-indigo-600 mb-2">
        Analytics Real-time
      </h3>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe atque veritatis ut blanditiis fugiat amet cumque labore accusamus omnis minus quaerat animi tempore similique harum assumenda necessitatibus, ratione aut sunt.
      </p>
    </div>

  </div>
</div>
</>
  );
}

export default LandingPage;