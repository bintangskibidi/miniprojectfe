import React from "react";

export default function APBSInduk() {
  return (
    <div className="p-4">
      <div className="bg-white border rounded-md shadow-sm">
        {/* Header */}
        <div className="border-b px-4 py-3">
          <h1 className="text-lg font-semibold text-gray-700">
            Rekapitulasi APBS Ringkas - Tahun Ajaran 2025
          </h1>
        </div>

        {/* Table */}
        <div className="overflow-x-auto p-3">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 w-12">#</th>

                <th className="border px-3 py-2 text-left">
                  Kode Akun
                </th>

                <th className="border px-3 py-2 text-left">
                  Nama Akun
                </th>

                <th className="border px-3 py-2">
                  Total Realisasi
                </th>

                <th className="border px-3 py-2">
                  Saldo Awal
                </th>

                <th className="border px-3 py-2">
                  Saldo Berjalan
                </th>

                <th className="border px-3 py-2">
                  Proyeksi Akhir Tahun
                </th>
              </tr>
            </thead>

            <tbody>
              {/* PENDAPATAN */}
              <tr className="bg-gray-200 font-bold">
                <td
                  colSpan={7}
                  className="border px-3 py-2 text-left"
                >
                  PENDAPATAN
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border px-3 py-2 text-center">
                  1
                </td>

                <td className="border px-3 py-2">4001</td>

                <td className="border px-3 py-2">
                  Pendapatan SPP
                </td>

                <td className="border px-3 py-2 text-right">
                  10.091.000
                </td>

                <td className="border px-3 py-2 text-right">
                  0
                </td>

                <td className="border px-3 py-2 text-right">
                  10.091.000
                </td>

                <td className="border px-3 py-2 text-right">
                  10.091.000
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border px-3 py-2 text-center">
                  2
                </td>

                <td className="border px-3 py-2">4004</td>

                <td className="border px-3 py-2">
                  Pendapatan Wakaf
                </td>

                <td className="border px-3 py-2 text-right">
                  39.012.121
                </td>

                <td className="border px-3 py-2 text-right">
                  0
                </td>

                <td className="border px-3 py-2 text-right">
                  39.012.121
                </td>

                <td className="border px-3 py-2 text-right">
                  39.012.121
                </td>
              </tr>

              {/* TOTAL PENDAPATAN */}
              <tr className="bg-blue-100 font-bold">
                <td
                  colSpan={3}
                  className="border px-3 py-2 text-center"
                >
                  TOTAL PENDAPATAN
                </td>

                <td className="border px-3 py-2 text-right">
                  49.103.121
                </td>

                <td className="border px-3 py-2 text-right">
                  0
                </td>

                <td className="border px-3 py-2 text-right">
                  49.103.121
                </td>

                <td className="border px-3 py-2 text-right">
                  49.103.121
                </td>
              </tr>

              {/* BELANJA */}
              <tr className="bg-gray-200 font-bold">
                <td
                  colSpan={7}
                  className="border px-3 py-2 text-left"
                >
                  BELANJA
                </td>
              </tr>

              <tr className="hover:bg-gray-50">
                <td className="border px-3 py-2 text-center">
                  3
                </td>

                <td className="border px-3 py-2">5004</td>

                <td className="border px-3 py-2">
                  Beban Operasional
                </td>

                <td className="border px-3 py-2 text-right">
                  2.378.000
                </td>

                <td className="border px-3 py-2 text-right">
                  0
                </td>

                <td className="border px-3 py-2 text-right">
                  2.378.000
                </td>

                <td className="border px-3 py-2 text-right">
                  2.378.000
                </td>
              </tr>

              {/* TOTAL BELANJA */}
              <tr className="bg-blue-100 font-bold">
                <td
                  colSpan={3}
                  className="border px-3 py-2 text-center"
                >
                  TOTAL BELANJA
                </td>

                <td className="border px-3 py-2 text-right">
                  2.378.000
                </td>

                <td className="border px-3 py-2 text-right">
                  0
                </td>

                <td className="border px-3 py-2 text-right">
                  2.378.000
                </td>

                <td className="border px-3 py-2 text-right">
                  2.378.000
                </td>
              </tr>

              {/* TOTAL KESELURUHAN */}
              <tr className="bg-green-100 font-bold">
                <td
                  colSpan={3}
                  className="border px-3 py-2 text-center"
                >
                  TOTAL KESELURUHAN
                </td>

                <td className="border px-3 py-2 text-right">
                  51.481.121
                </td>

                <td className="border px-3 py-2 text-right">
                  0
                </td>

                <td className="border px-3 py-2 text-right">
                  51.481.121
                </td>

                <td className="border px-3 py-2 text-right">
                  51.481.121
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}