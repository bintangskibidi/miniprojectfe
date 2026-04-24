import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import api from "../../../../utils/api";

const DataSiswa = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 5;

  // State untuk Modal Detail
  const [showModal, setShowModal] = useState(false);
  const [selectedSiswa, setSelectedSiswa] = useState(null);

  const getData = async () => {
    try {
      const res = await api.get("/siswa");
      setData(res.data.data || []);
    } catch (error) {
      console.error("ERROR:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Yakin hapus?",
      text: "Data akan dihapus secara permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Ya, hapus",
    });

    if (result.isConfirmed) {
      await api.delete(`/siswa/${id}`);
      Swal.fire("Berhasil", "Data dihapus", "success");
      getData();
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

  const handleViewDetail = async (id) => {
    try {
      const res = await api.get(`/siswa/${id}`);

      if (res.data.status) {
        setSelectedSiswa(res.data.data); // Set data lengkap ke state
        setShowModal(true); // Munculkan modal
      }
    } catch (error) {
      console.error("Gagal ambil detail:", error);
      Swal.fire("Error", "Gagal mengambil data detail siswa", "error");
    }
  };

  return (
    <div
      className="p-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <h4 className="fw-bold mb-4 text-dark">Data Siswa</h4>

      {/* Tabel Card Style Aduca */}
      <div className="card shadow-sm border-0" style={{ borderRadius: "8px" }}>
        <div className="card-header bg-white py-3 border-bottom d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-bold text-primary">Daftar Siswa</h6>
          <button
            className="btn btn-primary btn-sm px-3"
            onClick={() => navigate("/dashboard/tambah-siswa")}
          >
            + Tambah
          </button>
        </div>

        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <div className="btn-group btn-group-sm">
              <button className="btn btn-outline-secondary">Copy</button>
              <button className="btn btn-outline-secondary">Excel</button>
              <button className="btn btn-outline-secondary">Print</button>
            </div>
            <input
              type="text"
              className="form-control form-control-sm border-secondary-subtle"
              style={{ width: "200px" }}
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-light small text-center text-uppercase">
                <tr>
                  <th>NO</th>
                  <th>NIS</th>
                  <th>Nama</th>
                  <th>Kelas</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={item.id} className="small">
                    <td className="text-center">{start + index + 1}</td>
                    <td>{item.nis}</td>
                    <td className="fw-bold">{item.nama}</td>
                    <td className="text-center">{item.kelas || "-"}</td>
                    <td className="text-center">
                      <span
                        className={`badge ${item.status === "Aktif" ? "bg-success" : "bg-secondary"}`}
                        style={{ fontSize: "10px" }}
                      >
                        {item.status || "Alumni"}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="btn-group gap-1">
                        <Link
                          to={`/dashboard/edit-siswa/${item.id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          <i className="bi bi-pencil-square"></i>
                        </Link>
                        {/* Tombol View Modal */}
                        <button
                          className="btn btn-outline-info btn-sm"
                          onClick={() => handleViewDetail(item.id)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="bi bi-trash"></i>
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

      {/* MODAL DETAIL (Full Field Version) */}
      {showModal && selectedSiswa && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1050 }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg">
              {/* Header Biru Solid khas Aduca */}
              <div className="modal-header bg-primary text-white py-2 px-3">
                <h6 className="modal-title fw-bold">
                  <i className="bi bi-person-lines-fill me-2"></i> Detail
                  Informasi Siswa
                </h6>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div
                className="modal-body p-0"
                style={{ maxHeight: "80vh", overflowY: "auto" }}
              >
                <div className="row g-0">
                  {/* Sisi Kiri: Foto & Status Singkat */}
                  <div className="col-md-4 bg-light text-center border-end p-4">
                    <div className="mb-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${selectedSiswa.nama}&background=0D6EFD&color=fff&size=128`}
                        className="rounded-circle border border-4 border-white shadow-sm"
                        alt="pfp"
                        style={{ width: "130px" }}
                      />
                    </div>
                    <h5 className="fw-bold text-dark mb-1">
                      {selectedSiswa.nama}
                    </h5>
                    <p className="text-muted small mb-3">
                      NIS: {selectedSiswa.nis}
                    </p>
                    <span
                      className={`badge px-3 py-2 ${selectedSiswa.status === "Aktif" ? "bg-success" : "bg-danger"}`}
                    >
                      {selectedSiswa.status}
                    </span>

                    <div className="mt-4 pt-3 border-top text-start">
                      <div className="small fw-bold text-primary mb-1">
                        Kontak Siswa:
                      </div>
                      <div className="small text-dark">
                        <i className="bi bi-phone me-2"></i>
                        {selectedSiswa.hp || "-"}
                      </div>
                    </div>
                  </div>

                  {/* Sisi Kanan: Detail Tabel */}
                  <div className="col-md-8 p-4">
                    {/* Section 1: Data Pribadi */}
                    <h6 className="text-primary fw-bold border-bottom pb-2 mb-3">
                      <i className="bi bi-person-badge me-2"></i>Data Pribadi
                    </h6>
                    <table className="table table-sm table-borderless small mb-4">
                      <tbody>
                        <tr>
                          <td width="140" className="text-muted fw-bold">
                            NIS / NISN
                          </td>
                          <td>
                            : {selectedSiswa.nis} / {selectedSiswa.nisn}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-bold">
                            Tempat, Tgl Lahir
                          </td>
                          <td>
                            : {selectedSiswa.tempat_lahir},{" "}
                            {selectedSiswa.tanggal_lahir}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-bold">Jenis Kelamin</td>
                          <td>: {selectedSiswa.jenis_kelamin}</td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-bold">Agama</td>
                          <td>: {selectedSiswa.agama}</td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-bold">Golongan Darah</td>
                          <td>
                            :{" "}
                            <span className="badge bg-danger">
                              {selectedSiswa.golongan_darah}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-bold">Alamat</td>
                          <td>: {selectedSiswa.alamat}</td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Section 2: Data Akademik */}
                    <h6 className="text-primary fw-bold border-bottom pb-2 mb-3">
                      <i className="bi bi-book me-2"></i>Data Akademik
                    </h6>
                    <table className="table table-sm table-borderless small mb-4">
                      <tbody>
                        <tr>
                          <td width="140" className="text-muted fw-bold">
                            Kelas / Jurusan
                          </td>
                          <td>
                            : {selectedSiswa.kelas} / {selectedSiswa.jurusan}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-bold">Tahun Ajaran</td>
                          <td>: {selectedSiswa.tahun_ajaran}</td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-bold">Tahun Masuk</td>
                          <td>: {selectedSiswa.tahun_masuk}</td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-bold">Sekolah Asal</td>
                          <td>: {selectedSiswa.sekolah_asal}</td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Section 3: Data Keluarga */}
                    <h6 className="text-primary fw-bold border-bottom pb-2 mb-3">
                      <i className="bi bi-people me-2"></i>Data Keluarga
                    </h6>
                    <table className="table table-sm table-borderless small mb-0">
                      <tbody>
                        <tr>
                          <td width="140" className="text-muted fw-bold">
                            Ayah
                          </td>
                          <td>
                            : {selectedSiswa.ayah} (
                            {selectedSiswa.pekerjaan_ayah})
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-bold">Ibu</td>
                          <td>
                            : {selectedSiswa.ibu} ({selectedSiswa.pekerjaan_ibu}
                            )
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-bold">Wali</td>
                          <td>
                            : {selectedSiswa.wali} (
                            {selectedSiswa.hubungan_wali})
                          </td>
                        </tr>
                        <tr className="border-top-dotted">
                          <td className="text-muted fw-bold">HP Orang Tua</td>
                          <td>
                            : A: {selectedSiswa.hp_ayah} / I:{" "}
                            {selectedSiswa.hp_ibu}
                          </td>
                        </tr>
                        <tr>
                          <td className="text-muted fw-bold">HP Wali</td>
                          <td>: {selectedSiswa.hp_wali}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Footer dengan tombol Cetak & Tutup */}
              <div className="modal-footer bg-light py-2 px-3">
                <button
                  className="btn btn-secondary btn-sm fw-bold px-3"
                  onClick={() => setShowModal(false)}
                >
                  Tutup
                </button>
                <button
                  className="btn btn-dark btn-sm fw-bold px-3"
                  onClick={() => window.print()}
                >
                  <i className="bi bi-printer me-2"></i>Cetak Data
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
