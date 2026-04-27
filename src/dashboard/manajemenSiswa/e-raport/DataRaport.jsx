import { useState, useEffect } from "react";
import axios from "axios";

export default function DataRaport() {
  const [filter, setFilter] = useState({
    kelas: "",
    tahun: "",
    semester: "",
    wali: "",
    mapel: "",
  });

  const [kelasList, setKelasList] = useState([]);
  const [tahunList, setTahunList] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [waliList, setWaliList] = useState([]);
  const [mapelList, setMapelList] = useState([]);

  const [loading, setLoading] = useState(false);

  //   AMBIL DATA
  useEffect(() => {
    fetchData();
  }, []);

  const normalize = (res) => {
    // bikin aman semua bentuk response
    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.data?.data)) return res.data.data;
    return [];
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [kelas, tahun, semester, wali, mapel] = await Promise.all([
        axios.get("/api/kelas"),
        axios.get("/api/tahun"),
        axios.get("/api/semester"),
        axios.get("/api/wali"),
        axios.get("/api/mapel"),
      ]);

      
      setKelasList(normalize(kelas.data));
      setTahunList(normalize(tahun.data));
      setSemesterList(normalize(semester.data));
      setWaliList(normalize(wali.data));
      setMapelList(normalize(mapel.data));

    } catch (err) {
      console.error("Error fetch:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFilter({
      kelas: "",
      tahun: "",
      semester: "",
      wali: "",
      mapel: "",
    });
  };

  const handleFilter = () => {
    console.log("Kirim ke backend:", filter);

    // contoh kirim ke backend
    axios.get("/api/raport", { params: filter })
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="bg-white rounded-lg shadow border">
        <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg font-semibold">
          Filter Data Raport
        </div>

        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4">

            {/* KELAS */}
            <select name="kelas" value={filter.kelas} onChange={handleChange}
              className="border rounded-lg px-3 py-2">
              <option value="">-- Pilih Kelas --</option>
              {kelasList.map((k, i) => (
                <option key={k.id || i} value={k.id}>
                  {k.nama_kelas || k.nama}
                </option>
              ))}
            </select>

            {/* TAHUN */}
            <select name="tahun" value={filter.tahun} onChange={handleChange}
              className="border rounded-lg px-3 py-2">
              <option value="">-- Pilih Tahun --</option>
              {tahunList.map((t, i) => (
                <option key={t.id || i} value={t.id}>
                  {t.tahun || t.nama}
                </option>
              ))}
            </select>

            {/* SEMESTER */}
            <select name="semester" value={filter.semester} onChange={handleChange}
              className="border rounded-lg px-3 py-2">
              <option value="">-- Pilih Semester --</option>
              {semesterList.map((s, i) => (
                <option key={s.id || i} value={s.id}>
                  Semester {s.nama || s.semester}
                </option>
              ))}
            </select>

            {/* WALI */}
            <select name="wali" value={filter.wali} onChange={handleChange}
              className="border rounded-lg px-3 py-2">
              <option value="">-- Semua Wali --</option>
              {waliList.map((w, i) => (
                <option key={w.id || i} value={w.id}>
                  {w.nama}
                </option>
              ))}
            </select>

            {/* MAPEL */}
            <select name="mapel" value={filter.mapel} onChange={handleChange}
              className="border rounded-lg px-3 py-2">
              <option value="">-- Semua Mapel --</option>
              {mapelList.map((m, i) => (
                <option key={m.id || i} value={m.id}>
                  {m.nama_mapel || m.nama}
                </option>
              ))}
            </select>

          </div>
        )}

        {/* BUTTON */}
        <div className="flex justify-end gap-2 p-4 border-t">
          <button
            onClick={handleReset}
            className="bg-gray-200 px-4 py-2 rounded-lg text-sm"
          >
            Reset
          </button>

          <button
            onClick={handleFilter}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
  );
}