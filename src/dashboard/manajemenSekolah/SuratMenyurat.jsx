import React from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  Table as TableIcon, 
  FileDown, 
  Printer, 
  Copy, 
  Pencil, 
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const SuratMenyurat = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        
        {/* Header Biru */}
        <div className="bg-blue-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <FileText size={20} />
            <h1 className="text-lg font-semibold">Surat Menyurat</h1>
          </div>
          <button className="bg-white text-black px-3 py-1.5 rounded flex items-center gap-1 text-sm font-medium hover:bg-gray-100 transition">
            <Plus size={16} />
            Tambah Surat
          </button>
        </div>

        {/* Konten Utama */}
        <div className="p-4">
          
          {/* Toolbar: Export & Search */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <div className="flex flex-wrap gap-1">
              <button className="px-4 py-2 border rounded bg-gray-50 hover:bg-gray-100 text-sm">Copy</button>
              <button className="px-4 py-2 border rounded bg-gray-50 hover:bg-gray-100 text-sm">CSV</button>
              <button className="px-4 py-2 border rounded bg-gray-50 hover:bg-gray-100 text-sm">Excel</button>
              <button className="px-4 py-2 border rounded bg-gray-50 hover:bg-gray-100 text-sm">PDF</button>
              <button className="px-4 py-2 border rounded bg-gray-50 hover:bg-gray-100 text-sm">Print</button>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Search:</label>
              <input 
                type="text" 
                className="border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500" 
              />
            </div>
          </div>

          {/* Tabel */}
          <div className="overflow-x-auto border rounded">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b text-sm font-bold">
                  <th className="p-3 border-r w-12 text-center">#</th>
                  <th className="p-3 border-r">No. Surat</th>
                  <th className="p-3 border-r">Judul</th>
                  <th className="p-3 border-r">Tanggal</th>
                  <th className="p-3 border-r">Jenis</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b hover:bg-gray-50">
                  <td className="p-3 border-r text-center">1</td>
                  <td className="p-3 border-r uppercase">XSAQ</td>
                  <td className="p-3 border-r">Surat</td>
                  <td className="p-3 border-r">06-07-2025</td>
                  <td className="p-3 border-r">Masuk</td>
                  <td className="p-3">
                    <div className="flex justify-center gap-2">
                      <button className="p-1.5 bg-amber-400 text-white rounded hover:bg-amber-500">
                        <Pencil size={16} />
                      </button>
                      <button className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer: Pagination Info */}
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <p>Showing 1 to 1 of 1 entries</p>
            <div className="flex items-center border rounded overflow-hidden">
              <button className="px-3 py-1.5 border-r hover:bg-gray-100 disabled:text-gray-300" disabled>Previous</button>
              <button className="px-4 py-1.5 bg-gray-100 font-bold">1</button>
              <button className="px-3 py-1.5 border-l hover:bg-gray-100 disabled:text-gray-300" disabled>Next</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SuratMenyurat;