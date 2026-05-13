import React, { useState } from "react";

const InformasiLembaga = () => {
  const [data, setData] = useState([
    {
      id: 1,
      judul: "Informasi Maintenance Sistem",
      isi: "Sedang ada informasi maintenance sistem",
      tanggal: "2025-09-22",
    },
    {
      id: 2,
      judul: "Selamat datang di aplikasi sekolah",
      isi: "Silahkan hubungi kami jika ada masalah",
      tanggal: "2025-07-31",
    },
  ]);

  return (
    <div className="container mt-3">

      {/* BUTTON TAMBAH */}
      <button className="btn btn-primary mb-3">
        Tambah Informasi
      </button>

      {/* TABEL */}
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Judul</th>
            <th>Isi</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.judul}</td>
              <td>{item.isi}</td>
              <td>{item.tanggal}</td>

              <td>
                <button className="btn btn-warning btn-sm me-2">
                  Edit
                </button>

                <button className="btn btn-danger btn-sm">
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default InformasiLembaga;