import { useState } from "react";
import Swal from "sweetalert2";

const SettingLokasi = () => {
  const [lokasi, setLokasi] = useState([
    { id: 1, nama: "Ruangan Kelas 1" },
    { id: 2, nama: "Ruangan Kelas 2" },
    { id: 3, nama: "Ruangan Kelas 3" },
    { id: 4, nama: "Ruangan Kepala Sekolah" },
  ]);

  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);

  // TAMBAH / EDIT
  const handleSubmit = () => {
    if (!input) {
      Swal.fire("Error", "Nama lokasi tidak boleh kosong", "error");
      return;
    }

    if (editId) {
      setLokasi(
        lokasi.map((item) =>
          item.id === editId ? { ...item, nama: input } : item,
        ),
      );
      setEditId(null);
    } else {
      setLokasi([...lokasi, { id: lokasi.length + 1, nama: input }]);
    }

    setInput("");
  };

  // EDIT
  const handleEdit = (item) => {
    setInput(item.nama);
    setEditId(item.id);
  };

  // HAPUS
  const handleDelete = (id) => {
    Swal.fire({
      title: "Yakin hapus?",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        setLokasi(lokasi.filter((item) => item.id !== id));
      }
    });
  };

  return (
    <div className="p-4">
      <div className="bg-blue-600 text-white p-3 rounded-t">
        Pengaturan Lokasi Aset
      </div>

      <div className="border p-4">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Nama Lokasi"
            className="border p-2 w-full"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 rounded"
          >
            {editId ? "Update" : "+ Tambah"}
          </button>
        </div>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">#</th>
              <th>Nama Lokasi</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {lokasi.map((item, index) => (
              <tr key={item.id} className="text-center border-t">
                <td>{index + 1}</td>
                <td>{item.nama}</td>
                <td className="flex justify-center gap-2 py-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-yellow-400 px-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SettingLokasi;
