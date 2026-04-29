import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Semester = () => {
  const [data, setData] = useState([]);
  const [tahunAjaranList, setTahunAjaranList] = useState([]);
  const [jenisSemesterList, setJenisSemesterList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const initialForm = {
    id: null,
    tahun_ajaran_id: "",
    jenis_semester_id: "",
    nama_semester: "",
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetchSemester();
    fetchTahunAjaran();
    fetchJenisSemester();
  }, []);

  const fetchSemester = async () => {
    try {
      const res = await axios.get("http://localhost:8000/semester");
      const result = res.data?.data || [];
      setData(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Error fetch semester:", error);
      setData([]);
    }
  };

  const fetchTahunAjaran = async () => {
    try {
      const res = await axios.get("http://localhost:8000/tahun-ajaran");
      const result = res.data?.data || [];
      setTahunAjaranList(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Error fetch tahun ajaran:", error);
      setTahunAjaranList([]);
    }
  };

  const fetchJenisSemester = async () => {
    try {
      const res = await axios.get("http://localhost:8000/jenis-semester");
      const result = res.data?.data || [];
      setJenisSemesterList(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Error fetch jenis semester:", error);
      setJenisSemesterList([]);
    }
  };

  const handleTambah = () => {
    setForm(initialForm);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      tahun_ajaran_id: item.tahun_ajaran_id?.toString() || "",
      jenis_semester_id: item.jenis_semester_id?.toString() || "",
      nama_semester: item.nama_semester || "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setForm(initialForm);
  };

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8000/semester/${id}`);
      await fetchSemester();
      Swal.fire("Berhasil!", "Data berhasil dihapus", "success");
    } catch (error) {
      console.error("Error hapus semester:", error);
      Swal.fire("Error!", "Gagal menghapus data", "error");
    }
  };

  const handleSubmit = async () => {
    if (
      !form.tahun_ajaran_id ||
      !form.jenis_semester_id ||
      !form.nama_semester.trim()
    ) {
      Swal.fire("Warning!", "Semua field wajib diisi", "warning");
      return;
    }

    const payload = {
      tahun_ajaran_id: Number(form.tahun_ajaran_id),
      jenis_semester_id: Number(form.jenis_semester_id),
      nama_semester: form.nama_semester.trim(),
    };

    try {
      if (form.id) {
        await axios.put(`http://localhost:8000/semester/${form.id}`, payload);
        Swal.fire("Berhasil!", "Data berhasil diupdate", "success");
      } else {
        await axios.post("http://localhost:8000/semester", payload);
        Swal.fire("Berhasil!", "Data berhasil ditambahkan", "success");
      }

      handleCloseModal();
      await fetchSemester();
    } catch (error) {
      console.error("Error simpan semester:", error);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Gagal menyimpan data",
        "error"
      );
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Data Semester</h3>
        <button className="btn btn-primary" onClick={handleTambah}>
          + Tambah
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body table-responsive">
          <table className="table table-bordered table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th width="60">No</th>
                <th>Tahun Ajaran</th>
                <th>Jenis Semester</th>
                <th>Nama Semester</th>
                <th width="170">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.tahun_ajaran}</td>
                    <td>{item.jenis_semester}</td>
                    <td>{item.nama_semester}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(item)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleHapus(item.id)}
                      >
                        🗑️ Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal-backdrop show"></div>
          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {form.id ? "Edit" : "Tambah"} Semester
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleCloseModal}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Tahun Ajaran</label>
                    <select
                      className="form-select"
                      value={form.tahun_ajaran_id}
                      onChange={(e) =>
                        setForm({ ...form, tahun_ajaran_id: e.target.value })
                      }
                    >
                      <option value="">Pilih Tahun Ajaran</option>
                      {tahunAjaranList.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.tahun_ajaran}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Jenis Semester</label>
                    <select
                      className="form-select"
                      value={form.jenis_semester_id}
                      onChange={(e) =>
                        setForm({ ...form, jenis_semester_id: e.target.value })
                      }
                    >
                      <option value="">Pilih Jenis Semester</option>
                      {jenisSemesterList.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.nama}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Nama Semester</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Contoh: Semester Ganjil 2025/2026"
                      value={form.nama_semester}
                      onChange={(e) =>
                        setForm({ ...form, nama_semester: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={handleCloseModal}
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

export default Semester;
