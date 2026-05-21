import React, { useState, useEffect } from "react";
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
import api from "../../utils/api"; // Pastikan path instance axios Anda sudah benar

import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  useMapEvents,
  useMap,
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

// Sub-komponen untuk menggeser peta otomatis ke koordinat baru
function RecenterMap({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);
  return null;
}

export default function SettingAbsensiGPS() {
  const [lokasi, setLokasi] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  // --- FETCH DATA DARI BACKEND ---
  const fetchLokasi = async () => {
    setLoading(true);
    try {
      const response = await api.get("/settingabsensi");
      setLokasi(response.data.data || []);
    } catch (error) {
      console.error("Gagal mengambil data lokasi:", error);
      Swal.fire("Error", "Gagal mengambil data dari server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLokasi();
  }, []);

  // HANDLE CHANGE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // RESET FORM & TUTUP MODAL
  const handleCloseModal = () => {
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
    setIsEdit(false);
    setEditId(null);
    setShowModal(false);
  };

  // --- TRIGGER MODE EDIT ---
  const handleEditClick = (item) => {
    setIsEdit(true);
    setEditId(item.id);
    setForm({
      nama: item.nama,
      hari: item.hari || "",
      pegawai: item.pegawai || "",
      latitude: item.latitude,
      longitude: item.longitude,
      radius: item.radius,
      masuk: item.masuk,
      selesai: item.selesai,
    });
    setShowModal(true);
  };

  // --- HANDLE DETEKSI LOKASI OTOMATIS (GEOLOCATION) ---
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      Swal.fire("Gagal", "Geolocation tidak didukung oleh browser Anda", "error");
      return;
    }

    Swal.fire({
      title: "Mencari Lokasi...",
      text: "Mengambil koordinat GPS perangkat Anda",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((prev) => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(15),
          longitude: position.coords.longitude.toFixed(15),
        }));
        Swal.close();
      },
      (error) => {
        console.error(error);
        Swal.fire("Gagal", "Tidak dapat mendeteksi lokasi. Pastikan izin lokasi aktif.", "error");
      },
      { enableHighAccuracy: true }
    );
  };

  // --- HANDLE COPY KOORDINAT ---
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: "success",
      title: "Tersalin",
      text: `Koordinat ${text} berhasil disalin`,
      timer: 1000,
      showConfirmButton: false,
    });
  };

  // --- HANDLE SIMPAN DATA (TAMBAH / EDIT) ---
  const handleSimpan = async () => {
    // Validasi Kelengkapan Form
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
        title: "Form Belum Lengkap",
        text: "Semua field wajib diisi",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    Swal.fire({
      title: isEdit ? "Mengubah Data..." : "Menyimpan Data...",
      text: "Mohon tunggu sebentar",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      if (isEdit) {
        // --- JIKA MODE EDIT (PUT) ---
        const response = await api.put(`/settingabsensi/${editId}`, form);
        
        if (response.data.status) {
          // Update data di state lokal secara langsung
          setLokasi((prevLokasi) =>
            prevLokasi.map((item) =>
              item.id === editId ? { ...item, ...form } : item
            )
          );

          handleCloseModal();

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Lokasi absensi berhasil diperbarui",
            confirmButtonColor: "#2563eb",
          });
        }
      } else {
        // --- JIKA MODE TAMBAH (POST) ---
        const response = await api.post("/settingabsensi", form);
        
        if (response.data.status) {
          const newData = response.data.data;
          setLokasi((prevLokasi) => [...prevLokasi, newData]);

          handleCloseModal();

          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Lokasi absensi berhasil ditambahkan",
            confirmButtonColor: "#2563eb",
          });
        }
      }
    } catch (error) {
      console.error("Gagal menyimpan lokasi:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Menyimpan",
        text: error.response?.data?.message || "Terjadi kesalahan pada server.",
      });
    }
  };

  // --- HANDLE HAPUS (DELETE) ---
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Hapus Lokasi?",
      text: "Data lokasi akan dihapus permanen dari database",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/settingabsensi/${id}`);
        setLokasi(lokasi.filter((item) => item.id !== id));

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Lokasi berhasil dihapus",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Gagal menghapus lokasi:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal Hapus",
          text: "Tidak dapat menghapus data dari server.",
        });
      }
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
            <h1 className="text-white font-semibold text-lg">Lokasi Absensi</h1>
          </div>

          <button
            onClick={() => {
              setIsEdit(false);
              setShowModal(true);
            }}
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
          >
            <FaPlus />
            Tambah Lokasi
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-10 text-gray-500">Memuat data lokasi...</div>
          ) : (
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
                          onClick={() => handleEditClick(item)}
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
          )}
        </div>
      </div>

      {/* MODAL FORM (TAMBAH & EDIT DATA BERBAGI UI YANG SAMA) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden">
            {/* HEADER */}
            <div className="flex justify-between items-center px-5 py-4 border-b">
              <h2 className="text-xl font-semibold">
                {isEdit ? "Ubah Lokasi Absensi" : "Tambah Lokasi Absensi"}
              </h2>

              <button
                onClick={handleCloseModal}
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
                      type="button"
                      onClick={handleGetLocation}
                      className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700 transition"
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
                  center={
                    form.latitude && form.longitude
                      ? [parseFloat(form.latitude), parseFloat(form.longitude)]
                      : [-6.2, 106.816666]
                  }
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
                      <RecenterMap
                        lat={parseFloat(form.latitude)}
                        lng={parseFloat(form.longitude)}
                      />
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
                onClick={handleCloseModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
              >
                Batal
              </button>

              <button
                onClick={handleSimpan}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2"
              >
                <FaSave />
                {isEdit ? "Simpan Perubahan" : "Tambah"}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}