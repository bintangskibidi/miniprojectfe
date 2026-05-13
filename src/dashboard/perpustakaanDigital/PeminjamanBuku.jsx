import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import api from "../../utils/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RiSearchLine, RiDeleteBinLine, RiUserAddLine, RiRestartLine, RiPencilLine } from "react-icons/ri";


export default function PeminjamanBuku() {
  const [barcode, setBarcode] = useState("");
  const [searchBuku, setSearchBuku] = useState(""); // State untuk input judul/ISBN manual
  const [searchSiswa, setSearchSiswa] = useState(""); // State untuk input NIS/Nama
  const [bukuList, setBukuList] = useState([]);
  const [peminjam, setPeminjam] = useState(null);
  const [tglPinjam, setTglPinjam] = useState(new Date());
  const [tglKembali, setTglKembali] = useState(new Date());
  const [riwayatPeminjaman, setRiwayatPeminjaman] = useState([]);

  const fetchRiwayat = async () => {
    try {
      const res = await api.get("/peminjaman");
      setRiwayatPeminjaman(res.data.data || []);
    } catch (err) {
      console.error("Gagal memuat riwayat", err);
    }
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editStatus, setEditStatus] = useState("Dipinjam");
  const [editKembali, setEditKembali] = useState(new Date());


  useEffect(() => {
    fetchRiwayat();
    const dummyDate = new Date();
    dummyDate.setDate(dummyDate.getDate() + 7);
    setTglKembali(dummyDate);
  }, []);

  // Fungsi reusable untuk menambah buku ke list
  const addBukuToList = (book) => {
    const isExist = bukuList.find((b) => b.id === book.id || b.isbn === book.isbn);
    if (isExist) {
      return Swal.fire({ icon: "warning", title: "Buku sudah ada di daftar!", timer: 1500, showConfirmButton: false });
    }
    setBukuList((prev) => [...prev, { ...book, jumlahPinjam: 1 }]);
    setBarcode("");
    setSearchBuku("");
  };

  // 1. Handle Scan Barcode (Enter)
  const handleScanBuku = async (code) => {
    if (!code) return;
    try {
      const res = await api.get(`/databuku?search=${encodeURIComponent(code)}`);
      const book = (res.data.data || []).find(b => b.barcode === code || b.isbn === code);
      if (book) {
        addBukuToList(book);
      } else {
        Swal.fire("Gagal", "Barcode/ISBN tidak ditemukan", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Gagal menghubungi server", "error");
    }
  };

  // 2. Handle Cari Buku Manual (Judul/ISBN)
  const handleCariBukuManual = async (e) => {
    const val = e.target.value;
    setSearchBuku(val);
    if (val.length > 3) {
      try {
        const res = await api.get(`/databuku?search=${val}`);
        const found = res.data.data || [];
        // Jika hanya satu yang ditemukan, bisa langsung tambah atau munculkan dropdown
        // Untuk kemudahan, kita asumsikan jika user tekan Enter atau memilih dari list
      } catch (err) { console.log(err) }
    }
  };

  // 3. Cari Siswa berdasarkan NIS
  const cariSiswa = async (keyword) => {
    const val = keyword.trim();
    setSearchSiswa(val);

    if (!val || val.length < 3) return;

    try {
      const res = await api.get(`/siswa?search=${encodeURIComponent(val)}`);
      const data = res.data.data || [];

      if (data.length === 0) {
        setPeminjam(null);
        return;
      }

      // Prioritas: match NIS exact (atau fallback ke NISN)
      const exactByNis = data.find((s) => String(s?.nis ?? "") === val);
      if (exactByNis) {
        setPeminjam(exactByNis);
        return;
      }

      const exactByNisn = data.find((s) => String(s?.nisn ?? "") === val);
      if (exactByNisn) {
        setPeminjam(exactByNisn);
        return;
      }

      // Fallback: kalau tidak ada exact match, ambil hasil pertama
      setPeminjam(data[0]);
    } catch (err) {
      setPeminjam(null);
    }
  };


  const handleSimpan = async () => {
    if (!peminjam)
      return Swal.fire("Peringatan", "Cari dan pilih siswa dulu!", "warning");
    if (bukuList.length === 0)
      return Swal.fire("Peringatan", "Scan buku minimal 1!", "warning");

    const payload = {
      nama: peminjam.nama,
      nis: peminjam.nis, // Tambahan NIS agar data lebih akurat
      buku: bukuList.map((b) => b.judul).join(", "),
      jumlah: bukuList.reduce((acc, curr) => acc + curr.jumlahPinjam, 0),
      pinjam: tglPinjam.toISOString().split("T")[0], // Format YYYY-MM-DD
      kembali: tglKembali.toISOString().split("T")[0],
      status: "Dipinjam",
    };

    try {
      const res = await api.post("/peminjaman", payload);
      if (res.data.status) {
        Swal.fire("Berhasil", "Peminjaman telah disimpan", "success");
        setBukuList([]);
        setPeminjam(null);
        setSearchSiswa("");
        fetchRiwayat();
      }
    } catch (err) {
      Swal.fire("Error", "Gagal menyimpan transaksi", "error");
    }
  };

  const handleHapusPeminjaman = async (id) => {
    const ok = await Swal.fire({
      title: "Yakin hapus peminjaman?",
      text: "Data peminjaman akan dihapus permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus",
      cancelButtonText: "Batal",
      confirmButtonColor: "#d33",
    });

    if (!ok.isConfirmed) return;

    try {
      await api.delete(`/peminjaman/${id}`);
      Swal.fire("Terhapus!", "Peminjaman berhasil dihapus.", "success");
      fetchRiwayat();
    } catch (err) {
      Swal.fire("Error", "Gagal menghapus transaksi", "error");
    }
  };

  const handleEditOpen = (item) => {
    setEditItem(item);
    setEditStatus(item?.status || "Dipinjam");
    setEditKembali(item?.kembali ? new Date(item.kembali) : new Date());
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!editItem?.id) return;

    const payload = {
      status: editStatus,
      kembali: editKembali.toISOString().split("T")[0],
    };

    try {
      await api.put(`/peminjaman/${editItem.id}`, payload);
      Swal.fire("Berhasil", "Peminjaman berhasil diupdate", "success");
      setIsEditModalOpen(false);
      setEditItem(null);
      fetchRiwayat();
    } catch (err) {
      Swal.fire("Error", "Gagal mengupdate transaksi", "error");
    }
  };


  return (
    <div className="p-4 bg-gray-50 min-h-screen font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PANEL KIRI: PENCARIAN */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <RiSearchLine className="text-blue-500" /> Pencarian
          </h2>

          <div className="space-y-4">
            {/* Scan Barcode */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <label className="text-sm font-semibold text-green-700 block mb-2">Scan Barcode Buku</label>
              <input
                type="text"
                placeholder="Scan barcode di sini..."
                className="w-full border-2 border-green-300 focus:border-green-500 px-4 py-2 rounded-lg"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleScanBuku(barcode)}
              />
              <p className="text-[10px] text-green-600 mt-1">* Scanner akan menunggu sampai barcode selesai terbaca</p>
            </div>

            {/* Cari Buku Manual */}
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-2">Cari Buku (Judul/ISBN)</label>
              <input
                type="text"
                placeholder="Ketik judul atau ISBN..."
                className="w-full border px-4 py-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400"
                value={searchBuku}
                onChange={handleCariBukuManual}
                onKeyDown={(e) => e.key === "Enter" && handleScanBuku(searchBuku)}
              />
            </div>

            {/* Cari Siswa */}
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-2">Cari Siswa/Anggota</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ketik NIS/ID atau nama..."
                  className="flex-1 border px-4 py-2 rounded-lg border-gray-300"
                  value={searchSiswa}
                  onChange={(e) => cariSiswa(e.target.value)}
                />
                <button className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
                  <RiUserAddLine size={20}/>
                </button>
              </div>
            </div>

            <button
              onClick={() => { setBukuList([]); setPeminjam(null); setSearchSiswa(""); }}
              className="w-full flex items-center justify-center gap-2 text-red-500 py-2 font-semibold hover:bg-red-50 rounded-lg border border-dashed border-red-200"
            >
              <RiRestartLine /> Reset Semua
            </button>
          </div>
        </div>

        {/* PANEL KANAN: DETAIL */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">Detail Peminjaman</h2>
          
          {/* Data Peminjam */}
          <div className={`p-4 rounded-lg mb-4 border ${peminjam ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
             <p className="text-xs font-bold text-gray-500 mb-2">👤 DATA PEMINJAM</p>
            {peminjam ? (
              <div>
                <p className="font-bold text-gray-800">{peminjam.nama}</p>
                <p className="text-sm text-gray-600">NIS: {peminjam.nis} | Kelas: {peminjam.kelas || '-'}</p>
              </div>
            ) : <p className="text-sm italic text-gray-400">Belum ada siswa dipilih</p>}
          </div>

          {/* Buku yang dipinjam */}
          <div className="mb-4">
            <p className="text-sm font-bold mb-2">Buku yang Dipinjam <span className="bg-blue-500 text-white px-2 py-0.5 rounded-full text-[10px]">{bukuList.length}</span></p>
            <div className="max-h-[180px] overflow-y-auto space-y-2 border-t pt-2">
              {bukuList.length > 0 ? bukuList.map((buku, i) => (
                <div key={i} className="p-3 border rounded-lg flex justify-between items-center bg-white shadow-sm">
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-700">{buku.judul}</p>
                    <p className="text-[10px] text-gray-500">ISBN: {buku.isbn} | Stok: {buku.stok || 0}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="number" readOnly value={buku.jumlahPinjam} className="w-10 border rounded text-center text-sm p-1" />
                    <button onClick={() => setBukuList(bukuList.filter((_, idx) => idx !== i))} className="text-white bg-red-500 p-1.5 rounded-md hover:bg-red-600">
                      <RiDeleteBinLine size={14} />
                    </button>
                  </div>
                </div>
              )) : <p className="text-center py-4 text-gray-400 text-sm italic border-2 border-dashed rounded-lg">Belum ada buku ditambahkan</p>}
            </div>
          </div>

          {/* Ringkasan & Tanggal */}
          <div className="bg-yellow-50 p-4 rounded-lg mb-4 border border-yellow-100">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Total Buku:</span>
              <span className="font-bold">{bukuList.length}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Tanggal Pinjam</label>
              <DatePicker selected={tglPinjam} onChange={(d) => setTglPinjam(d)} className="w-full border rounded-lg p-2 text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Tanggal Kembali</label>
              <DatePicker selected={tglKembali} onChange={(d) => setTglKembali(d)} className="w-full border rounded-lg p-2 text-sm" />
            </div>
          </div>

          <button 
            onClick={handleSimpan} 
            className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2"
          >
            ✅ Simpan Peminjaman
          </button>
        </div>
      </div>


      {/* TABEL DAFTAR PEMINJAMAN TERBARU */}
      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="font-bold mb-4">Daftar Peminjaman Terbaru (Database)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 text-[11px] uppercase">
              <tr>
                <th className="p-4">No</th>
                <th className="p-4">Nama Siswa</th>
                <th className="p-4">Buku</th>
                <th className="p-4 text-center">Qty</th>
                <th className="p-4">Pinjam</th>
                <th className="p-4">Kembali</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>

            </thead>
            <tbody>
              {riwayatPeminjaman.map((item, idx) => (
                <tr key={item.id ?? idx} className="border-b">
                  <td className="p-4">{idx + 1}</td>
                  <td className="p-4 font-semibold text-gray-700">{item.nama}</td>
                  <td className="p-4 italic text-gray-600">{item.buku}</td>
                  <td className="p-4 text-center">{item.jumlah}</td>
                  <td className="p-4">{item.pinjam ? new Date(item.pinjam).toLocaleDateString('id-ID') : '-'}</td>
                  <td className="p-4">{item.kembali ? new Date(item.kembali).toLocaleDateString('id-ID') : '-'}</td>
                  <td className="p-4 text-center">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditOpen(item)}
                        className="text-white bg-blue-500 hover:bg-blue-600 p-2 rounded-md"
                        title="Edit"
                      >
                        <RiPencilLine size={14} />
                      </button>
                      <button
                        onClick={() => handleHapusPeminjaman(item.id)}
                        className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-md"
                        title="Hapus"
                      >
                        <RiDeleteBinLine size={14} />
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
  );
}