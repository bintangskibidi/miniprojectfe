import React from "react";

export default function RiwayatPeminjaman() {
  const data = [
    {
      id: 1,
      tanggalAktivitas: "10/11/2025 09:08",
      aset: "Komputer",
      kategori: "Elektronik",
      peminjam: "Agung",
      role: "Siswa - 7839994",
      tanggalPinjam: "10/11/2025",
      tanggalKembali: "15/11/2025",
      tanggalDikembalikan: "10/11/2025 09:08",
      jumlah: 1,
      status: "Dikembalikan",
      kondisi: "Rusak",
    },
    {
      id: 2,
      tanggalAktivitas: "10/11/2025 09:08",
      aset: "Komputer",
      kategori: "Elektronik",
      peminjam: "Agung",
      role: "Siswa - 7839994",
      tanggalPinjam: "10/11/2025",
      tanggalKembali: "15/11/2025",
      tanggalDikembalikan: "10/11/2025 09:08",
      jumlah: 1,
      status: "Dipinjam",
      kondisi: "Rusak",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">
            ⏱️ Riwayat Peminjaman
          </h1>

          <button className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100">
            Export Excel
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Filter Status
            </label>

            <select className="w-full border rounded-lg px-3 py-2">
              <option>Semua Status</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Filter Tanggal Mulai
            </label>

            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Filter Tanggal Akhir
            </label>

            <input
              type="date"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div className="flex items-end">
            <button className="w-full border rounded-lg px-4 py-2 hover:bg-gray-100">
              Reset
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 flex flex-wrap gap-2 mb-4">
          {["Copy", "CSV", "Excel", "PDF", "Print"].map((btn) => (
            <button
              key={btn}
              className="border px-4 py-2 rounded hover:bg-gray-100 text-sm"
            >
              {btn}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="px-6 mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search..."
            className="border rounded-lg px-3 py-2"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="border px-4 py-3">#</th>
                <th className="border px-4 py-3">Tanggal Aktivitas</th>
                <th className="border px-4 py-3">Aset</th>
                <th className="border px-4 py-3">Peminjam</th>
                <th className="border px-4 py-3">Tanggal Pinjam</th>
                <th className="border px-4 py-3">Tanggal Kembali</th>
                <th className="border px-4 py-3">
                  Tanggal Dikembalikan
                </th>
                <th className="border px-4 py-3">Jumlah</th>
                <th className="border px-4 py-3">Status</th>
                <th className="border px-4 py-3">
                  Kondisi Kembali
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="text-sm">
                  <td className="border px-4 py-3">{item.id}</td>

                  <td className="border px-4 py-3">
                    {item.tanggalAktivitas}
                  </td>

                  <td className="border px-4 py-3">
                    <div className="font-semibold">
                      {item.aset}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {item.kategori}
                    </div>
                  </td>

                  <td className="border px-4 py-3">
                    <div className="font-semibold">
                      {item.peminjam}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {item.role}
                    </div>
                  </td>

                  <td className="border px-4 py-3">
                    {item.tanggalPinjam}
                  </td>

                  <td className="border px-4 py-3">
                    {item.tanggalKembali}
                  </td>

                  <td className="border px-4 py-3">
                    {item.tanggalDikembalikan}
                  </td>

                  <td className="border px-4 py-3">
                    {item.jumlah}
                  </td>

                  <td className="border px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        item.status === "Dikembalikan"
                          ? "bg-green-500"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="border px-4 py-3">
                    <span className="bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
                      {item.kondisi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-6 flex items-center justify-between text-sm">
          <p>Showing 1 to 2 of 2 entries</p>

          <div className="flex items-center gap-2">
            <button className="border px-3 py-1 rounded">
              Previous
            </button>

            <button className="bg-gray-200 px-3 py-1 rounded">
              1
            </button>

            <button className="border px-3 py-1 rounded">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}