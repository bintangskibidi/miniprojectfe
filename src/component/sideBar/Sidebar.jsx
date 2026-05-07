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
  FaSchool,
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
          {
            title: "Pembayaran Siswa",
            icon: <FaMoneyBillWave />,
            children: [
              { title: "bayar Tagihan", path: "/dashboard/BayarTagihan" },
              { title: "Tunggakan Siswa", path: "/dashboard/TunggakanSiswa" },
              { title: "jenis Pembayaran", path: "/dashboard/JenisPembayaran" },
              { title: "tarif pembayaran", path: "/dashboard/TarifPembayaranSiswa" },
              { title: "Rekap Pembayaran Bulanan", path: "/dashboard/RekapPembayaran" },
              { title: "Data Transaksi", path: "/dashboard/walikelas" },
              { title: "Rekap Persiswa", path: "/dashboard/RekapSiswa" },
              { title: "Rekap Pertanggal", path: "/dashboard/RekapTanggal" },
              { title: "Rekap Tagihan", path: "/dashboard/RekapTagihan" },
              { title: "tagihan bulan ini", path: "/dashboard/TagihanBulanIni" },
            ],
          },
          {
            title: "Tabungan siswa",
            icon: <FaPiggyBank />,
            children: [
              {
                title: "Teller",
                path: "/dashboard/Teller",
              },
              {
                title: "Riwayat Tabungan siswa",
                path: "/dashboard/RiwayatTabunganSiswa",
              },
              {
                title: "Riwayat Transaksi",
                path: "/dashboard/RiwayatTransaksi",
              },
            ],
          },
          {
            title: "Penerimaan",
            icon: <FaArrowDown />,

            children: [
              {
                title: "Transaksi Penerimaan",
                path: "/dashboard/TransaksiPenerimaan",
              },
              {
                title: "jenis Penerimaan",
                path: "/dashboard/JenisPenerimaan",
              },
              {
                title: "Laporan Penerimaan",
                path: "/dashboard/LaporanPenerimaan",
              },

            ],
          },
          {
            title: "pengeluaran",
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
                path: "/dashboard/LaporanPengeluaran",
              },

            ],
          },
          {
            title: "Jurnal",
            icon: <FaBookOpen />,
            children: [
              {
                title: "Transaksi Jurnal",
                path: "/dashboard/absensimapel"
              },
              {
                title: "laporan Jurnal",
                path: "/dashboard/absensimapel"
              },
            ]
          },
          {
            title: "Buku Besar",
            icon: <FaBook />,

            children: [
              {
                title: "laporan Buku Besar",
                path: "/dashboard/LaporanBukuBesar"
              },
              {
                title: "Neraca Saldo",
                path: "/dashboard/NeracaSaldo"
              },
              {
                title: "Jurnal Umum",
                path: "/dashboard/JurnalUmum"
              },
            ]
          },
          {
            title: "Laporan Keuangan",
            icon: <FaChartBar />,
            children: [
              {
                title: "Penghasilan komprehensif",
                path: "/dashboard/Penghasilan Komprehensif"
              },
              {
                title: "Posisi Keuangan",
                path: "/dashboard/PosisiKeuangan"
              },
              {
                title: "Arus Kas",
                path: "/dashboard/ArusKas"
              },
              {
                title: "perubahan aset neto",
                path: "/dashboard/absensimapel"
              },
            ]
          },
        ],
      },
    ],

    Kepegawaian: [
      {
        group: "MENU",
        items: [
          {
            title: "Dashboard",
            path: "/dashboard/kepegawaian",
          },
          {
            title: "DataPegawai",
            path: "/dashboard/DataPegawai",
          },
        ]
      }
    ],

    perpustakaan: [
      {
        group: "Perpustakaan",
        items: [
          { title: "Data Perpustakaan", path: "/dashboard/perpustakaan" },
          { title: "Data Buku", path: "/dashboard/databuku" },
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
              { title: "Profile sekolah", path: "/dashboard/profilesekolah" },
            ],
          },
        ],
      },
      {
        group: "",
        items: [
          { title: "Setting Lokasi", path: "/dashboard/settinglokasi" },
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
    + location.pathname.startsWith("/dashboard/JadwalMengajar") ||
    + location.pathname.startsWith("/dashboard/distribusijam")
  ) {
    menu = menuConfig.guru;
  } else if (location.pathname.startsWith("/dashboard/keuangan")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/LaporanBukuBesar")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/NeracaSaldo")) {
  } else if (location.pathname.startsWith("/dashboard/RekapPembayaran")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/JenisPembayaran")) {
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
  } else if (location.pathname.startsWith("/dashboard/LaporanPengeluaran")) {
    menu = menuConfig.keuangan;
  }
  else if (location.pathname.startsWith("/dashboard/kepegawaian")) {
    menu = menuConfig.Kepegawaian;
  }
  else if (location.pathname.startsWith("/dashboard/DataPegawai")) {
    menu = menuConfig.Kepegawaian;
  }
  else if (location.pathname.startsWith("/dashboard/perpustakaan")) {
  } else if (location.pathname.startsWith("/dashboard/databuku")) {
    menu = menuConfig.perpustakaan;
  } else if (
    location.pathname.startsWith("/dashboard/profilesekolah") ||
    location.pathname.startsWith("/dashboard/settinglokasi")
  ) {
    menu = menuConfig.sekolah;
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
                      <div className="ml-3 space-y-1 border-l border-blue-700 pl-3">
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
        <div className="bg-blue-800/60 rounded-xl p-3 text-center text-xs text-blue-200">
          © 2026 Aduca
        </div>
      </div>
    </div>
  );
};

export default Sidebar;