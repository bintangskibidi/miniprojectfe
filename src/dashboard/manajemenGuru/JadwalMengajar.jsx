import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import api from "../../utils/api";

import {
  RiAddLine,
  RiSearchLine,
  RiPencilLine,
  RiDeleteBinLine,
} from "react-icons/ri";

const initialForm = {
  guru: "", // Ini bakal nampung ID
  mapel: "",
  kelas: "",
  hari: "",
  jamMulai: "",
  jamSelesai: "",
};

const HARI_LIST = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const TAHUN_AJARAN = ["2023/2024", "2024/2025", "2025/2026", "2026/2027"];

const JadwalMengajar = () => {
  const [data, setData] = useState([]);
  const [dropdown, setDropdown] = useState({ mapel: [], kelas: [] });
  const [dropdownWaliKelas, setDropdownWaliKelas] = useState([]);

  const [tahunAjaran, setTahunAjaran] = useState("2025/2026");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(initialForm);

  /* ── FETCH DATA ── */
  const fetchData = async () => {
    try {
      const res = await api.get("/jadwal", { params: { tahun_ajaran: tahunAjaran } });
      setData(res.data.data || []);
    } catch (err) { console.error(err); }
  };

  const fetchDropdownData = async () => {
    try {
      // 1. Ambil Mapel & Kelas dari endpoint dropdown
      const resDrop = await api.get("/jadwal/dropdown");
      setDropdown({
        mapel: resDrop.data.data.mapel || [],
        kelas: resDrop.data.data.kelas || [],
      });

      // 2. Ambil Guru dari API WALI KELAS (Sesuai mau lu)
      const resWali = await api.get("/walikelas");
      // Simpan data wali kelas ke state
      setDropdownWaliKelas(resWali.data.data || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchData(); }, [tahunAjaran]);
  useEffect(() => { fetchDropdownData(); }, []);

  /* ── CRUD ── */
  const handleSimpan = async () => {
    const { guru, mapel, kelas, hari, jamMulai, jamSelesai } = form;

    if (!guru || !mapel || !kelas || !hari || !jamMulai || !jamSelesai) {
      Swal.fire("Peringatan", "Semua field wajib diisi bang!", "warning");
      return;
    }

    // PAYLOAD DISESUAIIN SAMA BACKEND (schema.py)
    const payload = {
      guru_id: parseInt(guru), // ID Pegawai dari dropdown wali kelas
      mapel_id: parseInt(mapel),
      kelas_id: parseInt(kelas),
      hari,
      jam_mulai: jamMulai,
      jam_selesai: jamSelesai,
      tahun_ajaran: tahunAjaran,
    };

    try {
      if (editId) {
        await api.put(`/jadwal/${editId}`, payload);
      } else {
        await api.post("/jadwal", payload);
      }
      Swal.fire("Berhasil", "Data aman tersimpan!", "success");
      fetchData();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      // Biar tau kenapa 400, liat di console log
      Swal.fire("Error", err.response?.data?.message || "Gagal simpan data", "error");
    }
  };

  const handleEdit = (item) => {
    setForm({
      guru: String(item.guru_id || ""),
      mapel: String(item.mapel_id || ""),
      kelas: String(item.kelas_id || ""),
      hari: item.hari || "",
      jamMulai: item.jam_mulai || "",
      jamSelesai: item.jam_selesai || "",
    });
    setEditId(item.id);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>Jadwal Mengajar ({tahunAjaran})</h4>
        <button className="btn btn-primary" onClick={() => { setForm(initialForm); setEditId(null); setShowModal(true); }}>
          <RiAddLine /> Tambah
        </button>
      </div>

      {/* Filter Tahun Ajaran */}
      <select className="form-select mb-3" style={{width: 200}} value={tahunAjaran} onChange={(e) => setTahunAjaran(e.target.value)}>
        {TAHUN_AJARAN.map(t => <option key={t} value={t}>{t}</option>)}
      </select>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Guru</th>
            <th>Mapel</th>
            <th>Kelas</th>
            <th>Hari</th>
            <th>Jam</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.guru}</td>
              <td>{item.mapel}</td>
              <td>{item.kelas}</td>
              <td>{item.hari}</td>
              <td>{item.jam}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(item)}><RiPencilLine /></button>
                <button className="btn btn-sm btn-danger" onClick={() => {/* handleHapus */}}><RiDeleteBinLine /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div className="modal d-block" style={{background: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>{editId ? "Edit" : "Tambah"} Jadwal</h5>
                <button className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {/* SELECT GURU DARI API WALI KELAS */}
                <div className="mb-2">
                  <label>Guru (Dari Wali Kelas)</label>
                  <select className="form-select" name="guru" value={form.guru} onChange={(e) => setForm({...form, guru: e.target.value})}>
                    <option value="">-- Pilih Guru --</option>
                    {dropdownWaliKelas.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.namaPegawai}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-2">
                  <label>Mapel</label>
                  <select className="form-select" name="mapel" value={form.mapel} onChange={(e) => setForm({...form, mapel: e.target.value})}>
                    <option value="">-- Pilih Mapel --</option>
                    {dropdown.mapel.map(m => <option key={m.id} value={m.id}>{m.nama}</option>)}
                  </select>
                </div>

                <div className="mb-2">
                  <label>Kelas</label>
                  <select className="form-select" name="kelas" value={form.kelas} onChange={(e) => setForm({...form, kelas: e.target.value})}>
                    <option value="">-- Pilih Kelas --</option>
                    {dropdown.kelas.map(k => <option key={k.id} value={k.id}>{k.namaKelas || k.nama_kelas}</option>)}
                  </select>
                </div>

                <div className="mb-2">
                  <label>Hari</label>
                  <select className="form-select" value={form.hari} onChange={(e) => setForm({...form, hari: e.target.value})}>
                    <option value="">-- Pilih Hari --</option>
                    {HARI_LIST.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </div>

                <div className="row">
                  <div className="col"><input type="time" className="form-control" value={form.jamMulai} onChange={(e) => setForm({...form, jamMulai: e.target.value})} /></div>
                  <div className="col"><input type="time" className="form-control" value={form.jamSelesai} onChange={(e) => setForm({...form, jamSelesai: e.target.value})} /></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleSimpan}>Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JadwalMengajar;