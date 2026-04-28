import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function LaporanBukuBesar() {
  const [tglAwal, setTglAwal] = useState(null);
  const [tglAkhir, setTglAkhir] = useState(null);

  return (
    <div className="p-6">
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-4">
        Buku Besar Keuangan - Ringkasan
      </h2>

      {/* Card */}
      <div className="bg-white rounded shadow border">
        
        {/* Header biru */}
        <div className="bg-blue-600 text-white px-4 py-2 rounded-t">
          Filter Periode
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex flex-wrap gap-4 items-end">
            
            {/* Tanggal Awal */}
            <div>
              <label className="block text-sm mb-1">Tanggal Awal</label>
              <DatePicker
                selected={tglAwal}
                onChange={(date) => setTglAwal(date)}
                className="border rounded px-3 py-2 w-[180px]"
                dateFormat="dd/MM/yyyy"
                placeholderText="Pilih tanggal"
              />
            </div>

            {/* Tanggal Akhir */}
            <div>
              <label className="block text-sm mb-1">Tanggal Akhir</label>
              <DatePicker
                selected={tglAkhir}
                onChange={(date) => setTglAkhir(date)}
                className="border rounded px-3 py-2 w-[180px]"
                dateFormat="dd/MM/yyyy"
                placeholderText="Pilih tanggal"
              />
            </div>

            {/* Button */}
            <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded">
              Tampilkan
            </button>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <p className="text-center text-gray-500 mt-10">
        Tidak ada data jurnal untuk periode ini.
      </p>
    </div>
  );
}