import React, { useState } from "react";

export default function TransaksiPengeluaran() {
  const [form, setForm] = useState({
    jenis: "",
    tanggal: "",
    bidang: "",
    nominal: "",
    penerima: "",
    menyetujui: "",
    sumber: "",
    keterangan: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);

    alert("Data berhasil disimpan");
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white border rounded shadow-sm">
        
        {/* Header */}
        <div className="border-b px-4 py-3">
          <h1 className="text-2xl font-semibold">
            Transaksi Pengeluaran
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          
          <div className="border rounded">
            
            {/* Judul Form */}
            <div className="border-b px-3 py-2 bg-gray-50 font-medium">
              Form Tambah Transaksi Pengeluaran
            </div>

            <div className="p-4 grid grid-cols-2 gap-4">
              
              {/* Jenis Pengeluaran */}
              <div>
                <label className="block text-sm mb-1">
                  Jenis Pengeluaran
                </label>

                <select
                  name="jenis"
                  value={form.jenis}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">
                    -- Pilih Jenis Pengeluaran --
                  </option>

                  <option value="gaji">Gaji</option>
                  <option value="atk">ATK</option>
                  <option value="listrik">Listrik</option>
                  <option value="internet">Internet</option>
                </select>
              </div>

              {/* Tanggal */}
              <div>
                <label className="block text-sm mb-1">
                  Tanggal Pengeluaran
                </label>

                <input
                  type="date"
                  name="tanggal"
                  value={form.tanggal}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Bidang */}
              <div>
                <label className="block text-sm mb-1">
                  Bidang / Divisi
                </label>

                <input
                  type="text"
                  name="bidang"
                  value={form.bidang}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Nominal */}
              <div>
                <label className="block text-sm mb-1">
                  Nominal
                </label>

                <input
                  type="number"
                  name="nominal"
                  value={form.nominal}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Penerima */}
              <div>
                <label className="block text-sm mb-1">
                  Penerima
                </label>

                <input
                  type="text"
                  name="penerima"
                  value={form.penerima}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Menyetujui */}
              <div>
                <label className="block text-sm mb-1">
                  Menyetujui
                </label>

                <input
                  type="text"
                  name="menyetujui"
                  value={form.menyetujui}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Sumber */}
              <div>
                <label className="block text-sm mb-1">
                  Sumber
                </label>

                <input
                  type="text"
                  name="sumber"
                  value={form.sumber}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>

              {/* Keterangan */}
              <div>
                <label className="block text-sm mb-1">
                  Keterangan
                </label>

                <textarea
                  name="keterangan"
                  value={form.keterangan}
                  onChange={handleChange}
                  rows="3"
                  className="w-full border rounded px-3 py-2 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-end px-4 pb-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}