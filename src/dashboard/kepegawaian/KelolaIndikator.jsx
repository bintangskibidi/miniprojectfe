import React, { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
  FaFilePdf,
  FaPrint,
  FaFileAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { X } from "lucide-react";

const MySwal = withReactContent(Swal);

export default function ManajemenSekolah() {
  const [activeTab, setActiveTab] = useState("surat");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // =========================
  // DATA SURAT
  // =========================
  const [dataSurat, setDataSurat] = useState([
    {
      id: 1,
      noSurat: "XSAQ",
      judul: "Surat Penting",
      tanggal: "06-07-2025",
      jenis: "Masuk",
      deskripsi: "Surat pemberitahuan dinas",
    },
  ]);

  // =========================
  // DATA INDIKATOR
  // =========================
  const [dataIndikator, setDataIndikator] = useState([
    {
      id: 1,
      nama: "Kehadiran",
      tipe: "angka",
      jenis: "Guru",
      urutan: 1,
      bobot: 5,
      relasi: "Absen Masuk",
      status: "Aktif",
    },
    {
      id: 2,
      nama: "Kerajinan",
      tipe: "angka",
      jenis: "Staff",
      urutan: 2,
      bobot: 20,
      relasi: "Absen Masuk",
      status: "Aktif",
    },
  ]);

  // =========================
  // DELETE
  // =========================
  const handleDelete = (id, nama) => {
    MySwal.fire({
      title: "Apakah Anda yakin?",
      text: `Data "${nama}" akan dihapus permanen!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        if (activeTab === "surat") {
          setDataSurat((prev) =>
            prev.filter((item) => item.id !== id)
          );
        } else {
          setDataIndikator((prev) =>
            prev.filter((item) => item.id !== id)
          );
        }

        MySwal.fire({
          title: "Berhasil!",
          text: "Data berhasil dihapus",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // =========================
  // DETAIL
  // =========================
  const showDetail = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // =========================
  // TAMBAH DATA
  // =========================
  const handleTambah = async () => {
    if (activeTab === "surat") {
      const { value: formValues } = await MySwal.fire({
        title: "Tambah Surat",
        html: `
          <input id="swal-no" class="swal2-input" placeholder="No Surat">
          <input id="swal-judul" class="swal2-input" placeholder="Judul">
          <input id="swal-tanggal" type="date" class="swal2-input">
          <input id="swal-jenis" class="swal2-input" placeholder="Jenis">
          <textarea id="swal-deskripsi" class="swal2-textarea" placeholder="Deskripsi"></textarea>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",

        preConfirm: () => {
          return {
            noSurat: document.getElementById("swal-no").value,
            judul: document.getElementById("swal-judul").value,
            tanggal: document.getElementById("swal-tanggal").value,
            jenis: document.getElementById("swal-jenis").value,
            deskripsi:
              document.getElementById("swal-deskripsi").value,
          };
        },
      });

      if (formValues) {
        setDataSurat((prev) => [
          ...prev,
          {
            id: Date.now(),
            ...formValues,
          },
        ]);

        MySwal.fire({
          title: "Berhasil!",
          text: "Data surat berhasil ditambahkan",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } else {
      const { value: formValues } = await MySwal.fire({
        title: "Tambah Indikator",
        html: `
          <input id="swal-nama" class="swal2-input" placeholder="Nama Indikator">
          <input id="swal-tipe" class="swal2-input" placeholder="Tipe">
          <input id="swal-jenis" class="swal2-input" placeholder="Jenis Pegawai">
          <input id="swal-bobot" type="number" class="swal2-input" placeholder="Bobot">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal",

        preConfirm: () => {
          return {
            nama: document.getElementById("swal-nama").value,
            tipe: document.getElementById("swal-tipe").value,
            jenis: document.getElementById("swal-jenis").value,
            bobot: document.getElementById("swal-bobot").value,
            status: "Aktif",
          };
        },
      });

      if (formValues) {
        setDataIndikator((prev) => [
          ...prev,
          {
            id: Date.now(),
            ...formValues,
          },
        ]);

        MySwal.fire({
          title: "Berhasil!",
          text: "Indikator berhasil ditambahkan",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  // =========================
  // EDIT DATA
  // =========================
  const handleEdit = async (item) => {
    if (activeTab === "surat") {
      const { value: formValues } = await MySwal.fire({
        title: "Edit Surat",
        html: `
          <input id="swal-no" class="swal2-input" value="${item.noSurat}">
          <input id="swal-judul" class="swal2-input" value="${item.judul}">
          <input id="swal-tanggal" class="swal2-input" value="${item.tanggal}">
          <input id="swal-jenis" class="swal2-input" value="${item.jenis}">
          <textarea id="swal-deskripsi" class="swal2-textarea">${item.deskripsi}</textarea>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Update",
        cancelButtonText: "Batal",

        preConfirm: () => {
          return {
            noSurat: document.getElementById("swal-no").value,
            judul: document.getElementById("swal-judul").value,
            tanggal: document.getElementById("swal-tanggal").value,
            jenis: document.getElementById("swal-jenis").value,
            deskripsi:
              document.getElementById("swal-deskripsi").value,
          };
        },
      });

      if (formValues) {
        setDataSurat((prev) =>
          prev.map((data) =>
            data.id === item.id
              ? { ...data, ...formValues }
              : data
          )
        );

        MySwal.fire({
          title: "Berhasil!",
          text: "Data surat berhasil diupdate",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } else {
      const { value: formValues } = await MySwal.fire({
        title: "Edit Indikator",
        html: `
          <input id="swal-nama" class="swal2-input" value="${item.nama}">
          <input id="swal-tipe" class="swal2-input" value="${item.tipe}">
          <input id="swal-jenis" class="swal2-input" value="${item.jenis}">
          <input id="swal-bobot" type="number" class="swal2-input" value="${item.bobot}">
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Update",
        cancelButtonText: "Batal",

        preConfirm: () => {
          return {
            nama: document.getElementById("swal-nama").value,
            tipe: document.getElementById("swal-tipe").value,
            jenis: document.getElementById("swal-jenis").value,
            bobot: document.getElementById("swal-bobot").value,
          };
        },
      });

      if (formValues) {
        setDataIndikator((prev) =>
          prev.map((data) =>
            data.id === item.id
              ? { ...data, ...formValues }
              : data
          )
        );

        MySwal.fire({
          title: "Berhasil!",
          text: "Indikator berhasil diupdate",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden border border-slate-200">

        {/* HEADER */}
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <FaFileAlt />

            <h1 className="font-bold text-lg uppercase tracking-wider">
              {activeTab === "surat" &&
                "Surat Menyurat"}

              {activeTab === "indikator" &&
                "Kelola Indikator Kinerja"}
            </h1>
          </div>

          <button
            onClick={handleTambah}
            className="bg-white text-slate-800 text-xs font-bold px-4 py-2 rounded shadow hover:bg-slate-50 transition flex items-center gap-2"
          >
            <FaPlus /> TAMBAH DATA
          </button>
        </div>

        {/* TAB */}
        <div className="flex gap-2 p-4 border-b bg-slate-50">
          <button
            onClick={() => setActiveTab("surat")}
            className={`px-4 py-2 rounded text-sm font-semibold ${
              activeTab === "surat"
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            Surat
          </button>

          <button
            onClick={() => setActiveTab("indikator")}
            className={`px-4 py-2 rounded text-sm font-semibold ${
              activeTab === "indikator"
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            Indikator
          </button>
        </div>

        {/* TABLE */}
        <div className="p-4">
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex gap-1">
              <button className="border px-3 py-1 text-xs bg-slate-50">
                Copy
              </button>

              <button className="border px-3 py-1 text-xs bg-slate-50">
                CSV
              </button>

              <button className="border px-3 py-1 text-xs bg-slate-50">
                Excel
              </button>

              <button className="border px-3 py-1 text-xs bg-slate-50 text-red-600">
                <FaFilePdf className="inline mr-1" />
                PDF
              </button>

              <button className="border px-3 py-1 text-xs bg-slate-50">
                <FaPrint className="inline mr-1" />
                Print
              </button>
            </div>

            <input
              type="text"
              placeholder="Search..."
              className="border border-slate-300 rounded px-3 py-1.5 text-sm"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-200">
              <thead className="bg-slate-100 text-[11px] font-bold uppercase text-slate-600">
                <tr>
                  <th className="border p-3 w-12 text-center">
                    #
                  </th>

                  {activeTab === "surat" ? (
                    <>
                      <th className="border p-3">
                        No Surat
                      </th>

                      <th className="border p-3">
                        Judul
                      </th>

                      <th className="border p-3">
                        Tanggal
                      </th>

                      <th className="border p-3">
                        Jenis
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="border p-3">
                        Nama
                      </th>

                      <th className="border p-3">
                        Tipe
                      </th>

                      <th className="border p-3">
                        Jenis Pegawai
                      </th>

                      <th className="border p-3 text-center">
                        Bobot
                      </th>

                      <th className="border p-3">
                        Status
                      </th>
                    </>
                  )}

                  <th className="border p-3 text-center">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {(activeTab === "surat"
                  ? dataSurat
                  : dataIndikator
                ).map((item, idx) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="border p-3 text-center">
                      {idx + 1}
                    </td>

                    {activeTab === "surat" ? (
                      <>
                        <td className="border p-3 font-semibold text-blue-600">
                          {item.noSurat}
                        </td>

                        <td className="border p-3">
                          {item.judul}
                        </td>

                        <td className="border p-3">
                          {item.tanggal}
                        </td>

                        <td className="border p-3">
                          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-[10px] font-bold">
                            {item.jenis}
                          </span>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="border p-3">
                          {item.nama}
                        </td>

                        <td className="border p-3">
                          {item.tipe}
                        </td>

                        <td className="border p-3">
                          {item.jenis}
                        </td>

                        <td className="border p-3 text-center font-bold">
                          {item.bobot}
                        </td>

                        <td className="border p-3">
                          <span className="bg-green-600 text-white px-2 py-1 rounded text-[10px] font-bold">
                            {item.status}
                          </span>
                        </td>
                      </>
                    )}

                    {/* BUTTON */}
                    <td className="border p-3">
                      <div className="flex justify-center gap-1">
                        <button
                          onClick={() =>
                            showDetail(item)
                          }
                          className="bg-sky-100 p-2 rounded text-sky-600 hover:bg-sky-600 hover:text-white transition"
                        >
                          <FaEye size={12} />
                        </button>

                        <button
                          onClick={() =>
                            handleEdit(item)
                          }
                          className="bg-amber-100 p-2 rounded text-amber-600 hover:bg-amber-500 hover:text-white transition"
                        >
                          <FaEdit size={12} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              item.id,
                              item.judul || item.nama
                            )
                          }
                          className="bg-red-100 p-2 rounded text-red-600 hover:bg-red-600 hover:text-white transition"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="flex justify-end p-2">
              <button
                onClick={() =>
                  setIsModalOpen(false)
                }
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-8 pb-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-sky-50 text-sky-500 rounded-full flex items-center justify-center mb-6">
                <FaInfoCircle size={48} />
              </div>

              <h2 className="text-2xl font-black text-slate-800 mb-8 text-center">
                {selectedItem.judul ||
                  selectedItem.nama}
              </h2>

              <div className="w-full space-y-4 text-sm">
                <DetailRow
                  label="Kategori"
                  value={
                    selectedItem.jenis ||
                    selectedItem.tipe
                  }
                />

                <DetailRow
                  label="Tanggal"
                  value={
                    selectedItem.tanggal || "-"
                  }
                />

                <DetailRow
                  label="Deskripsi"
                  value={
                    selectedItem.deskripsi || "-"
                  }
                />

                <DetailRow
                  label="Status"
                  value={
                    selectedItem.status || "Aktif"
                  }
                />
              </div>

              <button
                onClick={() =>
                  setIsModalOpen(false)
                }
                className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition"
              >
                TUTUP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between border-b border-slate-100 pb-2">
      <span className="text-slate-500 font-semibold">
        {label}:
      </span>

      <span className="text-slate-800 font-bold">
        {value}
      </span>
    </div>
  );
}