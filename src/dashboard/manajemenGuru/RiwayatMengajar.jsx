import React, { useEffect, useState } from "react";
import api from "../../utils/api";

export default function RiwayatMengajar() {
  const [data, setData] = useState([]);

  // FILTER
  const [tahun, setTahun] = useState("2024/2025");
  const [guru, setGuru] = useState("");
  const [kelas, setKelas] = useState("");

  // DROPDOWN
  const [listGuru, setListGuru] = useState([]);
  const [listKelas, setListKelas] = useState([]);
  const [listTahun, setListTahun] = useState([]);

  // =========================
  // FETCH FILTER
  // =========================
  const fetchFilter = async () => {
    try {
      // pake endpoint dropdown jadwal yg udah ada
      const res = await api.get("/jadwal/dropdown");

      const d = res.data.data || res.data;

      setListGuru(d.guru || []);
      setListKelas(d.kelas || []);

      // tahun ajaran manual
      setListTahun([
        "2023/2024",
        "2024/2025",
        "2025/2026",
        "2026/2027",
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async () => {
    try {
      // ambil dari jadwal
      const res = await api.get("/jadwal", {
        params: {
          tahun_ajaran: tahun,
        },
      });

      let result = res.data.data || [];

      // FILTER GURU
      if (guru !== "") {
        result = result.filter(
          (item) =>
            item.guru === guru ||
            item.guru_id === Number(guru)
        );
      }

      // FILTER KELAS
      if (kelas !== "") {
        result = result.filter(
          (item) =>
            item.kelas === kelas ||
            item.kelas_id === Number(kelas)
        );
      }

      setData(result);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // LOAD AWAL
  // =========================
  useEffect(() => {
    fetchFilter();
  }, []);

  // =========================
  // AUTO FETCH
  // =========================
  useEffect(() => {
    fetchData();
  }, [tahun, guru, kelas]);

  // =========================
  // STATISTIK
  // =========================
  const statistik = data.reduce((acc, item) => {
    acc[item.guru] = (acc[item.guru] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-4">
        Riwayat Mengajar
      </h1>

      {/* FILTER */}
      <div className="bg-white p-4 rounded shadow mb-4 flex flex-wrap gap-4">
        {/* TAHUN */}
        <div>
          <label className="text-sm font-medium">
            Filter Tahun Ajaran
          </label>

          <select
            className="block border px-2 py-1 rounded mt-1"
            value={tahun}
            onChange={(e) => setTahun(e.target.value)}
          >
            {listTahun.map((t, i) => (
              <option key={i} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* GURU */}
        <div>
          <label className="text-sm font-medium">
            Filter Guru
          </label>

          <select
            className="block border px-2 py-1 rounded mt-1"
            value={guru}
            onChange={(e) => setGuru(e.target.value)}
          >
            <option value="">-- Semua Guru --</option>

            {listGuru.map((g) => (
              <option key={g.id} value={g.nama}>
                {g.nama}
              </option>
            ))}
          </select>
        </div>

        {/* KELAS */}
        <div>
          <label className="text-sm font-medium">
            Filter Kelas
          </label>

          <select
            className="block border px-2 py-1 rounded mt-1"
            value={kelas}
            onChange={(e) => setKelas(e.target.value)}
          >
            <option value="">-- Semua Kelas --</option>

            {listKelas.map((k) => (
              <option key={k.id} value={k.nama}>
                {k.nama}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TOTAL */}
      <div className="mb-4">
        <p className="text-sm">
          Total Data: <b>{data.length}</b>
        </p>
      </div>

      {/* STATISTIK */}
      <div className="bg-white rounded shadow mb-4">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-t font-semibold">
          Statistik Mengajar per Guru
        </div>

        <div className="p-4 space-y-2">
          {Object.keys(statistik).length === 0 ? (
            <p className="text-gray-500 text-sm">
              Belum ada data.
            </p>
          ) : (
            Object.entries(statistik).map(([nama, total], i) => (
              <div
                key={i}
                className="flex justify-between items-center border p-2 rounded"
              >
                <span>{nama}</span>

                <span className="bg-green-500 text-white px-2 py-1 text-xs rounded-full">
                  {total} sesi
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* TABEL */}
      <div className="bg-white rounded shadow">
        <div className="px-4 py-2 border-b font-semibold">
          Riwayat Mengajar Tahun Ajaran: {tahun}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-2 py-1">No</th>
                <th className="border px-2 py-1">Guru</th>
                <th className="border px-2 py-1">Mapel</th>
                <th className="border px-2 py-1">Kelas</th>
                <th className="border px-2 py-1">Hari</th>
                <th className="border px-2 py-1">Jam Mulai</th>
                <th className="border px-2 py-1">Jam Selesai</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-gray-500"
                  >
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                data.map((item, i) => (
                  <tr
                    key={item.id}
                    className="text-center hover:bg-gray-50"
                  >
                    <td className="border px-2 py-1">
                      {i + 1}
                    </td>

                    <td className="border px-2 py-1">
                      {item.guru || "-"}
                    </td>

                    <td className="border px-2 py-1">
                      {item.mapel || "-"}
                    </td>

                    <td className="border px-2 py-1">
                      {item.kelas || "-"}
                    </td>

                    <td className="border px-2 py-1">
                      {item.hari || "-"}
                    </td>

                    <td className="border px-2 py-1">
                      {item.jam_mulai || "-"}
                    </td>

                    <td className="border px-2 py-1">
                      {item.jam_selesai || "-"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}