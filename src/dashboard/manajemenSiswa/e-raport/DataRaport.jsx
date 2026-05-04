import { useState, useEffect } from "react";
import api from "../../../utils/api"

export default function DataRaport() {
  const [filter, setFilter] = useState({
    kelas: "",
    tahun_ajaran: "", // Diubah dari tahun ke tahun_ajaran
    nama_semester: "",
    wali: "",
    mapel: "",
  });

  const [kelasList, setKelasList] = useState([]);
  const [tahunList, setTahunList] = useState([]);
  const [semesterList, setSemesterList] = useState([]);
  const [waliList, setWaliList] = useState([]);
  const [mapelList, setMapelList] = useState([]);

  const [loading, setLoading] = useState(false);
  // New states for table
  const [siswaList, setSiswaList] = useState([]);
  const [raportData, setRaportData] = useState({});
  const [tableLoading, setTableLoading] = useState(false);
  const [saveTimeout, setSaveTimeout] = useState(null);

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
      const [kelas, tahun, nama_semester, wali, mapel] = await Promise.all([
        api.get("/kelas"),
        api.get("/tahun-ajaran"), // Mengarah ke API tahun ajaran
        api.get("/semester"),
        api.get("/walikelas"),
        api.get("/mapel"),
      ]);

      
      setKelasList(normalize(kelas.data));
      setTahunList(normalize(tahun.data));
      setSemesterList(normalize(nama_semester.data));
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

  // Load siswa and raport when relevant filters selected
  useEffect(() => {
    if (filter.kelas && filter.nama_semester && filter.mapel) {
      loadRaportData();
    } else {
      setSiswaList([]);
      setRaportData({});
    }
  }, [filter.kelas, filter.nama_semester, filter.mapel]);

  const loadRaportData = async () => {
    setTableLoading(true);
    try {
      // Fetch siswa
      const siswaRes = await api.get("/datasiswa", {
        params: {
          kelas_id: filter.kelas,
          semester_id: filter.nama_semester,
        }
      });
      const siswaData = normalize(siswaRes.data);
      setSiswaList(siswaData);

      // Initialize raport data for new entries
      const initialData = {};
      siswaData.forEach(s => {
        initialData[s.id] = {
          kkm: '',
          harian: '',
          ujian: '',
          deskripsi: ''
        };
      });
      setRaportData(initialData);

      // Try to fetch existing data
      try {
        const raportRes = await api.get("/raport", {
          params: {
            kelas_id: filter.kelas,
            semester_id: filter.nama_semester,
            mapel_id: filter.mapel
          }
        });
        const existingData = normalize(raportRes.data);
        existingData.forEach(item => {
          initialData[item.siswa_id] = {
            ...initialData[item.siswa_id],
            kkm: item.kkm || '',
            harian: item.harian || '',
            ujian: item.ujian || '',
            deskripsi: item.deskripsi || ''
          };
        });
        setRaportData(initialData);
      } catch (fetchErr) {
        console.log("No existing raport data found, using defaults");
      }
    } catch (err) {
      console.error("Error loading raport:", err);
    } finally {
      setTableLoading(false);
    }
  };

  const handleInputChange = (siswaId, field, value) => {
    setRaportData(prev => ({
      ...prev,
      [siswaId]: {
        ...prev[siswaId],
        [field]: value
      }
    }));

    // Debounce save
    if (saveTimeout) clearTimeout(saveTimeout);
    setSaveTimeout(setTimeout(() => {
      autoSave(siswaId);
    }, 800));
  };

  const autoSave = async (siswaId) => {
    try {
      const data = raportData[siswaId];
      await api.put(`/raport/${siswaId}`, {
        ...data,
        siswa_id: siswaId,
        mapel_id: filter.mapel,
        kelas_id: filter.kelas,
        semester_id: filter.nama_semester,
        tahun_ajaran_id: filter.tahun_ajaran || null,
        wali_id: filter.wali || null
      });
      console.log(`Saved raport for siswa ${siswaId}`);
    } catch (err) {
      console.error("Save error:", err);
    }
  };

  const handleReset = () => {
    setFilter({
      kelas: "",
      tahun_ajaran: "",
      nama_semester: "",
      wali: "",
      mapel: "",
    });
    setSiswaList([]);
    setRaportData({});
    if (saveTimeout) clearTimeout(saveTimeout);
  };

  const handleFilter = () => {
    console.log("Kirim ke backend:", filter);
    // Logic filter bisa ditambahkan di sini
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
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-600 uppercase">Kelas</label>
              <select name="kelas" value={filter.kelas} onChange={handleChange}
                className="border rounded-lg px-3 py-2">
                <option value="">-- Pilih Kelas --</option>
                {kelasList.map((k, i) => (
                  <option key={k.id || i} value={k.id}>
                    {k.nama_kelas || k.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* TAHUN AJARAN */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-600 uppercase">Tahun Ajaran</label>
              <select name="tahun_ajaran" value={filter.tahun_ajaran} onChange={handleChange}
                className="border rounded-lg px-3 py-2">
                <option value="">-- Pilih Tahun Ajaran --</option>
                {tahunList.map((t, i) => (
                  <option key={t.id || i} value={t.id}>
                    {t.tahun_ajaran || t.nama}
                  </option>
                ))}
              </select>
            </div>

            {/* SEMESTER */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-600 uppercase">Semester</label>
              <select name="nama_semester" value={filter.nama_semester} onChange={handleChange}
                className="border rounded-lg px-3 py-2">
                <option value="">-- Pilih Semester --</option>
                {semesterList.map((s, i) => (
                  <option key={s.id || i} value={s.id}>
                    Semester {s.nama_semester}
                  </option>
                ))}
              </select>
            </div>

            {/* WALI KELAS */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-600 uppercase">Wali Kelas</label>
              <select name="wali" value={filter.wali} onChange={handleChange}
                className="border rounded-lg px-3 py-2">
                <option value="">-- Semua Wali --</option>
                {waliList.map((w, i) => (
                  <option key={w.id || i} value={w.id}>
                    {w.namaPegawai}
                  </option>
                ))}
              </select>
            </div>

            {/* MAPEL */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-600 uppercase">Mata Pelajaran</label>
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

        {/* RAPORT TABLE */}
        {siswaList.length > 0 && (
          <div className="mt-6">
            <div className="bg-green-600 text-white px-4 py-3 rounded-t-lg font-semibold mb-0">
              Data Raport - {siswaList.length} Siswa
            </div>
            {tableLoading ? (
              <div className="p-8 text-center">Loading raport data...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full bg-white border">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border px-4 py-2 text-left">Kriteria</th>
                      {siswaList.map(s => (
                        <th key={s.id} className="border px-2 py-2 text-center font-medium min-w-[120px]">
                          {s.nama || s.nama_siswa}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {['kkm', 'harian', 'ujian'].map(type => (
                      <tr key={type} className="hover:bg-gray-50">
                        <td className="border px-4 py-2 font-medium capitalize">{type.replace('_', ' ')}</td>
                        {siswaList.map(s => {
                          const siswaData = raportData[s.id] || {};
                          return (
                            <td key={s.id} className="border p-2">
                              <input 
                                type="number" 
                                min="1" max="100"
                                value={siswaData[type] || ''}
                                onChange={(e) => handleInputChange(s.id, type, e.target.value)}
                                className="w-full p-1 border rounded text-center text-sm"
                              />
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                    <tr>
                      <td className="border px-4 py-2 font-medium">Deskripsi</td>
                      {siswaList.map(s => {
                        const siswaData = raportData[s.id] || {};
                        return (
                          <td key={s.id} className="border p-2">
                            <textarea 
                              value={siswaData.deskripsi || ''}
                              onChange={(e) => handleInputChange(s.id, 'deskripsi', e.target.value)}
                              className="w-full p-1 border rounded text-sm resize-none" 
                              rows="2"
                              placeholder="Deskripsi nilai..."
                            />
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}