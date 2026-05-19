import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import api from "../../utils/api";

import {
  RiAddLine,
  RiDeleteBinLine,
  RiPencilLine,
  RiTeamLine,
  RiFileExcel2Line,
  RiFilePdf2Line,
  RiPrinterLine,
  RiFileCopyLine,
  RiUpload2Line,
  RiDownload2Line,
  RiSearchLine,
} from "react-icons/ri";

// ─────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────
const DataPegawai = () => {
  const tableRef = useRef(null);

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ───────────────────────────────────────────────────────
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") {
        setShowModal(false);
        resetForm();
      }
    };

    if (showModal) {
      document.addEventListener("keydown", fn);
    }

    return () => document.removeEventListener("keydown", fn);
  }, [showModal]);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  // ───────────────────────────────────────────────────────
  const getData = async () => {
    setLoading(true);

    try {
      const res = await api.get("/pegawai");

      let result = [];

      if (Array.isArray(res.data)) {
        result = res.data;
      } else if (Array.isArray(res.data?.data)) {
        result = res.data.data;
      } else if (Array.isArray(res.data?.pegawai)) {
        result = res.data.pegawai;
      }

      setData(result);
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal mengambil data pegawai",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ───────────────────────────────────────────────────────
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
  };

  // ───────────────────────────────────────────────────────
  const handleSubmit = async () => {
    if (!form.nama || !form.jabatan || !form.unit || !form.status) {
      Swal.fire({
        icon: "warning",
        title: "Peringatan",
        text: "Nama, Jabatan, Unit, dan Status wajib diisi",
      });

      return;
    }

    const payload = {
      ...form,
      tanggal_sk: form.tanggal_sk
        ? String(form.tanggal_sk)
        : null,
    };

    try {
      if (editId) {
        await api.put(`/pegawai/${editId}`, payload);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil diupdate",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await api.post("/pegawai", payload);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil ditambahkan",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      setShowModal(false);
      resetForm();

      await getData();
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          err?.response?.data?.message ||
          "Terjadi kesalahan saat menyimpan",
      });
    }
  };

  // ───────────────────────────────────────────────────────
  const handleEdit = (item) => {
    setForm({
      ...initialForm,
      ...item,
      tanggal_sk: item.tanggal_sk
        ? String(item.tanggal_sk).split("T")[0]
        : "",
    });

    setEditId(item.id);
    setShowModal(true);
  };

  // ───────────────────────────────────────────────────────
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

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/pegawai/${id}`);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil dihapus",
        timer: 1500,
        showConfirmButton: false,
      });

      await getData();
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Gagal menghapus data",
      });
    }
  };

  // ───────────────────────────────────────────────────────
  const filtered = data.filter((item) => {
    const q = search.toLowerCase();

    return (
      item.nama?.toLowerCase().includes(q) ||
      item.nip?.toLowerCase().includes(q)
    );
  });

  // ───────────────────────────────────────────────────────
  const totalPage = Math.ceil(filtered.length / perPage) || 1;
  const start = (page - 1) * perPage;

  const currentData = filtered.slice(start, start + perPage);

  // ───────────────────────────────────────────────────────
  const exportHeaders = [
    "No",
    "Nama",
    "NIP",
    "Pendidikan",
    "Golongan",
    "Status Pegawai",
    "Tanggal SK",
    "Jabatan",
    "No HP",
    "Email",
    "Jenis Pegawai",
    "Unit",
    "Status",
  ];

  const getExportRows = () =>
    filtered.map((item, i) => [
      i + 1,
      item.nama || "",
      item.nip || "",
      item.pendidikan || "-",
      item.golongan || "-",
      item.status_pegawai || "-",
      item.tanggal_sk || "-",
      item.jabatan || "",
      item.no_hp || "-",
      item.email || "-",
      item.jenis_pegawai || "-",
      item.unit || "",
      item.status || "",
    ]);

  // ───────────────────────────────────────────────────────
  const handleCopy = () => {
    const text = [exportHeaders, ...getExportRows()]
      .map((r) => r.join("\t"))
      .join("\n");

    navigator.clipboard.writeText(text);

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Data berhasil disalin",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleCSV = () => {
    const csv = [exportHeaders, ...getExportRows()]
      .map((r) =>
        r
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
      })
    );

    const a = document.createElement("a");

    a.href = url;
    a.download = "data_pegawai.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleExcel = async () => {
    try {
      const XLSX = await import("xlsx");

      const wb = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.aoa_to_sheet([
          exportHeaders,
          ...getExportRows(),
        ]),
        "Data Pegawai"
      );

      XLSX.writeFile(wb, "data_pegawai.xlsx");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePDF = async () => {
    try {
      const { default: jsPDF } = await import("jspdf");

      await import("jspdf-autotable");

      const doc = new jsPDF({
        orientation: "landscape",
      });

      doc.text("Data Pegawai", 14, 15);

      doc.autoTable({
        head: [exportHeaders],
        body: getExportRows(),
        startY: 22,
      });

      doc.save("data_pegawai.pdf");
    } catch (err) {
      console.error(err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // ───────────────────────────────────────────────────────
  const exportBtnStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    padding: "4px 10px",
    fontSize: "0.8rem",
    borderRadius: 3,
    border: "1px solid #adb5bd",
    background: "#fff",
    cursor: "pointer",
  };

  // ───────────────────────────────────────────────────────
  return (
    <>
      <div
        className="container-fluid py-3"
        style={{
          background: "#f4f6f9",
          minHeight: "100vh",
        }}
      >

        {/* CARD */}
        <div className="card border-0 shadow-sm">
          {/* HEADER */}
          <div
            className="card-header d-flex justify-content-between align-items-center flex-wrap"
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

            <div className="d-flex gap-2 flex-wrap">
              <button className="btn btn-success btn-sm d-flex align-items-center gap-1">
                <RiDownload2Line />
                Download Template Excel
              </button>

              <button className="btn btn-warning btn-sm d-flex align-items-center gap-1">
                <RiUpload2Line />
                Upload Excel
              </button>

              <button
                type="button"
                className="btn btn-light btn-sm d-flex align-items-center gap-1"
                style={{
                  color: "#0d6efd",
                  fontWeight: 600,
                }}
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
            {/* FILTER */}
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <div className="d-flex align-items-center gap-2">
                <span style={{ fontSize: "0.85rem" }}>
                  Tampilkan
                </span>

                <select
                  className="form-select form-select-sm"
                  style={{ width: 70 }}
                  value={perPage}
                  onChange={(e) => {
                    setPerPage(Number(e.target.value));
                    setPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>

                <span style={{ fontSize: "0.85rem" }}>
                  data
                </span>
              </div>

              <div
                className="d-flex align-items-center gap-2"
                style={{ fontSize: "0.85rem" }}
              >
                <span>Cari:</span>

                <input
                  type="text"
                  className="form-control form-control-sm"
                  style={{ width: 180 }}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* EXPORT */}
            <div className="d-flex flex-wrap gap-2 mb-3">
              <button
                onClick={handleCopy}
                style={exportBtnStyle}
              >
                <RiFileCopyLine />
                Salin
              </button>

              <button
                onClick={handleCSV}
                style={exportBtnStyle}
              >
                <RiFileExcel2Line />
                CSV
              </button>

              <button
                onClick={handleExcel}
                style={exportBtnStyle}
              >
                <RiFileExcel2Line />
                Excel
              </button>

              <button
                onClick={handlePDF}
                style={exportBtnStyle}
              >
                <RiFilePdf2Line />
                PDF
              </button>

              <button
                onClick={handlePrint}
                style={exportBtnStyle}
              >
                <RiPrinterLine />
                Print
              </button>
            </div>

            {/* TABLE */}
            <div className="table-responsive">
              <table
                ref={tableRef}
                className="table table-bordered table-hover align-middle mb-0"
                style={{ fontSize: "0.83rem" }}
              >
                <thead className="table-light text-center">
                  <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>NIP</th>
                    <th>Pendidikan</th>
                    <th>Golongan</th>
                    <th>Status Pegawai</th>
                    <th>Tanggal SK</th>
                    <th>Jabatan</th>
                    <th>No HP</th>
                    <th>Email</th>
                    <th>Jenis</th>
                    <th>Unit</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={14}
                        className="text-center py-4"
                      >
                        ⏳ Memuat data...
                      </td>
                    </tr>
                  ) : currentData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={14}
                        className="text-center py-4"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    currentData.map((item, i) => (
                      <tr key={item.id}>
                        <td className="text-center">
                          {start + i + 1}
                        </td>

                        <td>
                          <strong>{item.nama || "-"}</strong>
                        </td>

                        <td>{item.nip || "-"}</td>

                        <td className="text-center">
                          {item.pendidikan || "-"}
                        </td>

                        <td className="text-center">
                          {item.golongan || "-"}
                        </td>

                        <td className="text-center">
                          {item.status_pegawai || "-"}
                        </td>

                        <td className="text-center">
                          {item.tanggal_sk || "-"}
                        </td>

                        <td>{item.jabatan || "-"}</td>

                        <td>{item.no_hp || "-"}</td>

                        <td>{item.email || "-"}</td>

                        <td>{item.jenis_pegawai || "-"}</td>

                        <td>{item.unit || "-"}</td>

                        <td className="text-center">
                          <span
                            className={`badge ${
                              item.status === "Aktif"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {item.status || "-"}
                          </span>
                        </td>

                        <td className="text-center">
                          <button
                            className="btn btn-primary btn-sm me-1"
                            onClick={() => handleEdit(item)}
                          >
                            <RiPencilLine />
                          </button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() =>
                              handleDelete(item.id)
                            }
                          >
                            <RiDeleteBinLine />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div
          onClick={() => {
            setShowModal(false);
            resetForm();
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1055,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              borderRadius: 8,
              width: "100%",
              maxWidth: 860,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                background: "#0d6efd",
                padding: "10px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h6 className="fw-bold mb-0 text-white">
                {editId
                  ? "✏️ Edit Pegawai"
                  : "➕ Tambah Pegawai"}
              </h6>

              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              />
            </div>

            {/* BODY */}
            <div className="p-4">
              <div className="row g-3">
                <Field
                  label="Nama *"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                />

                <Field
                  label="NIP"
                  name="nip"
                  value={form.nip}
                  onChange={handleChange}
                />

                <Field
                  label="Pendidikan"
                  name="pendidikan"
                  value={form.pendidikan}
                  onChange={handleChange}
                />

                <Field
                  label="Golongan"
                  name="golongan"
                  value={form.golongan}
                  onChange={handleChange}
                />

                <Field
                  label="Status Pegawai"
                  name="status_pegawai"
                  value={form.status_pegawai}
                  onChange={handleChange}
                />

                <Field
                  label="Tanggal SK"
                  name="tanggal_sk"
                  value={form.tanggal_sk}
                  onChange={handleChange}
                  type="date"
                />

                <Field
                  label="Jabatan *"
                  name="jabatan"
                  value={form.jabatan}
                  onChange={handleChange}
                />

                <Field
                  label="No HP"
                  name="no_hp"
                  value={form.no_hp}
                  onChange={handleChange}
                />

                <Field
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                />

                <Field
                  label="Jenis Pegawai"
                  name="jenis_pegawai"
                  value={form.jenis_pegawai}
                  onChange={handleChange}
                />

                <Field
                  label="Unit *"
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                />

                <div className="col-md-6">
                  <label className="form-label fw-semibold small">
                    Status *
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
            <div
              style={{
                borderTop: "1px solid #dee2e6",
                background: "#f8f9fa",
                padding: "12px 20px",
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
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
                className="btn btn-primary btn-sm px-3"
                onClick={handleSubmit}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataPegawai;

// ─────────────────────────────────────────────────────────
const Field = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}) => (
  <div className="col-md-6">
    <label className="form-label fw-semibold small">
      {label}
    </label>

    <input
      type={type}
      name={name}
      value={value ?? ""}
      onChange={onChange}
      className="form-control"
    />
  </div>
);