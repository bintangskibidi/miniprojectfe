import React, { useState } from "react";
import {
  FaImage,
  FaTrash,
  FaUpload,
  FaTimes,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function BannerAplikasi() {
  const [banners, setBanners] = useState([
    {
      id: 1,
      nama: "banner_1758514505.jpg",
      tanggal: "2025-09-22 11:15:05",
      gambar:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200",
    },
    {
      id: 2,
      nama: "banner_1757970500.jpg",
      tanggal: "2025-09-16 04:08:20",
      gambar:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  // HANDLE PILIH FILE
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // VALIDASI FORMAT
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
      ];

      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Format Tidak Didukung",
          text: "Gunakan file JPG, PNG, atau GIF",
        });

        return;
      }

      // VALIDASI SIZE
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          icon: "warning",
          title: "Ukuran Terlalu Besar",
          text: "Ukuran file maksimal 5MB",
        });

        return;
      }

      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));

      Swal.fire({
        icon: "success",
        title: "File Berhasil Dipilih",
        text: file.name,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // HANDLE UPLOAD
  const handleUpload = async () => {
    if (!selectedFile) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Pilih file terlebih dahulu!",
      });

      return;
    }

    // LOADING
    Swal.fire({
      title: "Mengupload Banner...",
      text: "Mohon tunggu sebentar",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // SIMULASI DELAY
    setTimeout(() => {
      const newBanner = {
        id: banners.length + 1,
        nama: selectedFile.name,
        tanggal: new Date().toLocaleString(),
        gambar: preview,
      };

      setBanners([...banners, newBanner]);

      setSelectedFile(null);
      setPreview("");
      setShowModal(false);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Banner berhasil diupload",
        confirmButtonColor: "#2563eb",
      });
    }, 1500);
  };

  // HANDLE HAPUS
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin ingin menghapus?",
      text: "Banner yang dihapus tidak dapat dikembalikan",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      setBanners(banners.filter((item) => item.id !== id));

      Swal.fire({
        icon: "success",
        title: "Terhapus!",
        text: "Banner berhasil dihapus",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="flex items-center gap-2 mb-5">
        <FaImage className="text-gray-700 text-xl" />

        <h1 className="text-2xl font-bold text-gray-800">
          Kelola Banner Aplikasi
        </h1>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => setShowModal(true)}
        className="mb-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow"
      >
        <FaUpload />
        Upload Banner Baru
      </button>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-3 text-left">#</th>
              <th className="border px-4 py-3 text-left">Preview</th>
              <th className="border px-4 py-3 text-left">Nama File</th>
              <th className="border px-4 py-3 text-left">Diunggah</th>
              <th className="border px-4 py-3 text-left">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {banners.map((item, index) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="border px-4 py-3">
                  {index + 1}
                </td>

                <td className="border px-4 py-3">
                  <img
                    src={item.gambar}
                    alt="banner"
                    className="w-32 h-16 object-cover rounded-md border"
                  />
                </td>

                <td className="border px-4 py-3 text-sm">
                  {item.nama}
                </td>

                <td className="border px-4 py-3 text-sm">
                  {item.tanggal}
                </td>

                <td className="border px-4 py-3">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md flex items-center gap-2 text-sm"
                  >
                    <FaTrash />
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-2xl w-[450px] overflow-hidden">

            {/* HEADER */}
            <div className="flex items-center justify-between px-5 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Upload Banner Baru
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                <FaTimes />
              </button>
            </div>

            {/* BODY */}
            <div className="p-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Banner
              </label>

              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-medium
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700"
              />

              <p className="text-xs text-gray-500 mt-2">
                Ukuran ideal: 1200x400 px. Maks: 5MB.
                Format: JPG/PNG/GIF.
              </p>

              {/* PREVIEW */}
              {preview && (
                <div className="mt-5">
                  <p className="text-sm font-medium mb-2">
                    Preview Banner
                  </p>

                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 px-5 py-4 border-t bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-500 text-white hover:bg-gray-600 text-sm"
              >
                Batal
              </button>

              <button
                onClick={handleUpload}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm flex items-center gap-2"
              >
                <FaUpload />
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}