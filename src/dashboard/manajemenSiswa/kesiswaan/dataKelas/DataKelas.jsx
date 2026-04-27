import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../../utils/api"; // Pastikan path axios kamu benar

const DataKelas = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ id: null, kode_kelas: "", nama_kelas: "" });

  // ================= GET DATA (Ambil dari Backend) =================
  const getData = async () => {
    try {
      const res = await api.get("/kelas");
      setData(res.data.data || []);
    } catch (error) {
      console.error("Gagal load data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ================= TAMBAH =================
  const handleTambah = () => {
    setForm({ id: null, kode_kelas: "", nama_kelas: "" });
    setShowModal(true);
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm({
      id: item.id,
      kode_kelas: item.kode_kelas,
      nama_kelas: item.nama_kelas,
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
          await api.delete(`/kelas/${id}`);
          getData();
          Swal.fire("Berhasil", "Data dihapus", "success");
        } catch (error) {
          Swal.fire("Error", "Gagal menghapus data", "error");
        }
      }
    });
  };

  // ================= SIMPAN (Create/Update) =================
  const handleSubmit = async () => {
    if (!form.kode_kelas || !form.nama_kelas) {
      Swal.fire("Warning", "Semua field wajib diisi!", "warning");
      return;
    }

    try {
      if (form.id) {
        // Mode Update
        await api.put(`/kelas/${form.id}`, form);
        Swal.fire("Berhasil", "Data diupdate", "success");
      } else {
        // Mode Create
        await api.post("/kelas", form);
        Swal.fire("Berhasil", "Data ditambahkan", "success");
      }
      setShowModal(false);
      getData();
    } catch (error) {
      Swal.fire("Error", "Gagal simpan data (Kode mungkin duplikat)", "error");
    }
  };

  const filteredData = data.filter(
    (item) =>
      item.kode_kelas?.toLowerCase().includes(search.toLowerCase()) ||
      item.nama_kelas?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* HEADER UTAMA */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">
           <i className="bi bi-buildings-fill text-primary me-2"></i> Data Kelas
        </h5>
        <button className="btn btn-primary shadow-sm fw-bold" onClick={handleTambah}>
          + Tambah
        </button>
      </div>

      {/* CARD TABEL */}
      <div className="card shadow-sm border-0" style={{ borderRadius: "10px" }}>
        <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center border-bottom">
          <div className="fw-bold text-primary">
            <i className="bi bi-list-task me-2"></i> Daftar Kelas
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="small fw-bold">Search:</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control form-control-sm"
              style={{ width: "200px" }}
            />
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light border-bottom">
                <tr className="small fw-bold text-center">
                  <th width="60">#</th>
                  <th className="text-start ps-4">Kode Kelas</th>
                  <th className="text-start ps-4">Nama Kelas</th>
                  <th width="120">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted small">
                      Data tidak tersedia
                    </td>
                  </tr>
                ) : (
                  filteredData.map((item, index) => (
                    <tr key={item.id} className="small">
                      <td className="text-center text-muted">{index + 1}</td>
                      <td className="ps-4">{item.kode_kelas}</td>
                      <td className="ps-4">{item.nama_kelas}</td>
                      <td className="text-center">
                        <div className="btn-group gap-1">
                          <button className="btn btn-sm border text-primary bg-white" onClick={() => handleEdit(item)}>
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button className="btn btn-sm border text-danger bg-white" onClick={() => handleHapus(item.id)}>
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

      {/* ================= MODAL EDIT/TAMBAH ================= */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
          <div className="modal-dialog modal-dialog-centered" style={{ width: "400px" }}>
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white py-3">
                <h6 className="modal-title fw-bold">
                  {form.id ? "Edit" : "Tambah"} Data Kelas
                </h6>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="small fw-bold mb-1">Kode Kelas</label>
                  <input
                    className="form-control"
                    placeholder="Contoh: 3.1"
                    value={form.kode_kelas}
                    onChange={(e) => setForm({ ...form, kode_kelas: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="small fw-bold mb-1">Nama Kelas</label>
                  <input
                    className="form-control"
                    placeholder="Contoh: IX A"
                    value={form.nama_kelas}
                    onChange={(e) => setForm({ ...form, nama_kelas: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer border-0 bg-light">
                <button className="btn btn-sm btn-secondary px-3" onClick={() => setShowModal(false)}>Batal</button>
                <button className="btn btn-sm btn-primary px-3" onClick={handleSubmit}>Simpan Data</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataKelas;