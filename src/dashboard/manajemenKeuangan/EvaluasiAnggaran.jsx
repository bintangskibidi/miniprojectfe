import React from "react";

export default function EvaluasiAnggaran() {
  const data = [
    {
      kode: "4001",
      nama: "Pendapatan SPP",
      kelompok: "Pendapatan",
      jenis: "PENDAPATAN",
      pagu: 20000000,
      q1: 4501000,
      q2: 5590000,
      q3: 0,
      q4: 0,
    },
    {
      kode: "4004",
      nama: "Pendapatan Wakaf",
      kelompok: "Pendapatan",
      jenis: "PENDAPATAN",
      pagu: 30000000,
      q1: 0,
      q2: 39000000,
      q3: 12121,
      q4: 0,
    },
    {
      kode: "5004",
      nama: "Beban Operasional",
      kelompok: "Belanja",
      jenis: "BELANJA",
      pagu: 30000000,
      q1: 0,
      q2: 2500000,
      q3: 0,
      q4: 0,
    },
  ];

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID").format(value);
  };

  const getTotal = (item) => {
    return item.q1 + item.q2 + item.q3 + item.q4;
  };

  const getPersen = (item) => {
    return ((getTotal(item) / item.pagu) * 100).toFixed(2);
  };

  const getSisa = (item) => {
    return item.pagu - getTotal(item);
  };

  const getForecast = (item) => {
    return Math.round(getTotal(item) * 1.1);
  };

  const totalKeseluruhan = data.reduce(
    (acc, item) => acc + getTotal(item),
    0
  );

  const totalPagu = data.reduce(
    (acc, item) => acc + item.pagu,
    0
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="bg-white border rounded shadow overflow-x-auto">
        <div className="p-3 border-b">
          <h1 className="font-semibold text-lg">
            Evaluasi Anggaran Tahun 2025/2026
          </h1>
        </div>

        <table className="min-w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 text-center">
              <th className="border p-2">#</th>
              <th className="border p-2">Kode Akun</th>
              <th className="border p-2">Nama Akun</th>
              <th className="border p-2">Kelompok</th>
              <th className="border p-2">Pagu</th>
              <th className="border p-2">Q1</th>
              <th className="border p-2">Q2</th>
              <th className="border p-2">Q3</th>
              <th className="border p-2">Q4</th>
              <th className="border p-2">Total Realisasi</th>
              <th className="border p-2">Sisa / Surplus</th>
              <th className="border p-2">Forecast</th>
              <th className="border p-2">%</th>
            </tr>
          </thead>

          <tbody>
            {["PENDAPATAN", "BELANJA"].map((kategori) => (
              <React.Fragment key={kategori}>
                {/* HEADER KATEGORI */}
                <tr className="bg-gray-300 font-bold">
                  <td
                    colSpan={13}
                    className="border p-2"
                  >
                    {kategori}
                  </td>
                </tr>

                {data
                  .filter((item) => item.jenis === kategori)
                  .map((item, index) => {
                    const total = getTotal(item);
                    const sisa = getSisa(item);
                    const persen = getPersen(item);

                    return (
                      <tr
                        key={item.kode}
                        className="hover:bg-gray-50"
                      >
                        <td className="border p-2 text-center">
                          {index + 1}
                        </td>

                        <td className="border p-2 text-center">
                          {item.kode}
                        </td>

                        <td className="border p-2">
                          {item.nama}
                        </td>

                        <td className="border p-2 text-center">
                          {item.kelompok}
                        </td>

                        <td className="border p-2 text-right">
                          {formatRupiah(item.pagu)}
                        </td>

                        <td className="border p-2 text-right">
                          {formatRupiah(item.q1)}
                        </td>

                        <td className="border p-2 text-right">
                          {formatRupiah(item.q2)}
                        </td>

                        <td className="border p-2 text-right">
                          {formatRupiah(item.q3)}
                        </td>

                        <td className="border p-2 text-right">
                          {formatRupiah(item.q4)}
                        </td>

                        <td className="border p-2 text-right font-semibold">
                          {formatRupiah(total)}
                        </td>

                        <td
                          className={`border p-2 text-right font-semibold ${
                            sisa < 0
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {formatRupiah(sisa)}
                        </td>

                        <td className="border p-2 text-right">
                          {formatRupiah(
                            getForecast(item)
                          )}
                        </td>

                        <td className="border p-2 text-center">
                          {persen}%
                        </td>
                      </tr>
                    );
                  })}

                {/* TOTAL PER KATEGORI */}
                <tr className="bg-blue-100 font-bold">
                  <td
                    colSpan={4}
                    className="border p-2 text-center"
                  >
                    TOTAL {kategori}
                  </td>

                  <td className="border p-2 text-right">
                    {formatRupiah(
                      data
                        .filter(
                          (x) => x.jenis === kategori
                        )
                        .reduce(
                          (a, b) => a + b.pagu,
                          0
                        )
                    )}
                  </td>

                  <td
                    colSpan={4}
                    className="border p-2"
                  ></td>

                  <td className="border p-2 text-right">
                    {formatRupiah(
                      data
                        .filter(
                          (x) => x.jenis === kategori
                        )
                        .reduce(
                          (a, b) => a + getTotal(b),
                          0
                        )
                    )}
                  </td>

                  <td
                    className={`border p-2 text-right ${
                      data
                        .filter(
                          (x) => x.jenis === kategori
                        )
                        .reduce(
                          (a, b) => a + getSisa(b),
                          0
                        ) < 0
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {formatRupiah(
                      data
                        .filter(
                          (x) => x.jenis === kategori
                        )
                        .reduce(
                          (a, b) => a + getSisa(b),
                          0
                        )
                    )}
                  </td>

                  <td className="border p-2 text-right">
                    {formatRupiah(
                      data
                        .filter(
                          (x) => x.jenis === kategori
                        )
                        .reduce(
                          (a, b) => a + getForecast(b),
                          0
                        )
                    )}
                  </td>

                  <td className="border p-2 text-center">
                    -
                  </td>
                </tr>
              </React.Fragment>
            ))}

            {/* TOTAL KESELURUHAN */}
            <tr className="bg-gray-200 font-bold">
              <td
                colSpan={4}
                className="border p-2 text-center"
              >
                TOTAL KESELURUHAN
              </td>

              <td className="border p-2 text-right">
                {formatRupiah(totalPagu)}
              </td>

              <td
                colSpan={4}
                className="border p-2"
              ></td>

              <td className="border p-2 text-right">
                {formatRupiah(totalKeseluruhan)}
              </td>

              <td className="border p-2 text-right text-red-600">
                {formatRupiah(
                  totalPagu - totalKeseluruhan
                )}
              </td>

              <td className="border p-2 text-right">
                {formatRupiah(
                  Math.round(totalKeseluruhan * 1.1)
                )}
              </td>

              <td className="border p-2 text-center">
                {(
                  (totalKeseluruhan / totalPagu) *
                  100
                ).toFixed(2)}
                %
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}