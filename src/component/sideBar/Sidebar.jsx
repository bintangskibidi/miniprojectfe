import { useNavigate, useLocation } from "react-router-dom";
import Aduca from "../../assets/Aduca.png";
import {
  FaTachometerAlt,
  FaUserGraduate,
  FaCalendarAlt,
  FaFileAlt,
  FaClipboardCheck,
  FaBook,
  FaCalendarCheck,
  FaClock,
  FaHistory,
  FaMoneyBillWave,
  FaPiggyBank,
  FaArrowDown,
  FaArrowUp,
  FaBookOpen,
  FaChartBar,
  FaUserTie,
  FaClipboardList,
  FaUndo,
  FaCog,
  FaHome,
  FaArrowLeft,
  FaSchool,
  FaBoxes,
  FaTools,
  FaChartLine,
  FaFileInvoice,
  FaEnvelopeOpenText,
  FaFolderOpen,
   FaUsers,
   FaMoneyCheckAlt,
   FaInfoCircle,
   FaImage,

  FaBusinessTime,
  FaUsersCog,
  FaDatabase,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState([]);

  const menuConfig = {
    siswa: [
      {
        group: "Manajemen Siswa",
        items: [
          {
            title: "Dashboard",
            path: "/dashboard/siswa",
            icon: <FaTachometerAlt />,
          },
          {
            title: "Kesiswaan",
            icon: <FaUserGraduate />,
            children: [
              { title: "Data Siswa", path: "/dashboard/datasiswa" },
              { title: "Kenaikan Kelas", path: "/dashboard/kenaikankelas" },
              { title: "Data Kelas", path: "/dashboard/datakelas" },
              { title: "Data Jurusan", path: "/dashboard/datajurusan" },
              { title: "Tahun Ajaran", path: "/dashboard/tahunajaran" },
              { title: "Wali Kelas", path: "/dashboard/walikelas" },
            ],
          },
          {
            title: "Kegiatan",
            icon: <FaCalendarAlt />,
            children: [
              {
                title: "Ekstrakurikuler",
                path: "/dashboard/ekstrakurikuler",
              },
            ],
          },
          {
            title: "E-Raport",
            icon: <FaFileAlt />,
            children: [
              {
                title: "Aspek Penilaian",
                path: "/dashboard/aspekpenilaian",
              },
              {
                title: "Semester",
                path: "/dashboard/Semester",
              },
              {
                title: "Jenis Semester",
                path: "/dashboard/jenissemester",
              },
              {
                title: "Data Raport",
                path: "/dashboard/dataraport",
              },
            ],
          },
          {
            title: "Absensi",
            icon: <FaClipboardCheck />,
            children: [
              {
                title: "Absensi Harian",
                path: "/dashboard/absensiharian",
              },
              {
                title: "Rekap Absensi",
                path: "/dashboard/rekapabsensi",
              },
              {
                title: "Absensi Mapel",
                path: "/dashboard/absensimapel",
              },
            ],
          },
        ],
      },
    ],

    guru: [
      {
        group: "Manajemen Guru",
        items: [
          {
            title: "Dashboard",
            path: "/dashboard/guru",
            icon: <FaTachometerAlt />,
          },
          {
            title: "Mata Pelajaran",
            path: "/dashboard/mapel",
            icon: <FaBook />,
          },
          {
            title: "Jadwal Mengajar",
            path: "/dashboard/JadwalMengajar",
            icon: <FaCalendarCheck />,
          },
          {
            title: "Distribusi Jam",
            path: "/dashboard/distribusijam",
            icon: <FaClock />,
          },
          {
            title: "Riwayat Mengajar",
            path: "/dashboard/RiwayatMengajar",
            icon: <FaHistory />,
          },
        ],
      },
    ],

    keuangan: [
      {
        group: "Manajemen Keuangan",
        items: [
          {
            title: "Dashboard",
            path: "/dashboard/keuangan",
            icon: <FaTachometerAlt />,
          },

          // =========================
          // PEMBAYARAN SISWA
          // =========================
          {
            title: "Pembayaran Siswa",
            icon: <FaMoneyBillWave />,
            children: [
              {
                title: "Bayar Tagihan",
                path: "/dashboard/BayarTagihan",
              },
              {
                title: "Tunggakan Siswa",
                path: "/dashboard/TunggakanSiswa",
              },
              {
                title: "Jenis Pembayaran",
                path: "/dashboard/JenisPembayaran",
              },
              {
                title: "Tarif Pembayaran",
                path: "/dashboard/TarifPembayaranSiswa",
              },
              {
                title: "Rekap Pembayaran Bulanan",
                path: "/dashboard/RekapPembayaran",
              },
              {
                title: "Data Transaksi",
                path: "/dashboard/DataTransaksi",
              },
              {
                title: "Rekap Per Siswa",
                path: "/dashboard/RekapSiswa",
              },
              {
                title: "Presensi",
                path: "/dashboard/presensi",
              },
              {
                title: "Rekap Per Tanggal",
                path: "/dashboard/RekapTanggal",
              },
              {
                title: "Rekap Tagihan",
                path: "/dashboard/RekapTagihan",
              },
              {
                title: "Tagihan Bulan Ini",
                path: "/dashboard/TagihanBulanIni",
              },
            ],
          },

          // =========================
          // TABUNGAN SISWA
          // =========================
          {
            title: "Tabungan Siswa",
            icon: <FaPiggyBank />,
            children: [
              {
                title: "Teller",
                path: "/dashboard/Teller",
              },
              {
                title: "Riwayat Tabungan Siswa",
                path: "/dashboard/RiwayatTabunganSiswa",
              },
              {
                title: "Riwayat Transaksi",
                path: "/dashboard/RiwayatTransaksi",
              },
            ],
          },

          // =========================
          // PENERIMAAN
          // =========================
          {
            title: "Penerimaan",
            icon: <FaArrowDown />,
            children: [
              {
                title: "Transaksi Penerimaan",
                path: "/dashboard/TransaksiPenerimaan",
              },
              {
                title: "Jenis Penerimaan",
                path: "/dashboard/JenisPenerimaan",
              },
              {
                title: "Laporan Penerimaan",
                path: "/dashboard/LaporanPenerimaan",
              },
            ],
          },

          // =========================
          // PENGELUARAN
          // =========================
          {
            title: "Pengeluaran",
            icon: <FaArrowUp />,
            children: [
              {
                title: "Transaksi Pengeluaran",
                path: "/dashboard/TransaksiPengeluaran",
              },
              {
                title: "Jenis Pengeluaran",
                path: "/dashboard/JenisPengeluaran",
              },
              {
                title: "Laporan Pengeluaran",
                path: "/dashboard/TransaksiPengeluaran",
              },
            ],
          },

          // =========================
          // JURNAL
          // =========================
          {
            title: "Jurnal",
            icon: <FaBookOpen />,
            children: [
              {
                title: "Transaksi Jurnal",
                path: "/dashboard/TransaksiJurnal",
              },
              {
                title: "Laporan Jurnal",
                path: "/dashboard/LaporanJurnal",
              },
            ],
          },

          // =========================
          // BUKU BESAR
          // =========================
          {
            title: "Buku Besar",
            icon: <FaBook />,
            children: [
              {
                title: "Laporan Buku Besar",
                path: "/dashboard/LaporanBukuBesar",
              },
              {
                title: "Neraca Saldo",
                path: "/dashboard/NeracaSaldo",
              },
              {
                title: "Jurnal Umum",
                path: "/dashboard/JurnalUmum",
              },
            ],
          },

          // =========================
          // LAPORAN KEUANGAN
          // =========================
          {
            title: "Laporan Keuangan",
            icon: <FaChartBar />,
            children: [
              {
                title: "Penghasilan Komprehensif",
                path: "/dashboard/LaporanKomprehensif",
              },
              {
                title: "Posisi Keuangan",
                path: "/dashboard/PosisiKeuangan",
              },
              {
                title: "Arus Kas",
                path: "/dashboard/ArusKas",
              },
              {
                title: "Perubahan Aset Neto",
                path: "/dashboard/PerubahanAsetNeto",
              },

            ],
          },
        ],
      },

      // =========================
      // MENU APBS
      // =========================
      {
        group: "Menu APBS",
        items: [
          {
            title: "Rencana Anggaran",

            children: [
              {
                title: "Realisasi Penerimaan",
                path: "/dashboard/RealisasiPenerimaan",
              },
              {
                title: "Realisasi Belanja",
                path: "/dashboard/RealisasiBelanja",
              },
              {
                title: "Setting Pagu",
                path: "/dashboard/SettingPagu",
              },
              {
                title: "APBS Induk",
                path: "/dashboard/APBSInduk",
              },
              {
                title: "APBS Detail",
                path: "/dashboard/APBSDetail",
              },

            ],
          },
          {
            title: "Realisasi Anggaran",
            path: "/dashboard/RealisasiAnggaran",
          },
          {
            title: "Evaluasi Anggaran",
            path: "/dashboard/EvaluasiAnggaran",
          },
        ],
      },
    ],
aplikasi: [
  {
    group: "",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard/aplikasi",
        icon: <FaTachometerAlt />,
      },
    ],
  },

  {
    group: "MENU",
    items: [
      {
        title: "Informasi Lembaga",
        path: "/dashboard/aplikasi/InformasiLembaga",
        icon: <FaInfoCircle />,
      },

      {
        title: "Banner Aplikasi",
        path: "/dashboard/aplikasi/BannerAplikasi",
        icon: <FaImage />,
      },

      {
        title: "Setting User",
        path: "/dashboard/aplikasi/SettingUser",
        icon: <FaUsersCog />,
      },

      {
        title: "Backup Data",
        path: "/dashboard/aplikasi/BackupData",
        icon: <FaDatabase />,
      },

      {
        title: "Setting Absensi GPS",
        path: "/dashboard/aplikasi/SettingAbsensiGPS",
        icon: <FaMapMarkedAlt />,
      },
    ],
  },
],

