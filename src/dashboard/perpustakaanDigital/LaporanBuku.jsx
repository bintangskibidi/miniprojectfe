import React from "react";
import {
  FaFileCsv,
  FaFileExcel,
  FaFilePdf,
  FaPrint,
  FaCopy,
  FaBook,
} from "react-icons/fa";

export default function LaporanStokBuku() {
  const data = [
    {
      id: 1,
      judul: "Bahasa Indonesia",
      isbn: "123",
      penulis: "Pipit dwi",
      tahun: 2025,
      kategori: "Pendidikan",
      stok: 20,
      dipinjam: 0,
      tersedia: 20,
    },
    {
      id: 2,
      judul: "Buku Fisika",
      isbn: "978-623-123-457-10",
      penulis: "Sari Dewi",
      tahun: 2024,
      kategori: "Pendidikan",
      stok: 15,
      dipinjam: 0,
      tersedia: 15,
    },
    {
      id: 3,
      judul: "Buku Fisika",
      isbn: "978-623-123-457-11",
      penulis: "Sari Dewi",
      tahun: 2025,
      kategori: "Pendidikan",
      stok: 15,
      dipinjam: 0,
      tersedia: 15,
    },
    {
      id: 4,
      judul: "Matematika Kelas X",
      isbn: "978-623-123-456-7",
      penulis: "Budi Santoso",
      tahun: 2023,
      kategori: "Pendidikan",
      stok: 8,
      dipinjam: 0,
      tersedia: 8,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow rounded border overflow-hidden">
        {/* HEADER */}
        <div className="bg-green-700 text-white px-4 py-3 flex items-center gap-2 text-xl font-semibold">
          <FaBook />
          Laporan Stok Buku Saat Ini
        </div>

        {/* TOP ACTION */}
        <div className="flex flex-col md:flex-row justify-between items-center p-3 gap-3">
          {/* BUTTONS */}
          <div className="flex flex-wrap gap-2">
            <button className="border px-3 py-1 text-sm hover:bg-gray-100 flex items-center gap-1">
              <FaCopy />
              Copy
            </button>

            <button className="border px-3 py-1 text-sm hover:bg-gray-100 flex items-center gap-1">
              <FaFileCsv />
              CSV
            </button>

            <button className="border px-3 py-1 text-sm hover:bg-gray-100 flex items-center gap-1">
              <FaFileExcel />
              Excel
            </button>

            <button className="border px-3 py-1 text-sm hover:bg-gray-100 flex items-center gap-1">
              <FaFilePdf />
              PDF
            </button>

            <button className="border px-3 py-1 text-sm hover:bg-gray-100 flex items-center gap-1">
              <FaPrint />
              Print
            </button>
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-2">
            <label className="text-sm">Search:</label>

            <input
              type="text"
              className="border px-2 py-1 rounded text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto px-3">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="border px-3 py-2">#</th>
                <th className="border px-3 py-2">Judul Buku</th>
                <th className="border px-3 py-2">ISBN</th>
                <th className="border px-3 py-2">Penulis</th>
                <th className="border px-3 py-2">Tahun</th>
                <th className="border px-3 py-2">Kategori</th>
                <th className="border px-3 py-2 text-center">
                  Stok Total
                </th>
                <th className="border px-3 py-2 text-center">
                  Dipinjam
                </th>
                <th className="border px-3 py-2 text-center">
                  Tersedia
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{item.id}</td>
                  <td className="border px-3 py-2">{item.judul}</td>
                  <td className="border px-3 py-2">{item.isbn}</td>
                  <td className="border px-3 py-2">{item.penulis}</td>
                  <td className="border px-3 py-2">{item.tahun}</td>
                  <td className="border px-3 py-2">{item.kategori}</td>

                  <td className="border px-3 py-2 text-center">
                    {item.stok}
                  </td>

                  <td className="border px-3 py-2 text-center">
                    {item.dipinjam}
                  </td>

                  <td className="border px-3 py-2 text-center text-green-600 font-bold">
                    {item.tersedia}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center p-3 text-sm">
          <p>Showing 1 to 4 of 4 entries</p>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border hover:bg-gray-100">
              Previous
            </button>

            <button className="px-3 py-1 border bg-gray-200">
              1
            </button>

            <button className="px-3 py-1 border hover:bg-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}