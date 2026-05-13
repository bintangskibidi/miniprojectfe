import React, { useState } from 'react';
import { Search, Settings, Filter, Copy, X, Save } from 'lucide-react';
import Swal from 'sweetalert2';

const SettingGajiPegawai = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPegawai, setSelectedPegawai] = useState(null);
  
  // Masukkan data ke dalam state agar bisa diperbarui tampilannya
  const [dataPegawai, setDataPegawai] = useState([
    { id: 1, nama: 'Agus Santoso', jabatan: 'Guru Ekonomi', unit: '0', status: 'Belum Disetting' },
    { id: 2, nama: 'Ajis', jabatan: 'Guru Matematika', unit: 'SD', status: 'Belum Disetting' },
    { id: 3, nama: 'Andi Susanto', jabatan: 'Guru IPS', unit: 'SD', status: 'Belum Disetting' },
    { id: 4, nama: 'Bayu Aji lesmana eka putra', jabatan: 'Guru Matematika', unit: '', status: 'Belum Disetting' },
  ]);

  const openSetting = (pegawai) => {
    setSelectedPegawai(pegawai);
    setIsModalOpen(true);
  };

  const handleSimpan = () => {
    Swal.fire({
      title: 'Simpan Perubahan?',
      text: "Komponen gaji untuk " + selectedPegawai?.nama + " akan diperbarui.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#15803d',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Simpan',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // --- LOGIKA UPDATE STATUS ---
        const updatedData = dataPegawai.map((item) => 
          item.id === selectedPegawai.id ? { ...item, status: 'Sudah Disetting' } : item
        );
        setDataPegawai(updatedData);
        // ----------------------------

        setIsModalOpen(false);
        
        Swal.fire({
          title: 'Berhasil!',
          text: 'Setting gaji telah disimpan.',
          icon: 'success',
          confirmButtonColor: '#15803d'
        });
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans text-gray-700 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg font-bold mr-4">Setting Gaji Pegawai</h1>
            <select className="border rounded-md px-3 py-1.5 text-sm bg-white outline-none focus:ring-1 focus:ring-blue-400">
              <option>Mei</option>
            </select>
            <select className="border rounded-md px-3 py-1.5 text-sm bg-white outline-none focus:ring-1 focus:ring-blue-400">
              <option>2026</option>
            </select>
            <button className="bg-gray-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-700 transition">
              Filter
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none">
              <input 
                type="text" 
                placeholder="Cari nama pegawai/jabatan/unit..." 
                className="w-full md:w-64 border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-blue-400"
              />
              <button className="absolute right-0 top-0 h-full px-3 border-l text-blue-500">
                <Search size={16} />
              </button>
            </div>
            <button className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-4 py-2 rounded-md text-xs flex items-center gap-2 shadow-sm transition">
              <Copy size={16} /> Samakan Bulan Sebelumnya
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-3 w-12 text-center font-bold">No</th>
                <th className="p-3 font-bold">Nama Pegawai</th>
                <th className="p-3 font-bold text-center">Jabatan</th>
                <th className="p-3 font-bold text-center">Unit</th>
                <th className="p-3 font-bold text-center">Status</th>
                <th className="p-3 font-bold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataPegawai.map((row, index) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="p-3 text-center text-gray-500">{index + 1}</td>
                  <td className="p-3 text-blue-800 font-medium">{row.nama}</td>
                  <td className="p-3 text-center">{row.jabatan}</td>
                  <td className="p-3 text-center">{row.unit}</td>
                  <td className="p-3 text-center">
                    {/* Logika warna dinamis berdasarkan status */}
                    <span className={`${row.status === 'Sudah Disetting' ? 'bg-green-600' : 'bg-yellow-400'} text-black text-[10px] px-2 py-1 rounded font-bold`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => openSetting(row)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 mx-auto"
                    >
                      <Settings size={14} /> Setting
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-700">
                Setting Gaji Pegawai: {selectedPegawai?.nama} (5/2026)
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-md overflow-hidden flex flex-col">
                <div className="bg-green-700 text-white p-2 font-semibold text-sm text-center">
                  Komponen Gaji
                </div>
                <div className="p-4 space-y-3 h-[300px] overflow-y-auto">
                  {[
                    "Bon Gaji November", "Gaji Pokok", "Gaji Pokok (Kepsek)", 
                    "Potongan Admin", "Tunjangan Anak", "Tunjangan Keluarga",
                    "Tunjangan Koperasi", "Tunjangan Pasangan"
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-start gap-3 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors w-full">
                      <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-green-700 focus:ring-green-700 cursor-pointer" />
                      <div className="flex flex-col">
                        <p className="font-bold text-gray-700 leading-tight">{item}</p>
                        {item === "Gaji Pokok" && <p className="text-[10px] text-gray-400 italic mt-1">tes</p>}
                        {item === "Tunjangan Koperasi" && <p className="text-[10px] text-gray-400 italic mt-1">iuran wajib koperasi</p>}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border rounded-md overflow-hidden flex flex-col">
                <div className="bg-yellow-500 text-white p-2 font-semibold text-sm text-center">
                  Kriteria Kehadiran
                </div>
                <div className="p-4 space-y-3 h-[300px] overflow-y-auto">
                  {["Terlambat", "Uang Makan Harian", "UKK Tendik"].map((item, idx) => (
                    <label key={idx} className="flex items-start gap-3 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors w-full">
                      <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 cursor-pointer" />
                      <div className="flex flex-col">
                        <p className="font-bold text-gray-700 leading-tight">{item}</p>
                        {item === "UKK Tendik" && <p className="text-[10px] text-gray-400 italic mt-1">UKK Tendik Yayasan</p>}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 border-t flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-gray-500 text-white rounded text-sm font-bold hover:bg-gray-600 transition shadow-sm"
              >
                Batal
              </button>
              <button 
                onClick={handleSimpan}
                className="px-6 py-2 bg-green-700 text-white rounded text-sm font-bold flex items-center gap-2 hover:bg-green-800 transition shadow-sm"
              >
                <Save size={16} /> Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingGajiPegawai;