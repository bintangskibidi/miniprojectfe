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

  // ================= FETCH DATA =================
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

  // ================= TAMBAH =================
  const handleTambah = () => {
    setForm(initialForm);
    setShowModal(true);
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm({
      id: item.id,
      tahun_ajaran_id: item.tahun_ajaran_id?.toString() || "",
      jenis_semester_id: item.jenis_semester_id?.toString() || "",
      nama_semester: item.nama_semester || "",
    });

    setShowModal(true);
  };

  // ================= CLOSE MODAL =================
  const handleCloseModal = () => {
    setShowModal(false);
    setForm(initialForm);
  };

  // ================= HAPUS =================
  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:8000/semester/${id}`);

      await fetchSemester();

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil dihapus",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error hapus semester:", error);

      Swal.fire("Error", "Gagal menghapus data", "error");
    }
  };

  // ================= SIMPAN =================
  const handleSubmit = async () => {
    if (
      !form.tahun_ajaran_id ||
      !form.jenis_semester_id ||
      !form.nama_semester.trim()
    ) {
      Swal.fire("Warning", "Semua field wajib diisi!", "warning");
      return;
    }

    const payload = {
      tahun_ajaran_id: Number(form.tahun_ajaran_id),
      jenis_semester_id: Number(form.jenis_semester_id),
      nama_semester: form.nama_semester.trim(),
    };

    try {
      if (form.id) {
        await axios.put(
          `http://localhost:8000/semester/${form.id}`,
          payload
        );

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil diupdate",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await axios.post(
          "http://localhost:8000/semester",
          payload
        );

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil ditambahkan",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      handleCloseModal();
      await fetchSemester();
    } catch (error) {
      console.error("Error simpan semester:", error);

      Swal.fire(
        "Error",
        error.response?.data?.message || "Gagal menyimpan data",
        "error"
      );
    }
  };

  return (
    <div
      className="container-fluid py-3"
      style={{
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4
          className="fw-semibold mb-0"
          style={{
            color: "#212529",
            fontSize: "1.5rem",
          }}
        >
          <i className="bi bi-calendar3 me-2 text-primary"></i>
          Data Semester
        </h4>

        <button
          type="button"
          className="btn btn-primary btn-sm px-3 shadow-sm"
          onClick={handleTambah}
        >
          + Tambah
        </button>
      </div>

      {/* CARD */}
      <div
        className="card border-0 shadow-sm"
        style={{
          borderRadius: "8px",
        }}
      >
        {/* HEADER CARD */}
        <div
          className="card-header bg-white d-flex align-items-center"
          style={{
            borderBottom: "1px solid #dee2e6",
            padding: "12px 16px",
          }}
        >
          <span
            className="fw-semibold"
            style={{
              fontSize: "0.95rem",
              color: "#212529",
            }}
          >
            <i className="bi bi-list-ul me-2 text-primary"></i>
            Daftar Semester
          </span>
        </div>

        {/* BODY */}
        <div className="card-body p-0">
          <div className="table-responsive">
            <table
              className="table table-bordered align-middle mb-0"
              style={{
                fontSize: "0.88rem",
              }}
            >
              <thead
                style={{
                  background: "#f8f9fa",
                }}
              >
                <tr className="text-center">
                  <th style={{ width: "70px" }}>#</th>
                  <th>Tahun Ajaran</th>
                  <th>Jenis Semester</th>
                  <th>Nama Semester</th>
                  <th style={{ width: "130px" }}>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center text-muted py-4"
                    >
                      Data tidak tersedia
                    </td>
                  </tr>
                ) : (
                  data.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-center">
                        {index + 1}
                      </td>

                      <td>{item.tahun_ajaran}</td>

                      <td>{item.jenis_semester}</td>

                      <td>{item.nama_semester}</td>

                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-1">
                          {/* EDIT */}
                          <button
                            type="button"
                            onClick={() => handleEdit(item)}
                            className="btn btn-sm"
                            style={{
                              border: "1px solid #0d6efd",
                              color: "#0d6efd",
                              background: "#fff",
                              width: "32px",
                              height: "32px",
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <i className="ri-pencil-line"></i>
                          </button>

                          {/* DELETE */}
                          <button
                            type="button"
                            onClick={() => handleHapus(item.id)}
                            className="btn btn-sm"
                            style={{
                              border: "1px solid #dc3545",
                              color: "#dc3545",
                              background: "#fff",
                              width: "32px",
                              height: "32px",
                              padding: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <i className="ri-delete-bin-6-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(3px)",
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{
              maxWidth: "420px",
            }}
          >
            <div className="modal-content border-0 shadow">
              {/* HEADER */}
              <div className="modal-header bg-primary text-white">
                <h6 className="modal-title fw-bold">
                  {form.id ? "Edit" : "Tambah"} Semester
                </h6>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseModal}
                ></button>
              </div>

              {/* BODY */}
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="small fw-bold mb-1">
                    Tahun Ajaran
                  </label>

                  <select
                    className="form-select shadow-sm"
                    value={form.tahun_ajaran_id}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        tahun_ajaran_id: e.target.value,
                      })
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
                  <label className="small fw-bold mb-1">
                    Jenis Semester
                  </label>

                  <select
                    className="form-select shadow-sm"
                    value={form.jenis_semester_id}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        jenis_semester_id: e.target.value,
                      })
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
                  <label className="small fw-bold mb-1">
                    Nama Semester
                  </label>

                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Contoh: Semester Ganjil 2025/2026"
                    value={form.nama_semester}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nama_semester: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* FOOTER */}
              <div className="modal-footer border-0 bg-light">
                <button
                  className="btn btn-secondary btn-sm px-3"
                  onClick={handleCloseModal}
                >
                  Batal
                </button>

                <button
                  className="btn btn-primary btn-sm px-3 shadow-sm"
                  onClick={handleSubmit}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Semester;