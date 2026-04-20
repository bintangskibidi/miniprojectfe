import { useNavigate, useLocation } from "react-router-dom";
import Aduca from "../../assets/Aduca.png";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);

 const menuConfig = {
  siswa: [
    {
      group: "Manajemen Siswa",
      items: [
        {
          title: "Dashboard",
          path: "/dashboard/siswa",
        },
        {
          title: "Kesiswaan",
          children: [
            { title: "Wali Kelas", path: "/dashboard/walikelas" },
            { title: "Data Siswa", path: "/dashboard/datasiswa" },
            { title: "Data Kelas", path: "/dashboard/datakelas" },
            { title: "Tahun Ajaran", path: "/dashboard/tahunajaran" },
          ],
        },
        {
          title: "Kegiatan",
          children: [
            {
              title: "Ekstrakurikuler",
              path: "/dashboard/ekstrakurikuler",
            },
          ],
        },
        {
          title: "E-Raport",
          children: [
            {
              title: "Semester",
              path: "/dashboard/Semester",
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
          title: "Data Guru",
          path: "/dashboard/guru",
        },
        {
          title: "Mata Pelajaran",
          path: "/dashboard/mapel",
        },
      ],
    },
  ],

  keuangan: [
    {
      group: "Manajemen Keuangan",
      items: [{ title: "Data Keuangan", path: "/dashboard/keuangan" }],
    },
  ],

  perpustakaan: [
    {
      group: "Perpustakaan",
      items: [
        { title: "Data Perpustakaan", path: "/dashboard/perpustakaan" },
      ],
    },
  ],

  sekolah: [
    {
      group: "Manajemen Sekolah",
      items: [
        { title: "Profil Sekolah", path: "/dashboard/profilesekolah" },
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
    location.pathname.startsWith("/dashboard/datasiswa") ||
    location.pathname.startsWith("/dashboard/datakelas") ||
    location.pathname.startsWith("/dashboard/ekstrakurikuler") ||
    location.pathname.startsWith("/dashboard/Semester") ||
    location.pathname.startsWith("/dashboard/tambah-siswa") ||
    location.pathname.startsWith("/dashboard/tahunajaran")
  ) {
    menu = menuConfig.siswa;
  } else if (
    location.pathname.startsWith("/dashboard/guru") ||
    location.pathname.startsWith("/dashboard/mapel")
  ) {
    menu = menuConfig.guru;
  } else if (location.pathname.startsWith("/dashboard/keuangan")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/perpustakaan")) {
    menu = menuConfig.perpustakaan;
  } else if (
    location.pathname.startsWith("/dashboard/profilesekolah") ||
    location.pathname.startsWith("/dashboard/settinglokasi")
  ) {
    menu = menuConfig.sekolah;
  }

  const toggleMenu = (title) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  return (
    <div
      className="w-64 h-screen fixed top-0 left-0 z-50 
bg-gradient-to-b from-blue-950 via-blue-900 to-blue-800 
text-white flex flex-col shadow-2xl"
    >
      {/* LOGO */}
      <div className="px-6 py-5 border-b border-blue-800 flex items-center gap-3">
        <img
          src={Aduca}
          alt="Aduca Logo"
          className="w-11 h-11 object-contain bg-white rounded-xl p-1 shadow-md"
        />
        <div>
          <h1 className="text-lg font-bold tracking-wide">Aduca</h1>
          <p className="text-[10px] text-blue-300">Smart School System</p>
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 px-3 py-4 overflow-y-auto">
        {menu.map((group, i) => (
          <div key={i} className="mb-6">
            <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider mb-2 px-2">
              {group.group}
            </p>

            {group.items.map((item, j) => {
              const isActive = location.pathname === item.path;
              const isOpen = openMenu === item.title;

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
                    className={`flex justify-between items-center px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-300
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg scale-[1.02]"
                        : "hover:bg-blue-800/70 hover:scale-[1.01]"
                    }`}
                  >
                    <span className="text-sm font-medium tracking-wide">
                      {item.title}
                    </span>

                    {item.children && (
                      <span
                        className={`text-xs transition-transform duration-300 ${
                          isOpen ? "rotate-90" : ""
                        }`}
                      >
                        ▶
                      </span>
                    )}
                  </div>

                  {/* CHILD */}
                  {item.children && isOpen && (
                    <div className="ml-3 mt-2 space-y-1 border-l border-blue-700 pl-3">
                      {item.children.map((child, k) => {
                        const activeChild = location.pathname === child.path;

                        return (
                          <div
                            key={k}
                            onClick={() => navigate(child.path)}
                            className={`px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-all duration-200
                            ${
                              activeChild
                                ? "bg-blue-100 text-blue-900 font-semibold shadow"
                                : "text-blue-200 hover:bg-blue-800/60 hover:text-white"
                            }`}
                          >
                            {child.title}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="px-4 mt-3">
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full flex items-center gap-2 px-3 py-2 rounded  
          bg-blue-500 hover:bg-blue-700 transition text-sm"
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