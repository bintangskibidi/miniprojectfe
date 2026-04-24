import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";

const AbsensiHarian = () => {
  const navigate = useNavigate();

  // --- DATA DUMMY ---
  const initialData = [
    {
      id: 1,
      nis: "1001",
      nama: "Budi Santoso",
      kelas: "X-RPL",
      jamMasuk: "07:00",
      statusMasuk: "Tepat Waktu",
      jamPulang: "15:30",
      statusPulang: "Sesuai Jadwal",
      keterangan: "Hadir",
    },
    {
      id: 2,
      nis: "1002",
      nama: "Siti Aminah",
      kelas: "XI-TKJ",
      jamMasuk: "07:15",
      statusMasuk: "Terlambat",
      jamPulang: "15:35",
      statusPulang: "Sesuai Jadwal",
      keterangan: "Hadir",
    },
    {
      id: 3,
      nis: "1003",
      nama: "Rizky Fauzi",
      kelas: "XII-MM",
      jamMasuk: "-",
      statusMasuk: "-",
      jamPulang: "-",
      statusPulang: "-",
      keterangan: "Sakit",
    }
  ];

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  const [showModal, setShowModal] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  // --- LOGIKA FILTER & PAGINATION ---
  const filtered = data.filter(
    (item) =>
      item.nama?.toLowerCase().includes(search.toLowerCase()) ||
      item.nis?.toLowerCase().includes(search.toLowerCase())
  );

  const totalPage = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const currentData = filtered.slice(start, start + perPage);

  // --- HANDLERS ---
  const handleDelete = (id) => {
    Swal.fire({
      title: "Hapus Catatan?",
      text: "Data absensi ini akan dihapus dari list.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, hapus",
    }).then((result) => {
      if (result.isConfirmed) {
        setData(data.filter((item) => item.id !== id));
        Swal.fire("Berhasil", "Data dihapus.", "success");
      }
    });
  };

  const handleViewDetail = (id) => {
    const siswa = data.find((item) => item.id === id);
    if (siswa) {
      setSelectedSiswa(siswa);
      setShowModal(true);
    }
  };

  const getKeteranganBadge = (ket) => {
    switch (ket) {
      case "Hadir": return "bg-success";
      case "Sakit": return "bg-info";
      case "Izin": return "bg-warning text-dark";
      case "Alfa": return "bg-danger";
      default: return "bg-secondary";
    }
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h4 className="fw-bold mb-4 text-dark">Laporan Absensi Harian</h4>

      <div className="card shadow-sm border-0" style={{ borderRadius: "8px" }}>
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold text-primary">Daftar Kehadiran Siswa</h6>
          <span className="badge bg-primary px-3 py-2">{new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}</span>
        </div>

        <div className="card-body">
          {/* Toolbar */}
          <div className="d-flex justify-content-between mb-3">
            <div className="btn-group btn-group-sm">
              <button className="btn btn-outline-secondary">Copy</button>
              <button className="btn btn-outline-secondary">Excel</button>
              <button className="btn btn-outline-secondary" onClick={() => window.print()}>Print</button>
            </div>
            <input
              type="text"
              className="form-control form-control-sm border-secondary-subtle"
              style={{ width: "200px" }}
              placeholder="Cari Nama/NIS..."
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
                  <th>Nama Siswa</th>
                  <th>Kelas</th>
                  <th>Masuk</th>
                  <th>Status Masuk</th>
                  <th>Pulang</th>
                  <th>Status Pulang</th>
                  <th>Ket.</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.length > 0 ? (
                  currentData.map((item, index) => (
                    <tr key={item.id} className="small text-center">
                      <td>{start + index + 1}</td>
                      <td>{item.nis}</td>
                      <td className="fw-bold text-start">{item.nama}</td>
                      <td>{item.kelas}</td>
                      <td className="fw-bold">{item.jamMasuk}</td>
                      <td>
                        <small className={item.statusMasuk === "Terlambat" ? "text-danger fw-bold" : "text-success"}>
                          {item.statusMasuk}
                        </small>
                      </td>
                      <td className="fw-bold">{item.jamPulang}</td>
                      <td>
                        <small className="text-muted">{item.statusPulang}</small>
                      </td>
                      <td>
                        <span className={`badge ${getKeteranganBadge(item.keterangan)}`} style={{ minWidth: "60px" }}>
                          {item.keterangan}
                        </span>
                      </td>
                      <td>
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
                    <td colSpan="10" className="text-center text-muted py-4">Data tidak ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-muted">Menampilkan {currentData.length} dari {filtered.length} data</small>
            <div className="btn-group">
              <button className="btn btn-sm btn-outline-primary" disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
              <button className="btn btn-sm btn-outline-primary" disabled={page === totalPage || totalPage === 0} onClick={() => setPage(page + 1)}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL */}
      {showModal && selectedSiswa && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-primary text-white py-2 px-3">
                <h6 className="modal-title fw-bold">Detail Absensi</h6>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <div className="text-center mb-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${selectedSiswa.nama}&background=0D6EFD&color=fff&size=100`}
                    className="rounded-circle shadow-sm mb-2"
                    alt="pfp"
                  />
                  <h5 className="fw-bold mb-0">{selectedSiswa.nama}</h5>
                  <span className="text-muted small">{selectedSiswa.nis} | {selectedSiswa.kelas}</span>
                </div>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="p-2 border rounded bg-light">
                      <small className="text-muted d-block">Jam Masuk</small>
                      <span className="fw-bold">{selectedSiswa.jamMasuk}</span>
                      <small className={`d-block ${selectedSiswa.statusMasuk === "Terlambat" ? "text-danger" : "text-success"}`}>
                        {selectedSiswa.statusMasuk}
                      </small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="p-2 border rounded bg-light">
                      <small className="text-muted d-block">Jam Pulang</small>
                      <span className="fw-bold">{selectedSiswa.jamPulang}</span>
                      <small className="d-block text-muted">{selectedSiswa.statusPulang}</small>
                    </div>
                  </div>
                  <div className="col-12 text-center">
                    <div className="p-2 border rounded bg-light">
                      <small className="text-muted d-block">Status Akhir</small>
                      <span className={`badge ${getKeteranganBadge(selectedSiswa.keterangan)}`}>
                        {selectedSiswa.keterangan}
                      </span>
                    </div>
                  </div>
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