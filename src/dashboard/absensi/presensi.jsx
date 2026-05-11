import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function Presensi() {
  const [nisInput, SetNisInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [todayPresensi, setTodayPresensi] = useState(null);

  const kategoriIjinList = [
    { KategoriIjin: "Ijin" },
    { KategoriIjin: "Sakit" },
    { KategoriIjin: "Alfa" },
  ];

  const nisRef = useRef(null);
  const navigate = useNavigate();

  const nowWIB = () => {
    const d = new Date();
    return {
      time: d.toLocaleTimeString("en-GB", { timeZone: "Asia/Jakarta", hour12: false }),
      date: d.toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" }),
    };
  };

  useEffect(() => {
    setTimeout(() => nisRef.current?.focus(), 300);
  }, []);

  const fetchUserBynis = async (nis) => {
    if (!nis) return;
    setLoading(true);
    try {
      const siswaRes = await api.get("/siswa");
      const allSiswa = siswaRes.data.data || siswaRes.data;
      const user = allSiswa.find((u) => String(u.nis) === String(nis));

      if (!user) {
        Swal.fire("Gagal", "Kartu NIS tidak terdaftar!", "error");
        SetNisInput("");
        return;
      }

      setUserData(user);
      const { date } = nowWIB();
      const presensiRes = await api.get("/presensi");
      const allPresensi = presensiRes.data.data || presensiRes.data;

      const presensiHariIni = allPresensi.find(
        (p) => String(p.nis) === String(user.nis) && p.tanggal === date
      );

      setTodayPresensi(presensiHariIni || null);
    } catch (error) {
      Swal.fire("Error", "Gagal mengambil data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleAbsenAction = async (type) => {
    if (!userData) return;
    const { time, date } = nowWIB();
    const hour = parseInt(time.split(":")[0]);

    // Pengecekan Status
    const isSudahPulang = todayPresensi && (todayPresensi.keterangan === "Pulang" || (todayPresensi.jamPulang && todayPresensi.jamPulang !== "-"));
    const isSudahIjin = todayPresensi && ["Ijin", "Sakit", "Alfa"].includes(todayPresensi.keterangan);

    // 1. Jika sudah pulang, kunci semua aksi
    if (isSudahPulang) {
      return Swal.fire("Ditolak", "Anda sudah absen pulang, silahkan kembali besok", "warning");
    }

    // 2. Jika sudah ijin/sakit/alfa, kunci semua aksi
    if (isSudahIjin) {
      return Swal.fire("Ditolak", `Anda sudah berstatus ${todayPresensi.keterangan}, silahkan kembali besok`, "warning");
    }

    // 3. Validasi Jam Buka Operasional
    if (hour < 6) {
      return Swal.fire("Peringatan", "Presensi dibuka jam 06:00", "warning");
    }

    let postData = {
      id_siswa: userData.id,
      nama: userData.nama || userData.namaSiswa,
      nis: userData.nis || userData.nisn,
      kelas: userData.kelas || userData.namaKelas,
      tanggal: date,
    };

    try {
      // --- LOGIKA ABSEN MASUK ---
      if (type === "MASUK") {
        const jamMasukField = todayPresensi?.jamMasuk || todayPresensi?.jam_masuk;
        if (todayPresensi && jamMasukField && jamMasukField !== "-") {
          return Swal.fire("Ditolak", "Anda sudah absen masuk hari ini", "warning");
        }

        const masukPayload = {
          ...postData,
          jamMasuk: time,
          jamPulang: "-",
          statusMasuk: hour >= 7 ? "Terlambat" : "Tepat Waktu",
          keterangan: "Hadir",
        };

        const response = await api.post("/presensi", masukPayload);
        setTodayPresensi(response.data.data || response.data);
        Swal.fire("Berhasil", "Absen masuk berhasil", "success");
      } 
      
      // --- LOGIKA ABSEN PULANG ---
      else if (type === "PULANG") {
        if (hour < 10) {
          return Swal.fire("Ditolak", "Belum waktunya pulang (Min. Jam 10)", "warning");
        }

        const jamMasukField = todayPresensi?.jamMasuk || todayPresensi?.jam_masuk;
        if (!todayPresensi || !jamMasukField || jamMasukField === "-") {
          return Swal.fire("Ditolak", "Anda belum absen masuk", "warning");
        }

        const updateData = {
          ...todayPresensi,
          jamPulang: time,
          keterangan: "Pulang",
        };

        await api.put(`/presensi/${todayPresensi.id}`, updateData);
        setTodayPresensi(updateData);
        Swal.fire("Berhasil", "Absen pulang berhasil. Hati-hati di jalan!", "success");
      }

      resetForm();
    } catch (error) {
      Swal.fire("Gagal", "Terjadi kesalahan koneksi", "error");
    }
  };

  const handleIjin = async () => {
    if (!userData) return;

    // Pengecekan Status Sebelum Membuka Modal
    const isSudahPulang = todayPresensi && (todayPresensi.keterangan === "Pulang" || (todayPresensi.jamPulang && todayPresensi.jamPulang !== "-"));
    const isSudahIjin = todayPresensi && ["Ijin", "Sakit", "Alfa"].includes(todayPresensi.keterangan);
    const isSudahMasuk = todayPresensi && (todayPresensi.jamMasuk || todayPresensi.jam_masuk) && (todayPresensi.jamMasuk || todayPresensi.jam_masuk) !== "-";

    if (isSudahPulang) {
      return Swal.fire("Ditolak", "Anda sudah absen pulang, silahkan kembali besok", "warning");
    }

    if (isSudahIjin) {
      return Swal.fire("Ditolak", `Anda sudah berstatus ${todayPresensi.keterangan}, silahkan kembali besok`, "warning");
    }

    if (isSudahMasuk) {
        return Swal.fire("Ditolak", "Anda sudah absen masuk, tidak bisa mengajukan ijin", "warning");
    }

    const { value: form } = await Swal.fire({
      title: "Masukan Alasan",
      html: `
        <select id="alasan" class="swal2-select">
          ${kategoriIjinList.map(i => `<option value="${i.KategoriIjin}">${i.KategoriIjin}</option>`).join("")}
        </select>
        <textarea id="keterangan" class="swal2-textarea" placeholder="Masukkan keterangan..."></textarea>
      `,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      preConfirm: () => ({
        alasan: document.getElementById("alasan").value,
        ket: document.getElementById("keterangan").value,
      }),
    });

    if (!form) return;
    const { date } = nowWIB();

    try {
      const postData = {
        id_siswa: userData.id,
        nama: userData.nama || userData.namaSiswa,
        nis: userData.nis || userData.nisn,
        kelas: userData.kelas || userData.namaKelas,
        tanggal: date,
        jamMasuk: "-",
        jamPulang: "-",
        statusMasuk: "-",
        keterangan: form.alasan,
        detailIjin: form.ket,
      };

      await api.post("/presensi", postData);
      setTodayPresensi(postData);
      Swal.fire("Berhasil", `Data ${form.alasan} tersimpan`, "success");
      resetForm();
    } catch (error) {
      Swal.fire("Gagal", "Gagal menyimpan data", "error");
    }
  };

  const resetForm = () => {
    setUserData(null);
    SetNisInput("");
    setTodayPresensi(null);
    setTimeout(() => nisRef.current?.focus(), 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg text-center relative"
      >
        <button onClick={() => navigate(-1)} className="absolute left-5 top-5 btn btn-sm btn-outline-secondary">
          ← Kembali
        </button>

        <h3 className="fw-bold text-primary mb-4">Presensi Digital</h3>

        <div className={`p-4 rounded-xl mb-4 transition-all ${userData ? "bg-blue-50 border border-blue-200" : "bg-gray-50"}`}>
          <img
            src={`https://ui-avatars.com/api/?name=${userData?.nama || "User"}&background=0D6EFD&color=fff&size=128`}
            className="w-24 h-24 rounded-full mx-auto mb-3 shadow-sm"
            alt="pfp"
          />

          {userData ? (
            <div className="text-center">
              <h5 className="fw-bold mb-0">{userData.nama || userData.namaSiswa}</h5>
              <p className="text-muted small mb-0">{userData.nis || userData.nisn} | {userData.kelas || userData.namaKelas}</p>
              {todayPresensi && (
                <div className="mt-2">
                  <span className={`badge ${todayPresensi.keterangan === 'Pulang' ? 'bg-primary' : 'bg-info'}`}>
                    Status Hari Ini : {todayPresensi.keterangan}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted italic">Silahkan Scan Kartu NIS Anda</p>
          )}
        </div>

        <input
          ref={nisRef}
          type="text"
          value={nisInput}
          onChange={(e) => SetNisInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchUserBynis(nisInput)}
          placeholder="Tap kartu pada reader..."
          className="form-control form-control-lg text-center border-2 mb-4"
        />

        {loading && <div className="spinner-border text-primary mb-3"></div>}

        {userData && (
          <div className="row g-2">
            <div className="col-6">
              <button onClick={() => handleAbsenAction("MASUK")} className="btn btn-success w-100 py-3 fw-bold">
                ABSEN MASUK
              </button>
            </div>
            <div className="col-6">
              <button onClick={() => handleAbsenAction("PULANG")} className="btn btn-primary w-100 py-3 fw-bold">
                ABSEN PULANG
              </button>
            </div>
            <div className="col-12 mt-2">
              <button onClick={handleIjin} className="btn btn-warning w-100 py-2 fw-bold text-dark">
                IJIN / SAKIT / ALFA
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default Presensi;