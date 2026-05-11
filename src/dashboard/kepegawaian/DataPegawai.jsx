import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../utils/api";

import {
  RiAddLine,
  RiDeleteBinLine,
  RiPencilLine,
  RiSearchLine,
  RiTeamLine,
  RiFileExcel2Line,
  RiFilePdf2Line,
  RiPrinterLine,
  RiFileCopyLine,
  RiFileExcelLine,
  RiUpload2Line,
} from "react-icons/ri";

const initialForm = {
  nama: "",
  nip: "",
  pendidikan: "",
  golongan: "",
  status_pegawai: "",
  tanggal_sk: "",
  jabatan: "",
  no_hp: "",
  email: "",
  jenis_pegawai: "",
  unit: "",
  status: "",
};

const DataPegawai = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState(initialForm);

  const [editId, setEditId] = useState(null);

  // ================= GET DATA =================
  const getData = async () => {
    try {
      const res = await api.get("/pegawai");

      setData(res.data.data || []);
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal mengambil data",
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= RESET =================
  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      if (
        !form.nama ||
        !form.jabatan ||
        !form.unit ||
        !form.status
      ) {
        Swal.fire({
          icon: "warning",
          title: "Warning",
          text: "Field wajib belum diisi",
        });

        return;
      }

      if (editId) {
        await api.put(`/pegawai/${editId}`, form);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil diupdate",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await api.post("/pegawai", form);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil ditambahkan",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      getData();

      setShowModal(false);

      resetForm();
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Terjadi kesalahan",
      });
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm(item);

    setEditId(item.id);

    setShowModal(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin hapus data?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/pegawai/${id}`);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil dihapus",
          timer: 1500,
          showConfirmButton: false,
        });

        getData();
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Gagal menghapus data",
        });
      }
    }
  };

  // ================= FILTER =================
  const filtered = data.filter(
    (item) =>
      item.nama
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.nip
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  // ================= MASA KERJA =================
  const hitungMasaKerja = (tanggal) => {
    if (!tanggal) return "-";

    const start = new Date(tanggal);

    const now = new Date();

    let tahun = now.getFullYear() - start.getFullYear();

    let bulan = now.getMonth() - start.getMonth();

    if (bulan < 0) {
      tahun--;

      bulan += 12;
    }

    return `${tahun} tahun ${bulan} bulan`;
  };

  return (
    <div
      className="container-fluid py-3"
      style={{
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      {/* CARD */}
      <div
        className="card border-0 shadow-sm"
        style={{
          borderRadius: "8px",
        }}
      >
        {/* HEADER */}
        <div
          className="card-header d-flex justify-content-between align-items-center"
          style={{
            background: "#0d6efd",
            color: "#fff",
            padding: "10px 16px",
          }}
        >
          <div className="d-flex align-items-center gap-2 fw-semibold">
            <RiTeamLine size={18} />

            <span>Data Pegawai</span>
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-success btn-sm d-flex align-items-center gap-1">
              <RiFileExcel2Line />
              Download Template Excel
            </button>

            <button className="btn btn-info btn-sm d-flex align-items-center gap-1 text-white">
              <RiUpload2Line />
              Upload Excel
            </button>

            <button
              className="btn btn-light btn-sm d-flex align-items-center gap-1"
              onClick={() => {
                resetForm();

                setShowModal(true);
              }}
            >
              <RiAddLine />
              Tambah Pegawai
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="card-body">
          {/* TOP ACTION */}
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            {/* LEFT */}
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <div className="d-flex align-items-center gap-2">
                <span style={{ fontSize: "14px" }}>
                  Tampilkan
                </span>

                <select
                  className="form-select form-select-sm"
                  style={{ width: "75px" }}
                >
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>

                <span style={{ fontSize: "14px" }}>
                  data
                </span>
              </div>

              <button className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1">
                <RiFileCopyLine />
                Salin
              </button>

              <button className="btn btn-sm btn-outline-success d-flex align-items-center gap-1">
                <RiFileExcelLine />
                CSV
              </button>

              <button className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
                <RiFileExcel2Line />
                Excel
              </button>

              <button className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1">
                <RiFilePdf2Line />
                PDF
              </button>

              <button className="btn btn-sm btn-outline-dark d-flex align-items-center gap-1">
                <RiPrinterLine />
                Print
              </button>
            </div>

            {/* RIGHT */}
            <div className="d-flex align-items-center gap-2">
              <label className="small fw-semibold mb-0">
                Cari:
              </label>

              <input
                type="text"
                className="form-control form-control-sm"
                style={{ width: "220px" }}
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="table-responsive">
            <table
              className="table table-bordered align-middle mb-0"
              style={{
                fontSize: "0.85rem",
                whiteSpace: "nowrap",
              }}
            >
              <thead
                style={{
                  background: "#e9f1ff",
                }}
              >
                <tr className="text-center">
                  <th>No</th>
                  <th>Nama</th>
                  <th>NIP</th>
                  <th>Pendidikan</th>
                  <th>Golongan</th>
                  <th>Status Pegawai</th>
                  <th>Tanggal SK</th>
                  <th>Masa Kerja</th>
                  <th>Jabatan</th>
                  <th>No HP</th>
                  <th>Email</th>
                  <th>Jenis</th>
                  <th>Unit</th>
                  <th>Status</th>
                  <th width="120">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={15}
                      className="text-center py-4 text-muted"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, i) => (
                    <tr key={item.id}>
                      <td className="text-center">
                        {i + 1}
                      </td>

                      <td>{item.nama}</td>

                      <td>{item.nip}</td>

                      <td>{item.pendidikan || "-"}</td>

                      <td>{item.golongan || "-"}</td>

                      <td>
                        {item.status_pegawai || "-"}
                      </td>

                      <td className="text-center">
                        {item.tanggal_sk || "-"}
                      </td>

                      <td className="text-center">
                        {hitungMasaKerja(
                          item.tanggal_sk
                        )}
                      </td>

                      <td>{item.jabatan}</td>

                      <td>{item.no_hp || "-"}</td>

                      <td>{item.email || "-"}</td>

                      <td>
                        {item.jenis_pegawai || "-"}
                      </td>

                      <td>{item.unit}</td>

                      <td className="text-center">
                        <span
                          className={`badge ${
                            item.status === "Aktif"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-1">
                          {/* EDIT */}
                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(item)
                            }
                            className="btn btn-sm"
                            style={{
                              border:
                                "1px solid #0d6efd",
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
                            <RiPencilLine />
                          </button>

                          {/* DELETE */}
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(item.id)
                            }
                            className="btn btn-sm"
                            style={{
                              border:
                                "1px solid #dc3545",
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
                            <RiDeleteBinLine />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="d-flex justify-content-between align-items-center mt-3 small text-muted">
            <div>
              Menampilkan 1 sampai {filtered.length} dari{" "}
              {data.length} data
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-sm btn-light border">
                Sebelumnya
              </button>

              <button className="btn btn-sm btn-primary">
                1
              </button>

              <button className="btn btn-sm btn-light border">
                Berikutnya
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          className="modal d-block"
          style={{
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(3px)",
          }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              {/* HEADER */}
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">
                  {editId
                    ? "Edit Pegawai"
                    : "Tambah Pegawai"}
                </h5>

                <button
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowModal(false);

                    resetForm();
                  }}
                />
              </div>

              {/* BODY */}
              <div className="modal-body">
                <div className="row g-3">
                  <Input
                    label="Nama"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                  />

                  <Input
                    label="NIP"
                    name="nip"
                    value={form.nip}
                    onChange={handleChange}
                  />

                  <Input
                    label="Pendidikan"
                    name="pendidikan"
                    value={form.pendidikan}
                    onChange={handleChange}
                  />

                  <Input
                    label="Golongan"
                    name="golongan"
                    value={form.golongan}
                    onChange={handleChange}
                  />

                  <Input
                    label="Status Pegawai"
                    name="status_pegawai"
                    value={form.status_pegawai}
                    onChange={handleChange}
                  />

                  <Input
                    type="date"
                    label="Tanggal SK"
                    name="tanggal_sk"
                    value={form.tanggal_sk}
                    onChange={handleChange}
                  />

                  <Input
                    label="Jabatan"
                    name="jabatan"
                    value={form.jabatan}
                    onChange={handleChange}
                  />

                  <Input
                    label="No HP"
                    name="no_hp"
                    value={form.no_hp}
                    onChange={handleChange}
                  />

                  <Input
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />

                  <Input
                    label="Jenis Pegawai"
                    name="jenis_pegawai"
                    value={form.jenis_pegawai}
                    onChange={handleChange}
                  />

                  <Input
                    label="Unit"
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                  />

                  <div className="col-md-6">
                    <label className="form-label">
                      Status
                    </label>

                    <select
                      className="form-select"
                      name="status"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="">
                        -- Pilih Status --
                      </option>

                      <option value="Aktif">
                        Aktif
                      </option>

                      <option value="Tidak Aktif">
                        Tidak Aktif
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="modal-footer border-0 bg-light">
                <button
                  className="btn btn-secondary btn-sm px-3"
                  onClick={() => {
                    setShowModal(false);

                    resetForm();
                  }}
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

export default DataPegawai;

// ================= INPUT =================
const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div className="col-md-6">
      <label className="form-label fw-semibold small">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="form-control shadow-sm"
      />
    </div>
  );
};