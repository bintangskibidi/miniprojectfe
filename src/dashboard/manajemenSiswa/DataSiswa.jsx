import React, { useState } from "react";
import Swal from "sweetalert2";

const DataSiswa = () => {
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
    setForm({
      id: null,
      nis: "",
      nama: "",
      tglLahir: "",
      alamat: "",
      kelas: "",
      status: "",
    });
    setShowModal(true);
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
    <div style={{ padding: "20px" }}>
      <div className="d-flex justify-content-between mb-3">
        <h3>Data Siswa</h3>
        <button className="btn btn-primary" onClick={handleTambah}>
          + Tambah
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-header">Daftar Siswa</div>

        <div className="card-body p-0">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
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
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(item)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleHapus(item.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <>
     <div
  onClick={() => setShowModal(false)}
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
            className="bg-white p-4 rounded shadow"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "400px",
              zIndex: 1000,
            }}
          >
            <h5>{form.id ? "Edit" : "Tambah"} Siswa</h5>

            <input
              className="form-control mb-2"
              placeholder="NIS"
              value={form.nis}
              onChange={(e) =>
                setForm({ ...form, nis: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Nama"
              value={form.nama}
              onChange={(e) =>
                setForm({ ...form, nama: e.target.value })
              }
            />

            <input
              type="date"
              className="form-control mb-2"
              value={form.tglLahir}
              onChange={(e) =>
                setForm({ ...form, tglLahir: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Alamat"
              value={form.alamat}
              onChange={(e) =>
                setForm({ ...form, alamat: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Kelas"
              value={form.kelas}
              onChange={(e) =>
                setForm({ ...form, kelas: e.target.value })
              }
            />

            <select
              className="form-control mb-3"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option value="">Pilih Status</option>
              <option value="Aktif">Aktif</option>
              <option value="Alumni">Alumni</option>
            </select>

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

export default DataSiswa;