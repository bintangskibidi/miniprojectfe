import { useMemo, useState } from 'react'
import Swal from 'sweetalert2'

export default function MaintenanceAset() {
  const [search, setSearch] = useState('')

  const [data] = useState([
    {
      id: 1,
      aset: 'Kursi',
      kategori: 'Elektronik',
      lokasi: 'Ruangan Kelas 1',
      tanggal: '10/11/2025',
      selesai: '-',
      jenis: 'Preventif',
      teknisi: 'Agus',
      biaya: 'Rp 0',
      status: 'Dalam Proses',
    },
  ])

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      item.aset.toLowerCase().includes(search.toLowerCase())
    )
  }, [data, search])

  const handleDetail = (item) => {
    Swal.fire({
      title: 'Detail Maintenance',
      html: `
        <div style="text-align:left;font-size:13px">
          <p><b>Aset:</b> ${item.aset}</p>
          <p><b>Kategori:</b> ${item.kategori}</p>
          <p><b>Lokasi:</b> ${item.lokasi}</p>
          <p><b>Tanggal:</b> ${item.tanggal}</p>
          <p><b>Jenis:</b> ${item.jenis}</p>
          <p><b>Teknisi:</b> ${item.teknisi}</p>
          <p><b>Status:</b> ${item.status}</p>
        </div>
      `,
      icon: 'info',
    })
  }

  return (
    <div className="min-h-screen bg-slate-100 p-2">

      <div className="overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm">

        {/* HEADER */}
        <div className="flex flex-col gap-2 bg-blue-600 px-4 py-3 md:flex-row md:items-center md:justify-between">

          <h1 className="text-lg font-semibold text-white">
            🛠 Maintenance Aset
          </h1>

          <button className="rounded bg-white px-3 py-2 text-xs font-semibold text-black hover:bg-slate-100">
            ➕ Tambah Maintenance
          </button>

        </div>

        {/* CARD INFO */}
        <div className="grid grid-cols-1 gap-3 p-4 md:grid-cols-4">

          <div className="rounded bg-yellow-400 p-4 text-center text-black shadow">
            <h1 className="text-2xl font-bold">1</h1>
            <p className="text-sm">Dalam Proses</p>
          </div>

          <div className="rounded bg-emerald-600 p-4 text-center text-white shadow">
            <h1 className="text-2xl font-bold">0</h1>
            <p className="text-sm">Selesai</p>
          </div>

          <div className="rounded bg-cyan-500 p-4 text-center text-white shadow">
            <h1 className="text-2xl font-bold">0</h1>
            <p className="text-sm">Ditunda</p>
          </div>

          <div className="rounded bg-slate-500 p-4 text-center text-white shadow">
            <h1 className="text-2xl font-bold">Rp 0</h1>
            <p className="text-sm">Total Biaya</p>
          </div>

        </div>

        {/* FILTER */}
        <div className="grid grid-cols-1 gap-3 px-4 pb-4 md:grid-cols-4">

          <select className="rounded border border-slate-300 px-3 py-2 text-sm">
            <option>Semua Status</option>
          </select>

          <select className="rounded border border-slate-300 px-3 py-2 text-sm">
            <option>Semua Jenis</option>
          </select>

          <input
            type="month"
            className="rounded border border-slate-300 px-3 py-2 text-sm"
          />

          <button className="rounded border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100">
            🔄 Reset Filter
          </button>

        </div>

        {/* ACTION */}
        <div className="flex flex-col gap-2 px-4 pb-3 md:flex-row md:items-center md:justify-between">

          <div className="flex flex-wrap gap-2">

            {['Copy', 'CSV', 'Excel', 'PDF', 'Print'].map((btn) => (
              <button
                key={btn}
                className="rounded border border-slate-300 px-4 py-2 text-xs hover:bg-slate-100"
              >
                {btn}
              </button>
            ))}

          </div>

          <div className="flex items-center gap-2">

            <span className="text-sm">Search:</span>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded border border-slate-300 px-3 py-2 text-sm outline-none"
            />

          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto px-4 pb-4">

          <table className="min-w-full border-collapse text-sm">

            <thead>

              <tr className="bg-slate-100">

                <th className="border px-3 py-3 text-left">#</th>
                <th className="border px-3 py-3 text-left">Aset</th>
                <th className="border px-3 py-3 text-left">
                  Tanggal Maintenance
                </th>
                <th className="border px-3 py-3 text-left">
                  Tanggal Selesai
                </th>
                <th className="border px-3 py-3 text-left">Jenis</th>
                <th className="border px-3 py-3 text-left">Teknisi</th>
                <th className="border px-3 py-3 text-left">Biaya</th>
                <th className="border px-3 py-3 text-left">Status</th>
                <th className="border px-3 py-3 text-center">Aksi</th>

              </tr>

            </thead>

            <tbody>

              {filteredData.map((item, index) => (

                <tr key={item.id} className="hover:bg-slate-50">

                  <td className="border px-3 py-3">
                    {index + 1}
                  </td>

                  <td className="border px-3 py-3">

                    <h1 className="font-semibold text-black">
                      {item.aset}
                    </h1>

                    <p className="text-xs text-slate-500">
                      {item.kategori} •
                    </p>

                    <p className="text-xs text-slate-500">
                      {item.lokasi}
                    </p>

                  </td>

                  <td className="border px-3 py-3">
                    {item.tanggal}
                  </td>

                  <td className="border px-3 py-3 text-center">
                    {item.selesai}
                  </td>

                  <td className="border px-3 py-3">

                    <span className="rounded bg-blue-600 px-2 py-1 text-xs font-semibold text-white">
                      {item.jenis}
                    </span>

                  </td>

                  <td className="border px-3 py-3">
                    {item.teknisi}
                  </td>

                  <td className="border px-3 py-3">
                    {item.biaya}
                  </td>

                  <td className="border px-3 py-3">

                    <span className="rounded bg-yellow-400 px-2 py-1 text-xs font-semibold text-black">
                      {item.status}
                    </span>

                  </td>

                  <td className="border px-3 py-3">

                    <div className="flex items-center justify-center gap-1">

                      <button
                        onClick={() => handleDetail(item)}
                        className="rounded bg-cyan-500 px-2 py-1 text-xs text-white hover:bg-cyan-600"
                      >
                        👁
                      </button>

                      <button className="rounded bg-emerald-600 px-2 py-1 text-xs text-white hover:bg-emerald-700">
                        ✔
                      </button>

                      <button className="rounded bg-yellow-400 px-2 py-1 text-xs text-black hover:bg-yellow-500">
                        ✏
                      </button>

                      <button className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600">
                        🗑
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* FOOTER */}
        <div className="flex flex-col gap-3 px-4 pb-4 text-sm md:flex-row md:items-center md:justify-between">

          <p>Showing 1 to 1 of 1 entries</p>

          <div className="flex items-center gap-2">

            <button className="rounded border px-3 py-1 hover:bg-slate-100">
              Previous
            </button>

            <button className="rounded border bg-slate-100 px-3 py-1">
              1
            </button>

            <button className="rounded border px-3 py-1 hover:bg-slate-100">
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}