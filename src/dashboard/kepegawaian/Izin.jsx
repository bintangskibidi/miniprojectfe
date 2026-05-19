import React, { useState } from 'react';
import { Plus, ChevronDown, Check, X } from 'lucide-react';
import Swal from 'sweetalert2';

const Izin = () => {
  // =========================
  // STATE DATA
  // =========================
  const [dataIzin, setDataIzin] = useState([
    { id: 1, nama: 'Bayu Aji lesmana eka putra', unit: '0', mulai: '2025-10-06', selesai: '2025-10-09', alasan: 'Urusan Keluarga', status: 'Rejected' },
    { id: 2, nama: 'Bayu Aji lesmana eka putra', unit: '0', mulai: '2025-10-06', selesai: '2025-10-06', alasan: 'Perpanjang SIM', status: 'Rejected' },
    { id: 3, nama: 'Agus Santoso', unit: '0', mulai: '2025-07-04', selesai: '2025-07-12', alasan: 'Izin Sakit', status: 'Rejected' },
    { id: 4, nama: 'Andi Susanto', unit: 'SD', mulai: '2025-07-04', selesai: '2025-07-11', alasan: 'Keperluan Antar Orang Tua', status: 'Rejected' },
    { id: 5, nama: 'Agus Santoso', unit: '0', mulai: '2025-07-04', selesai: '2025-07-11', alasan: 'Menghadiri Pernikahan Saudara', status: 'Approved' },
  ]);

  // State untuk Filter
  const [filterPegawai, setFilterPegawai] = useState('-- Filter Pegawai --');
  const [filterStatus, setFilterStatus] = useState('-- Filter Status --');

  // =========================
  // TAMBAH IZIN
  // =========================
  const handleAjukanIzin = async () => {
    const { value: formValues } = await Swal.fire({
      title: `<div style="text-align: left; font-size: 18px; font-weight: 600; color: #1f2937; padding-bottom: 4px;">Ajukan Izin</div>`,
      html: `
        <div style="text-align: left; font-family: sans-serif;">
          
          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 14px; color: #4b5563; margin-bottom: 6px;">Pegawai</label>
            <div style="position: relative;">
              <select id="nama" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; color: #1f2937; appearance: none; background-color: #fff; outline: none; box-sizing: border-box;">
                <option value="Agus Santoso">Agus Santoso</option>
                <option value="Andi Susanto">Andi Susanto</option>
                <option value="Bayu Aji lesmana eka putra">
                  Bayu Aji lesmana eka putra
                </option>
              </select>
              <span style="position: absolute; right: 12px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #6b7280; font-size: 12px;">▼</span>
            </div>
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 14px; color: #4b5563; margin-bottom: 6px;">Tanggal Mulai</label>
            <input id="mulai" type="date" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; color: #1f2937; box-sizing: border-box; outline: none;">
          </div>

          <div style="margin-bottom: 16px;">
            <label style="display: block; font-size: 14px; color: #4b5563; margin-bottom: 6px;">Tanggal Selesai</label>
            <input id="selesai" type="date" style="width: 100%; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; color: #1f2937; box-sizing: border-box; outline: none;">
          </div>

          <div style="margin-bottom: 8px;">
            <label style="display: block; font-size: 14px; color: #4b5563; margin-bottom: 6px;">Alasan</label>
            <textarea 
              id="alasan"
              style="width: 100%; height: 100px; padding: 10px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; color: #1f2937; resize: vertical; box-sizing: border-box; outline: none;"
              placeholder="Masukkan alasan izin"
            ></textarea>
          </div>

        </div>
      `,
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonText: "Ajukan",
      cancelButtonText: "Batal",
      reverseButtons: true,

      customClass: {
        popup: 'custom-swal-popup',
        actions: 'custom-swal-actions',
        confirmButton: 'custom-swal-confirm',
        cancelButton: 'custom-swal-cancel',
        closeButton: 'custom-swal-close'
      },
      didOpen: () => {
        const style = document.createElement('style');
        style.innerHTML = `
          .custom-swal-popup {
            width: 460px !important;
            padding: 20px !important;
            border-radius: 8px !important;
          }
          .custom-swal-actions {
            width: 100% !important;
            justify-content: flex-end !important;
            margin-top: 20px !important;
            padding: 0 !important;
          }
          .custom-swal-confirm {
            background-color: #2563eb !important;
            color: white !important;
            padding: 10px 24px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            border-radius: 6px !important;
            margin-left: 10px !important;
            box-shadow: none !important;
          }
          .custom-swal-cancel {
            background-color: #6b7280 !important;
            color: white !important;
            padding: 10px 24px !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            border-radius: 6px !important;
            box-shadow: none !important;
          }
          .custom-swal-close {
            color: #9ca3af !important;
            font-size: 22px !important;
            top: 16px !important;
            right: 16px !important;
          }
          .swal2-html-container {
            margin: 15px 0 0 0 !important;
            overflow: hidden !important;
          }
        `;
        document.head.appendChild(style);
      },

      preConfirm: () => {
        const nama = document.getElementById("nama").value;
        const mulai = document.getElementById("mulai").value;
        const selesai = document.getElementById("selesai").value;
        const alasan = document.getElementById("alasan").value;

        if (!mulai || !selesai || !alasan) {
          Swal.showValidationMessage('Semua bidang data harus diisi!');
          return false;
        }

        return {
          id: Date.now(),
          nama: nama,
          unit: nama === "Andi Susanto" ? "SD" : "0",
          mulai: mulai,
          selesai: selesai,
          alasan: alasan,
          status: "Pending",
        };
      },
    });

    if (formValues) {
      setDataIzin((prev) => [...prev, formValues]);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Pengajuan izin berhasil ditambahkan",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // =========================
  // APPROVE / REJECT ACTIONS
  // =========================
  const handleApprove = (id) => {
    setDataIzin((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Approved' } : item))
    );
    Swal.fire({ icon: 'success', title: 'Approved', text: 'Izin disetujui', timer: 1500, showConfirmButton: false });
  };

  const handleReject = (id) => {
    setDataIzin((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'Rejected' } : item))
    );
    Swal.fire({ icon: 'error', title: 'Rejected', text: 'Pengajuan izin ditolak', timer: 1500, showConfirmButton: false });
  };

  // =========================
  // FILTER ENGINE
  // =========================
  const filteredData = dataIzin.filter((item) => {
    const matchPegawai = filterPegawai === '-- Filter Pegawai --' || item.nama === filterPegawai;
    const matchStatus = filterStatus === '-- Filter Status --' || item.status === filterStatus;
    return matchPegawai && matchStatus;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Header Section */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h1 className="text-blue-600 font-semibold text-lg">Manajemen Izin</h1>
          <button 
            onClick={handleAjukanIzin}
            className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-bold transition shadow-sm"
          >
            <Plus size={18} strokeWidth={3} /> Ajukan Izin
          </button>
        </div>

        <div className="p-5">
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="relative w-64">
              <select 
                value={filterPegawai}
                onChange={(e) => setFilterPegawai(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-400 pr-10 bg-white"
              >
                <option>-- Filter Pegawai --</option>
                <option>Bayu Aji lesmana eka putra</option>
                <option>Agus Santoso</option>
                <option>Andi Susanto</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={16} />
            </div>

            <div className="relative w-48">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-sm appearance-none outline-none focus:ring-1 focus:ring-blue-400 pr-10 bg-white"
              >
                <option>-- Filter Status --</option>
                <option>Approved</option>
                <option>Rejected</option>
                <option>Pending</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Table Data */}
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-blue-100 text-gray-800 divide-x divide-blue-200">
                  <th className="p-3 text-center w-12 font-bold">No</th>
                  <th className="p-3 font-bold text-center">Nama Pegawai</th>
                  <th className="p-3 font-bold text-center w-16">Unit</th>
                  <th className="p-3 font-bold text-center">Tanggal Mulai</th>
                  <th className="p-3 font-bold text-center">Tanggal Selesai</th>
                  <th className="p-3 font-bold text-center">Alasan</th>
                  <th className="p-3 font-bold text-center w-32">Status</th>
                  <th className="p-3 font-bold text-center w-24">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-center border-r bg-gray-50/50">{index + 1}</td>
                      <td className="p-3 border-r text-gray-700 px-4">{row.nama}</td>
                      <td className="p-3 border-r text-center text-gray-600">{row.unit || '-'}</td>
                      <td className="p-3 border-r text-center text-gray-700 font-medium">{row.mulai}</td>
                      <td className="p-3 border-r text-center text-gray-700 font-medium">{row.selesai}</td>
                      <td className="p-3 border-r text-gray-600 px-4 italic">{row.alasan}</td>
                      
                      {/* STATUS TAG */}
                      <td className="p-3 border-r text-center">
                        <span className={`inline-block px-3 py-1 rounded-md text-[11px] font-bold text-white min-w-[80px] shadow-sm ${
                          row.status === 'Approved' 
                            ? 'bg-green-700' 
                            : row.status === 'Rejected' 
                            ? 'bg-red-600' 
                            : 'bg-yellow-500 text-black'
                        }`}>
                          {row.status}
                        </span>
                      </td>

                      {/* ACTIONS ROW */}
                      <td className="p-3 text-center">
                        {row.status === 'Pending' ? (
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => handleApprove(row.id)}
                              className="bg-green-600 hover:bg-green-700 text-white p-2 rounded transition"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={() => handleReject(row.id)}
                              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded transition"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400 font-semibold">-</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-gray-500">
                      Tidak ada data izin yang cocok
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Izin;   