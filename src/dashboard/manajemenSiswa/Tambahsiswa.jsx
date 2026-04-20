import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TambahSiswa() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nis: "",
    nisn: "",
    nama: "",
    tempatLahir: "",
    tglLahir: "",
    jk: "",
    alamat: "",
    agama: "",
    darah: "",
    status: "",
    tahunAjaran: "2025/2026",
    tahunMasuk: "2026",
    kelas: "",
    jurusan: "",
    hp: "",
    sekolah: "",
    ayah: "",
    ibu: "",
    wali: "",
    kerjaAyah: "",
    kerjaIbu: "",
    hpAyah: "",
    hpIbu: "",
    hpWali: "",
    hubunganWali: "",
  });

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  const selectClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500";

  const textareaClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.nis || !form.nama) {
      alert("NIS & Nama wajib diisi!");
      return;
    }

    console.log("DATA SISWA:", form);
    alert("Data berhasil disimpan!");
    navigate("/dashboard/datasiswa");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Manajemen Siswa</h2>

        {/* DATA SISWA */}
        <h3 className="font-semibold text-gray-700 mb-3">Data Siswa</h3>

        <div className="grid grid-cols-2 gap-4">
          <input name="nis" placeholder="NIS" className={inputClass} onChange={handleChange} />
          <input name="nama" placeholder="Nama Lengkap" className={inputClass} onChange={handleChange} />

          <input name="tempatLahir" placeholder="Tempat Lahir" className={inputClass} onChange={handleChange} />
          <input type="date" name="tglLahir" className={inputClass} onChange={handleChange} />

          <select name="jk" className={selectClass} onChange={handleChange}>
            <option value="">Jenis Kelamin</option>
            <option>Laki-Laki</option>
            <option>Perempuan</option>
          </select>

          <input name="nisn" placeholder="NISN" className={inputClass} onChange={handleChange} />

          <textarea
            name="alamat"
            placeholder="Alamat"
            className={`${textareaClass} col-span-2`}
            onChange={handleChange}
          />

          <select name="agama" className={selectClass} onChange={handleChange}>
            <option value="">Agama</option>
            <option>Islam</option>
            <option>Kristen</option>
            <option>Hindu</option>
            <option>Buddha</option>
          </select>

          <select name="darah" className={selectClass} onChange={handleChange}>
            <option value="">Golongan Darah</option>
            <option>A</option>
            <option>B</option>
            <option>O</option>
            <option>AB</option>
          </select>

          <select name="status" className={selectClass} onChange={handleChange}>
            <option value="">Status</option>
            <option>Aktif</option>
            <option>Alumni</option>
          </select>

          <select name="tahunAjaran" className={selectClass} onChange={handleChange}>
            <option>2025/2026</option>
          </select>

          <select name="tahunMasuk" className={selectClass} onChange={handleChange}>
            <option>2026</option>
          </select>

          <select name="kelas" className={selectClass} onChange={handleChange}>
            <option value="">Kelas</option>
            <option>7A</option>
            <option>7B</option>
          </select>

          <select name="jurusan" className={selectClass} onChange={handleChange}>
            <option value="">Jurusan</option>
            <option>IPA</option>
            <option>IPS</option>
          </select>

          <input name="hp" placeholder="No HP / WA" className={inputClass} onChange={handleChange} />
          <input name="sekolah" placeholder="Sekolah Asal" className={inputClass} onChange={handleChange} />
        </div>

        {/* DATA ORANG TUA */}
        <h3 className="font-semibold text-gray-700 mt-6 mb-3">Data Orang Tua</h3>

        <div className="grid grid-cols-3 gap-4">
          <input name="ayah" placeholder="Nama Ayah" className={inputClass} onChange={handleChange} />
          <input name="ibu" placeholder="Nama Ibu" className={inputClass} onChange={handleChange} />
          <input name="wali" placeholder="Nama Wali" className={inputClass} onChange={handleChange} />

          <input name="kerjaAyah" placeholder="Pekerjaan Ayah" className={inputClass} onChange={handleChange} />
          <input name="kerjaIbu" placeholder="Pekerjaan Ibu" className={inputClass} onChange={handleChange} />
          <input name="hpWali" placeholder="No HP Wali" className={inputClass} onChange={handleChange} />

          <input name="hpAyah" placeholder="No HP Ayah" className={inputClass} onChange={handleChange} />
          <input name="hpIbu" placeholder="No HP Ibu" className={inputClass} onChange={handleChange} />
          <input name="hubunganWali" placeholder="Hubungan Wali" className={inputClass} onChange={handleChange} />
        </div>

        {/* BUTTON */}
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
            onClick={() => navigate("/dashboard/datasiswa")}
          >
            Kembali
          </button>

          <button
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
            onClick={handleSubmit}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}