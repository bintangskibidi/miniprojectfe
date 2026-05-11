import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../../utils/api";

import {
  RiSearchLine,
  RiAddLine,
  RiFileCopyLine,
  RiFileExcel2Line,
  RiFilePdf2Line,
  RiPrinterLine,
  RiPencilLine,
  RiDeleteBinLine,
} from "react-icons/ri";

const Ekstrakurikuler = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    id: null,
    nama: "",
    pembina: "",
    jadwal: "",
    tanggal: "",
    keterangan: "",
  });

  // ================= GET DATA =================
  const getData = async () => {
    try {
      const res = await api.get("/ekstra");
      setData((res.data.data || []).reverse());
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Gagal mengambil data", "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ================= FILTER =================
  const filtered = data.filter((item) => {
    const q = search.toLowerCase();

    return (
      item.nama?.toLowerCase().includes(q) ||
      item.pembina?.toLowerCase().includes(q)
    );
  });

  // ================= PAGINATION =================
  const totalPage = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const currentData = filtered.slice(start, start + perPage);

  // ================= TAMBAH =================
  const handleTambah = () => {
    setForm({
      id: null,
      nama: "",
      pembina: "",
      jadwal: "",
      tanggal: "",
      keterangan: "",
    });

    setShowModal(true);
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm({
      id: item.id,
      nama: item.nama,
      pembina: item.pembina,
      jadwal: item.jadwal,
      tanggal: item.tanggal,
      keterangan: item.keterangan,
    });

    setShowModal(true);
  };

  // ================= HAPUS =================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin hapus?",
      text: "Data tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya, hapus!",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/ekstra/${id}`);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil dihapus",
          timer: 1500,
          showConfirmButton: false,
        });

        getData();
      } catch (error) {
        Swal.fire("Error", "Gagal menghapus data", "error");
      }
    }
  };

  // ================= SIMPAN =================
  const handleSubmit = async () => {
    if (!form.nama || !form.pembina) {
      Swal.fire("Warning", "Field wajib diisi!", "warning");
      return;
    }

    try {
      if (form.id) {
        await api.put(`/ekstra/${form.id}`, form);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil diupdate",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await api.post("/ekstra", form);

        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil ditambahkan",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      setShowModal(false);
      getData();
    } catch (error) {
      Swal.fire("Error", "Gagal menyimpan data", "error");
    }
  };

  // ================= EXPORT =================
  const exportHeaders = [
    "#",
    "Nama",
    "Pembina",
    "Jadwal",
    "Tanggal",
    "Keterangan",
  ];

  const getExportRows = () =>
    filtered.map((item, i) => [
      i + 1,
      item.nama || "",
      item.pembina || "",
      item.jadwal || "",
      item.tanggal || "",
      item.keterangan || "",
    ]);

  const handleCopy = () => {
    const text = [exportHeaders, ...getExportRows()]
      .map((r) => r.join("\t"))
      .join("\n");

    navigator.clipboard.writeText(text);

    Swal.fire("Berhasil", "Data disalin", "success");
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
    a.download = "data_ekstrakurikuler.csv";
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
        "Ekstrakurikuler"
      );

      XLSX.writeFile(wb, "data_ekstrakurikuler.xlsx");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handlePDF = async () => {
    try {
      const { default: jsPDF } = await import("jspdf");

      await import("jspdf-autotable");

      const doc = new jsPDF({
        orientation: "landscape",
      });

      doc.setFontSize(14);
      doc.text("Data Ekstrakurikuler", 14, 15);

      doc.autoTable({
        head: [exportHeaders],
        body: getExportRows(),
        startY: 25,
        styles: { fontSize: 8 },
        headStyles: {
          fillColor: [13, 110, 253],
        },
      });

      doc.save("data_ekstrakurikuler.pdf");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handlePrint = () => {
    const rows = getExportRows();

    const win = window.open("", "_blank");

    win.document.write(`
      <html>
      <head>
        <title>Data Ekstrakurikuler</title>

        <style>
          body{
            font-family:Arial;
            padding:20px;
          }

          table{
            border-collapse:collapse;
            width:100%;
          }

          th,td{
            border:1px solid #ccc;
            padding:8px;
            font-size:12px;
          }

          thead{
            background:#0d6efd;
            color:white;
          }
        </style>
      </head>

      <body>
        <h2>Data Ekstrakurikuler</h2>

        <table>
          <thead>
            <tr>
              ${exportHeaders.map((h) => `<th>${h}</th>`).join("")}
            </tr>
          </thead>

          <tbody>
            ${rows
              .map(
                (r) => `
                <tr>
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
  };

  // ================= PAGINATION NUMBER =================
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
            <b>Daftar Ekstrakurikuler</b>

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

            {/* SEARCH + PERPAGE */}
            <div
              className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3"
            >
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
                className="input-group input-group-sm"
                style={{ width: 240 }}
              >
                <span className="input-group-text bg-white">
                  <RiSearchLine />
                </span>

                <input
                  className="form-control"
                  placeholder="Cari data..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
              </div>
            </div>

            {/* EXPORT BUTTON */}
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
                    borderRadius: 4,
                    background: "#fff",
                    color: "#495057",
                    border: "1px solid #6c757d",
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
                    <th style={{ width: 40 }}>#</th>
                    <th>Nama</th>
                    <th>Pembina</th>
                    <th>Jadwal</th>
                    <th>Tanggal</th>
                    <th>Keterangan</th>
                    <th style={{ width: 120 }}>Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  {currentData.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center text-muted py-4"
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

                        <td>{item.nama}</td>

                        <td>{item.pembina}</td>

                        <td>{item.jadwal}</td>

                        <td>{item.tanggal}</td>

                        <td>{item.keterangan}</td>

                        <td className="text-center text-nowrap">
                          <button
                            type="button"
                            className="btn btn-primary btn-sm me-1"
                            onClick={() => handleEdit(item)}
                          >
                            <RiPencilLine />
                          </button>

                          <button
                            type="button"
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

            {/* PAGINATION */}
            <div
              className="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-3"
              style={{ fontSize: "0.83rem" }}
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
                <div className="d-flex flex-wrap gap-1">
                  <button
                    className="btn btn-sm btn-light"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    &laquo;
                  </button>

                  {buildPageNumbers().map((p, idx) =>
                    p === "…" ? (
                      <span
                        key={idx}
                        className="btn btn-sm btn-light disabled"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
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
          className="modal d-block"
          tabIndex="-1"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            style={{
              maxWidth: "450px",
            }}
          >
            <div className="modal-content border-0 shadow">

              {/* HEADER */}
              <div className="modal-header bg-primary text-white">
                <h6 className="modal-title fw-bold">
                  {form.id ? "Edit" : "Tambah"} Ekstrakurikuler
                </h6>

                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* BODY */}
              <div className="modal-body p-4">

                <div className="mb-3">
                  <label className="small fw-bold mb-1">
                    Nama Ekstrakurikuler
                  </label>

                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Masukkan nama"
                    value={form.nama}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        nama: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="small fw-bold mb-1">
                    Pembina
                  </label>

                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Nama pembina"
                    value={form.pembina}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        pembina: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="small fw-bold mb-1">
                    Jadwal
                  </label>

                  <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder="Contoh: Senin 15:00"
                    value={form.jadwal}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        jadwal: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="small fw-bold mb-1">
                    Tanggal
                  </label>

                  <input
                    type="date"
                    className="form-control shadow-sm"
                    value={form.tanggal}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        tanggal: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="small fw-bold mb-1">
                    Keterangan
                  </label>

                  <textarea
                    className="form-control shadow-sm"
                    rows="3"
                    placeholder="Keterangan..."
                    value={form.keterangan}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        keterangan: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* FOOTER */}
              <div className="modal-footer bg-light border-0">
                <button
                  className="btn btn-secondary btn-sm px-3"
                  onClick={() => setShowModal(false)}
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
    </>
  );
};

export default Ekstrakurikuler;