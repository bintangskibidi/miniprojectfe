import React, { useState, useEffect } from "react";
import { 
  FaUsers, 
  FaPlus, 
  FaEdit, 
  FaKey, 
  FaLock, 
  FaTrash, 
  FaTimes, 
  FaBuilding, 
  FaSave 
} from "react-icons/fa";
import Swal from "sweetalert2";
import api from "../../utils/api"; // Sesuaikan dengan path instance axios Anda

export default function SettingAdmin() {
  // --- STATE DATA ---
  const [units, setUnits] = useState(["SD", "SMA", "SMP", "TK"]);
  const [users, setUsers] = useState([
    { id: 1, nama: "Ais Bayu", email: "tester@gmail.com", unit: "-", jabatan: "Admin" },
    { id: 2, nama: "Cek", email: "cek@gmail.com", unit: "-", jabatan: "Admin" },
    { id: 3, nama: "Tester", email: "test@gmail.com", unit: "-", jabatan: "Admin" },
    { id: 4, nama: "Tes unit", email: "unit@gmail.com", unit: "SD", jabatan: "Unit" },
  ]);
  const [loading, setLoading] = useState(false);

  // --- STATE MODAL ---
  const [modalType, setModalType] = useState(null); // 'tambahUnit', 'tambahUser', 'editUser', 'gantiPassword', 'kelolaAkses'
  const [selectedUser, setSelectedUser] = useState(null);

  // --- STATE FORM ---
  const [formUnit, setFormUnit] = useState({ namaUnit: "" });
  const [formUser, setFormUser] = useState({ nama: "", email: "", password: "", jabatan: "" });
  const [formPassword, setFormPassword] = useState({ passwordBaru: "", konfirmasiPassword: "" });
  const [formAkses, setFormAkses] = useState({
    kepegawaian: {
      dataPegawai: { view: false, create: false, edit: false, delete: false },
      kinerjaPegawai: { view: false, create: false, edit: false, delete: false },
      absenKegiatan: { view: false, create: false, edit: false, delete: false },
      manajemenLembur: { view: false, create: false, edit: false, delete: false },
      rekapAbsensi: { view: false, create: false, edit: false, delete: false },
      payroll: { view: false, create: false, edit: false, delete: false },
      danaPensiun: { view: false, create: false, edit: false, delete: false },
    },
    pengaturan: {
      informasiLembaga: false,
      bannerAplikasi: false,
      settingUser: false,
      settingAdmin: false,
      settingLokasiGps: false
    }
  });

  // --- FETCH DATA (SIMULASI/API) ---
  const fetchData = async () => {
    setLoading(true);
    try {
      // Aktifkan baris di bawah ini jika sudah terhubung ke API backend
      // const resUnit = await api.get("/unit");
      // const resUser = await api.get("/users");
      // setUnits(resUnit.data.data);
      // setUsers(resUser.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- HANDLER MODAL CLOSE ---
  const closeModal = () => {
    setModalType(null);
    setSelectedUser(null);
    setFormUnit({ namaUnit: "" });
    setFormUser({ nama: "", email: "", password: "", jabatan: "" });
    setFormPassword({ passwordBaru: "", konfirmasiPassword: "" });
  };

  // --- HANDLER ACTIONS ---
  const handleTambahUnit = () => {
    if (!formUnit.namaUnit) return;
    setUnits([...units, formUnit.namaUnit.toUpperCase()]);
    closeModal();
    Swal.fire("Berhasil", "Unit berhasil ditambahkan", "success");
  };

  const handleSimpanUser = (isEdit = false) => {
    if (isEdit) {
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...formUser } : u));
      Swal.fire("Berhasil", "Data user berhasil diperbarui", "success");
    } else {
      const newUser = {
        id: Date.now(),
        nama: formUser.nama,
        email: formUser.email,
        unit: "-",
        jabatan: formUser.jabatan
      };
      setUsers([...users, newUser]);
      Swal.fire("Berhasil", "User baru berhasil didaftarkan", "success");
    }
    closeModal();
  };

  const handleGantiPassword = () => {
    if (formPassword.passwordBaru !== formPassword.konfirmasiPassword) {
      Swal.fire("Gagal", "Konfirmasi password tidak cocok!", "error");
      return;
    }
    closeModal();
    Swal.fire("Berhasil", "Password berhasil diperbarui", "success");
  };

  const handleSimpanAkses = () => {
    closeModal();
    Swal.fire("Berhasil", "Hak akses user berhasil dikonfigurasi", "success");
  };

  // --- TRIGGER MODAL HAPUS (SWEETALERT2 CUSTOM) ---
  const handleHapusUnit = (unitName) => {
    Swal.fire({
      title: "Hapus Unit?",
      text: `Apakah Anda yakin ingin menghapus unit ${unitName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        setUnits(units.filter(u => u !== unitName));
        Swal.fire("Terhapus!", "Unit telah dihapus.", "success");
      }
    });
  };

  const handleHapusUser = (user) => {
    Swal.fire({
      title: "Hapus User?",
      text: `Apakah Anda yakin ingin menghapus ${user.nama}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal"
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter(u => u.id !== user.id));
        Swal.fire("Terhapus!", "User telah dihapus.", "success");
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* CARD CONTAINER UTAMA */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
        
        {/* HEADER UTAMA */}
        <div className="bg-blue-600 px-6 py-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <FaUsers className="text-xl" />
            <h1 className="font-semibold text-lg">Manajemen Admin & Unit</h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setModalType("tambahUnit")}
              className="bg-white text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 shadow transition"
            >
              <FaPlus className="text-xs" /> Tambah Unit
            </button>
            <button 
              onClick={() => setModalType("tambahUser")}
              className="bg-white text-gray-800 hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 shadow transition"
            >
              <FaPlus className="text-xs" /> Tambah User
            </button>
          </div>
        </div>

        {/* AREA DAFTAR UNIT */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-2 text-blue-600 font-medium text-sm mb-3">
            <FaBuilding /> <span>Daftar Unit</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {units.map((unit, idx) => (
              <div key={idx} className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm text-gray-700">
                <span>{unit}</span>
                <button 
                  onClick={() => handleHapusUnit(unit)}
                  className="text-red-500 hover:bg-red-50 p-0.5 rounded border border-red-200"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* TABEL DATA USER */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-50 text-gray-700 font-semibold text-sm border-b">
                <th className="px-4 py-3 text-center w-12">No</th>
                <th className="px-4 py-3">Nama</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 text-center">Unit</th>
                <th className="px-4 py-3 text-center">Jabatan</th>
                <th className="px-4 py-3 text-center w-48">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y">
              {users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50/80 transition">
                  <td className="px-4 py-3 text-center font-medium text-gray-600">{index + 1}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">{user.nama}</td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${user.unit === '-' ? 'bg-gray-400 text-white' : 'bg-cyan-400 text-white'}`}>
                      {user.unit}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-0.5 rounded text-xs font-semibold text-white ${user.jabatan === 'Admin' ? 'bg-blue-500' : 'bg-green-600'}`}>
                      {user.jabatan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-1">
                      {/* EDIT USER */}
                      <button 
                        onClick={() => {
                          setSelectedUser(user);
                          setFormUser({ nama: user.nama, email: user.email, jabatan: user.jabatan, password: "" });
                          setModalType("editUser");
                        }}
                        className="bg-amber-400 hover:bg-amber-500 p-2 rounded text-black transition"
                        title="Edit User"
                      >
                        <FaEdit />
                      </button>
                      {/* GANTI PASSWORD */}
                      <button 
                        onClick={() => { setSelectedUser(user); setModalType("gantiPassword"); }}
                        className="bg-cyan-500 hover:bg-cyan-600 p-2 rounded text-white transition"
                        title="Ganti Password"
                      >
                        <FaKey />
                      </button>
                      {/* KELOLA AKSES */}
                      <button 
                        onClick={() => { setSelectedUser(user); setModalType("kelolaAkses"); }}
                        className="bg-emerald-600 hover:bg-emerald-700 p-2 rounded text-white transition"
                        title="Kelola Hak Akses"
                      >
                        <FaLock />
                      </button>
                      {/* HAPUS USER */}
                      <button 
                        onClick={() => handleHapusUser(user)}
                        className="bg-red-500 hover:bg-red-600 p-2 rounded text-white transition"
                        title="Hapus User"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================== */}
      {/* MODAL CONTROLLER               */}
      {/* ========================================== */}

      {modalType && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          
          {/* 1. MODAL TAMBAH UNIT */}
          {modalType === "tambahUnit" && (
            <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-fade-in">
              <div className="bg-blue-600 px-5 py-4 text-white flex justify-between items-center">
                <h3 className="font-semibold text-md">Tambah Unit</h3>
                <button onClick={closeModal} className="hover:text-gray-200 text-lg"><FaTimes /></button>
              </div>
              <div className="p-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Unit <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  placeholder="Masukkan nama unit"
                  value={formUnit.namaUnit}
                  onChange={(e) => setFormUnit({ namaUnit: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t flex justify-end gap-2 text-sm">
                <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Batal</button>
                <button onClick={handleTambahUnit} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Simpan</button>
              </div>
            </div>
          )}

          {/* 2. MODAL TAMBAH / EDIT USER */}
          {(modalType === "tambahUser" || modalType === "editUser") && (
            <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
              <div className={`${modalType === "editUser" ? "bg-amber-400 text-black" : "bg-blue-600 text-white"} px-5 py-4 flex justify-between items-center`}>
                <h3 className="font-semibold text-md">{modalType === "editUser" ? "Edit User" : "Tambah User"}</h3>
                <button onClick={closeModal} className="text-lg"><FaTimes /></button>
              </div>
              <div className="p-5 space-y-4 text-sm">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    value={formUser.nama}
                    onChange={(e) => setFormUser({ ...formUser, nama: e.target.value })}
                    placeholder="Masukkan nama lengkap"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                  <input 
                    type="email" 
                    value={formUser.email}
                    onChange={(e) => setFormUser({ ...formUser, email: e.target.value })}
                    placeholder="example@mail.com"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {modalType === "tambahUser" && (
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Password <span className="text-red-500">*</span></label>
                    <input 
                      type="password" 
                      value={formUser.password}
                      onChange={(e) => setFormUser({ ...formUser, password: e.target.value })}
                      placeholder="Minimal 6 karakter"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Jabatan <span className="text-red-500">*</span></label>
                  <select 
                    value={formUser.jabatan}
                    onChange={(e) => setFormUser({ ...formUser, jabatan: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">-- Pilih Jabatan --</option>
                    <option value="Admin">Admin</option>
                    <option value="Unit">Unit</option>
                  </select>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t flex justify-end gap-2 text-sm">
                <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Batal</button>
                <button 
                  onClick={() => handleSimpanUser(modalType === "editUser")} 
                  className={`${modalType === "editUser" ? "bg-amber-400 hover:bg-amber-500 text-black" : "bg-blue-600 hover:bg-blue-700 text-white"} px-4 py-2 rounded-lg font-medium`}
                >
                  {modalType === "editUser" ? "Update" : "Simpan"}
                </button>
              </div>
            </div>
          )}

          {/* 3. MODAL GANTI PASSWORD */}
          {modalType === "gantiPassword" && (
            <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden">
              <div className="bg-cyan-500 px-5 py-4 text-white flex justify-between items-center">
                <h3 className="font-semibold text-md">Ganti Password - {selectedUser?.nama}</h3>
                <button onClick={closeModal} className="text-lg"><FaTimes /></button>
              </div>
              <div className="p-5 space-y-4 text-sm">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Password Baru <span className="text-red-500">*</span></label>
                  <input 
                    type="password" 
                    placeholder="Minimal 6 karakter"
                    value={formPassword.passwordBaru}
                    onChange={(e) => setFormPassword({ ...formPassword, passwordBaru: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Konfirmasi Password <span className="text-red-500">*</span></label>
                  <input 
                    type="password" 
                    placeholder="Ulangi password baru"
                    value={formPassword.konfirmasiPassword}
                    onChange={(e) => setFormPassword({ ...formPassword, konfirmasiPassword: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t flex justify-end gap-2 text-sm">
                <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Batal</button>
                <button onClick={handleGantiPassword} className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg">Ganti Password</button>
              </div>
            </div>
          )}

          {/* 4. MODAL KELOLA AKSES USER (MATRIX CHECKBOX BANYAK) */}
          {modalType === "kelolaAkses" && (
            <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden my-8">
              <div className="bg-emerald-600 px-5 py-4 text-white flex justify-between items-center">
                <h3 className="font-semibold text-md">Kelola Akses User</h3>
                <button onClick={closeModal} className="text-lg"><FaTimes /></button>
              </div>
              <div className="p-5 max-h-[70vh] overflow-y-auto space-y-5 text-sm">
                <div className="text-gray-800 font-medium">User: <span className="text-blue-600">{selectedUser?.nama}</span></div>
                
                {/* BLOK KEPEGAWAIAN */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-blue-600 text-white px-4 py-2 font-bold text-xs uppercase tracking-wider">Kepegawaian</div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b text-xs text-gray-500 font-semibold">
                        <th className="p-3">Menu</th>
                        <th className="p-3 text-center w-20">View</th>
                        <th className="p-3 text-center w-20">Create</th>
                        <th className="p-3 text-center w-20">Edit</th>
                        <th className="p-3 text-center w-20">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-gray-700">
                      {Object.keys(formAkses.kepegawaian).map((menuKey) => (
                        <tr key={menuKey} className="hover:bg-gray-50/50">
                          <td className="p-3 capitalize font-medium">{menuKey.replace(/([A-Z])/g, ' $1')}</td>
                          {['view', 'create', 'edit', 'delete'].map((action) => (
                            <td key={action} className="p-3 text-center">
                              <input 
                                type="checkbox" 
                                checked={formAkses.kepegawaian[menuKey][action]}
                                onChange={(e) => setFormAkses({
                                  ...formAkses,
                                  kepegawaian: {
                                    ...formAkses.kepegawaian,
                                    [menuKey]: { ...formAkses.kepegawaian[menuKey], [action]: e.target.checked }
                                  }
                                })}
                                className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* BLOK PENGATURAN */}
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-blue-600 text-white px-4 py-2 font-bold text-xs uppercase tracking-wider">Pengaturan</div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b text-xs text-gray-500 font-semibold">
                        <th className="p-3">Menu</th>
                        <th className="p-3 text-center w-20">View</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-gray-700">
                      {Object.keys(formAkses.pengaturan).map((menuKey) => (
                        <tr key={menuKey} className="hover:bg-gray-50/50">
                          <td className="p-3 capitalize font-medium">{menuKey.replace(/([A-Z])/g, ' $1')}</td>
                          <td className="p-3 text-center">
                            <input 
                              type="checkbox" 
                              checked={formAkses.pengaturan[menuKey]}
                              onChange={(e) => setFormAkses({
                                ...formAkses,
                                pengaturan: { ...formAkses.pengaturan, [menuKey]: e.target.checked }
                              })}
                              className="w-4 h-4 rounded text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t flex justify-end gap-2 text-sm">
                <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Batal</button>
                <button onClick={handleSimpanAkses} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-1"><FaSave /> Simpan Akses</button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}