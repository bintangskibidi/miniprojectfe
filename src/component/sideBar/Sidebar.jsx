import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuConfig = {
    siswa: [
      {
        group: "Manajemen Siswa",
        items: [{ title: "Data Siswa", path: "/dashboard/siswa" }],
      },
      {
        group: "Manajemen Siswa",
        items: [{ title: "Wali Kelas", path: "/dashboard/WaliKelas"}]
      },
    ],
  
    guru: [
      {
        group: "Manajemen Guru",
        items: [{ title: "Data Guru", path: "/dashboard/guru" }],
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
        items: [{ title: "Data Perpustakaan", path: "/dashboard/perpustakaan" }],
      },
    ],
     
  };

  let menu = menuConfig.default;

  if (location.pathname.startsWith("/dashboard/siswa")) {
    menu = menuConfig.siswa;
  } else if (location.pathname.startsWith("/dashboard/guru")) {
    menu = menuConfig.guru;
  } else if (location.pathname.startsWith("/dashboard/keuangan")) {
    menu = menuConfig.keuangan;
  } else if (location.pathname.startsWith("/dashboard/perpustakaan")) {
    menu = menuConfig.perpustakaan;
  }
   else if (location.pathname.startsWith("/dashboard/walikelas")) {
  menu = menuConfig.walikelas;
}

  return (
    <div className="w-64 min-h-screen bg-white border-r shadow-sm flex flex-col">
      
      {/* LOGO */}
      <div className="flex items-center gap-3 px-6 py-5 border-b">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-700 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
          A
        </div>
        <div>
          <h1 className="text-lg font-bold text-blue-900">Aduca</h1>
          <p className="text-xs text-gray-400">Smart School System</p>
        </div>
      </div>

      {/* MENU */}
      <div className="flex-1 px-4 py-4">
        {menu.map((group, i) => (
          <div key={i} className="mb-6">
            
            {/* GROUP TITLE */}
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
              {group.group}
            </p>

            {/* ITEMS */}
            {group.items.map((item, j) => {
              const active = location.pathname === item.path;

              return (
                <div
                  key={j}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200
                    ${
                      active
                        ? "bg-gradient-to-r from-blue-600 to-orange-500 text-white shadow-md"
                        : "text-gray-600 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                >
                  {/* BULLET / INDICATOR */}
                  <div
                    className={`w-2 h-2 rounded-full ${
                      active ? "bg-white" : "bg-gray-300"
                    }`}
                  ></div>

                  <span className="text-sm font-medium">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="px-4 py-3 border-t text-xs text-gray-400">
        © 2026 Aduca
      </div>
    </div>
  );
};

export default Sidebar;