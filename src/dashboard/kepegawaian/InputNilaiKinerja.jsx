import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function InputNilaiKerja() {
  const [dataGuru] = useState([
    {
      id: 1,
      nama: "Agus Santoso",
      kehadiran: "Relasi Kehadiran",
      kedisiplinan: "4343",
      prestasi: "24314",
      kepemimpinan: "222",
      literasi: "222",
      keterampilan: "221,98",
    },
    {
      id: 2,
      nama: "Ajis",
      kehadiran: "Relasi Kehadiran",
      kedisiplinan: "",
      prestasi: "",
      kepemimpinan: "",
      literasi: "",
      keterampilan: "",
    },
    {
      id: 3,
      nama: "Bayu Aji lesmana eka putra",
      kehadiran: "Relasi Kehadiran",
      kedisiplinan: "",
      prestasi: "",
      kepemimpinan: "",
      literasi: "",
      keterampilan: "",
    },
    {
      id: 4,
      nama: "Eka Prasetyo",
      kehadiran: "Relasi Kehadiran",
      kedisiplinan: "",
      prestasi: "",
      kepemimpinan: "",
      literasi: "",
      keterampilan: "",
    },
    {
      id: 5,
      nama: "Fitriani",
      kehadiran: "Relasi Kehadiran",
      kedisiplinan: "",
      prestasi: "",
      kepemimpinan: "",
      literasi: "",
      keterampilan: "",
    },
  ]);

  const handleSave = (nama) => {
    MySwal.fire({
      title: "Simpan Nilai?",
      text: `Nilai kerja ${nama} akan disimpan`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Simpan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#2563eb",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "Berhasil",
          text: "Data berhasil disimpan",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="bg-[#f3f4f6] min-h-screen rounded overflow-hidden p-2">
      <div className="bg-white border border-gray-300 overflow-hidden">
        
        {/* HEADER */}
        <div className="bg-[#1f6feb] px-4 py-3 flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-white text-[11px] font-normal">
            Kinerja Guru
          </h1>

          <div className="flex flex-col gap-2 w-full md:w-[310px] mt-3 md:mt-0">
            <select className="h-10 px-3 border border-gray-300 rounded text-sm bg-white text-black outline-none">
  <option>Guru</option>
  <option>Pegawai</option>
  <option>Staff</option>
</select>

            <select className="h-10 px-3 border border-gray-300 rounded text-sm bg-white text-black outline-none">
              <option>May</option>
            </select>

            <select className="h-10 px-3 border border-gray-300 rounded text-sm bg-white text-black outline-none">
              <option>2026</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-[#d9e6f7]">
                <th
                  rowSpan="2"
                  className="border border-gray-300 px-2 py-2 text-center w-[50px]"
                >
                  No
                </th>

                <th
                  rowSpan="2"
                  className="border border-gray-300 px-2 py-2 min-w-[180px]"
                >
                  Nama Guru
                </th>

                <th
                  colSpan="6"
                  className="border border-gray-300 px-2 py-2 text-center font-bold"
                >
                  Indikator Kinerja
                </th>

                <th
                  rowSpan="2"
                  className="border border-gray-300 px-2 py-2 text-center w-[100px]"
                >
                  Aksi
                </th>
              </tr>

              <tr className="bg-[#d9e6f7]">
                <th className="border border-gray-300 px-2 py-2 min-w-[120px]">
                  Kehadiran
                </th>

                <th className="border border-gray-300 px-2 py-2 min-w-[120px]">
                  Kedisiplinan
                </th>

                <th className="border border-gray-300 px-2 py-2 min-w-[120px]">
                  Prestasi
                </th>

                <th className="border border-gray-300 px-2 py-2 min-w-[120px]">
                  Kepemimpinan
                </th>

                <th className="border border-gray-300 px-2 py-2 min-w-[120px]">
                  Literasi Digital
                </th>

                <th className="border border-gray-300 px-2 py-2 min-w-[120px]">
                  Keterampilan
                </th>
              </tr>
            </thead>

            <tbody>
              {dataGuru.map((guru, index) => (
                <tr key={guru.id} className="bg-[#f8f8f8]">
                  <td className="border border-gray-300 px-2 py-3 text-center align-top">
                    {index + 1}
                  </td>

                  <td className="border border-gray-300 px-2 py-3 align-top">
                    {guru.nama}
                  </td>

                  {/* Kehadiran */}
                  <td className="border border-gray-300 px-2 py-3 text-gray-600">
                    {guru.kehadiran}
                  </td>

                  {/* INPUT */}
                  {[
                    "kedisiplinan",
                    "prestasi",
                    "kepemimpinan",
                    "literasi",
                    "keterampilan",
                  ].map((field) => (
                    <td
                      key={field}
                      className="border border-gray-300 px-1 py-2"
                    >
                      <input
                        type="text"
                        defaultValue={guru[field]}
                        className="
                          w-full
                          h-8
                          border
                          border-gray-300
                          rounded
                          px-2
                          text-sm
                          bg-white
                          outline-none
                          focus:border-blue-500
                        "
                      />
                    </td>
                  ))}

                  {/* BUTTON */}
                  <td className="border border-gray-300 px-2 py-2">
                    <button
                      onClick={() => handleSave(guru.nama)}
                      className="
                        bg-[#1565ff]
                        hover:bg-blue-700
                        text-white
                        w-full
                        rounded
                        py-2
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-1
                        transition
                      "
                    >
                      <FaSave className="text-[12px]" />

                      <span className="text-sm">Simpan</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}