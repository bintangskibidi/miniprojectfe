import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaPlusCircle } from "react-icons/fa";

export default function DanaPensiunPegawai() {
  const [data, setData] = useState([
    {
      id: 1,
      nama: "Agus Santoso",
      nip: "1234567804",
      jabatan: "Guru Ekonomi",
      unit: "0",
    },
    {
      id: 2,
      nama: "Ajis",
      nip: "11111",
      jabatan: "Guru Matematika",
      unit: "SD",
    },
    {
      id: 3,
      nama: "Andi Susanto",
      nip: "1234567893",
      jabatan: "Guru IPS",
      unit: "SD",
    },
    {
      id: 4,
      nama: "Bayu Aji Iesmana eka putra",
      nip: "1234567890",
      jabatan: "Guru Matematika",
      unit: "",
    },
    {
      id: 5,
      nama: "Eka Prasetyo",
      nip: "1234567896",
      jabatan: "Guru Bahasa Inggris",
      unit: "",
    },
  ]);

  // =========================
  // VIEW DATA
  // =========================
  const handleView = (item) => {
    Swal.fire({
      title: "Detail Pegawai",
      html: `
        <div style="text-align:left;font-size:14px">
          <p><b>Nama :</b> ${item.nama}</p>
          <p><b>NIP :</b> ${item.nip}</p>
          <p><b>Jabatan :</b> ${item.jabatan}</p>
          <p><b>Unit :</b> ${item.unit || "-"}</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Tutup",
    });
  };

  // =========================
  // TAMBAH DANA PENSIUN
  // =========================
  const handleTambah = async (pegawai) => {
    const { value: formValues } = await Swal.fire({
      title: "Tambah Dana Pensiun",
      html: `
        <input 
          id="nominal" 
          class="swal2-input" 
          placeholder="Nominal Dana Pensiun"
        >

        <input 
          id="keterangan" 
          class="swal2-input" 
          placeholder="Keterangan"
        >
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",

      preConfirm: () => {
        const nominal =
          document.getElementById("nominal").value;

        const keterangan =
          document.getElementById("keterangan").value;

        if (!nominal || !keterangan) {
          Swal.showValidationMessage(
            "Semua field wajib diisi"
          );
          return false;
        }

        return {
          nominal,
          keterangan,
        };
      },
    });

    if (formValues) {
      Swal.fire({
        title: "Berhasil",
        html: `
          Dana pensiun untuk 
          <b>${pegawai.nama}</b>
          berhasil ditambahkan
        `,
        icon: "success",
      });
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white border rounded shadow-sm overflow-hidden">
        {/* HEADER */}
        <div className="bg-blue-600 text-white px-4 py-2 font-semibold text-sm flex items-center gap-2">
          <span>💰</span>
          <span>Dana Pensiun - Data Pegawai</span>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="border border-gray-700 px-3 py-3 text-center w-14">
                  No
                </th>

                <th className="border border-gray-700 px-3 py-3 text-center">
                  Nama
                </th>

                <th className="border border-gray-700 px-3 py-3 text-center">
                  NIP
                </th>

                <th className="border border-gray-700 px-3 py-3 text-center">
                  Jabatan
                </th>

                <th className="border border-gray-700 px-3 py-3 text-center">
                  Unit
                </th>

                <th className="border border-gray-700 px-3 py-3 text-center w-40">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50"
                >
                  <td className="border px-3 py-3 text-center">
                    {index + 1}
                  </td>

                  <td className="border px-3 py-3">
                    {item.nama}
                  </td>

                  <td className="border px-3 py-3">
                    {item.nip}
                  </td>

                  <td className="border px-3 py-3">
                    {item.jabatan}
                  </td>

                  <td className="border px-3 py-3">
                    {item.unit || "-"}
                  </td>

                  <td className="border px-3 py-3">
                    <div className="flex items-center justify-center gap-2">
                      {/* VIEW */}
                      <button
                        onClick={() => handleView(item)}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs px-3 py-2 rounded flex items-center gap-1"
                      >
                        <FaEye size={12} />
                        View
                      </button>

                      {/* TAMBAH */}
                      <button
                        onClick={() => handleTambah(item)}
                        className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-2 rounded flex items-center gap-1"
                      >
                        <FaPlusCircle size={12} />
                        Tambah
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}