import React, { useState } from "react";
import Swal from "sweetalert2";

function DataJurusan() {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    kode: "",
    nama: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ SIMPAN / UPDATE
  const handleSimpan = () => {
    if (!form.kode || !form.nama) {
      Swal.fire("Oops!", "Semua field wajib diisi", "warning");
      return;
    }

    if (editIndex !== null) {
      const updated = [...data];
      updated[editIndex] = form;
      setData(updated);
    } else {
      setData([...data, form]);
    }

    setForm({ kode: "", nama: "" });
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

  // ✅ HAPUS
  const handleHapus = (index) => {
    Swal.fire({
      title: "Hapus data?",
      text: "Data akan dihapus permanen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    }).then((res) => {
      if (res.isConfirmed) {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);
      }
    });
  };

  // ✅ EDIT
  const handleEdit = (index) => {
    setForm(data[index]);
    setEditIndex(index);
    setShowModal(true);
  };

return (
  <div className="flex  min-h-screen">



    <div className="flex-1 ml p-6">

      {/* TITLE */}
      <h1 className="text-2xl py-6 font-bold mb-6 text-black-800">
        Data Jurusan
      </h1>

      {/* CARD */}
      <div className="bg-white rounded-xl shadow p-6 w-full">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold text-blue-700">
            Daftar Jurusan
          </h2>

          <button
            onClick={() => {
              setShowModal(true);
              setEditIndex(null);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            + Tambah
          </button>
        </div>

        {/* TABLE */}
        {data.length === 0 ? (
          <div className="text-center py-10 text-black-500">
            Belum ada data jurusan
          </div>
        ) : (
  <div className="overflow-hidden rounded-xl border border-black-300">
  <table className="w-full text-sm border-collapse">

    <thead className="bg--900 text-white">
      <tr>
        <th className="px-4 py-3 border border--800">No</th>
        <th className="px-4 py-3 border border--800 text-center">Kode Jurusan</th>
        <th className="px-4 py-3 border border--800 text-center">Nama Jurusan</th>
        <th className="px-4 py-3 border border--800 mx-10">Aksi</th>
      </tr>
    </thead>

    <tbody>
      {data.map((item, idx) => (
        <tr
          key={idx}
          className="hover:bg-black-50 transition"
        >
          <td className="text-center px-4 py-3 border border-black-200">
            {idx + 1}
          </td>

          <td className="text-center px-4 py-3 border border-black-200">
            {item.kode}
          </td>

          <td className="text-center px-4 py-3 border border-black-200">
            {item.nama}
          </td>

          <td className="text-center px-4 py-3 border border-black-200 space-x-2">
            <button
              onClick={() => handleEdit(idx)}
              className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 -mx-30 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleHapus(idx)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Hapus
            </button>
          </td>
        </tr>
      ))}
    </tbody>

  </table>
</div>
        )}
      </div>

      {/* MODAL (TETAP PUNYAMU) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="font-bold mb-4">
              {editIndex !== null ? "Edit Jurusan" : "Tambah Jurusan"}
            </h2>

            <input
              type="text"
              name="kode"
              value={form.kode}
              onChange={handleChange}
              placeholder="Kode Jurusan"
              className="w-full mb-3 border p-2 rounded"
            />

            <input
              type="text"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Nama Jurusan"
              className="w-full mb-4 border p-2 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-black-400 px-3 py-1 text-white rounded"
              >
                Batal
              </button>

              <button
                onClick={handleSimpan}
                className="bg-blue-600 px-3 py-1 text-white rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  </div>
);
}

export default DataJurusan;