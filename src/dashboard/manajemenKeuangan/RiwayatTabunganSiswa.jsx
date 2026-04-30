import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RiwayatTabunganSiswa() {
  const [tglAwal, setTglAwal] = useState(new Date("2026-04-01"));
  const [tglAkhir, setTglAkhir] = useState(new Date("2026-04-30"));
  const [keyword, setKeyword] = useState("");

  return (
    <div className="p-6">

      {/* CARD */}
      <div className="bg-white rounded shadow border">

        {/* HEADER BIRU */}
        <div className="bg-blue-600 text-white px-4 py-3 rounded-t font-semibold text-lg">
          Riwayat Tabungan Siswa
        </div>

        {/* BODY */}
        <div className="p-4">
          <div className="flex flex-wrap gap-4 items-end">

            {/* INPUT NIS / NAMA */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Cari NIS/Nama Siswa</label>
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Ketik NIS atau nama siswa..."
                className="border rounded px-3 py-2 w-[260px]"
              />
            </div>

            {/* TANGGAL AWAL */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Tanggal Awal</label>
              <DatePicker
                selected={tglAwal}
                onChange={(date) => setTglAwal(date)}
                className="border rounded px-3 py-2 w-[180px]"
                dateFormat="dd/MM/yyyy"
              />
            </div>

            {/* TANGGAL AKHIR */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Tanggal Akhir</label>
              <DatePicker
                selected={tglAkhir}
                onChange={(date) => setTglAkhir(date)}
                className="border rounded px-3 py-2 w-[180px]"
                dateFormat="dd/MM/yyyy"
              />
            </div>

            {/* BUTTON */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded h-[42px]">
              Filter
            </button>

          </div>

          {/* INFO BOX */}
          <div className="mt-4 bg-blue-100 text-blue-800 px-4 py-3 rounded border border-blue-200">
            Silakan cari siswa dengan NIS atau nama untuk menampilkan riwayat tabungan.
          </div>

        </div>
      </div>
    </div>
  );
}