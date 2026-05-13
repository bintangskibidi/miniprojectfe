import { useMemo, useState } from 'react'
import Swal from 'sweetalert2'

export default function DataAset() {
  const [search, setSearch] = useState('')

  const [assets, setAssets] = useState([
    {
      id: 1,
      nama: 'baju',
      kategori: 'Furniture',
      lokasi: 'Ruangan Kelas 1',
      jumlah: 1,
      harga: 20,
      umur: '5 tahun',
      penyusutan: 4,
    },
    {
      id: 2,
      nama: 'Printer',
      kategori: 'Elektronik',
      lokasi: 'Ruangan Kelas 1',
      jumlah: 4,
      harga: 1200000,
      umur: '4 tahun',
      penyusutan: 300000,
    },
  ])

  const [showModal, setShowModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const [form, setForm] = useState({
    id: null,
    nama: '',
    kategori: 'Furniture',
    lokasi: '',
    jumlah: '',
    harga: '',
    umur: '',
    penyusutan: '',
  })

  const filteredAssets = useMemo(() => {
    return assets.filter((item) =>
      item.nama.toLowerCase().includes(search.toLowerCase())
    )
  }, [assets, search])

  const formatRupiah = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)
  }

  // INPUT FORM
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // TAMBAH DATA
  const handleTambah = () => {
    setIsEdit(false)

    setForm({
      id: null,
      nama: '',
      kategori: 'Furniture',
      lokasi: '',
      jumlah: '',
      harga: '',
      umur: '',
      penyusutan: '',
    })

    setShowModal(true)
  }

  // SIMPAN DATA
  const handleSave = () => {
    if (
      !form.nama ||
      !form.kategori ||
      !form.lokasi ||
      !form.jumlah ||
      !form.harga ||
      !form.umur ||
      !form.penyusutan
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Semua field wajib diisi!',
      })

      return
    }

    if (isEdit) {
      const updated = assets.map((item) =>
        item.id === form.id
          ? {
              ...form,
              jumlah: Number(form.jumlah),
              harga: Number(form.harga),
              penyusutan: Number(form.penyusutan),
            }
          : item
      )

      setAssets(updated)

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data berhasil diupdate',
        timer: 1500,
        showConfirmButton: false,
      })
    } else {
      const newData = {
        ...form,
        id: Date.now(),
        jumlah: Number(form.jumlah),
        harga: Number(form.harga),
        penyusutan: Number(form.penyusutan),
      }

      setAssets([...assets, newData])

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Data berhasil ditambahkan',
        timer: 1500,
        showConfirmButton: false,
      })
    }

    setShowModal(false)
  }

  // EDIT
  const handleEdit = (item) => {
    setIsEdit(true)

    setForm({
      ...item,
    })

    setShowModal(true)
  }

  // HAPUS
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Yakin?',
      text: 'Data akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Ya, Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        const filtered = assets.filter((item) => item.id !== id)

        setAssets(filtered)

        Swal.fire({
          icon: 'success',
          title: 'Terhapus',
          text: 'Data berhasil dihapus',
          timer: 1500,
          showConfirmButton: false,
        })
      }
    })
  }

  return (
    <div className="min-h-screen bg-slate-100 p-3">

      {/* HEADER */}
      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-blue-600">
            📘 Data Aset Sekolah
          </h1>

          <p className="text-sm text-slate-500">
            Kelola data aset sekolah
          </p>
        </div>

        <div className="flex flex-wrap gap-2">

          <button className="rounded bg-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-cyan-600">
            ⬇ Download Template
          </button>

          <button className="rounded bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700">
            ⬆ Upload Excel
          </button>

          <button
            onClick={handleTambah}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
          >
            + Tambah Aset
          </button>

        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-md border border-slate-300 bg-white shadow-sm">

        {/* HEADER TABLE */}
        <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-2">

          <div className="flex items-center gap-2">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white">
              📋 Daftar Aset
            </h2>

            <span className="rounded bg-white px-2 py-[1px] text-xs font-bold text-blue-600">
              {filteredAssets.length}
            </span>
          </div>

          <div>
            <input
              type="text"
              placeholder="Cari data..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded border border-slate-300 px-3 py-1 text-sm outline-none"
            />
          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="min-w-full border-collapse">

            <thead>

              <tr className="border-b border-slate-400 bg-[#d8e4f5] text-sm font-semibold text-black">

                <th className="px-4 py-3 text-left">No</th>
                <th className="px-4 py-3 text-left">Nama Aset</th>
                <th className="px-4 py-3 text-left">Kategori</th>
                <th className="px-4 py-3 text-left">Lokasi</th>
                <th className="px-4 py-3 text-center">Jumlah</th>
                <th className="px-4 py-3 text-left">Harga</th>
                <th className="px-4 py-3 text-left">Umur</th>
                <th className="px-4 py-3 text-left">Penyusutan</th>
                <th className="px-4 py-3 text-center">Aksi</th>

              </tr>

            </thead>

            <tbody>

              {filteredAssets.map((item, index) => (

                <tr
                  key={item.id}
                  className="border-b border-slate-300 bg-white text-sm hover:bg-slate-50"
                >

                  <td className="px-4 py-3">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3">
                    {item.nama}
                  </td>

                  <td className="px-4 py-3">

                    <span
                      className={`rounded px-2 py-1 text-xs font-bold text-white ${
                        item.kategori === 'Furniture'
                          ? 'bg-cyan-500'
                          : 'bg-sky-500'
                      }`}
                    >
                      {item.kategori}
                    </span>

                  </td>

                  <td className="px-4 py-3">

                    <span className="rounded bg-slate-600 px-2 py-1 text-xs font-semibold text-white">
                      {item.lokasi}
                    </span>

                  </td>

                  <td className="px-4 py-3 text-center">

                    <span className="rounded bg-emerald-600 px-2 py-[2px] text-xs font-bold text-white">
                      {item.jumlah}
                    </span>

                  </td>

                  <td className="px-4 py-3">
                    {formatRupiah(item.harga)}
                  </td>

                  <td className="px-4 py-3">
                    {item.umur}
                  </td>

                  <td className="px-4 py-3">

                    <p className="font-bold text-red-500">
                      {formatRupiah(item.penyusutan)} / unit
                    </p>

                    <p className="text-xs font-semibold text-slate-500">
                      (Total:{' '}
                      {formatRupiah(item.penyusutan * item.jumlah)})
                    </p>

                  </td>

                  {/* AKSI */}
                  <td className="px-4 py-3">

                    <div className="flex items-center justify-center">

                      <button
                        onClick={() => handleEdit(item)}
                        className="rounded-l bg-yellow-400 px-3 py-2 text-sm text-black hover:bg-yellow-500"
                      >
                        ✏
                      </button>

                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-r bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
                      >
                        🗑
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

          <div className="w-full max-w-lg rounded-lg bg-white p-5 shadow-xl">

            <div className="mb-4 flex items-center justify-between">

              <h1 className="text-xl font-bold text-slate-800">
                {isEdit ? 'Edit Aset' : 'Tambah Aset'}
              </h1>

              <button
                onClick={() => setShowModal(false)}
                className="rounded bg-red-100 px-3 py-1 text-red-500"
              >
                ✕
              </button>

            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">

              <input
                type="text"
                name="nama"
                placeholder="Nama aset"
                value={form.nama}
                onChange={handleChange}
                className="rounded border border-slate-300 px-3 py-2 outline-none"
              />

              <select
                name="kategori"
                value={form.kategori}
                onChange={handleChange}
                className="rounded border border-slate-300 px-3 py-2 outline-none"
              >
                <option>Furniture</option>
                <option>Elektronik</option>
              </select>

              <input
                type="text"
                name="lokasi"
                placeholder="Lokasi"
                value={form.lokasi}
                onChange={handleChange}
                className="rounded border border-slate-300 px-3 py-2 outline-none"
              />

              <input
                type="number"
                name="jumlah"
                placeholder="Jumlah"
                value={form.jumlah}
                onChange={handleChange}
                className="rounded border border-slate-300 px-3 py-2 outline-none"
              />

              <input
                type="number"
                name="harga"
                placeholder="Harga"
                value={form.harga}
                onChange={handleChange}
                className="rounded border border-slate-300 px-3 py-2 outline-none"
              />

              <input
                type="text"
                name="umur"
                placeholder="Umur"
                value={form.umur}
                onChange={handleChange}
                className="rounded border border-slate-300 px-3 py-2 outline-none"
              />

              <input
                type="number"
                name="penyusutan"
                placeholder="Penyusutan"
                value={form.penyusutan}
                onChange={handleChange}
                className="rounded border border-slate-300 px-3 py-2 outline-none md:col-span-2"
              />

            </div>

            <div className="mt-5 flex justify-end gap-2">

              <button
                onClick={() => setShowModal(false)}
                className="rounded bg-slate-300 px-4 py-2 text-sm"
              >
                Batal
              </button>

              <button
                onClick={handleSave}
                className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Simpan
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  )
}