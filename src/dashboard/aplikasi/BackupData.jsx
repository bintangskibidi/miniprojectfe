import React, { useState } from "react";
import {
  FaDatabase,
  FaDownload,
  FaTrash,
  FaFileAlt,
  FaClock,
} from "react-icons/fa";
import Swal from "sweetalert2";

export default function BackupData() {
  // DATA DUMMY FILE BACKUP
  const [backupFiles, setBackupFiles] = useState([
    {
      id: 1,
      nama: "backup_partial_20260512_010617.sql",
      ukuran: "2.4 MB",
      tanggal: "12 Mei 2026",
      waktu: "01:06:17",
    },
    {
      id: 2,
      nama: "backup_partial_20260101_074036.sql",
      ukuran: "1.8 MB",
      tanggal: "01 Jan 2026",
      waktu: "07:40:36",
    },
    {
      id: 3,
      nama: "backup_partial_20250710_193216.sql",
      ukuran: "3.1 MB",
      tanggal: "10 Jul 2025",
      waktu: "19:32:16",
    },
    {
      id: 4,
      nama: "backup_partial_20250710_193043.sql",
      ukuran: "2.7 MB",
      tanggal: "10 Jul 2025",
      waktu: "19:30:43",
    },
  ]);

  // HANDLE BACKUP
  const handleBackup = () => {
    Swal.fire({
      title: "Membuat Backup...",
      text: "Sistem sedang memproses backup data",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setTimeout(() => {
      const newBackup = {
        id: backupFiles.length + 1,
        nama: `backup_partial_${Date.now()}.sql`,
        ukuran: "2.1 MB",
        tanggal: new Date().toLocaleDateString("id-ID"),
        waktu: new Date().toLocaleTimeString("id-ID"),
      };

      setBackupFiles([newBackup, ...backupFiles]);

      Swal.fire({
        icon: "success",
        title: "Backup Berhasil",
        text: "File backup berhasil dibuat",
        confirmButtonColor: "#2563eb",
      });
    }, 2000);
  };

  // HANDLE DOWNLOAD
  const handleDownload = (file) => {
    Swal.fire({
      icon: "success",
      title: "Download Dimulai",
      text: `Mengunduh ${file.nama}`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // HANDLE HAPUS
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
      setBackupFiles(
        backupFiles.filter((item) => item.id !== id)
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil Dihapus",
        text: "File backup berhasil dihapus",
        timer: 1500,
        showConfirmButton: false,
      });
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
                    <th className="px-4 py-3 border text-left text-sm">
                      #
                    </th>

                    <th className="px-4 py-3 border text-left text-sm">
                      Nama File
                    </th>

                    <th className="px-4 py-3 border text-left text-sm">
                      Ukuran
                    </th>

                    <th className="px-4 py-3 border text-left text-sm">
                      Tanggal
                    </th>

                    <th className="px-4 py-3 border text-left text-sm">
                      Waktu
                    </th>

                    <th className="px-4 py-3 border text-center text-sm">
                      Aksi
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {backupFiles.length > 0 ? (
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
                              onClick={() =>
                                handleDownload(file)
                              }
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
                              onClick={() =>
                                handleDelete(
                                  file.id,
                                  file.nama
                                )
                              }
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