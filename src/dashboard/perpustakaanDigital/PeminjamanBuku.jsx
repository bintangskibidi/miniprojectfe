import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function PeminjamanBuku() {
  const [barcode, setBarcode] = useState("");
  const [bukuList, setBukuList] = useState([]);
  const [peminjam, setPeminjam] = useState(null);
  const [tglPinjam, setTglPinjam] = useState(new Date());
  const [tglKembali, setTglKembali] = useState(new Date());

  // ===============================
  // HANDLE SCAN
  // ===============================
  const handleScan = async (code) => {
    if (!code) return;

    setBarcode(code);

    try {
      // GANTI DENGAN API KAMU
      const res = await fetch(`/api/buku/${code}`);
      const data = await res.json();

      setBukuList((prev) => [...prev, data]);
    } catch (err) {
      console.log("Buku tidak ditemukan");
    }
  };

  // ===============================
  // CARI SISWA
  // ===============================
  const cariSiswa = async (keyword) => {
    if (!keyword) return;

    try {
      const res = await fetch(`/api/siswa?q=${keyword}`);
      const data = await res.json();

      setPeminjam(data[0]);
    } catch (err) {
      console.log("Siswa tidak ditemukan");
    }
  };

  // ===============================
  // RESET
  // ===============================
  const reset = () => {
    setBarcode("");
    setBukuList([]);
    setPeminjam(null);
  };

  // ===============================
  // SIMPAN
  // ===============================
  const simpan = async () => {
    const payload = {
      peminjam,
      buku: bukuList,
      tglPinjam,
      tglKembali,
    };

    try {
      await fetch("/api/peminjaman", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      alert("Berhasil simpan!");
      reset();
    } catch (err) {
      alert("Gagal simpan");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {/* ================= LEFT ================= */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">🔍 Pencarian</h2>

        {/* SCAN */}
        <div className="border border-green-400 p-3 rounded mb-3">
          <p className="text-sm mb-2">Scan Barcode Buku</p>

          <input
            type="text"
            placeholder="Scan barcode di sini..."
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleScan(barcode);
              }
            }}
            className="w-full border px-3 py-2 rounded"
          />

          <p className="text-xs text-gray-500 mt-1">
            Scanner akan membaca otomatis
          </p>
        </div>

        {/* OPTIONAL CAMERA SCANNER */}
        <BarcodeScannerComponent
          width={300}
          height={200}
          onUpdate={(err, result) => {
            if (result) handleScan(result.text);
          }}
        />

        {/* CARI BUKU */}
        <input
          type="text"
          placeholder="Ketik judul atau ISBN..."
          className="w-full border px-3 py-2 rounded mt-3"
        />

        {/* CARI SISWA */}
        <div className="flex gap-2 mt-3">
          <input
            type="text"
            placeholder="Ketik NIS/ID atau nama..."
            onChange={(e) => cariSiswa(e.target.value)}
            className="flex-1 border px-3 py-2 rounded"
          />
          <button className="bg-blue-500 text-white px-3 rounded">
            🔍
          </button>
        </div>

        {/* RESET */}
        <button
          onClick={reset}
          className="w-full mt-3 border border-red-400 text-red-500 py-2 rounded"
        >
          Reset Semua
        </button>
      </div>

      {/* ================= RIGHT ================= */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">📋 Detail Peminjaman</h2>

        {/* PEMINJAM */}
        <div className="bg-blue-100 p-2 rounded mb-3">
          {peminjam ? (
            <p>{peminjam.nama}</p>
          ) : (
            <p className="text-sm">Belum ada peminjam</p>
          )}
        </div>

        {/* BUKU */}
        <div className="border p-3 rounded mb-3">
          <p className="mb-2">Buku yang Dipinjam ({bukuList.length})</p>

          {bukuList.length === 0 ? (
            <p className="text-sm text-gray-500">
              Belum ada buku ditambahkan
            </p>
          ) : (
            bukuList.map((buku, i) => (
              <div
                key={i}
                className="border p-2 rounded mb-2 flex justify-between"
              >
                <span>{buku.judul}</span>
                <button
                  onClick={() =>
                    setBukuList(bukuList.filter((_, idx) => idx !== i))
                  }
                  className="text-red-500"
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </div>

        {/* RINGKASAN */}
        <div className="bg-yellow-100 p-3 rounded mb-3">
          <p>Total Buku: {bukuList.length}</p>
          <p>Total Item: {bukuList.length}</p>
        </div>

        {/* TANGGAL */}
        <div className="flex gap-2 mb-3">
          <DatePicker
            selected={tglPinjam}
            onChange={(date) => setTglPinjam(date)}
            className="border px-2 py-1 rounded w-full"
          />
          <DatePicker
            selected={tglKembali}
            onChange={(date) => setTglKembali(date)}
            className="border px-2 py-1 rounded w-full"
          />
        </div>

        {/* SIMPAN */}
        <button
          onClick={simpan}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Simpan Peminjaman
        </button>
      </div>
    </div>
  );
}