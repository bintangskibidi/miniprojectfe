import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  FaCalendarAlt,
  FaPlus,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

export default function ManajemenTanggal() {
  const [tanggalList, setTanggalList] = useState([]);

  // =========================
  // TAMBAH TANGGAL
  // =========================
  const tambahTanggal = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Tambah Tanggal",
      html: `
        <input 
          type="number"
          id="tanggal"
          class="swal2-input"
          placeholder="Masukkan tanggal 1-31"
          min="1"
          max="31"
        >
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",

      preConfirm: () => {
        const tanggal =
          document.getElementById("tanggal").value;

        if (!tanggal) {
          Swal.showValidationMessage(
            "Tanggal wajib diisi"
          );
          return false;
        }

        if (tanggal < 1 || tanggal > 31) {
          Swal.showValidationMessage(
            "Tanggal harus antara 1 - 31"
          );
          return false;
        }

        const sudahAda = tanggalList.find(
          (item) => item.tanggal == tanggal
        );

        if (sudahAda) {
          Swal.showValidationMessage(
            "Tanggal sudah ada"
          );
          return false;
        }

        return {
          tanggal,
        };
      },
    });

    if (formValues) {
      setTanggalList([
        ...tanggalList,
        {
          id: Date.now(),
          tanggal: formValues.tanggal,
          status: "Aktif",
        },
      ]);

      Swal.fire(
        "Berhasil",
        "Tanggal berhasil ditambahkan",
        "success"
      );
    }
  };

  // =========================
  // HAPUS
  // =========================
  const hapusTanggal = (id) => {
    Swal.fire({
      title: "Hapus tanggal?",
      text: "Data tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setTanggalList(
          tanggalList.filter((item) => item.id !== id)
        );

        Swal.fire(
          "Berhasil",
          "Tanggal berhasil dihapus",
          "success"
        );
      }
    });
  };

  // =========================
  // STATUS
  // =========================
  const totalTanggal = tanggalList.length;

  const tanggalAktif =
    tanggalList.length > 0
      ? tanggalList[0].tanggal
      : "-";

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            📅 Manajemen Tanggal
          </h1>

          <p className="text-sm text-gray-500">
            Kelola tanggal 1-31 untuk periode sistem
          </p>
        </div>

        <button
          onClick={tambahTanggal}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus />
          Tambah Tanggal
        </button>
      </div>

      {/* CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        {/* CARD 1 */}
        <div className="bg-white border border-blue-500 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl">
            <FaCalendarAlt />
          </div>

          <div>
            <h2 className="font-semibold text-gray-700">
              Tanggal Aktif
            </h2>

            <p className="text-lg text-gray-800">
              {tanggalAktif}
            </p>
          </div>
        </div>

        {/* CARD 2 */}
        <div className="bg-white border border-cyan-400 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xl">
            ☰
          </div>

          <div>
            <h2 className="font-semibold text-gray-700">
              Total Tanggal
            </h2>

            <p className="text-lg text-cyan-600">
              {totalTanggal}
            </p>

            <p className="text-xs text-gray-500">
              Maksimal 31
            </p>
          </div>
        </div>

        {/* CARD 3 */}
        <div className="bg-white border border-yellow-500 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xl">
            !
          </div>

          <div>
            <h2 className="font-semibold text-gray-700">
              Status Sistem
            </h2>

            <p className="font-semibold text-yellow-500">
              {tanggalList.length > 0
                ? "Aktif"
                : "Belum Aktif"}
            </p>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow-sm border overflow-hidden">
        {/* HEADER TABLE */}
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h1 className="font-semibold text-gray-700 flex items-center gap-2">
            📋 Daftar Tanggal
          </h1>

          <p className="text-xs text-gray-500">
            Urut: 1-31
          </p>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-4 py-3 text-left">
                  NO
                </th>

                <th className="border px-4 py-3 text-center">
                  TANGGAL
                </th>

                <th className="border px-4 py-3 text-center">
                  STATUS
                </th>

                <th className="border px-4 py-3 text-center">
                  AKSI
                </th>
              </tr>
            </thead>

            <tbody>
              {tanggalList.length > 0 ? (
                tanggalList.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="border px-4 py-3">
                      {index + 1}
                    </td>

                    <td className="border px-4 py-3 text-center font-semibold">
                      {item.tanggal}
                    </td>

                    <td className="border px-4 py-3 text-center">
                      <span className="bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full inline-flex items-center gap-1">
                        <FaCheckCircle />
                        Aktif
                      </span>
                    </td>

                    <td className="border px-4 py-3 text-center">
                      <button
                        onClick={() =>
                          hapusTanggal(item.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-2 rounded inline-flex items-center gap-1"
                      >
                        <FaTrash />
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FaTimesCircle className="text-5xl mb-3 text-gray-400" />

                      <p className="mb-4">
                        Belum ada data tanggal
                      </p>

                      <button
                        onClick={tambahTanggal}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded flex items-center gap-2"
                      >
                        <FaPlus />
                        Tambah Tanggal Pertama
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}