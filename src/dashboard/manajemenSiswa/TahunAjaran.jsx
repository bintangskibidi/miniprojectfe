import React, { useState } from "react";
import Swal from "sweetalert2";

const TahunAjaran = () => {
  const [data, setData] = useState([
    {
      id: 1,
      tahunAjaran: "2025/2026",
      tahun: "2025",
      status: true,
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: null,
    tahunAjaran: "",
    tahun: "",
    status: true,
  });

  // ================= TAMBAH =================
  const handleTambah = () => {
    setForm({
      id: null,
      tahunAjaran: "",
      tahun: "",
      status: true,
    });
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

  // ================= TOGGLE STATUS =================
  const toggleStatus = (item) => {
  setData(
    data.map((d) =>
      d.id === item.id ? { ...d, status: !d.status } : d
    )
  );

  // 🔥 TOAST (tidak ganggu layar)
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: `Tahun Ajaran ${
      item.status ? "dinonaktifkan" : "diaktifkan"
    }`,
    showConfirmButton: false,
    timer: 1500,
  });
};

  // ================= SIMPAN =================
  const handleSubmit = () => {
    if (!form.tahunAjaran || !form.tahun) {
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
        <h3>Data Tahun Ajaran</h3>
        <button className="btn btn-primary" onClick={handleTambah}>
          + Tambah
        </button>
      </div>

      {/* CARD */}
      <div className="card shadow-sm">
        <div className="card-header">Daftar Tahun Ajaran</div>

        <div className="card-body p-0">
          <table className="table table-bordered mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Tahun Ajaran</th>
                <th>Tahun</th>
                <th>Status</th>
                <th style={{ width: "150px" }}>Aksi</th>
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
                    <td>{item.tahunAjaran}</td>
                    <td>{item.tahun}</td>

                    {/* 🔥 TOGGLE BARU */}
                    <td>
                      <button
                        onClick={() => toggleStatus(item)}
                        className={`px-3 py-1 rounded-lg text-white shadow transition ${
                          item.status
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-blue-500 hover:bg-blue-600"
                        }`}
                      >
                        {item.status ? "Non-Aktifkan" : "Aktifkan"}
                      </button>
                    </td>

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
              {form.id ? "Edit" : "Tambah"} Tahun Ajaran
            </h5>

            <input
              className="form-control mb-2"
              placeholder="Tahun Ajaran (2025/2026)"
              value={form.tahunAjaran}
              onChange={(e) =>
                setForm({ ...form, tahunAjaran: e.target.value })
              }
            />

            <input
              className="form-control mb-3"
              placeholder="Tahun (2025)"
              value={form.tahun}
              onChange={(e) =>
                setForm({ ...form, tahun: e.target.value })
              }
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white transition"
              >
                Batal
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow transition"
              >
                Simpan
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TahunAjaran;