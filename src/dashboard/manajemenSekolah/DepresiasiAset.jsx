import React from "react";
import {
  FileSpreadsheet,
  Printer,
  RotateCcw,
  Search,
  Eye,
  Trash2,
} from "lucide-react";

const stats = [
  {
    title: "Total Harga Perolehan",
    value: "Rp 42.520.035",
    color: "bg-blue-600",
    text: "text-white",
  },
  {
    title: "Akumulasi Penyusutan",
    value: "Rp 2.749.596",
    color: "bg-cyan-500",
    text: "text-white",
  },
  {
    title: "Total Nilai Buku",
    value: "Rp 39.770.439",
    color: "bg-green-700",
    text: "text-white",
  },
  {
    title: "Penyusutan/Tahun",
    value: "Rp 4.910.364",
    color: "bg-yellow-400",
    text: "text-black",
  },
];

const assets = [
  {
    id: 1,
    nama: "122",
    kategori: "Elektronik",
    lokasi: "Ruangan Kelas 1",
    jumlah: 1,
    harga: "Rp 12",
    umur: "5 tahun",
    usia: "0.4 tahun",
    penyusutan: "Rp 2",
    akumulasi: "Rp 1",
    nilaiBuku: "Rp 11",
  },
  {
    id: 2,
    nama: "AC Split",
    kategori: "Elektronik",
    lokasi: "Ruangan Kelas 1",
    jumlah: 3,
    harga: "Rp 4.500.000",
    umur: "7 tahun",
    usia: "0.4 tahun",
    penyusutan: "Rp 642.857",
    akumulasi: "Rp 267.857",
    nilaiBuku: "Rp 4.232.143",
  },
];

export default function DepresiasiAset() {
  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <div className="rounded-xl bg-white shadow">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-t-xl bg-blue-600 p-5">
          <div className="flex items-center gap-3 text-white">
            <FileSpreadsheet size={30} />
            <h1 className="text-2xl font-bold">
              Depresiasi Aset
            </h1>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow">
              <FileSpreadsheet size={18} />
              Export Excel
            </button>

            <button className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow">
              <Printer size={18} />
              Cetak
            </button>
          </div>
        </div>

        <div className="p-5">

          {/* CARDS */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item, index) => (
              <div
                key={index}
                className={`${item.color} ${item.text} rounded-xl p-6 shadow`}
              >
                <h2 className="text-center text-4xl font-bold">
                  {item.value}
                </h2>

                <p className="mt-2 text-center text-lg">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

          {/* FILTER */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <select className="rounded-lg border p-3">
              <option>Semua Status</option>
            </select>

            <select className="rounded-lg border p-3">
              <option>Semua Kategori</option>
            </select>

            <input
              type="text"
              placeholder="Filter umur ekonomis"
              className="rounded-lg border p-3"
            />

            <button className="flex items-center justify-center gap-2 rounded-lg border p-3">
              <RotateCcw size={18} />
              Reset Filter
            </button>
          </div>

          {/* TOOLBAR */}
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {["Salin", "CSV", "Excel", "PDF", "Cetak"].map((btn) => (
                <button
                  key={btn}
                  className="rounded border bg-white px-4 py-2 hover:bg-slate-100"
                >
                  {btn}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label>Cari:</label>

              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-3 text-slate-400"
                />

                <input
                  type="text"
                  className="rounded-lg border py-2 pl-10 pr-4"
                />
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="mt-6 overflow-x-auto rounded-xl border">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  {[
                    "#",
                    "Nama Aset",
                    "Kategori",
                    "Lokasi",
                    "Jumlah",
                    "Harga",
                    "Umur",
                    "Usia",
                    "Penyusutan",
                    "Akumulasi",
                    "Nilai Buku",
                    "Status",
                    "Aksi",
                  ].map((head) => (
                    <th
                      key={head}
                      className="border-b px-4 py-4 text-left"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {assets.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="px-4 py-4">{item.id}</td>

                    <td className="px-4 py-4 font-semibold">
                      {item.nama}
                    </td>

                    <td className="px-4 py-4">
                      {item.kategori}
                    </td>

                    <td className="px-4 py-4">
                      {item.lokasi}
                    </td>

                    <td className="px-4 py-4">
                      {item.jumlah}
                    </td>

                    <td className="px-4 py-4">
                      {item.harga}
                    </td>

                    <td className="px-4 py-4">
                      {item.umur}
                    </td>

                    <td className="px-4 py-4">
                      {item.usia}
                    </td>

                    <td className="px-4 py-4">
                      {item.penyusutan}
                    </td>

                    <td className="px-4 py-4">
                      {item.akumulasi}
                    </td>

                    <td className="px-4 py-4 font-bold text-green-600">
                      {item.nilaiBuku}
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-green-600 px-3 py-1 text-sm text-white">
                        Aktif
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button className="rounded-lg bg-sky-500 p-2 text-white">
                          <Eye size={18} />
                        </button>

                        <button className="rounded-lg bg-yellow-400 p-2">
                          <Trash2 size={18} />
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
    </div>
  );
}