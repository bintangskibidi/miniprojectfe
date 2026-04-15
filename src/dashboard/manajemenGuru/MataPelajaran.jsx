import React, { useState } from "react";
import Swal from "sweetalert2";

const MataPelajaran = () => {
  const [data, setData] = useState([
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "Bahasa Jawa",
    "Bahasa Jepang",
    "Matematika",
    "Pendidikan Agama Islam",
  ]);

  // 🔹 Tambah Data
  const handleTambah = async () => {
    const { value: nama } = await Swal.fire({
      title: "Tambah Mata Pelajaran",
      input: "text",
      inputLabel: "Nama Mata Pelajaran",
      inputPlaceholder: "Masukkan nama...",
      showCancelButton: true,
      confirmButtonText: "Tambah",
      cancelButtonText: "Batal",
    });

    if (nama) {
      setData([...data, nama]);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil ditambahkan",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // 🔹 Hapus Data
  const handleHapus = (index) => {
    Swal.fire({
      title: "Yakin mau hapus data?",
      text: "Data tidak bisa dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const newData = data.filter((_, i) => i !== index);
        setData(newData);

        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Data berhasil dihapus",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 py-10">
        Mata Pelajaran
      </h1>

      <div className="bg-white rounded-xl shadow border border-blue-900 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-gray-700">
            📚 Daftar Mata Pelajaran
          </h2>

          <button
            onClick={handleTambah}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            + Tambah Mata Pelajaran
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-blue-900 rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-900 ">
                <th className="px-4 py-3 text-left text-sm font-bold border border-blue-900">
                  No
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold border border-blue-900">
                  Nama Mata Pelajaran
                </th>
                <th className="px-4 py-3 text-left text-sm font-bold border border-blue-900">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50 transition"
                >
                  <td className="px-4 py-3 text-sm border border-blue-900">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 text-sm border border-blue-900">
                    {item}
                  </td>

                  <td className="px-4 py-3 text-sm border border-blue-900 flex gap-2">
                    <button className="bg-blue-400 hover:bg-blue-500 text-white px-3 py-1 rounded-lg text-xs">
                      Edit
                    </button>

                    <button
                      onClick={() => handleHapus(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MataPelajaran;