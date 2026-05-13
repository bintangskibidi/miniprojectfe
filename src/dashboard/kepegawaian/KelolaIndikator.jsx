import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { 
  FaEdit, FaTrash, FaEye, FaPlus, FaSearch, 
  FaFilePdf, FaFileExcel, FaCopy, FaPrint, FaFileAlt, FaInfoCircle 
} from "react-icons/fa";
import { X } from "lucide-react";

const MySwal = withReactContent(Swal);

/* ==========================================================
   KOMPONEN UTAMA: KELOLA DATA (SURAT / DOKUMEN / KEGIATAN)
   ========================================================== */
export default function ManajemenSekolah() {
  const [activeTab, setActiveTab] = useState("surat"); // surat, dokumen, kegiatan, indikator
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // DATA DUMMY BERDASARKAN GAMBAR
  const [dataSurat] = useState([
    { id: 1, noSurat: "XSAQ", judul: "Surat Penting", tanggal: "06-07-2025", jenis: "Masuk", deskripsi: "Surat pemberitahuan dinas" }
  ]);

  const [dataDokumen] = useState([
    { id: 1, judul: "Sertifikat Akreditasi", tanggal: "06-07-2025", deskripsi: "tess dokumen", file: "doc_001.pdf" }
  ]);

  const [dataIndikator] = useState([
    { id: 1, nama: "Kehadiran", tipe: "angka", jenis: "Guru", urutan: 1, bobot: 5, relasi: "Absen Masuk", status: "Aktif" },
    { id: 2, nama: "Kerajinan", tipe: "angka", jenis: "Staff", urutan: 2, bobot: 20, relasi: "Absen Masuk", status: "Aktif" },
  ]);

  // FUNGSI HAPUS SWEETALERT2 (Gambar 8)
  const handleDelete = (id, nama) => {
    MySwal.fire({
      title: "Apakah Anda yakin?",
      text: `Data "${nama}" akan dihapus permanen!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire("Berhasil!", "Data telah dihapus.", "success");
      }
    });
  };

  // FUNGSI MODAL DETAIL (Gambar 9)
  const showDetail = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans">
      
      {/* HEADER CARD - Gambar 1, 2, 3 */}
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <FaFileAlt />
            <h1 className="font-bold text-lg uppercase tracking-wider">
              {activeTab === "surat" && "Surat Menyurat"}
              {activeTab === "dokumen" && "Dokumentasi Sekolah"}
              {activeTab === "indikator" && "Kelola Indikator Kinerja"}
            </h1>
          </div>
          <button className="bg-white text-slate-800 text-xs font-bold px-4 py-2 rounded shadow hover:bg-slate-50 transition flex items-center gap-2">
            <FaPlus /> TAMBAH DATA
          </button>
        </div>

        <div className="p-4">
          {/* TOOLBAR EXPORT - Gambar 1 */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex gap-1">
              <button className="border px-3 py-1 text-xs bg-slate-50 hover:bg-slate-100 transition shadow-sm">Copy</button>
              <button className="border px-3 py-1 text-xs bg-slate-50 hover:bg-slate-100 transition shadow-sm">CSV</button>
              <button className="border px-3 py-1 text-xs bg-slate-50 hover:bg-slate-100 transition shadow-sm">Excel</button>
              <button className="border px-3 py-1 text-xs bg-slate-50 hover:bg-slate-100 transition shadow-sm text-red-600"><FaFilePdf className="inline mr-1"/>PDF</button>
              <button className="border px-3 py-1 text-xs bg-slate-50 hover:bg-slate-100 transition shadow-sm"><FaPrint className="inline mr-1"/>Print</button>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-slate-500">SEARCH:</label>
              <input type="text" className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-blue-500" />
            </div>
          </div>

          {/* TABEL DATA - Gambar 1 & 10 */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border border-slate-200">
              <thead className="bg-slate-100 text-[11px] font-bold text-slate-600 uppercase">
                <tr>
                  <th className="border p-3 w-12 text-center">#</th>
                  {activeTab === "surat" ? (
                    <>
                      <th className="border p-3">No. Surat</th>
                      <th className="border p-3">Judul</th>
                      <th className="border p-3">Tanggal</th>
                      <th className="border p-3">Jenis</th>
                    </>
                  ) : (
                    <>
                      <th className="border p-3">Nama Indikator</th>
                      <th className="border p-3">Tipe</th>
                      <th className="border p-3">Jenis Pegawai</th>
                      <th className="border p-3 text-center">Bobot (%)</th>
                      <th className="border p-3">Status</th>
                    </>
                  )}
                  <th className="border p-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {(activeTab === "surat" ? dataSurat : dataIndikator).map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition border-b">
                    <td className="p-3 border text-center">{idx + 1}</td>
                    {activeTab === "surat" ? (
                      <>
                        <td className="p-3 border font-semibold text-blue-600">{item.noSurat}</td>
                        <td className="p-3 border">{item.judul}</td>
                        <td className="p-3 border">{item.tanggal}</td>
                        <td className="p-3 border">
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">{item.jenis}</span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="p-3 border">{item.nama}</td>
                        <td className="p-3 border">{item.tipe}</td>
                        <td className="p-3 border">{item.jenis}</td>
                        <td className="p-3 border text-center font-bold text-slate-600">{item.bobot}</td>
                        <td className="p-3 border">
                          <span className="bg-green-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">Aktif</span>
                        </td>
                      </>
                    )}
                    {/* BUTTON AKSI - Gambar 6 & 7 */}
                    <td className="p-3 border text-center">
                      <div className="flex justify-center gap-1">
                        <button onClick={() => showDetail(item)} className="bg-sky-100 p-2 rounded text-sky-600 hover:bg-sky-600 hover:text-white transition shadow-sm">
                          <FaEye size={12} />
                        </button>
                        <button className="bg-amber-100 p-2 rounded text-amber-600 hover:bg-amber-500 hover:text-white transition shadow-sm">
                          <FaEdit size={12} />
                        </button>
                        <button onClick={() => handleDelete(item.id, item.judul || item.nama)} className="bg-red-100 p-2 rounded text-red-600 hover:bg-red-600 hover:text-white transition shadow-sm">
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL - Gambar 9 */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
            <div className="flex justify-end p-2">
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 transition">
                <X size={24} />
              </button>
            </div>

            <div className="px-8 pb-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-sky-50 text-sky-500 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-inner">
                <FaInfoCircle size={48} />
              </div>

              <h2 className="text-2xl font-black text-slate-800 mb-8 uppercase tracking-tight">
                {selectedItem.judul || selectedItem.nama}
              </h2>

              <div className="w-full space-y-4 text-sm">
                <DetailRow label="Kategori" value={selectedItem.jenis || selectedItem.tipe} />
                <DetailRow label="Tanggal" value={selectedItem.tanggal || "-"} />
                <DetailRow label="Deskripsi" value={selectedItem.deskripsi || "-"} />
                <DetailRow label="Status" value={selectedItem.status || "Aktif"} />
              </div>

              <button 
                onClick={() => setIsModalOpen(false)}
                className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3 rounded-xl transition shadow-lg shadow-blue-200 uppercase"
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

// Sub-komponen Baris Detail
function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-2">
      <span className="text-slate-500 font-semibold">{label}:</span>
      <span className="text-slate-800 font-bold">{value}</span>
    </div>
  );
}