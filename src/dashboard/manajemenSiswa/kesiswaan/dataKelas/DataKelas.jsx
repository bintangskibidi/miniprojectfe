import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../../../utils/api";

import {
  RiSearchLine,
  RiAddLine,
  RiFileCopyLine,
  RiFileExcel2Line,
  RiFilePdf2Line,
  RiPrinterLine,
  RiPencilLine,
  RiDeleteBinLine,
  RiArrowUpSLine,
  RiArrowDownSLine,
} from "react-icons/ri";

/* ── Helper: ikon sort ───────────────────────── */
const SortIcon = ({ colKey, sortConfig }) => {
  if (sortConfig.key !== colKey)
    return <RiArrowUpSLine style={{ opacity: 0.25 }} />;

  return sortConfig.direction === "asc" ? (
    <RiArrowUpSLine style={{ color: "#0d6efd" }} />
  ) : (
    <RiArrowDownSLine style={{ color: "#0d6efd" }} />
  );
};

/* ── Helper TH sortable ──────────────────────── */
const SortTh = ({ label, colKey, sortConfig, onSort, style = {} }) => (
  <th
    style={{ cursor: "pointer", userSelect: "none", ...style }}
    onClick={() => onSort(colKey)}
  >
    <div className="d-flex justify-content-between align-items-center gap-1">
      <span>{label}</span>
      <SortIcon colKey={colKey} sortConfig={sortConfig} />
    </div>
  </th>
);

