import React from "react";

export default function RealisasiBelanja() {
  const data = [
    {
      kode: "5004",
      nama: "Beban Operasional",
      juli: "1.000.000",
      agustus: "0",
      september: "0",
      oktober: "18.000",
      november: "0",
      desember: "1.250.000",
      januari: "110.000",
      februari: "0",
      maret: "0",
      april: "0",
      mei: "0",
      juni: "0",
      total: "2.378.000",
    },
  ];

  return (
    <div className="p-4">
      <div className="bg-white border rounded-md shadow-sm">
        {/* Header */}
        <div className="border-b px-4 py-2 font-semibold text-gray-700">
          Realisasi Belanja dan Pembiayaan Tahun Ajaran 2025/2026
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
              className="border bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded text-sm"
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

              {/* Footer */}
              <tr className="bg-gray-100 font-bold">
                <td
                  colSpan={3}
                  className="border px-3 py-2 text-center"
                >
                  Total Belanja
                </td>

                <td className="border px-3 py-2">1.000.000</td>
                <td className="border px-3 py-2">0</td>
                <td className="border px-3 py-2">0</td>
                <td className="border px-3 py-2">18.000</td>
                <td className="border px-3 py-2">0</td>
                <td className="border px-3 py-2">1.250.000</td>
                <td className="border px-3 py-2">110.000</td>
                <td className="border px-3 py-2">0</td>
                <td className="border px-3 py-2">0</td>
                <td className="border px-3 py-2">0</td>
                <td className="border px-3 py-2">0</td>
                <td className="border px-3 py-2">0</td>

                <td className="border px-3 py-2 text-red-600">
                  2.378.000
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 p-4 text-sm">
          <div>Menampilkan 1 sampai 1 dari 1 data</div>

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