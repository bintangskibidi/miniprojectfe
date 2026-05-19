import React, { useState } from "react";
import {
  Plus,
  Copy,
  FileText,
  FileSpreadsheet,
  FileBox,
  Printer,
  Edit3,
  Trash2,
  X,
} from "lucide-react";
import Swal from "sweetalert2";

const KelolaKegiatan = () => {
  // ===============================
  // STATE DATA
  // ===============================
  const [data, setData] = useState([
    {
      id: 1,
      nama: "Seminar",
      jenis: "Seminar",
      mulai: "2025-11-06T12:00",
      selesai: "2025-11-28T12:22",
      lokasi: "Sekolah",
      pj: "Kepala Sekolah",
      status: "Aktif",
    },
    {
      id: 2,
      nama: "Workshop",
      jenis: "Workshop",
      mulai: "2025-09-03T09:00",
      selesai: "2025-12-12T10:00",
      lokasi: "Sekolah",
      pj: "Kepala Sekolah",
      status: "Aktif",
    },
  ]);

  // ===============================
  // MODAL
  // ===============================
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  // ===============================
  // SEARCH
  // ===============================
  const [search, setSearch] = useState("");

  // ===============================
  // FORM
  // ===============================
  const [form, setForm] = useState({
    nama: "",
    jenis: "",
    mulai: "",
    selesai: "",
    lokasi: "",
    pj: "",
    status: "Aktif",
  });

  // ===============================
  // HANDLE INPUT
  // ===============================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ===============================
  // FORMAT TANGGAL
  // ===============================
  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";

    return new Date(tanggal).toLocaleString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ===============================
  // TAMBAH DATA
  // ===============================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.nama ||
      !form.jenis ||
      !form.mulai ||
      !form.selesai ||
      !form.lokasi ||
      !form.pj
    ) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Semua field wajib diisi!",
      });
      return;
    }

    // EDIT
    if (editId) {
      const updatedData = data.map((item) =>
        item.id === editId
          ? {
              ...item,
              ...form,
            }
          : item
      );

      setData(updatedData);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil diupdate",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      // TAMBAH
      const newData = {
        id: Date.now(),
        ...form,
      };

      setData([...data, newData]);

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data kegiatan berhasil ditambahkan",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    // RESET
    setForm({
      nama: "",
      jenis: "",
      mulai: "",
      selesai: "",
      lokasi: "",
      pj: "",
      status: "Aktif",
    });

    setEditId(null);
    setShowModal(false);
  };

  // ===============================
  // EDIT DATA
  // ===============================
  const handleEdit = (item) => {
    setEditId(item.id);

    setForm({
      nama: item.nama,
      jenis: item.jenis,
      mulai: item.mulai,
      selesai: item.selesai,
      lokasi: item.lokasi,
      pj: item.pj,
      status: item.status,
    });

    setShowModal(true);
  };

  // ===============================
  // HAPUS DATA
  // ===============================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setData(data.filter((item) => item.id !== id));

        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Data berhasil dihapus.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // ===============================
  // FILTER DATA
  // ===============================
  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* HEADER */}
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <span className="p-1 bg-white/20 rounded">📅</span>

            <h1 className="font-semibold text-lg">
              Kelola Kegiatan
            </h1>
          </div>

          <button
            onClick={() => {
              setShowModal(true);
              setEditId(null);

              setForm({
                nama: "",
                jenis: "",
                mulai: "",
                selesai: "",
                lokasi: "",
                pj: "",
                status: "Aktif",
              });
            }}
            className="bg-white text-gray-800 px-4 py-2 rounded text-sm font-medium flex items-center gap-2 hover:bg-gray-100 transition"
          >
            <Plus size={16} />
            Tambah Kegiatan
          </button>
        </div>

        <div className="p-5">
          {/* CONTROL */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-5">
            <div className="flex items-center gap-2 text-sm">
              <span>Tampilkan</span>

              <select className="border rounded px-2 py-1">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>

              <span>data</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm">Cari:</span>

              <input
                type="text"
                placeholder="Cari kegiatan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded px-3 py-1.5 outline-none focus:ring-2 ring-blue-400"
              />
            </div>
          </div>

          {/* EXPORT BUTTON */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button className="flex items-center gap-1 px-3 py-1 border rounded text-xs hover:bg-gray-50">
              <Copy size={14} />
              Salin
            </button>

            <button className="flex items-center gap-1 px-3 py-1 border border-green-600 text-green-600 rounded text-xs hover:bg-green-50">
              <FileText size={14} />
              CSV
            </button>

            <button className="flex items-center gap-1 px-3 py-1 border border-gray-600 text-gray-600 rounded text-xs hover:bg-gray-50">
              <FileSpreadsheet size={14} />
              Excel
            </button>

            <button className="flex items-center gap-1 px-3 py-1 border border-red-500 text-red-500 rounded text-xs hover:bg-red-50">
              <FileBox size={14} />
              PDF
            </button>

            <button className="flex items-center gap-1 px-3 py-1 border border-black text-black rounded text-xs hover:bg-gray-50">
              <Printer size={14} />
              Print
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto border rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-50 text-gray-700">
                  <th className="p-3 border text-center">No</th>
                  <th className="p-3 border">Nama Kegiatan</th>
                  <th className="p-3 border">Jenis</th>
                  <th className="p-3 border">Tanggal Mulai</th>
                  <th className="p-3 border">Tanggal Selesai</th>
                  <th className="p-3 border">Lokasi</th>
                  <th className="p-3 border">Penanggung Jawab</th>
                  <th className="p-3 border text-center">Status</th>
                  <th className="p-3 border text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="p-3 border text-center">
                        {index + 1}
                      </td>

                      <td className="p-3 border font-medium">
                        {item.nama}
                      </td>

                      <td className="p-3 border">
                        <span className="bg-cyan-500 text-white text-[10px] px-2 py-1 rounded-full font-bold">
                          {item.jenis.toUpperCase()}
                        </span>
                      </td>

                      <td className="p-3 border text-xs">
                        {formatTanggal(item.mulai)}
                      </td>

                      <td className="p-3 border text-xs">
                        {formatTanggal(item.selesai)}
                      </td>

                      <td className="p-3 border">
                        {item.lokasi}
                      </td>

                      <td className="p-3 border">{item.pj}</td>

                      <td className="p-3 border text-center">
                        <span
                          className={`text-white text-[10px] px-2 py-1 rounded font-bold ${
                            item.status === "Aktif"
                              ? "bg-green-600"
                              : "bg-red-500"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-3 border">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-yellow-400 p-2 rounded hover:bg-yellow-500 text-gray-800"
                          >
                            <Edit3 size={14} />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(item.id)
                            }
                            className="bg-red-500 p-2 rounded hover:bg-red-600 text-white"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={9}
                      className="text-center py-6 text-gray-500"
                    >
                      Data tidak ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="mt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
            <p>
              Menampilkan {filteredData.length} dari {data.length} data
            </p>

            <div className="flex items-center border rounded overflow-hidden mt-2 md:mt-0">
              <button className="px-3 py-2 hover:bg-gray-100 border-r">
                Sebelumnya
              </button>

              <button className="px-4 py-2 bg-blue-50 text-blue-600 font-bold border-r">
                1
              </button>

              <button className="px-3 py-2 hover:bg-gray-100">
                Berikutnya
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* MODAL */}
      {/* ========================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
              {/* HEADER */}
              <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between rounded-t-xl">
                <h2 className="font-semibold text-lg">
                  {editId
                    ? "Edit Kegiatan"
                    : "Tambah Kegiatan"}
                </h2>

                <button onClick={() => setShowModal(false)}>
                  <X size={20} />
                </button>
              </div>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="p-5 space-y-4"
              >
                <div>
                  <label className="text-sm font-medium">
                    Nama Kegiatan
                  </label>

                  <input
                    type="text"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1 outline-none focus:ring-2 ring-blue-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Jenis
                  </label>

                  <input
                    type="text"
                    name="jenis"
                    value={form.jenis}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1 outline-none focus:ring-2 ring-blue-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium">
                      Tanggal Mulai
                    </label>

                    <input
                      type="datetime-local"
                      name="mulai"
                      value={form.mulai}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1 outline-none focus:ring-2 ring-blue-400"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Tanggal Selesai
                    </label>

                    <input
                      type="datetime-local"
                      name="selesai"
                      value={form.selesai}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 mt-1 outline-none focus:ring-2 ring-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Lokasi
                  </label>

                  <input
                    type="text"
                    name="lokasi"
                    value={form.lokasi}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1 outline-none focus:ring-2 ring-blue-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Penanggung Jawab
                  </label>

                  <input
                    type="text"
                    name="pj"
                    value={form.pj}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1 outline-none focus:ring-2 ring-blue-400"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border rounded px-3 py-2 mt-1 outline-none focus:ring-2 ring-blue-400"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Nonaktif">
                      Nonaktif
                    </option>
                  </select>
                </div>

                {/* BUTTON */}
                <div className="flex justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  >
                    Batal
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {editId ? "Update" : "Simpan"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KelolaKegiatan;