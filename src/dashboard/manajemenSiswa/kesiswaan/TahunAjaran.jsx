import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../utils/api";

const TahunAjaran = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    id: null,
    tahun_ajaran: "",
    tahun: "",
    status: true,
  });

  const getData = async () => {
    try {
      const res = await api.get("/tahun-ajaran");
      setData(res.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data tahun ajaran:", error);
      Swal.fire("Error", "Gagal memuat data", "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleTambah = () => {
    setForm({
      id: null,
      tahun_ajaran: "",
      tahun: "",
      status: true,
    });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      tahun_ajaran: item.tahun_ajaran,
      tahun: item.tahun,
      status: item.status,
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
          await api.delete(`/tahun-ajaran/${id}`);
          getData();
          Swal.fire("Berhasil", "Data dihapus", "success");
        } catch {
          Swal.fire("Error", "Gagal menghapus data", "error");
        }
      }
    });
  };

  const toggleStatus = async (item) => {
    try {
      const res = await api.patch(`/tahun-ajaran/${item.id}`);

      await getData();

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Toggle error:", error.response?.data || error);

      Swal.fire(
        "Error",
        error.response?.data?.message || "Gagal mengubah status",
        "error",
      );
    }
  };

  const handleSubmit = async () => {
    if (!form.tahun_ajaran || !form.tahun) {
      Swal.fire("Warning", "Semua field wajib diisi!", "warning");
      return;
    }

    try {
      if (form.id) {
        await api.put(`/tahun-ajaran/${form.id}`, form);
        Swal.fire("Berhasil", "Data berhasil diupdate", "success");
      } else {
        await api.post("/tahun-ajaran", form);
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
          <i className="bi bi-calendar-event text-primary me-2"></i>
          Data Tahun Ajaran
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
            Daftar Tahun Ajaran
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr className="small fw-bold text-center border-bottom">
                  <th width="80">#</th>
                  <th className="text-start ps-4">Tahun Ajaran</th>
                  <th className="text-start ps-4">Tahun</th>
                  <th width="180">Status</th>
                  <th width="150">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4 text-muted small"
                    >
                      Data tidak tersedia
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={item.id} className="small border-bottom">
                      <td className="text-center text-muted">{index + 1}</td>
                      <td className="ps-4 fw-medium">{item.tahun_ajaran}</td>
                      <td className="ps-4">{item.tahun}</td>
                      <td className="text-center">
                        <button
                          onClick={() => toggleStatus(item)}
                          className={`btn btn-sm ${item.status ? "btn-warning" : "btn-success"}`}
                        >
                          {item.status ? "Non-Aktifkan" : "Aktifkan"}
                        </button>
                      </td>
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
                  {form.id ? "Edit" : "Tambah"} Tahun Ajaran
                </h6>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="small fw-bold mb-1">Tahun Ajaran</label>
                  <input
                    className="form-control shadow-sm"
                    placeholder="Contoh: 2025/2026"
                    value={form.tahun_ajaran}
                    onChange={(e) =>
                      setForm({ ...form, tahun_ajaran: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="small fw-bold mb-1">Tahun</label>
                  <input
                    className="form-control shadow-sm"
                    placeholder="Contoh: 2025"
                    value={form.tahun}
                    onChange={(e) =>
                      setForm({ ...form, tahun: e.target.value })
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

export default TahunAjaran;
