import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaCopy,
  FaLocationArrow,
} from "react-icons/fa";

import Swal from "sweetalert2";

import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

// FIX ICON LEAFLET
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

 
function LocationPicker({ setForm }) {
  useMapEvents({
    click(e) {
      setForm((prev) => ({
        ...prev,
        latitude: e.latlng.lat.toFixed(15),
        longitude: e.latlng.lng.toFixed(15),
      }));
    },
  });

  return null;
}

export default function SettingAbsensiGPS() {
  const [lokasi, setLokasi] = useState([
    {
      id: 1,
      nama: "Absen Masuk",
      hari: "Sabtu",
      pegawai: "Guru",
      latitude: "-7.031635238433956",
      longitude: "110.33717744639996",
      radius: "500000",
      masuk: "17:00",
      selesai: "22:10",
    },

    {
      id: 2,
      nama: "Absen Masuk",
      hari: "Rabu",
      pegawai: "Pegawai",
      latitude: "-7.050068140206195",
      longitude: "110.38925174565205",
      radius: "100",
      masuk: "05:00",
      selesai: "07:00",
    },

    {
      id: 3,
      nama: "Absen Masuk",
      hari: "Senin",
      pegawai: "Guru",
      latitude: "-7.031461318975344",
      longitude: "110.33735096454622",
      radius: "200",
      masuk: "03:50",
      selesai: "07:00",
    },

    {
      id: 4,
      nama: "Absen Pulang",
      hari: "Selasa",
      pegawai: "Pegawai",
      latitude: "-7.050068587553647",
      longitude: "110.38934177489269",
      radius: "100",
      masuk: "10:00",
      selesai: "14:00",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nama: "",
    hari: "",
    pegawai: "",
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

  // GET LOCATION
  const handleGetLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm({
          ...form,
          latitude: position.coords.latitude.toFixed(15),
          longitude: position.coords.longitude.toFixed(15),
        });

        Swal.fire({
          icon: "success",
          title: "Lokasi Berhasil Diambil",
          timer: 1500,
          showConfirmButton: false,
        });
      },

      () => {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengambil Lokasi",
        });
      }
    );
  };

  // COPY KOORDINAT
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Berhasil Disalin",
      showConfirmButton: false,
      timer: 1000,
    });
  };

