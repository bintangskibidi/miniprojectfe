import React, { useState } from "react";
import Swal from "sweetalert2";

export default function KriteriaKehadiran() {
  const [kriteria, setKriteria] = useState([
    {
      id: 1,
      nama: "Terlambat",
      kategori: "terlambat",
      potongan: false,
      tunjangan: false,
      range: true,
    },
    {
      id: 2,
      nama: "Uang Makan Harian",
      kategori: "lainnya",
      potongan: false,
      tunjangan: true,
      range: false,
    },
    {
      id: 3,
      nama: "Potongan UKK",
      kategori: "lainnya",
      potongan: false,
      tunjangan: false,
      range: true,
    },
  ]);

  const [settingGaji, setSettingGaji] = useState([
    {
      id: 1,
      kriteria: "Terlambat",
      durasi: "1 - 40 menit",
      jenis: "potongan",
      satuan: "persen",
      nominal: "10% (Acuan: Rp 20.000)",
      keterangan: "",
    },
    {
      id: 2,
      kriteria: "Uang Makan Harian",
      durasi: "-",
      jenis: "tunjangan",
      satuan: "nominal",
      nominal: "Rp 40.000",
      keterangan: "",
    },
  ]);

  // =========================
  // TAMBAH KRITERIA
  // =========================
  const tambahKriteria = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Tambah Kriteria",
      html: `
        <input id="nama" class="swal2-input" placeholder="Nama">
        <input id="kategori" class="swal2-input" placeholder="Kategori">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",

      preConfirm: () => {
        const nama = document.getElementById("nama").value;
        const kategori = document.getElementById("kategori").value;

        if (!nama || !kategori) {
          Swal.showValidationMessage("Semua field wajib diisi");
          return false;
        }

        return {
          nama,
          kategori,
        };
      },
    });

    if (formValues) {
      setKriteria([
        ...kriteria,
        {
          id: Date.now(),
          nama: formValues.nama,
          kategori: formValues.kategori,
          potongan: false,
          tunjangan: false,
          range: false,
        },
      ]);

      Swal.fire("Berhasil", "Data berhasil ditambahkan", "success");
    }
  };

  // =========================
  // EDIT KRITERIA
  // =========================
  const editKriteria = async (item) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Kriteria",
      html: `
        <input id="nama" class="swal2-input" value="${item.nama}">
        <input id="kategori" class="swal2-input" value="${item.kategori}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Batal",

      preConfirm: () => {
        const nama = document.getElementById("nama").value;
        const kategori = document.getElementById("kategori").value;

        if (!nama || !kategori) {
          Swal.showValidationMessage("Semua field wajib diisi");
          return false;
        }

        return {
          nama,
          kategori,
        };
      },
    });

    if (formValues) {
      setKriteria(
        kriteria.map((data) =>
          data.id === item.id
            ? {
                ...data,
                nama: formValues.nama,
                kategori: formValues.kategori,
              }
            : data
        )
      );

      Swal.fire("Berhasil", "Data berhasil diupdate", "success");
    }
  };

  // =========================
  // HAPUS KRITERIA
  // =========================
  const hapusKriteria = (id) => {
    Swal.fire({
      title: "Yakin hapus data?",
      text: "Data tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setKriteria(kriteria.filter((item) => item.id !== id));

        Swal.fire("Berhasil", "Data berhasil dihapus", "success");
      }
    });
  };

  // =========================
  // TAMBAH SETTING GAJI
  // =========================
  const tambahSetting = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Tambah Setting",
      html: `
        <input id="kriteria" class="swal2-input" placeholder="Kriteria">
        <input id="durasi" class="swal2-input" placeholder="Durasi">
        <input id="jenis" class="swal2-input" placeholder="Jenis">
        <input id="satuan" class="swal2-input" placeholder="Satuan">
        <input id="nominal" class="swal2-input" placeholder="Nominal">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",

      preConfirm: () => {
        const kriteria = document.getElementById("kriteria").value;
        const durasi = document.getElementById("durasi").value;
        const jenis = document.getElementById("jenis").value;
        const satuan = document.getElementById("satuan").value;
        const nominal = document.getElementById("nominal").value;

        if (
          !kriteria ||
          !durasi ||
          !jenis ||
          !satuan ||
          !nominal
        ) {
          Swal.showValidationMessage("Semua field wajib diisi");
          return false;
        }

        return {
          kriteria,
          durasi,
          jenis,
          satuan,
          nominal,
        };
      },
    });

    if (formValues) {
      setSettingGaji([
        ...settingGaji,
        {
          id: Date.now(),
          ...formValues,
          keterangan: "",
        },
      ]);

      Swal.fire("Berhasil", "Data berhasil ditambahkan", "success");
    }
  };

  // =========================
  // EDIT SETTING
  // =========================
  const editSetting = async (item) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Setting",
      html: `
        <input id="kriteria" class="swal2-input" value="${item.kriteria}">
        <input id="durasi" class="swal2-input" value="${item.durasi}">
        <input id="jenis" class="swal2-input" value="${item.jenis}">
        <input id="satuan" class="swal2-input" value="${item.satuan}">
        <input id="nominal" class="swal2-input" value="${item.nominal}">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Batal",

      preConfirm: () => {
        const kriteria = document.getElementById("kriteria").value;
        const durasi = document.getElementById("durasi").value;
        const jenis = document.getElementById("jenis").value;
        const satuan = document.getElementById("satuan").value;
        const nominal = document.getElementById("nominal").value;

        if (
          !kriteria ||
          !durasi ||
          !jenis ||
          !satuan ||
          !nominal
        ) {
          Swal.showValidationMessage("Semua field wajib diisi");
          return false;
        }

        return {
          kriteria,
          durasi,
          jenis,
          satuan,
          nominal,
        };
      },
    });

    if (formValues) {
      setSettingGaji(
        settingGaji.map((data) =>
          data.id === item.id
            ? {
                ...data,
                ...formValues,
              }
            : data
        )
      );

      Swal.fire("Berhasil", "Data berhasil diupdate", "success");
    }
  };

  // =========================
  // HAPUS SETTING
  // =========================
  const hapusSetting = (id) => {
    Swal.fire({
      title: "Hapus data?",
      text: "Data tidak bisa dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setSettingGaji(settingGaji.filter((item) => item.id !== id));

        Swal.fire("Berhasil", "Data berhasil dihapus", "success");
      }
    });
  };

  // =========================
  // COPY SETTING
  // =========================
  const copySetting = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
    };

    setSettingGaji([...settingGaji, newItem]);

    Swal.fire("Berhasil", "Data berhasil dicopy", "success");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ======================== */}
      {/* KRITERIA KEHADIRAN */}
      {/* ======================== */}
      <div className="bg-white border rounded shadow-sm mb-6">
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h1 className="font-semibold text-gray-700">
            Kriteria Kehadiran
          </h1>

          <button
            onClick={tambahKriteria}
            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded"
          >
            + Tambah Kriteria
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">#</th>
                <th className="border px-3 py-2 text-left">Nama</th>
                <th className="border px-3 py-2 text-left">Kategori</th>
                <th className="border px-3 py-2 text-left">Potongan</th>
                <th className="border px-3 py-2 text-left">Tunjangan</th>
                <th className="border px-3 py-2 text-left">
                  Range Durasi
                </th>
                <th className="border px-3 py-2 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {kriteria.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{index + 1}</td>
                  <td className="border px-3 py-2">{item.nama}</td>
                  <td className="border px-3 py-2">{item.kategori}</td>
                  <td className="border px-3 py-2">
                    {item.potongan ? "✓" : "✗"}
                  </td>
                  <td className="border px-3 py-2">
                    {item.tunjangan ? "✓" : "✗"}
                  </td>
                  <td className="border px-3 py-2">
                    {item.range ? "✓" : "✗"}
                  </td>

                  <td className="border px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => editKriteria(item)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => hapusKriteria(item.id)}
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

      {/* ======================== */}
      {/* SETTING GAJI */}
      {/* ======================== */}
      <div className="bg-white border rounded shadow-sm">
        <div className="flex justify-between items-center border-b px-4 py-3">
          <h1 className="font-semibold text-gray-700">
            Setting Gaji Kehadiran
          </h1>

          <button
            onClick={tambahSetting}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
          >
            + Tambah
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2 text-left">#</th>
                <th className="border px-3 py-2 text-left">Kriteria</th>
                <th className="border px-3 py-2 text-left">Durasi</th>
                <th className="border px-3 py-2 text-left">Jenis</th>
                <th className="border px-3 py-2 text-left">Satuan</th>
                <th className="border px-3 py-2 text-left">
                  Nilai / Nominal
                </th>
                <th className="border px-3 py-2 text-left">
                  Keterangan
                </th>
                <th className="border px-3 py-2 text-left">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {settingGaji.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2">{index + 1}</td>
                  <td className="border px-3 py-2">
                    {item.kriteria}
                  </td>
                  <td className="border px-3 py-2">{item.durasi}</td>
                  <td className="border px-3 py-2">{item.jenis}</td>
                  <td className="border px-3 py-2">{item.satuan}</td>
                  <td className="border px-3 py-2">
                    {item.nominal}
                  </td>
                  <td className="border px-3 py-2">
                    {item.keterangan}
                  </td>

                  <td className="border px-3 py-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => editSetting(item)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => hapusSetting(item.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Hapus
                      </button>

                      <button
                        onClick={() => copySetting(item)}
                        className="bg-cyan-500 hover:bg-cyan-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Copy
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