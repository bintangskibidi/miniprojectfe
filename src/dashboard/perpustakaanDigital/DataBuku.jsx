import React from "react";

const DataBuku = () => {
  const data = [
    {
      id: 1,
      judul: "Bahasa Indonesia",
      penulis: "Pipit dwi",
      penerbit: "Erlangga",
      tahun: 2025,
      isbn: "123",
      harga: 25000,
      kondisi: "Tidak Diketahui",
      kategori: "Pendidikan",
      rak: "Rak 1",
      stok: 20,
    },
    {
      id: 2,
      judul: "Buku Fisika",
      penulis: "Sari Dewi",
      penerbit: "Gramedia",
      tahun: 2024,
      isbn: "978-623-123",
      harga: 85000,
      kondisi: "Rusak Ringan",
      kategori: "Pendidikan",
      rak: "Rak 2",
      stok: 15,
    },
  ];

  const badge = (text) => {
    let color = "bg-gray-400";
    if (text === "Baik") color = "bg-green-500";
    if (text === "Rusak Ringan") color = "bg-yellow-500";
    if (text === "Tidak Diketahui") color = "bg-gray-500";

    return (
      <span className={`text-white px-2 py-1 rounded text-xs ${color}`}>
        {text}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold text-blue-600">📘 Data Buku</h1>
          <p className="text-sm text-gray-500">
            Kelola data buku perpustakaan
          </p>
        </div>

        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-3 py-2 rounded text-sm">
            + Tambah Buku
          </button>
          <button className="bg-green-600 text-white px-3 py-2 rounded text-sm">
            Cetak Barcode
          </button>
          <button className="bg-teal-500 text-white px-3 py-2 rounded text-sm">
            Excel
          </button>
        </div>
      </div>

      {/* FILTER */}
      <div className="bg-white p-4 rounded shadow mb-4 grid grid-cols-1 md:grid-cols-5 gap-3">
        <input
          type="text"
          placeholder="Judul, penulis, atau ISBN..."
          className="border px-3 py-2 rounded col-span-2"
        />
        <select className="border px-2 py-2 rounded">
          <option>Semua Kategori</option>
        </select>
        <select className="border px-2 py-2 rounded">
          <option>Semua Rak</option>
        </select>
        <select className="border px-2 py-2 rounded">
          <option>Semua Kondisi</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow">
        {/* TABLE HEADER */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 font-semibold">
          Daftar Buku
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2">No</th>
                <th className="p-2">Judul</th>
                <th className="p-2">Penulis</th>
                <th className="p-2">Penerbit</th>
                <th className="p-2">Tahun</th>
                <th className="p-2">ISBN</th>
                <th className="p-2">Harga</th>
                <th className="p-2">Kondisi</th>
                <th className="p-2">Kategori</th>
                <th className="p-2">Rak</th>
                <th className="p-2">Stok</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, i) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 text-center">{i + 1}</td>
                  <td className="p-2 font-medium">{item.judul}</td>
                  <td className="p-2">{item.penulis}</td>
                  <td className="p-2">{item.penerbit}</td>
                  <td className="p-2 text-center">{item.tahun}</td>
                  <td className="p-2">{item.isbn}</td>
                  <td className="p-2 text-green-600 font-semibold">
                    Rp {item.harga.toLocaleString()}
                  </td>
                  <td className="p-2 text-center">{badge(item.kondisi)}</td>
                  <td className="p-2 text-center">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                      {item.kategori}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <span className="bg-gray-500 text-white px-2 py-1 rounded text-xs">
                      {item.rak}
                    </span>
                  </td>
                  <td className="p-2 text-center">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                      {item.stok}
                    </span>
                  </td>

                  {/* AKSI */}
                  <td className="p-2 flex gap-1 justify-center">
                    <button className="bg-yellow-400 px-2 py-1 rounded text-xs">
                      ✏️
                    </button>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                      👁
                    </button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataBuku;