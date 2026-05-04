import React, { useState } from "react";

export default function TarifPembayaranSiswa() {
  const [kelas, setKelas] = useState("");
  const [tahun, setTahun] = useState("");
  const [tipe, setTipe] = useState("");
  const [jenis, setJenis] = useState("");
  const [nama, setNama] = useState("");

  return (
    <div className="bg-white border rounded">
      
      {/* Header */}
      <div className="px-4 py-3 border-b font-semibold text-lg">
        Tarif Pembayaran Siswa
      </div>

      {/* Filter */}
      <div className="p-4">
        <p className="text-sm font-medium mb-3">Filter Data</p>

        {/* Grid 5 kolom */}
        <div className="grid grid-cols-5 gap-4">
          
          {/* Kelas */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Kelas</label>
            <select
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="border p-2 rounded bg-gray-100 focus:bg-white"
            >
              <option value="">Pilih</option>
              <option>Semua</option>
              <option>X</option>
              <option>XI</option>
            </select>
          </div>

          {/* Tahun */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Tahun Ajaran</label>
            <select
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="border p-2 rounded bg-gray-100 focus:bg-white"
            >
              <option value="">Pilih</option>
              <option>2025/2026</option>
              <option>2024/2025</option>
            </select>
          </div>

          {/* Tipe Bayar */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Tipe Bayar</label>
            <select
              value={tipe}
              onChange={(e) => setTipe(e.target.value)}
              className="border p-2 rounded bg-gray-100 focus:bg-white"
            >
              <option value="">Pilih</option>
              <option>Bulanan</option>
              <option>Bebas</option>
            </select>
          </div>

          {/* Jenis Bayar */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Jenis Bayar</label>
            <select
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              className="border p-2 rounded bg-gray-100 focus:bg-white"
            >
              <option value="">Pilih</option>
              <option>BOK</option>
              <option>Kalender</option>
              <option>LKS Semester 1</option>
              <option>LKS Semester 2</option>
              <option>SPP</option>
              <option>STS 1</option>
              <option>STS 2</option>
            </select>
          </div>

          {/* Nama */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Nama Siswa</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Cari nama siswa..."
              className="border p-2 rounded bg-gray-100 focus:bg-white"
            />
          </div>
        </div>

        {/* Button */}
        <div className="mt-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
            Tampilkan
          </button>
        </div>

      </div>
    </div>
  );
}