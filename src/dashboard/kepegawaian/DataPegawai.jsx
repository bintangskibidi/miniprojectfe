import React, { useState } from "react";
import Swal from "sweetalert2";

export default function DataPegawai() {
  const [dataPegawai, setDataPegawai] = useState([
    {
      nama: "Agus Santoso",
      nip: "1234567804",
      pendidikan: "S1",
      golongan: "III/a",
      statusPegawai: "PNS",
      tanggalSk: "2026-01-01",
      jabatan: "Guru Ekonomi",
      hp: "081234560004",
      email: "agus@example.com",
      jenis: "guru",
      unit: "SMA",
      index: "1",
      status: "Aktif",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const initialForm = {
    nama: "",
    nip: "",
    pendidikan: "",
    golongan: "",
    statusPegawai: "",
    tanggalSk: "",
    jabatan: "",
    hp: "",
    email: "",
    jenis: "",
    unit: "",
    index: "",
    status: "",
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditIndex(null);
  };

  const handleSubmit = () => {
    if (
      !form.nama ||
      !form.jabatan ||
      !form.hp ||
      !form.unit ||
      !form.status
    ) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Field wajib belum diisi!",
      });
      return;
    }

    if (editIndex !== null) {
      const updated = [...dataPegawai];
      updated[editIndex] = form;

      setDataPegawai(updated);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data berhasil diupdate",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      setDataPegawai([...dataPegawai, form]);

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data pegawai ditambahkan",
        timer: 1500,
        showConfirmButton: false,
      });
    }

    setShowModal(false);
    resetForm();
  };

  const handleEdit = (index) => {
    setForm(dataPegawai[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index) => {
    Swal.fire({
      title: "Yakin?",
      text: "Data akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = dataPegawai.filter((_, i) => i !== index);
        setDataPegawai(updated);

        Swal.fire("Terhapus!", "Data berhasil dihapus.", "success");
      }
    });
  };

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

  return `${tahun} th ${bulan} bln`;
};

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-blue-600 px-5 py-4 flex justify-between items-center">
          <h1 className="text-white text-lg font-semibold">
            👥 Data Pegawai
          </h1>

          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-white text-blue-600 font-medium px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            + Tambah Pegawai
          </button>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
           <thead className="bg-blue-100 text-gray-700 text-xs">
  <tr>
    <th className="px-3 py-2">No</th>
    <th className="px-3 py-2">Nama</th>
    <th className="px-3 py-2">NIP</th>
    <th className="px-3 py-2">Pendidikan</th>
    <th className="px-3 py-2">Golongan</th>
    <th className="px-3 py-2">Status Pegawai</th>
    <th className="px-3 py-2">Tanggal SK</th>
    <th className="px-3 py-2">Masa Kerja</th>
    <th className="px-3 py-2">Jabatan</th>
    <th className="px-3 py-2">No HP</th>
    <th className="px-3 py-2">Email</th>
    <th className="px-3 py-2">Jenis</th>
    <th className="px-3 py-2">Unit</th>
    <th className="px-3 py-2">Index</th>
    <th className="px-3 py-2">Status</th>
    <th className="px-3 py-2">Aksi</th>
  </tr>
</thead>

            <tbody>
  {dataPegawai.map((item, i) => (
    <tr key={i} className="border-t text-center text-xs hover:bg-gray-50">
      <td className="px-2 py-2">{i + 1}</td>
      <td>{item.nama}</td>
      <td>{item.nip}</td>
      <td>{item.pendidikan}</td>
      <td>{item.golongan}</td>
      <td>{item.statusPegawai}</td>
      <td>{item.tanggalSk}</td>
      <td>{hitungMasaKerja(item.tanggalSk)}</td>
      <td>{item.jabatan}</td>
      <td>{item.hp}</td>
      <td>{item.email}</td>
      <td>{item.jenis}</td>
      <td>{item.unit}</td>
      <td>{item.index}</td>
      <td>
        <span
          className={`px-2 py-1 rounded text-white text-[10px] ${
            item.status === "Aktif"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {item.status}
        </span>
      </td>

      <td className="space-x-1">
        <button
          onClick={() => handleEdit(i)}
          className="bg-yellow-400 px-2 py-1 rounded text-[10px]"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(i)}
          className="bg-red-500 text-white px-2 py-1 rounded text-[10px]"
        >
          Hapus
        </button>
      </td>
    </tr>
  ))}
</tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center overflow-y-auto z-50 py-10 px-4">
          <div className="bg-white w-full max-w-5xl rounded-xl shadow-xl max-h-[95vh] overflow-y-auto">

            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b bg-gray-50 sticky top-0">
              <h2 className="text-xl font-semibold text-gray-700">
                {editIndex !== null
                  ? "Edit Pegawai"
                  : "Tambah Pegawai"}
              </h2>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-500 hover:text-black text-xl"
              >
                ✕
              </button>
            </div>

            {/* BODY */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">

              <Input
                label="Nama Lengkap"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                required
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
                name="statusPegawai"
                value={form.statusPegawai}
                onChange={handleChange}
              />

              <div>
                <label className="block mb-1 font-medium">
                  Tanggal SK
                </label>

                <input
                  type="date"
                  name="tanggalSk"
                  value={form.tanggalSk}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <Input
                label="Jabatan"
                name="jabatan"
                value={form.jabatan}
                onChange={handleChange}
                required
              />

              <Input
                label="No HP"
                name="hp"
                value={form.hp}
                onChange={handleChange}
                required
              />

              <Input
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />

              <Input
                label="Jenis Pegawai"
                name="jenis"
                value={form.jenis}
                onChange={handleChange}
              />

              {/* UNIT */}
              <div>
                <label className="block mb-1 font-medium">
                  Unit <span className="text-red-500">*</span>
                </label>

                <select
                  name="unit"
                  value={form.unit}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="">-- Pilih Unit --</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA">SMA</option>
                </select>
              </div>

              <Input
                label="Index"
                name="index"
                value={form.index}
                onChange={handleChange}
              />

              {/* STATUS */}
              <div className="md:col-span-2">
                <label className="block mb-1 font-medium">
                  Status <span className="text-red-500">*</span>
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="">-- Pilih Status --</option>
                  <option value="Aktif">Aktif</option>
                  <option value="Tidak Aktif">Tidak Aktif</option>
                </select>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t bg-gray-50 sticky bottom-0">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Batal
              </button>

              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* COMPONENT INPUT */
function Input({
  label,
  name,
  value,
  onChange,
  required = false,
}) {
  return (
    <div>
      <label className="block mb-1 font-medium">
        {label}

        {required && (
          <span className="text-red-500"> *</span>
        )}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}