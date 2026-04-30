import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../utils/api";


const KenaikanKelas = () => {
  const [tahun, setTahun] = useState("");
  const [kelas, setKelas] = useState("");
  const [tahunTujuan, setTahunTujuan] = useState("");
  const [kelasTujuan, setKelasTujuan] = useState("");

  const [dataTahunAjaran, setDataTahunAjaran] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);

  const [siswa, setSiswa] = useState([]);
  const [selected, setSelected] = useState([]);
  const [kelasBaru, setKelasBaru] = useState([]);

  // ================= FETCH DATA =================
  useEffect(() => {
    fetchTahunAjaran();
    fetchKelas();
  }, []);

  const fetchTahunAjaran = async () => {
    try {
      const res = await api.get("/tahun-ajaran");
      setDataTahunAjaran(res.data.data || []);
    } catch (error) {
      console.error("Gagal fetch tahun ajaran:", error);
    }
  };

  const fetchKelas = async () => {
    try {
      const res = await api.get("/kelas");
      setDataKelas(res.data.data || []);
    } catch (error) {
      console.error("Gagal fetch kelas:", error);
    }
  };

const handleTampilkan = async () => {
  if (!tahun || !kelas) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Pilih tahun ajaran dan kelas dulu!",
    });
    return;
  }

  try {
    const res = await api.get("/siswa");
    const allSiswa = res.data.data || [];

    // Debug: lihat struktur data siswa (3 data pertama)
    console.log("=== DEBUG: Data Siswa (3 data pertama) ===");
    allSiswa.slice(0, 3).forEach((s, i) => {
      console.log(`Siswa ${i + 1}:`, {
        id: s.id,
        nama: s.nama,
        kelas: s.kelas,
        tahun_ajaran: s.tahun_ajaran
      });
    });

    // Cari data kelas dan tahun dari dropdown yang dipilih
    const objekKelas = dataKelas.find(k => String(k.id) === String(kelas));
    const objekTahun = dataTahunAjaran.find(t => String(t.id) === String(tahun));

    // Handle: kelas di database siswa bisa "10", "XI", "X IPA 1", dll
    // Kita cocokkan berdasarkan ANGKA kelas (10, 11, 12) dari nama kelas
    const kelasAngka = objekKelas ? String(objekKelas.nama_kelas).replace(/[^0-9]/g, "") : "";
    const namaKelasDicari = objekKelas ? objekKelas.nama_kelas : "";
    const namaTahunDicari = objekTahun ? objekTahun.tahun_ajaran : "";

    // Debug: lihat apa yang dipilih
    console.log("=== DEBUG: Filter yang dipilih ===");
    console.log("Kelas ID:", kelas, "-> Nama:", namaKelasDicari, "-> Angka:", kelasAngka);
    console.log("Tahun ID:", tahun, "-> Nama:", namaTahunDicari);
    console.log("NOTE: karena tahun_ajaran undefined di database, filter hanya berdasarkan KELAS");

    // Filter - hanya berdasarkan KELAS karena tahun_ajaran tidak ada di database
    const hasilFilter = allSiswa.filter((s) => {
      // Normalisasi data kelas dari siswa
      const kSiswa = s.kelas ? String(s.kelas).trim() : "";
      
      // Ambil angka dari kelas siswa juga
      const kSiswaAngka = kSiswa.replace(/[^0-9]/g, "");

      // Cocokkan: bisa berdasarkan angka (10 vs 10) ATAU nama lengkap
      const match = kelasAngka === kSiswaAngka || kSiswa.toLowerCase() === namaKelasDicari.toLowerCase();

      // Debug jika tidak cocok
      if (!match && s.nama) {
        console.log(`Tidak cocok: ${s.nama} | kelas: "${kSiswa}" (${kSiswaAngka}) vs "${kelasAngka}"`);
      }

      return match;
    });

    console.log("=== Hasil Filter ===");
    console.log("Ditemukan:", hasilFilter.length, "siswa");

    // Update state
    setSiswa(hasilFilter);

    if (hasilFilter.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Data Kosong",
        text: `Siswa tidak ditemukan untuk kelas ${namaKelasDicari}. Cek console untuk detail.`,
      });
    }
  } catch (error) {
    console.error("Gagal ambil siswa:", error);
    Swal.fire("Error", "Gagal mengambil data dari server", "error");
  }
};

  const handleCheck = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleTambah = () => {
    if (selected.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Pilih siswa dulu!",
      });
      return;
    }

    const dataTerpilih = siswa.filter((s) => selected.includes(s.id));
    setKelasBaru([...kelasBaru, ...dataTerpilih]);
    setSelected([]);

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Siswa berhasil ditambahkan ke kelas baru",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleHapus = (id) => {
    Swal.fire({
      title: "Yakin mau hapus?",
      text: "Data siswa akan dihapus dari kelas baru",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setKelasBaru(kelasBaru.filter((s) => s.id !== id));

        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Siswa berhasil dihapus",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleProses = () => {
    if (!tahunTujuan || !kelasTujuan) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Pilih tahun tujuan dan kelas baru!",
      });
      return;
    }

    if (kelasBaru.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Belum ada siswa!",
      });
      return;
    }

    // Find class name
    const kelasNama = dataKelas.find(k => k.id === parseInt(kelasTujuan))?.nama_kelas || kelasTujuan;
    const tahunNama = dataTahunAjaran.find(t => t.id === parseInt(tahunTujuan))?.tahun_ajaran || tahunTujuan;

    // Proses kenaikan kelas (langsung update ke API)
    const processKenaikan = async () => {
      try {
        // Update setiap siswa satu per satu
        for (const sis of kelasBaru) {
          await api.put(`/siswa/${sis.id}`, {
            kelas: kelasNama,
            tahun_ajaran: tahunNama
          });
        }

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: `Kenaikan kelas berhasil diproses untuk ${kelasBaru.length} siswa`,
          timer: 1500,
          showConfirmButton: false,
        });

        // Reset state
        setSiswa([]);
        setKelasBaru([]);
        setSelected([]);
        setKelasTujuan("");
        setTahunTujuan("");
      } catch (error) {
        console.error("Gagal proses kenaikan:", error);
        Swal.fire("Error", "Gagal memproses kenaikan kelas", "error");
      }
    };

    Swal.fire({
      title: "Konfirmasi Kenaikan",
      html: `
        <p>Yakin ingin memproses kenaikan kelas untuk <b>${kelasBaru.length} siswa</b>?</p>
        <ul style="text-align:left">
          <li>Tahun Baru: <b>${tahunNama}</b></li>
          <li>Kelas Baru: <b>${kelasNama}</b></li>
        </ul>
        <p style="color:red;">Proses ini tidak dapat dibatalkan!</p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Proses",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        processKenaikan();
      }
    });
  };

  return (
    <div className="p-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <h2 className="fw-bold mb-4">⬆️ Kenaikan Kelas</h2>

      <div className="grid md:grid-cols-2 gap-4">
        {/* KIRI - KELAS ASAL */}
        <div className="bg-white border rounded shadow-sm" style={{ borderRadius: "10px" }}>
          <div className="bg-blue-500 text-white p-3 text-center font-semibold rounded-t" style={{ borderRadius: "10px 10px 0 0" }}>
            Kelas Asal
          </div>

          <div className="p-4 space-y-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label small fw-bold">Tahun Ajaran</label>
                <select
                  value={tahun}
                  onChange={(e) => setTahun(e.target.value)}
                  className="form-control"
                >
                  <option value="">Pilih Tahun Ajaran</option>
                  {dataTahunAjaran.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.tahun_ajaran}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label small fw-bold">Kelas</label>
                <select
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="form-control"
                >
                  <option value="">Pilih Kelas</option>
                  {dataKelas.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama_kelas}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleTampilkan}
              disabled={!tahun || !kelas}
              className={`btn w-100 ${!tahun || !kelas ? "btn-secondary" : "btn-primary"}`}
            >
              🔍 Tampilkan Siswa
            </button>

            {siswa.length > 0 && (
              <div className="mt-4">
                <div className="table-responsive">
                  <table className="table table-bordered table-hover small">
                    <thead className="table-light">
                      <tr>
                        <th width="50"></th>
                        <th>Nama</th>
                        <th width="100">NIS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {siswa.map((s) => (
                        <tr key={s.id}>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              checked={selected.includes(s.id)}
                              onChange={() => handleCheck(s.id)}
                            />
                          </td>
                          <td>{s.nama}</td>
                          <td className="text-center">{s.nis}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  onClick={handleTambah}
                  className="btn btn-primary w-100 mt-2"
                >
                  ➕ Tambahkan ke Kelas Baru
                </button>
              </div>
            )}
          </div>
        </div>

        {/* KANAN - KELAS BARU */}
        <div className="bg-white border rounded shadow-sm" style={{ borderRadius: "10px" }}>
          <div className="bg-success text-white p-3 text-center font-semibold rounded-t" style={{ borderRadius: "10px 10px 0 0" }}>
            Kelas Baru
          </div>

          <div className="p-4 space-y-4">
            {/* Form Tujuan - Hanya muncul jika ada siswa */}
            {kelasBaru.length > 0 && (
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold">Tahun Tujuan</label>
                  <select
                    value={tahunTujuan}
                    onChange={(e) => setTahunTujuan(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Pilih Tahun Tujuan</option>
                    {dataTahunAjaran.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.tahun_ajaran}
                      </option>
                    ))}
                  </select>
                </div>

<div className="col-md-6">
                  <label className="form-label small fw-bold">Kelas Baru</label>
                  <select
                    value={kelasTujuan}
                    onChange={(e) => setKelasTujuan(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Pilih Kelas Baru</option>
                    {dataKelas.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama_kelas}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {kelasBaru.length === 0 ? (
              <div className="alert alert-info text-center py-5">
                <i className="bi bi-info-circle fs-4 d-block mb-2"></i>
                Pilih siswa dari Kelas Asal dan tambahkan ke sini
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-bordered table-hover small">
                    <thead className="table-light">
                      <tr>
                        <th>Nama</th>
                        <th width="100">NIS</th>
                        <th width="80">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {kelasBaru.map((s) => (
                        <tr key={s.id}>
                          <td>{s.nama}</td>
                          <td className="text-center">{s.nis}</td>
                          <td className="text-center">
                            <button
                              onClick={() => handleHapus(s.id)}
                              className="btn btn-sm btn-danger"
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <button
                  onClick={handleProses}
                  className="btn btn-success w-100 mt-2"
                >
                  ✔ Proses Knaikan Kelas
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KenaikanKelas;
