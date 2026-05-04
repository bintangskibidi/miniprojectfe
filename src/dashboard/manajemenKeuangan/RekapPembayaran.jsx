import React, { useState } from "react";

const RekapPembayaran = () => {
  const [form, setForm] = useState({
    kelas: "",
    tahun: "",
    tipe: "",
    jenis: "",
  });

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white border border-gray-300 rounded-md shadow-sm">

        {/* HEADER */}
        <div className="bg-cyan-500 text-white px-4 py-2 rounded-t-md font-semibold">
          Rekap Pembayaran
        </div>

        {/* BODY */}
        <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* KELAS */}
          <div>
            <label className="text-sm text-gray-700">Kelas</label>
            <select
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              value={form.kelas}
              onChange={(e) => setForm({ ...form, kelas: e.target.value })}
            >
              <option value="">Pilih Kelas</option>
              <option>VII A</option>
              <option>VII B</option>
            </select>
          </div>

          {/* TAHUN AJARAN */}
          <div>
            <label className="text-sm text-gray-700">Tahun Ajaran</label>
            <select
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              value={form.tahun}
              onChange={(e) => setForm({ ...form, tahun: e.target.value })}
            >
              <option value="">Pilih Tahun</option>
              <option>2025/2026</option>
              <option>2026/2027</option>
            </select>
          </div>

          {/* TIPE BAYAR */}
          <div>
            <label className="text-sm text-gray-700">Tipe Bayar</label>
            <select
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              value={form.tipe}
              onChange={(e) => setForm({ ...form, tipe: e.target.value })}
            >
              <option value="">Pilih Tipe</option>
              <option>Bulanan</option>
              <option>Tahunan</option>
            </select>
          </div>

          {/* JENIS BAYAR */}
          <div className="md:col-span-2">
            <label className="text-sm text-gray-700">Jenis Bayar</label>
            <select
              className="w-full mt-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
              value={form.jenis}
              onChange={(e) => setForm({ ...form, jenis: e.target.value })}
            >
              <option value="">Pilih Jenis Pembayaran</option>
              <option>SPP</option>
              <option>Uang Gedung</option>
            </select>
          </div>

          {/* BUTTON */}
          <div className="flex items-end">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded text-sm">
              PILIH
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RekapPembayaran;