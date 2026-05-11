import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../utils/api";

const AspekPenilaian = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: null,
    kode_aspek: "",
    nama_aspek: "",
  });

  // ================= GET DATA =================
  const getData = async () => {
    try {
      const res = await api.get("/aspek-penilaian");
      setData(res.data.data || []);
    } catch (error) {
      console.error("Gagal load data aspek penilaian:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ================= TAMBAH =================
  const handleTambah = () => {
    setForm({
      id: null,
      kode_aspek: "",
      nama_aspek: "",
    });

    setShowModal(true);
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm({
      id: item.id,
      kode_aspek: item.kode_aspek,
      nama_aspek: item.nama_aspek,
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
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/aspek-penilaian/${id}`);

          getData();

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data berhasil dihapus",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire("Error", "Gagal menghapus data", "error");
        }
      }
    });
  };

  // ================= SIMPAN =================
  const handleSubmit = async () => {
    if (!form.kode_aspek || !form.nama_aspek) {
      Swal.fire("Warning", "Semua field wajib diisi!", "warning");
      return;
    }

    try {
      if (form.id) {
        await api.put(`/aspek-penilaian/${form.id}`, form);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil diupdate",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await api.post("/aspek-penilaian", form);

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
      Swal.fire("Error", "Gagal menyimpan data", "error");
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
          <i className="bi bi-clipboard-data me-2 text-primary"></i>
          Data Aspek Penilaian
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
        {/* HEADER CARD */}
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
            Daftar Aspek Penilaian
          </span>
        </div>

        {/* BODY */}
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
                  <th>Kode Aspek</th>
                  <th>Nama Aspek</th>
                  <th style={{ width: "130px" }}>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-4">
                      Data tidak tersedia
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-center">{index + 1}</td>

                      <td>{item.kode_aspek}</td>

                      <td>{item.nama_aspek}</td>

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
              maxWidth: "420px",
            }}
          >
            <div className="modal-content border-0 shadow">
              {/* HEADER */}
              <div className="modal-header bg-primary text-white">
                <h6 className="modal-title fw-bold">
                  {form.id ? "Edit" : "Tambah"} Aspek Penilaian
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
                    Kode Aspek
                  </label>

                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Contoh: AP001"
                    value={form.kode_aspek}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        kode_aspek: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="small fw-bold mb-1">
                    Nama Aspek
                  </label>

                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Contoh: Kehadiran"
                    value={form.nama_aspek}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nama_aspek: e.target.value,
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

export default AspekPenilaian;