import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TransaksiJurnal() {
  const [tanggal, setTanggal] = useState("2026-05-11");
  const [keperluan, setKeperluan] = useState("");

  const [rows, setRows] = useState([
    { akun: "", debit: 0, kredit: 0 },
    { akun: "", debit: 0, kredit: 0 },
    { akun: "", debit: 0, kredit: 0 },
    { akun: "", debit: 0, kredit: 0 },
    { akun: "", debit: 0, kredit: 0 },
  ]);

  // LIST AKUN
  const akunOptions = [
    "Beban Gaji Guru dan Karyawan",
    "Beban Lainnya",
    "Beban Operasional Guru",
    "Kas",
    "Kas di Bank",
    "Pendapatan BOS",
    "Pendapatan Kegiatan",
    "Pendapatan SPP",
    "Pendapatan Tunggakan",
    "Utang Bank",
  ];

  const handleChange = (index, field, value) => {
    const updated = [...rows];

    updated[index][field] =
      field === "akun" ? value : Number(value);

    setRows(updated);
  };

  // TOTAL
  const totalDebit = rows.reduce(
    (acc, item) => acc + Number(item.debit),
    0
  );

  const totalKredit = rows.reduce(
    (acc, item) => acc + Number(item.kredit),
    0
  );

  const isBalanced = totalDebit === totalKredit;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isBalanced) {
      alert("Total debit dan kredit harus seimbang!");
      return;
    }

    console.log({
      tanggal,
      keperluan,
      rows,
    });

    alert("Transaksi berhasil disimpan");
  };

  return (
    <div className="container-fluid p-2 bg-light min-vh-100">
      <h2 className="mb-2">Transaksi Jurnal</h2>

      <form onSubmit={handleSubmit}>
        {/* CARD FORM */}
        <div className="card shadow-sm">
          
          {/* HEADER */}
          <div className="card-header bg-white">
            Form Transaksi
          </div>

          {/* BODY */}
          <div className="card-body">
            
            {/* FORM ATAS */}
            <div className="row mb-3">
              
              {/* TANGGAL */}
              <div className="col-md-6">
                <label className="form-label">
                  Tanggal Transaksi
                </label>

                <input
                  type="date"
                  className="form-control"
                  value={tanggal}
                  onChange={(e) =>
                    setTanggal(e.target.value)
                  }
                />
              </div>

              {/* KEPERLUAN */}
              <div className="col-md-6">
                <label className="form-label">
                  Keperluan
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan keperluan transaksi"
                  value={keperluan}
                  onChange={(e) =>
                    setKeperluan(e.target.value)
                  }
                />
              </div>
            </div>

            {/* HEADER TABEL */}
            <div className="row fw-bold mb-2">
              <div className="col-md-4">
                Akun
              </div>

              <div className="col-md-4">
                Debit
              </div>

              <div className="col-md-4">
                Kredit
              </div>
            </div>

            {/* ROW */}
            {rows.map((row, index) => (
              <div className="row mb-2" key={index}>
                
                {/* AKUN */}
                <div className="col-md-4">
                  <select
                    className="form-select"
                    value={row.akun}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "akun",
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      -- Pilih Akun --
                    </option>

                    {akunOptions.map((akun, i) => (
                      <option
                        key={i}
                        value={akun}
                      >
                        {akun}
                      </option>
                    ))}
                  </select>
                </div>

                {/* DEBIT */}
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    value={row.debit}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "debit",
                        e.target.value
                      )
                    }
                  />
                </div>

                {/* KREDIT */}
                <div className="col-md-4">
                  <input
                    type="number"
                    className="form-control"
                    value={row.kredit}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "kredit",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            ))}

            {/* FOOTER */}
            <div className="border-top pt-3 mt-3 text-end">
              
              {!isBalanced && (
                <p className="text-danger mb-2">
                  * Total debit dan kredit harus
                  seimbang.
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}