import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DataSiswa = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([
    {
      id: 1,
      nis: "11918",
      nama: "Bambang",
      tglLahir: "2001-06-10",
      alamat: "Jalan kaliurang",
      kelas: "Alumni",
      status: "Alumni",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: null,
    nis: "",
    nama: "",
    tglLahir: "",
    alamat: "",
    kelas: "",
    status: "",
  });

  const handleTambah = () => {
    navigate("/dashboard/tambah-siswa");
  };

  const handleEdit = (item) => {
    setForm(item);
    setShowModal(true);
  };

  const handleHapus = (id) => {
    Swal.fire({
      title: "Yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData(data.filter((item) => item.id !== id));
        Swal.fire("Terhapus!", "Data berhasil dihapus", "success");
      }
    });
  };

  const handleSubmit = () => {
    const { nis, nama, tglLahir, alamat, kelas, status } = form;

    if (!nis || !nama || !tglLahir || !alamat || !kelas || !status) {
      Swal.fire("Oops...", "Semua field wajib diisi!", "warning");
      return;
    }

    if (form.id) {
      setData(data.map((item) => (item.id === form.id ? form : item)));
    } else {
      setData([...data, { ...form, id: Date.now() }]);
    }

    Swal.fire("Berhasil!", "Data tersimpan", "success");
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-3">📊 Data Siswa</h4>

      {/* FILTER */}
      <div className="card mb-3 p-3">
        <div className="d-flex align-items-center gap-2">
          <label className="fw-bold">Kelas</label>
          <select className="form-select w-auto">
            <option>-- Semua Kelas --</option>
          </select>
          <button className="btn btn-success">Terapkan</button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>📋 Daftar Siswa</span>

          <div className="d-flex gap-2">
             
            <button className="btn btn-primary btn-sm" onClick={handleTambah}>
              + Tambah
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* TOP CONTROL */}
          <div className="d-flex justify-content-between mb-2">
            <div>
              Tampilkan
              <select className="mx-2 form-select d-inline w-auto">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
              data
            </div>

            <input
              type="text"
              className="form-control w-auto"
              placeholder="Cari..."
            />
          </div>


          {/* TABLE */}
          <table className="table table-bordered table-hover">
            <thead className="table-light">
              <tr>
                <th>no</th>
                <th>NIS</th>
                <th>Nama</th>
                <th>Tgl Lahir</th>
                <th>Alamat</th>
                <th>Kelas</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.nis}</td>
                  <td>{item.nama}</td>
                  <td>{item.tglLahir}</td>
                  <td>{item.alamat}</td>
                  <td>{item.kelas}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "Aktif"
                          ? "bg-success"
                          : "bg-secondary"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm me-1"
                      onClick={() => handleEdit(item)}
                    >
                      👁
                    </button>
                    <button
                      className="btn btn-outline-warning btn-sm me-1"
                      onClick={() => handleEdit(item)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleHapus(item.id)}
                    >
                      🗑
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

export default DataSiswa;