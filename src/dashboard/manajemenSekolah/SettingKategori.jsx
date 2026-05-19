import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function SettingKategori() {
  
  const [categories, setCategories] = useState([
    { id: 1, name: 'Elektronik' },
    { id: 2, name: 'Furniture' },
  ]);

  
  const handleAddCategory = () => {
    MySwal.fire({
      title: 'Tambah Kategori Aset',
      input: 'text',
      inputLabel: 'Nama Kategori',
      inputPlaceholder: 'Masukkan nama kategori baru...',
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
      confirmButtonColor: '#3b82f6', // Warna biru Tailwind
      cancelButtonColor: '#ef4444',  // Warna merah Tailwind
      inputValidator: (value) => {
        if (!value.trim()) {
          return 'Nama kategori tidak boleh kosong!';
        }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
        const newCategory = { id: newId, name: result.value };
        
        setCategories([...categories, newCategory]);

        // Alert Berhasil
        MySwal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: `Kategori "${result.value}" telah ditambahkan.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  // Fungsi untuk Menghapus Kategori dengan SweetAlert
  const handleDeleteCategory = (id, name) => {
    MySwal.fire({
      title: 'Apakah Anda yakin?',
      text: `Kategori "${name}" akan dihapus secara permanen!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // Merah
      cancelButtonColor: '#6b7280', // Abu-abu
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    }).then((result) => {
      if (result.isConfirmed) {
        setCategories(categories.filter((category) => category.id !== id));

        // Alert Berhasil Hapus
        MySwal.fire({
          icon: 'success',
          title: 'Dihapus!',
          text: `Kategori "${name}" berhasil dihapus.`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto font-sans">
      {/* Container Utama sesuai Desain Gambar */}
      <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden bg-white">
        
        {/* Header Biru */}
        <div className="bg-blue-600 px-4 py-3 flex justify-between items-center text-white">
          <div className="flex items-center gap-2 font-semibold text-lg">
            {/* Icon Tag / Label */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Pengaturan Kategori Aset</span>
          </div>
          
          {/* Tombol Tambah Kategori */}
          <button 
            onClick={handleAddCategory}
            className="bg-white text-gray-800 hover:bg-gray-100 px-3 py-1.5 rounded font-medium text-sm shadow transition flex items-center gap-1"
          >
            <span className="text-lg leading-none">+</span> Tambah Kategori
          </button>
        </div>

        {/* Tabel Data */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 font-bold text-gray-800">
                <th className="py-3 px-4 w-16 text-center border-r border-gray-200">#</th>
                <th className="py-3 px-4 border-r border-gray-200">Nama Kategori</th>
                <th className="py-3 px-4 w-24 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr key={category.id} className="border-b border-gray-200 text-gray-700 hover:bg-gray-50">
                    <td className="py-3 px-4 text-center border-r border-gray-200">{index + 1}</td>
                    <td className="py-3 px-4 border-r border-gray-200">{category.name}</td>
                    <td className="py-3 px-4 text-center">
                      {/* Tombol Hapus (Tong Sampah Merah) */}
                      <button
                        onClick={() => handleDeleteCategory(category.id, category.name)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded shadow transition inline-flex items-center justify-center"
                        title="Hapus Kategori"
                      >
                        {/* Icon Trash Can */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-16v4M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-400 italic">
                    Belum ada kategori aset.
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