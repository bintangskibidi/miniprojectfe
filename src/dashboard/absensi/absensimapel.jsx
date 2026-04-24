import React, { useState } from "react";

const AbsensiMapel = () => {
  // --- DATA DUMMY ---
  const dataKelas = [
    { nama: "Alumni", sesi: 3 },
    { nama: "IX A", sesi: 4 },
    { nama: "IX C", sesi: 4 },
  ];

  const dataSiswa = [
    { id: 1, nis: "1001", nama: "Budi Santoso", totalSesi: 4 },
    { id: 2, nis: "2222", nama: "Abcdeg", totalSesi: 4 },
    { id: 3, nis: "22233", nama: "awd", totalSesi: 3 },
    { id: 4, nis: "45678", nama: "rgb", totalSesi: 3 },
  ];

  const riwayatDetail = [
    { id: 1, tanggal: "10-11-2025", jam: "0", mapel: "Sejarah", guru: "abcd", siswa: "Budi Santoso (1001)", status: "hadir", waktu: "01:00:31" }
  ];

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="d-flex justify-content-between align-items-center">
        
      </div>

      <h4 className="fw-bold mb-4">Riwayat Mengajar Per Kelas dan Siswa</h4>

      {/* SECTION FILTER */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-bold">Filter Tahun Ajaran:</label>
              <select className="form-select shadow-sm">
                <option>2024/2025</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Filter Guru:</label>
              <select className="form-select shadow-sm">
                <option>-- Semua Guru --</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Filter Kelas:</label>
              <select className="form-select shadow-sm">
                <option>-- Semua Kelas --</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* STATISTIK SESI PER KELAS */}
      <div className="card shadow-sm border-0 mb-4 overflow-hidden">
        <div className="card-header bg-info text-white py-2">
          <h6 className="mb-0 fw-bold">Statistik Sesi Mengajar per Kelas</h6>
        </div>
        <div className="card-body p-0">
          <ul className="list-group list-group-flush">
            {dataKelas.map((k, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center py-3">
                <span className="fw-bold text-muted">{k.nama}</span>
                <span className="badge bg-primary rounded-pill px-3">{k.sesi} sesi</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* STATISTIK TOTAL SESI PER SISWA */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-secondary text-white py-2">
          <h6 className="mb-0 fw-bold">Statistik Total Sesi Mengajar per Siswa</h6>
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <div className="btn-group btn-group-sm">
              <button className="btn btn-outline-secondary">Salin</button>
              <button className="btn btn-outline-secondary">Excel</button>
              <button className="btn btn-outline-secondary">PDF</button>
              <button className="btn btn-outline-secondary">Print</button>
            </div>
            <input type="text" className="form-control form-control-sm" style={{ width: "200px" }} placeholder="Cari..." />
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle shadow-sm">
              <thead className="table-light small">
                <tr>
                  <th width="50">#</th>
                  <th>NIS</th>
                  <th>Nama Siswa</th>
                  <th>Total Sesi</th>
                </tr>
              </thead>
              <tbody className="small">
                {dataSiswa.map((s, i) => (
                  <tr key={i}>
                    <td className="text-center">{i + 1}</td>
                    <td className="text-center">{s.nis}</td>
                    <td className="fw-bold">{s.nama}</td>
                    <td className="text-center">{s.totalSesi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RIWAYAT KEHADIRAN DETAIL */}
      <div className="card shadow-sm border-0 mb-5">
        <div className="card-body p-0">
            <div className="p-3 bg-light border-bottom">
                <h6 className="mb-0 small fw-bold">Riwayat Kehadiran Mengajar Tahun Ajaran: 2024/2025</h6>
            </div>
            <div className="table-responsive p-3">
                <table className="table table-sm table-bordered align-middle">
                    <thead className="bg-light small">
                        <tr className="text-center">
                            <th>No</th>
                            <th>Tanggal</th>
                            <th>Jam ke-</th>
                            <th>Mapel</th>
                            <th>Guru</th>
                            <th>Siswa</th>
                            <th>Status</th>
                            <th>Waktu Absen</th>
                        </tr>
                    </thead>
                    <tbody className="small">
                        {riwayatDetail.map((r, i) => (
                            <tr key={i} className="text-center">
                                <td>{i+1}</td>
                                <td>{r.tanggal}</td>
                                <td>{r.jam}</td>
                                <td>{r.mapel}</td>
                                <td>{r.guru}</td>
                                <td className="text-start">{r.siswa}</td>
                                <td><span className="badge bg-success">{r.status}</span></td>
                                <td>{r.waktu}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AbsensiMapel;