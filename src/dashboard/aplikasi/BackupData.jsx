import React, { useState, useEffect } from "react";
import {
  FaDatabase,
  FaDownload,
  FaTrash,
  FaFileAlt,
  FaClock,
} from "react-icons/fa";
import Swal from "sweetalert2";
import api from "../../utils/api"; // Memakai instance api yang sama dengan banner

export default function BackupData() {
  const [backupFiles, setBackupFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH DATA BACKUP ---
  const fetchBackup = async () => {
    setLoading(true);
    try {
      const response = await api.get("/backup");
      // Menyesuaikan jika response langsung array atau berstruktur { data: [...] }
      setBackupFiles(response.data.data || response.data || []);
    } catch (error) {
      console.error("Gagal mengambil data backup:", error);
      Swal.fire("Error", "Gagal mengambil data backup dari server", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackup();
  }, []);

  // --- HANDLE BACKUP (POST) ---
  const handleBackup = async () => {
    Swal.fire({
      title: "Membuat Backup...",
      text: "Sistem sedang memproses backup data",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await api.post("/backup");
      
      // Ambil data item baru hasil respon server jika ada
      const newBackup = response.data.data;
      
      if (newBackup) {
        setBackupFiles((prevFiles) => [newBackup, ...prevFiles]);
      } else {
        fetchBackup(); // Fallback refresh otomatis jika struktur data berbeda
      }

      Swal.fire({
        icon: "success",
        title: "Backup Berhasil",
        text: "File backup berhasil dibuat",
        confirmButtonColor: "#2563eb",
      });
    } catch (error) {
      console.error("Gagal melakukan backup:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Backup",
        text: error.response?.data?.message || "Terjadi kesalahan pada server.",
      });
    }
  };

  // --- HANDLE DOWNLOAD ---
  const handleDownload = (file) => {
    // Implementasi download nyata jika backend menyediakan endpoint file statis/stream
    // Misal: window.open(`${api.defaults.baseURL}/backup/download/${file.id}`);
    
    Swal.fire({
      icon: "success",
      title: "Download Dimulai",
      text: `Mengunduh ${file.nama}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // --- HANDLE HAPUS (DELETE) ---
  const handleDelete = async (id, nama) => {
    const result = await Swal.fire({
      title: "Hapus File Backup?",
      text: `${nama} akan dihapus permanen`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        // API DELETE ke /backup/:id
        await api.delete(`/backup/${id}`);

        // Update state local agar langsung menghilang dari baris tabel
        setBackupFiles(backupFiles.filter((item) => item.id !== id));

        Swal.fire({
          icon: "success",
          title: "Berhasil Dihapus",
          text: "File backup berhasil dihapus",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Gagal menghapus file backup:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal Hapus",
          text: "Tidak dapat menghapus file backup dari server.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* TITLE */}
      <div className="flex items-center gap-3 mb-6">
        <FaDatabase className="text-3xl text-blue-600" />
        <h1 className="text-3xl font-bold text-gray-800">
          Backup Data Partial
        </h1>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow border overflow-hidden">

        {/* HEADER */}
        <div className="bg-blue-600 px-6 py-4">
          <h2 className="text-white font-semibold text-lg">
            Backup Data Partial (Tabel Terpilih)
          </h2>
        </div>

        {/* BODY */}
        <div className="p-6">

          {/* BUTTON BACKUP */}
          <button
            onClick={handleBackup}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-5 py-3
              rounded-xl
              shadow
              flex
              items-center
              gap-3
              transition
              mb-6
            "
          >
            <FaDatabase />
            Backup Sekarang
          </button>

          {/* LIST FILE */}
          <div className="border rounded-xl overflow-hidden">

            {/* HEADER FILE */}
            <div className="bg-gray-100 px-5 py-4 border-b">
              <h3 className="font-semibold text-gray-700">
                File Backup Tersedia
              </h3>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">

                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 border text-left text-sm">#</th>
                    <th className="px-4 py-3 border text-left text-sm">Nama File</th>
                    <th className="px-4 py-3 border text-left text-sm">Ukuran</th>
                    <th className="px-4 py-3 border text-left text-sm">Tanggal</th>
                    <th className="px-4 py-3 border text-left text-sm">Waktu</th>
                    <th className="px-4 py-3 border text-center text-sm">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-gray-500">
                        Memuat data file backup...
                      </td>
                    </tr>
                  ) : backupFiles.length > 0 ? (
                    backupFiles.map((file, index) => (
                      <tr
                        key={file.id}
                        className="hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3 border text-sm">
                          {index + 1}
                        </td>

                        <td className="px-4 py-3 border text-sm">
                          <div className="flex items-center gap-3">
                            <FaFileAlt className="text-blue-600" />
                            <span className="font-medium">
                              {file.nama}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3 border text-sm">
                          {file.ukuran}
                        </td>

                        <td className="px-4 py-3 border text-sm">
                          {file.tanggal}
                        </td>

                        <td className="px-4 py-3 border text-sm">
                          <div className="flex items-center gap-2">
                            <FaClock className="text-gray-500" />
                            {file.waktu}
                          </div>
                        </td>

                        <td className="px-4 py-3 border">
                          <div className="flex items-center justify-center gap-2">

                            {/* DOWNLOAD */}
                            <button
                              onClick={() => handleDownload(file)}
                              className="
                                bg-green-600
                                hover:bg-green-700
                                text-white
                                px-3 py-2
                                rounded-lg
                                text-sm
                                flex
                                items-center
                                gap-2
                              "
                            >
                              <FaDownload />
                              Download
                            </button>

                            {/* HAPUS */}
                            <button
                              onClick={() => handleDelete(file.id, file.nama)}
                              className="
                                bg-red-600
                                hover:bg-red-700
                                text-white
                                px-3 py-2
                                rounded-lg
                                text-sm
                                flex
                                items-center
                                gap-2
                              "
                            >
                              <FaTrash />
                              Hapus
                            </button>

                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-10 text-gray-500"
                      >
                        Tidak ada file backup tersedia
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}