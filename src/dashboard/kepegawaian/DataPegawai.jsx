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
  nama: "", nip: "", pendidikan: "", golongan: "",
  status_pegawai: "", tanggal_sk: "", jabatan: "",
  no_hp: "", email: "", jenis_pegawai: "", unit: "", status: "",
};

// ─────────────────────────────────────────────────────────
const DataPegawai = () => {
  const tableRef = useRef(null);

  const [data,      setData]      = useState([]);
  const [search,    setSearch]    = useState("");
  const [page,      setPage]      = useState(1);
  const [perPage,   setPerPage]   = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [form,      setForm]      = useState(initialForm);
  const [editId,    setEditId]    = useState(null);
  const [loading,   setLoading]   = useState(false);

  // ── Escape key tutup modal ──
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") { setShowModal(false); resetForm(); } };
    if (showModal) document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [showModal]);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  // ── GET ──────────────────────────────────────────────────
  const getData = async () => {
    setLoading(true);
    try {
      const res = await api.get("/pegawai");
      let result = [];
      if (Array.isArray(res.data))               result = res.data;
      else if (Array.isArray(res.data?.data))    result = res.data.data;
      else if (Array.isArray(res.data?.pegawai)) result = res.data.pegawai;
      setData(result);
    } catch (err) {
      console.error("GET /pegawai:", err);
      Swal.fire({ icon: "error", title: "Error", text: "Gagal mengambil data pegawai" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getData(); }, []);

  // ── FORM ──────────────────────────────────────────────────
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const resetForm = () => { setForm(initialForm); setEditId(null); };

  const handleSubmit = async () => {
    if (!form.nama || !form.jabatan || !form.unit || !form.status) {
      Swal.fire({ icon: "warning", title: "Peringatan", text: "Nama, Jabatan, Unit, dan Status wajib diisi" });
      return;
    }
    const payload = { ...form, tanggal_sk: form.tanggal_sk || null };
    try {
      if (editId) {
        await api.put(`/pegawai/${editId}`, payload);
        Swal.fire({ icon: "success", title: "Berhasil", text: "Data berhasil diupdate", timer: 1500, showConfirmButton: false });
      } else {
        await api.post("/pegawai", payload);
        Swal.fire({ icon: "success", title: "Berhasil", text: "Data berhasil ditambahkan", timer: 1500, showConfirmButton: false });
      }
      setShowModal(false);
      resetForm();
      await getData();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err?.response?.data?.message || "Terjadi kesalahan saat menyimpan" });
    }
  };

  const handleEdit = (item) => {
    setForm({ ...initialForm, ...item });
    setEditId(item.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const res = await Swal.fire({
      title: "Yakin hapus data?", text: "Data akan dihapus permanen!",
      icon: "warning", showCancelButton: true,
      confirmButtonColor: "#dc3545", cancelButtonColor: "#6c757d",
      confirmButtonText: "Ya, hapus", cancelButtonText: "Batal",
    });
    if (!res.isConfirmed) return;
    try {
      await api.delete(`/pegawai/${id}`);
      Swal.fire({ icon: "success", title: "Berhasil", text: "Data berhasil dihapus", timer: 1500, showConfirmButton: false });
      await getData();
    } catch {
      Swal.fire({ icon: "error", title: "Error", text: "Gagal menghapus data" });
    }
  };

  // ── FILTER & PAGINASI ─────────────────────────────────────
  const filtered = data.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.nama?.toLowerCase().includes(q) ||
      item.nip?.toLowerCase().includes(q)
    );
  });

  const totalPage   = Math.ceil(filtered.length / perPage) || 1;
  const start       = (page - 1) * perPage;
  const currentData = filtered.slice(start, start + perPage);

  // ── MASA KERJA ────────────────────────────────────────────
  const hitungMasaKerja = (tgl) => {
    if (!tgl) return "-";
    const s = new Date(tgl);
    if (isNaN(s)) return "-";
    const now = new Date();
    let y = now.getFullYear() - s.getFullYear();
    let m = now.getMonth() - s.getMonth();
    if (m < 0) { y--; m += 12; }
    return `${y} tahun ${m} bulan`;
  };

  // ── PAGINATION NUMBERS ────────────────────────────────────
  const buildPageNumbers = () => {
    const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
    if (totalPage <= 7) return pages;
    const result = [];
    pages.forEach((p) => {
      if (p === 1 || p === totalPage || Math.abs(p - page) <= 1) {
        if (result.length && p - result[result.length - 1] > 1) result.push("…");
        result.push(p);
      }
    });
    return result;
  };

  // ── EXPORT HELPERS ────────────────────────────────────────
  const exportHeaders = ["No", "Nama", "NIP", "Pendidikan", "Golongan", "Status Pegawai",
    "Tanggal SK", "Masa Kerja", "Jabatan", "No HP", "Email", "Jenis Pegawai", "Unit", "Status"];

  const getExportRows = () =>
    filtered.map((item, i) => [
      i + 1,
      item.nama || "",
      item.nip || "",
      item.pendidikan || "-",
      item.golongan || "-",
      item.status_pegawai || "-",
      item.tanggal_sk || "-",
      hitungMasaKerja(item.tanggal_sk),
      item.jabatan || "",
      item.no_hp || "-",
      item.email || "-",
      item.jenis_pegawai || "-",
      item.unit || "",
      item.status || "",
    ]);

  const handleCopy = () => {
    const text = [exportHeaders, ...getExportRows()].map((r) => r.join("\t")).join("\n");
    navigator.clipboard.writeText(text)
      .then(() => Swal.fire({ icon: "success", title: "Berhasil", text: "Data disalin ke clipboard.", timer: 1500, showConfirmButton: false }))
      .catch(() => Swal.fire("Error", "Gagal menyalin data.", "error"));
  };

  const handleCSV = () => {
    const csv = [exportHeaders, ...getExportRows()]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url; a.download = "data_pegawai.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const handleExcel = async () => {
    try {
      const XLSX = await import("xlsx").catch(() => null);
      if (!XLSX) { Swal.fire("Info", "Library xlsx belum terinstall.", "info"); return; }
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb,
        XLSX.utils.aoa_to_sheet([exportHeaders, ...getExportRows()]),
        "Data Pegawai"
      );
      XLSX.writeFile(wb, "data_pegawai.xlsx");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handlePDF = async () => {
    try {
      const { default: jsPDF } = await import("jspdf").catch(() => ({ default: null }));
      if (!jsPDF) { Swal.fire("Info", "Library jspdf belum terinstall.", "info"); return; }
      await import("jspdf-autotable").catch(() => null);
      const doc = new jsPDF({ orientation: "landscape" });
      doc.setFontSize(14);
      doc.text("Data Pegawai", 14, 15);
      doc.setFontSize(9);
      doc.text(`Dicetak: ${new Date().toLocaleDateString("id-ID")}`, 14, 22);
      doc.autoTable({
        head: [exportHeaders],
        body: getExportRows(),
        startY: 28,
        styles: { fontSize: 7 },
        headStyles: { fillColor: [13, 110, 253] },
        alternateRowStyles: { fillColor: [245, 247, 250] },
      });
      doc.save("data_pegawai.pdf");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handlePrint = () => {
    const rows = getExportRows();
    const win = window.open("", "_blank");
    if (!win) { Swal.fire("Error", "Pop-up diblokir browser.", "error"); return; }
    win.document.write(`
      <html><head><title>Data Pegawai</title>
      <style>
        body{font-family:Arial;padding:20px}
        h2{margin-bottom:4px}
        p{font-size:12px;color:#555;margin-top:0}
        table{border-collapse:collapse;width:100%;font-size:11px}
        th,td{border:1px solid #ccc;padding:5px 7px}
        thead{background:#0d6efd;color:#fff}
        tr:nth-child(even){background:#f5f7fa}
        @media print{button{display:none}}
      </style></head><body>
      <h2>Data Pegawai</h2>
      <p>Dicetak: ${new Date().toLocaleDateString("id-ID")} &nbsp;|&nbsp; Total: ${filtered.length} pegawai</p>
      <table>
        <thead><tr>${exportHeaders.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table><br>
      <button onclick="window.print()"
        style="padding:8px 16px;background:#0d6efd;color:#fff;border:none;border-radius:4px;cursor:pointer">
        🖨 Cetak
      </button>
      </body></html>
    `);
    win.document.close();
    win.focus();
  };

  // ── STYLE helpers ────────────────────────────────────────
  const exportBtnStyle = {
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "4px 12px", fontSize: "0.8rem", cursor: "pointer",
    borderRadius: 4, background: "#ffffff", color: "#495057",
    border: "1px solid #6c757d", whiteSpace: "nowrap",
  };
  const exportBtnHover = (e, enter) => {
    e.currentTarget.style.background = enter ? "#f8f9fa" : "#ffffff";
    e.currentTarget.style.color      = enter ? "#343a40" : "#495057";
  };

  // ─────────────────────────────────────────────────────────
  return (
    <>
      <div className="container-fluid py-3" style={{ background: "#f4f6f9", minHeight: "100vh" }}>

        {/* ══ TABEL CARD ══════════════════════════════════════════ */}
        <div className="card" style={{ overflow: "visible" }}>

          {/* Card Header */}
          <div
            className="card-header d-flex justify-content-between align-items-center"
            style={{ background: "#0d6efd", color: "#fff", padding: "10px 16px" }}
          >
            <div className="d-flex align-items-center gap-2 fw-semibold">
              <RiTeamLine size={18} />
              <span>Data Pegawai</span>
            </div>
            <div className="d-flex gap-2 flex-wrap">
              <button
                type="button"
                className="btn btn-success btn-sm d-flex align-items-center gap-1"
              >
                <RiDownload2Line /> Download Template Excel
              </button>
              <button
                type="button"
                className="btn btn-warning btn-sm d-flex align-items-center gap-1"
              >
                <RiUpload2Line /> Upload Excel
              </button>
              <button
                type="button"
                className="btn btn-light btn-sm d-flex align-items-center gap-1"
                style={{ color: "#0d6efd", fontWeight: 600 }}
                onClick={() => { resetForm(); setShowModal(true); }}
              >
                <RiAddLine /> Tambah Pegawai
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="card-body" style={{ overflow: "visible" }}>

            {/* Baris 1: perPage + Search */}
            <div
              style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "0.85rem" }}>Tampilkan</span>
                <select
                  className="form-select form-select-sm"
                  style={{ width: 70 }}
                  value={perPage}
                  onChange={(e) => { setPerPage(Number(e.target.value)); setPage(1); }}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span style={{ fontSize: "0.85rem" }}>data</span>
              </div>

              <div className="input-group input-group-sm" style={{ width: 240 }}>
                <span className="input-group-text bg-white">
                  <RiSearchLine />
                </span>
                <input
                  className="form-control"
                  placeholder="Cari nama / NIP..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
            </div>

            {/* Baris 2: Tombol Export */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              {[
                { label: "Salin",  icon: <RiFileCopyLine />,   fn: handleCopy  },
                { label: "CSV",    icon: <RiFileExcel2Line />,  fn: handleCSV   },
                { label: "Excel",  icon: <RiFileExcel2Line />,  fn: handleExcel },
                { label: "PDF",    icon: <RiFilePdf2Line />,    fn: handlePDF   },
                { label: "Print",  icon: <RiPrinterLine />,     fn: handlePrint },
              ].map(({ label, icon, fn }) => (
                <button
                  key={label}
                  type="button"
                  onClick={fn}
                  style={exportBtnStyle}
                  onMouseEnter={(e) => exportBtnHover(e, true)}
                  onMouseLeave={(e) => exportBtnHover(e, false)}
                >
                  {icon} {label}
                </button>
              ))}
            </div>

            {/* Tabel */}
            <div className="table-responsive">
              <table
                ref={tableRef}
                className="table table-bordered table-hover align-middle mb-0"
                style={{ fontSize: "0.83rem" }}
              >
                <thead className="table-light text-center">
                  <tr>
                    <th style={{ width: 40 }}>No</th>
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
                    <th style={{ width: 100 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={15} className="text-center text-muted py-4">
                        ⏳ Memuat data...
                      </td>
                    </tr>
                  ) : currentData.length === 0 ? (
                    <tr>
                      <td colSpan={15} className="text-center text-muted py-4">
                        Tidak ada data
                      </td>
                    </tr>
                  ) : currentData.map((item, i) => (
                    <tr key={item.id}>
                      <td className="text-center">{start + i + 1}</td>
                      <td><strong>{item.nama || "-"}</strong></td>
                      <td>{item.nip || "-"}</td>
                      <td className="text-center">{item.pendidikan || "-"}</td>
                      <td className="text-center">{item.golongan || "-"}</td>
                      <td className="text-center">{item.status_pegawai || "-"}</td>
                      <td className="text-center text-nowrap">{item.tanggal_sk || "-"}</td>
                      <td className="text-center text-nowrap">{hitungMasaKerja(item.tanggal_sk)}</td>
                      <td>{item.jabatan || "-"}</td>
                      <td className="text-center">{item.no_hp || "-"}</td>
                      <td>{item.email || "-"}</td>
                      <td className="text-center">{item.jenis_pegawai || "-"}</td>
                      <td>{item.unit || "-"}</td>
                      <td className="text-center">
                        <span className={`badge ${item.status === "Aktif" ? "bg-success" : "bg-danger"}`}>
                          {item.status || "-"}
                        </span>
                      </td>
                      <td className="text-center text-nowrap">
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-1"
                          title="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <RiPencilLine />
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          title="Hapus"
                          onClick={() => handleDelete(item.id)}
                        >
                          <RiDeleteBinLine />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div
              style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", flexWrap: "wrap", gap: 8,
                marginTop: 12, fontSize: "0.83rem",
              }}
            >
              <span className="text-muted">
                {filtered.length === 0
                  ? "Tidak ada data"
                  : `Menampilkan ${start + 1}–${Math.min(start + perPage, filtered.length)} dari ${filtered.length} data`}
              </span>

              {totalPage > 1 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    &laquo;
                  </button>
                  {buildPageNumbers().map((p, idx) =>
                    p === "…" ? (
                      <span key={`e${idx}`} className="btn btn-sm btn-light disabled">…</span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        className={`btn btn-sm ${page === p ? "btn-primary" : "btn-light"}`}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </button>
                    )
                  )}
                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    disabled={page === totalPage}
                    onClick={() => setPage(page + 1)}
                  >
                    &raquo;
                  </button>
                </div>
              )}
            </div>
          </div>{/* /card-body */}
        </div>{/* /card */}
      </div>

      {/* ══ MODAL TAMBAH / EDIT ══════════════════════════════════ */}
      {showModal && (
        <div
          onClick={() => { setShowModal(false); resetForm(); }}
          style={{
            position: "fixed", inset: 0, zIndex: 1055,
            background: "rgba(0,0,0,0.55)", backdropFilter: "blur(3px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: 8,
              width: "100%", maxWidth: 860, maxHeight: "90vh",
              overflowY: "auto", boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                background: "#0d6efd", borderRadius: "8px 8px 0 0",
                padding: "10px 20px", display: "flex",
                justifyContent: "space-between", alignItems: "center",
              }}
            >
              <h6 className="fw-bold mb-0 text-white">
                {editId ? "✏️ Edit Pegawai" : "➕ Tambah Pegawai"}
              </h6>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => { setShowModal(false); resetForm(); }}
              />
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <div className="row g-3">
                <Field label="Nama *"          name="nama"           value={form.nama}           onChange={handleChange} />
                <Field label="NIP"             name="nip"            value={form.nip}            onChange={handleChange} />
                <Field label="Pendidikan"      name="pendidikan"     value={form.pendidikan}     onChange={handleChange} />
                <Field label="Golongan"        name="golongan"       value={form.golongan}       onChange={handleChange} />
                <Field label="Status Pegawai"  name="status_pegawai" value={form.status_pegawai} onChange={handleChange} />
                <Field label="Tanggal SK"      name="tanggal_sk"     value={form.tanggal_sk}     onChange={handleChange} type="date" />
                <Field label="Jabatan *"       name="jabatan"        value={form.jabatan}        onChange={handleChange} />
                <Field label="No HP"           name="no_hp"          value={form.no_hp}          onChange={handleChange} />
                <Field label="Email"           name="email"          value={form.email}          onChange={handleChange} type="email" />
                <Field label="Jenis Pegawai"   name="jenis_pegawai"  value={form.jenis_pegawai}  onChange={handleChange} />
                <Field label="Unit *"          name="unit"           value={form.unit}           onChange={handleChange} />

                {/* Status */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Status *</label>
                  <select
                    className="form-select"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="">-- Pilih Status --</option>
                    <option value="Aktif">Aktif</option>
                    <option value="Tidak Aktif">Tidak Aktif</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div
              style={{
                borderTop: "1px solid #dee2e6", background: "#f8f9fa",
                borderRadius: "0 0 8px 8px", padding: "12px 20px",
                display: "flex", justifyContent: "flex-end", gap: 8,
              }}
            >
              <button
                type="button"
                className="btn btn-secondary btn-sm px-3"
                onClick={() => { setShowModal(false); resetForm(); }}
              >
                Batal
              </button>
              <button
                type="button"
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
// FIELD HELPER
// ─────────────────────────────────────────────────────────
const Field = ({ label, name, value, onChange, type = "text" }) => (
  <div className="col-md-6">
    <label className="form-label fw-semibold small">{label}</label>
    <input
      type={type}
      name={name}
      value={value ?? ""}
      onChange={onChange}
      className="form-control"
    />
  </div>
);