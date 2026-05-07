import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../../utils/api";

import {
  RiSearchLine,
  RiAddLine,
  RiUpload2Line,
  RiFilter3Fill,
  RiFileCopyLine,
  RiFileExcel2Line,
  RiFilePdf2Line,
  RiPrinterLine,
  RiEyeLine,
  RiPencilLine,
  RiDeleteBinLine,
} from "react-icons/ri";

const DataSiswa = () => {
  const navigate = useNavigate();
  const tableRef = useRef(null);

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [kelasList, setKelasList] = useState([]);
  const [filterKelas, setFilterKelas] = useState("");
  const [appliedKelas, setAppliedKelas] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  /* ── Fetch ────────────────────────────────────────────────────── */
  const getData = async () => {
    try {
      const res = await api.get("/siswa");
      const rows = res.data.data || [];
      setData(rows);
      const uniqueKelas = [...new Set(rows.map((r) => r.kelas).filter(Boolean))].sort();
      setKelasList(uniqueKelas);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { getData(); }, []);

  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") setShowModal(false); };
    if (showModal) document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [showModal]);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  /* ── Filter & paginasi ────────────────────────────────────────── */
  const filtered = data.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
      item.nama?.toLowerCase().includes(q) ||
      item.nis?.toLowerCase().includes(q);
    const matchKelas = appliedKelas ? item.kelas === appliedKelas : true;
    return matchSearch && matchKelas;
  });

  const totalPage   = Math.ceil(filtered.length / perPage);
  const start       = (page - 1) * perPage;
  const currentData = filtered.slice(start, start + perPage);

  /* ── CRUD ─────────────────────────────────────────────────────── */
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin hapus?",
      text: "Data tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya, hapus!",
    });
    if (result.isConfirmed) {
      try {
        await api.delete(`/siswa/${id}`);
        Swal.fire("Berhasil", "Data dihapus.", "success");
        getData();
      } catch {
        Swal.fire("Error", "Gagal menghapus data.", "error");
      }
    }
  };

  const handleViewDetail = async (id) => {
    try {
      const res = await api.get(`/siswa/${id}`);
      setSelectedSiswa(res.data.data || res.data);
      setShowModal(true);
    } catch {
      Swal.fire("Error", "Gagal mengambil detail siswa.", "error");
    }
  };

  /* ── Export ───────────────────────────────────────────────────── */
  const exportHeaders = ["#", "NIS", "Nama", "Tgl Lahir", "Alamat", "Kelas", "Status"];

  const getExportRows = () =>
    filtered.map((item, i) => [
      i + 1,
      item.nis || "",
      item.nama || "",
      item.tanggal_lahir || "-",
      item.alamat || "-",
      item.kelas || "",
      item.status || "Aktif",
    ]);

  const handleCopy = () => {
    const text = [exportHeaders, ...getExportRows()]
      .map((r) => r.join("\t"))
      .join("\n");
    navigator.clipboard.writeText(text)
      .then(() => Swal.fire("Berhasil", "Data disalin ke clipboard.", "success"))
      .catch(() => Swal.fire("Error", "Gagal menyalin data.", "error"));
  };

  const handleCSV = () => {
    const csv = [exportHeaders, ...getExportRows()]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" })
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "data_siswa.csv";
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
        "Data Siswa"
      );
      XLSX.writeFile(wb, "data_siswa.xlsx");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handlePDF = async () => {
    try {
      const { default: jsPDF } = await import("jspdf").catch(() => ({ default: null }));
      if (!jsPDF) {
        Swal.fire("Info", "Library jspdf belum terinstall.", "info");
        return;
      }
      await import("jspdf-autotable").catch(() => null);
      const doc = new jsPDF({ orientation: "landscape" });
      doc.setFontSize(14);
      doc.text("Data Siswa", 14, 15);
      doc.setFontSize(9);
      doc.text(`Dicetak: ${new Date().toLocaleDateString("id-ID")}`, 14, 22);
      doc.autoTable({
        head: [exportHeaders],
        body: getExportRows(),
        startY: 28,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [13, 110, 253] },
        alternateRowStyles: { fillColor: [245, 247, 250] },
      });
      doc.save("data_siswa.pdf");
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
      <html><head><title>Data Siswa</title>
      <style>
        body{font-family:Arial;padding:20px}
        table{border-collapse:collapse;width:100%;font-size:12px}
        th,td{border:1px solid #ccc;padding:6px}
        thead{background:#0d6efd;color:#fff}
        @media print{button{display:none}}
      </style></head><body>
      <h2 style="margin-bottom:4px">Data Siswa</h2>
      <p style="font-size:12px;color:#555;margin-top:0">
        Dicetak: ${new Date().toLocaleDateString("id-ID")} | Total: ${filtered.length} siswa
      </p>
      <table>
        <thead><tr>${exportHeaders.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows.map((r, i) =>
            `<tr style="background:${i % 2 === 0 ? "#fff" : "#f5f7fa"}">
              ${r.map((c) => `<td>${c}</td>`).join("")}
            </tr>`
          ).join("")}
        </tbody>
      </table><br>
      <button onclick="window.print()"
        style="padding:8px 16px;background:#0d6efd;color:#fff;border:none;border-radius:4px;cursor:pointer">
        Cetak
      </button>
      </body></html>
    `);
    win.document.close();
    win.focus();
  };

  /* ── Halaman pagination (dengan ellipsis) ─────────────────────── */
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

  /* ══════════════════════════════════════════════════════════════════ */
  return (
    <>
      <div className="container-fluid py-3" style={{ background: "#f4f6f9", minHeight: "100vh" }}>

        {/* ── FILTER KELAS ─────────────────────────────────────────── */}
        <div className="card mb-3" style={{ overflow: "visible" }}>
          <div className="card-body">
            <label className="fw-bold mb-1 d-block">Filter Kelas</label>
            <div className="d-flex flex-wrap gap-2 align-items-center">
              <select
                className="form-select form-select-sm"
                style={{ maxWidth: 220 }}
                value={filterKelas}
                onChange={(e) => setFilterKelas(e.target.value)}
              >
                <option value="">-- Semua Kelas --</option>
                {kelasList.map((k) => (
                  <option key={k} value={k}>{k}</option>
                ))}
              </select>
              <button
                type="button"
                className="btn btn-success btn-sm"
                onClick={() => { setAppliedKelas(filterKelas); setPage(1); }}
              >
                <RiFilter3Fill /> Terapkan
              </button>
              {appliedKelas && (
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => { setFilterKelas(""); setAppliedKelas(""); setPage(1); }}
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── TABEL CARD ───────────────────────────────────────────── */}
        <div className="card" style={{ overflow: "visible" }}>

          {/* Card Header */}
          <div className="card-header d-flex justify-content-between align-items-center">
            <b>Daftar Siswa</b>
            <div className="d-flex gap-2">
              <button type="button" className="btn btn-warning btn-sm">
                <RiUpload2Line /> Upload
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => navigate("/dashboard/tambah-siswa")}
              >
                <RiAddLine /> Tambah
              </button>
            </div>
          </div>

          {/* Card Body */}
          <div className="card-body" style={{ overflow: "visible" }}>

            {/* ── Baris 1: perPage + search ─────────────────────────── */}
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
                <span className="input-group-text bg-white"><RiSearchLine /></span>
                <input
                  className="form-control"
                  placeholder="Cari nama / NIS..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
            </div>

            {/* ── Baris 2: Tombol Export ────────────────────────────── */}
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
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 12px",
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    borderRadius: 4,
                    /* Warna eksplisit — tidak bisa di-override tema */
                    background: "#ffffff",
                    color: "#495057",
                    border: "1px solid #6c757d",
                    whiteSpace: "nowrap",
                  }}
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

            {/* ── Tabel ─────────────────────────────────────────────── */}
            <div className="table-responsive">
              <table
                ref={tableRef}
                className="table table-bordered table-hover align-middle mb-0"
                style={{ fontSize: "0.83rem" }}
              >
                <thead className="table-light text-center">
                  <tr>
                    <th style={{ width: 40 }}>#</th>
                    <th>NIS</th>
                    <th>Nama</th>
                    <th>Tgl Lahir</th>
                    <th>Alamat</th>
                    <th>Kelas</th>
                    <th>Status</th>
                    <th style={{ width: 120 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center text-muted py-4">
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    currentData.map((item, i) => (
                      <tr key={item.id}>
                        <td className="text-center">{start + i + 1}</td>
                        <td>{item.nis}</td>
                        <td>{item.nama}</td>
                        <td className="text-nowrap">{item.tanggal_lahir || "-"}</td>
                        <td>{item.alamat || "-"}</td>
                        <td className="text-center">{item.kelas}</td>
                        <td className="text-center">
                          <span className="badge bg-success">
                            {item.status || "Aktif"}
                          </span>
                        </td>
                        <td className="text-center text-nowrap">
                          <button
                            type="button"
                            className="btn btn-info btn-sm me-1"
                            title="Lihat Detail"
                            onClick={() => handleViewDetail(item.id)}
                          >
                            <RiEyeLine />
                          </button>
                          <Link
                            to={`/dashboard/edit-siswa/${item.id}`}
                            className="btn btn-primary btn-sm me-1"
                            title="Edit"
                          >
                            <RiPencilLine />
                          </Link>
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
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* ── Pagination ────────────────────────────────────────── */}
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
                  ? "Tidak ada data"
                  : `Menampilkan ${start + 1}–${Math.min(start + perPage, filtered.length)} dari ${filtered.length} data`}
                {appliedKelas && ` (kelas ${appliedKelas})`}
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

      {/* ── MODAL DETAIL ──────────────────────────────────────────────── */}
      {showModal && selectedSiswa && (
        <div
          onClick={() => setShowModal(false)}
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
              maxWidth: 900,
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "#0d6efd",
                borderRadius: "8px 8px 0 0",
                padding: "8px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h6 className="fw-bold mb-0 text-white">📄 Detail Lengkap Siswa</h6>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowModal(false)}
                aria-label="Tutup"
              />
            </div>

            {/* Body */}
            <div className="row g-0">
              {/* Kiri */}
              <div
                className="col-md-4 text-center p-4"
                style={{ borderRight: "1px solid #dee2e6", background: "#f8f9fa" }}
              >
                <img
                  src="https://i.pinimg.com/736x/97/fa/af/97faaf15ebb56f6caa72260fec663baf.jpg"
                  className="rounded-circle mb-3"
                  style={{ width: 110, height: 110, objectFit: "cover", border: "3px solid #dee2e6" }}
                  alt="Foto siswa"
                />
                <h5 className="fw-bold mb-1">{selectedSiswa.nama}</h5>
                <div className="text-muted small mb-2">NIS: {selectedSiswa.nis}</div>
                <span className="badge bg-success px-3 py-1">
                  {selectedSiswa.status || "Aktif"}
                </span>
                <div className="mt-3 small text-start">
                  <b>Kontak Siswa:</b>
                  <div>{selectedSiswa.hp || "-"}</div>
                </div>
              </div>

              {/* Kanan */}
              <div className="col-md-8 p-4">
                {[
                  {
                    title: "Data Pribadi",
                    rows: [
                      ["NIS / NISN", `${selectedSiswa.nis} / ${selectedSiswa.nisn}`],
                      ["Tempat, Tgl Lahir", `${selectedSiswa.tempat_lahir}, ${selectedSiswa.tanggal_lahir}`],
                      ["Jenis Kelamin", selectedSiswa.jenis_kelamin],
                      ["Agama", selectedSiswa.agama],
                      ["Golongan Darah", <span className="badge bg-danger">{selectedSiswa.golongan_darah || "-"}</span>],
                      ["Alamat", selectedSiswa.alamat],
                    ],
                  },
                  {
                    title: "Data Akademik",
                    rows: [
                      ["Kelas / Jurusan", `${selectedSiswa.kelas} / ${selectedSiswa.jurusan}`],
                      ["Tahun Ajaran", selectedSiswa.tahun_ajaran],
                      ["Tahun Masuk", selectedSiswa.tahun_masuk],
                      ["Sekolah Asal", selectedSiswa.sekolah_asal],
                    ],
                  },
                  {
                    title: "Data Keluarga",
                    rows: [
                      ["Ayah", `${selectedSiswa.ayah} (${selectedSiswa.pekerjaan_ayah})`],
                      ["Ibu", `${selectedSiswa.ibu} (${selectedSiswa.pekerjaan_ibu})`],
                      ["Wali", `${selectedSiswa.wali} (${selectedSiswa.hubungan_wali})`],
                      ["HP Orang Tua", `Ayah: ${selectedSiswa.hp_ayah} / Ibu: ${selectedSiswa.hp_ibu}`],
                      ["HP Wali", selectedSiswa.hp_wali],
                    ],
                  },
                ].map(({ title, rows }) => (
                  <React.Fragment key={title}>
                    <h6 className="fw-bold text-primary border-bottom pb-1 mb-2">{title}</h6>
                    <table className="table table-sm table-borderless small mb-3">
                      <tbody>
                        {rows.map(([label, val]) => (
                          <tr key={label}>
                            <td style={{ width: 160, color: "#6c757d" }}>{label}</td>
                            <td>: {val}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div
              style={{
                borderTop: "1px solid #dee2e6",
                background: "#f8f9fa",
                borderRadius: "0 0 8px 8px",
                padding: "12px 20px",
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setShowModal(false)}
              >
                Tutup
              </button>
              <button
                type="button"
                className="btn btn-dark btn-sm"
                onClick={() => window.print()}
              >
                🖨 Cetak
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataSiswa;