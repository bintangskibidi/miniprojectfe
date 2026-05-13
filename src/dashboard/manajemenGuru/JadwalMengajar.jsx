import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../utils/api";

import {
  RiAddLine,
  RiSearchLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiFileCopyLine,
  RiFileExcel2Line,
  RiFilePdf2Line,
  RiPrinterLine,
} from "react-icons/ri";

const initialForm = {
  guru: "",
  mapel: "",
  kelas: "",
  hari: "",
  jamMulai: "",
  jamSelesai: "",
};

const HARI_LIST = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const TAHUN_AJARAN = ["2023/2024", "2024/2025", "2025/2026", "2026/2027"];

const exportBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "4px 12px",
  fontSize: "0.8rem",
  cursor: "pointer",
  borderRadius: 4,
  background: "#ffffff",
  color: "#495057",
  border: "1px solid #6c757d",
  whiteSpace: "nowrap",
};

const JadwalMengajar = () => {
  const [data, setData] = useState([]);
  const [dropdown, setDropdown] = useState({ guru: [], mapel: [], kelas: [] });

  /* filter & tabel */
  const [tahunAjaran, setTahunAjaran] = useState("2025/2026");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  /* modal */
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(initialForm);

  /* ── Fetch ────────────────────────────────────────────────────── */
  const fetchData = async () => {
    try {
      const res = await api.get("/jadwal", {
        params: { tahun_ajaran: tahunAjaran },
      });
      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDropdown = async () => {
    try {
      const res = await api.get("/jadwal/dropdown");
      const d = res.data.data || res.data;
      setDropdown({
        guru: d.guru || [],
        mapel: d.mapel || [],
        kelas: d.kelas || [],
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tahunAjaran]);
  useEffect(() => {
    fetchDropdown();
  }, []);

  /* tutup modal dengan ESC */
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (showModal) document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [showModal]);

  /* blokir scroll body saat modal buka */
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  /* ── Modal helpers ────────────────────────────────────────────── */
  const openTambah = () => {
    setForm(initialForm);
    setEditId(null);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const handleEdit = (item) => {
    setForm({
      guru: String(item.guru_id ?? ""),
      mapel: String(item.mapel_id ?? ""),
      kelas: String(item.kelas_id ?? ""),
      hari: item.hari ?? "",
      jamMulai: item.jam_mulai ?? "",
      jamSelesai: item.jam_selesai ?? "",
    });
    setEditId(item.id);
    setShowModal(true);
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  /* ── CRUD ─────────────────────────────────────────────────────── */
  const handleSimpan = async () => {
    const { guru, mapel, kelas, hari, jamMulai, jamSelesai } = form;
    if (!guru || !mapel || !kelas || !hari || !jamMulai || !jamSelesai) {
      Swal.fire("Peringatan", "Semua field wajib diisi.", "warning");
      return;
    }

    const payload = {
      guru_id: guru,
      mapel_id: mapel,
      kelas_id: kelas,
      hari,
      jam_mulai: jamMulai,
      jam_selesai: jamSelesai,
      tahun_ajaran: tahunAjaran,
    };

    try {
      if (editId !== null) {
        await api.put(`/jadwal/${editId}`, payload);
      } else {
        await api.post("/jadwal", payload);
      }
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data tersimpan.",
        timer: 1500,
        showConfirmButton: false,
      });
      fetchData();
      closeModal();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Gagal menyimpan data.", "error");
    }
  };

  const handleHapus = async (id) => {
    const result = await Swal.fire({
      title: "Yakin hapus?",
      text: "Data tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya, hapus!",
    });
    if (!result.isConfirmed) return;
    try {
      await api.delete(`/jadwal/${id}`);
      Swal.fire({
        icon: "success",
        title: "Dihapus",
        timer: 1200,
        showConfirmButton: false,
      });
      fetchData();
    } catch {
      Swal.fire("Error", "Gagal menghapus data.", "error");
    }
  };

  /* ── Filter & Paginasi ────────────────────────────────────────── */
  const filtered = data.filter((item) => {
    const q = search.toLowerCase();
    return (
      item.guru?.toLowerCase().includes(q) ||
      item.mapel?.toLowerCase().includes(q) ||
      item.kelas?.toLowerCase().includes(q) ||
      item.hari?.toLowerCase().includes(q)
    );
  });

  const totalPage = Math.ceil(filtered.length / perPage) || 1;
  const safePage = Math.min(page, totalPage);
  const start = (safePage - 1) * perPage;
  const currentData = filtered.slice(start, start + perPage);

  const buildPageNumbers = () => {
    const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
    if (totalPage <= 7) return pages;
    const result = [];
    pages.forEach((p) => {
      if (p === 1 || p === totalPage || Math.abs(p - safePage) <= 1) {
        if (result.length && p - result[result.length - 1] > 1)
          result.push("…");
        result.push(p);
      }
    });
    return result;
  };

  /* ── Export helpers ───────────────────────────────────────────── */
  const exportHeaders = [
    "No",
    "Guru",
    "Mata Pelajaran",
    "Kelas",
    "Hari",
    "Jam Mulai",
    "Jam Selesai",
  ];

  const getExportRows = () =>
    filtered.map((item, i) => [
      i + 1,
      item.guru || "",
      item.mapel || "",
      item.kelas || "",
      item.hari || "",
      item.jam_mulai || "",
      item.jam_selesai || "",
    ]);

  const handleCopy = () => {
    const text = [exportHeaders, ...getExportRows()]
      .map((r) => r.join("\t"))
      .join("\n");
    navigator.clipboard
      .writeText(text)
      .then(() =>
        Swal.fire("Berhasil", "Data disalin ke clipboard.", "success"),
      )
      .catch(() => Swal.fire("Error", "Gagal menyalin data.", "error"));
  };

  const handleCSV = () => {
    const csv = [exportHeaders, ...getExportRows()]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "jadwal_mengajar.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExcel = async () => {
    try {
      const XLSX = await import("xlsx").catch(() => null);
      if (!XLSX) {
        Swal.fire("Info", "Library xlsx belum terinstall.", "info");
        return;
      }
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.aoa_to_sheet([exportHeaders, ...getExportRows()]),
        "Jadwal",
      );
      XLSX.writeFile(wb, "jadwal_mengajar.xlsx");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handlePDF = async () => {
    try {
      const { default: jsPDF } = await import("jspdf").catch(() => ({
        default: null,
      }));
      if (!jsPDF) {
        Swal.fire("Info", "Library jspdf belum terinstall.", "info");
        return;
      }
      await import("jspdf-autotable").catch(() => null);
      const doc = new jsPDF({ orientation: "landscape" });
      doc.setFontSize(14);
      doc.text("Jadwal Mengajar", 14, 15);
      doc.setFontSize(9);
      doc.text(
        `Tahun Ajaran: ${tahunAjaran} | Dicetak: ${new Date().toLocaleDateString("id-ID")}`,
        14,
        22,
      );
      doc.autoTable({
        head: [exportHeaders],
        body: getExportRows(),
        startY: 28,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [13, 110, 253] },
        alternateRowStyles: { fillColor: [245, 247, 250] },
      });
      doc.save("jadwal_mengajar.pdf");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handlePrint = () => {
    const rows = getExportRows();
    const win = window.open("", "_blank");
    if (!win) {
      Swal.fire("Error", "Pop-up diblokir browser.", "error");
      return;
    }
    win.document.write(`
      <html><head><title>Jadwal Mengajar</title>
      <style>
        body{font-family:Arial;padding:20px}
        table{border-collapse:collapse;width:100%;font-size:12px}
        th,td{border:1px solid #ccc;padding:6px}
        thead{background:#0d6efd;color:#fff}
        @media print{button{display:none}}
      </style></head><body>
      <h2 style="margin-bottom:2px">Jadwal Mengajar</h2>
      <p style="font-size:12px;color:#555;margin-top:0">
        Tahun Ajaran: ${tahunAjaran} | Dicetak: ${new Date().toLocaleDateString("id-ID")} | Total: ${filtered.length} data
      </p>
      <table>
        <thead><tr>${exportHeaders.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows
            .map(
              (r, i) =>
                `<tr style="background:${i % 2 === 0 ? "#fff" : "#f5f7fa"}">
              ${r.map((c) => `<td>${c}</td>`).join("")}
            </tr>`,
            )
            .join("")}
        </tbody>
      </table><br>
      <button onclick="window.print()"
        style="padding:8px 16px;background:#0d6efd;color:#fff;border:none;border-radius:4px;cursor:pointer">
        Cetak
      </button></body></html>
    `);
    win.document.close();
    win.focus();
  };

  /* ══════════════════════════════════════════════════════════════════ */
  return (
    <>
      <div className="container-fluid py-3">
        {/* ── JUDUL ───────────────────────────────────────────────── */}
        <h4 className="fw-bold mb-1">Jadwal Mengajar</h4>

        {/* ── FILTER TAHUN AJARAN ──────────────────────────────────── */}
        <div className="mb-3">
          <label className="form-label small fw-semibold mb-1">
            Filter Tahun Ajaran:
          </label>
          <select
            className="form-select form-select-sm"
            style={{ maxWidth: 200 }}
            value={tahunAjaran}
            onChange={(e) => {
              setTahunAjaran(e.target.value);
              setPage(1);
            }}
          >
            {TAHUN_AJARAN.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* ── CARD TABEL ───────────────────────────────────────────── */}
        <div className="card" style={{ overflow: "visible" }}>
          {/* Card Header */}
          <div className="card-header d-flex justify-content-between align-items-center">
            <span style={{ fontSize: "0.85rem", color: "#555" }}>
              Daftar Jadwal Mengajar Tahun Ajaran: <b>{tahunAjaran}</b>
            </span>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={openTambah}
            >
              <RiAddLine /> Tambah Jadwal
            </button>
          </div>

          {/* Card Body */}
          <div className="card-body" style={{ overflow: "visible" }}>
            {/* ── Baris 1: Show entries + Search ─────────────────── */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 10,
              }}
            >
              {/* Show N entries */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "0.85rem" }}>Show</span>
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
                <span style={{ fontSize: "0.85rem" }}>entries</span>
              </div>

              {/* Search */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "0.85rem" }}>Search:</span>
                <div
                  className="input-group input-group-sm"
                  style={{ width: 220 }}
                >
                  <span className="input-group-text bg-white">
                    <RiSearchLine />
                  </span>
                  <input
                    className="form-control"
                    placeholder="Cari guru, mapel, kelas..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* ── Baris 2: Tombol Export ──────────────────────────── */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 12,
              }}
            >
              {[
                { label: "Salin", icon: <RiFileCopyLine />, fn: handleCopy },
                { label: "CSV", icon: <RiFileExcel2Line />, fn: handleCSV },
                { label: "Excel", icon: <RiFileExcel2Line />, fn: handleExcel },
                { label: "PDF", icon: <RiFilePdf2Line />, fn: handlePDF },
                { label: "Print", icon: <RiPrinterLine />, fn: handlePrint },
              ].map(({ label, icon, fn }) => (
                <button
                  key={label}
                  type="button"
                  onClick={fn}
                  style={exportBtnStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f8f9fa";
                    e.currentTarget.style.color = "#343a40";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#ffffff";
                    e.currentTarget.style.color = "#495057";
                  }}
                >
                  {icon} {label}
                </button>
              ))}
            </div>

            {/* ── Tabel ───────────────────────────────────────────── */}
            <div className="table-responsive">
              <table
                className="table table-bordered table-hover align-middle mb-0"
                style={{ fontSize: "0.83rem" }}
              >
                <thead className="table-primary text-center">
                  <tr>
                    <th style={{ width: 45 }}>No</th>
                    <th>Guru</th>
                    <th>Mata Pelajaran</th>
                    <th>Kelas</th>
                    <th>Hari</th>
                    <th>Jam</th>
                    <th style={{ width: 120 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center text-muted py-4">
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    currentData.map((item, i) => (
                      <tr key={item.id}>
                        <td className="text-center">{start + i + 1}</td>
                        <td>{item.guru}</td>
                        <td>{item.mapel}</td>
                        <td>{item.kelas}</td>
                        <td>{item.hari}</td>
                        <td className="text-nowrap">
                          {item.jam_mulai} - {item.jam_selesai}
                        </td>
                        <td className="text-center text-nowrap">
                          <button
                            type="button"
                            className="btn btn-warning btn-sm me-1"
                            title="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            <RiPencilLine /> Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            title="Hapus"
                            onClick={() => handleHapus(item.id)}
                          >
                            <RiDeleteBinLine /> Hapus
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Pagination ──────────────────────────────────────── */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
                marginTop: 12,
                fontSize: "0.83rem",
              }}
            >
              <span className="text-muted">
                {filtered.length === 0
                  ? "No entries to show"
                  : `Showing ${start + 1} to ${Math.min(start + perPage, filtered.length)} of ${filtered.length} entries`}
              </span>

              {totalPage > 1 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    disabled={safePage === 1}
                    onClick={() => setPage(safePage - 1)}
                  >
                    Previous
                  </button>
                  {buildPageNumbers().map((p, idx) =>
                    p === "…" ? (
                      <span
                        key={`e${idx}`}
                        className="btn btn-sm btn-light disabled"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        type="button"
                        className={`btn btn-sm ${safePage === p ? "btn-primary" : "btn-light"}`}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </button>
                    ),
                  )}
                  <button
                    type="button"
                    className="btn btn-sm btn-light"
                    disabled={safePage === totalPage}
                    onClick={() => setPage(safePage + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* /card-body */}
        </div>
        {/* /card */}
      </div>

      {/* ── MODAL TAMBAH / EDIT ─────────────────────────────────────── */}
      {showModal && (
        <div
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1055,
            background: "rgba(0,0,0,0.5)",
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
              maxWidth: 480,
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "14px 20px",
                borderBottom: "1px solid #dee2e6",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h5 style={{ margin: 0, fontWeight: 600, fontSize: "1rem" }}>
                {editId !== null
                  ? "Edit Jadwal Mengajar"
                  : "Tambah Jadwal Mengajar"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={closeModal}
                aria-label="Tutup"
              />
            </div>

            {/* Body */}
            <div style={{ padding: "20px" }}>
              {/* Guru */}
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  Guru
                </label>
                <select
                  name="guru"
                  value={form.guru}
                  onChange={handleChange}
                  className="form-select form-select-sm"
                >
                  <option value="">-- Pilih Guru --</option>
                  {dropdown.guru.map((g) => (
                    <option key={g.id} value={String(g.id)}>
                      {g.nama}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mata Pelajaran */}
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  Mata Pelajaran
                </label>
                <select
                  name="mapel"
                  value={form.mapel}
                  onChange={handleChange}
                  className="form-select form-select-sm"
                >
                  <option value="">-- Pilih Mapel --</option>
                  {dropdown.mapel.map((m) => (
                    <option key={m.id} value={String(m.id)}>
                      {m.nama}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kelas */}
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  Kelas
                </label>
                <select
                  name="kelas"
                  value={form.kelas}
                  onChange={handleChange}
                  className="form-select form-select-sm"
                >
                  <option value="">-- Pilih Kelas --</option>
                  {dropdown.kelas.map((k) => (
                    <option key={k.id} value={String(k.id)}>
                      {k.nama}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hari */}
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    marginBottom: 4,
                  }}
                >
                  Hari
                </label>
                <select
                  name="hari"
                  value={form.hari}
                  onChange={handleChange}
                  className="form-select form-select-sm"
                >
                  <option value="">-- Pilih Hari --</option>
                  {HARI_LIST.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              {/* Jam Mulai & Selesai */}
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      marginBottom: 4,
                    }}
                  >
                    Jam Mulai
                  </label>
                  <input
                    type="time"
                    name="jamMulai"
                    value={form.jamMulai}
                    onChange={handleChange}
                    className="form-control form-control-sm"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.85rem",
                      fontWeight: 500,
                      marginBottom: 4,
                    }}
                  >
                    Jam Selesai
                  </label>
                  <input
                    type="time"
                    name="jamSelesai"
                    value={form.jamSelesai}
                    onChange={handleChange}
                    className="form-control form-control-sm"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "12px 20px",
                borderTop: "1px solid #dee2e6",
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={closeModal}
              >
                Batal
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleSimpan}
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

export default JadwalMengajar;
