import React, { useState } from "react";

export default function BayarTagihan() {
  const [tahun, setTahun] = useState("");
  const [keyword, setKeyword] = useState("");

  return (
    <div className="bg-white border rounded">
      {/* Header */}
      <div className="bg-cyan-500 text-white px-4 py-2 font-semibold rounded-t flex items-center gap-2">
        <span>🔽</span>
        Filter Data Pembayaran Siswa
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex gap-4">
          
          {/* Tahun Ajaran */}
          <div className="flex flex-col w-1/3">
            <label className="text-sm mb-1">Tahun Ajaran</label>
            <select
              value={tahun}
              onChange={(e) => setTahun(e.target.value)}
              className="border p-2 rounded bg-gray-100 focus:bg-white"
            >
              <option value="">Pilih Tahun Ajaran</option>
              <option value="2025/2026">2025/2026 ()</option>
              <option value="2024/2025">2024/2025 ()</option>
            </select>
          </div>

          {/* Cari Siswa */}
          <div className="flex flex-col w-2/3">
            <label className="text-sm mb-1">
              Cari Siswa (NIS atau Nama)
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Ketik NIS atau Nama Siswa..."
              className="border p-2 rounded bg-gray-100 focus:bg-white"
            />

            {/* Info */}
            <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
              ℹ️ Pilih siswa dari dropdown untuk melihat data secara otomatis
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}