const DataKelas = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: null,
    kode_kelas: "",
    nama_kelas: "",
  });

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "asc",
  });

  /* ── GET DATA ─────────────────────────────── */
  const getData = async () => {
    try {
      const res = await api.get("/kelas");
      setData(res.data.data || []);
    } catch (error) {
      console.error("Gagal load data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  /* ── ESC modal ────────────────────────────── */
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") setShowModal(false);
    };

    if (showModal) document.addEventListener("keydown", fn);

    return () => document.removeEventListener("keydown", fn);
  }, [showModal]);

  /* ── LOCK SCROLL modal ───────────────────── */
  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  /* ── SORT ─────────────────────────────────── */
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc"
          ? "desc"
          : "asc",
    }));

    setPage(1);
  };

  /* ── FILTER + SORT ───────────────────────── */
  const filtered = [...data]
    .filter((item) => {
      const q = search.toLowerCase();

      return (
        item.kode_kelas?.toLowerCase().includes(q) ||
        item.nama_kelas?.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;

      if (sortConfig.key === "__index__") {
        const indexA = data.findIndex((x) => x.id === a.id);
        const indexB = data.findIndex((x) => x.id === b.id);

        return sortConfig.direction === "asc"
          ? indexA - indexB
          : indexB - indexA;
      }

      const aVal = (a[sortConfig.key] ?? "")
        .toString()
        .toLowerCase();

      const bVal = (b[sortConfig.key] ?? "")
        .toString()
        .toLowerCase();

      if (aVal < bVal)
        return sortConfig.direction === "asc" ? -1 : 1;

      if (aVal > bVal)
        return sortConfig.direction === "asc" ? 1 : -1;

      return 0;
    });

  /* ── PAGINATION ──────────────────────────── */
  const totalPage = Math.ceil(filtered.length / perPage);

  const start = (page - 1) * perPage;

  const currentData = filtered.slice(start, start + perPage);

  /* ── TAMBAH ──────────────────────────────── */
  const handleTambah = () => {
    setForm({
      id: null,
      kode_kelas: "",
      nama_kelas: "",
    });

    setShowModal(true);
  };

  /* ── EDIT ────────────────────────────────── */
  const handleEdit = (item) => {
    setForm({
      id: item.id,
      kode_kelas: item.kode_kelas,
      nama_kelas: item.nama_kelas,
    });

    setShowModal(true);
  };

  /* ── HAPUS ───────────────────────────────── */
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

    if (result.isConfirmed) {
      try {
        await api.delete(`/kelas/${id}`);

        Swal.fire("Berhasil", "Data dihapus.", "success");

        getData();
      } catch {
        Swal.fire("Error", "Gagal menghapus data.", "error");
      }
    }
  };

  /* ── SIMPAN ──────────────────────────────── */
  const handleSubmit = async () => {
    if (!form.kode_kelas || !form.nama_kelas) {
      Swal.fire(
        "Warning",
        "Semua field wajib diisi!",
        "warning"
      );
      return;
    }

    try {
      if (form.id) {
        await api.put(`/kelas/${form.id}`, form);

        Swal.fire(
          "Berhasil",
          "Data berhasil diupdate.",
          "success"
        );
      } else {
        await api.post("/kelas", form);

        Swal.fire(
          "Berhasil",
          "Data berhasil ditambahkan.",
          "success"
        );
      }

      setShowModal(false);

      getData();
    } catch {
      Swal.fire(
        "Error",
        "Gagal menyimpan data.",
        "error"
      );
    }
  };

  /* ── EXPORT ──────────────────────────────── */
  const exportHeaders = ["#", "Kode Kelas", "Nama Kelas"];

  const getExportRows = () =>
    filtered.map((item, i) => [
      i + 1,
      item.kode_kelas || "",
      item.nama_kelas || "",
    ]);

  const handleCopy = () => {
    const text = [exportHeaders, ...getExportRows()]
      .map((r) => r.join("\t"))
      .join("\n");

    navigator.clipboard
      .writeText(text)
      .then(() =>
        Swal.fire(
          "Berhasil",
          "Data disalin ke clipboard.",
          "success"
        )
      )
      .catch(() =>
        Swal.fire(
          "Error",
          "Gagal menyalin data.",
          "error"
        )
      );
  };

  const handleCSV = () => {
    const csv = [exportHeaders, ...getExportRows()]
      .map((r) =>
        r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const url = URL.createObjectURL(
      new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
      })
    );

    const a = document.createElement("a");

    a.href = url;
    a.download = "data_kelas.csv";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleExcel = async () => {
    try {
      const XLSX = await import("xlsx").catch(() => null);

      if (!XLSX) {
        Swal.fire(
          "Info",
          "Library xlsx belum terinstall.",
          "info"
        );
        return;
      }

      const wb = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.aoa_to_sheet([
          exportHeaders,
          ...getExportRows(),
        ]),
        "Data Kelas"
      );

      XLSX.writeFile(wb, "data_kelas.xlsx");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handlePDF = async () => {
    try {
      const { default: jsPDF } = await import("jspdf").catch(
        () => ({
          default: null,
        })
      );

      if (!jsPDF) {
        Swal.fire(
          "Info",
          "Library jspdf belum terinstall.",
          "info"
        );
        return;
      }

      await import("jspdf-autotable").catch(() => null);

      const doc = new jsPDF();

      doc.setFontSize(14);
      doc.text("Data Kelas", 14, 15);

      doc.autoTable({
        head: [exportHeaders],
        body: getExportRows(),
        startY: 25,
      });

      doc.save("data_kelas.pdf");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handlePrint = () => {
    const rows = getExportRows();

    const win = window.open("", "_blank");

    if (!win) {
      Swal.fire(
        "Error",
        "Pop-up diblokir browser.",
        "error"
      );
      return;
    }

    win.document.write(`
      <html>
      <head>
        <title>Data Kelas</title>

        <style>
          body{
            font-family:Arial;
            padding:20px;
          }

          table{
            border-collapse:collapse;
            width:100%;
            font-size:12px;
          }

          th,td{
            border:1px solid #ccc;
            padding:6px;
          }

          thead{
            background:#0d6efd;
            color:#fff;
          }

          @media print{
            button{
              display:none;
            }
          }
        </style>
      </head>

      <body>

        <h2>Data Kelas</h2>

        <table>
          <thead>
            <tr>
              ${exportHeaders
                .map((h) => `<th>${h}</th>`)
                .join("")}
            </tr>
          </thead>

          <tbody>
            ${rows
              .map(
                (r, i) => `
                  <tr style="background:${
                    i % 2 === 0 ? "#fff" : "#f5f7fa"
                  }">
                    ${r.map((c) => `<td>${c}</td>`).join("")}
                  </tr>
                `
              )
              .join("")}
          </tbody>
        </table>

        <br>

        <button onclick="window.print()">
          Cetak
        </button>

      </body>
      </html>
    `);

    win.document.close();
    win.focus();
  };

  /* ── PAGINATION ELLIPSIS ────────────────── */
  const buildPageNumbers = () => {
    const pages = Array.from(
      { length: totalPage },
      (_, i) => i + 1
    );

    if (totalPage <= 7) return pages;

    const result = [];

    pages.forEach((p) => {
      if (
        p === 1 ||
        p === totalPage ||
        Math.abs(p - page) <= 1
      ) {
        if (
          result.length &&
          p - result[result.length - 1] > 1
        ) {
          result.push("…");
        }

        result.push(p);
      }
    });

    return result;
  };

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
        <div className="card">
          {/* HEADER */}
          <div className="card-header d-flex justify-content-between align-items-center">
            <b>Daftar Kelas</b>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleTambah}
            >
              <RiAddLine /> Tambah
            </button>
          </div>

          {/* BODY */}
          <div className="card-body">
            {/* TOP BAR */}
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
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
                className="input-group input-group-sm"
                style={{ width: 240 }}
              >
                <span className="input-group-text bg-white">
                  <RiSearchLine />
                </span>

                <input
                  className="form-control"
                  placeholder="Cari kelas..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* EXPORT */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginBottom: 12,
              }}
            >
              {[
                {
                  label: "Salin",
                  icon: <RiFileCopyLine />,
                  fn: handleCopy,
                },
                {
                  label: "CSV",
                  icon: <RiFileExcel2Line />,
                  fn: handleCSV,
                },
                {
                  label: "Excel",
                  icon: <RiFileExcel2Line />,
                  fn: handleExcel,
                },
                {
                  label: "PDF",
                  icon: <RiFilePdf2Line />,
                  fn: handlePDF,
                },
                {
                  label: "Print",
                  icon: <RiPrinterLine />,
                  fn: handlePrint,
                },
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
                    background: "#ffffff",
                    color: "#495057",
                    border: "1px solid #6c757d",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "#f8f9fa";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "#ffffff";
                  }}
                >
                  {icon} {label}
                </button>
              ))}
            </div>

            {/* TABLE */}
            <div className="table-responsive">
              <table
                className="table table-bordered table-hover align-middle mb-0"
                style={{ fontSize: "0.83rem" }}
              >
                <thead className="table-light text-center">
                  <tr>
                    <SortTh
                      label="#"
                      colKey="__index__"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                      style={{ width: 50 }}
                    />

                    <SortTh
                      label="Kode Kelas"
                      colKey="kode_kelas"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                    />

                    <SortTh
                      label="Nama Kelas"
                      colKey="nama_kelas"
                      sortConfig={sortConfig}
                      onSort={handleSort}
                    />

                    <th style={{ width: 120 }}>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {currentData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="text-center text-muted py-4"
                      >
                        Tidak ada data
                      </td>
                    </tr>
                  ) : (
                    currentData.map((item) => (
                      <tr key={item.id}>
                        <td className="text-center">
                          {filtered.findIndex(
                            (x) => x.id === item.id
                          ) + 1}
                        </td>

                        <td>{item.kode_kelas}</td>

                        <td>{item.nama_kelas}</td>

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
                            onClick={() =>
                              handleHapus(item.id)
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

            {/* PAGINATION */}
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
                  : `Menampilkan ${start + 1}–${Math.min(
                      start + perPage,
                      filtered.length
                    )} dari ${filtered.length} data`}
              </span>

              {totalPage > 1 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 4,
                  }}
                >
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
                        className={`btn btn-sm ${
                          page === p
                            ? "btn-primary"
                            : "btn-light"
                        }`}
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
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
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
              maxWidth: 500,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            }}
          >
            {/* HEADER */}
            <div
              style={{
                background: "#0d6efd",
                borderRadius: "8px 8px 0 0",
                padding: "12px 20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h6 className="fw-bold mb-0 text-white">
                {form.id
                  ? "✏️ Edit Data Kelas"
                  : "➕ Tambah Data Kelas"}
              </h6>

              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowModal(false)}
              />
            </div>

            {/* BODY */}
            <div className="p-4">
              <div className="mb-3">
                <label className="fw-bold small mb-1 d-block">
                  Kode Kelas
                </label>

                <input
                  className="form-control"
                  placeholder="Contoh: X-RPL-1"
                  value={form.kode_kelas}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      kode_kelas: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label className="fw-bold small mb-1 d-block">
                  Nama Kelas
                </label>

                <input
                  className="form-control"
                  placeholder="Contoh: X RPL 1"
                  value={form.nama_kelas}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      nama_kelas: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* FOOTER */}
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
                Batal
              </button>

              <button
                type="button"
                className="btn btn-primary btn-sm"
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

export default DataKelas;