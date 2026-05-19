import React, { useState } from 'react';
import { Search, Settings, Copy, X, Save } from 'lucide-react';
import Swal from 'sweetalert2';

const SettingGajiPegawai = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPegawai, setSelectedPegawai] = useState(null);
  
  // State untuk melacak bulan dan tahun terpilih
  const [selectedBulan, setSelectedBulan] = useState('Mei');
  const [selectedTahun, setSelectedTahun] = useState('2026');

  // Daftar 12 bulan lengkap
  const daftarBulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  // Dummy database komponen default per pegawai untuk simulasi checkbox state
  const [komponenTerpilih, setKomponenTerpilih] = useState({
    1: ["Gaji Pokok", "Tunjangan Keluarga"], // Agus Santoso
    2: ["Gaji Pokok"],                     // Ajis
    3: ["Gaji Pokok", "Tunjangan Anak"],    // Andi Susanto
    4: []                                  // Bayu Aji
  });

  const [kriteriaTerpilih, setKriteriaTerpilih] = useState({
    1: ["Uang Makan Harian"],
    2: ["Terlambat"],
    3: [],
    4: []
  });

  // State data utama pegawai
  const [dataPegawai, setDataPegawai] = useState([
    { id: 1, nama: 'Agus Santoso', jabatan: 'Guru Ekonomi', unit: '0', status: 'Belum Disetting' },
    { id: 2, nama: 'Ajis', jabatan: 'Guru Matematika', unit: 'SD', status: 'Belum Disetting' },
    { id: 3, nama: 'Andi Susanto', jabatan: 'Guru IPS', unit: 'SD', status: 'Belum Disetting' },
    { id: 4, nama: 'Bayu Aji lesmana eka putra', jabatan: 'Guru Matematika', unit: '-', status: 'Belum Disetting' },
  ]);

  // State untuk menampung sementara pilihan checkbox di dalam modal yang sedang aktif
  const [tempKomponen, setTempKomponen] = useState([]);
  const [tempKriteria, setTempKriteria] = useState([]);

  // Buka modal & salin data checkbox terdaftar ke state temporary
  const openSetting = (pegawai) => {
    setSelectedPegawai(pegawai);
    setTempKomponen(komponenTerpilih[pegawai.id] || []);
    setTempKriteria(kriteriaTerpilih[pegawai.id] || []);
    setIsModalOpen(true);
  };

  // Toggle handler untuk checkbox komponen gaji
  const handleToggleKomponen = (item) => {
    setTempKomponen(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  // Toggle handler untuk checkbox kriteria kehadiran
  const handleToggleKriteria = (item) => {
    setTempKriteria(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  // Fungsi simpan pengaturan per pegawai
  const handleSimpan = () => {
    if (!selectedPegawai) return;

    Swal.fire({
      title: 'Simpan Perubahan?',
      text: `Komponen gaji untuk ${selectedPegawai.nama} akan diperbarui pada periode ${selectedBulan} ${selectedTahun}.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#15803d',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Simpan',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Update status data utama menjadi Sudah Disetting
        const updatedData = dataPegawai.map((item) => 
          item.id === selectedPegawai.id ? { ...item, status: 'Sudah Disetting' } : item
        );
        setDataPegawai(updatedData);

        // Komit data temporary checkbox ke state database komponen utama
        setKomponenTerpilih(prev => ({ ...prev, [selectedPegawai.id]: tempKomponen }));
        setKriteriaTerpilih(prev => ({ ...prev, [selectedPegawai.id]: tempKriteria }));

        setIsModalOpen(false);
        
        Swal.fire({
          title: 'Berhasil!',
          text: 'Setting gaji telah disimpan.',
          icon: 'success',
          confirmButtonColor: '#15803d',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  // ==========================================
  // FITUR: SAMAKAN BULAN SEBELUMNYA
  // ==========================================
  const handleSamakanBulanSebelumnya = () => {
    // Mencari indeks bulan saat ini
    const currentIndex = daftarBulan.indexOf(selectedBulan);
    // Mengambil nama bulan sebelumnya (jika Januari, maka mundur ke Desember)
    const bulanSebelumnya = currentIndex === 0 ? daftarBulan[11] : daftarBulan[currentIndex - 1];

    Swal.fire({
      title: 'Samakan dengan Bulan Sebelumnya?',
      text: `Sistem akan menyalin struktur komponen pengaturan gaji dari bulan ${bulanSebelumnya} untuk semua pegawai ke bulan ${selectedBulan} ${selectedTahun}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#06b6d4',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Sinkronkan',
      cancelButtonText: 'Batal',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulasi logika backend/state: Mengubah semua status pegawai menjadi 'Sudah Disetting'
        // dan memberikan nilai template default terisi jika komponen datanya masih kosong.
        const synchronizedData = dataPegawai.map(item => ({
          ...item,
          status: 'Sudah Disetting'
        }));

        // Berikan contoh pengisian komponen otomatis jika kosong sebagai representasi kloning data bulan lalu
        const syncedKomponen = { ...komponenTerpilih };
        const syncedKriteria = { ...kriteriaTerpilih };

        dataPegawai.forEach(p => {
          if (!syncedKomponen[p.id] || syncedKomponen[p.id].length === 0) {
            syncedKomponen[p.id] = ["Gaji Pokok", "Potongan Admin"];
          }
          if (!syncedKriteria[p.id] || syncedKriteria[p.id].length === 0) {
            syncedKriteria[p.id] = ["Uang Makan Harian"];
          }
        });

        setDataPegawai(synchronizedData);
        setKomponenTerpilih(syncedKomponen);
        setKriteriaTerpilih(syncedKriteria);

        Swal.fire({
          title: 'Sinkronisasi Berhasil!',
          text: `Seluruh data struktur gaji berhasil disamakan dengan bulan ${bulanSebelumnya}.`,
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
          
          {/* Header & Filter Periode */}
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg font-bold mr-4">Setting Gaji Pegawai</h1>
            <div className="relative">
              <select 
                value={selectedBulan} 
                onChange={(e) => setSelectedBulan(e.target.value)}
                className="border rounded-md pl-3 pr-8 py-1.5 text-sm bg-white outline-none focus:ring-1 focus:ring-blue-400 appearance-none min-w-[110px]"
              >
                {daftarBulan.map((bln) => (
                  <option key={bln} value={bln}>{bln}</option>
                ))}
              </select>
              <span className="absolute right-2 top-2.5 text-gray-400 pointer-events-none text-xs">▼</span>
            </div>
            
            <div className="relative">
              <select 
                value={selectedTahun}
                onChange={(e) => setSelectedTahun(e.target.value)}
                className="border rounded-md pl-3 pr-8 py-1.5 text-sm bg-white outline-none focus:ring-1 focus:ring-blue-400 appearance-none min-w-[80px]"
              >
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
              <span className="absolute right-2 top-2.5 text-gray-400 pointer-events-none text-xs">▼</span>
            </div>

            <button className="bg-gray-600 text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-700 transition">
              Filter
            </button>
          </div>

          {/* Search & Tombol Aksi Kloning */}
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
            <button 
              onClick={handleSamakanBulanSebelumnya}
              className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold px-4 py-2 rounded-md text-xs flex items-center gap-2 shadow-sm transition"
            >
              <Copy size={16} /> Samakan Bulan Sebelumnya
            </button>
          </div>
        </div>

        {/* Tabel Data Utama */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b text-gray-800">
                <th className="p-3 w-12 text-center font-bold">No</th>
                <th className="p-3 font-bold">Nama Pegawai</th>
                <th className="p-3 font-bold text-center">Jabatan</th>
                <th className="p-3 font-bold text-center w-24">Unit</th>
                <th className="p-3 font-bold text-center w-36">Status</th>
                <th className="p-3 font-bold text-center w-32">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {dataPegawai.map((row, index) => (
                <tr key={row.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="p-3 text-center text-gray-400">{index + 1}</td>
                  <td className="p-3 text-blue-900 font-semibold">{row.nama}</td>
                  <td className="p-3 text-center text-gray-600">{row.jabatan}</td>
                  <td className="p-3 text-center text-gray-600">{row.unit || '-'}</td>
                  <td className="p-3 text-center">
                    <span className={`inline-block text-[10px] px-2.5 py-1 rounded font-bold shadow-sm ${
                      row.status === 'Sudah Disetting' ? 'bg-green-600 text-white' : 'bg-yellow-400 text-gray-900'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button 
                      onClick={() => openSetting(row)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-2 mx-auto transition"
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

      {/* ==========================================
          MODAL SETTING DETAIL COMPONENT
         ========================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-150">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h2 className="text-base font-bold text-gray-800">
                Setting Gaji Pegawai: <span className="text-blue-700">{selectedPegawai?.nama}</span> ({selectedBulan} {selectedTahun})
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Konten Checkbox Pilihan */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Kolom Kiri: Komponen Gaji */}
              <div className="border rounded-md overflow-hidden flex flex-col bg-white">
                <div className="bg-green-700 text-white p-2.5 font-bold text-xs uppercase tracking-wider text-center">
                  Komponen Gaji
                </div>
                <div className="p-4 space-y-2 h-[300px] overflow-y-auto">
                  {[
                    "Bon Gaji November", "Gaji Pokok", "Gaji Pokok (Kepsek)", 
                    "Potongan Admin", "Tunjangan Anak", "Tunjangan Keluarga",
                    "Tunjangan Koperasi", "Tunjangan Pasangan"
                  ].map((item, idx) => (
                    <label key={idx} className="flex items-start gap-3 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded border border-transparent hover:border-gray-100 transition-all w-full">
                      <input 
                        type="checkbox" 
                        checked={tempKomponen.includes(item)}
                        onChange={() => handleToggleKomponen(item)}
                        className="w-4 h-4 mt-0.5 rounded border-gray-300 text-green-700 focus:ring-green-700 cursor-pointer" 
                      />
                      <div className="flex flex-col">
                        <p className="font-bold text-gray-700 leading-tight">{item}</p>
                        {item === "Gaji Pokok" && <p className="text-[10px] text-gray-400 italic mt-0.5">Komponen upah inti bulanan</p>}
                        {item === "Tunjangan Koperasi" && <p className="text-[10px] text-gray-400 italic mt-0.5">Iuran wajib simpanan koperasi</p>}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Kolom Kanan: Kriteria Kehadiran */}
              <div className="border rounded-md overflow-hidden flex flex-col bg-white">
                <div className="bg-amber-500 text-white p-2.5 font-bold text-xs uppercase tracking-wider text-center">
                  Kriteria Kehadiran
                </div>
                <div className="p-4 space-y-2 h-[300px] overflow-y-auto">
                  {["Terlambat", "Uang Makan Harian", "UKK Tendik"].map((item, idx) => (
                    <label key={idx} className="flex items-start gap-3 text-sm cursor-pointer hover:bg-gray-50 p-2 rounded border border-transparent hover:border-gray-100 transition-all w-full">
                      <input 
                        type="checkbox" 
                        checked={tempKriteria.includes(item)}
                        onChange={() => handleToggleKriteria(item)}
                        className="w-4 h-4 mt-0.5 rounded border-gray-300 text-amber-500 focus:ring-amber-500 cursor-pointer" 
                      />
                      <div className="flex flex-col">
                        <p className="font-bold text-gray-700 leading-tight">{item}</p>
                        {item === "UKK Tendik" && <p className="text-[10px] text-gray-400 italic mt-0.5">Kompensasi UKK Tendik Yayasan</p>}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer Modal */}
            <div className="bg-gray-50 p-4 border-t flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-gray-500 text-white rounded text-sm font-bold hover:bg-gray-600 transition shadow-sm"
              >
                Batal
              </button>
              <button 
                onClick={handleSimpan}
                className="px-5 py-2 bg-green-700 text-white rounded text-sm font-bold flex items-center gap-2 hover:bg-green-800 transition shadow-sm"
              >
                <Save size={16} /> Simpan Perubahan
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default SettingGajiPegawai;