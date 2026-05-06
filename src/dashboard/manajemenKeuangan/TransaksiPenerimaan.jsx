 import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TransaksiPenerimaan() {
  const [form, setForm] = useState({
    jenis: "",
    nominal: "",
    sumber: "",
    menyetujui: "",
    tanggal: "",
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
    <div className="container mt-3">
      <h2 className="mb-4">Transaksi Penerimaan</h2>

      <div className="card shadow-sm">
        <div className="card-header bg-white fw-semibold">
          Form Tambah Transaksi Penerimaan
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* KIRI */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Jenis Penerimaan</label>

                  <select
                    className="form-select"
                    name="jenis"
                    onChange={handleChange}
                  >
                    <option value="">
                      -- Pilih Jenis Penerimaan --
                    </option>
                    <option value="SPP">SPP</option>
                    <option value="Donasi">Donasi</option>
                    <option value="BOS">Dana BOS</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Sumber</label>

                  <input
                    type="text"
                    className="form-control"
                    name="sumber"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Tanggal Penerimaan
                  </label>

                  <input
                    type="date"
                    className="form-control"
                    name="tanggal"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* KANAN */}
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Nominal</label>

                  <input
                    type="number"
                    className="form-control"
                    name="nominal"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Menyetujui</label>

                  <input
                    type="text"
                    className="form-control"
                    name="menyetujui"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Keterangan</label>

                  <textarea
                    rows="4"
                    className="form-control"
                    name="keterangan"
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="text-end">
                  <button className="btn btn-success">
                    💾 Simpan
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}