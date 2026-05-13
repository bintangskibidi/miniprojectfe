import React, { useState, useMemo } from "react";
import Swal from "sweetalert2"; // Pastikan sudah install: npm install sweetalert2
import {
  FileText,
  FileSpreadsheet,
  Printer,
  RotateCcw,
  Search,
  Filter,
  Eye,
  Trash2,
  X,
  Info
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

/* =========================
   DATA (Tetap Sama)
========================= */
const kategoriData = [
  { name: "Elektronik", value: 30, color: "#1877F2" },
  { name: "Furniture", value: 25, color: "#28A745" },
  { name: "Kendaraan", value: 15, color: "#FFC107" },
  { name: "Alat Tulis", value: 20, color: "#DC3545" },
  { name: "Lainnya", value: 10, color: "#6C757D" },
];

const statusData = [
  { name: "Baik", value: 70, color: "#28A745" },
  { name: "Rusak", value: 10, color: "#DC3545" },
  { name: "Perlu Perbaikan", value: 15, color: "#FFC107" },
  { name: "Hilang", value: 5, color: "#6C757D" },
];

const initialAssets = [
  { id: 1, kode: "AST-0015", nama: "122", kategori: "Elektronik", lokasi: "Ruangan Kelas 1", jumlah: 1, harga: "Rp 12", umur: "5 tahun", status: "Baik", pinjam: 0 },
  { id: 2, kode: "AST-0010", nama: "AC Split", kategori: "Elektronik", lokasi: "Ruangan Kelas 1", jumlah: 3, harga: "Rp 4.500.000", umur: "7 tahun", status: "Baik", pinjam: 0 },
  { id: 3, kode: "AST-0016", nama: "Baju", kategori: "Furniture", lokasi: "Ruangan Kelas 1", jumlah: 1, harga: "Rp 20", umur: "5 tahun", status: "Baik", pinjam: 0 },
  { id: 4, kode: "AST-0006", nama: "Buku", kategori: "Elektronik", lokasi: "Ruangan Kelas 1", jumlah: 1, harga: "Rp 2", umur: "5 tahun", status: "Baik", pinjam: 0 },
];

/* =========================
   COMPONENT
========================= */

export default function DashboardAset() {
  // Tambahan State
  const [assets, setAssets] = useState(initialAssets);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fungsi Hapus (SweetAlert2)
  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: `Data aset "${nama}" akan dihapus permanen!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        setAssets(assets.filter(item => item.id !== id));
        Swal.fire({
          title: "Berhasil!",
          text: "Data telah dihapus.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // Logika Pencarian
  const filteredAssets = useMemo(() => {
    return assets.filter(item => 
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, assets]);

  return (
    <div className="min-h-screen bg-slate-100 p-3 sm:p-5 relative">
      <div className="mx-auto max-w-7xl rounded-xl bg-white shadow-sm border border-slate-200 overflow-hidden">

        {/* HEADER */}
        <div className="flex flex-col gap-4 bg-blue-600 p-4 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 text-white">
            <FileText size={22} />
            <h1 className="text-lg font-bold tracking-tight">Dashboard Laporan Aset</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-slate-50 shadow-sm transition">
              <FileText size={14} /> PDF
            </button>
            <button className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-slate-50 shadow-sm transition">
              <FileSpreadsheet size={14} /> EXCEL
            </button>
            <button className="flex items-center gap-2 rounded-md bg-white px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-slate-50 shadow-sm transition">
              <Printer size={14} /> CETAK
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* FILTER */}
          <div className="rounded-lg border border-slate-200 bg-slate-50/50">
            <div className="flex items-center gap-2 border-b border-slate-200 p-3 text-sm font-bold text-slate-700 uppercase tracking-wider">
              <Filter size={14} /> Filter Laporan
            </div>

            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
              {["Tanggal Mulai", "Tanggal Akhir", "Kategori", "Status"].map((label, idx) => (
                <div key={idx}>
                  <label className="mb-1 block text-xs font-bold text-slate-600">{label}</label>
                  {idx < 2 ? (
                    <input type="date" className="w-full rounded-md border border-slate-300 p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                  ) : (
                    <select className="w-full rounded-md border border-slate-300 p-2 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                      <option>{idx === 2 ? "Elektronik" : "Semua Status"}</option>
                    </select>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2 p-4 pt-0">
              <button className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-md transition">
                <Search size={14} /> Tampilkan Laporan
              </button>
              <button className="flex items-center gap-2 rounded-md bg-slate-500 px-4 py-2 text-xs font-bold text-white hover:bg-slate-600 shadow-md transition">
                <RotateCcw size={14} /> Reset
              </button>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard color="bg-blue-600" val="15" label="Total Aset" />
            <StatCard color="bg-emerald-700" val="227" label="Total Unit" />
            <StatCard color="bg-cyan-500" val="Rp 42.520.035" label="Total Nilai Aset" isSmall />
            <StatCard color="bg-amber-400" val="Rp 2.834.669" label="Rata-rata Nilai" isSmall />
          </div>

          {/* QUICK STATUS */}
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <StatusBox label="Aset Aktif" desc="Kondisi Baik" val="15" color="text-emerald-700" />
            <StatusBox label="Perlu Perbaikan" desc="Maintenance" val="0" color="text-amber-600" />
            <StatusBox label="Nilai Buku" desc="Setelah Depresiasi" val="Rp 42.520.035" color="text-emerald-700" isMoney />
          </div>

          {/* CHART */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ChartWrapper title="Distribusi Kategori">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={kategoriData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={5}>
                    {kategoriData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartWrapper>

            <ChartWrapper title="Status Aset">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={100}>
                    {statusData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </div>

          {/* DETAIL TABLE */}
          <div className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="flex flex-col gap-2 border-b p-4 sm:flex-row sm:items-center sm:justify-between bg-slate-50">
              <h2 className="text-sm font-bold text-slate-800 uppercase">Detail Aset</h2>
              <div className="text-xs font-medium text-slate-500 bg-slate-200 px-2 py-1 rounded">
                Periode: 01/05/2026 - 31/05/2026
              </div>
            </div>

            {/* TABLE TOOLBAR */}
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between border-b">
              <div className="flex flex-wrap gap-1">
                {["Salin", "CSV", "Excel", "PDF", "Cetak"].map((btn) => (
                  <button key={btn} className="rounded border border-slate-300 bg-white px-3 py-1 text-xs font-semibold hover:bg-slate-100 transition">
                    {btn}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-xs font-bold text-slate-500">CARI:</span>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Kode / Nama..."
                  className="rounded-md border border-slate-300 px-3 py-1 text-sm outline-none focus:border-blue-500" 
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-slate-100 text-[11px] font-bold uppercase text-slate-600">
                  <tr>
                    {["#", "Kode", "Nama Aset", "Kategori", "Lokasi", "Jumlah", "Harga", "Umur", "Status", "Pinjam", "Aksi"].map(h => (
                      <th key={h} className="border-b border-slate-200 px-4 py-3 text-left">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-xs text-slate-700">
                  {filteredAssets.map((item, idx) => (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-blue-50/50 transition-colors">
                      <td className="px-4 py-3">{idx + 1}</td>
                      <td className="px-4 py-3 font-bold text-blue-600">{item.kode}</td>
                      <td className="px-4 py-3 font-semibold">{item.nama}</td>
                      <td className="px-4 py-3">{item.kategori}</td>
                      <td className="px-4 py-3 text-slate-500">{item.lokasi}</td>
                      <td className="px-4 py-3 text-center">{item.jumlah}</td>
                      <td className="px-4 py-3 font-medium">{item.harga}</td>
                      <td className="px-4 py-3 italic">{item.umur}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 uppercase">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-bold">{item.pinjam}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {/* Tombol Mata */}
                          <button 
                            onClick={() => { setSelectedAsset(item); setIsModalOpen(true); }}
                            className="rounded bg-sky-100 p-1.5 text-sky-600 hover:bg-sky-600 hover:text-white transition shadow-sm">
                            <Eye size={14} />
                          </button>
                          {/* Tombol Hapus */}
                          <button 
                            onClick={() => handleDelete(item.id, item.nama)}
                            className="rounded bg-red-100 p-1.5 text-red-600 hover:bg-red-600 hover:text-white transition shadow-sm">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredAssets.length === 0 && (
                    <tr>
                      <td colSpan="11" className="p-10 text-center text-slate-400 italic">Data tidak ditemukan...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL (DITAMBAHKAN) */}
      {isModalOpen && selectedAsset && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-end p-2">
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition">
                <X size={20} />
              </button>
            </div>
            <div className="px-6 pb-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-sky-100 text-sky-500 rounded-full flex items-center justify-center mb-4 border-4 border-sky-50">
                <Info size={40} />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">{selectedAsset.nama}</h2>
              <div className="w-full space-y-3 text-left text-sm">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Kategori:</span>
                  <span className="text-slate-800 font-bold">{selectedAsset.kategori}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Kode Aset:</span>
                  <span className="text-slate-800 font-bold">{selectedAsset.kode}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Lokasi:</span>
                  <span className="text-slate-800 font-bold">{selectedAsset.lokasi}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="text-slate-500 font-medium">Harga:</span>
                  <span className="text-emerald-600 font-bold">{selectedAsset.harga}</span>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl transition shadow-lg"
              >
                TUTUP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* =========================
   REUSABLE UI COMPONENTS
========================= */

function StatCard({ color, val, label, isSmall }) {
  return (
    <div className={`${color} rounded-lg p-4 shadow-sm text-center text-white`}>
      <h2 className={`${isSmall ? 'text-xl' : 'text-3xl'} font-black`}>{val}</h2>
      <p className="text-[10px] uppercase font-bold tracking-widest opacity-80 mt-1">{label}</p>
    </div>
  );
}

function StatusBox({ label, desc, val, color, isMoney }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-sm font-bold text-slate-800">{label}</h3>
        <p className="text-[11px] text-slate-400 font-medium">{desc}</p>
      </div>
      <div className={`font-black ${isMoney ? 'text-lg' : 'text-2xl'} ${color}`}>{val}</div>
    </div>
  );
}

function ChartWrapper({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-50/50 p-3 text-xs font-bold uppercase tracking-wider text-slate-600">
        {title}
      </div>
      <div className="p-4 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}