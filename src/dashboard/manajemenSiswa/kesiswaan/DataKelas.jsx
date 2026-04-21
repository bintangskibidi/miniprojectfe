import React, { useState } from "react";
import Swal from "sweetalert2";

const DataKelas = () => {
  const [data, setData] = useState([
    { id: 1, kode: "KLS001", nama: "X RPL 1" },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: null,
    kode: "",
    nama: "",
  });

  // ================= TAMBAH =================
  const handleTambah = () => {
    setForm({ id: null, kode: "", nama: "" });
    setShowModal(true);
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm(item);
    setShowModal(true);
  };

  // ================= HAPUS =================
  const handleHapus = (id) => {
    Swal.fire({
      title: "Yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setData(data.filter((item) => item.id !== id));
        Swal.fire("Berhasil", "Data dihapus", "success");
      }
    });
  };

  // ================= SIMPAN =================
  const handleSubmit = () => {
    if (!form.kode || !form.nama) {
      Swal.fire("Warning", "Semua field wajib diisi!", "warning");
      return;
    }

    if (form.id) {
      setData(data.map((item) => (item.id === form.id ? form : item)));
      Swal.fire("Berhasil", "Data berhasil diupdate", "success");
    } else {
      setData([...data, { ...form, id: Date.now() }]);
      Swal.fire("Berhasil", "Data berhasil ditambahkan", "success");
    }

    setShowModal(false);
  };

  // ================= SEARCH =================
  const filteredData = data.filter(
    (item) =>
      item.kode.toLowerCase().includes(search.toLowerCase()) ||
      item.nama.toLowerCase().includes(search.toLowerCase())
  );

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
        <h3>Data Kelas</h3>
        <button className="btn btn-primary" onClick={handleTambah}>
          + Tambah
        </button>
      </div>

      {/* CARD */}
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Daftar Kelas</span>

          {/* SEARCH KECIL */}
          <input
            type="text"
            placeholder="Cari..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ width: "200px" }}
          />
        </div>

        <div className="card-body p-0">
          <table className="table table-bordered mb-0">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>Kode Kelas</th>
                <th>Nama Kelas</th>
                <th style={{ width: "120px" }}>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.kode}</td>
                    <td>{item.nama}</td>
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

          {/* MODAL */}
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
              {form.id ? "Edit" : "Tambah"} Kelas
            </h5>

            <input
              className="form-control mb-2"
              placeholder="Kode Kelas"
              value={form.kode}
              onChange={(e) =>
                setForm({ ...form, kode: e.target.value })
              }
            />

            <input
              className="form-control mb-3"
              placeholder="Nama Kelas"
              value={form.nama}
              onChange={(e) =>
                setForm({ ...form, nama: e.target.value })
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

export default DataKelas;