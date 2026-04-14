import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Book, Tag, AlertTriangle, Star, Clock, CheckCircle, BarChart3 } from 'lucide-react';

const LibraryDashboard = () => {
  const barData = {
    labels: ['Nov 2025', 'Des 2025', 'Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026'],
    datasets: [{
      label: 'Jumlah Peminjaman',
      data: [1, 0, 0, 0, 0, 0],
      backgroundColor: '#60a5fa',
    }],
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-700">
        <Book size={20} /> Dashboard Perpustakaan
      </h2>

      {/* Row 1: Stock Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <LibCard title="Total Buku" val="4" color="text-blue-600" border="border-blue-600" icon={<Book />} />
        <LibCard title="Total Kategori" val="3" color="text-cyan-500" border="border-cyan-500" icon={<Tag />} />
        <LibCard title="Stok Minim (≤ 3)" val="0" color="text-orange-500" border="border-orange-500" icon={<AlertTriangle />} />
        <div className="border border-green-600 rounded p-4 text-center bg-green-50/30">
          <p className="text-green-600 font-bold text-[10px] uppercase">Buku Terpopuler</p>
          <p className="font-bold text-sm my-1">Bahasa Indonesia</p>
          <div className="flex justify-center text-green-600"><Star size={18} fill="currentColor" /></div>
        </div>
      </div>

      {/* Row 2: Loan Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
        <div className="border border-gray-300 rounded p-4">
          <p className="text-xs text-gray-500 font-bold mb-1">Total Peminjaman</p>
          <p className="text-2xl font-bold">1</p>
          <BarChart3 className="mx-auto text-gray-400 mt-2" size={20} />
        </div>
        <div className="border border-yellow-500 rounded p-4">
          <p className="text-xs text-yellow-600 font-bold mb-1">Sedang Dipinjam</p>
          <p className="text-2xl font-bold">0</p>
          <Clock className="mx-auto text-yellow-500 mt-2" size={20} />
        </div>
        <div className="border border-green-600 rounded p-4">
          <p className="text-xs text-green-600 font-bold mb-1">Sudah Dikembalikan</p>
          <p className="text-2xl font-bold">1</p>
          <CheckCircle className="mx-auto text-green-600 mt-2" size={20} />
        </div>
      </div>

      {/* Row 3: History Chart */}
      <div className="border border-gray-200 rounded overflow-hidden">
        <div className="bg-blue-600 text-white p-2 font-bold text-xs flex items-center gap-2">
           <BarChart3 size={14} /> Peminjaman 6 Bulan Terakhir
        </div>
        <div className="p-4 h-48">
          <Bar data={barData} options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 1 } } }} />
        </div>
      </div>
    </div>
  );
};

const LibCard = ({ title, val, color, border, icon }) => (
  <div className={`border ${border} rounded p-4 flex flex-col items-center justify-center bg-white shadow-sm`}>
    <p className={`font-bold text-[10px] uppercase mb-1 ${color}`}>{title}</p>
    <p className="text-3xl font-black mb-2">{val}</p>
    <span className={color}>{icon}</span>
  </div>
);

export default LibraryDashboard;