import React, { useState } from "react";

export default function TagihanBulanIni() {
  const [kelas, setKelas] = useState("");
  const [tahun, setTahun] = useState("");

  const handleTampilkan = () => {
    console.log(kelas, tahun);
  };

  return (
    <div className="bg-white border rounded">
      {/* Header */}
      <div className="bg-cyan-500 text-white px-4 py-2 font-semibold rounded-t">
        Rekap Tagihan Bulan Ini (April)
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-end gap-4">
          
          {/* Pilih Kelas */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm mb-1">Pilih Kelas</label>
            <select
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">-- Pilih Kelas --</option>
              <option value="Semua">Semua</option>
              <option value="IX A">IX A</option>
              <option value="IX B">IX B</option>
            </select>
          </div>

          {/* Pilih Tahun */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm mb-1">Pilih Tahun Ajaran</label>
            <select
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">-- Pilih Tahun Ajaran --</option>
              <option value="2024/2025">2024/2025</option>
              <option value="2025/2026">2025/2026</option>
            </select>
          </div>

          {/* Button */}
          <div className="w-1/3">
            <button
              onClick={handleTampilkan}
              disabled={!tahun || !kelas}
              className={`w-full py-2 rounded text-white font-semibold ${
                !tahun || !kelas
                  ? "bg-gray-400"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              TAMPILKAN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}