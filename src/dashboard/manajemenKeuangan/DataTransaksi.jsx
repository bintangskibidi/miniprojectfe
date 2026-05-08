import {
  FaMoneyBill,
  FaInfoCircle,
  FaDatabase,
  FaPrint,
} from "react-icons/fa";

export default function DataTransaksi() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="grid grid-cols-12 gap-4">
        
        {/* KIRI */}
        <div className="col-span-9 bg-white rounded-xl shadow">
          
          {/* HEADER */}
          <div className="bg-blue-600 text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
            <h1 className="font-semibold text-sm">
              Transaksi Pembayaran TA - Bulan Mei
            </h1>

            <button className="bg-white text-black text-xs px-2 py-1 rounded">
              0 Kwitansi
            </button>
          </div>

          {/* FILTER */}
          <div className="p-4 border-b">
            <div className="grid grid-cols-4 gap-4">
              
              <div>
                <label className="text-sm font-medium">
                  Tahun Ajaran
                </label>

                <select className="w-full border rounded-lg px-3 py-2 mt-1">
                  <option>2025/2026</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  Bulan
                </label>

                <select className="w-full border rounded-lg px-3 py-2 mt-1">
                  <option>Mei</option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" />
                  Hari Ini Saja
                </label>
              </div>

              <div className="flex items-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                  Filter
                </button>
              </div>
            </div>
          </div>

          {/* CARD STATS */}
          <div className="grid grid-cols-3 gap-4 p-4">
            
            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-500">
                Total Kwitansi
              </p>

              <h2 className="text-2xl font-bold text-blue-600">
                0
              </h2>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-500">
                Total Nominal
              </p>

              <h2 className="text-2xl font-bold text-green-600">
                Rp 0
              </h2>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-500">
                Terbayar
              </p>

              <h2 className="text-2xl font-bold">
                0%
              </h2>
            </div>
          </div>

          {/* TABLE */}
          <div className="p-4">
            <div className="border rounded-xl overflow-hidden">
              
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr className="text-sm">
                    <th className="p-3 border">No</th>
                    <th className="p-3 border">No. Kwitansi</th>
                    <th className="p-3 border">Tanggal</th>
                    <th className="p-3 border">NIS</th>
                    <th className="p-3 border">Nama Siswa</th>
                    <th className="p-3 border">Aksi</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td
                      colSpan={6}
                      className="text-center py-16 text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <FaDatabase className="text-5xl text-gray-400" />

                        <p className="text-lg">
                          Tidak ada data transaksi
                        </p>

                        <button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50">
                          Tampilkan Bulan Ini
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>

        {/* KANAN */}
        <div className="col-span-3 space-y-4">

          {/* CARD 1 */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="bg-cyan-500 text-white px-4 py-2 font-semibold">
              Transaksi Hari Ini
            </div>

            <div className="p-4 text-center">
              <h2 className="text-3xl font-bold text-blue-600">
                Rp 0
              </h2>

              <button className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm">
                Lihat Detail
              </button>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="bg-green-600 text-white px-4 py-2 font-semibold">
              Ringkasan Bulan Mei
            </div>

            <div className="p-4">
              <p className="text-sm text-gray-500">
                Total Nominal
              </p>

              <h2 className="text-2xl font-bold text-green-600">
                Rp 0
              </h2>

              <div className="w-full h-3 bg-gray-200 rounded-full mt-4">
                <div className="w-0 h-full bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* CARD 3 */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="bg-yellow-400 px-4 py-2 font-semibold flex items-center gap-2">
              <FaInfoCircle />
              Informasi Penting
            </div>

            <div className="p-4 text-sm space-y-2">
              <p>✔ Filter aktif: Mei</p>
              <p>✔ Klik view untuk detail</p>
              <p>✔ Klik print untuk cetak</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}