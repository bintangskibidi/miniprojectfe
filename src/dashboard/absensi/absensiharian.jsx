import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api"; 

const AbsensiHarian = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10; 

  const [showModal, setShowModal] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  // --- FETCH DATA DARI API /presensi ---
  const fetchDataPresensi = async () => {
    setLoading(true);
    try {
      // GANTI KE /presensi
      const response = await api.get("/presensi");
      
      // Karena backend kita mengirim { status: true, data: [...] }
      setData(response.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data presensi:", error);
      Swal.fire("Error", "Gagal mengambil data dari server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataPresensi();
  }, []);

  // --- LOGIKA FILTER ---
  // Kita sesuaikan filter dengan field yang dikirim dari Backend (nama, nis, nama_kelas)
  const filtered = data.filter(
    (item) =>
      item.nama?.toLowerCase().includes(search.toLowerCase()) ||
      item.nis?.toLowerCase().includes(search.toLowerCase()) ||
      item.nama_kelas?.toLowerCase().includes(search.toLowerCase()) ||
      item.keterangan?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPage = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const currentData = filtered.slice(start, start + perPage);

  // --- HANDLERS ---
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Catatan?",
      text: "Data absensi ini akan dihapus permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, hapus",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Endpoint hapus ke /presensi/{id}
          await api.delete(`/presensi/${id}`); 
          setData(data.filter((item) => item.id !== id));
          Swal.fire("Berhasil", "Data dihapus.", "success");
        } catch (error) {
          Swal.fire("Gagal", "Tidak dapat menghapus data.", "error");
        }
      }
    });
  };

  const handleViewDetail = (id) => {
    const item = data.find((p) => p.id === id);
    if (item) {
      setSelectedSiswa(item);
      setShowModal(true);
    }
  };

  const getKeteranganBadge = (ket) => {
    switch (ket?.toLowerCase()) {
      case "hadir": return "bg-success";
      case "sakit": return "bg-info text-white";
      case "ijin": return "bg-warning text-dark";
      case "alfa": return "bg-danger";
      default: return "bg-secondary";
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h4 className="fw-bold mb-4 text-dark">Laporan Absensi Harian</h4>

      <div className="card shadow-sm border-0" style={{ borderRadius: "8px" }}>
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold text-primary">Daftar Kehadiran Siswa</h6>
          <span className="badge bg-primary px-3 py-2">
            {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
          </span>
        </div>

        <div className="card-body">
          {/* Toolbar */}
          <div className="d-flex flex-column flex-md-row justify-content-between mb-3 gap-2">
            <div className="btn-group btn-group-sm">
              <button className="btn btn-outline-secondary">Excel</button>
              <button className="btn btn-outline-secondary" onClick={() => window.print()}>Print</button>
              <button className="btn btn-outline-primary" onClick={fetchDataPresensi}>
                <i className="bi bi-arrow-clockwise"></i> Refresh
              </button>
            </div>
            <input
              type="text"
              className="form-control form-control-sm"
              style={{ width: "250px" }}
              placeholder="Cari Nama, NIS, atau Kelas..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Table */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light small text-center text-uppercase">
                <tr>
                  <th>NO</th>
                  <th>NIS</th>
                  <th className="text-center">Nama Siswa</th>
                  <th>Kelas</th>
                  <th>Masuk</th>
                  <th className="text-center">Status</th>
                  <th>Pulang</th>
                  <th className="text-center">Ket.</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="9" className="text-center py-4">Memuat data...</td></tr>
                ) : currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <tr key={item.id} className="small text-center">
                      <td>{start + index + 1}</td>
                      <td>{item.nis}</td>
                      <td className="text-center">{item.nama}</td>
                      <td>{item.nama_kelas || "-"}</td>
                      <td className="">{item.jam_masuk || "-"}</td>
                      <td className="text-center">
                        <small className={item.status_masuk === "Terlambat" ? "text-danger fw-bold" : "text-success"}>
                          {item.status_masuk || "Tepat Waktu"}
                        </small>
                      </td>
                      <td className="fw-bold">{item.jam_pulang || "-"}</td>
                      <td className="text-center">
                        <span className={`badge ${getKeteranganBadge(item.keterangan)}`} style={{ minWidth: "60px" }}>
                          {item.keterangan}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="btn-group gap-1">
                          <Link to={`/dashboard/edit-absensi/${item.id}`} className="btn btn-outline-primary btn-sm">
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          <button className="btn btn-outline-info btn-sm" onClick={() => handleViewDetail(item.id)}>
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item.id)}>
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center text-muted py-4">Data absensi hari ini kosong</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination (Tetap Sama) */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-muted">
              Menampilkan {currentData.length} dari {filtered.length} data
            </small>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPage(page - 1)}>Prev</button>
                </li>
                <li className={`page-item ${page === totalPage || totalPage === 0 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL */}
      {showModal && selectedSiswa && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-primary text-white py-2 px-3">
                <h6 className="modal-title fw-bold">Detail Log Absensi</h6>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4 text-center">
                 <img
                    src={`https://ui-avatars.com/api/?name=${selectedSiswa.nama}&background=0D6EFD&color=fff&size=100`}
                    className="rounded-circle shadow-sm mb-2"
                    alt="pfp"
                  />
                  <h5 className="fw-bold mb-0">{selectedSiswa.nama}</h5>
                  <p className="text-muted">{selectedSiswa.nis} | {selectedSiswa.nama_kelas}</p>
                  <hr />
                  <div className="row text-start small">
                    <div className="col-6 mb-2"><strong>Tanggal:</strong><br/>{selectedSiswa.tanggal}</div>
                    <div className="col-6 mb-2"><strong>Status Masuk:</strong><br/>{selectedSiswa.status_masuk}</div>
                    <div className="col-6 mb-2"><strong>Jam Masuk:</strong><br/>{selectedSiswa.jam_masuk}</div>
                    <div className="col-6 mb-2"><strong>Jam Pulang:</strong><br/>{selectedSiswa.jam_pulang}</div>
                    <div className="col-6"><strong>Keterangan:</strong><br/>{selectedSiswa.keterangan}</div>
                    {selectedSiswa.detail_ijin && (
                        <div className="col-12 mt-2"><strong>Detail Ijin:</strong><br/>{selectedSiswa.detail_ijin}</div>
                    )}
                  </div>
              </div>
              <div className="modal-footer bg-light py-2">
                <button className="btn btn-secondary btn-sm" onClick={() => setShowModal(false)}>Tutup</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AbsensiHarian;