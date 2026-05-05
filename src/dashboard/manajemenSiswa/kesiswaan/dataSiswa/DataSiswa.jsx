import React, { useEffect, useState, useRef } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../../utils/api";

import {
  RiTeamLine,
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

// ─── jsPDF + autoTable (loaded from CDN via script tag if not installed) ───
// Install: npm install jspdf jspdf-autotable xlsx
// If unavailable, functions fall back gracefully.

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

  // ── Fetch data ──────────────────────────────────────────────────────────
  const getData = async () => {
    try {
      const res = await api.get("/siswa");
      const rows = res.data.data || [];
      setData(rows);

      // Build kelas options dynamically
      const uniqueKelas = [
        ...new Set(rows.map((r) => r.kelas).filter(Boolean)),
      ].sort();
      setKelasList(uniqueKelas);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ── Filter & pagination ──────────────────────────────────────────────────
  const filtered = data.filter((item) => {
    const matchSearch =
      item.nama?.toLowerCase().includes(search.toLowerCase()) ||
      item.nis?.toLowerCase().includes(search.toLowerCase());
    const matchKelas = appliedKelas ? item.kelas === appliedKelas : true;
    return matchSearch && matchKelas;
  });

  const totalPage = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const currentData = filtered.slice(start, start + perPage);

  const handleApplyFilter = () => {
    setAppliedKelas(filterKelas);
    setPage(1);
  };

  // ── CRUD ────────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin hapus?",
      icon: "warning",
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      await api.delete(`/siswa/${id}`);
      Swal.fire("Berhasil", "Data dihapus", "success");
      getData();
    }
  };

  const handleViewDetail = async (id) => {
    try {
      const res = await api.get(`/siswa/${id}`);
      setSelectedSiswa(res.data.data || res.data);
      setShowModal(true);
    } catch {
      Swal.fire("Error", "Gagal ambil detail", "error");
    }
  };

  // ── Export helpers ────────────────────────────────────────────────────────
  /** Columns shown in exports */
  const exportHeaders = [
    "#",
    "NIS",
    "Nama",
    "Tgl Lahir",
    "Alamat",
    "Kelas",
    "Status",
  ];

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

  // 1. Copy ──────────────────────────────────────────────────────────────────
  const handleCopy = () => {
    const rows = getExportRows();
    const text = [
      exportHeaders.join("\t"),
      ...rows.map((r) => r.join("\t")),
    ].join("\n");
    navigator.clipboard
      .writeText(text)
      .then(() =>
        Swal.fire("Berhasil", "Data berhasil disalin ke clipboard", "success"),
      )
      .catch(() => Swal.fire("Error", "Gagal menyalin data", "error"));
  };

  // 2. CSV ───────────────────────────────────────────────────────────────────
  const handleCSV = () => {
    const rows = getExportRows();
    const csvContent = [exportHeaders, ...rows]
      .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data_siswa.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // 3. Excel ─────────────────────────────────────────────────────────────────
  const handleExcel = async () => {
    try {
      // Try dynamic import (requires: npm install xlsx)
      const XLSX = await import("xlsx").catch(() => null);
      if (!XLSX) {
        Swal.fire(
          "Info",
          "Library xlsx belum terinstall. Gunakan CSV sebagai alternatif.",
          "info",
        );
        return;
      }
      const wsData = [exportHeaders, ...getExportRows()];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data Siswa");
      XLSX.writeFile(wb, "data_siswa.xlsx");
    } catch (err) {
      Swal.fire("Error", "Gagal export Excel: " + err.message, "error");
    }
  };

  // 4. PDF ───────────────────────────────────────────────────────────────────
  const handlePDF = async () => {
    try {
      const { default: jsPDF } = await import("jspdf").catch(() => ({
        default: null,
      }));
      const autoTable = await import("jspdf-autotable").catch(() => null);

      if (!jsPDF || !autoTable) {
        Swal.fire(
          "Info",
          "Library jspdf belum terinstall. Install: npm install jspdf jspdf-autotable",
          "info",
        );
        return;
      }

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
      Swal.fire("Error", "Gagal export PDF: " + err.message, "error");
    }
  };

  // 5. Print ─────────────────────────────────────────────────────────────────
  const handlePrint = () => {
    const rows = getExportRows();
    const tableHtml = `
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;font-family:Arial;font-size:12px">
        <thead style="background:#0d6efd;color:#fff">
          <tr>${exportHeaders.map((h) => `<th>${h}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (r, i) =>
                `<tr style="background:${i % 2 === 0 ? "#fff" : "#f5f7fa"}">${r
                  .map((c) => `<td>${c}</td>`)
                  .join("")}</tr>`,
            )
            .join("")}
        </tbody>
      </table>`;

    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>Data Siswa</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { margin-bottom: 4px; }
            p { font-size: 12px; color: #555; margin-top:0 }
            @media print { button { display: none } }
          </style>
        </head>
        <body>
          <h2>Data Siswa</h2>
          <p>Dicetak: ${new Date().toLocaleDateString("id-ID")} &nbsp;|&nbsp; Total: ${filtered.length} siswa</p>
          ${tableHtml}
          <br/>
          <button onclick="window.print()" style="padding:8px 16px;background:#0d6efd;color:#fff;border:none;border-radius:4px;cursor:pointer">🖨 Cetak</button>
        </body>
      </html>`);
    win.document.close();
    win.focus();
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="container-fluid py-3" style={{ background: "#f4f6f9" }}>
      {/* FILTER */}
      <div className="card mb-3">
        <div className="card-body">
          <label className="fw-bold mb-1">Kelas</label>
          <div className="d-flex gap-2">
            <select
              className="form-select"
              style={{ maxWidth: 300 }}
              value={filterKelas}
              onChange={(e) => setFilterKelas(e.target.value)}
            >
              <option value="">-- Semua Kelas --</option>
              {kelasList.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <button
              className="btn btn-success btn-sm"
              onClick={handleApplyFilter}
            >
              <RiFilter3Fill /> Terapkan
            </button>
            {appliedKelas && (
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => {
                  setFilterKelas("");
                  setAppliedKelas("");
                  setPage(1);
                }}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <b>Daftar Siswa</b>
          <div>
            <button className="btn btn-warning btn-sm me-2">
              <RiUpload2Line /> Upload
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/dashboard/tambah-siswa")}
            >
              <RiAddLine /> Tambah
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* TOP CONTROL */}
          <div className="d-flex justify-content-between mb-2 flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2">
              <span>Tampilkan</span>
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
              <span>data</span>
            </div>

            <div className="input-group" style={{ width: 250 }}>
              <span className="input-group-text bg-white">
                <RiSearchLine />
              </span>
              <input
                className="form-control"
                placeholder="Cari nama / NIS..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* EXPORT BUTTONS */}
          <div className="d-flex gap-2 mb-2 flex-wrap">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleCopy}
            >
              <RiFileCopyLine /> Salin
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleCSV}
            >
              <RiFileExcel2Line /> CSV
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handleExcel}
            >
              <RiFileExcel2Line /> Excel
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handlePDF}
            >
              <RiFilePdf2Line /> PDF
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={handlePrint}
            >
              <RiPrinterLine /> Print
            </button>
          </div>

          {/* TABLE */}
          <table
            ref={tableRef}
            className="table table-bordered table-hover align-middle"
          >
            <thead className="table-light text-center small">
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

            <tbody className="small">
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
                    <td>{item.tanggal_lahir || "-"}</td>
                    <td>{item.alamat || "-"}</td>
                    <td className="text-center">{item.kelas}</td>
                    <td className="text-center">
                      <span className="badge bg-success">
                        {item.status || "Aktif"}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-info btn-sm me-1"
                        onClick={() => handleViewDetail(item.id)}
                      >
                        <RiEyeLine />
                      </button>
                      <Link
                        to={`/dashboard/edit-siswa/${item.id}`}
                        className="btn btn-primary btn-sm me-1"
                      >
                        <RiPencilLine />
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
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

          {/* PAGINATION */}
          <div className="d-flex justify-content-between align-items-center small mt-2 flex-wrap gap-2">
            <span>
              Menampilkan {filtered.length === 0 ? 0 : start + 1} –{" "}
              {Math.min(start + perPage, filtered.length)} dari{" "}
              {filtered.length} data
              {appliedKelas && ` (kelas ${appliedKelas})`}
            </span>

            <div className="d-flex flex-wrap gap-1">
              <button
                className="btn btn-sm btn-light"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                &laquo;
              </button>
              {Array.from({ length: totalPage }, (_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-light"}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="btn btn-sm btn-light"
                disabled={page === totalPage || totalPage === 0}
                onClick={() => setPage(page + 1)}
              >
                &raquo;
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL */}
      {showModal && selectedSiswa && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header bg-primary text-white py-2">
                <h6 className="fw-bold mb-0">📄 Detail Lengkap Siswa</h6>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                />
              </div>

              <div className="modal-body p-0">
                <div className="row g-0">
                  {/* LEFT */}
                  <div className="col-md-4 text-center border-end p-4 bg-light">
                    <img
                      src="https://i.pinimg.com/736x/97/fa/af/97faaf15ebb56f6caa72260fec663baf.jpg"
                      className="rounded-circle mb-3"
                      style={{ width: 120 }}
                      alt="foto siswa"
                    />
                    <h5 className="fw-bold">{selectedSiswa.nama}</h5>
                    <div className="text-muted small mb-2">
                      NIS: {selectedSiswa.nis}
                    </div>
                    <span className="badge bg-success px-3 py-2">
                      {selectedSiswa.status || "Aktif"}
                    </span>
                    <div className="mt-3 small text-start">
                      <b>Kontak:</b>
                      <br />
                      {selectedSiswa.hp || "-"}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="col-md-8 p-4">
                    <h6 className="fw-bold text-primary border-bottom pb-1">
                      Data Pribadi
                    </h6>
                    <table className="table table-sm table-borderless small mb-3">
                      <tbody>
                        <tr>
                          <td width="160">NIS / NISN</td>
                          <td>
                            : {selectedSiswa.nis} / {selectedSiswa.nisn}
                          </td>
                        </tr>
                        <tr>
                          <td>Tempat, Tgl Lahir</td>
                          <td>
                            : {selectedSiswa.tempat_lahir},{" "}
                            {selectedSiswa.tanggal_lahir}
                          </td>
                        </tr>
                        <tr>
                          <td>Jenis Kelamin</td>
                          <td>: {selectedSiswa.jenis_kelamin}</td>
                        </tr>
                        <tr>
                          <td>Agama</td>
                          <td>: {selectedSiswa.agama}</td>
                        </tr>
                        <tr>
                          <td>Golongan Darah</td>
                          <td>
                            :{" "}
                            <span className="badge bg-danger">
                              {selectedSiswa.golongan_darah}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Alamat</td>
                          <td>: {selectedSiswa.alamat}</td>
                        </tr>
                      </tbody>
                    </table>

                    <h6 className="fw-bold text-primary border-bottom pb-1">
                      Data Akademik
                    </h6>
                    <table className="table table-sm table-borderless small mb-3">
                      <tbody>
                        <tr>
                          <td width="160">Kelas / Jurusan</td>
                          <td>
                            : {selectedSiswa.kelas} / {selectedSiswa.jurusan}
                          </td>
                        </tr>
                        <tr>
                          <td>Tahun Ajaran</td>
                          <td>: {selectedSiswa.tahun_ajaran}</td>
                        </tr>
                        <tr>
                          <td>Tahun Masuk</td>
                          <td>: {selectedSiswa.tahun_masuk}</td>
                        </tr>
                        <tr>
                          <td>Sekolah Asal</td>
                          <td>: {selectedSiswa.sekolah_asal}</td>
                        </tr>
                      </tbody>
                    </table>

                    <h6 className="fw-bold text-primary border-bottom pb-1">
                      Data Keluarga
                    </h6>
                    <table className="table table-sm table-borderless small">
                      <tbody>
                        <tr>
                          <td width="160">Ayah</td>
                          <td>
                            : {selectedSiswa.ayah} (
                            {selectedSiswa.pekerjaan_ayah})
                          </td>
                        </tr>
                        <tr>
                          <td>Ibu</td>
                          <td>
                            : {selectedSiswa.ibu} ({selectedSiswa.pekerjaan_ibu}
                            )
                          </td>
                        </tr>
                        <tr>
                          <td>Wali</td>
                          <td>
                            : {selectedSiswa.wali} (
                            {selectedSiswa.hubungan_wali})
                          </td>
                        </tr>
                        <tr>
                          <td>HP Orang Tua</td>
                          <td>
                            : A: {selectedSiswa.hp_ayah} / I:{" "}
                            {selectedSiswa.hp_ibu}
                          </td>
                        </tr>
                        <tr>
                          <td>HP Wali</td>
                          <td>: {selectedSiswa.hp_wali}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="modal-footer bg-light">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowModal(false)}
                >
                  Tutup
                </button>
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => window.print()}
                >
                  🖨 Cetak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSiswa;
