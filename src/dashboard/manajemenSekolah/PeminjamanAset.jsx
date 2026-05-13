import { useMemo, useState } from 'react'
import Swal from 'sweetalert2'

export default function PeminjamanAset() {
  const [searchStatus, setSearchStatus] = useState('')
  const [searchTanggal, setSearchTanggal] = useState('')
  const [showModal, setShowModal] = useState(false)

  const [data, setData] = useState([
    {
      id: 1,
      aset: 'Komputer',
      kategori: 'Elektronik',
      peminjam: 'Agung',
      kelas: 'Siswa - 7839994',
      tglPinjam: '2025-11-10',
      tglKembali: '2025-11-15',
      jumlah: 1,
      status: 'Dikembalikan',
      keterangan: '-',
    },
  ])

  const [form, setForm] = useState({
    aset: '',
    kategori: 'Elektronik',
    peminjam: '',
    kelas: '',
    tglPinjam: '',
    tglKembali: '',
    jumlah: '',
    status: 'Dipinjam',
    keterangan: '',
  })

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchStatus = searchStatus ? item.status === searchStatus : true
      const matchTanggal = searchTanggal ? item.tglPinjam === searchTanggal : true
      return matchStatus && matchTanggal
    })
  }, [data, searchStatus, searchTanggal])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleTambah = () => {
    if (!form.aset || !form.peminjam || !form.kelas || !form.tglPinjam || !form.tglKembali || !form.jumlah) {
      Swal.fire({ icon: 'warning', title: 'Oops...', text: 'Semua field wajib diisi!' })
      return
    }
    const newData = { id: Date.now(), ...form }
    setData([...data, newData])
    Swal.fire({ icon: 'success', title: 'Berhasil', text: 'Data peminjaman berhasil ditambahkan', timer: 1500, showConfirmButton: false })
    setShowModal(false)
    setForm({ aset: '', kategori: 'Elektronik', peminjam: '', kelas: '', tglPinjam: '', tglKembali: '', jumlah: '', status: 'Dipinjam', keterangan: '' })
  }

  const handleDetail = (item) => {
    Swal.fire({
      title: item.aset,
      html: `<div style="text-align:left; font-size: 14px;">
          <p><b>Kategori:</b> ${item.kategori}</p>
          <p><b>Peminjam:</b> ${item.peminjam}</p>
          <p><b>Kelas:</b> ${item.kelas}</p>
          <p><b>Tanggal Pinjam:</b> ${item.tglPinjam}</p>
          <p><b>Tanggal Kembali:</b> ${item.tglKembali}</p>
          <p><b>Jumlah:</b> ${item.jumlah}</p>
          <p><b>Status:</b> ${item.status}</p>
          <p><b>Keterangan:</b> ${item.keterangan}</p>
        </div>`,
      icon: 'info',
    })
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="mx-auto max-w-7xl rounded-lg bg-white shadow-sm overflow-hidden border border-slate-200">
        
        {/* HEADER */}
        <div className="flex flex-col gap-3 bg-blue-600 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <h1 className="flex items-center gap-2 text-xl font-bold text-white">
            <span className="text-2xl">📂</span> Peminjaman Aset
          </h1>
          <div className="flex flex-wrap gap-2">
            <button className="rounded bg-white px-4 py-2 text-xs font-bold text-blue-700 hover:bg-slate-50 transition shadow-sm">
              + Tambah Peminjam
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="rounded bg-white px-4 py-2 text-xs font-bold text-blue-700 hover:bg-slate-50 transition shadow-sm"
            >
              + Pinjam Aset
            </button>
          </div>
        </div>

        {/* FILTER */}
        <div className="flex flex-col gap-3 p-4 md:flex-row bg-slate-50/50 border-b border-slate-100">
          <select
            value={searchStatus}
            onChange={(e) => setSearchStatus(e.target.value)}
            className="w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 md:w-48"
          >
            <option value="">Semua Status</option>
            <option value="Dipinjam">Dipinjam</option>
            <option value="Dikembalikan">Dikembalikan</option>
          </select>

          <input
            type="date"
            value={searchTanggal}
            onChange={(e) => setSearchTanggal(e.target.value)}
            className="w-full rounded border border-slate-300 bg-white px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 md:w-48"
          />
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto p-4">
          <table className="w-full border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100 text-xs font-bold uppercase tracking-wider text-slate-700">
                <th className="border border-slate-200 px-3 py-3 text-center w-12">#</th>
                <th className="border border-slate-200 px-4 py-3 text-left">Aset</th>
                <th className="border border-slate-200 px-4 py-3 text-left">Peminjam</th>
                <th className="border border-slate-200 px-4 py-3 text-left">Tgl Pinjam</th>
                <th className="border border-slate-200 px-4 py-3 text-left">Tgl Kembali</th>
                <th className="border border-slate-200 px-3 py-3 text-center">Jumlah</th>
                <th className="border border-slate-200 px-3 py-3 text-center">Status</th>
                <th className="border border-slate-200 px-4 py-3 text-left">Keterangan</th>
                <th className="border border-slate-200 px-3 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredData.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors odd:bg-white even:bg-slate-50/30">
                  <td className="border border-slate-200 px-3 py-3 text-center text-slate-500">{index + 1}</td>
                  <td className="border border-slate-200 px-4 py-3">
                    <div className="font-bold text-slate-800">{item.aset}</div>
                    <div className="text-[11px] text-slate-400">Kategori: {item.kategori}</div>
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    <div className="font-semibold text-slate-700">{item.peminjam}</div>
                    <div className="text-[11px] text-slate-400">{item.kelas}</div>
                  </td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">{item.tglPinjam}</td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-600">{item.tglKembali}</td>
                  <td className="border border-slate-200 px-3 py-3 text-center">{item.jumlah}</td>
                  <td className="border border-slate-200 px-3 py-3 text-center">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      item.status === 'Dikembalikan' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="border border-slate-200 px-4 py-3 text-slate-500 italic">{item.keterangan}</td>
                  <td className="border border-slate-200 px-3 py-3 text-center">
                    <button
                      onClick={() => handleDetail(item)}
                      className="rounded-md bg-blue-50 p-1.5 text-blue-600 hover:bg-blue-600 hover:text-white transition shadow-sm border border-blue-100"
                    >
                      <span className="text-base leading-none">👁</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL (Responsive & Cleaner Text) */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-5">
              <h1 className="text-lg font-bold text-slate-800">Tambah Peminjaman</h1>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-red-500 text-xl font-bold">✕</button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Nama Aset</label>
                  <input type="text" name="aset" value={form.aset} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" placeholder="Contoh: Laptop" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Kategori</label>
                  <select name="kategori" value={form.kategori} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
                    <option>Elektronik</option>
                    <option>Furniture</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Nama Peminjam</label>
                  <input type="text" name="peminjam" value={form.peminjam} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Kelas / ID</label>
                  <input type="text" name="kelas" value={form.kelas} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Tgl Pinjam</label>
                  <input type="date" name="tglPinjam" value={form.tglPinjam} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Tgl Kembali</label>
                  <input type="date" name="tglKembali" value={form.tglKembali} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Jumlah</label>
                  <input type="number" name="jumlah" value={form.jumlah} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Status</label>
                  <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500">
                    <option>Dipinjam</option>
                    <option>Dikembalikan</option>
                  </select>
                </div>
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600">Keterangan</label>
                  <textarea name="keterangan" value={form.keterangan} onChange={handleChange} className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500" rows="3" />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 border-t bg-slate-50 p-5 rounded-b-xl">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700">Batal</button>
              <button onClick={handleTambah} className="rounded-md bg-blue-600 px-6 py-2 text-sm font-bold text-white hover:bg-blue-700 shadow-md">Simpan Data</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}