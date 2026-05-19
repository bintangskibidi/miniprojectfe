import React, { useState, useEffect } from 'react';
import { 
  UserCheck, Filter as FilterIcon, Plus, 
  ClipboardList, LayoutList, ChevronDown, Edit, Trash2
} from 'lucide-react';
import Swal from 'sweetalert2';

const AbsensiHarianPegawai = () => {
  // =========================
  // STATE UTAMA DATA
  // =========================
  const [dataAbsensi, setDataAbsensi] = useState([
    {
      id: 1,
      tanggal: '2026-05-13',
      nip: '199208242019031011',
      nama: 'Agus Santoso',
      jenisPegawai: 'Pegawai Tetap',
      unit: '0',
      jamMasuk: '07:25',
      statusMasuk: 'Tepat Waktu',
      jamPulang: '16:05',
      statusPulang: 'Sesuai Jadwal',
      keterangan: 'Hadir',
      terlambat: '0 mnt',
      pulangAwal: '0 mnt'
    },
    {
      id: 2,
      tanggal: '2026-05-13',
      nip: '199503112022012022',
      nama: 'Andi Susanto',
      jenisPegawai: 'Kontrak',
      unit: 'SD',
      jamMasuk: '08:15',
      statusMasuk: 'Terlambat',
      jamPulang: '16:00',
      statusPulang: 'Sesuai Jadwal',
      keterangan: 'Hadir',
      terlambat: '45 mnt',
      pulangAwal: '0 mnt'
    }
  ]);

  const [rekapAbsensi, setRekapAbsensi] = useState([]);

  // =========================
  // SEED / HITUNG REKAP OTOMATIS
  // =========================
  useEffect(() => {
    const rekapMap = {};

    dataAbsensi.forEach((item) => {
      if (!rekapMap[item.nip]) {
        rekapMap[item.nip] = {
          nip: item.nip,
          nama: item.nama,
          jenisPegawai: item.jenisPegawai,
          unit: item.unit,
          totalHadir: 0,
          tepatWaktu: 0,
          terlambat: 0,
          pulangCepat: 0,
          izinPribadi: 0
        };
      }

      if (item.keterangan === 'Hadir') {
        rekapMap[item.nip].totalHadir += 1;
        if (item.statusMasuk === 'Tepat Waktu') rekapMap[item.nip].tepatWaktu += 1;
        if (item.statusMasuk === 'Terlambat') rekapMap[item.nip].terlambat += 1;
        if (parseInt(item.pulangAwal) > 0) rekapMap[item.nip].pulangCepat += 1;
      } else if (item.keterangan === 'Izin') {
        rekapMap[item.nip].izinPribadi += 1;
      }
    });

    setRekapAbsensi(Object.values(rekapMap));
  }, [dataAbsensi]);


  // ===================================
  // STYLING UTK MODAL CUSTOM SWEETALERT
  // ===================================
  const injectSwalStyles = () => {
    if (document.getElementById('custom-swal-style-absensi')) return;
    const style = document.createElement('style');
    style.id = 'custom-swal-style-absensi';
    style.innerHTML = `
      .custom-swal-popup { width: 480px !important; padding: 20px !important; border-radius: 8px !important; }
      .custom-swal-actions { width: 100% !important; justify-content: flex-end !important; margin-top: 20px !important; padding: 0 !important; }
      .custom-swal-confirm { background-color: #2563eb !important; color: white !important; padding: 10px 24px !important; font-size: 14px !important; font-weight: 600 !important; border-radius: 6px !important; margin-left: 10px !important; box-shadow: none !important; }
      .custom-swal-cancel { background-color: #6b7280 !important; color: white !important; padding: 10px 24px !important; font-size: 14px !important; font-weight: 600 !important; border-radius: 6px !important; box-shadow: none !important; }
      .custom-swal-close { color: #9ca3af !important; font-size: 22px !important; top: 16px !important; right: 16px !important; }
      .swal2-html-container { margin: 15px 0 0 0 !important; overflow: hidden !important; }
    `;
    document.head.appendChild(style);
  };

  // =========================
  // TAMBAH DATA (SWEETALERT)
  // =========================
  const handleTambahAbsensi = async () => {
    injectSwalStyles();

    const { value: formValues } = await Swal.fire({
      title: `<div style="text-align: left; font-size: 18px; font-weight: 600; color: #1f2937; padding-bottom: 4px;">Tambah Absensi Harian</div>`,
      html: `
        <div style="text-align: left; font-family: sans-serif; max-height: 400px; overflow-y: auto; padding-right: 4px;">
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #4b5563; margin-bottom: 4px;">Tanggal</label>
            <input id="swal-tanggal" type="date" value="2026-05-13" style="width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
          </div>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #4b5563; margin-bottom: 4px;">Pegawai</label>
            <select id="swal-pegawai" style="width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box; background-color:#fff;">
              <option value="Agus Santoso|199208242019031011|Pegawai Tetap|0">Agus Santoso (199208242019031011)</option>
              <option value="Andi Susanto|199503112022012022|Kontrak|SD">Andi Susanto (199503112022012022)</option>
              <option value="Bayu Aji|199812022025021003|Pegawai Tetap|0">Bayu Aji (199812022025021003)</option>
            </select>
          </div>
          <div style="display: flex; gap: 10px; margin-bottom: 12px;">
            <div style="flex: 1;">
              <label style="display: block; font-size: 13px; color: #4b5563; margin-bottom: 4px;">Jam Masuk</label>
              <input id="swal-masuk" type="time" value="07:30" style="width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
            </div>
            <div style="flex: 1;">
              <label style="display: block; font-size: 13px; color: #4b5563; margin-bottom: 4px;">Jam Pulang</label>
              <input id="swal-pulang" type="time" value="16:00" style="width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
            </div>
          </div>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #4b5563; margin-bottom: 4px;">Keterangan</label>
            <select id="swal-keterangan" style="width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box; background-color:#fff;">
              <option value="Hadir">Hadir</option>
              <option value="Izin">Izin</option>
              <option value="Sakit">Sakit</option>
              <option value="Alpa">Alpa</option>
            </select>
          </div>
        </div>
      `,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      reverseButtons: true,
      customClass: {
        popup: 'custom-swal-popup',
        actions: 'custom-swal-actions',
        confirmButton: 'custom-swal-confirm',
        cancelButton: 'custom-swal-cancel',
        closeButton: 'custom-swal-close'
      },
      preConfirm: () => {
        const tanggal = document.getElementById('swal-tanggal').value;
        const pegawaiRaw = document.getElementById('swal-pegawai').value;
        const jamMasuk = document.getElementById('swal-masuk').value;
        const jamPulang = document.getElementById('swal-pulang').value;
        const keterangan = document.getElementById('swal-keterangan').value;

        if (!tanggal || !jamMasuk || !jamPulang) {
          Swal.showValidationMessage('Semua form harus diisi!');
          return false;
        }

        const [nama, nip, jenisPegawai, unit] = pegawaiRaw.split('|');

        // Kalkulasi Status & Keterlambatan Sederhana (Batas Masuk 07:30, Batas Pulang 16:00)
        const statusMasuk = jamMasuk > "07:30" ? "Terlambat" : "Tepat Waktu";
        const statusPulang = jamPulang < "16:00" ? "Pulang Awal" : "Sesuai Jadwal";
        const terlambat = jamMasuk > "07:30" ? "30 mnt" : "0 mnt"; 
        const pulangAwal = jamPulang < "16:00" ? "15 mnt" : "0 mnt";

        return {
          id: Date.now(),
          tanggal, nip, nama, jenisPegawai, unit,
          jamMasuk, statusMasuk, jamPulang, statusPulang,
          keterangan, terlambat, pulangAwal
        };
      }
    });

    if (formValues) {
      setDataAbsensi(prev => [...prev, formValues]);
      Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Data absensi ditambahkan.', timer: 1500, showConfirmButton: false });
    }
  };

  // =========================
  // EDIT DATA (SWEETALERT)
  // =========================
  const handleEditAbsensi = async (id) => {
    injectSwalStyles();
    const current = dataAbsensi.find(item => item.id === id);
    if (!current) return;

    const { value: formValues } = await Swal.fire({
      title: `<div style="text-align: left; font-size: 18px; font-weight: 600; color: #1f2937; padding-bottom: 4px;">Edit Absensi Harian</div>`,
      html: `
        <div style="text-align: left; font-family: sans-serif; max-height: 400px; overflow-y: auto; padding-right: 4px;">
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #4b5563; margin-bottom: 4px;">Tanggal</label>
            <input id="swal-edit-tanggal" type="date" value="${current.tanggal}" style="width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
          </div>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #4b5563; margin-bottom: 4px;">Pegawai (NIP)</label>
            <input type="text" value="${current.nama} (${current.nip})" disabled style="width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box; background-color: #f3f4f6; color: #6b7280;">
          </div>
          <div style="display: flex; gap: 10px; margin-bottom: 12px;">
            <div style="flex: 1;">
              <label style="display: block; font-size: 13px; color: #4b5563; margin-bottom: 4px;">Jam Masuk</label>
              <input id="swal-edit-masuk" type="time" value="${current.jamMasuk}" style="width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
            </div>
            <div style="flex: 1;">
              <label style="display: block; font-size: 13px; color: #4b5563; margin-bottom: 4px;">Jam Pulang</label>
              <input id="swal-edit-pulang" type="time" value="${current.jamPulang}" style="width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box;">
            </div>
          </div>
          <div style="margin-bottom: 12px;">
            <label style="display: block; font-size: 13px; color: #4b5563; margin-bottom: 4px;">Keterangan</label>
            <select id="swal-edit-keterangan" style="width: 100%; padding: 8px 10px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; box-sizing: border-box; background-color:#fff;">
              <option value="Hadir" ${current.keterangan === 'Hadir' ? 'selected' : ''}>Hadir</option>
              <option value="Izin" ${current.keterangan === 'Izin' ? 'selected' : ''}>Izin</option>
              <option value="Sakit" ${current.keterangan === 'Sakit' ? 'selected' : ''}>Sakit</option>
              <option value="Alpa" ${current.keterangan === 'Alpa' ? 'selected' : ''}>Alpa</option>
            </select>
          </div>
        </div>
      `,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "Perbarui",
      cancelButtonText: "Batal",
      reverseButtons: true,
      customClass: {
        popup: 'custom-swal-popup',
        actions: 'custom-swal-actions',
        confirmButton: 'custom-swal-confirm',
        cancelButton: 'custom-swal-cancel',
        closeButton: 'custom-swal-close'
      },
      preConfirm: () => {
        const tanggal = document.getElementById('swal-edit-tanggal').value;
        const jamMasuk = document.getElementById('swal-edit-masuk').value;
        const jamPulang = document.getElementById('swal-edit-pulang').value;
        const keterangan = document.getElementById('swal-edit-keterangan').value;

        if (!tanggal || !jamMasuk || !jamPulang) {
          Swal.showValidationMessage('Semua form wajib diisi!');
          return false;
        }

        const statusMasuk = jamMasuk > "07:30" ? "Terlambat" : "Tepat Waktu";
        const statusPulang = jamPulang < "16:00" ? "Pulang Awal" : "Sesuai Jadwal";

        return {
          ...current,
          tanggal, jamMasuk, jamPulang, keterangan, statusMasuk, statusPulang
        };
      }
    });

    if (formValues) {
      setDataAbsensi(prev => prev.map(item => item.id === id ? formValues : item));
      Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Data absensi diperbarui.', timer: 1500, showConfirmButton: false });
    }
  };

  // =========================
  // HAPUS DATA
  // =========================
  const handleHapusAbsensi = (id) => {
    Swal.fire({
      title: 'Apakah Anda yakin?',
      text: "Data absensi harian yang dihapus tidak bisa dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        setDataAbsensi(prev => prev.filter(item => item.id !== id));
        Swal.fire({ icon: 'success', title: 'Dihapus!', text: 'Data absensi telah dihapus.', timer: 1500, showConfirmButton: false });
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans text-gray-700">
      {/* Title Utama */}
      <div className="flex items-center gap-2 mb-4 text-blue-900">
        <UserCheck size={24} className="text-blue-600" />
        <h1 className="text-xl font-semibold">Absensi Harian Pegawai</h1>
      </div>

      {/* --- SECTION FILTER --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b flex items-center gap-2 text-blue-600 font-bold text-sm">
          <FilterIcon size={16} /> Filter
        </div>
        <div className="p-5 flex flex-wrap items-end gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium mb-1.5">Jenis Pegawai</label>
            <div className="relative">
              <select className="w-full border rounded-md p-2 text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-400 bg-white">
                <option>-- Semua Jenis --</option>
                <option>Pegawai Tetap</option>
                <option>Kontrak</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-medium mb-1.5">Unit</label>
            <div className="relative">
              <select className="w-full border rounded-md p-2 text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-400 bg-white">
                <option>-- Semua Unit --</option>
                <option>0</option>
                <option>SD</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5">Tanggal Awal</label>
            <input type="date" defaultValue="2026-05-13" className="border rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-blue-400 bg-white" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5">Tanggal Akhir</label>
            <input type="date" defaultValue="2026-05-13" className="border rounded-md p-2 text-sm outline-none focus:ring-1 focus:ring-blue-400 bg-white" />
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition shadow-sm">
              <FilterIcon size={16} /> Filter
            </button>
            <button 
              onClick={handleTambahAbsensi}
              className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition shadow-sm"
            >
              <Plus size={16} strokeWidth={3} /> Tambah
            </button>
          </div>
        </div>
      </div>

      {/* --- SECTION DATA ABSENSI --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b flex items-center gap-2 text-green-700 font-bold text-sm">
          <ClipboardList size={16} /> Data Absensi
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-[11px] font-bold text-center border-collapse">
            <thead>
              <tr className="bg-blue-50/50 text-gray-800 divide-x divide-gray-200 border-b">
                <th className="p-3 w-10">#</th>
                <th className="p-3">Tanggal</th>
                <th className="p-3">NIP</th>
                <th className="p-3 text-left px-4">Nama</th>
                <th className="p-3">Jenis Pegawai</th>
                <th className="p-3 w-14">Unit</th>
                <th className="p-3 bg-gray-100/70">Jam Masuk</th>
                <th className="p-3 bg-gray-100/70">Status Masuk</th>
                <th className="p-3 bg-gray-100/70">Jam Pulang</th>
                <th className="p-3 bg-gray-100/70">Status Pulang</th>
                <th className="p-3">Keterangan</th>
                <th className="p-3 text-red-600">Terlambat</th>
                <th className="p-3 text-orange-600">Pulang Awal</th>
                <th className="p-3 w-20">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dataAbsensi.length > 0 ? (
                dataAbsensi.map((row, index) => (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors divide-x divide-gray-100">
                    <td className="p-3 text-gray-400 bg-gray-50/50">{index + 1}</td>
                    <td className="p-3 text-gray-600 whitespace-nowrap">{row.tanggal}</td>
                    <td className="p-3 text-gray-600 font-mono">{row.nip}</td>
                    <td className="p-3 text-left text-gray-800 px-4 font-semibold">{row.nama}</td>
                    <td className="p-3 text-gray-600">{row.jenisPegawai}</td>
                    <td className="p-3 text-gray-600">{row.unit || '-'}</td>
                    <td className="p-3 bg-gray-50/30 text-gray-700">{row.jamMasuk || '-'}</td>
                    <td className="p-3 bg-gray-50/30">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${row.statusMasuk === 'Tepat Waktu' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {row.statusMasuk}
                      </span>
                    </td>
                    <td className="p-3 bg-gray-50/30 text-gray-700">{row.jamPulang || '-'}</td>
                    <td className="p-3 bg-gray-50/30">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${row.statusPulang === 'Sesuai Jadwal' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'}`}>
                        {row.statusPulang}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${row.keterangan === 'Hadir' ? 'bg-green-600 text-white' : 'bg-amber-500 text-white'}`}>
                        {row.keterangan}
                      </span>
                    </td>
                    <td className="p-3 text-red-600">{row.terlambat}</td>
                    <td className="p-3 text-orange-600">{row.pulangAwal}</td>
                    <td className="p-2 flex items-center justify-center gap-1.5">
                      <button 
                        onClick={() => handleEditAbsensi(row.id)}
                        className="p-1 bg-amber-500 text-white rounded hover:bg-amber-600 transition"
                        title="Edit Data"
                      >
                        <Edit size={12} />
                      </button>
                      <button 
                        onClick={() => handleHapusAbsensi(row.id)}
                        className="p-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        title="Hapus Data"
                      >
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="14" className="py-12">
                    <div className="flex flex-col items-center text-gray-400">
                      <div className="bg-gray-100 p-3 rounded-lg mb-2">
                        <ClipboardList size={32} />
                      </div>
                      <p className="text-xs font-medium">Belum ada data absensi</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SECTION REKAP ABSENSI --- */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gray-50 px-4 py-2 border-b flex items-center gap-2 text-blue-900 font-bold text-sm">
          <LayoutList size={16} /> Rekap Absensi Pegawai
        </div>
        <div className="p-0 overflow-x-auto">
          <table className="w-full text-[11px] font-bold text-center border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white divide-x divide-blue-800 border-b">
                <th className="p-3 w-10">#</th>
                <th className="p-3">NIP</th>
                <th className="p-3 text-left px-4">Nama</th>
                <th className="p-3">Jenis Pegawai</th>
                <th className="p-3 w-16">Unit</th>
                <th className="p-3 bg-blue-950">Total Hadir</th>
                <th className="p-3">Tepat Waktu</th>
                <th className="p-3 text-orange-300">Terlambat</th>
                <th className="p-3 text-orange-300">Pulang Cepat</th>
                <th className="p-3 text-amber-300">Izin Pribadi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {rekapAbsensi.map((rekap, idx) => (
                <tr key={rekap.nip} className="hover:bg-gray-50 transition-colors divide-x divide-gray-100">
                  <td className="p-3 text-gray-400 bg-gray-50/50">{idx + 1}</td>
                  <td className="p-3 text-gray-600 font-mono">{rekap.nip}</td>
                  <td className="p-3 text-left text-gray-800 px-4 font-semibold">{rekap.nama}</td>
                  <td className="p-3 text-gray-600">{rekap.jenisPegawai}</td>
                  <td className="p-3 text-gray-600">{rekap.unit || '-'}</td>
                  <td className="p-3 bg-blue-50/40 font-bold text-blue-900 text-sm">{rekap.totalHadir}</td>
                  <td className="p-3 text-green-700">{rekap.tepatWaktu}</td>
                  <td className="p-3 text-red-600">{rekap.terlambat}</td>
                  <td className="p-3 text-orange-600">{rekap.pulangCepat}</td>
                  <td className="p-3 text-amber-600">{rekap.izinPribadi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AbsensiHarianPegawai;