import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api"; // Pastikan path api benar

const RekapAbsensi = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [dataSiswa, setDataSiswa] = useState([]); // Data dari API Siswa
  const [listKelas, setListKelas] = useState([]); // Data dari API Kelas
  const [search, setSearch] = useState("");
  const [filterKelas, setFilterKelas] = useState("");
  const [tanggalAwal, setTanggalAwal] = useState("2026-04-01");
  const [tanggalAkhir, setTanggalAkhir] = useState("2026-04-22");
  const [loading, setLoading] = useState(false);

  // --- 1. AMBIL DATA LIST KELUAR UNTUK DROPDOWN ---
  const getListKelas = async () => {
    try {
      const res = await api.get("/kelas");
      setListKelas(res.data.data || []);
    } catch (error) {
      console.error("Gagal load data kelas:", error);
    }
  };

  // --- 2. AMBIL DATA SISWA BERDASARKAN FILTER ---
  const getRekapData = async () => {
    setLoading(true);
    try {
      // Mengirim param ke backend agar backend yang memfilter
      // Contoh request: /siswa?kelas=IX A
      const response = await api.get("/siswa", {
        params: {
          kelas: filterKelas,
          // Jika backend mendukung rekap range tanggal, tambahkan:
          // tgl_awal: tanggalAwal,
          // tgl_akhir: tanggalAkhir
        }
      });
      setDataSiswa(response.data.data || []);
    } catch (error) {
      console.error("Gagal load data rekap:", error);
      Swal.fire("Error", "Gagal mengambil data absensi", "error");
    } finally {
      setLoading(false);
    }
  };

  // Load list kelas saat pertama kali render
  useEffect(() => {
    getListKelas();
  }, []);

  // Re-fetch data siswa setiap kali filterKelas berubah
  useEffect(() => {
    getRekapData();
  }, [filterKelas]);

  // --- LOGIKA SEARCH (Client Side untuk pencarian nama/nis) ---
  const filtered = dataSiswa.filter((item) => {
    const matchSearch = 
      item.nama?.toLowerCase().includes(search.toLowerCase()) || 
      item.nis?.includes(search);
    return matchSearch;
  });

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
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
              <select 
                className="form-select" 
                value={filterKelas}
                onChange={(e) => setFilterKelas(e.target.value)}
              >
                <option value="">-- Semua Kelas --</option>
                {listKelas.map((k) => (
                  <option key={k.id} value={k.nama_kelas}>
                    {k.nama_kelas}
                  </option>
                ))}
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
              <button className="btn btn-secondary w-100" onClick={() => {
                setFilterKelas("");
                setSearch("");
              }}>Reset Filter</button>
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
              <span className="me-2 small">Cari:</span>
              <input 
                type="text" 
                className="form-control form-control-sm" 
                placeholder="Nama atau NIS..."
                onChange={(e) => setSearch(e.target.value)} 
                style={{ width: "200px" }}
              />
            </div>
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
                {loading ? (
                  <tr><td colSpan="8" className="text-center">Memuat data...</td></tr>
                ) : filtered.length > 0 ? (
                  filtered.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{item.nis}</td>
                      <td>{item.nama}</td>
                      <td className="text-center">{item.kelas}</td>
                      {/* Catatan: Pastikan field hadir, izin, dll ada di data API siswa atau sesuaikan */}
                      <td className="text-center">{item.hadir || 0}</td>
                      <td className="text-center">{item.izin || 0}</td>
                      <td className="text-center">{item.sakit || 0}</td>
                      <td className="text-center">{item.alfa || 0}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="8" className="text-center">Data tidak ditemukan</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekapAbsensi;