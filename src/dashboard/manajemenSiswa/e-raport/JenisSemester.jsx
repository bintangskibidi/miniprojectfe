import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const JenisSemester = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    id: null,
    nama: "",
  });

  const API_URL = "http://localhost:8000/jenis-semester";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data.data || []);
    } catch (error) {
      Swal.fire("Error", "Gagal mengambil data", "error");
    }
  };

  const handleTambah = () => {
    setForm({
      id: null,
      nama: "",
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setForm(item);
    setShowModal(true);
  };

  const handleHapus = (id) => {
    Swal.fire({
      title: "Yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/${id}`);
          fetchData();
          Swal.fire("Berhasil", "Data berhasil dihapus", "success");
        } catch (error) {
          Swal.fire("Error", "Gagal menghapus data", "error");
        }
      }
    });
  };

  const handleSubmit = async () => {
    if (!form.nama.trim()) {
      Swal.fire("Warning", "Nama semester wajib diisi!", "warning");
      return;
    }

    try {
      if (form.id) {
        await axios.put(`${API_URL}/${form.id}`, {
          nama: form.nama,
        });
        Swal.fire("Berhasil", "Data berhasil diupdate", "success");
      } else {
        await axios.post(API_URL, {
          nama: form.nama,
        });
        Swal.fire("Berhasil", "Data berhasil ditambahkan", "success");
      }

      setShowModal(false);
      fetchData();
    } catch (error) {
      Swal.fire("Error", "Gagal menyimpan data", "error");
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Jenis Semester</h3>
        <button className="btn btn-primary" onClick={handleTambah}>
          + Tambah
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-header">Daftar Jenis Semester</div>
        <div className="card-body p-0">
          <table className="table table-bordered mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: "80px" }}>No</th>
                <th>Nama Semester</th>
                <th style={{ width: "150px" }}>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nama}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(item)}
                      >
                        ✏️
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleHapus(item.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 999,
            }}
          />

          <div
            className="bg-white p-4 rounded shadow"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              width: "400px",
            }}
          >
            <h5 className="mb-3">
              {form.id ? "Edit" : "Tambah"} Jenis Semester
            </h5>

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Masukkan nama semester"
              value={form.nama}
              onChange={(e) =>
                setForm({ ...form, nama: e.target.value })
              }
            />

            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>

              <button
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Simpan
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JenisSemester;