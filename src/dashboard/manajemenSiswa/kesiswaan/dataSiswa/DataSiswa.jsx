import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../../utils/api";

import {
  RiTeamLine,
  RiSearchLine,
  RiAddLine,
  RiUpload2Line,
  RiFilter3Fill,
  RiFileCopyLine,
  RiFileExcel2Line,
  RiFilePdf2Line,
  RiPrinterLine,
  RiEyeLine,
  RiPencilLine,
  RiDeleteBinLine,
} from "react-icons/ri";

const DataSiswa = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const [showModal, setShowModal] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  const getData = async () => {
    try {
      const res = await api.get("/siswa");
      setData(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin hapus?",
      icon: "warning",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      await api.delete(`/siswa/${id}`);
      Swal.fire("Berhasil", "Data dihapus", "success");
      getData();
    }
  };

  const handleViewDetail = async (id) => {
    try {
      const res = await api.get(`/siswa/${id}`);
      const detail = res.data.data || res.data;

      setSelectedSiswa(detail);
      setShowModal(true);
    } catch {
      Swal.fire("Error", "Gagal ambil detail", "error");
    }
  };

  const filtered = data.filter(
    (item) =>
      item.nama?.toLowerCase().includes(search.toLowerCase()) ||
      item.nis?.toLowerCase().includes(search.toLowerCase()),
  );

  const totalPage = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const currentData = filtered.slice(start, start + perPage);

  return (
    <div className="container-fluid py-3" style={{ background: "#f4f6f9" }}>
      {/* HEADER */}
      <div className="mb-3">
        <div className="badge bg-primary p-2">
          <RiTeamLine className="me-1" /> Manajemen Siswa
        </div>
        <h5 className="mt-2">Data Siswa</h5>
      </div>

      {/* FILTER */}
      <div className="card mb-3">
        <div className="card-body">
          <label className="fw-bold mb-1">Kelas</label>
          <div className="d-flex gap-2">
            <select className="form-select" style={{ maxWidth: 300 }}>
              <option>-- Semua Kelas --</option>
            </select>
            <button className="btn btn-success btn-sm">
              <RiFilter3Fill /> Terapkan
            </button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <b>Daftar Siswa</b>

          <div>
            <button className="btn btn-warning btn-sm me-2">
              <RiUpload2Line /> Upload
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/dashboard/tambah-siswa")}
            >
              <RiAddLine /> Tambah
            </button>
          </div>
        </div>

        <div className="card-body">
          {/* TOP CONTROL */}
          <div className="d-flex justify-content-between mb-2 flex-wrap gap-2">
            <div className="d-flex align-items-center gap-2">
              <span>Tampilkan</span>
              <select
                className="form-select form-select-sm"
                style={{ width: 70 }}
              >
                <option>10</option>
                <option>25</option>
              </select>
              <span>data</span>
            </div>

            <div className="input-group" style={{ width: 250 }}>
              <span className="input-group-text bg-white">
                <RiSearchLine />
              </span>
              <input
                className="form-control"
                placeholder="Cari..."
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* EXPORT BUTTON */}
          <div className="d-flex gap-2 mb-2 flex-wrap">
            <button className="btn btn-outline-secondary btn-sm">
              <RiFileCopyLine /> Salin
            </button>
            <button className="btn btn-outline-secondary btn-sm">
              <RiFileExcel2Line /> CSV
            </button>
            <button className="btn btn-outline-secondary btn-sm">
              <RiFileExcel2Line /> Excel
            </button>
            <button className="btn btn-outline-secondary btn-sm">
              <RiFilePdf2Line /> PDF
            </button>
            <button className="btn btn-outline-secondary btn-sm">
              <RiPrinterLine /> Print
            </button>
          </div>

          {/* TABLE */}
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-light text-center small">
              <tr>
                <th>#</th>
                <th>NIS</th>
                <th>Nama</th>
                <th>Tgl Lahir</th>
                <th>Alamat</th>
                <th>Kelas</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody className="small">
              {currentData.map((item, i) => (
                <tr key={item.id}>
                  <td className="text-center">{start + i + 1}</td>
                  <td>{item.nis}</td>
                  <td>{item.nama}</td>
                  <td>{item.tanggal_lahir || "-"}</td>
                  <td>{item.alamat || "-"}</td>
                  <td className="text-center">{item.kelas}</td>
                  <td className="text-center">
                    <span className="badge bg-success">
                      {item.status || "Aktif"}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-info btn-sm me-1"
                      onClick={() => handleViewDetail(item.id)}
                    >
                      <RiEyeLine />
                    </button>
                    <Link
                      to={`/dashboard/edit-siswa/${item.id}`}
                      className="btn btn-primary btn-sm me-1"
                    >
                      <RiPencilLine />
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <RiDeleteBinLine />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="d-flex justify-content-between small mt-2">
            <span>
              Menampilkan {start + 1} -{" "}
              {Math.min(start + perPage, filtered.length)} dari{" "}
              {filtered.length}
            </span>

            <div>
              {Array.from({ length: totalPage }, (_, i) => (
                <button
                  key={i}
                  className={`btn btn-sm ${
                    page === i + 1 ? "btn-primary" : "btn-light"
                  } me-1`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MODAL DETAIL */}
      {showModal && selectedSiswa && (
        <div
          className="modal d-block"
          style={{ background: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-xl modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              {/* HEADER */}
              <div className="modal-header bg-primary text-white py-2">
                <h6 className="fw-bold mb-0">📄 Detail Lengkap Siswa</h6>
                <button
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* BODY */}
              <div className="modal-body p-0">
                <div className="row g-0">
                  {/* LEFT PROFILE */}
                  <div className="col-md-4 text-center border-end p-4 bg-light">
                    <img
                      src="https://i.pinimg.com/736x/97/fa/af/97faaf15ebb56f6caa72260fec663baf.jpg"
                      className="rounded-circle mb-3"
                      style={{ width: 120 }}
                    />

                    <h5 className="fw-bold">{selectedSiswa.nama}</h5>
                    <div className="text-muted small mb-2">
                      NIS: {selectedSiswa.nis}
                    </div>

                    <span className="badge bg-success px-3 py-2">
                      {selectedSiswa.status || "Aktif"}
                    </span>

                    <div className="mt-3 small text-start">
                      <b>Kontak:</b>
                      <br />
                      {selectedSiswa.hp || "-"}
                    </div>
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="col-md-8 p-4">
                    {/* DATA PRIBADI */}
                    <h6 className="fw-bold text-primary border-bottom pb-1">
                      Data Pribadi
                    </h6>

                    <table className="table table-sm table-borderless small mb-3">
                      <tbody>
                        <tr>
                          <td width="160">NIS / NISN</td>
                          <td>
                            : {selectedSiswa.nis} / {selectedSiswa.nisn}
                          </td>
                        </tr>
                        <tr>
                          <td>Tempat, Tgl Lahir</td>
                          <td>
                            : {selectedSiswa.tempat_lahir},{" "}
                            {selectedSiswa.tanggal_lahir}
                          </td>
                        </tr>
                        <tr>
                          <td>Jenis Kelamin</td>
                          <td>: {selectedSiswa.jenis_kelamin}</td>
                        </tr>
                        <tr>
                          <td>Agama</td>
                          <td>: {selectedSiswa.agama}</td>
                        </tr>
                        <tr>
                          <td>Golongan Darah</td>
                          <td>
                            :{" "}
                            <span className="badge bg-danger">
                              {selectedSiswa.golongan_darah}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>Alamat</td>
                          <td>: {selectedSiswa.alamat}</td>
                        </tr>
                      </tbody>
                    </table>

                    {/* AKADEMIK */}
                    <h6 className="fw-bold text-primary border-bottom pb-1">
                      Data Akademik
                    </h6>

                    <table className="table table-sm table-borderless small mb-3">
                      <tbody>
                        <tr>
                          <td width="160">Kelas / Jurusan</td>
                          <td>
                            : {selectedSiswa.kelas} / {selectedSiswa.jurusan}
                          </td>
                        </tr>
                        <tr>
                          <td>Tahun Ajaran</td>
                          <td>: {selectedSiswa.tahun_ajaran}</td>
                        </tr>
                        <tr>
                          <td>Tahun Masuk</td>
                          <td>: {selectedSiswa.tahun_masuk}</td>
                        </tr>
                        <tr>
                          <td>Sekolah Asal</td>
                          <td>: {selectedSiswa.sekolah_asal}</td>
                        </tr>
                      </tbody>
                    </table>

                    {/* KELUARGA */}
                    <h6 className="fw-bold text-primary border-bottom pb-1">
                      Data Keluarga
                    </h6>

                    <table className="table table-sm table-borderless small">
                      <tbody>
                        <tr>
                          <td width="160">Ayah</td>
                          <td>
                            : {selectedSiswa.ayah} (
                            {selectedSiswa.pekerjaan_ayah})
                          </td>
                        </tr>
                        <tr>
                          <td>Ibu</td>
                          <td>
                            : {selectedSiswa.ibu} ({selectedSiswa.pekerjaan_ibu}
                            )
                          </td>
                        </tr>
                        <tr>
                          <td>Wali</td>
                          <td>
                            : {selectedSiswa.wali} (
                            {selectedSiswa.hubungan_wali})
                          </td>
                        </tr>
                        <tr>
                          <td>HP Orang Tua</td>
                          <td>
                            : A: {selectedSiswa.hp_ayah} / I:{" "}
                            {selectedSiswa.hp_ibu}
                          </td>
                        </tr>
                        <tr>
                          <td>HP Wali</td>
                          <td>: {selectedSiswa.hp_wali}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="modal-footer bg-light">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setShowModal(false)}
                >
                  Tutup
                </button>

                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => window.print()}
                >
                  🖨 Cetak
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSiswa;
