import React, { useState } from "react";
import Swal from "sweetalert2";

const DataKelas = () => {
  const [data, setData] = useState([
    { id: 1, kode: "Alumni", nama: "Alumni" },
    { id: 2, kode: "3.1", nama: "IX A" },
    { id: 3, kode: "3.2", nama: "IX B" },
    { id: 4, kode: "3.3", nama: "IX C" },
    { id: 5, kode: "1.1", nama: "VII A" },
    { id: 6, kode: "1.2", nama: "VII B" },
    { id: 7, kode: "1.3", nama: "VII C" },
    { id: 8, kode: "2.1", nama: "VIII A" },
    { id: 9, kode: "2.2", nama: "VIII B" },
    { id: 10, kode: "2.3", nama: "VIII C" },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entries, setEntries] = useState(10);

  const [form, setForm] = useState({
    id: null,
    kode: "",
    nama: "",
  });

  // ================= CRUD =================
  const handleTambah = () => {
    setForm({ id: null, kode: "", nama: "" });
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setForm(item);
    setShowModal(true);
  };

  const handleHapus = (id) => {
    Swal.fire({
      title: "Yakin?",
      text: "Data akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Hapus",
    }).then((res) => {
      if (res.isConfirmed) {
        setData(data.filter((item) => item.id !== id));
        Swal.fire("Berhasil", "Data dihapus", "success");
      }
    });
  };

  const handleSubmit = () => {
    if (!form.kode || !form.nama) {
      Swal.fire("Warning", "Wajib isi semua!", "warning");
      return;
    }

    if (form.id) {
      setData(data.map((d) => (d.id === form.id ? form : d)));
    } else {
      setData([...data, { ...form, id: Date.now() }]);
    }

    setShowModal(false);
  };

  // ================= FILTER =================
  const filtered = data.filter(
    (d) =>
      d.kode.toLowerCase().includes(search.toLowerCase()) ||
      d.nama.toLowerCase().includes(search.toLowerCase())
  );

  // ================= PAGINATION =================
  const total = filtered.length;
  const totalPages = Math.ceil(total / entries);

  const start = (currentPage - 1) * entries;
  const end = start + entries;

  const current = filtered.slice(start, end);

  return (
    <div className="container-fluid mt-3">
      <h5 className="mb-3">📘 Data Kelas</h5>

      <div className="card shadow-sm">
        {/* HEADER */}
        <div className="card-header d-flex justify-content-between align-items-center">
          <strong>📋 Daftar Kelas</strong>
          <button className="btn btn-primary btn-sm" onClick={handleTambah}>
            + Tambah
          </button>
        </div>

        {/* TOP CONTROL */}
        <div className="d-flex justify-content-between align-items-center p-3 flex-wrap gap-2">
          <div>
            Tampilkan{" "}
            <select
              value={entries}
              onChange={(e) => {
                setEntries(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="form-select d-inline w-auto mx-2"
            >
              <option>5</option>
              <option>10</option>
              <option>25</option>
            </select>{" "}
            data
          </div>

          <div>
            Cari:
            <input
              type="text"
              className="form-control d-inline w-auto ms-2"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* EXPORT BUTTON (DUMMY UI) */}
        <div className="px-3 pb-2">
          <button className="btn btn-outline-secondary btn-sm me-1">Copy</button>
          <button className="btn btn-outline-secondary btn-sm me-1">CSV</button>
          <button className="btn btn-outline-secondary btn-sm me-1">Excel</button>
          <button className="btn btn-outline-secondary btn-sm me-1">PDF</button>
          <button className="btn btn-outline-secondary btn-sm">Print</button>
        </div>

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>Kode Kelas</th>
                <th>Nama Kelas</th>
                <th style={{ width: "120px" }}>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {current.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              ) : (
                current.map((item, i) => (
                  <tr key={item.id}>
                    <td>{start + i + 1}</td>
                    <td>{item.kode}</td>
                    <td>{item.nama}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => handleEdit(item)}
                      >
                        ✏️
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
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

        {/* FOOTER */}
        <div className="d-flex justify-content-between align-items-center p-3 flex-wrap">
          <small>
            Menampilkan {total === 0 ? 0 : start + 1} sampai{" "}
            {Math.min(end, total)} dari {total} data
          </small>

          <div>
            <button
              className="btn btn-sm btn-light me-1"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                className={`btn btn-sm me-1 ${
                  currentPage === i + 1
                    ? "btn-primary"
                    : "btn-outline-primary"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="btn btn-sm btn-light"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <>
          <div className="modal-backdrop fade show"></div>

          <div className="modal d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {form.id ? "Edit" : "Tambah"} Kelas
                  </h5>
                  <button
                    className="btn-close"
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <input
                    className="form-control mb-2"
                    placeholder="Kode Kelas"
                    value={form.kode}
                    onChange={(e) =>
                      setForm({ ...form, kode: e.target.value })
                    }
                  />

                  <input
                    className="form-control"
                    placeholder="Nama Kelas"
                    value={form.nama}
                    onChange={(e) =>
                      setForm({ ...form, nama: e.target.value })
                    }
                  />
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Batal
                  </button>
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DataKelas;