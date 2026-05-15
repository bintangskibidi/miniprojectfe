import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../utils/api";

import { RiPencilLine, RiDeleteBinLine } from "react-icons/ri";

const MataPelajaran = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: null,
    nama: "",
  });

  // ================= GET DATA =================
  const getData = async () => {
    try {
      const res = await api.get("/mapel");

      // biar data terbaru di atas
      const sorted = (res.data.data || []).reverse();

      setData(sorted);
    } catch (error) {
      console.error("Gagal load data mapel:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
    setForm({
      id: item.id,
      nama: item.nama,
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
          await api.delete(`/mapel/${id}`);

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
    if (!form.nama) {
      Swal.fire("Warning", "Nama mata pelajaran wajib diisi!", "warning");

      return;
    }

    try {
      if (form.id) {
        // UPDATE
        await api.put(`/mapel/${form.id}`, {
          nama: form.nama,
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil diupdate",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        // TAMBAH
        await api.post("/mapel", {
          nama: form.nama,
        });

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
          <i className="bi bi-book me-2 text-primary"></i>
          Data Mata Pelajaran
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
            Daftar Mata Pelajaran
          </span>
        </div>

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
                  <th>Nama Mata Pelajaran</th>
                  <th style={{ width: "130px" }}>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center text-muted py-4">
                      Data tidak tersedia
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-center">{index + 1}</td>

                      <td>{item.nama}</td>

                      <td className="text-center text-nowrap">
                        {/* EDIT */}
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-1"
                          title="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <RiPencilLine />
                        </button>

                        {/* DELETE */}
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          title="Hapus"
                          onClick={() => handleHapus(item.id)}
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
                  {form.id ? "Edit" : "Tambah"} Mata Pelajaran
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
                    Nama Mata Pelajaran
                  </label>

                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Contoh: Matematika"
                    value={form.nama}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nama: e.target.value,
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

export default MataPelajaran;
