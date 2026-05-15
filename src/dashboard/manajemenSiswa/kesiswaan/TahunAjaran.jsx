import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../utils/api";

import {
  RiPencilLine,
  RiDeleteBinLine,
} from "react-icons/ri";

const TahunAjaran = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: null,
    tahun_ajaran: "",
    tahun: "",
    status: true,
  });

  // ================= GET DATA =================
  const getData = async () => {
    try {
      const res = await api.get("/tahun-ajaran");
      setData(res.data.data || []);
    } catch (error) {
      console.error(error);

      Swal.fire("Error", "Gagal mengambil data", "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ================= TAMBAH =================
  const handleTambah = () => {
    setForm({
      id: null,
      tahun_ajaran: "",
      tahun: "",
      status: true,
    });

    setShowModal(true);
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm({
      id: item.id,
      tahun_ajaran: item.tahun_ajaran,
      tahun: item.tahun,
      status: item.status,
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
          await api.delete(`/tahun-ajaran/${id}`);

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Data berhasil dihapus",
            timer: 1500,
            showConfirmButton: false,
          });

          getData();
        } catch (error) {
          Swal.fire("Error", "Gagal menghapus data", "error");
        }
      }
    });
  };

  // ================= TOGGLE STATUS =================
  const toggleStatus = async (item) => {
    try {
      const res = await api.patch(`/tahun-ajaran/${item.id}`);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: res.data.message || "Status berhasil diubah",
        showConfirmButton: false,
        timer: 1500,
      });

      getData();
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message ||
          "Gagal mengubah status",
        "error"
      );
    }
  };

  // ================= SIMPAN =================
  const handleSubmit = async () => {
    if (!form.tahun_ajaran || !form.tahun) {
      Swal.fire(
        "Warning",
        "Semua field wajib diisi!",
        "warning"
      );

      return;
    }

    try {
      if (form.id) {
        await api.put(`/tahun-ajaran/${form.id}`, form);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil diupdate",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await api.post("/tahun-ajaran", form);

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
          <i className="bi bi-calendar-event me-2 text-primary"></i>
          Data Tahun Ajaran
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
            Daftar Tahun Ajaran
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
                  <th>Tahun Ajaran</th>
                  <th>Tahun</th>
                  <th style={{ width: "170px" }}>Status</th>
                  <th style={{ width: "120px" }}>Aksi</th>
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

                      <td>{item.tahun_ajaran}</td>

                      <td>{item.tahun}</td>

                      {/* STATUS */}
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <div className="form-check form-switch m-0">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={item.status}
                              onChange={() => toggleStatus(item)}
                              style={{
                                cursor: "pointer",
                              }}
                            />
                          </div>

                          <span
                            style={{
                              fontSize: "0.9rem",
                              color: item.status
                                ? "#212529"
                                : "#6c757d",
                            }}
                          >
                            {item.status
                              ? "Aktif"
                              : "Nonaktif"}
                          </span>
                        </div>
                      </td>

                      {/* AKSI */}
                      <td className="text-center text-nowrap">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-1"
                          title="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <RiPencilLine />
                        </button>

                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          title="Hapus"
                          onClick={() =>
                            handleHapus(item.id)
                          }
                        >
                          <RiDeleteBinLine />
                        </button>
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
                  {form.id ? "Edit" : "Tambah"} Tahun
                  Ajaran
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
                    Tahun Ajaran
                  </label>

                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Contoh: 2025/2026"
                    value={form.tahun_ajaran}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        tahun_ajaran: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="small fw-bold mb-1">
                    Tahun
                  </label>

                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Contoh: 2025"
                    value={form.tahun}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        tahun: e.target.value,
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

export default TahunAjaran;