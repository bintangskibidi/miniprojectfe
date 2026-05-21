import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function ManajemenInfo() {
 
  const [infoList, setInfoList] = useState([
    {
      id: 1,
      judul: 'Informasi Maintenance Sistem',
      isi: 'Sedang ada informasi maintenance sistem',
      tanggal: '2025-09-22',
      foto: 'https://via.placeholder.com/80?text=Maintenance', // Placeholder gambar maintenance
      link: '-',
    },
  ]);

   
  const [formTambah, setFormTambah] = useState({
    judul: '',
    isi: '',
    tanggal: '',
    foto: null,
    link: '',
  });

  // State untuk melacak form "Update" per baris data
  const [formEdit, setFormEdit] = useState({});

  // Handle perubahan input pada Form Tambah
  const handleInputChangeTambah = (e) => {
    const { name, value } = e.target;
    setFormTambah({ ...formTambah, [name]: value });
  };

  // Handle input file gambar pada Form Tambah
  const handleFileChangeTambah = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormTambah({ ...formTambah, foto: URL.createObjectURL(file) });
    }
  };

  // Fungsi Submit Form Tambah Info
  const handleSimpanInfo = (e) => {
    e.preventDefault();
    if (!formTambah.judul || !formTambah.isi || !formTambah.tanggal) {
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Judul, Isi, dan Tanggal wajib diisi!',
      });
      return;
    }

    const newId = infoList.length > 0 ? Math.max(...infoList.map((i) => i.id)) + 1 : 1;
    const newData = {
      id: newId,
      judul: formTambah.judul,
      isi: formTambah.isi,
      tanggal: formTambah.tanggal,
      foto: formTambah.foto || 'https://via.placeholder.com/80?text=No+Image',
      link: formTambah.link || '-',
    };

    setInfoList([...infoList, newData]);
    
    // Reset Form
    setFormTambah({ judul: '', isi: '', tanggal: '', foto: null, link: '' });

    MySwal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Informasi baru berhasil ditambahkan.',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Handle perubahan input pada Form Edit di kolom aksi
  const handleInputChangeEdit = (id, e) => {
    const { name, value } = e.target;
    setFormEdit({
      ...formEdit,
      [id]: {
        ...(formEdit[id] || infoList.find((item) => item.id === id)),
        [name]: value,
      },
    });
  };

  // Fungsi Update Info
  const handleUpdateInfo = (id) => {
    const updatedData = formEdit[id] || infoList.find((item) => item.id === id);

    setInfoList(infoList.map((item) => (item.id === id ? { ...item, ...updatedData } : item)));

    MySwal.fire({
      icon: 'success',
      title: 'Diperbarui!',
      text: 'Informasi berhasil diperbarui.',
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Fungsi Hapus Info dengan Konfirmasi SweetAlert2
  const handleHapusInfo = (id, judul) => {
    MySwal.fire({
      title: 'Apakah Anda yakin?',
      text: `Data "${judul}" akan dihapus permanen!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        setInfoList(infoList.filter((item) => item.id !== id));
        MySwal.fire({
          icon: 'success',
          title: 'Dihapus!',
          text: 'Data informasi berhasil dihapus.',
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 font-sans text-gray-700">
      
      {/* ================= GAMBAR 1: FORM TAMBAH INFO ================= */}
      <div className="bg-white border border-gray-200 rounded shadow-sm">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2.5 font-medium text-sm">
          Tambah Info
        </div>
        <form onSubmit={handleSimpanInfo} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Judul</label>
            <input
              type="text"
              name="judul"
              value={formTambah.judul}
              onChange={handleInputChangeTambah}
              className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Isi</label>
            <textarea
              name="isi"
              value={formTambah.isi}
              onChange={handleInputChangeTambah}
              rows="2"
              className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal</label>
            <input
              type="date"
              name="tanggal"
              value={formTambah.tanggal}
              onChange={handleInputChangeTambah}
              className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChangeTambah}
              className="w-full text-sm border border-gray-300 rounded file:bg-gray-100 file:border-0 file:border-r file:border-gray-300 file:px-4 file:py-1.5 file:mr-4 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Link</label>
            <input
              type="text"
              name="link"
              value={formTambah.link}
              onChange={handleInputChangeTambah}
              placeholder="https://contoh.com"
              className="w-full border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:border-blue-400 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1.5 rounded text-sm transition"
          >
            Simpan
          </button>
        </form>
      </div>

      {/* ================= GAMBAR 2: TABEL MANAJEMEN INFO & AKSI ================= */}
      <div className="bg-white border border-gray-200 rounded shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 font-bold text-gray-900">
                <th className="py-2 px-3 border-r border-gray-200 w-8 text-center">#</th>
                <th className="py-2 px-3 border-r border-gray-200 w-1/5">Judul</th>
                <th className="py-2 px-3 border-r border-gray-200 w-1/4">Isi</th>
                <th className="py-2 px-3 border-r border-gray-200 w-28">Tanggal</th>
                <th className="py-2 px-3 border-r border-gray-200 w-24 text-center">Foto</th>
                <th className="py-2 px-3 border-r border-gray-200 w-16 text-center">Link</th>
                <th className="py-2 px-3 w-72">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {infoList.map((item, index) => {
                // Mengambil data dari state edit jika ada, jika tidak gunakan data asli row tersebut
                const currentEditData = formEdit[item.id] || item;

                return (
                  <tr key={item.id} className="border-b border-gray-200 align-top">
                    <td className="py-3 px-3 border-r border-gray-200 text-center">{index + 1}</td>
                    <td className="py-3 px-3 border-r border-gray-200">{item.judul}</td>
                    <td className="py-3 px-3 border-r border-gray-200 whitespace-pre-wrap">{item.isi}</td>
                    <td className="py-3 px-3 border-r border-gray-200">{item.tanggal}</td>
                    <td className="py-3 px-3 border-r border-gray-200 text-center">
                      <img src={item.foto} alt="info" className="w-16 h-16 object-cover mx-auto rounded border" />
                    </td>
                    <td className="py-3 px-3 border-r border-gray-200 text-center">{item.link}</td>
                    
                    {/* Kolom Aksi yang memuat form edit sesuai Gambar 2 */}
                    <td className="p-3 space-y-2">
                      <input
                        type="text"
                        name="judul"
                        value={currentEditData.judul}
                        onChange={(e) => handleInputChangeEdit(item.id, e)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400"
                        placeholder="Informasi Maintenance Sistem"
                      />
                      <textarea
                        name="isi"
                        value={currentEditData.isi}
                        onChange={(e) => handleInputChangeEdit(item.id, e)}
                        rows="2"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400"
                        placeholder="Sedang ada informasi maintenance sistem"
                      />
                      <input
                        type="date"
                        name="tanggal"
                        value={currentEditData.tanggal}
                        onChange={(e) => handleInputChangeEdit(item.id, e)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400"
                      />
                      <input
                        type="file"
                        className="w-full text-xs border border-gray-300 rounded file:bg-gray-100 file:border-0 file:px-2 file:py-1"
                      />
                      <input
                        type="text"
                        name="link"
                        value={currentEditData.link === '-' ? '' : currentEditData.link}
                        onChange={(e) => handleInputChangeEdit(item.id, e)}
                        className="w-full border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-400"
                        placeholder="Masukkan link informasi"
                      />
                      
                      {/* Tombol Aksi Update & Hapus */}
                      <div className="pt-1 space-y-1.5">
                        <button
                          onClick={() => handleUpdateInfo(item.id)}
                          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-1 px-3 rounded text-xs transition text-left shadow-sm"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleHapusInfo(item.id, item.judul)}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded text-xs transition text-left shadow-sm"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
              {infoList.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-gray-400 italic">
                    Belum ada data informasi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}