Kepegawaian: [
  // DASHBOARD
  {
    group: "",
    items: [
      {
        title: "Dashboard",
        path: "/dashboard/kepegawaian",
        icon: <FaHome />,
      },
    ],
  },

  // =====================
  // MENU
  // =====================
  {
    group: "MENU",
    items: [
      {
        title: "Data Pegawai",
        path: "/dashboard/DataPegawai",
        icon: <FaUsers />,
      },

      // =====================
      // KINERJA PEGAWAI
      // =====================
      {
        title: "Kinerja Pegawai",
        icon: <FaChartLine />,
        children: [
          {
            title: "Kelola Indikator",
            path: "/dashboard/KelolaIndikator",
            icon: <FaUserTie />,
          },

          {
            title: "Input Nilai Kinerja",
            path: "/dashboard/InputNilaiKinerja",
            icon: <FaUserTie />,
          },

          {
            title: "Rekap Kinerja",
            path: "/dashboard/RekapKinerja",
            icon: <FaUserTie />,
          },
        ],
      },

      // =====================
      // ABSEN KEGIATAN
      // =====================
      {
        title: "Absen Kegiatan",
        icon: <FaCalendarCheck />,
        children: [
          {
            title: "Kegiatan",
            path: "/dashboard/KelolaKegiatan",
            icon: <FaUserTie />,
          },

          {
            title: "Absen Kegiatan",
            path: "/dashboard/AbsenKegiatan",
            icon: <FaUserTie />,
          },

          {
            title: "Riwayat Absen Kegiatan",
            path: "/dashboard/RekapAbsenKegiatan",
            icon: <FaUserTie />,
          },
        ],
      },

      // =====================
      // CUTI / LEMBUR / IZIN
      // =====================
      {
        title: "Manajemen Cuti/Lembur/Izin",
        icon: <FaBusinessTime />,
        children: [
          {
            title: "Cuti",
            path: "/dashboard/Cuti",
            icon: <FaUserTie />,
          },

          {
            title: "Lembur",
            path: "/dashboard/Lembur",
            icon: <FaUserTie />,
          },

          {
            title: "Izin",
            path: "/dashboard/Izin",
            icon: <FaUserTie />,
          },
        ],
      },

      // =====================
      // REKAP ABSENSI
      // =====================
      {
        title: "Rekap Absensi",
        path: "/dashboard/RekapAbsensiHarian",
        icon: <FaClipboardCheck />,
      },

      // =====================
      // PAYROLL
      // =====================
      {
        title: "Payroll",
        icon: <FaMoneyCheckAlt />,
        children: [
          {
            title: "Kelola Gaji",
            path: "/dashboard/SettingGajiPegawai",
            icon: <FaUserTie />,
          },

          {
            title: "Riwayat Gaji",
            path: "/dashboard/RiwayatGaji",
            icon: <FaUserTie />,
          },

          {
            title: "Setting Kehadiran",
            path: "/dashboard/KriteriaKehadiran",
            icon: <FaUserTie />,
          },

          {
            title: "Setting Komponen Gaji",
            path: "/dashboard/SettingKomponenGaji",
            icon: <FaUserTie />,
          },
        ],
      },

      // =====================
      // DANA PENSIUN
      // =====================
      {
        title: "Dana Pensiun",
        path: "/dashboard/DanaPensiunPegawai",
        icon: <FaPiggyBank />,
      },

      // =====================
      // PERIODE
      // =====================
      {
        title: "Periode",
        path: "/dashboard/ManajemenTanggal",
        icon: <FaCalendarAlt />,
      },
    ],
  },

  // =====================
  // PENGATURAN
  // =====================
  {
    group: "Pengaturan",
    items: [
      {
        title: "Informasi Lembaga",
        path: "/dashboard/ManajemenInfo",
        icon: <FaInfoCircle />,
      },

      {
        title: "Banner Aplikasi",
        path: "/dashboard/BannerAplikasi",
        icon: <FaImage />,
      },

      {
        title: "Setting User",
        path: "/dashboard/AturUser",
        icon: <FaUsersCog />,
      },

      {
        title: "Backup Data",
        path: "/dashboard/BackupData",
        icon: <FaDatabase />,
      },

      {
        title: "Setting Absensi GPS",
        path: "/dashboard/SettingAbsensiGPS",
        icon: <FaMapMarkedAlt />,
      },
    ],
  },
],

    perpustakaan: [
      // DASHBOARD
      {
        group: "",
        items: [
          {
            title: "Dashboard",
            icon: <FaHome />,
            path: "/dashboard/perpustakaan",
          },
        ],
      },

      // MANAJEMEN DATA
      {
        group: "Manajemen Data",
        items: [
          {
            title: "Data Buku",
            icon: <FaBook />,
            path: "/dashboard/databuku",
          },
          {
            title: "Peminjaman Buku",
            icon: <FaClipboardList />,

            path: "/dashboard/peminjamanbuku",
          },
          {
            title: "Pengembalian Buku",
            icon: <FaUndo />,
            path: "/dashboard/pengembalianbuku",
          },
          {
            title: "Setting Denda",
            icon: <FaCog />,
            path: "/dashboard/settingdenda",
          },
        ],
      },

      // LAPORAN
      {
        group: "Laporan",
        items: [
          {
            title: "Laporan Buku",
            icon: <FaBookOpen />,
            path: "/dashboard/laporanbuku",
          },
          {
            title: "Laporan Peminjaman",
            icon: <FaFileAlt />,
            path: "/dashboard/laporanpeminjamanbuku",
          },
          {
            title: "Laporan Pengembalian",
            icon: <FaChartBar />,
            path: "/dashboard/laporanpengembalianbuku",
          },
          {
            title: "Laporan Denda",
            icon: <FaMoneyBillWave />,
            path: "/dashboard/laporandenda",
          },
        ],
      },
    ],


   

    sekolah: [
      {
        group: "Manajemen Sekolah",
        items: [
          {
            title: "Data Sekolah",
            icon: <FaSchool />,
            children: [
              { title: "Profile sekolah", path: "/dashboard/profilesekolah", icon: <FaUserTie /> },
            ],
          },
          {
            title: "Inventaris",
            icon: <FaBoxes />,
            children: [
              { title: "Data Aset", path: "/dashboard/DataAset", icon: <FaClipboardList /> },
              { title: "Peminjaman Aset", path: "/dashboard/PeminjamanAset", icon: <FaFileAlt /> },
              { title: "Riwayat Peminjaman", path: "/dashboard/RiwayatPeminjaman", icon: <FaHistory /> },
              { title: "Maintenance Asset", path: "/dashboard/MaintenanceAset", icon: <FaTools /> },
              { title: "Depresiasi Asset", path: "/dashboard/DepresiasiAset", icon: <FaChartLine /> },
              { title: "Laporan Asset", path: "/dashboard/LaporanAset", icon: <FaFileInvoice /> },
                        { title: "Setting Lokasi", path: "/dashboard/settinglokasi", icon: <FaMapMarkedAlt /> },
 
              { title: "Setting Kategori", path: "/dashboard/SettingKategori", icon: <FaFileInvoice /> },
            ],
          },
          {
            title: "Administrasi",
            icon: <FaFileAlt />,
            children: [
              { title: "Surat-Menyurat", path: "/dashboard/SuratMenyurat", icon: <FaEnvelopeOpenText /> },
              { title: "Dokumen Sekolah", path: "/dashboard/DokumenSekolah", icon: <FaFolderOpen /> },
            ],
          },
          {
            title: "Kegiatan",
            icon: <FaCalendarAlt />,
            children: [
              { title: "Kegiatan Sekolah", path: "/dashboard/kegiatansekolah", icon: <FaCalendarAlt /> },
            ],
          },
        ],
      },
       
    ],
    default: [
      {
        group: "Menu Utama",
        items: [
          { title: "Dashboard", path: "/dashboard" },
          { title: "Siswa", path: "/dashboard/siswa" },
          { title: "Guru", path: "/dashboard/guru" },
          { title: "Mapel", path: "/dashboard/mapel" },
          { title: "Keuangan", path: "/dashboard/keuangan" },
          { title: "Perpustakaan", path: "/dashboard/perpustakaan" },
          { title: "Profile Sekolah", path: "/dashboard/profilesekolah" },
          { title: "Setting Lokasi", path: "/dashboard/settinglokasi" },
          { title: "Kelas", path: "/dashboard/datakelas" },
          { title: "Tahun Ajaran", path: "/dashboard/tahunajaran" },
        ],
      },
    ],
  };
  let menu = menuConfig.default;

  if (
    location.pathname.startsWith("/dashboard/siswa") ||
    location.pathname.startsWith("/dashboard/walikelas") ||
    location.pathname.startsWith("/dashboard/kenaikankelas") ||
    location.pathname.startsWith("/dashboard/datajurusan") ||
    location.pathname.startsWith("/dashboard/datasiswa") ||
    location.pathname.startsWith("/dashboard/datakelas") ||
    location.pathname.startsWith("/dashboard/ekstrakurikuler") ||
    location.pathname.startsWith("/dashboard/Semester") ||
    location.pathname.startsWith("/dashboard/jenissemester") ||
    location.pathname.startsWith("/dashboard/absensiharian") ||
    location.pathname.startsWith("/dashboard/rekapabsensi") ||
    location.pathname.startsWith("/dashboard/absensimapel") ||
    location.pathname.startsWith("/dashboard/aspekpenilaian") ||
    location.pathname.startsWith("/dashboard/dataraport") ||
    location.pathname.startsWith("/dashboard/tambah-siswa") ||
    location.pathname.startsWith("/dashboard/tahunajaran")
  ) {
    menu = menuConfig.siswa;
  } else if (
    location.pathname.startsWith("/dashboard/guru") ||
    location.pathname.startsWith("/dashboard/mapel") ||
    location.pathname.startsWith("/dashboard/RiwayatMengajar") ||
    location.pathname.startsWith("/dashboard/JadwalMengajar") ||
    location.pathname.startsWith("/dashboard/distribusijam")
  ) {
    menu = menuConfig.guru;
  } else if (location.pathname.startsWith("/dashboard/keuangan")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/LaporanBukuBesar")) {
    menu = menuConfig.keuangan;

  } else if (location.pathname.startsWith("/dashboard/RekapPembayaran")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/RealisasiPenerimaan")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/RealisasiBelanja")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/APBSInduk")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/APBSDetail")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/SettingPagu")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/JenisPembayaran")) {
    menu = menuConfig.keuangan;

  } else if (location.pathname.startsWith("/dashboard/LaporanJurnal")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/JurnalUmum")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/TunggakanSiswa")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/BayarTagihan")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/TagihanBulanIni")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/RiwayatTransaksi")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/Teller")) {
    menu = menuConfig.keuangan;

  } else if (location.pathname.startsWith("/dashboard/RealisasiAnggaran")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/EvaluasiAnggaran")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/ArusKas")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/PosisiKeuangan")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/LaporanKomprehensif")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/PerubahanAsetNeto")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/NeracaSaldo")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/JenisPenerimaan")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/JenisPengeluaran")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/TransaksiJurnal")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/TransaksiPengeluaran")) {
    menu = menuConfig.keuangan;

  } else if (location.pathname.startsWith("/dashboard/TransaksiPenerimaan")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/RekapSiswa")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/RekapTanggal")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/TarifPembayaranSiswa")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/RekapTagihan")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/RiwayatTabunganSiswa")) {
    menu = menuConfig.keuangan;

  } else if (location.pathname.startsWith("/dashboard/LaporanPenerimaan")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/LaporanPengeluaran")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/LaporanKomprehensif")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/presensi")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/DataTransaksi")) {
    menu = menuConfig.keuangan;



  } else if (
  location.pathname.startsWith("/dashboard/aplikasi")
) {
  menu = menuConfig.aplikasi

// ==========================
// KEPEGAWAIAN
// ==========================
} else if (
  location.pathname.startsWith("/dashboard/kepegawaian") ||
  location.pathname.startsWith("/dashboard/DataPegawai") ||
  location.pathname.startsWith("/dashboard/KelolaIndikator") ||
  location.pathname.startsWith("/dashboard/InputNilaiKinerja") ||
  location.pathname.startsWith("/dashboard/RekapKinerja") ||
  location.pathname.startsWith("/dashboard/KelolaKegiatan") ||
  location.pathname.startsWith("/dashboard/AbsenKegiatan") ||
  location.pathname.startsWith("/dashboard/RekapAbsenKegiatan") ||
  location.pathname.startsWith("/dashboard/Cuti") ||
  location.pathname.startsWith("/dashboard/Lembur") ||
  location.pathname.startsWith("/dashboard/Izin") ||
  location.pathname.startsWith("/dashboard/RekapAbsensiHarian") ||
  location.pathname.startsWith("/dashboard/SettingGajiPegawai") ||
  location.pathname.startsWith("/dashboard/RiwayatGaji") ||
  location.pathname.startsWith("/dashboard/KriteriaKehadiran") ||
  location.pathname.startsWith("/dashboard/SettingKomponenGaji") ||
  location.pathname.startsWith("/dashboard/DanaPensiunPegawai") ||
  location.pathname.startsWith("/dashboard/ManajemenTanggal") ||

  // PENGATURAN
  location.pathname.startsWith("/dashboard/ManajemenInfo") ||
  location.pathname.startsWith("/dashboard/BannerAplikasi") ||
  location.pathname.startsWith("/dashboard/AturUser") ||
  location.pathname.startsWith("/dashboard/BackupData") ||
  location.pathname.startsWith("/dashboard/SettingAbsensiGPS")
) {
  menu = menuConfig.Kepegawaian;
}
  
  else if (location.pathname.startsWith("/dashboard/databuku")) {
    menu = menuConfig.perpustakaan;
  } else if (
    location.pathname.startsWith("/dashboard/profilesekolah") ||
    location.pathname.startsWith("/dashboard/DataAset") ||
    location.pathname.startsWith("/dashboard/PeminjamanAset") ||
    location.pathname.startsWith("/dashboard/RiwayatPeminjaman") ||
    location.pathname.startsWith("/dashboard/MaintenanceAset") ||
    location.pathname.startsWith("/dashboard/DepresiasiAset") ||
     location.pathname.startsWith("/dashboard/SettingKategori") ||
    location.pathname.startsWith("/dashboard/LaporanAset") ||
    location.pathname.startsWith("/dashboard/SuratMenyurat") ||
    location.pathname.startsWith("/dashboard/DokumenSekolah") ||
    location.pathname.startsWith("/dashboard/kegiatansekolah") ||
    location.pathname.startsWith("/dashboard/settinglokasi") 
   
  ) {
    menu = menuConfig.sekolah;
  }
  else if (
    location.pathname.startsWith("/dashboard/perpustakaan") ||
    location.pathname.startsWith("/dashboard/databuku") ||
    location.pathname.startsWith("/dashboard/laporanbuku") ||
    location.pathname.startsWith("/dashboard/laporandenda") ||
   
    location.pathname.startsWith("/dashboard/laporanpeminjamanbuku") ||
    location.pathname.startsWith("/dashboard/laporanpengembalianbuku") ||
    location.pathname.startsWith("/dashboard/pengembalianbuku") ||
    location.pathname.startsWith("/dashboard/PeminjamanBuku") ||


    location.pathname.startsWith("/dashboard/settingdenda") ||
    location.pathname.startsWith("/dashboard/peminjamanbuku")
  ) {
    menu = menuConfig.perpustakaan;
  }

  const toggleMenu = (title) => {
    setOpenMenu((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title) // tutup
        : [...prev, title] // buka tanpa nutup yg lain
    );
  };;

  return (
    <div
      className="w-64 h-screen fixed top-0 left-0 z-50 
bg-[#2f436e]
  text-white flex flex-col shadow-2xl"
    >
      {/* LOGO */}
      <div className="px-4 py-4 border-b border-white-800 flex items-center justify-center gap-3">
        <img
          src={Aduca}
          alt="Aduca Logo"
          className="w-6 h-6 object-contain"
        />

        <span className="text-sm font-semibold tracking-wide">
          Aduca
        </span>
      </div>

      {/* MENU */}
      <div className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white-700">
        {menu.map((group, i) => (
          <div key={i} className="mb-6">
            <p className="text-[10px] font-semibold text-white-200/70 uppercase tracking-wider mb-2 px-2">
              {group.group}
            </p>

            {group.items.map((item, j) => {
              const isActive = location.pathname === item.path;
              const isOpen = openMenu.includes(item.title);

              return (
                <div key={j} className="mb-1">
                  {/* PARENT */}
                  <div
                    onClick={() => {
                      if (item.children) {
                        toggleMenu(item.title);
                      } else {
                        navigate(item.path);
                      }
                    }}
                    className={`flex justify-between items-center px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-300 group
                ${isActive
                        ? "bg-[#3b558a] shadow-lg scale-[1.02]"
                        : "hover:bg-white/10 hover:scale-[1.01]"
                      }`}
                  >
                    <span className="text-sm font-medium tracking-wide flex items-center gap-2">
                      {item.icon && <span className="text-base">{item.icon}</span>}
                      {item.title}
                    </span>

                    {item.children && (
                      <span
                        className={`text-xs transition-all duration-300 ${isOpen ? "rotate-90" : "group-hover:translate-x-1"
                          }`}
                      >
                        ▶
                      </span>
                    )}
                  </div>

                  {/* CHILD (smooth dropdown) */}
                  <div
                    className={`transition-all duration-300 ${isOpen ? "mt-2" : "max-h-0 overflow-hidden"
                      }`}
                  >
                    {item.children && (
                      <div className="ml-3 space-y- pl-3">
                        {item.children.map((child, k) => {
                          const activeChild =
                            location.pathname === child.path;

                          return (
                            <div
                              key={k}
                              onClick={() => navigate(child.path)}
                              className={`px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-all duration-200
                          ${activeChild
                                  ? "bg-white text-blue-900 font-semibold shadow"
                                  : "text-blue-200 hover:bg-[#1f2d4d] hover:text-white"
                                }`}
                            >
                              {child.title}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <div className="px-4 mt-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg  
      bg-blue-500 hover:bg-blue-700 transition text-sm shadow-md hover:scale-[1.02]"
        >
          ← Kembali
        </button>
      </div>

      {/* FOOTER */}
      <div className="px-4 py-4 border-t border-blue-800">
        <div className="bg-[#2f436e] rounded-xl p-3 text-center text-xs text-blue-200">
          © 2026 Aduca
        </div>
      </div>
    </div>
  );
};

export default Sidebar;