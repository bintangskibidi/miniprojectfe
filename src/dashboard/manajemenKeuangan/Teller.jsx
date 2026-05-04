import React, { useState } from "react";

export default function Teller() {
  const [nis, setNis] = useState("");
  const [jenis, setJenis] = useState("Penyetoran");
  const [nominal, setNominal] = useState("");
  const [ket, setKet] = useState("");

  return (
    <div className="p-4 grid grid-cols-3 gap-4 bg-gray-100 min-h-screen">
      
      {/* LEFT FORM */}
      <div className="col-span-1 bg-white rounded shadow p-4">
        <h2 className="text-blue-600 font-semibold text-lg mb-4">
          Transaksi Tabungan & Teller
        </h2>

        {/* Jenis */}
        <label className="text-sm">Transaksi Tabungan</label>
        <select className="w-full border p-2 rounded mt-1 mb-3">
          <option>Transaksi Tabungan</option>
        </select>

        {/* NIS */}
        <label className="text-sm">NIS/NAMA</label>
        <input
          type="text"
          value={nis}
          onChange={(e) => setNis(e.target.value)}
          placeholder="Masukkan NIS atau Nama"
          className="w-full border p-2 rounded mt-1 mb-3"
        />

        {/* Jenis Transaksi */}
        <label className="text-sm">Jenis Transaksi</label>
        <select
          value={jenis}
          onChange={(e) => setJenis(e.target.value)}
          className="w-full border p-2 rounded mt-1 mb-3"
        >
          <option>Penyetoran</option>
          <option>Penarikan</option>
        </select>

        {/* Nominal */}
        <label className="text-sm">Nominal</label>
        <input
          type="number"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
          placeholder="Masukkan nominal"
          className="w-full border p-2 rounded mt-1 mb-3"
        />

        {/* Keterangan */}
        <label className="text-sm">Keterangan</label>
        <input
          type="text"
          value={ket}
          onChange={(e) => setKet(e.target.value)}
          placeholder="Keterangan transaksi"
          className="w-full border p-2 rounded mt-1 mb-4"
        />

        {/* Button */}
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Submit Tabungan
        </button>
      </div>

      {/* RIGHT CONTENT */}
      <div className="col-span-2 space-y-4">
        
        {/* TOP CARDS */}
        <div className="grid grid-cols-2 gap-4">
          
          <div className="bg-white rounded shadow p-4 border border-green-500">
            <p className="text-sm text-gray-600">Total Saldo Tabungan</p>
            <h2 className="text-xl font-bold text-green-600">
              Rp3.959.578
            </h2>
          </div>

          <div className="bg-white rounded shadow p-4">
            <p className="text-sm text-gray-600">Total Penabung</p>
            <h2 className="text-xl font-bold text-gray-700">
              9 Siswa
            </h2>
          </div>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded shadow">
          
          {/* Header */}
          <div className="bg-gray-600 text-white px-4 py-2 flex justify-between items-center rounded-t">
            <span>Riwayat Transaksi Hari Ini</span>
            <span className="bg-white text-black text-xs px-2 py-1 rounded">
              04/05/2026
            </span>
          </div>

          {/* Table */}
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">No</th>
                <th className="p-2 border text-left">Nama / Kode</th>
                <th className="p-2 border">Jenis Transaksi</th>
                <th className="p-2 border">Jumlah</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  Belum ada transaksi hari ini <br />
                  <span className="text-xs">
                    Transaksi akan muncul di sini setelah disimpan
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>

    </div>
  );
}