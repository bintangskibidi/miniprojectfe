import React, { useEffect, useState } from "react";
import axios from "axios";

export default function RiwayatMengajar() {
  const [data, setData] = useState([]);
  const [tahun, setTahun] = useState("2024/2025");
  const [guru, setGuru] = useState("");
  const [kelas, setKelas] = useState([]);

  const [listGuru, setListGuru] = useState([]);
  const [listKelas, setListKelas] = useState([]);

  useEffect(() => {
    fetchFilter();
  }, []);

  useEffect(() => {
    fetchData();
  }, [tahun, guru, kelas]);

  const fetchFilter = async () => {
    try {
      const res = await axios.get("http://localhost:3000/filter");
      setListGuru(res.data.guru);
      setListKelas(res.data.kelas);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/riwayat", {
        params: { tahun, guru, kelas },
      });
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // statistik per guru
  const statistik = data.reduce((acc, item) => {
    acc[item.guru] = (acc[item.guru] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-4">Riwayat Mengajar</h1>

      {/* FILTER */}
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-wrap gap-4">
        <div>
          <label className="text-sm">Filter Tahun Ajaran:</label>
          <select
            className="block border px-2 py-1 rounded mt-1"
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
          >
            <option value="2024/2025">2024/2025</option>
            <option value="2023/2024">2023/2024</option>
          </select>
        </div>

        <div>
          <label className="text-sm">Filter Guru:</label>
          <select
            className="block border px-2 py-1 rounded mt-1"
            onChange={(e) => setGuru(e.target.value)}
          >
            <option value="">-- Semua Guru --</option>
            {listGuru.map((g, i) => (
              <option key={i} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm">Filter Kelas:</label>
          <select
            className="block border px-2 py-1 rounded mt-1"
            onChange={(e) => setKelas(e.target.value)}
          >
            <option value="">-- Semua Kelas --</option>
            {listKelas.map((k, i) => (
              <option key={i} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TOTAL */}
      <p className="mb-2 text-sm">
        Total Sesi Mengajar (unik):{" "}
        <b>{new Set(data.map((d) => d.pertemuan)).size} sesi</b>
      </p>

      {/* STATISTIK */}
      <div className="bg-white rounded shadow mb-4">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-t">
          Statistik Mengajar per Guru
        </div>

        <div className="p-4 space-y-2">
          {Object.entries(statistik).map(([nama, total], i) => (
            <div
              key={i}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{nama}</span>
              <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-full">
                {total}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* TABEL */}
      <div className="bg-white rounded shadow">
        <div className="px-4 py-2 border-b font-semibold">
          Riwayat Kehadiran Mengajar Tahun Ajaran: {tahun}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1">No</th>
                <th className="border px-2 py-1">Tanggal</th>
                <th className="border px-2 py-1">Jam ke-</th>
                <th className="border px-2 py-1">Mapel</th>
                <th className="border px-2 py-1">Guru</th>
                <th className="border px-2 py-1">Siswa</th>
                <th className="border px-2 py-1">Status</th>
                <th className="border px-2 py-1">Keterangan</th>
                <th className="border px-2 py-1">Waktu Absen</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, i) => (
                <tr key={i} className="text-center">
                  <td className="border px-2 py-1">{i + 1}</td>
                  <td className="border px-2 py-1">{item.tanggal}</td>
                  <td className="border px-2 py-1">{item.jam}</td>
                  <td className="border px-2 py-1">{item.mapel}</td>
                  <td className="border px-2 py-1">{item.guru}</td>
                  <td className="border px-2 py-1">{item.siswa}</td>
                  <td className="border px-2 py-1">{item.status}</td>
                  <td className="border px-2 py-1">
                    {item.keterangan || "-"}
                  </td>
                  <td className="border px-2 py-1">
                    {item.waktu_absen}
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