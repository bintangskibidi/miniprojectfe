import React from "react";

export default function RealisasiPenerimaan() {
  const data = [
    {
      kode: "4001",
      nama: "Pendapatan SPP",
      juli: "4.351.000",
      agustus: "0",
      september: "150.000",
      oktober: "700.000",
      november: "4.160.000",
      desember: "730.000",
      januari: "0",
      februari: "0",
      maret: "0",
      april: "0",
      mei: "0",
      juni: "0",
      total: "10.091.000",
    },
    {
      kode: "4004",
      nama: "Pendapatan Wakaf",
      juli: "0",
      agustus: "0",
      september: "0",
      oktober: "2.000.000",
      november: "0",
      desember: "37.000.000",
      januari: "12.121",
      februari: "0",
      maret: "0",
      april: "0",
      mei: "0",
      juni: "0",
      total: "39.012.121",
    },
  ];

  return (
    <div className="p-4">
      <div className="border rounded-md bg-white shadow-sm">
        {/* Header */}
        <div className="border-b px-4 py-2 font-semibold text-gray-700">
          Realisasi Penerimaan Tahun Ajaran 2025/2026
        </div>

        {/* Top Control */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
          <div className="flex items-center gap-2 text-sm">
            <span>Tampilkan</span>

            <select className="border rounded px-2 py-1">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>

            <span>data</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span>Cari:</span>
            <input
              type="text"
              className="border rounded px-3 py-1 outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-2 px-4 pb-4">
          {["Copy", "CSV", "Excel", "PDF", "Print"].map((btn) => (
            <button
              key={btn}
              className="border bg-gray-100 hover:bg-gray-200 px-3 py-1 text-sm rounded"
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">#</th>
                <th className="border px-3 py-2">Kode Akun</th>
                <th className="border px-3 py-2">Nama Akun</th>
                {[
                  "Juli",
                  "Agustus",
                  "September",
                  "Oktober",
                  "November",
                  "Desember",
                  "Januari",
                  "Februari",
                  "Maret",
                  "April",
                  "Mei",
                  "Juni",
                ].map((bulan) => (
                  <th key={bulan} className="border px-3 py-2">
                    {bulan}
                  </th>
                ))}
                <th className="border px-3 py-2">Total</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border px-3 py-2 text-center">
                    {index + 1}
                  </td>
                  <td className="border px-3 py-2">{item.kode}</td>
                  <td className="border px-3 py-2">{item.nama}</td>

                  <td className="border px-3 py-2">{item.juli}</td>
                  <td className="border px-3 py-2">{item.agustus}</td>
                  <td className="border px-3 py-2">{item.september}</td>
                  <td className="border px-3 py-2">{item.oktober}</td>
                  <td className="border px-3 py-2">{item.november}</td>
                  <td className="border px-3 py-2">{item.desember}</td>
                  <td className="border px-3 py-2">{item.januari}</td>
                  <td className="border px-3 py-2">{item.februari}</td>
                  <td className="border px-3 py-2">{item.maret}</td>
                  <td className="border px-3 py-2">{item.april}</td>
                  <td className="border px-3 py-2">{item.mei}</td>
                  <td className="border px-3 py-2">{item.juni}</td>

                  <td className="border px-3 py-2 font-semibold">
                    {item.total}
                  </td>
                </tr>
              ))}

              {/* Footer Total */}
              <tr className="bg-gray-100 font-bold">
                <td
                  colSpan={3}
                  className="border px-3 py-2 text-center"
                >
                  Total Penerimaan
                </td>

                <td className="border px-3 py-2">4.351.000</td>
                <td className="border px-3 py-2">0</td>
                <td className="border px-3 py-2">150.000</td>
                <td className="border px-3 py-2">2.700.000</td>
                <td className="border px-3 py-2">4.160.000</td>
                <td className="border px-3 py-2">37.730.000</td>
                <td className="border px-3 py-2">12.121</td>
                <td className="border px-3 py-2">0</td>
                <td className="border px-3 py-2">0</td>
                <td className="border px-3 py-2">0</td>
                <td className="border px-3 py-2">0</td>
                <td className="border px-3 py-2">0</td>

                <td className="border px-3 py-2 text-red-600">
                  49.103.121
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 p-4 text-sm">
          <div>Menampilkan 1 sampai 2 dari 2 data</div>

          <div className="flex items-center gap-2">
            <button className="border px-3 py-1 rounded hover:bg-gray-100">
              Sebelumnya
            </button>

            <button className="border px-3 py-1 rounded bg-gray-200">
              1
            </button>

            <button className="border px-3 py-1 rounded hover:bg-gray-100">
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}