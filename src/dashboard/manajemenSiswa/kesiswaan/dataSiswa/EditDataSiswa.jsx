import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../utils/api";
import Swal from "sweetalert2";

const FormEditSiswa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nis: "",
    nisn: "",
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "",
    alamat: "",
    agama: "",
    golongan_darah: "",
    status: "",
    tahun_ajaran: "",
    tahun_masuk: "",
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

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/siswa/${id}`);
        if (res.data.status) {
          setFormData(res.data.data);
        }
      } catch (error) {
        Swal.fire("Error", "Gagal mengambil data siswa", "error");
      }
    };
    fetchDetail();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const rawData = { ...formData };

    const payload = {};
    Object.keys(rawData).forEach((key) => {
      if (
        rawData[key] !== null &&
        rawData[key] !== undefined &&
        rawData[key] !== "" &&
        key !== "id"
      ) {
        payload[key] = rawData[key];
      }
    });

    try {
      // Kirim hanya data yang berisi saja
      const response = await api.put(`/siswa/${id}`, payload);

      if (response.data.status) {
        Swal.fire("Berhasil", "Data siswa berhasil diperbarui!", "success");
        navigate("/dashboard/datasiswa");
      }
    } catch (error) {
      console.error("Payload yang dikirim:", payload);
      console.error("Respon Error Backend:", error.response?.data);

      // Tampilkan pesan error asli dari Python agar kita tahu field mana yang bikin macet
      const serverError =
        error.response?.data?.description ||
        "Gagal simpan (Cek Terminal Python)";
      Swal.fire("Gagal", serverError, "error");
    }
  };

  return (
    <div className="container-fluid p-4" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold text-dark mb-0">Edit Data Siswa</h4>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate(-1)}
        >
          {" "}
          Kembali
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* SECTION 1: DATA PRIBADI */}
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
                value={formData.nis || ""}
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
                value={formData.nisn || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small fw-bold">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                className="form-control form-control-sm"
                value={formData.nama || ""}
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
                value={formData.tempat_lahir || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Tanggal Lahir</label>
              <input
                type="date"
                name="tanggal_lahir"
                className="form-control form-control-sm"
                value={formData.tanggal_lahir || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Jenis Kelamin</label>
              <select
                name="jenis_kelamin"
                className="form-select form-select-sm"
                value={formData.jenis_kelamin || ""}
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
                value={formData.agama || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <label className="form-label small fw-bold">Alamat</label>
              <textarea
                name="alamat"
                className="form-control form-control-sm"
                rows="2"
                value={formData.alamat || ""}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        {/* SECTION 2: DATA AKADEMIK */}
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
                value={formData.kelas || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Jurusan</label>
              <input
                type="text"
                name="jurusan"
                className="form-control form-control-sm"
                value={formData.jurusan || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Tahun Ajaran</label>
              <input
                type="text"
                name="tahun_ajaran"
                className="form-control form-control-sm"
                value={formData.tahun_ajaran || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">Status</label>
              <select
                name="status"
                className="form-select form-select-sm"
                value={formData.status || ""}
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
                value={formData.sekolah_asal || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Nomor HP Siswa</label>
              <input
                type="text"
                name="hp"
                className="form-control form-control-sm"
                value={formData.hp || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: DATA ORANG TUA / WALI */}
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
                value={formData.ayah || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Pekerjaan Ayah</label>
              <input
                type="text"
                name="pekerjaan_ayah"
                className="form-control form-control-sm"
                value={formData.pekerjaan_ayah || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">HP Ayah</label>
              <input
                type="text"
                name="hp_ayah"
                className="form-control form-control-sm"
                value={formData.hp_ayah || ""}
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
                value={formData.ibu || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Pekerjaan Ibu</label>
              <input
                type="text"
                name="pekerjaan_ibu"
                className="form-control form-control-sm"
                value={formData.pekerjaan_ibu || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">HP Ibu</label>
              <input
                type="text"
                name="hp_ibu"
                className="form-control form-control-sm"
                value={formData.hp_ibu || ""}
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
                value={formData.wali || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Hubungan Wali</label>
              <input
                type="text"
                name="hubungan_wali"
                className="form-control form-control-sm"
                value={formData.hubungan_wali || ""}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">HP Wali</label>
              <input
                type="text"
                name="hp_wali"
                className="form-control form-control-sm"
                value={formData.hp_wali || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="card shadow-sm border-0">
          <div className="card-body text-end">
            <button
              type="button"
              className="btn btn-light btn-sm me-2 fw-bold"
              onClick={() => navigate(-1)}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn btn-success btn-sm px-5 fw-bold"
            >
              Simpan Perubahan
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormEditSiswa;
