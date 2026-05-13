import React, { useState, useEffect, useRef } from "react";
import Swal from "sweetalert2";
import api from "../../utils/api";
import {
  RiSearchLine,
  RiAddLine,
  RiFilter3Fill,
  RiFileCopyLine,
  RiFileExcel2Line,
  RiFilePdf2Line,
  RiPrinterLine,
  RiEyeLine,
  RiPencilLine,
  RiDeleteBinLine,
} from "react-icons/ri";

const DataBuku = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [filterKategori, setFilterKategori] = useState("");
  const [appliedKategori, setAppliedKategori] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [formData, setFormData] = useState({
    judul: "", penulis: "", penerbit: "", tahun: "",
    isbn: "", barcode: "", harga: "", kondisi: "Baik",
    kategori: "", rak: "", stok: 1,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/databuku");
      // Menyesuaikan jika response berbentuk { data: [...] } atau [...]
      const rows = res.data.data || res.data || [];
      setData(rows);
    } catch (err) {
      Swal.fire("Error", "Gagal mengambil data buku", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Filter Logic
  const filtered = data.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch = 
      item.judul?.toLowerCase().includes(q) || 
      item.isbn?.toLowerCase().includes(q) ||
      item.barcode?.toLowerCase().includes(q);
    const matchKategori = appliedKategori ? item.kategori === appliedKategori : true;
    return matchSearch && matchKategori;
  });

  // Pagination Logic
  const totalPage = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const currentData = filtered.slice(start, start + perPage);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openModal = (item = null) => {
    if (item) {
      setIsEditMode(true);
      setCurrentId(item.id);
      setFormData(item);
    } else {
      setIsEditMode(false);
      setCurrentId(null);
      setFormData({
        judul: "", penulis: "", penerbit: "", tahun: "",
        isbn: "", barcode: "", harga: "", kondisi: "Baik",
        kategori: "", rak: "", stok: 1,
      });
    }
    setIsModalOpen(true);
  };

  const handleSimpan = async () => {
    if (!formData.judul || !formData.penulis) {
      return Swal.fire("Error", "Judul & Penulis wajib diisi", "error");
    }
    try {
      const payload = { ...formData, harga: Number(formData.harga), stok: Number(formData.stok) };
      if (isEditMode) {
        await api.put(`/databuku/${currentId}`, payload);
        Swal.fire("Berhasil", "Data berhasil diupdate", "success");
      } else {
        await api.post("/databuku", payload);
        Swal.fire("Berhasil", "Data buku ditambahkan", "success");
      }
      fetchData();
      setIsModalOpen(false);
    } catch (err) {
      Swal.fire("Error", "Gagal menyimpan data", "error");
    }
  };

  const handleHapus = (id) => {
    Swal.fire({
      title: "Yakin hapus?",
      text: "Data yang dihapus tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/databuku/${id}`);
          Swal.fire("Terhapus!", "Data telah dihapus.", "success");
          fetchData();
        } catch (err) {
          Swal.fire("Error", "Gagal menghapus data", "error");
        }
      }
    });
  };

  // --- Export Functions (Simplified from DataSiswa) ---
  const exportHeaders = ["No", "Barcode", "Judul", "Penulis", "Penerbit", "Tahun", "ISBN", "Harga", "Kondisi", "Kategori"];
  const getExportRows = () => filtered.map((item, i) => [
    i + 1, item.barcode, item.judul, item.penulis, item.penerbit, item.tahun, item.isbn, item.harga, item.kondisi, item.kategori
  ]);

  const handleExcel = async () => {
    const XLSX = await import("xlsx");
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([exportHeaders, ...getExportRows()]), "Data Buku");
    XLSX.writeFile(wb, "data_buku.xlsx");
  };

  const badgeKondisi = (kondisi) => {
    let cls = "bg-secondary";
    if (kondisi === "Baik") cls = "bg-success";
    if (kondisi === "Rusak Ringan") cls = "bg-warning text-dark";
    if (kondisi === "Rusak Berat") cls = "bg-danger";
    return <span className={`badge ${cls}`} style={{ fontSize: '10px' }}>{kondisi}</span>;
  };

  return (
    <div className="container-fluid py-3" style={{ background: "#f4f6f9", minHeight: "100vh" }}>
      
      {/* FILTER SECTION */}
      <div className="card mb-3 shadow-sm">
        <div className="card-body">
          <label className="fw-bold mb-1 d-block small">Filter Kategori</label>
          <div className="d-flex flex-wrap gap-2">
            <select 
              className="form-select form-select-sm" 
              style={{ maxWidth: 200 }}
              value={filterKategori}
              onChange={(e) => setFilterKategori(e.target.value)}
            >
              <option value="">-- Semua Kategori --</option>
              <option value="Pendidikan">Pendidikan</option>
              <option value="Sains">Sains</option>
              <option value="Agama">Agama</option>
            </select>
            <button className="btn btn-success btn-sm d-flex align-items-center gap-1" onClick={() => {setAppliedKategori(filterKategori); setPage(1);}}>
              <RiFilter3Fill /> Terapkan
            </button>
          </div>
        </div>
      </div>

      {/* MAIN TABLE CARD */}
      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
          <h6 className="mb-0 fw-bold text-primary">Daftar Buku</h6>
          <button className="btn btn-primary btn-sm d-flex align-items-center gap-1" onClick={() => openModal()}>
            <RiAddLine /> Tambah Buku
          </button>
        </div>

        <div className="card-body">
          {/* Search & PerPage */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <div className="d-flex align-items-center gap-2 small">
              <span>Tampilkan</span>
              <select className="form-select form-select-sm" style={{ width: 70 }} value={perPage} onChange={(e) => {setPerPage(Number(e.target.value)); setPage(1);}}>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>data</span>
            </div>
            <div className="input-group input-group-sm" style={{ width: 250 }}>
              <span className="input-group-text bg-white"><RiSearchLine /></span>
              <input 
                type="text" className="form-control" placeholder="Cari Judul/ISBN/Barcode..." 
                value={search} onChange={(e) => {setSearch(e.target.value); setPage(1);}} 
              />
            </div>
          </div>

          {/* Export Buttons */}
          <div className="d-flex gap-2 mb-3">
            <button className="btn btn-outline-secondary btn-sm" onClick={handleExcel}><RiFileExcel2Line /> Excel</button>
            <button className="btn btn-outline-secondary btn-sm" onClick={() => window.print()}><RiPrinterLine /> Print</button>
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle" style={{ fontSize: '0.85rem' }}>
              <thead className="table-light text-center">
                <tr>
                  <th>No</th>
                  <th>Barcode</th>
                  <th>Judul Buku</th>
                  <th>Kondisi</th>
                  <th>Kategori</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="6" className="text-center py-4">Memuat data...</td></tr>
                ) : currentData.length === 0 ? (
                  <tr><td colSpan="6" className="text-center py-4">Data tidak ditemukan</td></tr>
                ) : (
                  currentData.map((item, i) => (
                    <tr key={item.id}>
                      <td className="text-center">{start + i + 1}</td>
                      <td className="text-center">
                        <span className="badge bg-dark font-monospace">{item.barcode}</span>
                      </td>
                      <td>
                        <div className="fw-bold">{item.judul}</div>
                        <div className="text-muted small">ISBN: {item.isbn}</div>
                      </td>
                      <td className="text-center">{badgeKondisi(item.kondisi)}</td>
                      <td className="text-center">
                        <span className="badge bg-info text-white">{item.kategori}</span>
                      </td>
                      <td className="text-center">
                        <div className="btn-group">
                          <button className="btn btn-sm btn-info text-white" onClick={() => Swal.fire("Detail", `Penulis: ${item.penulis}\nPenerbit: ${item.penerbit}`, "info")}>
                            <RiEyeLine />
                          </button>
                          <button className="btn btn-sm btn-primary" onClick={() => openModal(item)}>
                            <RiPencilLine />
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => handleHapus(item.id)}>
                            <RiDeleteBinLine />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3 small">
            <span className="text-muted">
              Menampilkan {filtered.length > 0 ? start + 1 : 0} - {Math.min(start + perPage, filtered.length)} dari {filtered.length} data
            </span>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPage(page - 1)}>&laquo;</button>
                </li>
                {[...Array(totalPage)].map((_, i) => (
                  <li key={i} className={`page-item ${page === i + 1 ? 'active' : ''}`}>
                    <button className="page-link" onClick={() => setPage(i + 1)}>{i + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${page === totalPage ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPage(page + 1)}>&raquo;</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* MODAL (Bootstrap style manual) */}
      {isModalOpen && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content shadow border-0">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{isEditMode ? "✏️ Edit Buku" : "➕ Tambah Buku"}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Judul Buku</label>
                    <input name="judul" value={formData.judul} onChange={handleChange} className="form-control form-control-sm" placeholder="Contoh: Fisika Dasar" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Penulis</label>
                    <input name="penulis" value={formData.penulis} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-bold">Penerbit</label>
                    <input name="penerbit" value={formData.penerbit} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-bold">Tahun</label>
                    <input name="tahun" value={formData.tahun} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-bold">Stok</label>
                    <input type="number" name="stok" value={formData.stok} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">ISBN</label>
                    <input name="isbn" value={formData.isbn} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Barcode</label>
                    <input name="barcode" value={formData.barcode} onChange={handleChange} className="form-control form-control-sm" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-bold">Kategori</label>
                    <select name="kategori" value={formData.kategori} onChange={handleChange} className="form-select form-select-sm">
                      <option value="">Pilih--</option>
                      <option value="Pendidikan">Pendidikan</option>
                      <option value="Sains">Sains</option>
                      <option value="Agama">Agama</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-bold">Rak</label>
                    <select name="rak" value={formData.rak} onChange={handleChange} className="form-select form-select-sm">
                      <option value="">Pilih--</option>
                      <option value="Rak 1">Rak 1</option>
                      <option value="Rak 2">Rak 2</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-bold">Kondisi</label>
                    <select name="kondisi" value={formData.kondisi} onChange={handleChange} className="form-select form-select-sm">
                      <option value="Baik">Baik</option>
                      <option value="Rusak Ringan">Rusak Ringan</option>
                      <option value="Rusak Berat">Rusak Berat</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer bg-light">
                <button className="btn btn-secondary btn-sm" onClick={() => setIsModalOpen(false)}>Batal</button>
                <button className="btn btn-primary btn-sm" onClick={handleSimpan}>Simpan Perubahan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataBuku;