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

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);

      setData(response.data.data || []);
    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        "Gagal mengambil data",
        "error"
      );
    }
  };

  // ================= TAMBAH =================
  const handleTambah = () => {
    setForm({
      id: null,
      nama: "",
    });

    setShowModal(true);
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm(item);

    setShowModal(true);
  };

  // ================= HAPUS =================
  const handleHapus = (id) => {
    Swal.fire({
      title: "Yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#dc3545",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API_URL}/${id}`);

          fetchData();

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data berhasil dihapus",
            timer: 1500,
            showConfirmButton: false,
          });

        } catch (error) {
          console.error(error);

          Swal.fire(
            "Error",
            "Gagal menghapus data",
            "error"
          );
        }
      }
    });
  };

  // ================= SIMPAN =================
  const handleSubmit = async () => {
    if (!form.nama.trim()) {
      Swal.fire(
        "Warning",
        "Nama semester wajib diisi!",
        "warning"
      );

      return;
    }

    try {
      if (form.id) {
        await axios.put(
          `${API_URL}/${form.id}`,
          {
            nama: form.nama,
          }
        );

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil diupdate",
          timer: 1500,
          showConfirmButton: false,
        });

      } else {
        await axios.post(
          API_URL,
          {
            nama: form.nama,
          }
        );

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil ditambahkan",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      setShowModal(false);

      fetchData();

    } catch (error) {
      console.error(error);

      Swal.fire(
        "Error",
        "Gagal menyimpan data",
        "error"
      );
    }
  };

  // ================= CLOSE MODAL =================
  const handleCloseModal = () => {
    setShowModal(false);

    setForm({
      id: null,
      nama: "",
    });
  };

  return (
    <div className="container mt-4">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Jenis Semester</h3>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleTambah}
        >
          + Tambah
        </button>
      </div>

      {/* CARD */}
      <div className="card shadow-sm">

        {/* HEADER CARD */}
        <div className="card-header">
          Daftar Jenis Semester
        </div>

        {/* BODY */}
        <div className="card-body p-0">
          <div className="table-responsive">

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
                    <td
                      colSpan="3"
                      className="text-center"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>

                      <td>{item.nama}</td>

                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-1">

                          {/* EDIT */}
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="btn btn-sm"
                            style={{
                              border: "1px solid #0d6efd",
                              color: "#0d6efd",
                              background: "#fff",
                              width: "32px",
                              height: "32px",
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <i className="ri-pencil-line"></i>
                          </button>

                          {/* DELETE */}
                          <button
                            type="button"
                            onClick={() => handleHapus(item.id)}
                            className="btn btn-sm"
                            style={{
                              border: "1px solid #dc3545",
                              color: "#dc3545",
                              background: "#fff",
                              width: "32px",
                              height: "32px",
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <i className="ri-delete-bin-6-line"></i>
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

      {/* ================= MODAL ================= */}
      {showModal && (
        <>
          {/* BACKDROP */}
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

          {/* MODAL */}
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
                setForm({
                  ...form,
                  nama: e.target.value,
                })
              }
            />

            <div className="d-flex justify-content-end gap-2">
              <button
                className="btn btn-secondary"
                onClick={handleCloseModal}
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