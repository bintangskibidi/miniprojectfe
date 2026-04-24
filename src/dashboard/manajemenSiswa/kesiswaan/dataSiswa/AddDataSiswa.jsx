import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../utils/api";
import Swal from "sweetalert2";

const FormTambahSiswa = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nis: "",
    nisn: "",
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "Laki-laki",
    alamat: "",
    agama: "Islam",
    golongan_darah: "O",
    status: "Aktif",
    tahun_ajaran: "2024/2025",
    tahun_masuk: "2024",
    kelas: "",
    jurusan: "",
    hp: "",
    sekolah_asal: "",
    ayah: "",
    ibu: "",
    wali: "",
    pekerjaan_ayah: "",
    pekerjaan_ibu: "",
    hp_ayah: "",
    hp_ibu: "",
    hp_wali: "",
    hubungan_wali: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/siswa", formData);
      Swal.fire("Berhasil", "Data siswa berhasil disimpan!", "success");
      navigate("/dashboard/datasiswa");
    } catch (error) {
      Swal.fire("Error", "Terjadi kesalahan saat menyimpan data", "error");
    }
  };

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-dark mb-0">Tambah Data Siswa</h4>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate(-1)}
        >
          {" "}
          Kembali
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* CARD 1: DATA PRIBADI */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-primary text-white py-2">
            <h6 className="mb-0 small fw-bold">I. DATA PRIBADI</h6>
          </div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <label className="form-label small fw-bold">NIS</label>
              <input
                type="text"
                name="nis"
                className="form-control form-control-sm"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">NISN</label>
              <input
                type="text"
                name="nisn"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                className="form-control form-control-sm"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Tempat Lahir</label>
              <input
                type="text"
                name="tempat_lahir"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Tanggal Lahir</label>
              <input
                type="date"
                name="tanggal_lahir"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Jenis Kelamin</label>
              <select
                name="jenis_kelamin"
                className="form-select form-select-sm"
                onChange={handleChange}
              >
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Agama</label>
              <input
                type="text"
                name="agama"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label small fw-bold">Alamat</label>
              <textarea
                name="alamat"
                className="form-control form-control-sm"
                rows="2"
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        {/* CARD 2: DATA AKADEMIK */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-primary text-white py-2">
            <h6 className="mb-0 small fw-bold">II. DATA AKADEMIK & SEKOLAH</h6>
          </div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <label className="form-label small fw-bold">Kelas</label>
              <input
                type="text"
                name="kelas"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Jurusan</label>
              <input
                type="text"
                name="jurusan"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Tahun Ajaran</label>
              <input
                type="text"
                name="tahun_ajaran"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Status</label>
              <select
                name="status"
                className="form-select form-select-sm"
                onChange={handleChange}
              >
                <option value="Aktif">Aktif</option>
                <option value="Non-Aktif">Non-Aktif</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Sekolah Asal</label>
              <input
                type="text"
                name="sekolah_asal"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Nomor HP Siswa</label>
              <input
                type="text"
                name="hp"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* CARD 3: DATA KELUARGA */}
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-primary text-white py-2">
            <h6 className="mb-0 small fw-bold">III. DATA ORANG TUA / WALI</h6>
          </div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-bold">Nama Ayah</label>
              <input
                type="text"
                name="ayah"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Pekerjaan Ayah</label>
              <input
                type="text"
                name="pekerjaan_ayah"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">HP Ayah</label>
              <input
                type="text"
                name="hp_ayah"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <hr className="my-2 text-muted" />
            <div className="col-md-4">
              <label className="form-label small fw-bold">Nama Ibu</label>
              <input
                type="text"
                name="ibu"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Pekerjaan Ibu</label>
              <input
                type="text"
                name="pekerjaan_ibu"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">HP Ibu</label>
              <input
                type="text"
                name="hp_ibu"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <hr className="my-2 text-muted" />
            <div className="col-md-4">
              <label className="form-label small fw-bold">Nama Wali</label>
              <input
                type="text"
                name="wali"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Hubungan Wali</label>
              <input
                type="text"
                name="hubungan_wali"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">HP Wali</label>
              <input
                type="text"
                name="hp_wali"
                className="form-control form-control-sm"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0">
          <div className="card-body text-end">
            <button type="reset" className="btn btn-light btn-sm me-2 fw-bold">
              Reset Form
            </button>
            <button
              type="submit"
              className="btn btn-success btn-sm px-5 fw-bold"
            >
              Simpan Data Siswa
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormTambahSiswa;
