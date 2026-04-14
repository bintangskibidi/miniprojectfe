import React from "react";
import { 
  RiGroupLine, 
  RiMoneyDollarCircleLine, 
  RiCalendarEventLine, 
  RiFileChartLine 
} from "@remixicon/react";

export default function DocumentationSection() {
  const docs = [
    {
      title: "Manajemen Siswa",
      desc: "Kelola data siswa dengan mudah dan terstruktur.",
      icon: <RiGroupLine size={40} />,
      color: "bg-blue-500",
    },
    {
      title: "Keuangan Sekolah",
      desc: "Pantau pembayaran dan laporan keuangan secara real-time.",
      icon: <RiMoneyDollarCircleLine size={40} />,
      color: "bg-green-500",
    },
    {
      title: "Jadwal Kegiatan",
      desc: "Atur jadwal kelas dan kegiatan sekolah dengan rapi.",
      icon: <RiCalendarEventLine size={40} />,
      color: "bg-amber-400",
    },
    {
      title: "Laporan & Raport",
      desc: "Lihat, unduh, dan cetak raport siswa dengan cepat.",
      icon: <RiFileChartLine size={40} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Judul Seksi */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Dokumentasi</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Berikut adalah tampilan sistem Aduca dalam mendukung digitalisasi sekolah, 
            mulai dari manajemen siswa, keuangan, hingga laporan secara real-time.
          </p>
        </div>

        {/* Grid Kartu Berwarna khas Aduca */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {docs.map((doc, index) => (
            <div 
              key={index} 
              className={`${doc.color} rounded-3xl p-8 text-white shadow-xl transform transition hover:-translate-y-2 duration-300 flex flex-col items-center text-center`}
            >
              {/* Lingkaran Ikon Transparan */}
              <div className="bg-white/20 p-4 rounded-2xl mb-6">
                {doc.icon}
              </div>
              
              {/* Teks */}
              <h3 className="text-xl font-bold mb-3">{doc.title}</h3>
              <p className="text-sm opacity-90 leading-relaxed">
                {doc.desc}
              </p>
              
              {/* Dekorasi kecil biar makin mirip Dashboard */}
              <div className="mt-8 w-12 h-1.5 bg-white/30 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}