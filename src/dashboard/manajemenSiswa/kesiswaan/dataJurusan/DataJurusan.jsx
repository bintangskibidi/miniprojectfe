import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../../utils/api";

import { RiPencilLine, RiDeleteBinLine } from "react-icons/ri";

const DataJurusan = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: null,
    kode_jurusan: "",
    nama_jurusan: "",
  });

  const getData = async () => {
    try {
      const res = await api.get("/jurusan");
      setData(res.data.data || []);
    } catch (error) {
      console.error("Gagal load data jurusan:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleTambah = () => {
    setForm({
      id: null,
      kode_jurusan: "",
      nama_jurusan: "",
    });

    setShowModal(true);
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      kode_jurusan: item.kode_jurusan,
      nama_jurusan: item.nama_jurusan,
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
          await api.delete(`/jurusan/${id}`);

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

  const handleSubmit = async () => {
    if (!form.kode_jurusan || !form.nama_jurusan) {
      Swal.fire("Warning", "Semua field wajib diisi!", "warning");
      return;
    }

    try {
      if (form.id) {
        await api.put(`/jurusan/${form.id}`, form);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil diupdate",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await api.post("/jurusan", form);

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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4
          className="fw-semibold mb-0"
          style={{
            color: "#212529",
            fontSize: "1.5rem",
          }}
        >
          <i className="bi bi-building me-2 text-primary"></i>
          Data Jurusan
        </h4>

        <button
          type="button"
          className="btn btn-primary btn-sm px-3 shadow-sm"
          onClick={handleTambah}
        >
          + Tambah
        </button>
      </div>

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
            Daftar Jurusan
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
                  <th>Kode Jurusan</th>
                  <th>Nama Jurusan</th>
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

                      <td>{item.kode_jurusan}</td>

                      <td>{item.nama_jurusan}</td>

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
              <div className="modal-header bg-primary text-white">
                <h6 className="modal-title fw-bold">
                  {form.id ? "Edit" : "Tambah"} Jurusan
                </h6>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="small fw-bold mb-1">Kode Jurusan</label>

                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Contoh: J3"
                    value={form.kode_jurusan}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        kode_jurusan: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="small fw-bold mb-1">Nama Jurusan</label>

                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Contoh: Jurusan Fisika"
                    value={form.nama_jurusan}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nama_jurusan: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

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

export default DataJurusan;
