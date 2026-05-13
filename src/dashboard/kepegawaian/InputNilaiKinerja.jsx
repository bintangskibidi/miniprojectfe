import React, { useState } from "react";
import { FaSave, FaCheckCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function InputNilaiKerja() {
  // Data Guru sesuai Gambar
  const [dataGuru, setDataGuru] = useState([
    { id: 1, nama: "Agus Santoso", kehadiran: "Relasi Kehadiran", kedisiplinan: "4343", prestasi: "24314", kepemimpinan: "222", literasi: "222", keterampilan: "221,98" },
    { id: 2, nama: "Ajis", kehadiran: "Relasi Kehadiran", kedisiplinan: "", prestasi: "", kepemimpinan: "", literasi: "", keterampilan: "" },
    { id: 3, nama: "Bayu Aji lesmana eka putra", kehadiran: "Relasi Kehadiran", kedisiplinan: "", prestasi: "", kepemimpinan: "", literasi: "", keterampilan: "" },
  ]);

  // Fungsi Simpan (SweetAlert2)
  const handleSave = (nama) => {
    MySwal.fire({
      title: "Simpan Nilai?",
      text: `Nilai kerja untuk ${nama} akan diperbarui.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Berhasil!",
          text: "Nilai telah disimpan ke sistem.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        
        {/* HEADER BIRU - Sesuai Gambar */}
        <div className="bg-blue-600 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-white text-2xl font-semibold tracking-wide">Kinerja Guru</h1>
          
          <div className="flex flex-col gap-2 w-full md:w-72">
            <select className="p-2 rounded border-none text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none">
              <option>Guru</option>
            </select>
            <select className="p-2 rounded border-none text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none">
              <option>May</option>
            </select>
            <select className="p-2 rounded border-none text-sm font-medium focus:ring-2 focus:ring-amber-400 outline-none">
              <option>2026</option>
            </select>
          </div>
        </div>

        {/* TABEL INPUT - Sesuai Gambar */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              {/* Header Baris 1 */}
              <tr className="bg-blue-50 text-slate-700">
                <th rowSpan="2" className="border-2 border-blue-200 p-3 text-center w-12">No</th>
                <th rowSpan="2" className="border-2 border-blue-200 p-3 text-left min-w-[200px]">Nama Guru</th>
                <th colSpan="6" className="border-2 border-blue-200 p-2 text-center font-bold uppercase tracking-tighter bg-blue-100">
                  Indikator Kinerja
                </th>
                <th rowSpan="2" className="border-2 border-blue-200 p-3 text-center w-24">Aksi</th>
              </tr>
              {/* Header Baris 2 (Sub-Indikator) */}
              <tr className="bg-blue-50 text-slate-700 text-[11px] font-black uppercase">
                <th className="border-2 border-blue-200 p-2">Kehadiran</th>
                <th className="border-2 border-blue-200 p-2">Kedisiplinan</th>
                <th className="border-2 border-blue-200 p-2">Prestasi</th>
                <th className="border-2 border-blue-200 p-2">Kepemimpinan</th>
                <th className="border-2 border-blue-200 p-2">Literasi Digital</th>
                <th className="border-2 border-blue-200 p-2">Keterampilan</th>
              </tr>
            </thead>
            
            <tbody className="text-sm">
              {dataGuru.map((guru, index) => (
                <tr key={guru.id} className="hover:bg-blue-50/50 transition-colors">
                  <td className="border border-slate-200 p-3 text-center font-medium">{index + 1}</td>
                  <td className="border border-slate-200 p-3 font-semibold text-slate-700">{guru.nama}</td>
                  
                  {/* Kolom Kehadiran (Read Only sesuai Gambar) */}
                  <td className="border border-slate-200 p-3 bg-slate-50 text-slate-400 italic text-xs text-center">
                    {guru.kehadiran}
                  </td>

                  {/* Input Fields */}
                  {[ 'kedisiplinan', 'prestasi', 'kepemimpinan', 'literasi', 'keterampilan' ].map((field) => (
                    <td key={field} className="border border-slate-200 p-2">
                      <input 
                        type="text" 
                        defaultValue={guru[field]}
                        className="w-full border border-slate-300 rounded p-1.5 text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm"
                      />
                    </td>
                  ))}

                  {/* Tombol Simpan Biru - Sesuai Gambar */}
                  <td className="border border-slate-200 p-3 text-center">
                    <button 
                      onClick={() => handleSave(guru.nama)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded flex flex-col items-center justify-center gap-0.5 transition-all shadow-md active:scale-95 w-full min-w-[75px]"
                    >
                      <FaSave className="text-sm" />
                      <span className="text-[10px] font-bold uppercase">Simpan</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info (Optional) */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-400 text-right italic">
          © 2026 Aduca Management System
        </div>
      </div>
    </div>
  );
}