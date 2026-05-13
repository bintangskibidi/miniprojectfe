import React from "react";

export default function SettingPagu() {
  const data = [
    {
      id: 1,
      kode: "4001",
      nama: "Pendapatan SPP",
      tahun: "2025",
      nominal: "20.000.000",
    },
    {
      id: 2,
      kode: "4004",
      nama: "Pendapatan Wakaf",
      tahun: "2025",
      nominal: "30.000.000",
    },
    {
      id: 3,
      kode: "5004",
      nama: "Beban Operasional",
      tahun: "2025",
      nominal: "30.000.000",
    },
  ];

  return (
    <div className="p-4">
      <div className="bg-white border rounded-md shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h1 className="text-lg font-semibold text-gray-700">
            Daftar Pagu APBS
          </h1>

          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded">
            + Tambah Pagu
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3 text-left">#</th>
                <th className="border px-4 py-3 text-left">
                  Kode Akun
                </th>
                <th className="border px-4 py-3 text-left">
                  Nama Akun
                </th>
                <th className="border px-4 py-3 text-left">Tahun</th>
                <th className="border px-4 py-3 text-left">
                  Nominal (Rp)
                </th>
                <th className="border px-4 py-3 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-3">{item.id}</td>

                  <td className="border px-4 py-3">
                    {item.kode}
                  </td>

                  <td className="border px-4 py-3">
                    {item.nama}
                  </td>

                  <td className="border px-4 py-3">
                    {item.tahun}
                  </td>

                  <td className="border px-4 py-3">
                    {item.nominal}
                  </td>

                  <td className="border px-4 py-3">
                    <div className="flex gap-2">
                      <button className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-semibold px-3 py-1 rounded">
                        Edit
                      </button>

                      <button className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}