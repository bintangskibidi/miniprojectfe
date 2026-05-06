import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function TransaksiJurnal() {
  const [tanggal, setTanggal] = useState("2026-06-05");
  const [keperluan, setKeperluan] = useState("");

  const [rows, setRows] = useState([
    { akun: "", debit: 0, kredit: 0 },
    { akun: "", debit: 0, kredit: 0 },
    { akun: "", debit: 0, kredit: 0 },
    { akun: "", debit: 0, kredit: 0 },
    { akun: "", debit: 0, kredit: 0 },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...rows];

    updated[index][field] =
      field === "akun" ? value : Number(value);

    setRows(updated);
  };

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
    <div className="container-fluid p-3">
      <h2 className="mb-3">Transaksi Jurnal</h2>

      <form onSubmit={handleSubmit}>
        {/* FORM ATAS */}
        <div className="card mb-3 shadow-sm">
          <div className="card-header bg-white fs-4">
            Form Transaksi
          </div>

          <div className="card-body">
            <div className="row">
              {/* TANGGAL */}
              <div className="col-md-6 mb-3">
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
              <div className="col-md-6 mb-3">
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
          </div>
        </div>

        {/* TABEL JURNAL */}
        <div className="card shadow-sm">
          <div className="card-body">
            {/* HEADER */}
            <div className="row fw-bold mb-2">
              <div className="col-md-4">Akun</div>
              <div className="col-md-4">Debit</div>
              <div className="col-md-4">Kredit</div>
            </div>

            {/* ROW DATA */}
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

                    <option value="Kas">Kas</option>
                    <option value="Bank">Bank</option>
                    <option value="Pendapatan">
                      Pendapatan
                    </option>
                    <option value="Beban">
                      Beban
                    </option>
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

            {/* TOTAL */}
            <div className="mt-4 text-end">
              <h5>
                Total Debit :{" "}
                <span className="text-primary">
                  {totalDebit}
                </span>
              </h5>

              <h5>
                Total Kredit :{" "}
                <span className="text-success">
                  {totalKredit}
                </span>
              </h5>

              {!isBalanced && (
                <p className="text-danger fw-semibold">
                  * Total debit dan kredit harus
                  seimbang.
                </p>
              )}

              <button
                type="submit"
                className="btn btn-primary px-4"
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