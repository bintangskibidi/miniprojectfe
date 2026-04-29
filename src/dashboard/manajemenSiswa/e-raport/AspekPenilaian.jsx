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

  const getData = async () => {
    try {
      const res = await api.get("/aspek-penilaian");
      setData(res.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data aspek penilaian:", error);
      Swal.fire("Error", "Gagal memuat data", "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleTambah = () => {
    setForm({
      id: null,
      kode_aspek: "",
      nama_aspek: "",
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      kode_aspek: item.kode_aspek,
      nama_aspek: item.nama_aspek,
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
          await api.delete(`/aspek-penilaian/${id}`);
          getData();
          Swal.fire("Berhasil", "Data dihapus", "success");
        } catch {
          Swal.fire("Error", "Gagal menghapus data", "error");
        }
      }
    });
  };

  const handleSubmit = async () => {
    if (!form.kode_aspek || !form.nama_aspek) {
      Swal.fire("Warning", "Semua field wajib diisi!", "warning");
      return;
    }

    try {
      if (form.id) {
        await api.put(`/aspek-penilaian/${form.id}`, form);
        Swal.fire("Berhasil", "Data berhasil diupdate", "success");
      } else {
        await api.post("/aspek-penilaian", form);
        Swal.fire("Berhasil", "Data berhasil ditambahkan", "success");
      }

      setShowModal(false);
      getData();
    } catch {
      Swal.fire("Error", "Gagal menyimpan data", "error");
    }
  };

  return (
    <div
      className="p-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">
          <i className="bi bi-clipboard-data text-primary me-2"></i>
          Data Aspek Penilaian
        </h5>
        <button
          className="btn btn-primary shadow-sm fw-bold px-3"
          onClick={handleTambah}
        >
          + Tambah
        </button>
      </div>

      <div className="card shadow-sm border-0" style={{ borderRadius: "10px" }}>
        <div className="card-header bg-white py-3 border-bottom">
          <div className="fw-bold text-dark d-flex align-items-center">
            <i className="bi bi-list-ul text-info me-2"></i>
            Daftar Aspek Penilaian
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr className="small fw-bold text-center border-bottom">
                  <th width="80">#</th>
                  <th className="text-start ps-4">Kode Aspek</th>
                  <th className="text-start ps-4">Nama Aspek</th>
                  <th width="150">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-4 text-muted small"
                    >
                      Data tidak tersedia
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={item.id} className="small border-bottom">
                      <td className="text-center text-muted">{index + 1}</td>
                      <td className="ps-4 fw-medium">{item.kode_aspek}</td>
                      <td className="ps-4">{item.nama_aspek}</td>
                      <td className="text-center">
                        <div className="btn-group gap-1">
                          <button
                            className="btn btn-sm border text-primary bg-white"
                            style={{ borderColor: "#0d6efd" }}
                            onClick={() => handleEdit(item)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-sm border text-danger bg-white"
                            style={{ borderColor: "#dc3545" }}
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

      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{ width: "400px" }}
          >
            <div className="modal-content border-0 shadow">
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

              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="small fw-bold mb-1">Kode Aspek</label>
                  <input
                    className="form-control shadow-sm"
                    placeholder="Contoh: AP001"
                    value={form.kode_aspek}
                    onChange={(e) =>
                      setForm({ ...form, kode_aspek: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="small fw-bold mb-1">Nama Aspek</label>
                  <input
                    className="form-control shadow-sm"
                    placeholder="Contoh: Kehadiran"
                    value={form.nama_aspek}
                    onChange={(e) =>
                      setForm({ ...form, nama_aspek: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="modal-footer bg-light border-0">
                <button
                  className="btn btn-sm btn-secondary px-3"
                  onClick={() => setShowModal(false)}
                >
                  Batal
                </button>
                <button
                  className="btn btn-sm btn-primary px-3 shadow-sm"
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