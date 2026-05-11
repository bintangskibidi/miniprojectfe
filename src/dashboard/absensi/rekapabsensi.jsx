import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../utils/api";

const RekapAbsensi = () => {
  const [listKelas, setListKelas] = useState([]);
  const [allPresensi, setAllPresensi] = useState([]);
  const [search, setSearch] = useState("");
  const [filterKelas, setFilterKelas] = useState("");
  
  const [tanggalAwal, setTanggalAwal] = useState("2026-05-01");
  const [tanggalAkhir, setTanggalAkhir] = useState("2026-05-31");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resKelas, resPresensi] = await Promise.all([
        api.get("/kelas"),
        api.get("/presensi")
      ]);
      setListKelas(resKelas.data.data || []);
      setAllPresensi(resPresensi.data.data || resPresensi.data || []);
    } catch (error) {
      console.error("Gagal load data:", error);
      Swal.fire("Error", "Gagal mengambil data", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

 const getRekapHanyaAbsen = () => {
    // Kita ambil dataSiswa juga untuk referensi kelas yang benar
    // Pastikan kamu sudah fetch data siswa di fetchData()
    
    const filteredByDate = allPresensi.filter((p) => {
      const matchTanggal = p.tanggal >= tanggalAwal && p.tanggal <= tanggalAkhir;
      const matchKelas = filterKelas === "" || (String(p.kelas) === String(filterKelas) || String(p.nama_kelas) === String(filterKelas));
      const matchSearch = search === "" || 
                         p.nama?.toLowerCase().includes(search.toLowerCase()) || 
                         String(p.nis).includes(search);
      
      return matchTanggal && matchKelas && matchSearch;
    });

    const grouped = filteredByDate.reduce((acc, curr) => {
      const nis = curr.nis;
      if (!acc[nis]) {
        // --- CARI DATA KELAS DARI MASTER SISWA ---
        // Kita cari di list dataSiswa (asumsi kamu sudah simpan di state dataSiswa)
        // Kalau tidak ada state dataSiswa, dia bakal tetap pakai data dari presensi
        acc[nis] = {
          nis: curr.nis,
          nama: curr.nama || curr.nama_siswa,
          kelas: curr.nama_kelas || curr.kelas, // Ambil nama_kelas dulu baru kelas
          hadir: 0,
          izin: 0,
          sakit: 0,
          alfa: 0
        };
      }
      const ket = curr.keterangan;
      if (ket === "Hadir" || ket === "Pulang") acc[nis].hadir++;
      else if (ket === "Ijin") acc[nis].izin++;
      else if (ket === "Sakit") acc[nis].sakit++;
      else if (ket === "Alfa") acc[nis].alfa++;

      return acc;
    }, {});

    return Object.values(grouped);
  };

  const dataTampil = getRekapHanyaAbsen();

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "#f4f7fe" }}>
      {/* Konten Utama */}
      <div className="flex-grow-1">
        {/* Navbar Atas / Header */}
        <div className="bg-white px-4 py-3 shadow-sm d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold m-0 text-dark">REKAP SISWA YANG ABSEN</h5>
          <div className="d-flex align-items-center gap-3">
             <span className="small text-muted">Admin / Absensi / Rekap</span>
          </div>
        </div>

        <div className="px-4">
          {/* FILTER BOX */}
          <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <div className="row g-3 align-items-end">
                <div className="col-md-3">
                  <label className="form-label small fw-bold text-muted text-uppercase">Kelas</label>
                  <select className="form-select border-0 bg-light" value={filterKelas} onChange={(e) => setFilterKelas(e.target.value)}>
                    <option value="">-- Semua Kelas --</option>
                    {listKelas.map((k) => (
                      <option key={k.id} value={k.nama_kelas || k.namaKelas}>{k.nama_kelas || k.namaKelas}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-bold text-muted text-uppercase">Dari</label>
                  <input type="date" className="form-control border-0 bg-light" value={tanggalAwal} onChange={(e) => setTanggalAwal(e.target.value)} />
                </div>
                <div className="col-md-3">
                  <label className="form-label small fw-bold text-muted text-uppercase">Sampai</label>
                  <input type="date" className="form-control border-0 bg-light" value={tanggalAkhir} onChange={(e) => setTanggalAkhir(e.target.value)} />
                </div>
                <div className="col-md-3">
                  <button className="btn btn-primary w-100 fw-bold shadow-sm py-2" onClick={fetchData}>
                    Refresh Data
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* TABLE BOX */}
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="card-body p-0">
              <div className="p-4 border-bottom">
                <div className="position-relative" style={{ maxWidth: "350px" }}>
                  <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                  <input 
                    type="text" 
                    className="form-control ps-5 border-0 bg-light rounded-3" 
                    placeholder="Cari Nama atau NIS..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>



<div className="table-responsive">
  {/* Menambahkan class 'table-bordered' untuk garis di semua sisi sel */}
  <table className="table table-bordered table-hover align-middle m-0">
    <thead className="bg-light">
      <tr className="text-muted small text-uppercase fw-bold text-center">
        <th className="px-4 py-3" style={{ borderBottomWidth: '2px' }}>No</th>
        <th className="py-3" style={{ borderBottomWidth: '2px' }}>NIS</th>
        <th className="py-3" style={{ borderBottomWidth: '2px' }}>Nama</th>
        <th className="py-3" style={{ borderBottomWidth: '2px' }}>Kelas</th>
        <th className="py-3 text-success" style={{ borderBottomWidth: '2px' }}>Hadir</th>
        <th className="py-3 text-warning" style={{ borderBottomWidth: '2px' }}>Izin</th>
        <th className="py-3 text-info" style={{ borderBottomWidth: '2px' }}>Sakit</th>
        <th className="py-3 text-danger" style={{ borderBottomWidth: '2px' }}>Alfa</th>
        <th className="px-4 py-3" style={{ borderBottomWidth: '2px' }}>Total Hari</th>
      </tr>
    </thead>
    <tbody className="small">
      {loading ? (
        <tr><td colSpan="9" className="text-center py-5">Memuat data...</td></tr>
      ) : dataTampil.length > 0 ? (
        dataTampil.map((item, index) => (
          <tr key={index} className="text-center">
            <td className="px-4 py-3">{index + 1}</td>
            <td className="py-3">{item.nis}</td>
            {/* Nama dibuat rata kiri (text-start) agar lebih rapi */}
            <td className="py-3 fw-bold text-start ps-3">{item.nama}</td>
            <td className="py-3">{item.kelas}</td>
            <td className="py-3">{item.hadir}</td>
            <td className="py-3">{item.izin}</td>
            <td className="py-3">{item.sakit}</td>
            <td className="py-3">{item.alfa}</td>
            <td className="px-4 py-3 fw-bold">
              <span className="badge bg-primary rounded-pill px-3">
                {item.hadir + item.izin + item.sakit + item.alfa}
              </span>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="9" className="text-center py-5 text-muted">
            <i className="bi bi-inbox fs-2 d-block mb-2"></i>
            Tidak ada data absensi ditemukan.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RekapAbsensi;