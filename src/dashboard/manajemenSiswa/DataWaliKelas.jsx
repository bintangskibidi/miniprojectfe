import React, { useState } from "react";
import Swal from "sweetalert2";

const DataWaliKelas = () => {
  const [data, setData] = useState([
    {
      id: 1,
      namaKelas: "Ambasatanic 969",
      namaPegawai: "Andre Nugroho",
      tahunAjaran: "2026/2027",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: null,
    namaKelas: "",
    namaPegawai: "",
    tahunAjaran: "",
  });

  // ================= TAMBAH =================
  const handleTambah = () => {
    setForm({
      id: null,
      namaKelas: "",
      namaPegawai: "",
      tahunAjaran: "",
    });
    setShowModal(true);
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm(item);
    setShowModal(true);
  };

  // ================= HAPUS (SWEET ALERT) =================
  const handleHapus = (id) => {
    Swal.fire({
      title: "Yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setData(data.filter((item) => item.id !== id));

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

  // ================= SIMPAN =================
  const handleSubmit = () => {
    if (!form.namaKelas || !form.namaPegawai || !form.tahunAjaran) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Semua field wajib diisi!",
      });
      return;
    }

    if (form.id) {
      // EDIT
      setData(
        data.map((item) =>
          item.id === form.id ? form : item
        )
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil diupdate",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      // TAMBAH
      setData([
        ...data,
        { ...form, id: Date.now() },
      ]);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil ditambahkan",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    setShowModal(false);
  };


  return (
    <div style={{ padding: "20px" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <h3>Data Wali Kelas</h3>
        <button className="btn btn-primary" onClick={handleTambah}>
          + Tambah
        </button>
      </div>

      {/* CARD */}
      <div className="card shadow-sm">
        <div className="card-header">Daftar Wali Kelas</div>

        <div className="card-body p-0">
          <table className="table table-bordered mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Nama Kelas</th>
                <th>Nama Pegawai</th>
                <th>Tahun Ajaran</th>
                <th style={{ width: "120px" }}>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.namaKelas}</td>
                    <td>{item.namaPegawai}</td>
                    <td>{item.tahunAjaran}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(item)}
                      >
                        ✏️
                      </button>

                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleHapus(item.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <>
          {/* BACKDROP */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              zIndex: 999,
            }}
          />

          {/* MODAL BOX */}
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1000,
              width: "400px",
            }}
            className="bg-white p-4 rounded shadow"
          >
            <h5 className="mb-3">
              {form.id ? "Edit" : "Tambah"} Wali Kelas
            </h5>

            <input
              className="form-control mb-2"
              placeholder="Nama Kelas"
              value={form.namaKelas}
              onChange={(e) =>
                setForm({ ...form, namaKelas: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Nama Pegawai"
              value={form.namaPegawai}
              onChange={(e) =>
                setForm({ ...form, namaPegawai: e.target.value })
              }
            />

            <input
              className="form-control mb-3"
              placeholder="Tahun Ajaran"
              value={form.tahunAjaran}
              onChange={(e) =>
                setForm({ ...form, tahunAjaran: e.target.value })
              }
            />

            <div className="text-end">
              <button
                className="btn btn-secondary me-2"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>

              <button className="btn btn-primary" onClick={handleSubmit}>
                Simpan
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DataWaliKelas;