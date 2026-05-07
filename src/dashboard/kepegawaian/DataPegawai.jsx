import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../utils/api";

import {
  RiAddLine,
  RiDeleteBinLine,
  RiPencilLine,
  RiSearchLine,
  RiTeamLine,
} from "react-icons/ri";

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

const DataPegawai = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState(initialForm);

  const [editId, setEditId] = useState(null);

  // ================= GET DATA =================
  const getData = async () => {
    try {
      const res = await api.get("/pegawai");

      setData(res.data.data || []);
    } catch (err) {
      console.error(err);

      Swal.fire("Error", "Gagal mengambil data", "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= RESET =================
  const resetForm = () => {
    setForm(initialForm);
    setEditId(null);
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      if (
        !form.nama ||
        !form.jabatan ||
        !form.unit ||
        !form.status
      ) {
        Swal.fire(
          "Warning",
          "Field wajib belum diisi",
          "warning"
        );
        return;
      }

      if (editId) {
        await api.put(`/pegawai/${editId}`, form);

        Swal.fire(
          "Berhasil",
          "Data berhasil diupdate",
          "success"
        );
      } else {
        await api.post("/pegawai", form);

        Swal.fire(
          "Berhasil",
          "Data berhasil ditambahkan",
          "success"
        );
      }

      getData();

      setShowModal(false);

      resetForm();
    } catch (err) {
      console.error(err);

      Swal.fire("Error", "Terjadi kesalahan", "error");
    }
  };

  // ================= EDIT =================
  const handleEdit = (item) => {
    setForm(item);

    setEditId(item.id);

    setShowModal(true);
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin hapus data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/pegawai/${id}`);

        Swal.fire(
          "Berhasil",
          "Data berhasil dihapus",
          "success"
        );

        getData();
      } catch (err) {
        Swal.fire(
          "Error",
          "Gagal menghapus data",
          "error"
        );
      }
    }
  };

  // ================= FILTER =================
  const filtered = data.filter(
    (item) =>
      item.nama
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.nip
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  // ================= MASA KERJA =================
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
    <div
      className="container-fluid py-3"
      style={{ background: "#f4f6f9" }}
    >
      {/* CARD */}
      <div className="card border-0 shadow-sm">
        {/* HEADER */}
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-2">
            <RiTeamLine size={22} />

            <h5 className="mb-0 fw-bold">
              Data Pegawai
            </h5>
          </div>

          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              resetForm();

              setShowModal(true);
            }}
          >
            <RiAddLine /> Tambah Pegawai
          </button>
        </div>

        {/* BODY */}
        <div className="card-body">
          {/* SEARCH */}
          <div className="d-flex justify-content-end mb-3">
            <div
              className="input-group"
              style={{ width: 300 }}
            >
              <span className="input-group-text bg-white">
                <RiSearchLine />
              </span>

              <input
                type="text"
                className="form-control"
                placeholder="Cari nama / nip..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light text-center small">
                <tr>
                  <th>No</th>
                  <th>Nama</th>
                  <th>NIP</th>
                  <th>Pendidikan</th>
                  <th>Golongan</th>
                  <th>Status</th>
                  <th>Tanggal SK</th>
                  <th>Masa Kerja</th>
                  <th>Jabatan</th>
                  <th>No HP</th>
                  <th>Email</th>
                  <th>Jenis</th>
                  <th>Unit</th>
                  <th>Status</th>
                  <th width="120">Aksi</th>
                </tr>
              </thead>

              <tbody className="small">
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={15}
                      className="text-center py-4"
                    >
                      Tidak ada data
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, i) => (
                    <tr key={item.id}>
                      <td className="text-center">
                        {i + 1}
                      </td>

                      <td>{item.nama}</td>

                      <td>{item.nip}</td>

                      <td>{item.pendidikan}</td>

                      <td>{item.golongan}</td>

                      <td>
                        {item.status_pegawai}
                      </td>

                      <td>{item.tanggal_sk}</td>

                      <td>
                        {hitungMasaKerja(
                          item.tanggal_sk
                        )}
                      </td>

                      <td>{item.jabatan}</td>

                      <td>{item.no_hp}</td>

                      <td>{item.email}</td>

                      <td>
                        {item.jenis_pegawai}
                      </td>

                      <td>{item.unit}</td>

                      <td className="text-center">
                        <span
                          className={`badge ${
                            item.status === "Aktif"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="text-center">
                        <button
                          className="btn btn-primary btn-sm me-1"
                          onClick={() =>
                            handleEdit(item)
                          }
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

      {/* MODAL */}
      {showModal && (
        <div
          className="modal d-block"
          style={{
            background: "rgba(0,0,0,0.5)",
          }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              {/* HEADER */}
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {editId
                    ? "Edit Pegawai"
                    : "Tambah Pegawai"}
                </h5>

                <button
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowModal(false);

                    resetForm();
                  }}
                />
              </div>

              {/* BODY */}
              <div className="modal-body">
                <div className="row g-3">
                  <Input
                    label="Nama"
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
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
                    name="status_pegawai"
                    value={form.status_pegawai}
                    onChange={handleChange}
                  />

                  <Input
                    type="date"
                    label="Tanggal SK"
                    name="tanggal_sk"
                    value={form.tanggal_sk}
                    onChange={handleChange}
                  />

                  <Input
                    label="Jabatan"
                    name="jabatan"
                    value={form.jabatan}
                    onChange={handleChange}
                  />

                  <Input
                    label="No HP"
                    name="no_hp"
                    value={form.no_hp}
                    onChange={handleChange}
                  />

                  <Input
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />

                  <Input
                    label="Jenis Pegawai"
                    name="jenis_pegawai"
                    value={form.jenis_pegawai}
                    onChange={handleChange}
                  />

                  <Input
                    label="Unit"
                    name="unit"
                    value={form.unit}
                    onChange={handleChange}
                  />

                  <div className="col-md-6">
                    <label className="form-label">
                      Status
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
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);

                    resetForm();
                  }}
                >
                  Batal
                </button>

                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPegawai;

// ================= INPUT =================
const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}) => {
  return (
    <div className="col-md-6">
      <label className="form-label">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="form-control"
      />
    </div>
  );
};