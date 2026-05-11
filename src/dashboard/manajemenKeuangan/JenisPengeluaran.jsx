import { FaPlus, FaSave, FaEdit, FaTrash } from "react-icons/fa";

export default function JenisPengeluaran() {
  const data = [
    {
      id: 1,
      kodeAkun: "4.0.4",
      kode: "3",
      nama: "Pendapatan BOSDA",
      jenis: "Dengan Pembatasan",
      status: "Aktif",
    },
    {
      id: 2,
      kodeAkun: "4.0.4",
      kode: "2",
      nama: "Pendapatan BOSREG",
      jenis: "Dengan Pembatasan",
      status: "Aktif",
    },
    {
      id: 3,
      kodeAkun: "4.0.4",
      kode: "1",
      nama: "Pendapatan SPP",
      jenis: "Tanpa Pembatasan",
      status: "Aktif",
    },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      
      {/* TITLE */}
      <h1 className="text-2xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
        💰 Jenis Penerimaan
      </h1>

      {/* FORM CARD */}
      <div className="bg-white rounded shadow border mb-5">
        
        {/* HEADER */}
        <div className="border-b px-4 py-3 font-medium text-gray-700 flex items-center gap-2">
          <FaPlus className="text-green-600" />
          Form Tambah Jenis Pengeluaran
        </div>

        {/* FORM */}
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            
            <div>
              <label className="text-sm font-medium">
                Akun pengeluaran
              </label>

              <select className="w-full border rounded px-3 py-2 mt-1">
                <option>5.0.9 - Beban Gaji guru</option>
                <option>5.0.1 - Beban Lainnya</option>
                <option>5.0.2 - Beban Operasional Guru</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Jenis
              </label>

              <select className="w-full border rounded px-3 py-2 mt-1">
                <option>Dengan Pembatasan</option>
                <option>Tanpa Pembatasan</option>
              </select>
            </div>

           <div>
              <label className="text-sm font-medium">
                Akun Harta
              </label>

              <select className="w-full border rounded px-3 py-2 mt-1">
                <option>Pilih Akun Harta</option>
                <option>1.0.1 Kas</option>
                <option>1.0.2 Kas Di Bank</option>
                 
                 
              </select>
            </div>

            <div>
  <label className="text-sm font-medium">
    Keterangan
  </label>

  <input
    type="text"
    placeholder="Ketik keterangan..."
    className="w-full border rounded px-3 py-2 mt-1"
  />
</div>

            <div>
              <label className="text-sm font-medium">
                Kode Akun Pengeluaran
              </label>

              <input
                type="text"
                placeholder="Masukkan Kode Sub"
    className="w-full border rounded px-3 py-2 mt-1"
                
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Status
              </label>

              <select className="w-full border rounded px-3 py-2 mt-1">
                <option>Pilih Status</option>
                <option>Aktif</option>
                <option>Nonaktif</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">
                Nama Akun Pengeluaran
              </label>

              <input
                type="text"
                placeholder="Masukkan Nama Sub"
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end mt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2">
              <FaSave />
              Simpan
            </button>
          </div>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded shadow border">
        
        {/* HEADER */}
        <div className="border-b px-4 py-3 font-medium text-gray-700">
          📋 Data Jenis Penerimaan
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3">No</th>
                <th className="border p-3">Kode Akun Keuangan</th>
                <th className="border p-3">Kode Penerimaan</th>
                <th className="border p-3">Nama Akun</th>
                <th className="border p-3">Jenis</th>
                <th className="border p-3">Keterangan</th>
                <th className="border p-3">Status</th>
                <th className="border p-3">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50"
                >
                  <td className="border p-3 text-center">
                    {index + 1}
                  </td>

                  <td className="border p-3">
                    {item.kodeAkun}
                  </td>

                  <td className="border p-3">
                    {item.kode}
                  </td>

                  <td className="border p-3">
                    {item.nama}
                  </td>

                  <td className="border p-3">
                    {item.jenis}
                  </td>

                  <td className="border p-3">-</td>

                  <td className="border p-3 text-center">
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                      {item.status}
                    </span>
                  </td>

                  <td className="border p-3">
                    <div className="flex items-center justify-center gap-2">
                      
                      <button className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
                        <FaEdit size={12} />
                      </button>

                      <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded">
                        <FaTrash size={12} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}