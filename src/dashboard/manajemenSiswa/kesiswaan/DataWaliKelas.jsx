import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../utils/api";

const DataWaliKelas = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: null,
    namaKelas: "",
    namaPegawai: "",
    tahunAjaran: "",
  });

  // ================= GET DATA =================
  const getData = async () => {
    try {
      const res = await api.get("/walikelas");
      setData(res.data.data || []);
    } catch (error) {
      console.error("Gagal load data wali kelas:", error);

      Swal.fire(
        "Error",
        "Gagal mengambil data wali kelas",
        "error"
      );
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ================= TAMBAH =================
  const handleTambah = () => {
    setForm({
      id: null,
      namaKelas: "",
      namaPegawai: "",
      tahunAjaran: "",
    });

    setShowModal(true);
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm({
      id: item.id,
      namaKelas: item.namaKelas,
      namaPegawai: item.namaPegawai,
      tahunAjaran: item.tahunAjaran,
    });

    setShowModal(true);
  };

  // ================= HAPUS =================
  const handleHapus = (id) => {
    Swal.fire({
      title: "Yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya, hapus",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/walikelas/${id}`);

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data berhasil dihapus",
            timer: 1500,
            showConfirmButton: false,
          });

          getData();
        } catch (error) {
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
    if (
      !form.namaKelas ||
      !form.namaPegawai ||
      !form.tahunAjaran
    ) {
      Swal.fire(
        "Warning",
        "Semua field wajib diisi!",
        "warning"
      );

      return;
    }

    try {
      if (form.id) {
        await api.put(`/walikelas/${form.id}`, form);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil diupdate",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await api.post("/walikelas", form);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil ditambahkan",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      setShowModal(false);
      getData();
    } catch (error) {
      Swal.fire(
        "Error",
        "Gagal menyimpan data",
        "error"
      );
    }
  };

  return (
    <div
      className="container-fluid py-3"
      style={{
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4
          className="fw-semibold mb-0"
          style={{
            color: "#212529",
            fontSize: "1.5rem",
          }}
        >
          <i className="bi bi-person-badge me-2 text-primary"></i>
          Data Wali Kelas
        </h4>

        <button
          type="button"
          className="btn btn-primary btn-sm px-3 shadow-sm"
          onClick={handleTambah}
        >
          + Tambah
        </button>
      </div>

      {/* CARD */}
      <div
        className="card border-0 shadow-sm"
        style={{
          borderRadius: "8px",
        }}
      >
        {/* CARD HEADER */}
        <div
          className="card-header bg-white d-flex align-items-center"
          style={{
            borderBottom: "1px solid #dee2e6",
            padding: "12px 16px",
          }}
        >
          <span
            className="fw-semibold"
            style={{
              fontSize: "0.95rem",
              color: "#212529",
            }}
          >
            <i className="bi bi-list-ul me-2 text-primary"></i>
            Daftar Wali Kelas
          </span>
        </div>

        {/* TABLE */}
        <div className="card-body p-0">
          <div className="table-responsive">
            <table
              className="table table-bordered align-middle mb-0"
              style={{
                fontSize: "0.88rem",
              }}
            >
              <thead
                style={{
                  background: "#f8f9fa",
                }}
              >
                <tr className="text-center">
                  <th style={{ width: "70px" }}>#</th>
                  <th>Nama Kelas</th>
                  <th>Nama Pegawai</th>
                  <th>Tahun Ajaran</th>
                  <th style={{ width: "170px" }}>
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-muted py-4"
                    >
                      Data tidak tersedia
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-center">
                        {index + 1}
                      </td>

                      <td>{item.namaKelas}</td>

                      <td>{item.namaPegawai}</td>

                      <td>{item.tahunAjaran}</td>

                      {/* AKSI */}
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          {/* EDIT */}
                          <button
                            type="button"
                            className="btn btn-sm"
                            onClick={() => handleEdit(item)}
                            style={{
                              border: "1px solid #ffc107",
                              color: "#ffc107",
                              background: "#fff",
                              fontSize: "0.8rem",
                              padding: "4px 10px",
                            }}
                          >
                            <i className="bi bi-pencil-square me-1"></i>
                            Edit
                          </button>

                          {/* HAPUS */}
                          <button
                            type="button"
                            className="btn btn-sm"
                            onClick={() => handleHapus(item.id)}
                            style={{
                              border: "1px solid #dc3545",
                              color: "#dc3545",
                              background: "#fff",
                              fontSize: "0.8rem",
                              padding: "4px 10px",
                            }}
                          >
                            <i className="bi bi-trash me-1"></i>
                            Hapus
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
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(3px)",
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{
              maxWidth: "450px",
            }}
          >
            <div className="modal-content border-0 shadow">
              {/* HEADER */}
              <div className="modal-header bg-primary text-white">
                <h6 className="modal-title fw-bold">
                  {form.id ? "Edit" : "Tambah"}{" "}
                  Wali Kelas
                </h6>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* BODY */}
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="small fw-bold mb-1">
                    Nama Kelas
                  </label>

                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Contoh: X RPL 1"
                    value={form.namaKelas}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        namaKelas: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="small fw-bold mb-1">
                    Nama Pegawai
                  </label>

                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Nama Lengkap Guru"
                    value={form.namaPegawai}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        namaPegawai: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="small fw-bold mb-1">
                    Tahun Ajaran
                  </label>

                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Contoh: 2025/2026"
                    value={form.tahunAjaran}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        tahunAjaran: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* FOOTER */}
              <div className="modal-footer border-0 bg-light">
                <button
                  className="btn btn-secondary btn-sm px-3"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>

                <button
                  className="btn btn-primary btn-sm px-3 shadow-sm"
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