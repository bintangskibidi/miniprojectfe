import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function Presensi() {

  const [nisInput, setNisInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [todayPresensi, setTodayPresensi] = useState(null);

  const navigate = useNavigate();
  const nisRef = useRef(null);

  const kategoriIjinList = [
    { KategoriIjin: "Ijin" },
    { KategoriIjin: "Sakit" },
    { KategoriIjin: "Alfa" },
  ];

  // ======================================================
  // WIB TIME
  // ======================================================
  const nowWIB = () => {
    const d = new Date();

    return {
      time: d.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Jakarta",
        hour12: false,
      }),

      date: d.toLocaleDateString("en-CA", {
        timeZone: "Asia/Jakarta",
      }),
    };
  };

  // ======================================================
  // AUTO FOCUS
  // ======================================================
  useEffect(() => {
    setTimeout(() => {
      nisRef.current?.focus();
    }, 300);
  }, []);

  // ======================================================
  // FETCH USER
  // ======================================================
  const fetchUserBynis = async (nis) => {

    if (!nis) return;

    setLoading(true);

    try {

      const siswaRes = await api.get("/siswa");

      const allSiswa = siswaRes.data.data || siswaRes.data;

      const user = allSiswa.find(
        (u) => String(u.nis) === String(nis)
      );

      if (!user) {

        Swal.fire(
          "Gagal",
          "Kartu NIS tidak terdaftar",
          "error"
        );

        setNisInput("");

        return;
      }

      setUserData(user);

      // ==========================
      // AMBIL PRESENSI HARI INI
      // ==========================
      const { date } = nowWIB();

      const presensiRes = await api.get("/presensi");

      const allPresensi =
        presensiRes.data.data || presensiRes.data;

      const presensiHariIni = allPresensi.find(
        (p) =>
          String(p.nis) === String(user.nis)
          &&
          p.tanggal === date
      );

      setTodayPresensi(presensiHariIni || null);

    } catch (error) {

      Swal.fire(
        "Error",
        "Gagal mengambil data",
        "error"
      );

    } finally {

      setLoading(false);

    }
  };

  // ======================================================
  // STATUS VALIDATION
  // ======================================================
  const isSudahMasuk =
    todayPresensi &&
    (
      todayPresensi.jam_masuk ||
      todayPresensi.jamMasuk
    ) &&
    (
      todayPresensi.jam_masuk ||
      todayPresensi.jamMasuk
    ) !== "-";

  const isSudahPulang =
    todayPresensi &&
    (
      todayPresensi.keterangan === "Pulang"
      ||
      (
        todayPresensi.jam_pulang &&
        todayPresensi.jam_pulang !== "-"
      )
    );

  const isSudahIjin =
    todayPresensi &&
    ["Ijin", "Sakit", "Alfa"].includes(
      todayPresensi.keterangan
    );

  // ======================================================
  // ABSEN ACTION
  // ======================================================
  const handleAbsenAction = async (type) => {

    if (!userData) return;

    const { time, date } = nowWIB();

    const hour = parseInt(
      time.split(":")[0]
    );

    // ==================================================
    // JIKA SUDAH PULANG
    // ==================================================
    if (isSudahPulang) {

      return Swal.fire(
        "Ditolak",
        "Anda sudah absen pulang, silahkan kembali besok",
        "warning"
      );
    }

    // ==================================================
    // JIKA SUDAH IJIN
    // ==================================================
    if (isSudahIjin) {

      return Swal.fire(
        "Ditolak",
        `Anda sudah berstatus ${todayPresensi.keterangan}, silahkan kembali besok`,
        "warning"
      );
    }

    // ==================================================
    // BATAS JAM OPERASIONAL
    // ==================================================
    if (hour < 6) {

      return Swal.fire(
        "Peringatan",
        "Presensi dibuka jam 06:00",
        "warning"
      );
    }

    // ==================================================
    // DATA DASAR
    // ==================================================
    const postData = {
      id_siswa: userData.id,
      nama: userData.nama,
      nis: userData.nis,
      kelas: userData.kelas || userData.namaKelas,
      tanggal: date,
    };

    try {

      // ==================================================
      // ABSEN MASUK
      // ==================================================
      if (type === "MASUK") {

        if (isSudahMasuk) {

          return Swal.fire(
            "Ditolak",
            "Anda sudah absen masuk hari ini",
            "warning"
          );
        }

        const payload = {
          ...postData,
          jamMasuk: time,
          jamPulang: "-",
          statusMasuk:
            hour >= 7
              ? "Terlambat"
              : "Tepat Waktu",
          keterangan: "Hadir",
        };

        const response = await api.post(
          "/presensi",
          payload
        );

        setTodayPresensi(
          response.data.data
        );

        Swal.fire(
          "Berhasil",
          "Absen masuk berhasil",
          "success"
        );
      }

      // ==================================================
      // ABSEN PULANG
      // ==================================================
      else if (type === "PULANG") {

        // minimal jam 10
        if (hour < 10) {

          return Swal.fire(
            "Ditolak",
            "Belum waktunya pulang (Minimal Jam 10)",
            "warning"
          );
        }

        // harus sudah masuk
        if (!isSudahMasuk) {

          return Swal.fire(
            "Ditolak",
            "Anda belum absen masuk",
            "warning"
          );
        }

        const updateData = {
          jamPulang: time,
        };

        const response = await api.put(
          `/presensi/${todayPresensi.id}`,
          updateData
        );

        setTodayPresensi({
          ...todayPresensi,
          jam_pulang: time,
          keterangan: "Pulang",
        });

        Swal.fire(
          "Berhasil",
          "Absen pulang berhasil",
          "success"
        );
      }

    } catch (error) {

      Swal.fire(
        "Gagal",
        error?.response?.data?.message ||
        "Terjadi kesalahan",
        "error"
      );
    }
  };

  // ======================================================
  // HANDLE IJIN
  // ======================================================
  const handleIjin = async () => {

    if (!userData) return;

    // ==========================================
    // SUDAH PULANG
    // ==========================================
    if (isSudahPulang) {

      return Swal.fire(
        "Ditolak",
        "Anda sudah absen pulang",
        "warning"
      );
    }

    // ==========================================
    // SUDAH IJIN
    // ==========================================
    if (isSudahIjin) {

      return Swal.fire(
        "Ditolak",
        `Anda sudah berstatus ${todayPresensi.keterangan}`,
        "warning"
      );
    }

    // ==========================================
    // FORM INPUT
    // ==========================================
    const { value: form } = await Swal.fire({

      title: "Form Ijin",

      html: `
        <select id="alasan" class="swal2-select">
          ${kategoriIjinList.map(
            (i) =>
              `<option value="${i.KategoriIjin}">
                ${i.KategoriIjin}
              </option>`
          ).join("")}
        </select>

        <textarea
          id="keterangan"
          class="swal2-textarea"
          placeholder="Masukkan alasan..."
        ></textarea>
      `,

      showCancelButton: true,

      confirmButtonText: "Simpan",

      preConfirm: () => {

        return {
          alasan:
            document.getElementById("alasan").value,

          ket:
            document.getElementById("keterangan").value,
        };
      },
    });

    if (!form) return;

    const { date } = nowWIB();

    try {

      const payload = {

        id_siswa: userData.id,

        nama: userData.nama,

        nis: userData.nis,

        kelas:
          userData.kelas ||
          userData.namaKelas,

        tanggal: date,

        jamMasuk: "-",

        jamPulang: "-",

        statusMasuk: "-",

        keterangan: form.alasan,

        detailIjin: form.ket,
      };

      const response = await api.post(
        "/presensi",
        payload
      );

      setTodayPresensi(
        response.data.data
      );

      Swal.fire(
        "Berhasil",
        `${form.alasan} berhasil disimpan`,
        "success"
      );

    } catch (error) {

      Swal.fire(
        "Gagal",
        error?.response?.data?.message ||
        "Gagal menyimpan data",
        "error"
      );
    }
  };

  // ======================================================
  // RESET
  // ======================================================
  const resetForm = () => {

    setUserData(null);

    setNisInput("");

    setTodayPresensi(null);

    setTimeout(() => {
      nisRef.current?.focus();
    }, 300);
  };

  // ======================================================
  // BUTTON DISABLED
  // ======================================================
  const disableMasuk =
    isSudahMasuk ||
    isSudahPulang ||
    isSudahIjin;

  const disablePulang =
    !isSudahMasuk ||
    isSudahPulang ||
    isSudahIjin;

  const disableIjin =
    isSudahPulang ||
    isSudahIjin;

  // ======================================================
  // UI
  // ======================================================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg text-center relative"
      >

        <button
          onClick={() => navigate(-1)}
          className="absolute left-5 top-5 btn btn-sm btn-outline-secondary"
        >
          ← Kembali
        </button>

        <h3 className="fw-bold text-primary mb-4">
          Presensi Digital
        </h3>

        {/* CARD USER */}
        <div
          className={`p-4 rounded-xl mb-4 transition-all ${
            userData
              ? "bg-blue-50 border border-blue-200"
              : "bg-gray-50"
          }`}
        >

          <img
            src={`https://ui-avatars.com/api/?name=${
              userData?.nama || "User"
            }&background=0D6EFD&color=fff&size=128`}
            className="w-24 h-24 rounded-full mx-auto mb-3 shadow-sm"
            alt="pfp"
          />

          {userData ? (

            <div>

              <h5 className="fw-bold mb-0">
                {userData.nama}
              </h5>

              <p className="text-muted small mb-0">
                {userData.nis} | {userData.kelas || userData.namaKelas}
              </p>

              {todayPresensi && (

                <div className="mt-3">

                  <span
                    className={`badge ${
                      todayPresensi.keterangan === "Pulang"
                        ? "bg-primary"
                        : todayPresensi.keterangan === "Hadir"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    Status Hari Ini :
                    {" "}
                    {todayPresensi.keterangan}
                  </span>

                </div>
              )}

            </div>

          ) : (

            <p className="text-muted italic">
              Silahkan Scan Kartu NIS Anda
            </p>

          )}
        </div>

        {/* INPUT */}
        <input
          ref={nisRef}
          type="text"
          value={nisInput}
          onChange={(e) =>
            setNisInput(e.target.value)
          }
          onKeyDown={(e) =>
            e.key === "Enter" &&
            fetchUserBynis(nisInput)
          }
          placeholder="Tap kartu pada reader..."
          className="form-control form-control-lg text-center border-2 mb-4"
        />

        {loading && (
          <div className="spinner-border text-primary mb-3"></div>
        )}

        {/* BUTTON */}
        {userData && (

          <div className="row g-2">

            <div className="col-6">

              <button
                disabled={disableMasuk}
                onClick={() =>
                  handleAbsenAction("MASUK")
                }
                className="btn btn-success w-100 py-3 fw-bold"
              >
                ABSEN MASUK
              </button>

            </div>

            <div className="col-6">

              <button
                disabled={disablePulang}
                onClick={() =>
                  handleAbsenAction("PULANG")
                }
                className="btn btn-primary w-100 py-3 fw-bold"
              >
                ABSEN PULANG
              </button>

            </div>

            <div className="col-12 mt-2">

              <button
                disabled={disableIjin}
                onClick={handleIjin}
                className="btn btn-warning w-100 py-2 fw-bold text-dark"
              >
                IJIN / SAKIT / ALFA
              </button>

            </div>

            <div className="col-12">

              <button
                onClick={resetForm}
                className="btn btn-outline-danger w-100"
              >
                RESET
              </button>

            </div>

          </div>
        )}

      </motion.div>
    </div>
  );
}

export default Presensi;