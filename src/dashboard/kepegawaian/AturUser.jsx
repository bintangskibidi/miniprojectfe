import React, { useState } from "react";
import Swal from "sweetalert2";

export default function AturUser() {
  const [jenisUser, setJenisUser] = useState("");
  const [dataUser, setDataUser] = useState([]);
  const [passwordSemua, setPasswordSemua] = useState("");

  // DUMMY DATA
  const users = {
    guru: [
      {
        id: 1,
        nip: "1234567890",
        nama: "Bayu Aji lesmana eka putra",
        password: "",
      },
      {
        id: 2,
        nip: "1234567891",
        nama: "Sari Dewi",
        password: "",
      },
    ],

    pegawai: [
      {
        id: 1,
        nip: "1987654321",
        nama: "Rizky Maulana",
        password: "",
      },
      {
        id: 2,
        nip: "1987654322",
        nama: "Dina Oktavia",
        password: "",
      },
    ],

    staff: [
      {
        id: 1,
        nip: "5566778899",
        nama: "Andi Saputra",
        password: "",
      },
      {
        id: 2,
        nip: "5566778800",
        nama: "Nina Marlina",
        password: "",
      },
    ],
  };

  // FILTER DATA
  const handleFilter = () => {
    if (!jenisUser) {
      Swal.fire({
        icon: "warning",
        title: "Pilih Jenis User",
        text: "Silakan pilih jenis user terlebih dahulu",
      });

      return;
    }

    Swal.fire({
      title: "Memuat Data...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      setDataUser(users[jenisUser] || []);
      Swal.close();
    }, 800);
  };

  // HANDLE PASSWORD PER USER
  const handlePasswordChange = (index, value) => {
    const updated = [...dataUser];

    updated[index].password = value;

    setDataUser(updated);
  };

  // SET PASSWORD SEMUA
  const handleSetSemuaPassword = () => {
    if (!passwordSemua) {
      Swal.fire({
        icon: "warning",
        title: "Password kosong",
        text: "Masukkan password terlebih dahulu",
      });

      return;
    }

    const updated = dataUser.map((item) => ({
      ...item,
      password: passwordSemua,
    }));

    setDataUser(updated);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Password semua user berhasil diisi",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* FILTER */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <div className="bg-blue-600 px-5 py-3">
          <h1 className="text-white font-semibold">
            Filter Data User (Tahun Ajaran Aktif: 2025/2026)
          </h1>
        </div>

        <div className="p-5">
          <label className="block mb-2 text-sm font-medium">
            Pilih Jenis User
          </label>

          <div className="flex flex-col md:flex-row gap-3">
            <select
              value={jenisUser}
              onChange={(e) => setJenisUser(e.target.value)}
              className="
    border
    border-gray-300
    rounded-lg
    px-4
    py-3
    w-full
    md:w-60
    outline-none
    focus:ring-2
    focus:ring-blue-500
  "
            >
              <option value="">-- Pilih Jenis User --</option>

              <option value="guru">Guru</option>

              <option value="pegawai">Pegawai</option>

              <option value="staff">Staff</option>
            </select>

            <button
              onClick={handleFilter}
              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-lg
                font-medium
                w-full
                md:w-60
              "
            >
              Tampilkan Data
            </button>
          </div>
        </div>
      </div>

      {/* DATA */}
      {dataUser.length > 0 && (
        <div className="bg-white rounded-xl shadow border mt-5 overflow-hidden">
          {/* SET PASSWORD SEMUA */}
          <div className="p-5 border-b bg-gray-50">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <label className="font-semibold whitespace-nowrap">
                Set Password Semua:
              </label>

              <input
                type="text"
                value={passwordSemua}
                onChange={(e) =>
                  setPasswordSemua(e.target.value)
                }
                placeholder="Masukkan password untuk semua user"
                className="
                  flex-1
                  border
                  border-gray-300
                  rounded-lg
                  px-4
                  py-3
                  outline-none
                  focus:ring-2
                  focus:ring-yellow-400
                "
              />

              <button
                onClick={handleSetSemuaPassword}
                className="
                  bg-yellow-400
                  hover:bg-yellow-500
                  text-black
                  px-6
                  py-3
                  rounded-lg
                  font-medium
                  w-full
                  md:w-72
                "
              >
                Set Semua Password
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead className="bg-blue-100">
                <tr>
                  <th className="border px-4 py-3 text-left">No</th>

                  <th className="border px-4 py-3 text-left">
                    ID / NIP
                  </th>

                  <th className="border px-4 py-3 text-left">
                    Nama
                  </th>

                  <th className="border px-4 py-3 text-left">
                    Password (isi untuk simpan)
                  </th>
                </tr>
              </thead>

              <tbody>
                {dataUser.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="border px-4 py-3">
                      {index + 1}
                    </td>

                    <td className="border px-4 py-3">
                      {item.nip}
                    </td>

                    <td className="border px-4 py-3">
                      {item.nama}
                    </td>

                    <td className="border px-4 py-3">
                      <input
                        type="text"
                        value={item.password}
                        onChange={(e) =>
                          handlePasswordChange(
                            index,
                            e.target.value
                          )
                        }
                        placeholder="Isi password baru"
                        className="
                          w-full
                          border
                          border-gray-300
                          rounded-lg
                          px-4
                          py-2
                          outline-none
                          focus:ring-2
                          focus:ring-blue-400
                        "
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}