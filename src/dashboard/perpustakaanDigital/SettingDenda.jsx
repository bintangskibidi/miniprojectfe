import React, { useState } from "react";
import Swal from "sweetalert2";

export default function SettingDenda() {
  const [denda, setDenda] = useState("1000");

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: `Tarif denda Rp ${denda} berhasil disimpan`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-start pt-10">
      <div className="bg-white w-[340px] rounded-lg shadow-md p-5">
        {/* TITLE */}
        <h1 className="text-[20px] font-bold text-slate-800 mb-4">
          Setting Tarif Denda Per Hari
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          {/* LABEL */}
          <label className="block text-[14px] font-semibold text-black mb-2">
            Tarif Denda Per Hari (Rp)
          </label>

          {/* INPUT */}
          <input
            type="number"
            value={denda}
            onChange={(e) => setDenda(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* TEXT */}
          <p className="text-[11px] text-gray-500 mt-2">
            Masukkan nilai dalam Rupiah, contoh: 2000
          </p>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
}