import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RekapPerTanggal() {
  const [tglAwal, setTglAwal] = useState(null);
  const [tglAkhir, setTglAkhir] = useState(null);
  const [petugas, setPetugas] = useState("");
  const dataPetugas = [
  { id: 1, nama: "Andre Nugroho" },
  { id: 2, nama: "Darren" },
  { id: 3, nama: "Budi Santoso" },
  { id: 4, nama: "Siti Aminah" },
  { id: 5, nama: "Rizky Pratama" },
];

  return (
    <div className="p-6">

      {/* CARD */}
      <div className="bg-white rounded shadow border">

        {/* HEADER (abu-abu) */}
        <div className="bg-gray-100 px-4 py-3 border-b font-semibold">
          Rekap Pertanggal
        </div>

        {/* BODY */}
        <div className="p-4">
          <div className="flex flex-wrap gap-4 items-end">

            {/* Tanggal Awal */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Tanggal Awal</label>
              <DatePicker
                selected={tglAwal}
                onChange={(date) => setTglAwal(date)}
                className="border rounded px-3 py-2 w-[250px]"
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
              />
            </div>

            {/* Tanggal Akhir */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Tanggal Akhir</label>
              <DatePicker
                selected={tglAkhir}
                onChange={(date) => setTglAkhir(date)}
                className="border rounded px-3 py-2 w-[250px]"
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
              />
            </div>
<select
  value={petugas}
  onChange={(e) => setPetugas(e.target.value)}
  className="border p-2 rounded bg-gray-100 focus:bg-white w-[220px]"
>
  <option value="">--SEMUA PETUGAS--</option>
  

  {dataPetugas.map((p) => (
    <option key={p.id} value={p.nama}>
      {p.nama}
    </option>
  ))}
</select>

           
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded h-[42px]">
              Filter
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}