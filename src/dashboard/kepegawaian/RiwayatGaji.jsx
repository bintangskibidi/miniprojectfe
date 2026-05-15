import React, { useState } from "react";
import {
  Edit,
  Printer,
  Search,
  Copy,
  FileSpreadsheet,
  FileText,
} from "lucide-react";

const RiwayatGaji = () => {
  const [selectedMonth, setSelectedMonth] = useState("Mei");
  const [selectedYear, setSelectedYear] = useState("2020");

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const years = Array.from(
    { length: 2026 - 2020 + 1 },
    (_, i) => 2020 + i
  );

  const [data] = useState([
    {
      nip: "0",
      nama: "Jamaludin Malik, S.Pd.I, M.Si",
      jabatan: "Kasek",
      unit: "-",
      index: 13,
      gajiPokok: 0,
      tunjanganAnak: 0,
      tunjanganKeluarga: 0,
    },
    {
      nip: "11111",
      nama: "Ajis",
      jabatan: "Guru Matematika",
      unit: "SD",
      index: 10,
      gajiPokok: 2000000,
      tunjanganAnak: 200000,
      tunjanganKeluarga: 150000,
    },
    {
      nip: "1234567800",
      nama: "Rahmat Hidayat",
      jabatan: "Guru Sejarah",
      unit: "-",
      index: 0,
      gajiPokok: 0,
      tunjanganAnak: 0,
      tunjanganKeluarga: 0,
    },
    {
      nip: "1234567801",
      nama: "Lina Marlina",
      jabatan: "Guru Kimia",
      unit: "-",
      index: 0,
      gajiPokok: 0,
      tunjanganAnak: 0,
      tunjanganKeluarga: 0,
    },
  ]);

  const formatRupiah = (angka) => {
    return Number(angka || 0).toLocaleString("id-ID");
  };

  return (
    <div className="bg-[#f1f1f1] min-h-screen p-2">
      {/* FILTER */}
      <div className="bg-white border border-gray-300 rounded-sm p-3 mb-3">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex gap-2">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 px-3 py-1 text-sm rounded-sm"
            >
              {months.map((month) => (
                <option key={month}>{month}</option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border border-gray-300 px-3 py-1 text-sm rounded-sm"
            >
              {years.map((year) => (
                <option key={year}>{year}</option>
              ))}
            </select>

            <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1 rounded-sm">
              Filter
            </button>
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-2">
            <span className="text-sm">Cari:</span>

            <div className="relative">
              <Search
                size={14}
                className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                className="border border-gray-300 pl-7 pr-2 py-1 text-sm rounded-sm outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <div className="flex gap-1 mb-3 flex-wrap">
        <button className="flex items-center gap-1 border border-gray-300 bg-white hover:bg-gray-100 px-3 py-1 text-sm">
          <Copy size={14} />
          Salin
        </button>

        <button className="flex items-center gap-1 border border-green-600 text-green-700 bg-white hover:bg-green-50 px-3 py-1 text-sm">
          <FileSpreadsheet size={14} />
          CSV
        </button>

        <button className="flex items-center gap-1 border border-blue-600 text-blue-700 bg-white hover:bg-blue-50 px-3 py-1 text-sm">
          <FileSpreadsheet size={14} />
          Excel
        </button>

        <button className="flex items-center gap-1 border border-red-600 text-red-700 bg-white hover:bg-red-50 px-3 py-1 text-sm">
          <FileText size={14} />
          PDF
        </button>

        <button className="flex items-center gap-1 border border-gray-300 bg-white hover:bg-gray-100 px-3 py-1 text-sm">
          <Printer size={14} />
          Print
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-auto border border-gray-300 bg-white">
        <table className="w-full min-w-[2500px] border-collapse text-[11px]">
          <thead>
            {/* ROW 1 */}
            <tr>
              <th
                rowSpan={2}
                className="border border-gray-300 bg-white px-2 py-3 text-left font-bold min-w-[90px]"
              >
                NIP
              </th>

              <th
                rowSpan={2}
                className="border border-gray-300 bg-white px-2 py-3 text-left font-bold min-w-[180px]"
              >
                Nama
              </th>

              <th
                rowSpan={2}
                className="border border-gray-300 bg-white px-2 py-3 text-left font-bold min-w-[130px]"
              >
                Jabatan
              </th>

              <th
                rowSpan={2}
                className="border border-gray-300 bg-white px-2 py-3 text-left font-bold min-w-[70px]"
              >
                Unit
              </th>

              <th
                rowSpan={2}
                className="border border-gray-300 bg-white px-2 py-3 text-left font-bold min-w-[60px]"
              >
                Index
              </th>

              {/* HIJAU */}
              <th
                colSpan={8}
                className="bg-[#198754] text-white border border-gray-300 py-2 text-center font-bold"
              >
                Komponen Gaji
              </th>

              {/* KUNING */}
              <th
                colSpan={7}
                className="bg-[#ffc107] text-black border border-gray-300 py-2 text-center font-bold"
              >
                Kriteria Kehadiran
              </th>

              <th
                rowSpan={2}
                className="border border-gray-300 bg-white px-2 py-3 text-left font-bold min-w-[90px]"
              >
                Total
              </th>

              <th
                rowSpan={2}
                className="border border-gray-300 bg-white px-2 py-3 text-left font-bold min-w-[80px]"
              >
                Aksi
              </th>
            </tr>

            {/* ROW 2 */}
            <tr>
              {[
                "Bon Gaji November",
                "Gaji Pokok",
                "Gaji Pokok (Kepsek)",
                "Potongan Admin",
                "Tunjangan Anak",
                "Tunjangan Keluarga",
                "Tunjangan Koperasi",
                "Tunjangan Pasangan",
              ].map((item, index) => (
                <th
                  key={index}
                  className="bg-[#198754] text-white border border-gray-300 px-2 py-2 text-left font-bold min-w-[110px]"
                >
                  {item}
                </th>
              ))}

              {[
                "Izin Pribadi",
                "Izin Pribadi",
                "Potongan UKK",
                "Terlambat",
                "Uang Makan Harian",
                "Uang Makan Transport",
                "UKK Tendik",
              ].map((item, index) => (
                <th
                  key={index}
                  className="bg-[#ffc107] text-black border border-gray-300 px-2 py-2 text-left font-bold min-w-[110px]"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data.map((row, index) => {
              const total =
                Number(row.gajiPokok) +
                Number(row.tunjanganAnak) +
                Number(row.tunjanganKeluarga);

              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-2">
                    {row.nip}
                  </td>

                  <td className="border border-gray-300 px-2 py-2 leading-5">
                    {row.nama}
                  </td>

                  <td className="border border-gray-300 px-2 py-2">
                    {row.jabatan}
                  </td>

                  <td className="border border-gray-300 px-2 py-2 text-center">
                    {row.unit}
                  </td>

                  <td className="border border-gray-300 px-2 py-2 text-center">
                    {row.index}
                  </td>

                  {/* KOMPONEN */}
                  <td className="border border-gray-300 px-2 py-2 text-center">
                    -
                  </td>

                  <td className="border border-gray-300 px-2 py-2">
                    Rp {formatRupiah(row.gajiPokok)}
                  </td>

                  <td className="border border-gray-300 px-2 py-2 text-center">
                    -
                  </td>

                  <td className="border border-gray-300 px-2 py-2 text-center">
                    -
                  </td>

                  <td className="border border-gray-300 px-2 py-2">
                    Rp {formatRupiah(row.tunjanganAnak)}
                  </td>

                  <td className="border border-gray-300 px-2 py-2">
                    Rp {formatRupiah(row.tunjanganKeluarga)}
                  </td>

                  {[...Array(9)].map((_, i) => (
                    <td
                      key={i}
                      className="border border-gray-300 px-2 py-2 text-center"
                    >
                      -
                    </td>
                  ))}

                  {/* TOTAL */}
                  <td className="border border-gray-300 px-2 py-2 font-semibold">
                    Rp {formatRupiah(total)}
                  </td>

                  {/* AKSI */}
                  <td className="border border-gray-300 px-2 py-2">
                    <div className="flex justify-center gap-1">
                      <button className="bg-yellow-400 hover:bg-yellow-500 p-1 rounded-sm">
                        <Edit size={14} />
                      </button>

                      <button className="bg-green-600 hover:bg-green-700 text-white p-1 rounded-sm">
                        <Printer size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiwayatGaji;