import React, { useState } from "react";
import Swal from "sweetalert2";

export default function SettingKomponenGaji() {
  const [data, setData] = useState([
    {
      id: 1,
      nama: "Bon Gaji November",
      jenis: "Potongan",
      perhitungan: "Persentase",
      nominal: "100%",
      keterangan: "",
    },
    {
      id: 2,
      nama: "Tunjangan Keluarga",
      jenis: "Tunjangan",
      perhitungan: "Tetap",
      nominal: "Rp1.000.000",
      keterangan: "",
    },
    {
      id: 3,
      nama: "Tunjangan Pasangan",
      jenis: "Tunjangan",
      perhitungan: "Persentase",
      nominal: "10%",
      keterangan: "",
    },
    {
      id: 4,
      nama: "Tunjangan Koperasi",
      jenis: "Tunjangan",
      perhitungan: "Tetap",
      nominal: "Rp50.000",
      keterangan: "Iuran wajib koperasi",
    },
    {
      id: 5,
      nama: "Gaji Pokok (Kepsek)",
      jenis: "Gaji Pokok",
      perhitungan: "Tetap",
      nominal: "Rp4.000.000",
      keterangan: "",
    },
  ]);

  // =========================
  // BADGE WARNA
  // =========================
  const getBadge = (jenis) => {
    if (jenis === "Potongan") {
      return "bg-red-500";
    }

    if (jenis === "Tunjangan") {
      return "bg-green-500";
    }

    return "bg-pink-500";
  };

  // =========================
  // TAMBAH
  // =========================
  const tambahData = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Tambah Komponen Gaji",
      html: `
        <input id="nama" class="swal2-input" placeholder="Nama Komponen">

        <select id="jenis" class="swal2-input">
          <option value="">Pilih Jenis</option>
          <option value="Potongan">Potongan</option>
          <option value="Tunjangan">Tunjangan</option>
          <option value="Gaji Pokok">Gaji Pokok</option>
        </select>

        <select id="perhitungan" class="swal2-input">
          <option value="">Pilih Perhitungan</option>
          <option value="Tetap">Tetap</option>
          <option value="Persentase">Persentase</option>
          <option value="Index">Index</option>
        </select>

        <input id="nominal" class="swal2-input" placeholder="Nominal">
        <input id="keterangan" class="swal2-input" placeholder="Keterangan">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",

      preConfirm: () => {
        const nama = document.getElementById("nama").value;
        const jenis = document.getElementById("jenis").value;
        const perhitungan =
          document.getElementById("perhitungan").value;
        const nominal = document.getElementById("nominal").value;
        const keterangan =
          document.getElementById("keterangan").value;

        if (!nama || !jenis || !perhitungan || !nominal) {
          Swal.showValidationMessage(
            "Semua field wajib diisi"
          );
          return false;
        }

        return {
          nama,
          jenis,
          perhitungan,
          nominal,
          keterangan,
        };
      },
    });

    if (formValues) {
      setData([
        ...data,
        {
          id: Date.now(),
          ...formValues,
        },
      ]);

      Swal.fire(
        "Berhasil",
        "Data berhasil ditambahkan",
        "success"
      );
    }
  };

  // =========================
  // EDIT
  // =========================
  const editData = async (item) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Komponen Gaji",
      html: `
        <input 
          id="nama" 
          class="swal2-input" 
          value="${item.nama}"
        >

        <select id="jenis" class="swal2-input">
          <option value="Potongan" ${
            item.jenis === "Potongan" ? "selected" : ""
          }>Potongan</option>

          <option value="Tunjangan" ${
            item.jenis === "Tunjangan" ? "selected" : ""
          }>Tunjangan</option>

          <option value="Gaji Pokok" ${
            item.jenis === "Gaji Pokok" ? "selected" : ""
          }>Gaji Pokok</option>
        </select>

        <select id="perhitungan" class="swal2-input">
          <option value="Tetap" ${
            item.perhitungan === "Tetap" ? "selected" : ""
          }>Tetap</option>

          <option value="Persentase" ${
            item.perhitungan === "Persentase"
              ? "selected"
              : ""
          }>Persentase</option>

          <option value="Index" ${
            item.perhitungan === "Index" ? "selected" : ""
          }>Index</option>
        </select>

        <input 
          id="nominal" 
          class="swal2-input" 
          value="${item.nominal}"
        >

        <input 
          id="keterangan" 
          class="swal2-input" 
          value="${item.keterangan}"
        >
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Batal",

      preConfirm: () => {
        const nama = document.getElementById("nama").value;
        const jenis = document.getElementById("jenis").value;
        const perhitungan =
          document.getElementById("perhitungan").value;
        const nominal = document.getElementById("nominal").value;
        const keterangan =
          document.getElementById("keterangan").value;

        if (!nama || !jenis || !perhitungan || !nominal) {
          Swal.showValidationMessage(
            "Semua field wajib diisi"
          );
          return false;
        }

        return {
          nama,
          jenis,
          perhitungan,
          nominal,
          keterangan,
        };
      },
    });

    if (formValues) {
      setData(
        data.map((row) =>
          row.id === item.id
            ? {
                ...row,
                ...formValues,
              }
            : row
        )
      );

      Swal.fire(
        "Berhasil",
        "Data berhasil diupdate",
        "success"
      );
    }
  };

  // =========================
  // HAPUS
  // =========================
  const hapusData = (id) => {
    Swal.fire({
      title: "Yakin hapus data?",
      text: "Data tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setData(data.filter((item) => item.id !== id));

        Swal.fire(
          "Berhasil",
          "Data berhasil dihapus",
          "success"
        );
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded border shadow-sm">
        {/* HEADER */}
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h1 className="font-semibold text-gray-700">
            Setting Komponen Gaji
          </h1>

          <button
            onClick={tambahData}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
          >
            Tambah Komponen
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">
                  #
                </th>

                <th className="border px-3 py-2 text-left">
                  Nama Komponen
                </th>

                <th className="border px-3 py-2 text-left">
                  Jenis
                </th>

                <th className="border px-3 py-2 text-left">
                  Perhitungan
                </th>

                <th className="border px-3 py-2 text-left">
                  Nominal
                </th>

                <th className="border px-3 py-2 text-left">
                  Keterangan
                </th>

                <th className="border px-3 py-2 text-left">
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
                  <td className="border px-3 py-2">
                    {index + 1}
                  </td>

                  <td className="border px-3 py-2">
                    {item.nama}
                  </td>

                  <td className="border px-3 py-2">
                    <span
                      className={`${getBadge(
                        item.jenis
                      )} text-white text-xs px-2 py-1 rounded font-medium`}
                    >
                      {item.jenis}
                    </span>
                  </td>

                  <td className="border px-3 py-2">
                    {item.perhitungan}
                  </td>

                  <td className="border px-3 py-2">
                    {item.nominal}
                  </td>

                  <td className="border px-3 py-2">
                    {item.keterangan}
                  </td>

                  <td className="border px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => editData(item)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => hapusData(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Hapus
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