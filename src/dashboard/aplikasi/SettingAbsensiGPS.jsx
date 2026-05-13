import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function SettingAbsensiGPS() {
  const [lokasi, setLokasi] = useState([
    {
      id: 1,
      nama: "Absen Masuk",
      latitude: "-7.031635283433556",
      longitude: "110.33717744635996",
      radius: "500000 m",
      masuk: "17:00",
      selesai: "22:10",
    },
    {
      id: 2,
      nama: "Absen Masuk",
      latitude: "-7.050068140205195",
      longitude: "110.38925174565205",
      radius: "100 m",
      masuk: "05:00",
      selesai: "07:00",
    },
    {
      id: 3,
      nama: "Absen Pulang",
      latitude: "-7.050068587555647",
      longitude: "110.38934177489269",
      radius: "100 m",
      masuk: "10:00",
      selesai: "14:00",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    nama: "",
    latitude: "",
    longitude: "",
    radius: "",
    masuk: "",
    selesai: "",
  });

  // HANDLE CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // HANDLE TAMBAH
  const handleTambah = () => {
    if (
      !form.nama ||
      !form.latitude ||
      !form.longitude ||
      !form.radius ||
      !form.masuk ||
      !form.selesai
    ) {
      Swal.fire({
        icon: "warning",
        title: "Form Belum Lengkap",
        text: "Semua field wajib diisi",
        confirmButtonColor: "#2563eb",
      });

      return;
    }

    Swal.fire({
      title: "Menyimpan Data...",
      text: "Mohon tunggu sebentar",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      const newData = {
        id: lokasi.length + 1,
        ...form,
      };

      setLokasi([...lokasi, newData]);

      setForm({
        nama: "",
        latitude: "",
        longitude: "",
        radius: "",
        masuk: "",
        selesai: "",
      });

      setShowModal(false);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Lokasi absensi berhasil ditambahkan",
        confirmButtonColor: "#2563eb",
      });
    }, 1500);
  };

  // HANDLE HAPUS
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Lokasi?",
      text: "Data lokasi akan dihapus permanen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setLokasi(
        lokasi.filter((item) => item.id !== id)
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Lokasi berhasil dihapus",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        {/* HEADER */}
        <div className="bg-blue-600 px-5 py-4 flex justify-between items-center">

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-white" />

            <h1 className="text-white font-semibold text-lg">
              Lokasi Absensi
            </h1>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="
              bg-white
              text-blue-600
              hover:bg-blue-50
              px-4 py-2
              rounded-lg
              text-sm
              font-medium
              flex
              items-center
              gap-2
              transition
            "
          >
            <FaPlus />
            Tambah Lokasi
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3 text-sm">
                  #
                </th>

                <th className="border px-4 py-3 text-sm">
                  Nama Lokasi
                </th>

                <th className="border px-4 py-3 text-sm">
                  Latitude
                </th>

                <th className="border px-4 py-3 text-sm">
                  Longitude
                </th>

                <th className="border px-4 py-3 text-sm">
                  Radius
                </th>

                <th className="border px-4 py-3 text-sm">
                  Jam Masuk
                </th>

                <th className="border px-4 py-3 text-sm">
                  Jam Selesai
                </th>

                <th className="border px-4 py-3 text-sm">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {lokasi.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="border px-4 py-3 text-center text-sm">
                    {index + 1}
                  </td>

                  <td className="border px-4 py-3 text-sm font-medium">
                    {item.nama}
                  </td>

                  <td className="border px-4 py-3 text-sm">
                    <span className="bg-cyan-500 text-white px-2 py-1 rounded text-xs">
                      {item.latitude}
                    </span>
                  </td>

                  <td className="border px-4 py-3 text-sm">
                    <span className="bg-cyan-500 text-white px-2 py-1 rounded text-xs">
                      {item.longitude}
                    </span>
                  </td>

                  <td className="border px-4 py-3 text-sm text-center">
                    <span className="bg-gray-600 text-white px-2 py-1 rounded text-xs">
                      {item.radius}
                    </span>
                  </td>

                  <td className="border px-4 py-3 text-sm text-center">
                    {item.masuk}
                  </td>

                  <td className="border px-4 py-3 text-sm text-center">
                    {item.selesai}
                  </td>

                  <td className="border px-4 py-3">
                    <div className="flex justify-center gap-2">

                      {/* EDIT */}
                      <button
                        className="
                          bg-yellow-400
                          hover:bg-yellow-500
                          text-black
                          p-2
                          rounded-md
                          transition
                        "
                      >
                        <FaEdit />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        className="
                          bg-red-500
                          hover:bg-red-600
                          text-white
                          p-2
                          rounded-md
                          transition
                        "
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

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl shadow-2xl w-[500px] overflow-hidden">

            {/* HEADER MODAL */}
            <div className="bg-blue-600 px-5 py-4 flex justify-between items-center">

              <h2 className="text-white font-semibold text-lg">
                Tambah Lokasi Absensi
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-white text-lg"
              >
                <FaTimes />
              </button>
            </div>

            {/* BODY */}
            <div className="p-5 space-y-4">

              {/* NAMA */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Nama Lokasi
                </label>

                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lokasi"
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4 py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />
              </div>

              {/* LATITUDE */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Latitude
                </label>

                <input
                  type="text"
                  name="latitude"
                  value={form.latitude}
                  onChange={handleChange}
                  placeholder="-7.0316352"
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4 py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />
              </div>

              {/* LONGITUDE */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Longitude
                </label>

                <input
                  type="text"
                  name="longitude"
                  value={form.longitude}
                  onChange={handleChange}
                  placeholder="110.3371774"
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4 py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />
              </div>

              {/* RADIUS */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Radius
                </label>

                <input
                  type="text"
                  name="radius"
                  value={form.radius}
                  onChange={handleChange}
                  placeholder="100 m"
                  className="
                    w-full
                    border
                    rounded-xl
                    px-4 py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />
              </div>

              {/* JAM */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Jam Masuk
                  </label>

                  <input
                    type="time"
                    name="masuk"
                    value={form.masuk}
                    onChange={handleChange}
                    className="
                      w-full
                      border
                      rounded-xl
                      px-4 py-3
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Jam Selesai
                  </label>

                  <input
                    type="time"
                    name="selesai"
                    value={form.selesai}
                    onChange={handleChange}
                    className="
                      w-full
                      border
                      rounded-xl
                      px-4 py-3
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  />
                </div>

              </div>
            </div>

            {/* FOOTER */}
            <div className="border-t px-5 py-4 flex justify-end gap-3 bg-gray-50">

              <button
                onClick={() => setShowModal(false)}
                className="
                  bg-gray-500
                  hover:bg-gray-600
                  text-white
                  px-4 py-2
                  rounded-lg
                  flex
                  items-center
                  gap-2
                "
              >
                <FaTimes />
                Batal
              </button>

              <button
                onClick={handleTambah}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-4 py-2
                  rounded-lg
                  flex
                  items-center
                  gap-2
                "
              >
                <FaSave />
                Simpan
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}