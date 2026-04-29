import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../utils/api"; // Menggunakan instance axios yang sudah kamu buat

const DataWaliKelas = () => {

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    id: null,
    namaKelas: "",
    namaPegawai: "",
    tahunAjaran: "",
  });


  const getData = async () => {
    try {
      const res = await api.get("/walikelas");
      // Menyesuaikan format res.data.data seperti pada DataJurusan
      setData(res.data.data || []);
    } catch (error) {
      console.error("Gagal load data wali kelas:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  const handleTambah = () => {
    setForm({ id: null, namaKelas: "", namaPegawai: "", tahunAjaran: "" });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      namaKelas: item.namaKelas,
      namaPegawai: item.namaPegawai,
      tahunAjaran: item.tahunAjaran,
    });
    setShowModal(true);
  };


  const handleHapus = (id) => {
    Swal.fire({
      title: "Yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/walikelas/${id}`);
          getData();
          Swal.fire("Berhasil", "Data berhasil dihapus", "success");
        } catch (error) {
          Swal.fire("Error", "Gagal menghapus data", "error");
        }
      }
    });
  };


  const handleSubmit = async () => {
  const handleSubmit = () => {
    if (!form.namaKelas || !form.namaPegawai || !form.tahunAjaran) {
      Swal.fire("Warning", "Semua field wajib diisi!", "warning");
      return;
    }


    try {
      if (form.id) {
        // Mode Update
        await api.put(`/walikelas/${form.id}`, form);
        Swal.fire("Berhasil", "Data berhasil diupdate", "success");
      } else {
        // Mode Tambah Baru
        await api.post("/walikelas", form);
        Swal.fire("Berhasil", "Data berhasil ditambahkan", "success");
      }
      setShowModal(false);
      getData();
    } catch (error) {
      Swal.fire("Error", "Gagal simpan data", "error");

    if (form.id) {
      setData(
        data.map((item) => (item.id === form.id ? form : item))
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil diupdate",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      setData([...data, { ...form, id: Date.now() }]);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil ditambahkan",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
 
      {/* TITLE + BUTTON */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="flex items-center gap-2 font-semibold text-gray-700">
          🙄Data Wali Kelas
        </h4>

        <button
          className="bg-blue-600 text-white px-3 py-1 rounded shadow hover:bg-blue-700 text-sm"
          onClick={handleTambah}
        >
          + Tambah
        </button>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-lg shadow border">
        <div className="px-4 py-2 border-b font-medium text-gray-600 flex items-center gap-2">
          📋 Daftar Wali Kelas
        </div>

        <div className="p-0">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-2 border">No</th>
                <th className="p-2 border">Nama Kelas</th>
                <th className="p-2 border">Nama Pegawai</th>
                <th className="p-2 border">Tahun Ajaran</th>
                <th className="p-2 border text-center">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-3">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-2 border text-center">
                      {index + 1}
                    </td>
                    <td className="p-2 border">{item.namaKelas}</td>
                    <td className="p-2 border">{item.namaPegawai}</td>
                    <td className="p-2 border">{item.tahunAjaran}</td>
                    <td className="p-2 border text-center">
                      <button
                        className="bg-blue-500 text-white px-2 py-1 rounded mr-1 hover:bg-blue-600"
                        onClick={() => handleEdit(item)}
                      >
                        ✏️
                      </button>

                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                        onClick={() => handleHapus(item.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={item.id} className="small border-bottom">
                      <td className="text-center text-muted">{index + 1}</td>
                      <td className="ps-4 fw-medium">{item.namaKelas}</td>
                      <td className="ps-4">{item.namaPegawai}</td>
                      <td className="ps-4">{item.tahunAjaran}</td>
                      <td className="text-center">
                        <div className="btn-group gap-1">
                          <button 
                            className="btn btn-sm border text-primary bg-white" 
                            style={{borderColor: '#0d6efd'}}
                            onClick={() => handleEdit(item)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button 
                            className="btn btn-sm border text-danger bg-white" 
                            style={{borderColor: '#dc3545'}}
                            onClick={() => handleHapus(item.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40"></div>

          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-96">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h5 className="mb-3 font-semibold">
                {form.id ? "Edit" : "Tambah"} Wali Kelas
              </h5>

              <input
                className="w-full border p-2 mb-2 rounded"
                placeholder="Nama Kelas"
                value={form.namaKelas}
                onChange={(e) =>
                  setForm({ ...form, namaKelas: e.target.value })
                }
              />

              <input
                className="w-full border p-2 mb-2 rounded"
                placeholder="Nama Pegawai"
                value={form.namaPegawai}
                onChange={(e) =>
                  setForm({ ...form, namaPegawai: e.target.value })
                }
              />

              <input
                className="w-full border p-2 mb-3 rounded"
                placeholder="Tahun Ajaran"
                value={form.tahunAjaran}
                onChange={(e) =>
                  setForm({ ...form, tahunAjaran: e.target.value })
                }
              />

              <div className="text-end">
                <button
                  className="bg-gray-400 text-white px-3 py-1 rounded mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>

                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={handleSubmit}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataWaliKelas;