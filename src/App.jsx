import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import Login from "./pages/login/Login";
import Dashboard from "./dashboard/Dashboard";
import ProfileSekolah from "./dashboard/manajemenSekolah/ProfileSekolah";
import DataWaliKelas from "./dashboard/manajemenSiswa/DataWaliKelas";
import ManajemenGuru from "./dashboard/manajemenGuru/ManajemenGuru";
import ManajemenSiswa from "./dashboard/manajemenSiswa/ManajemenSiswa";
import ManajemenKeuangan from "./dashboard/manajemenKeuangan/ManajemenKeuangan";
import ManajemenPerputakaan from "./dashboard/perpustakaanDigital/ManajemenPerpustkaan"
import MataPelajaran from "./dashboard/manajemenGuru/MataPelajaran"
import SettingLokasi from "./dashboard/manajemenSekolah/SettingLokasi"
import DataKelas from "./dashboard/manajemenSiswa/DataKelas";
import TahunAjaran from "./dashboard/manajemenSiswa/TahunAjaran";
import Layout from "./component/sideBar/Layout";
 
import "./App.css";
import JadwalMengajar from "./dashboard/manajemenGuru/JadwalMengajar";
import DataJurusan from "./dashboard/manajemenSiswa/DataJurusan";
import KenaikanKelas from "./dashboard/manajemenSiswa/KenaikanKelas";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
 

    {/* ✅ Layout jadi parent */}
    <Route path="/dashboard" element={<Layout />}>


      <Route path="walikelas" element={<DataWaliKelas />} />
      <Route path="siswa" element={<ManajemenSiswa />} />
      <Route path="guru" element={<ManajemenGuru />} />
      <Route path="/dashboard/mapel" element={<MataPelajaran />} />
      <Route path="/dashboard/JadwalMengajar" element={<JadwalMengajar />} />
      <Route path="/dashboard/datajurusan" element={<DataJurusan />} />
      <Route path="/dashboard/kenaikankelas" element={<KenaikanKelas />} />
      <Route path="keuangan" element={<ManajemenKeuangan />} />
      <Route path="perpustakaan" element={<ManajemenPerputakaan />} />
      <Route path="profileSekolah" element={<ProfileSekolah />} />
      <Route path="settinglokasi" element={<SettingLokasi />} />
      <Route path="datakelas" element={<DataKelas />} />
      <Route path="tahunajaran" element={<TahunAjaran />} />

    </Route>
  </Routes>
</BrowserRouter>
  );
}

export default App;
