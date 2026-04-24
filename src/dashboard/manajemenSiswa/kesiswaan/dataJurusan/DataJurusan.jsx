import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../../utils/api"; // Sesuaikan path api kamu

const DataJurusan = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    id: null,
    kode_jurusan: "",
    nama_jurusan: "",
  });

  // ================= GET DATA (Ambil dari Backend) =================
  const getData = async () => {
    try {
      const res = await api.get("/jurusan");
      // Pastikan mengambil data dari res.data.data sesuai format Apidog
      setData(res.data.data || []);
    } catch (error) {
      console.error("Gagal load data jurusan:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ================= TAMBAH =================
  const handleTambah = () => {
    setForm({ id: null, kode_jurusan: "", nama_jurusan: "" });
    setShowModal(true);
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm({
      id: item.id,
      kode_jurusan: item.kode_jurusan,
      nama_jurusan: item.nama_jurusan,
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
          await api.delete(`/jurusan/${id}`);
          getData();
          Swal.fire("Berhasil", "Data dihapus", "success");
        } catch (error) {
          Swal.fire("Error", "Gagal menghapus data", "error");
        }
      }
    });
  };

  // ================= SIMPAN (POST/PUT) =================
  const handleSubmit = async () => {
    if (!form.kode_jurusan || !form.nama_jurusan) {
      Swal.fire("Warning", "Semua field wajib diisi!", "warning");
      return;
    }

    try {
      if (form.id) {
        // Mode Update
        await api.put(`/jurusan/${form.id}`, form);
        Swal.fire("Berhasil", "Data berhasil diupdate", "success");
      } else {
        // Mode Tambah Baru
        await api.post("/jurusan", form);
        Swal.fire("Berhasil", "Data berhasil ditambahkan", "success");
      }
      setShowModal(false);
      getData();
    } catch (error) {
      Swal.fire("Error", "Gagal simpan data (Cek Kode Jurusan)", "error");
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* HEADER SESUAI GAMBAR */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">
          <i className="bi bi-building text-primary me-2"></i> Data Jurusan
        </h5>
        <button className="btn btn-primary shadow-sm fw-bold px-3" onClick={handleTambah}>
          + Tambah
        </button>
      </div>

      {/* CARD TABEL */}
      <div className="card shadow-sm border-0" style={{ borderRadius: "10px" }}>
        <div className="card-header bg-white py-3 border-bottom">
          <div className="fw-bold text-dark d-flex align-items-center">
            <i className="bi bi-list-ul text-info me-2"></i> Daftar Jurusan
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr className="small fw-bold text-center border-bottom">
                  <th width="80">#</th>
                  <th className="text-start ps-4">Kode Jurusan</th>
                  <th className="text-start ps-4">Nama Jurusan</th>
                  <th width="150">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted small">
                      Data tidak tersedia
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={item.id} className="small border-bottom">
                      <td className="text-center text-muted">{index + 1}</td>
                      <td className="ps-4 fw-medium">{item.kode_jurusan}</td>
                      <td className="ps-4">{item.nama_jurusan}</td>
                      <td className="text-center">
                        <div className="btn-group gap-1">
                          <button 
                            className="btn btn-sm border text-primary bg-white" 
                            style={{borderColor: '#0d6efd'}}
                            onClick={() => handleEdit(item)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button 
                            className="btn btn-sm border text-danger bg-white" 
                            style={{borderColor: '#dc3545'}}
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

      {/* ================= MODAL TAMBAH/EDIT ================= */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered" style={{ width: "400px" }}>
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white">
                <h6 className="modal-title fw-bold">
                  {form.id ? "Edit" : "Tambah"} Jurusan
                </h6>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="small fw-bold mb-1">Kode Jurusan</label>
                  <input
                    className="form-control shadow-sm"
                    placeholder="Contoh: J3"
                    value={form.kode_jurusan}
                    onChange={(e) => setForm({ ...form, kode_jurusan: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="small fw-bold mb-1">Nama Jurusan</label>
                  <input
                    className="form-control shadow-sm"
                    placeholder="Contoh: Jurusan Fisika"
                    value={form.nama_jurusan}
                    onChange={(e) => setForm({ ...form, nama_jurusan: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer bg-light border-0">
                <button className="btn btn-sm btn-secondary px-3" onClick={() => setShowModal(false)}>Batal</button>
                <button className="btn btn-sm btn-primary px-3 shadow-sm" onClick={handleSubmit}>Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataJurusan;