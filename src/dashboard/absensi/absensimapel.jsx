import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const AbsensiMapel = () => {
  const [listTahunAjaran, setListTahunAjaran] = useState([]);
  const [listWaliKelas, setListWaliKelas] = useState([]); // Data guru & kelas
  const [dataSiswa, setDataSiswa] = useState([]);
  const [riwayatDetail, setRiwayatDetail] = useState([]); // Anggap ini nanti dari API

  const [filter, setFilter] = useState({
    tahunAjaran: "",
    guru: "",
    kelas: ""
  });

  const fetchData = async () => {
    try {
      const resTahun = await api.get("/tahun-ajaran");
      setListTahunAjaran(resTahun.data.data || []);

      const resWali = await api.get("/walikelas");
      setListWaliKelas(resWali.data.data || []);

      const resSiswa = await api.get("/siswa");
      setDataSiswa(resSiswa.data.data || []);
      
      // Jika ada API riwayat, panggil di sini
      // setRiwayatDetail(resRiwayat.data.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  // ================= LOGIKA FILTERING DATA =================

  // 1. Filter Statistik Per Kelas (dari data walikelas)
  const filteredKelas = listWaliKelas.filter(item => {
    return (filter.tahunAjaran === "" || item.tahunAjaran === filter.tahunAjaran) &&
           (filter.guru === "" || item.namaPegawai === filter.guru) &&
           (filter.kelas === "" || item.namaKelas === filter.kelas);
  });

  // 2. Filter Statistik Per Siswa
  // Asumsi: Di data siswa ada field 'namaKelas' dan 'tahunAjaran'
  const filteredSiswa = dataSiswa.filter(s => {
    return (filter.kelas === "" || s.namaKelas === filter.kelas) &&
           (filter.tahunAjaran === "" || s.tahunAjaran === filter.tahunAjaran);
  });

  // 3. Filter Riwayat Detail
  // Contoh data dummy untuk riwayat yang bisa difilter
  const dummyRiwayat = [
    { id: 1, tanggal: "10-11-2025", jam: "1", mapel: "Sejarah", guru: "Budi Santoso", kelas: "IX A", siswa: "Ani (1001)", status: "hadir", waktu: "01:00:31" },
    { id: 2, tanggal: "11-11-2025", jam: "2", mapel: "Matematika", guru: "Siti Aminah", kelas: "IX C", siswa: "Budi (2002)", status: "hadir", waktu: "08:00:15" },
  ];

  const filteredRiwayat = dummyRiwayat.filter(r => {
    return (filter.guru === "" || r.guru === filter.guru) &&
           (filter.kelas === "" || r.kelas === filter.kelas);
  });

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h4 className="fw-bold mb-4">Riwayat Mengajar Per Kelas dan Siswa</h4>

      {/* SECTION FILTER */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-bold">Filter Tahun Ajaran:</label>
              <select className="form-select shadow-sm" name="tahunAjaran" value={filter.tahunAjaran} onChange={handleFilterChange}>
                <option value="">-- Semua Tahun Ajaran --</option>
                {listTahunAjaran.map((t) => (
                  <option key={t.id} value={t.tahun_ajaran}>{t.tahun_ajaran}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Filter Guru:</label>
              <select className="form-select shadow-sm" name="guru" value={filter.guru} onChange={handleFilterChange}>
                <option value="">-- Semua Guru --</option>
                {[...new Set(listWaliKelas.map(item => item.namaPegawai))].map((nama, idx) => (
                  <option key={idx} value={nama}>{nama}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Filter Kelas:</label>
              <select className="form-select shadow-sm" name="kelas" value={filter.kelas} onChange={handleFilterChange}>
                <option value="">-- Semua Kelas --</option>
                {[...new Set(listWaliKelas.map(item => item.namaKelas))].map((nama, idx) => (
                  <option key={idx} value={nama}>{nama}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* STATISTIK SESI PER KELAS (TERFILTER) */}
      <div className="card shadow-sm border-0 mb-4 overflow-hidden">
        <div className="card-header bg-info text-white py-2">
          <h6 className="mb-0 fw-bold">Statistik Sesi Mengajar per Kelas</h6>
        </div>
        <div className="card-body p-0">
          <ul className="list-group list-group-flush">
            {filteredKelas.length > 0 ? filteredKelas.map((k, idx) => (
              <li key={idx} className="list-group-item d-flex justify-content-between align-items-center py-3">
                <span className="fw-bold text-muted">{k.namaKelas} ({k.namaPegawai})</span>
                <span className="badge bg-primary rounded-pill px-3">0 sesi</span> 
              </li>
            )) : <li className="list-group-item text-center small text-muted">Tidak ada data kelas.</li>}
          </ul>
        </div>
      </div>

      {/* STATISTIK PER SISWA (TERFILTER) */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-header bg-secondary text-white py-2">
          <h6 className="mb-0 fw-bold">Statistik Total Sesi Mengajar per Siswa</h6>
        </div>
        <div className="card-body">
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
                {filteredSiswa.length > 0 ? filteredSiswa.map((s, i) => (
                  <tr key={i}>
                    <td className="text-center">{i + 1}</td>
                    <td className="text-center">{s.nis || s.nisn}</td>
                    <td className="fw-bold">{s.nama || s.namaSiswa}</td>
                    <td className="text-center">{s.totalSesi || 0}</td>
                  </tr>
                )) : (
                  <tr><td colSpan="4" className="text-center text-muted">Silahkan pilih filter kelas untuk melihat siswa.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* RIWAYAT KEHADIRAN DETAIL (TERFILTER) */}
      <div className="card shadow-sm border-0 mb-5">
        <div className="card-body p-0">
            <div className="p-3 bg-light border-bottom">
                <h6 className="mb-0 small fw-bold">Riwayat Kehadiran Mengajar</h6>
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
                        {filteredRiwayat.length > 0 ? filteredRiwayat.map((r, i) => (
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
                        )) : (
                          <tr><td colSpan="8" className="text-center text-muted">Data riwayat tidak ditemukan.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AbsensiMapel;