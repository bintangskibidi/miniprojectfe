import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const active = (path) =>
    location.pathname === path ? "menu active" : "menu";

  return (
    <div className="sidebar">

      {/* LOGO */}
      <div className="logo-box">
        <span className="logo">🔵</span>
        <h3>A-Count</h3>
      </div>

      {/* DASHBOARD */}
      <Link to="/perpustakaan" className={active("/perpustakaan")}>
        🏠 Dashboard
      </Link>

      {/* SECTION */}
      <p className="section">MANAJEMEN DATA</p>

      <Link to="/perpustakaan/buku" className={active("/perpustakaan/buku")}>
        📚 Data Buku
      </Link>

      <Link to="/perpustakaan/peminjaman" className="menu">
        📦 Peminjaman Buku
      </Link>

      <Link to="/perpustakaan/pengembalian" className="menu">
        🔄 Pengembalian Buku
      </Link>

      <Link to="/perpustakaan/denda" className="menu">
        ⚙️ Setting Denda
      </Link>

      {/* SECTION */}
      <p className="section">LAPORAN</p>

      <Link to="/perpustakaan/buku" className="menu">
        📄 Data Buku
      </Link>

      <Link to="/perpustakaan/laporan-peminjaman" className="menu">
        📊 Laporan Peminjaman
      </Link>

      <Link to="/perpustakaan/laporan-pengembalian" className="menu active-light">
        📘 Laporan Pengembalian
      </Link>

      <Link to="/perpustakaan/laporan-denda" className="menu">
        📑 Laporan Denda
      </Link>

      {/* SECTION */}
      <p className="section">PENGATURAN</p>

      <Link to="/" className="menu">
        ⬅️ Kembali
      </Link>

    </div>
  );
}