import React from "react";

export default function RealisasiAnggaran() {
  const data = [
    {
      kode: "4001",
      nama: "Pendapatan SPP",
      jenis: "PENDAPATAN",
      pagu: 20000000,
      bulan: {
        juli: 4351000,
        agustus: 0,
        september: 150000,
        oktober: 700000,
        november: 4160000,
        desember: 730000,
        januari: 0,
        februari: 0,
        maret: 0,
        april: 0,
        mei: 0,
        juni: 0,
      },
    },
    {
      kode: "4004",
      nama: "Pendapatan Wakaf",
      jenis: "PENDAPATAN",
      pagu: 30000000,
      bulan: {
        juli: 0,
        agustus: 0,
        september: 0,
        oktober: 2000000,
        november: 0,
        desember: 37000000,
        januari: 12121,
        februari: 0,
        maret: 0,
        april: 0,
        mei: 0,
        juni: 0,
      },
    },
    {
      kode: "5004",
      nama: "Beban Operasional",
      jenis: "BELANJA",
      pagu: 30000000,
      bulan: {
        juli: 0,
        agustus: 0,
        september: 0,
        oktober: 0,
        november: 0,
        desember: 2500000,
        januari: 0,
        februari: 0,
        maret: 0,
        april: 0,
        mei: 0,
        juni: 0,
      },
    },
  ];

  const bulanList = [
    "juli",
    "agustus",
    "september",
    "oktober",
    "november",
    "desember",
    "januari",
    "februari",
    "maret",
    "april",
    "mei",
    "juni",
  ];

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  const hitungTotal = (bulan) => {
    return data.reduce((acc, item) => acc + item.bulan[bulan], 0);
  };

  const totalKeseluruhan = data.reduce((acc, item) => {
    return (
      acc +
      bulanList.reduce((a, b) => a + item.bulan[b], 0)
    );
  }, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">
            Realisasi Anggaran Per Bulan Tahun 2025/2026
          </h1>
        </div>

        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border p-2">#</th>
              <th className="border p-2">Kode Akun</th>
              <th className="border p-2">Nama Akun</th>
              <th className="border p-2">Pagu</th>

              {bulanList.map((bulan) => (
                <th key={bulan} className="border p-2 capitalize">
                  {bulan}
                </th>
              ))}

              <th className="border p-2">Total Realisasi</th>
              <th className="border p-2">Sisa Anggaran</th>
              <th className="border p-2">%</th>
            </tr>
          </thead>

          <tbody>
            {["PENDAPATAN", "BELANJA"].map((kategori) => (
              <React.Fragment key={kategori}>
                <tr className="bg-gray-300 font-bold">
                  <td
                    colSpan={18}
                    className="border p-2 text-left"
                  >
                    {kategori}
                  </td>
                </tr>

                {data
                  .filter((item) => item.jenis === kategori)
                  .map((item, index) => {
                    const total = bulanList.reduce(
                      (acc, bulan) => acc + item.bulan[bulan],
                      0
                    );

                    const sisa = item.pagu - total;

                    const persen = (
                      (total / item.pagu) *
                      100
                    ).toFixed(2);

                    return (
                      <tr
                        key={item.kode}
                        className="hover:bg-gray-50"
                      >
                        <td className="border p-2 text-center">
                          {index + 1}
                        </td>

                        <td className="border p-2">
                          {item.kode}
                        </td>

                        <td className="border p-2">
                          {item.nama}
                        </td>

                        <td className="border p-2 text-right">
                          {formatRupiah(item.pagu)}
                        </td>

                        {bulanList.map((bulan) => (
                          <td
                            key={bulan}
                            className="border p-2 text-right"
                          >
                            {formatRupiah(
                              item.bulan[bulan]
                            )}
                          </td>
                        ))}

                        <td className="border p-2 text-right font-semibold">
                          {formatRupiah(total)}
                        </td>

                        <td className="border p-2 text-right">
                          {formatRupiah(sisa)}
                        </td>

                        <td className="border p-2 text-center">
                          {persen}%
                        </td>
                      </tr>
                    );
                  })}
              </React.Fragment>
            ))}

            {/* TOTAL */}
            <tr className="bg-blue-200 font-bold">
              <td
                colSpan={4}
                className="border p-2 text-center"
              >
                TOTAL KESELURUHAN
              </td>

              {bulanList.map((bulan) => (
                <td
                  key={bulan}
                  className="border p-2 text-right"
                >
                  {formatRupiah(hitungTotal(bulan))}
                </td>
              ))}

              <td className="border p-2 text-right">
                {formatRupiah(totalKeseluruhan)}
              </td>

              <td className="border p-2 text-right">
                -
              </td>

              <td className="border p-2 text-center">
                64.50%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}