const handleTambah = () => {
  if (
    !form.nama ||
    !form.hari ||
    !form.pegawai ||
    !form.latitude ||
    !form.longitude ||
    !form.radius ||
    !form.masuk ||
    !form.selesai
  ) {
    Swal.fire({
      icon: "warning",
      title: "Form belum lengkap",
      text: "Semua field wajib diisi",
    });

    return;
  }

  Swal.fire({
    title: editId ? "Mengupdate Data..." : "Menyimpan Data...",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  setTimeout(() => {

    // EDIT DATA
    if (editId) {

      const updatedData = lokasi.map((item) =>
        item.id === editId
          ? {
              ...item,
              ...form,
            }
          : item
      );

      setLokasi(updatedData);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Lokasi berhasil diupdate",
      });

    } else {

      // TAMBAH DATA
      setLokasi([
        ...lokasi,
        {
          id: lokasi.length + 1,
          ...form,
        },
      ]);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Lokasi berhasil ditambahkan",
      });
    }

    // RESET
    setForm({
      nama: "",
      hari: "",
      pegawai: "",
      latitude: "",
      longitude: "",
      radius: "",
      masuk: "",
      selesai: "",
    });

    setEditId(null);

    setShowModal(false);

  }, 1200);
};
  // HAPUS
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus lokasi?",
      text: "Data akan dihapus permanen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus",
    });

    if (result.isConfirmed) {
      setLokasi(lokasi.filter((item) => item.id !== id));

      Swal.fire({
        icon: "success",
        title: "Berhasil dihapus",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  // EDIT
const handleEdit = (item) => {
  setForm({
    nama: item.nama,
    hari: item.hari,
    pegawai: item.pegawai,
    latitude: item.latitude,
    longitude: item.longitude,
    radius: item.radius,
    masuk: item.masuk,
    selesai: item.selesai,
  });

  setEditId(item.id);

  setShowModal(true);
};

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      {/* CARD */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        {/* HEADER */}
        <div className="bg-blue-600 px-5 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-white" />

            <h1 className="text-white font-semibold text-lg">
              Lokasi Absensi
            </h1>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100"
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
                <th className="border px-3 py-3">#</th>
                <th className="border px-3 py-3">Nama Lokasi</th>
                <th className="border px-3 py-3">Hari</th>
                <th className="border px-3 py-3">Jenis Pegawai</th>
                <th className="border px-3 py-3">Latitude</th>
                <th className="border px-3 py-3">Longitude</th>
                <th className="border px-3 py-3">Radius</th>
                <th className="border px-3 py-3">Jam Mulai</th>
                <th className="border px-3 py-3">Jam Selesai</th>
                <th className="border px-3 py-3">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {lokasi.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-3 text-center">
                    {index + 1}
                  </td>

                  <td className="border px-3 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        item.nama === "Absen Masuk"
                          ? "bg-green-600"
                          : "bg-yellow-400 text-black"
                      }`}
                    >
                      {item.nama}
                    </span>
                  </td>

                  <td className="border px-3 py-3 text-center">
                    <span className="bg-cyan-500 text-white text-xs px-3 py-1 rounded-full">
                      {item.hari}
                    </span>
                  </td>

                  <td className="border px-3 py-3 text-center">
                    <span
                      className={`text-xs px-3 py-1 rounded-full text-white ${
                        item.pegawai === "Guru"
                          ? "bg-purple-600"
                          : "bg-orange-500"
                      }`}
                    >
                      {item.pegawai}
                    </span>
                  </td>

                  <td className="border px-3 py-3 text-center">
                    <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">
                      {item.latitude}
                    </span>
                  </td>

                  <td className="border px-3 py-3 text-center">
                    <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded">
                      {item.longitude}
                    </span>
                  </td>

                  <td className="border px-3 py-3 text-center">
                    <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                      {item.radius} m
                    </span>
                  </td>

                  <td className="border px-3 py-3 text-center">
                    {item.masuk}
                  </td>

                  <td className="border px-3 py-3 text-center">
                    {item.selesai}
                  </td>

                  <td className="border px-3 py-3">
                    <div className="flex justify-center gap-2">
                      {/* EDIT */}
                     <button
  onClick={() => handleEdit(item)}
  className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded text-black"
>
  <FaEdit />
</button>

                      {/* COPY */}
                      <button
                        onClick={() =>
                          handleCopy(
                            `${item.latitude}, ${item.longitude}`
                          )
                        }
                        className="bg-cyan-500 hover:bg-cyan-600 p-2 rounded text-white"
                      >
                        <FaCopy />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-500 hover:bg-red-600 p-2 rounded text-white"
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
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden">
            {/* HEADER */}
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <h2 className="text-xl font-semibold">
                Tambah Lokasi Absensi
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                <FaTimes />
              </button>
            </div>

            {/* BODY */}
            <div className="p-5">
              {/* NAMA */}
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium">
                  Nama Lokasi
                </label>

                <select
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih Jenis Absensi</option>
                  <option value="Absen Masuk">
                    Absen Masuk
                  </option>

                  <option value="Absen Pulang">
                    Absen Pulang
                  </option>
                </select>
              </div>

              {/* GRID */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* HARI */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Hari
                  </label>

                  <select
                    name="hari"
                    value={form.hari}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    <option value="">Pilih Hari</option>

                    <option>Senin</option>
                    <option>Selasa</option>
                    <option>Rabu</option>
                    <option>Kamis</option>
                    <option>Jumat</option>
                    <option>Sabtu</option>
                    <option>Minggu</option>
                  </select>
                </div>

                {/* PEGAWAI */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Jenis Pegawai
                  </label>

                  <select
                    name="pegawai"
                    value={form.pegawai}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  >
                    <option value="">
                      Pilih Jenis Pegawai
                    </option>

                    <option>Guru</option>
                    <option>Pegawai</option>
                  </select>
                </div>

                {/* LAT */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Latitude
                  </label>

                  <div className="flex">
                    <input
                      type="text"
                      name="latitude"
                      value={form.latitude}
                      onChange={handleChange}
                      className="w-full border rounded-l-lg px-4 py-3"
                    />

                    <button
                      onClick={handleGetLocation}
                      className="bg-blue-600 text-white px-4 rounded-r-lg"
                    >
                      <FaLocationArrow />
                    </button>
                  </div>
                </div>

                {/* LNG */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Longitude
                  </label>

                  <input
                    type="text"
                    name="longitude"
                    value={form.longitude}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                {/* RADIUS */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Radius (meter)
                  </label>

                  <input
                    type="number"
                    name="radius"
                    value={form.radius}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                {/* JAM */}
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Jam Mulai Absensi
                  </label>

                  <input
                    type="time"
                    name="masuk"
                    value={form.masuk}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Jam Selesai Absensi
                  </label>

                  <input
                    type="time"
                    name="selesai"
                    value={form.selesai}
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                  />
                </div>
              </div>

              {/* MAP */}
              <div className="mt-5 rounded-xl overflow-hidden border">
                <MapContainer
                  center={[-6.2, 106.816666]}
                  zoom={13}
                  style={{
                    height: "350px",
                    width: "100%",
                  }}
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <LocationPicker setForm={setForm} />

                  {form.latitude && form.longitude && (
                    <>
                      <Marker
                        position={[
                          parseFloat(form.latitude),
                          parseFloat(form.longitude),
                        ]}
                      />

                      <Circle
                        center={[
                          parseFloat(form.latitude),
                          parseFloat(form.longitude),
                        ]}
                        radius={parseInt(form.radius || 0)}
                      />
                    </>
                  )}
                </MapContainer>
              </div>
            </div>

            {/* FOOTER */}
            <div className="border-t bg-gray-50 px-5 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
              >
                Batal
              </button>

              <button
                onClick={handleTambah}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
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