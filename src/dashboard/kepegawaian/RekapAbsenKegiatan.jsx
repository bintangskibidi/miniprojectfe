import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  LayoutList,
  Filter,
  RotateCcw,
  Calendar,
  CheckCircle2,
  Mail,
  XCircle,
  Eye,
  Printer,
} from "lucide-react";

const MySwal = withReactContent(Swal);

const RekapAbsensiKegiatan = () => {
  // =========================
  // DATA DUMMY
  // =========================
  const dataRekap = [
    {
      id: 1,
      nama: "Seminar",
      tanggal: "06 Nov 2025",
      lokasi: "Sekolah",
      total: 15,
      hadir: 0,
      izin: 15,
      sakit: 0,
      alpha: 0,
      persen: "0%",
      deskripsi: "Seminar pendidikan nasional",
    },
    {
      id: 2,
      nama: "Workshop",
      tanggal: "03 Sep 2025",
      lokasi: "Sekolah",
      total: 20,
      hadir: 15,
      izin: 2,
      sakit: 1,
      alpha: 2,
      persen: "75%",
      deskripsi: "Workshop pengembangan guru",
    },
  ];

  // =========================
  // STATS
  // =========================
  const stats = [
    {
      label: "Total Kegiatan",
      value: "2",
      icon: <Calendar size={32} />,
      color: "bg-blue-600",
    },
    {
      label: "Total Hadir",
      value: "15",
      icon: <CheckCircle2 size={32} />,
      color: "bg-green-700",
    },
    {
      label: "Total Izin",
      value: "17",
      icon: <Mail size={32} />,
      color: "bg-yellow-500",
    },
    {
      label: "Total Alpha",
      value: "2",
      icon: <XCircle size={32} />,
      color: "bg-red-500",
    },
  ];

  // =========================
  // SHOW DETAIL
  // =========================
  const handleShow = (row) => {
    MySwal.fire({
      title: `
        <span style="font-size:22px;font-weight:800;">
          ${row.nama}
        </span>
      `,

      html: `
        <div style="text-align:left;margin-top:20px;">
          
          <div style="margin-bottom:12px;">
            <b>Tanggal :</b><br/>
            <span>${row.tanggal}</span>
          </div>

          <div style="margin-bottom:12px;">
            <b>Lokasi :</b><br/>
            <span>${row.lokasi}</span>
          </div>

          <div style="margin-bottom:12px;">
            <b>Total Peserta :</b><br/>
            <span>${row.total}</span>
          </div>

          <div style="margin-bottom:12px;">
            <b>Hadir :</b><br/>
            <span style="color:green;font-weight:bold;">
              ${row.hadir}
            </span>
          </div>

          <div style="margin-bottom:12px;">
            <b>Izin :</b><br/>
            <span style="color:#eab308;font-weight:bold;">
              ${row.izin}
            </span>
          </div>

          <div style="margin-bottom:12px;">
            <b>Sakit :</b><br/>
            <span style="color:#06b6d4;font-weight:bold;">
              ${row.sakit}
            </span>
          </div>

          <div style="margin-bottom:12px;">
            <b>Alpha :</b><br/>
            <span style="color:red;font-weight:bold;">
              ${row.alpha}
            </span>
          </div>

          <div style="margin-bottom:12px;">
            <b>Persentase Hadir :</b><br/>
            <span style="font-weight:bold;">
              ${row.persen}
            </span>
          </div>

          <div style="margin-bottom:12px;">
            <b>Deskripsi :</b><br/>
            <span>${row.deskripsi}</span>
          </div>

        </div>
      `,

      confirmButtonText: "Tutup",
      confirmButtonColor: "#2563eb",
      width: 600,
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">

        {/* HEADER */}
        <div className="bg-blue-600 p-3 flex items-center gap-2 text-white">
          <LayoutList size={20} />

          <h2 className="font-semibold text-sm md:text-base">
            Rekap Absensi Kegiatan
          </h2>
        </div>

        <div className="p-5">

          {/* FILTER */}
          <div className="flex flex-wrap items-end gap-4 mb-8">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-medium mb-1.5 text-gray-600">
                Filter Kegiatan
              </label>

              <select className="w-full border rounded p-2 text-sm outline-none bg-white">
                <option>Semua Kegiatan</option>
                <option>Seminar</option>
                <option>Workshop</option>
              </select>
            </div>

            <div className="w-full md:w-auto">
              <label className="block text-xs font-medium mb-1.5 text-gray-600">
                Tanggal Mulai
              </label>

              <input
                type="date"
                className="w-full border rounded p-2 text-sm outline-none text-gray-400"
              />
            </div>

            <div className="w-full md:w-auto">
              <label className="block text-xs font-medium mb-1.5 text-gray-600">
                Tanggal Selesai
              </label>

              <input
                type="date"
                className="w-full border rounded p-2 text-sm outline-none text-gray-400"
              />
            </div>

            <button className="bg-blue-600 text-white px-8 py-2 rounded text-sm font-medium flex items-center gap-2 hover:bg-blue-700 transition shadow-sm">
              <Filter size={16} />
              Filter
            </button>

            <button className="bg-gray-500 text-white px-8 py-2 rounded text-sm font-medium flex items-center gap-2 hover:bg-gray-600 transition shadow-sm">
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          {/* STAT */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((item, idx) => (
              <div
                key={idx}
                className={`${item.color} rounded-xl p-5 text-white flex justify-between items-center shadow-lg relative overflow-hidden`}
              >
                <div className="z-10">
                  <p className="text-base font-medium opacity-90 mb-1">
                    {item.label}
                  </p>

                  <p className="text-3xl font-bold">
                    {item.value}
                  </p>
                </div>

                <div className="opacity-30 absolute right-4 top-1/2 -translate-y-1/2">
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto border rounded-lg shadow-sm">
            <table className="w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white divide-x divide-blue-400">
                  <th className="p-3 text-center w-12 font-medium">
                    No
                  </th>

                  <th className="p-3 font-medium">
                    Nama Kegiatan
                  </th>

                  <th className="p-3 font-medium">
                    Tanggal
                  </th>

                  <th className="p-3 font-medium text-center">
                    Lokasi
                  </th>

                  <th className="p-3 font-medium text-center">
                    Total
                  </th>

                  <th className="p-3 font-medium text-center">
                    Hadir
                  </th>

                  <th className="p-3 font-medium text-center">
                    Izin
                  </th>

                  <th className="p-3 font-medium text-center">
                    Sakit
                  </th>

                  <th className="p-3 font-medium text-center">
                    Alpha
                  </th>

                  <th className="p-3 font-medium text-center">
                    % Hadir
                  </th>

                  <th className="p-3 font-medium text-center">
                    Aksi
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {dataRekap.map((row, index) => (
                  <tr
                    key={row.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3 text-center border-r bg-gray-50/30">
                      {index + 1}
                    </td>

                    <td className="p-3 font-bold border-r text-gray-800">
                      {row.nama}
                    </td>

                    <td className="p-3 border-r whitespace-nowrap text-gray-600">
                      {row.tanggal}
                    </td>

                    <td className="p-3 border-r text-center text-gray-600">
                      {row.lokasi}
                    </td>

                    <td className="p-3 border-r text-center">
                      <span className="bg-blue-600 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm">
                        {row.total}
                      </span>
                    </td>

                    <td className="p-3 border-r text-center text-green-700 font-bold">
                      {row.hadir}
                    </td>

                    <td className="p-3 border-r text-center">
                      {row.izin > 0 ? (
                        <span className="bg-yellow-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm">
                          {row.izin}
                        </span>
                      ) : (
                        <span className="text-yellow-600 font-bold">
                          0
                        </span>
                      )}
                    </td>

                    <td className="p-3 border-r text-center">
                      <span className="bg-cyan-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm">
                        {row.sakit}
                      </span>
                    </td>

                    <td className="p-3 border-r text-center">
                      <span className="bg-red-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm">
                        {row.alpha}
                      </span>
                    </td>

                    <td className="p-3 border-r text-center text-red-600 font-bold">
                      {row.persen}
                    </td>

                    {/* AKSI */}
                    <td className="p-3">
                      <div className="flex justify-center gap-1.5">

                        {/* SHOW */}
                        <button
                          onClick={() => handleShow(row)}
                          className="p-2 bg-cyan-400 text-white rounded hover:bg-cyan-500 transition shadow-sm"
                        >
                          <Eye size={14} />
                        </button>

                        {/* PRINT */}
                        <button className="p-2 bg-green-700 text-white rounded hover:bg-green-800 transition shadow-sm">
                          <Printer size={14} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RekapAbsensiKegiatan;