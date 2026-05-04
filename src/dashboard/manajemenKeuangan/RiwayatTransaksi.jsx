import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RiwayatTransaksi() {
  const [tglAwal, setTglAwal] = useState(new Date("2026-04-01"));
  const [tglAkhir, setTglAkhir] = useState(new Date("2026-04-30"));

  return (
    <div className="p-6">

      {/* TITLE */}
      <h2 className="text-xl font-semibold mb-4">
        Riwayat Transaksi Semua Siswa
      </h2>

      {/* FILTER CARD */}
      <div className="bg-white rounded shadow border mb-4">

        {/* HEADER */}
        <div className="bg-blue-600 text-white px-4 py-2 rounded-t font-semibold">
          Filter Transaksi
        </div>

        {/* BODY */}
        <div className="p-4">
          <div className="flex flex-wrap gap-4 items-end">

            {/* TANGGAL AWAL */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Tanggal Awal</label>
              <DatePicker
                selected={tglAwal}
                onChange={(date) => setTglAwal(date)}
                className="border rounded px-3 py-2 w-[250px]"
                dateFormat="dd/MM/yyyy"
              />
            </div>

            {/* TANGGAL AKHIR */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Tanggal Akhir</label>
              <DatePicker
                selected={tglAkhir}
                onChange={(date) => setTglAkhir(date)}
                className="border rounded px-3 py-2 w-[250px]"
                dateFormat="dd/MM/yyyy"
              />
            </div>

            {/* BUTTON */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded h-[42px]">
              Filter
            </button>

          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded shadow border">

        {/* HEADER TABLE */}
        <div className="bg-gray-600 text-white px-4 py-2 rounded-t font-semibold">
          Daftar Transaksi dari 01-04-2026 sampai 30-04-2026
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 text-left">No</th>
                <th className="px-3 py-2 text-left">Tanggal</th>
                <th className="px-3 py-2 text-left">Kode Transaksi</th>
                <th className="px-3 py-2 text-left">Jenis Transaksi</th>
                <th className="px-3 py-2 text-left">NIS</th>
                <th className="px-3 py-2 text-left">Nama Siswa</th>
                <th className="px-3 py-2 text-left">Jumlah (Rp)</th>
                <th className="px-3 py-2 text-left">Keterangan</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500 italic">
                  Tidak ada transaksi pada periode ini.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* FOOTER TOTAL */}
        <div className="px-4 py-3 text-right font-semibold">
          Total Saldo: Rp 0
        </div>

      </div>
    </div>
  );
}