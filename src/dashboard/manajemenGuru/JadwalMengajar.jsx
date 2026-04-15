import React, { useState } from "react";
import Swal from "sweetalert2";

const JadwalMengajar = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    guru: "",
    mapel: "",
    kelas: "",
    hari: "",
    jamMulai: "",
    jamSelesai: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 SIMPAN / UPDATE
  const handleSimpan = () => {
    if (editIndex !== null) {
      const updatedData = [...data];
      updatedData[editIndex] = form;
      setData(updatedData);
    } else {
      setData([...data, form]);
    }

    setForm({
      guru: "",
      mapel: "",
      kelas: "",
      hari: "",
      jamMulai: "",
      jamSelesai: "",
    });

    setEditIndex(null);
    setShowModal(false);

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Data berhasil disimpan",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // 🔹 HAPUS
  const handleHapus = (index) => {
    Swal.fire({
      title: "Yakin mau hapus?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
      }
    });
  };

  // 🔹 EDIT
  const handleEdit = (index) => {
    setForm(data[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  return (
    <div>
      <h1 className="py-3 text-xl font-bold">Jadwal Mengajar</h1>

      <div className="bg-white rounded-xl shadow border border-blue-900 p-6">
        <div className="flex justify-between mb-4">
          <h2>📚 Tahun Ajaran 2025/2026</h2>

          <button
            onClick={() => {
              setShowModal(true);
              setEditIndex(null);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Tambah Jadwal
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-xl border border-blue-900">
          <table className="w-full">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-2 text-center">No</th>
                <th className="px-4 py-2 text-left">Guru</th>
                <th className="px-4 py-2">Mapel</th>
                <th className="px-4 py-2">Kelas</th>
                <th className="px-4 py-2">Hari</th>
                <th className="px-4 py-2">Jam</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className=" transition"
                >
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">{item.guru}</td>
                  <td className="px-4 py-2">{item.mapel}</td>
                  <td className="px-4 py-2">{item.kelas}</td>
                  <td className="px-4 py-2">{item.hari}</td>
                  <td className="px-4 py-2">
                    {item.jamMulai} - {item.jamSelesai}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-400 hover:bg-yellow-500 px-2 py-1 rounded text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleHapus(index)}
                      className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded text-white"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="font-bold mb-4">
              {editIndex !== null ? "Edit Jadwal" : "Tambah Jadwal"}
            </h2>

            <select
              name="guru"
              value={form.guru}
              onChange={handleChange}
              className="w-full mb-4 border p-2 rounded"
            >
              <option value="">-- Pilih Guru --</option>
              <option>Agus Santoso</option>
              <option>Fitriani</option>
            </select>

            <select
              name="mapel"
              value={form.mapel}
              onChange={handleChange}
              className="w-full mb-4 border p-2 rounded"
            >
              <option value="">-- Pilih Mapel --</option>
              <option>Matematika</option>
              <option>Bahasa Inggris</option>
            </select>

            <select
              name="kelas"
              value={form.kelas}
              onChange={handleChange}
              className="w-full mb-4 border p-2 rounded"
            >
              <option value="">-- Pilih Kelas --</option>
              <option>X</option>
              <option>XI</option>
            </select>

            <select
              name="hari"
              value={form.hari}
              onChange={handleChange}
              className="w-full mb-4 border p-2 rounded"
            >
              <option value="">-- Pilih Hari --</option>
              <option>Senin</option>
              <option>Selasa</option>
            </select>

            <div className="flex gap-2 mb-3">
              <input
                type="time"
                name="jamMulai"
                value={form.jamMulai}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              <input
                type="time"
                name="jamSelesai"
                value={form.jamSelesai}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 hover:bg-gray-500 px-3 py-1 text-white rounded"
              >
                Batal
              </button>
              <button
                onClick={handleSimpan}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 text-white rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JadwalMengajar;