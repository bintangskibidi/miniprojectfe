import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../../utils/api";
import Swal from "sweetalert2";

const FormEditSiswa = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [kelasList, setKelasList] = useState([]);
  const [jurusanList, setJurusanList] = useState([]);
  const [tahunAjaranList, setTahunAjaranList] = useState([]);

  const [formData, setFormData] = useState({
    nis: "",
    nisn: "",
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    jenis_kelamin: "Laki-laki",
    alamat: "",
    agama: "",
    golongan_darah: "",
    status: "Aktif",
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
    fetchDropdown();
    fetchDetail();
  }, [id]);

  const fetchDropdown = async () => {
    try {
      const res = await api.get("/siswa/dropdown");

      if (res.data.status) {
        setKelasList(res.data.data.kelas || []);
        setJurusanList(res.data.data.jurusan || []);
        setTahunAjaranList(res.data.data.tahun_ajaran || []);
      }
    } catch (error) {
      console.error("Gagal mengambil data dropdown:", error);
      Swal.fire("Error", "Gagal mengambil data dropdown", "error");
    }
  };

  const fetchDetail = async () => {
    try {
      const res = await api.get(`/siswa/${id}`);
      if (res.data.status) {
        setFormData({
          ...formData,
          ...res.data.data,
        });
      }
    } catch (error) {
      Swal.fire("Error", "Gagal mengambil data siswa", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {};
    Object.keys(formData).forEach((key) => {
      if (
        formData[key] !== null &&
        formData[key] !== undefined &&
        formData[key] !== "" &&
        key !== "id"
      ) {
        payload[key] = formData[key];
      }
    });

    try {
      const response = await api.put(`/siswa/${id}`, payload);

      if (response.data.status) {
        Swal.fire("Berhasil", "Data siswa berhasil diperbarui!", "success");
        navigate("/dashboard/datasiswa");
      }
    } catch (error) {
      console.error("Payload yang dikirim:", payload);
      console.error("Respon Error Backend:", error.response?.data);

      const serverError =
        error.response?.data?.description ||
        error.response?.data?.message ||
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
          Kembali
        </button>
      </div>

      <form onSubmit={handleSubmit}>
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
                value={formData.nis}
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
                value={formData.nisn}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label small fw-bold">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                className="form-control form-control-sm"
                value={formData.nama}
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
                value={formData.tempat_lahir}
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
                value={formData.jenis_kelamin}
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
                value={formData.agama}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-12">
              <label className="form-label small fw-bold">Alamat</label>
              <textarea
                name="alamat"
                className="form-control form-control-sm"
                rows="2"
                value={formData.alamat}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-primary text-white py-2">
            <h6 className="mb-0 small fw-bold">II. DATA AKADEMIK & SEKOLAH</h6>
          </div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-bold">Kelas</label>
              <select
                name="kelas"
                className="form-select form-select-sm"
                value={formData.kelas}
                onChange={handleChange}
              >
                <option value="">Pilih Kelas</option>
                {kelasList.map((item) => (
                  <option key={item.id} value={item.nama_kelas || item.kelas}>
                    {item.nama_kelas || item.kelas}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-bold">Jurusan</label>
              <select
                name="jurusan"
                className="form-select form-select-sm"
                value={formData.jurusan}
                onChange={handleChange}
              >
                <option value="">Pilih Jurusan</option>
                {jurusanList.map((item) => (
                  <option key={item.id} value={item.nama_jurusan || item.jurusan}>
                    {item.nama_jurusan || item.jurusan}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-bold">Tahun Ajaran</label>
              <select
                name="tahun_ajaran"
                className="form-select form-select-sm"
                value={formData.tahun_ajaran}
                onChange={handleChange}
              >
                <option value="">Pilih Tahun Ajaran</option>
                {tahunAjaranList.map((item) => (
                  <option key={item.id} value={item.tahun_ajaran}>
                    {item.tahun_ajaran}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-bold">Status</label>
              <select
                name="status"
                className="form-select form-select-sm"
                value={formData.status}
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
                value={formData.sekolah_asal}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label className="form-label small fw-bold">Nomor HP Siswa</label>
              <input
                type="text"
                name="hp"
                className="form-control form-control-sm"
                value={formData.hp}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="card shadow-sm border-0 mb-4">
          <div className="card-header bg-primary text-white py-2">
            <h6 className="mb-0 small fw-bold">III. DATA ORANG TUA / WALI</h6>
          </div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <label className="form-label small fw-bold">Nama Ayah</label>
              <input type="text" name="ayah" className="form-control form-control-sm" value={formData.ayah} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Pekerjaan Ayah</label>
              <input type="text" name="pekerjaan_ayah" className="form-control form-control-sm" value={formData.pekerjaan_ayah} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">HP Ayah</label>
              <input type="text" name="hp_ayah" className="form-control form-control-sm" value={formData.hp_ayah} onChange={handleChange} />
            </div>

            <hr className="my-2 text-muted" />

            <div className="col-md-4">
              <label className="form-label small fw-bold">Nama Ibu</label>
              <input type="text" name="ibu" className="form-control form-control-sm" value={formData.ibu} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Pekerjaan Ibu</label>
              <input type="text" name="pekerjaan_ibu" className="form-control form-control-sm" value={formData.pekerjaan_ibu} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">HP Ibu</label>
              <input type="text" name="hp_ibu" className="form-control form-control-sm" value={formData.hp_ibu} onChange={handleChange} />
            </div>

            <hr className="my-2 text-muted" />

            <div className="col-md-4">
              <label className="form-label small fw-bold">Nama Wali</label>
              <input type="text" name="wali" className="form-control form-control-sm" value={formData.wali} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">Hubungan Wali</label>
              <input type="text" name="hubungan_wali" className="form-control form-control-sm" value={formData.hubungan_wali} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label className="form-label small fw-bold">HP Wali</label>
              <input type="text" name="hp_wali" className="form-control form-control-sm" value={formData.hp_wali} onChange={handleChange} />
            </div>
          </div>
        </div>

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
