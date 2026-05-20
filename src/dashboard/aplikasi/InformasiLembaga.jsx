import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../utils/api"; // Memakai instance api yang sama dengan Absensi

const InformasiLembaga = () => {
  // --- STATE ---
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // State untuk Form (Tambah / Edit)
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // State Input Form
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [tanggal, setTanggal] = useState("");

  // --- FETCH DATA ---
  const fetchDataInformasi = async () => {
    setLoading(true);
    try {
      const response = await api.get("/informasilembaga");
      // Menyesuaikan dengan struktur response dari Falcon Backend Anda: { status: true, data: [...] }
      setData(response.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data informasi:", error);
      Swal.fire("Error", "Gagal mengambil data dari server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataInformasi();
  }, []);

  // --- HANDLER BUTTON TAMBAH (Buka Form Kosong) ---
  const handleBtnTambah = () => {
    setIsEdit(false);
    setSelectedId(null);
    setJudul("");
    setIsi("");
    // Set default tanggal hari ini format YYYY-MM-DD
    setTanggal(new Date().toISOString().split("T")[0]);
    setShowForm(true);
  };

  // --- HANDLER BUTTON EDIT (Buka Form + Isi Data Lama) ---
  const handleBtnEdit = (item) => {
    setIsEdit(true);
    setSelectedId(item.id);
    setJudul(item.judul);
    setIsi(item.isi);
    setTanggal(item.tanggal || "");
    setShowForm(true);
  };

  // --- HANDLER SUBMIT FORM (SIMPAN / UPDATE) ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!judul || !isi) {
      Swal.fire("Peringatan", "Judul dan Isi wajib diisi!", "warning");
      return;
    }

    const payload = { judul, isi, tanggal };

    try {
      if (isEdit) {
        // API PUT ke /informasilembaga/:id
        await api.put(`/informasilembaga/${selectedId}`, payload);
        Swal.fire("Berhasil", "Data berhasil diupdate.", "success");
      } else {
        // API POST ke /informasilembaga
        await api.post("/informasilembaga", payload);
        Swal.fire("Berhasil", "Data berhasil ditambahkan.", "success");
      }
      
      // Reset Form & Refresh Data
      setShowForm(false);
      fetchDataInformasi();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      Swal.fire("Gagal", "Terjadi kesalahan saat menyimpan data.", "error");
    }
  };

  // --- HANDLER HAPUS DATA ---
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Catatan?",
      text: "Yakin ingin menghapus pesan? ya dan tidak",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // API DELETE ke /informasilembaga/:id
          await api.delete(`/informasilembaga/${id}`);
          setData(data.filter((item) => item.id !== id));
          Swal.fire("Berhasil", "Pesan berhasil dihapus.", "success");
        } catch (error) {
          console.error("Gagal menghapus data:", error);
          Swal.fire("Gagal", "Tidak dapat menghapus data.", "error");
        }
      }
    });
  };

  return (
    <div className="container mt-4">
      <h4 className="fw-bold mb-4 text-dark">Informasi Lembaga</h4>

      {/* TAMPILAN FORM (Hanya muncul jika tombol Tambah/Edit diklik) */}
      {showForm && (
        <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: "8px" }}>
          <div className="card-header bg-primary text-white py-3">
            <h6 className="mb-0 fw-bold">
              {isEdit ? "Form Edit Informasi" : "Form Tambah Informasi"}
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold small">Judul Informasi</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan judul..."
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold small">Isi Informasi</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Masukkan isi informasi..."
                  value={isi}
                  onChange={(e) => setIsi(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold small">Tanggal</label>
                <input
                  type="date"
                  className="form-control"
                  value={tanggal}
                  onChange={(e) => setTanggal(e.target.value)}
                />
              </div>
              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm px-3"
                  onClick={() => setShowForm(false)}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-success btn-sm px-3">
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAMPILAN UTAMA DATA TABEL */}
      <div className="card shadow-sm border-0" style={{ borderRadius: "8px" }}>
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold text-primary">Daftar Informasi Pengumuman</h6>
          {!showForm && (
            <button className="btn btn-primary btn-sm" onClick={handleBtnTambah}>
              <i className="bi bi-plus-lg"></i> Tambah Informasi
            </button>
          )}
        </div>

        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle mb-0">
              <thead className="table-light small text-center text-uppercase">
                <tr>
                  <th style={{ width: "50px" }}>#</th>
                  <th>Judul</th>
                  <th>Isi</th>
                  <th style={{ width: "130px" }}>Tanggal</th>
                  <th style={{ width: "150px" }}>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4 text-muted">
                      Memuat data pengumuman...
                    </td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={item.id} className="small">
                      <td className="text-center">{index + 1}</td>
                      <td className="fw-bold text-dark">{item.judul}</td>
                      <td>{item.isi}</td>
                      <td className="text-center text-muted">{item.tanggal || "-"}</td>
                      <td className="text-center">
                        <div className="btn-group gap-1">
                          <button
                            className="btn btn-outline-warning btn-sm"
                            onClick={() => handleBtnEdit(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleDelete(item.id)}
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-4">
                      Tidak ada informasi lembaga yang tersedia.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformasiLembaga;