import React, { useState } from 'react';
import { Copy, FileSpreadsheet, FileText, FileDown, Printer, Info, Search } from 'lucide-react';

const RekapKinerja = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Data Dummy berdasarkan gambar
  const dataGuru = [
    { id: 1, nama: "Agus Santoso", kehadiran: 0.00, kedisiplinan: 4343.00, prestasi: 24314.00, kepemimpinan: 222.00, literasi: 222.00, keterampilan: 221.98, rataRata: 4887.16, hasil: 3431.60 },
    { id: 2, nama: "Ajis", kehadiran: 0.00, kedisiplinan: 0.00, prestasi: 0.00, kepemimpinan: 0.00, literasi: 0.00, keterampilan: 0.00, rataRata: 0.00, hasil: 0.00 },
    { id: 3, nama: "Bayu Aji lesmana eka putra", kehadiran: 0.00, kedisiplinan: 0.00, prestasi: 0.00, kepemimpinan: 0.00, literasi: 0.00, keterampilan: 0.00, rataRata: 0.00, hasil: 0.00 },
    { id: 4, nama: "Eka Prasetyo", kehadiran: 0.00, kedisiplinan: 0.00, prestasi: 0.00, kepemimpinan: 0.00, literasi: 0.00, keterampilan: 0.00, rataRata: 0.00, hasil: 0.00 },
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="bg-[#2d8a56] p-6 rounded-t-sm flex justify-between items-start text-white">
        <h1 className="text-xl font-semibold">Rekap Kinerja Guru</h1>
        <div className="flex flex-col gap-2 w-64">
          <select className="bg-white text-gray-800 p-1.5 rounded text-sm border-none">
            <option>Guru</option>
          </select>
          <select className="bg-white text-gray-800 p-1.5 rounded text-sm border-none">
            <option>May</option>
          </select>
          <select className="bg-white text-gray-800 p-1.5 rounded text-sm border-none">
            <option>2026</option>
          </select>
        </div>
      </div>

      {/* Toolbar Section */}
      <div className="bg-white p-4 border-x border-b border-gray-200 shadow-sm">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            Tampilkan 
            <select className="border border-gray-300 rounded p-1">
              <option>10</option>
              <option>25</option>
            </select>
            data
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm">Cari:</span>
            <input 
              type="text" 
              className="border border-gray-300 rounded p-1 text-sm outline-none focus:border-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50">
            <Copy size={16} className="text-gray-600" /> Salin
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 text-green-700 font-medium">
            <FileSpreadsheet size={16} /> CSV
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50 text-blue-700 font-medium">
            <FileText size={16} /> Excel
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 border border-red-300 rounded text-sm hover:bg-red-50 text-red-600 font-medium">
            <FileDown size={16} /> PDF
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded text-sm hover:bg-gray-50">
            <Printer size={16} /> Print
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#dcf0e4] text-gray-700">
                <th rowSpan="2" className="border border-gray-300 p-3 w-12 text-center">No</th>
                <th rowSpan="2" className="border border-gray-300 p-3 text-left">Nama Guru</th>
                <th colSpan="5" className="border border-gray-300 p-2 text-center font-bold italic tracking-wider">Indikator Kinerja</th>
                <th rowSpan="2" className="border border-gray-300 p-3 text-center bg-gray-100">Rata-rata</th>
                <th rowSpan="2" className="border border-gray-300 p-3 text-center bg-[#dcf0e4]">Hasil Penilaian</th>
              </tr>
              <tr className="bg-[#dcf0e4] text-gray-700">
                <th className="border border-gray-300 p-2 font-semibold">Kehadiran</th>
                <th className="border border-gray-300 p-2 font-semibold">Kedisiplinan</th>
                <th className="border border-gray-300 p-2 font-semibold">Prestasi</th>
                <th className="border border-gray-300 p-2 font-semibold">Kepemimpinan</th>
                <th className="border border-gray-300 p-2 font-semibold">Literasi Digital</th>
              </tr>
            </thead>
            <tbody>
              {dataGuru.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2 text-center">{item.id}</td>
                  <td className="border border-gray-300 p-2 text-blue-600 hover:underline cursor-pointer">{item.nama}</td>
                  <td className="border border-gray-300 p-2 text-right">{item.kehadiran.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                  <td className="border border-gray-300 p-2 text-right">{item.kedisiplinan.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                  <td className="border border-gray-300 p-2 text-right">{item.prestasi.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                  <td className="border border-gray-300 p-2 text-right">{item.kepemimpinan.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                  <td className="border border-gray-300 p-2 text-right">{item.literasi.toLocaleString('en-US', {minimumFractionDigits: 2})}</td>
                  <td className="border border-gray-300 p-2 text-center font-bold bg-gray-50">
                    {item.rataRata.toLocaleString('en-US', {minimumFractionDigits: 2})}
                  </td>
                  <td className="border border-gray-300 p-2 text-center font-bold bg-[#f8fdfa]">
                    <div className="flex items-center justify-center gap-1">
                      {item.hasil.toLocaleString('en-US', {minimumFractionDigits: 2})}
                      <Info size={14} className="text-blue-500 cursor-pointer" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RekapKinerja;