import React from "react";

const APBSDetail = () => {
  return (
    <div className="p-4">
      <div className="border rounded-md shadow-sm overflow-auto">

        {/* Header */}
        <div className="bg-gray-100 border-b px-4 py-2 font-semibold text-sm">
          APBD Detail Tahun Ajaran 2025/2026
        </div>

        <table className="min-w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-200">
              <th rowSpan="2" className="border px-2 py-2">#</th>
              <th rowSpan="2" className="border px-3 py-2">Kode Akun</th>
              <th rowSpan="2" className="border px-3 py-2">Nama Akun</th>

              <th colSpan="12" className="border px-3 py-2 text-center">
                Bulan
              </th>

              <th rowSpan="2" className="border px-3 py-2">Total</th>
            </tr>

            <tr className="bg-gray-100">
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
              ].map((bulan, i) => (
                <th key={i} className="border px-2 py-2">
                  {bulan}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {/* Pendapatan */}
            <tr className="bg-gray-300 font-bold">
              <td colSpan="16" className="border px-2 py-2">
                PENDAPATAN
              </td>
            </tr>

            <tr>
              <td className="border px-2 py-1">1</td>
              <td className="border px-2 py-1">4001</td>
              <td className="border px-2 py-1">Pendapatan SPP</td>

              <td className="border px-2 py-1 text-right">4.351.000</td>
              <td className="border px-2 py-1 text-right">0</td>
              <td className="border px-2 py-1 text-right">150.000</td>
              <td className="border px-2 py-1 text-right">700.000</td>
              <td className="border px-2 py-1 text-right">4.160.000</td>
              <td className="border px-2 py-1 text-right">730.000</td>
              <td className="border px-2 py-1 text-right">0</td>
              <td className="border px-2 py-1 text-right">0</td>
              <td className="border px-2 py-1 text-right">0</td>
              <td className="border px-2 py-1 text-right">0</td>
              <td className="border px-2 py-1 text-right">0</td>
              <td className="border px-2 py-1 text-right">0</td>

              <td className="border px-2 py-1 text-right font-semibold">
                10.091.000
              </td>
            </tr>

            {/* Total Pendapatan */}
            <tr className="bg-blue-100 font-bold">
              <td colSpan="15" className="border px-2 py-2 text-center">
                TOTAL PENDAPATAN
              </td>

              <td className="border px-2 py-2 text-right">
                49.103.121
              </td>
            </tr>

            {/* Belanja */}
            <tr className="bg-gray-300 font-bold">
              <td colSpan="16" className="border px-2 py-2">
                BELANJA
              </td>
            </tr>

            <tr>
              <td className="border px-2 py-1">3</td>
              <td className="border px-2 py-1">5004</td>
              <td className="border px-2 py-1">Beban Operasional</td>

              <td className="border px-2 py-1 text-right">1.000.000</td>
              <td className="border px-2 py-1 text-right">0</td>
              <td className="border px-2 py-1 text-right">0</td>
              <td className="border px-2 py-1 text-right">18.000</td>
              <td className="border px-2 py-1 text-right">0</td>
              <td className="border px-2 py-1 text-right">1.250.000</td>
              <td className="border px-2 py-1 text-right">110.000</td>
              <td className="border px-2 py-1 text-right">0</td>
              <td className="border px-2 py-1 text-right">0</td>
              <td className="border px-2 py-1 text-right">0</td>
              <td className="border px-2 py-1 text-right">0</td>
              <td className="border px-2 py-1 text-right">0</td>

              <td className="border px-2 py-1 text-right font-semibold">
                2.378.000
              </td>
            </tr>

            {/* Total Keseluruhan */}
            <tr className="bg-green-100 font-bold">
              <td colSpan="15" className="border px-2 py-2 text-center">
                TOTAL KESELURUHAN
              </td>

              <td className="border px-2 py-2 text-right">
                51.481.121
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default APBSDetail;