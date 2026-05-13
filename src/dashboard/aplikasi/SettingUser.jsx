import React, { useState } from "react";
import {
  FaUsers,
  FaSearch,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserTie,
  FaUserFriends,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function ManajemenUser() {
  const [jenisUser, setJenisUser] = useState("");
  const [kelas, setKelas] = useState("");
  const [showTable, setShowTable] = useState(false);

  // DATA DUMMY
  const dataUser = [
    {
      id: 1,
      nama: "Ahmad Fauzi",
      username: "ahmad01",
      jenis: "Siswa",
      kelas: "X RPL 1",
      status: "Aktif",
    },
    {
      id: 2,
      nama: "Siti Nurhaliza",
      username: "siti02",
      jenis: "Guru",
      kelas: "-",
      status: "Aktif",
    },
    {
      id: 3,
      nama: "Budi Santoso",
      username: "budi03",
      jenis: "Wali Kelas",
      kelas: "XI TKJ 2",
      status: "Aktif",
    },
    {
      id: 4,
      nama: "Orang Tua Andi",
      username: "ortu04",
      jenis: "Orang Tua",
      kelas: "X AKL 1",
      status: "Nonaktif",
    },
  ];

  // FILTER DATA
  const filteredData = dataUser.filter((item) => {
    const cocokJenis =
      jenisUser === "" || item.jenis === jenisUser;

    const cocokKelas =
      kelas === "" || item.kelas === kelas;

    return cocokJenis && cocokKelas;
  });

  // HANDLE FILTER
  const handleFilter = () => {
    // VALIDASI
    if (!jenisUser && !kelas) {
      Swal.fire({
        icon: "warning",
        title: "Filter Kosong",
        text: "Pilih minimal 1 filter terlebih dahulu",
        confirmButtonColor: "#2563eb",
      });

      return;
    }

    // LOADING
    Swal.fire({
      title: "Memuat Data...",
      text: "Mohon tunggu sebentar",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // SIMULASI DELAY
    setTimeout(() => {
      Swal.close();

      setShowTable(true);

      if (filteredData.length > 0) {
        Swal.fire({
          icon: "success",
          title: "Data Ditemukan",
          text: `Total ${filteredData.length} data user ditemukan`,
          confirmButtonColor: "#2563eb",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Data Tidak Ditemukan",
          text: "Tidak ada data yang sesuai filter",
          confirmButtonColor: "#dc2626",
        });
      }
    }, 1000);
  };

  // ICON USER
  const getIcon = (jenis) => {
    switch (jenis) {
      case "Siswa":
        return <FaUserGraduate className="text-blue-600" />;

      case "Guru":
        return (
          <FaChalkboardTeacher className="text-green-600" />
        );

      case "Wali Kelas":
        return <FaUserTie className="text-purple-600" />;

      case "Orang Tua":
        return <FaUserFriends className="text-orange-500" />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* TITLE */}
      <div className="flex items-center gap-3 mb-6">
        <FaUsers className="text-2xl text-blue-600" />

        <h1 className="text-3xl font-bold text-gray-800">
          Manajemen User
        </h1>
      </div>

      {/* CARD FILTER */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        {/* HEADER */}
        <div className="bg-blue-600 px-5 py-3">
          <h2 className="text-white font-semibold text-sm">
            Filter Data User (Tahun Ajaran Aktif:
            2025/2026)
          </h2>
        </div>

        {/* BODY */}
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">

            {/* JENIS USER */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pilih Jenis User
              </label>

              <select
                value={jenisUser}
                onChange={(e) =>
                  setJenisUser(e.target.value)
                }
                className="
                  w-full
                  border border-gray-300
                  rounded-xl
                  px-4 py-3
                  text-sm
                  bg-white
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                  transition
                "
              >
                <option value="">
                  -- Pilih Jenis User --
                </option>

                <option value="Siswa">Siswa</option>

                <option value="Guru">Guru</option>

                <option value="Wali Kelas">
                  Wali Kelas
                </option>

                <option value="Orang Tua">
                  Orang Tua
                </option>
              </select>
            </div>

            {/* KELAS */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pilih Kelas
              </label>

              <select
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="
                  w-full
                  border border-gray-300
                  rounded-xl
                  px-4 py-3
                  text-sm
                  bg-white
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-blue-500
                  transition
                "
              >
                <option value="">
                  -- Pilih Kelas --
                </option>

                <option value="X RPL 1">
                  X RPL 1
                </option>

                <option value="XI TKJ 2">
                  XI TKJ 2
                </option>

                <option value="X AKL 1">
                  X AKL 1
                </option>
              </select>
            </div>

            {/* BUTTON */}
            <div>
              <button
                onClick={handleFilter}
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  font-medium
                  px-4 py-3
                  rounded-xl
                  shadow
                  transition
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                <FaSearch />
                Tampilkan Data
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TABLE */}
      {showTable && (
        <div className="mt-6 bg-white rounded-2xl shadow border overflow-hidden">

          {/* HEADER TABLE */}
          <div className="px-5 py-4 border-b bg-gray-50 flex justify-between items-center">
            <h2 className="font-semibold text-gray-700">
              Data User
            </h2>

            <span className="text-sm text-gray-500">
              Total: {filteredData.length} User
            </span>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">

              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 border text-left text-sm">
                    #
                  </th>

                  <th className="px-4 py-3 border text-left text-sm">
                    Nama
                  </th>

                  <th className="px-4 py-3 border text-left text-sm">
                    Username
                  </th>

                  <th className="px-4 py-3 border text-left text-sm">
                    Jenis User
                  </th>

                  <th className="px-4 py-3 border text-left text-sm">
                    Kelas
                  </th>

                  <th className="px-4 py-3 border text-left text-sm">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 border text-sm">
                        {index + 1}
                      </td>

                      <td className="px-4 py-3 border text-sm font-medium">
                        {item.nama}
                      </td>

                      <td className="px-4 py-3 border text-sm">
                        {item.username}
                      </td>

                      <td className="px-4 py-3 border text-sm">
                        <div className="flex items-center gap-2">
                          {getIcon(item.jenis)}

                          {item.jenis}
                        </div>
                      </td>

                      <td className="px-4 py-3 border text-sm">
                        {item.kelas}
                      </td>

                      <td className="px-4 py-3 border text-sm">
                        <span
                          className={`
                            px-3 py-1 rounded-full text-xs font-semibold
                            ${
                              item.status === "Aktif"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          `}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-10 text-gray-500"
                    >
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  );
}