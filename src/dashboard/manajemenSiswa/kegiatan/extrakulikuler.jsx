import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import api from "../../../utils/api"; // pastikan path benar

// ================== STYLE ==================
const customStyles = {
  rows: { style: { minHeight: "56px" } },
  headCells: {
    style: {
      backgroundColor: "#1e3a8a",
      color: "white",
      fontWeight: "bold",
      fontSize: "14px",
    },
  },
  cells: { style: { fontSize: "13px" } },
};

// ================== MODAL ==================
const ModalTambah = ({ isOpen, onClose, onSave, editData }) => {
  const [form, setForm] = useState({
    nama: "",
    pembina: "",
    jadwal: "",
    tanggal: "",
    keterangan: "",
  });

  useEffect(() => {
    if (editData) {
      setForm(editData);
    } else {
      setForm({
        nama: "",
        pembina: "",
        jadwal: "",
        tanggal: "",
        keterangan: "",
      });
    }
  }, [editData, isOpen]); // Tambahkan isOpen agar form reset saat modal dibuka ulang

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.nama) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Nama wajib diisi!",
      });
      return;
    }

    onSave(form);
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3 style={{ marginBottom: "10px" }}>
          {editData ? "Edit Ekstrakurikuler" : "Tambah Ekstrakurikuler"}
        </h3>

        <input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama Ekstrakurikuler" style={inputStyle} />
        <input name="pembina" value={form.pembina} onChange={handleChange} placeholder="Pembina" style={inputStyle} />
        <input name="jadwal" value={form.jadwal} onChange={handleChange} placeholder="Jadwal (Contoh: Senin, 15:00)" style={inputStyle} />
        <input name="tanggal" type="date" value={form.tanggal} onChange={handleChange} style={inputStyle} />
        <input name="keterangan" value={form.keterangan} onChange={handleChange} placeholder="Keterangan" style={inputStyle} />

        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <button onClick={handleSubmit} style={btnPrimary}>
            {editData ? "Update" : "Simpan"}
          </button>
          <button onClick={onClose} style={btnDanger}>Batal</button>
        </div>
      </div>
    </div>
  );
};

// ================== MAIN COMPONENT ==================
export default function Ekstrakurikuler() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // ================= GET DATA =================
  const getData = async () => {
    try {
      const res = await api.get("/ekstra");
      // Membalikkan urutan agar data ID terbesar (terbaru) muncul di index 0
      const sortedData = (res.data.data || []).reverse();
      setData(sortedData);
    } catch (error) {
      console.error("Gagal load data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ================= DELETE =================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/ekstra/${id}`);
          getData(); // Refresh data

          Swal.fire({
            icon: "success",
            title: "Terhapus!",
            timer: 1200,
            showConfirmButton: false,
          });
        } catch (error) {
          Swal.fire("Error", "Gagal hapus data", "error");
        }
      }
    });
  };

  // ================= SAVE (ADD / EDIT) =================
  const handleSave = async (form) => {
    try {
      if (editData) {
        await api.put(`/ekstra/${editData.id}`, form);
        Swal.fire({ icon: "success", title: "Update berhasil", timer: 1200, showConfirmButton: false });
      } else {
        await api.post("/ekstra", form);
        Swal.fire({ icon: "success", title: "Data ditambahkan", timer: 1200, showConfirmButton: false });
      }

      getData(); // Refresh list agar urutan kembali benar
      setEditData(null);
    } catch (error) {
      Swal.fire("Error", "Gagal simpan data", "error");
    }
  };

  // ================= EDIT HANDLER =================
  const handleEdit = (row) => {
    setEditData(row);
    setOpenModal(true);
  };

  // Definisi Kolom
  const columns = [
    {
      name: "No",
      // Menggunakan index i + 1 agar nomor selalu urut 1, 2, 3... di tampilan
      selector: (row, i) => i + 1,
      width: "60px",
    },
    { name: "Nama Ekstrakurikuler", selector: (row) => row.nama, sortable: true },
    { name: "Pembina", selector: (row) => row.pembina, sortable: true },
    { name: "Jadwal", selector: (row) => row.jadwal },
    { name: "Tanggal", selector: (row) => row.tanggal },
    { name: "Keterangan", selector: (row) => row.keterangan },
    {
      name: "Aksi",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={btnEdit} onClick={() => handleEdit(row)} title="Edit">✏️</button>
          <button style={btnDelete} onClick={() => handleDelete(row.id)} title="Hapus">🗑️</button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div style={container}>
      <div style={header}>
        <h2 style={{ color: "#1e293b" }}>Data Ekstrakurikuler</h2>
        <button
          style={btnPrimary}
          onClick={() => {
            setEditData(null);
            setOpenModal(true);
          }}
        >
          + Tambah Ekstra
        </button>
      </div>

      <div style={card}>
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          responsive
          customStyles={customStyles}
          noDataComponent="Tidak ada data untuk ditampilkan"
        />
      </div>

      <ModalTambah
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        editData={editData}
      />
    </div>
  );
}

// ================== CSS-IN-JS STYLES ==================
const container = {
  padding: "30px",
  backgroundColor: "#f1f5f9",
  minHeight: "100vh",
  fontFamily: "Inter, sans-serif",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
};

const card = {
  background: "white",
  borderRadius: "12px",
  padding: "10px",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
};

const btnPrimary = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  transition: "0.3s",
};

const btnDanger = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const btnEdit = {
  background: "#f59e0b",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
};

const btnDelete = {
  background: "#ef4444",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  color: "white",
  fontSize: "14px",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "12px",
  width: "400px",
  display: "flex",
  flexDirection: "column",
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
};

const inputStyle = {
  padding: "10px",
  marginTop: "12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "14px",
  outline: "none",
};