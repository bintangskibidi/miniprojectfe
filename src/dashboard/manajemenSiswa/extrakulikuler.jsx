import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";

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

  // 🔥 isi form saat edit
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
  }, [editData]);

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
        <h3>{editData ? "Edit Ekstrakurikuler" : "Tambah Ekstrakurikuler"}</h3>

        <input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama" style={inputStyle} />
        <input name="pembina" value={form.pembina} onChange={handleChange} placeholder="Pembina" style={inputStyle} />
        <input name="jadwal" value={form.jadwal} onChange={handleChange} placeholder="Jadwal" style={inputStyle} />
        <input name="tanggal" type="date" value={form.tanggal} onChange={handleChange} style={inputStyle} />
        <input name="keterangan" value={form.keterangan} onChange={handleChange} placeholder="Keterangan" style={inputStyle} />

        <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
          <button onClick={handleSubmit} style={btnPrimary}>
            {editData ? "Update" : "Simpan"}
          </button>
          <button onClick={onClose} style={btnDanger}>Batal</button>
        </div>
      </div>
    </div>
  );
};

// ================== MAIN ==================
export default function Ekstrakurikuler() {
  const [data, setData] = useState([
    {
      id: 1,
      nama: "Pramuka",
      pembina: "Jayadi",
      jadwal: "Sabtu",
      tanggal: "2025-07-12",
      keterangan: "-",
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState(null);

  // DELETE
  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        setData(data.filter((item) => item.id !== id));

        Swal.fire({
          icon: "success",
          title: "Terhapus!",
          timer: 1200,
          showConfirmButton: false,
        });
      }
    });
  };

  // SAVE (ADD + EDIT)
  const handleSave = (form) => {
    if (editData) {
      const updated = data.map((item) =>
        item.id === editData.id ? { ...item, ...form } : item
      );

      setData(updated);

      Swal.fire({
        icon: "success",
        title: "Update berhasil",
        timer: 1200,
        showConfirmButton: false,
      });

      setEditData(null);
    } else {
      const newId = data.length + 1;
      setData([...data, { id: newId, ...form }]);

      Swal.fire({
        icon: "success",
        title: "Data ditambahkan",
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  // EDIT
  const handleEdit = (row) => {
    setEditData(row);
    setOpenModal(true);
  };

  const columns = [
    { name: "#", selector: (row) => row.id, width: "60px" },
    { name: "Nama Ekstrakurikuler", selector: (row) => row.nama },
    { name: "Pembina", selector: (row) => row.pembina },
    { name: "Jadwal", selector: (row) => row.jadwal },
    { name: "Tanggal", selector: (row) => row.tanggal },
    { name: "Keterangan", selector: (row) => row.keterangan },
    {
      name: "Aksi",
      cell: (row) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={btnEdit} onClick={() => handleEdit(row)}>✏️</button>
          <button style={btnDelete} onClick={() => handleDelete(row.id)}>🗑️</button>
        </div>
      ),
    },
  ];

  return (
    <div style={container}>
      <div style={header}>
        <h2>Data Ekstrakurikuler</h2>
        <button
          style={btnPrimary}
          onClick={() => {
            setEditData(null);
            setOpenModal(true);
          }}
        >
          + Tambah
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

// ================== STYLE ==================
const container = {
  padding: "20px",
  backgroundColor: "#f1f5f9",
  minHeight: "100vh",
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "15px",
};

const card = {
  background: "white",
  borderRadius: "12px",
  padding: "15px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const btnPrimary = {
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};

const btnDanger = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};

const btnEdit = {
  background: "#f59e0b",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
};

const btnDelete = {
  background: "#ef4444",
  border: "none",
  padding: "6px 10px",
  borderRadius: "6px",
  cursor: "pointer",
  color: "white",
};

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
};

const inputStyle = {
  padding: "8px",
  marginTop: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};