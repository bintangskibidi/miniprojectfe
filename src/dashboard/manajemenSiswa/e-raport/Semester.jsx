<<<<<<< HEAD:src/dashboard/manajemenSiswa/Semester.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";

const Semester = () => {
  const [data, setData] = useState([
    {
      id: 1,
      TahunAjaran: "2024/2025",
      JenisSemester: "PTS",
      NamaSemester: "Semester Ganjil",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: null,
    TahunAjaran: "",
    JenisSemester: "",
    NamaSemester: "",
  });

  // ================= TAMBAH =================
  const handleTambah = () => {
    setForm({
      id: null,
      TahunAjaran: "",
      JenisSemester: "",
      NamaSemester: "",
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
    if (!form.TahunAjaran || !form.JenisSemester || !form.NamaSemester) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Semua field wajib diisi!",
      });
      return;
    }

    if (form.id) {
      // EDIT
      setData(data.map((item) => (item.id === form.id ? form : item)));

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil diupdate",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      // TAMBAH
      setData([...data, { ...form, id: Date.now() }]);

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
      <div className="d-flex justify-content-between mb-3">
        <h3>Data Semester</h3>
        <button className="btn btn-primary" onClick={handleTambah}>
          + Tambah
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-header">Daftar Semester</div>

        <div className="card-body p-0">
          <table className="table table-bordered mb-0">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>Tahun Ajaran</th>
                <th>Jenis Semester</th>
                <th>Nama Semester</th>
                <th>Aksi</th>
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
                    <td>{item.TahunAjaran}</td>
                    <td>{item.JenisSemester}</td>
                    <td>{item.NamaSemester}</td>
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

      {/* MODAL */}
      {showModal && (
        <>
          <div className="modal-backdrop show"></div>

          <div
            className="bg-white p-4 rounded shadow"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1050,
              width: "400px",
            }}
          >
            <h5 className="mb-3">
              {form.id ? "Edit" : "Tambah"} Semester
            </h5>

            <input
              className="form-control mb-2"
              placeholder="Tahun Ajaran"
              value={form.TahunAjaran}
              onChange={(e) =>
                setForm({ ...form, TahunAjaran: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Jenis Semester"
              value={form.JenisSemester}
              onChange={(e) =>
                setForm({ ...form, JenisSemester: e.target.value })
              }
            />

            <input
              className="form-control mb-3"
              placeholder="Nama Semester"
              value={form.NamaSemester}
              onChange={(e) =>
                setForm({ ...form, NamaSemester: e.target.value })
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

=======
import React, { useState } from "react";
import Swal from "sweetalert2";

const Semester = () => {
  const [data, setData] = useState([
    {
      id: 1,
      TahunAjaran: "2024/2025",
      JenisSemester: "PTS",
      NamaSemester: "Semester Ganjil",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: null,
    TahunAjaran: "",
    JenisSemester: "",
    NamaSemester: "",
  });

  // ================= TAMBAH =================
  const handleTambah = () => {
    setForm({
      id: null,
      TahunAjaran: "",
      JenisSemester: "",
      NamaSemester: "",
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
    if (!form.TahunAjaran || !form.JenisSemester || !form.NamaSemester) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Semua field wajib diisi!",
      });
      return;
    }

    if (form.id) {
      // EDIT
      setData(data.map((item) => (item.id === form.id ? form : item)));

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil diupdate",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      // TAMBAH
      setData([...data, { ...form, id: Date.now() }]);

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
      <div className="d-flex justify-content-between mb-3">
        <h3>Data Semester</h3>
        <button className="btn btn-primary" onClick={handleTambah}>
          + Tambah
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-header">Daftar Semester</div>

        <div className="card-body p-0">
          <table className="table table-bordered mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Tahun Ajaran</th>
                <th>Jenis Semester</th>
                <th>Nama Semester</th>
                <th>Aksi</th>
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
                    <td>{item.TahunAjaran}</td>
                    <td>{item.JenisSemester}</td>
                    <td>{item.NamaSemester}</td>
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

      {/* MODAL */}
      {showModal && (
        <>
          <div className="modal-backdrop show"></div>

          <div
            className="bg-white p-4 rounded shadow"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 1050,
              width: "400px",
            }}
          >
            <h5 className="mb-3">
              {form.id ? "Edit" : "Tambah"} Semester
            </h5>

            <input
              className="form-control mb-2"
              placeholder="Tahun Ajaran"
              value={form.TahunAjaran}
              onChange={(e) =>
                setForm({ ...form, TahunAjaran: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Jenis Semester"
              value={form.JenisSemester}
              onChange={(e) =>
                setForm({ ...form, JenisSemester: e.target.value })
              }
            />

            <input
              className="form-control mb-3"
              placeholder="Nama Semester"
              value={form.NamaSemester}
              onChange={(e) =>
                setForm({ ...form, NamaSemester: e.target.value })
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

>>>>>>> origin/main:src/dashboard/manajemenSiswa/e-raport/Semester.jsx
export default Semester;