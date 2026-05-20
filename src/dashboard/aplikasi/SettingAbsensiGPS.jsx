import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";
import api from "../../utils/api"; // Pastikan path instance axios Anda sudah benar

export default function SettingAbsensiGPS() {
  const [lokasi, setLokasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false); // State untuk penanda mode Edit
  const [editId, setEditId] = useState(null); // State untuk menyimpan ID data yang diedit

  const [form, setForm] = useState({
    nama: "",
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
      latitude: item.latitude,
      longitude: item.longitude,
      radius: item.radius,
      masuk: item.masuk,
      selesai: item.selesai,
    });
    setShowModal(true);
  };

  // --- HANDLE SIMPAN DATA (TAMBAH / EDIT) ---
  const handleSimpan = async () => {
    // Validasi Kelengkapan Form
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
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
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
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-3 text-sm">#</th>
                <th className="border px-4 py-3 text-sm">Nama Lokasi</th>
                <th className="border px-4 py-3 text-sm">Latitude</th>
                <th className="border px-4 py-3 text-sm">Longitude</th>
                <th className="border px-4 py-3 text-sm">Radius</th>
                <th className="border px-4 py-3 text-sm">Jam Masuk</th>
                <th className="border px-4 py-3 text-sm">Jam Selesai</th>
                <th className="border px-4 py-3 text-sm">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-gray-500">
                    Memuat data lokasi absensi...
                  </td>
                </tr>
              ) : lokasi.length > 0 ? (
                lokasi.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
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
                          onClick={() => handleEditClick(item)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-black p-2 rounded-md transition"
                        >
                          <FaEdit />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-10 text-gray-500">
                    Tidak ada data lokasi absensi tersedia
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL FORM (TAMBAH & EDIT DATA BERBAGI UI YANG SAMA) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-[500px] flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* HEADER MODAL */}
            <div className="bg-blue-600 px-5 py-4 flex justify-between items-center shrink-0">
              <h2 className="text-white font-semibold text-lg">
                {isEdit ? "Edit Lokasi Absensi" : "Tambah Lokasi Absensi"}
              </h2>
              <button onClick={handleCloseModal} className="text-white text-lg">
                <FaTimes />
              </button>
            </div>

            {/* BODY MODAL */}
            <div className="p-5 space-y-4 overflow-y-auto max-h-[60vh]">
              {/* NAMA */}
              <div>
                <label className="block text-sm font-medium mb-2">Nama Lokasi</label>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama lokasi"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* LATITUDE */}
              <div>
                <label className="block text-sm font-medium mb-2">Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  value={form.latitude}
                  onChange={handleChange}
                  placeholder="-7.0316352"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* LONGITUDE */}
              <div>
                <label className="block text-sm font-medium mb-2">Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  value={form.longitude}
                  onChange={handleChange}
                  placeholder="110.3371774"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* RADIUS */}
              <div>
                <label className="block text-sm font-medium mb-2">Radius</label>
                <input
                  type="text"
                  name="radius"
                  value={form.radius}
                  onChange={handleChange}
                  placeholder="100 m"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* JAM MASUK & SELESAI */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Jam Masuk</label>
                  <input
                    type="time"
                    name="masuk"
                    value={form.masuk}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Jam Selesai</label>
                  <input
                    type="time"
                    name="selesai"
                    value={form.selesai}
                    onChange={handleChange}
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* FOOTER MODAL */}
            <div className="border-t px-5 py-4 flex justify-end gap-3 bg-gray-50 shrink-0">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
              >
                <FaTimes />
                Batal
              </button>

              <button
                onClick={handleSimpan}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
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