import React, { useState } from "react";
import Swal from "sweetalert2";

const dummySiswa = [
  { id: 1, nama: "dwseaeggedrsg", nis: "3423234234" },
  { id: 2, nama: "Ahmad Fikry", nis: "234396" },
  { id: 3, nama: "Aulia Chelsea", nis: "234399" },
];

const KenaikanKelas = () => {
  const [tahun, setTahun] = useState("");
  const [kelas, setKelas] = useState("");

  const [tahunTujuan, setTahunTujuan] = useState("");

  const [siswa, setSiswa] = useState([]);
  const [selected, setSelected] = useState([]);
  const [kelasBaru, setKelasBaru] = useState([]);

  const handleTampilkan = () => {
    if (!tahun || !kelas) {
      alert("Pilih tahun ajaran dan kelas dulu!");
      return;
    }
    setSiswa(dummySiswa);
  };

  const handleCheck = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleTambah = () => {
    if (selected.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Pilih siswa dulu!",
      });
      return;
    }

    const dataTerpilih = siswa.filter((s) =>
      selected.includes(s.id)
    );

    setKelasBaru([...kelasBaru, ...dataTerpilih]);
    setSelected([]);

    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Siswa berhasil ditambahkan ke kelas baru",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleHapus = (id) => {
    Swal.fire({
      title: "Yakin mau hapus?",
      text: "Data siswa akan dihapus dari kelas baru",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        setKelasBaru(kelasBaru.filter((s) => s.id !== id));

        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          text: "Siswa berhasil dihapus",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleProses = () => {
    if (!tahunTujuan) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Pilih tahun tujuan dulu!",
      });
      return;
    }

    if (kelasBaru.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Belum ada siswa!",
      });
      return;
    }

    Swal.fire({
      title: "Konfirmasi Kenaikan",
      html: `
        <p>Yakin ingin memproses kenaikan kelas untuk <b>${kelasBaru.length} siswa</b>?</p>
        <ul style="text-align:left">
          <li>Tahun Baru: <b>${tahunTujuan}</b></li>
          <li>Kelas Baru: <b>${kelas}</b></li>
        </ul>
        <p style="color:red;">Proses ini tidak dapat dibatalkan!</p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Proses",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // pindahkan data
        setSiswa(kelasBaru);
        setKelasBaru([]);
        setSelected([]);
        setTahun(tahunTujuan);

        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Kenaikan kelas berhasil diproses",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-xl font-semibold mb-4">⬆️ Kenaikan Kelas</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* KIRI */}
        <div className="bg-white border rounded">
          <div className="bg-blue-500 text-white p-2 text-center font-semibold rounded-t">
            Kelas Asal
          </div>

          <div className="p-4 space-y-3">
            <div className="flex gap-2">
              <select
                value={tahun}
                onChange={(e) => setTahun(e.target.value)}
                className="border p-2 w-1/2 rounded"
              >
                <option value="">Pilih Tahun Ajaran</option>
                <option value="2024/2025">2024/2025</option>
                <option value="2025/2026">2025/2026</option>
              </select>

              <select
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="border p-2 w-1/2 rounded"
              >
                <option value="">Pilih Kelas</option>
                <option value="IX A">IX A</option>
                <option value="IX B">IX B</option>
                <option value="Alumni">Alumni</option>
              </select>
            </div>

            <button
              onClick={handleTampilkan}
              disabled={!tahun || !kelas}
              className={`px-4 py-2 rounded text-white ${
                !tahun || !kelas
                  ? "bg-gray-400"
                  : "bg-blue-500"
              }`}
            >
              🔍 Tampilkan Siswa
            </button>

            {siswa.length > 0 && (
              <>
                <table className="w-full border text-sm mt-3">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2"></th>
                      <th className="border p-2 text-left">Nama</th>
                      <th className="border p-2">NIS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {siswa.map((s) => (
                      <tr key={s.id}>
                        <td className="border p-2 text-center">
                          <input
                            type="checkbox"
                            checked={selected.includes(s.id)}
                            onChange={() => handleCheck(s.id)}
                          />
                        </td>
                        <td className="border p-2">{s.nama}</td>
                        <td className="border p-2 text-center">
                          {s.nis}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  onClick={handleTambah}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  ➕ Tambahkan
                </button>
              </>
            )}
          </div>
        </div>

        {/* KANAN */}
        <div className="bg-white border rounded">
          <div className="bg-green-600 text-white p-2 text-center font-semibold rounded-t">
            Kelas Baru
          </div>

   <div className="p-4 space-y-3">
  {/* SELECT MUNCUL HANYA KALAU ADA DATA */}
  {kelasBaru.length > 0 && (
    <select
      value={tahunTujuan}
      onChange={(e) => setTahunTujuan(e.target.value)}
      className="border p-2 py-20 w-full rounded"
    > <br /> <br /> <br /> 
      <option value="">Pilih Tahun Tujuan</option>
      <option value="2025/2026">2025/2026</option>
      <option value="2026/2027">2026/2027</option>
    </select>
  )}

  {kelasBaru.length === 0 ? (
    <div className="bg-blue-100 p-3 rounded">
      Pilih siswa dulu
    </div>
  ) : (
    <>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left">Nama</th>
            <th className="border p-2">NIS</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kelasBaru.map((s) => (
            <tr key={s.id}>
              <td className="border p-2">{s.nama}</td>
              <td className="border p-2 text-center">
                {s.nis}
              </td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleHapus(s.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleProses}
        className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
      >
        ✔ Proses Kenaikan
      </button>
    </>
  )}
</div>
        </div>
      </div>
    </div>
  );
};

export default KenaikanKelas;