import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const RekapAbsensi = () => {
  const navigate = useNavigate();

  // --- DATA DUMMY REKAP (Akumulasi) ---
  const initialData = [
    { id: 1, nis: "11918", nama: "agus", kelas: "Alumni", hadir: 7, izin: 0, sakit: 0, alfa: 0 },
    { id: 2, nis: "72112", nama: "awd", kelas: "IX 10", hadir: 18, izin: 1, sakit: 0, alfa: 0 },
    { id: 3, nis: "3423234234", nama: "test", kelas: "Alumni", hadir: 0, izin: 0, sakit: 0, alfa: 0 },
    { id: 4, nis: "72124", nama: "eee", kelas: "IX 9", hadir: 20, izin: 0, sakit: 0, alfa: 0 },
  ];

  const [data] = useState(initialData);
  const [search, setSearch] = useState("");
  const [filterKelas, setFilterKelas] = useState("");
  const [tanggalAwal, setTanggalAwal] = useState("2026-04-01");
  const [tanggalAkhir, setTanggalAkhir] = useState("2026-04-22");

  // --- LOGIKA FILTER ---
  const filtered = data.filter((item) => {
    const matchSearch = item.nama.toLowerCase().includes(search.toLowerCase()) || item.nis.includes(search);
    const matchKelas = filterKelas === "" || item.kelas === filterKelas;
    return matchSearch && matchKelas;
  });

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="d-flex align-items-center mb-">
         <div className="ms-auto small">
 
         </div>
      </div>

      <h4 className="fw-bold mb-4 d-flex align-items-center">
        <i className="bi bi-file-earmark-text-fill text-primary me-2"></i> Rekap Absensi Harian
      </h4>

      {/* SECTION FILTER */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-white py-3 border-bottom">
          <h6 className="mb-0 fw-bold"><i className="bi bi-filter text-info me-2"></i> Filter</h6>
        </div>
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label className="form-label small fw-bold">Filter Kelas</label>
              <select className="form-select" onChange={(e) => setFilterKelas(e.target.value)}>
                <option value="">-- Semua Kelas --</option>
                <option value="IX A">IX A</option>
                <option value="IX C">IX C</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Tanggal Awal</label>
              <input type="date" className="form-control" value={tanggalAwal} onChange={(e) => setTanggalAwal(e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Tanggal Akhir</label>
              <input type="date" className="form-control" value={tanggalAkhir} onChange={(e) => setTanggalAkhir(e.target.value)} />
            </div>
            <div className="col-md-3">
              <button className="btn btn-secondary w-100" onClick={() => window.location.reload()}>Reset</button>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE REKAP */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-white py-3 border-bottom">
          <h6 className="mb-0 fw-bold"><i className="bi bi-list-task text-success me-2"></i> Data Rekap Absensi</h6>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
            <div className="d-flex align-items-center">
              <span className="me-2 small">Tampilkan</span>
              <select className="form-select form-select-sm" style={{ width: "80px" }}>
                <option>5</option>
              </select>
              <span className="ms-2 small">data</span>
            </div>

            <div className="d-flex align-items-center">
              <span className="me-2 small">Cari:</span>
              <input 
                type="text" 
                className="form-control form-control-sm" 
                onChange={(e) => setSearch(e.target.value)} 
                style={{ width: "200px" }}
              />
            </div>
          </div>

          <div className="btn-group btn-group-sm mb-3">
            <button className="btn btn-outline-secondary"><i className="bi bi-clipboard me-1"></i> Salin</button>
            <button className="btn btn-outline-secondary"><i className="bi bi-file-earmark-spreadsheet me-1"></i> CSV</button>
            <button className="btn btn-outline-secondary"><i className="bi bi-file-earmark-excel me-1"></i> Excel</button>
            <button className="btn btn-outline-secondary"><i className="bi bi-file-earmark-pdf me-1"></i> PDF</button>
            <button className="btn btn-outline-secondary" onClick={() => window.print()}><i className="bi bi-printer me-1"></i> Print</button>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead className="table-light text-center small fw-bold">
                <tr>
                  <th width="50">#</th>
                  <th>NIS</th>
                  <th>Nama Lengkap</th>
                  <th>Kelas</th>
                  <th className="text-success">Hadir</th>
                  <th className="text-warning">Izin</th>
                  <th className="text-info">Sakit</th>
                  <th className="text-danger">Alfa</th>
                </tr>
              </thead>
              <tbody className="small">
                {filtered.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{item.nis}</td>
                    <td>{item.nama}</td>
                    <td className="text-center">{item.kelas}</td>
                    <td className="text-center">{item.hadir}</td>
                    <td className="text-center">{item.izin}</td>
                    <td className="text-center">{item.sakit}</td>
                    <td className="text-center">{item.alfa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 text-muted small">
            Menampilkan {filtered.length} dari {data.length} entri
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekapAbsensi;