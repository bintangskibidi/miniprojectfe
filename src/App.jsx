import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import Login from "./pages/login/Login";
import Dashboard from "./dashboard/Dashboard";
import ProfileSekolah from "./dashboard/manajemenSekolah/ProfileSekolah";
import DataWaliKelas from "./dashboard/manajemenSiswa/kesiswaan/DataWaliKelas";
import ManajemenGuru from "./dashboard/manajemenGuru/ManajemenGuru";
import ManajemenSiswa from "./dashboard/manajemenSiswa/ManajemenSiswa";
import ManajemenKeuangan from "./dashboard/manajemenKeuangan/ManajemenKeuangan";
 
   
import ManajemenPerputakaan from "./dashboard/perpustakaanDigital/ManajemenPerpustkaan";
import MataPelajaran from "./dashboard/manajemenGuru/MataPelajaran";
import SettingLokasi from "./dashboard/manajemenSekolah/SettingLokasi";
import DataSiswa from "./dashboard/manajemenSiswa/kesiswaan/dataSiswa/DataSiswa";
import DataKelas from "./dashboard/manajemenSiswa/kesiswaan/DataKelas";
import TahunAjaran from "./dashboard/manajemenSiswa/kesiswaan/TahunAjaran";
import Semester from "./dashboard/manajemenSiswa/e-raport/Semester";
import Tambahsiswa from "./dashboard/manajemenSiswa/kesiswaan/dataSiswa/AddDataSiswa";
import EditSiswa from "./dashboard/manajemenSiswa/kesiswaan/dataSiswa/EditDataSiswa";
import Extrakulikuler from "./dashboard/manajemenSiswa/kegiatan/extrakulikuler";
 
import Layout from "./component/sideBar/Layout";
import "./App.css";
import JadwalMengajar from "./dashboard/manajemenGuru/JadwalMengajar";
 import DataBuku from "./dashboard/perpustakaanDigital/DataBuku";
 
import DataJurusan from "./dashboard/manajemenSiswa/kesiswaan/DataJurusan";
import KenaikanKelas from "./dashboard/manajemenSiswa/kesiswaan/KenaikanKelas";
 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />

          <Route path="datasiswa" element={<DataSiswa />} />
          <Route path="databuku" element={<DataBuku />} />
          <Route path="walikelas" element={<DataWaliKelas />} />
          <Route path="semester" element={<Semester />} />

          <Route path="tambah-siswa" element={<Tambahsiswa />} />
          <Route path="ekstrakurikuler" element={<Extrakulikuler />} />

          <Route path="siswa" element={<ManajemenSiswa />} />
          <Route path="guru" element={<ManajemenGuru />} />
          <Route path="mapel" element={<MataPelajaran />} />
          <Route path="jadwalmengajar" element={<JadwalMengajar />} />

          <Route path="datajurusan" element={<DataJurusan />} />
          <Route path="kenaikankelas" element={<KenaikanKelas />} />
<Route path="edit-siswa/:id" element={<EditSiswa />} />
          <Route path="keuangan" element={<ManajemenKeuangan />} />
          <Route path="perpustakaan" element={<ManajemenPerputakaan />} />
          <Route path="profilesekolah" element={<ProfileSekolah />} />
          <Route path="settinglokasi" element={<SettingLokasi />} />

          <Route path="datakelas" element={<DataKelas />} />
          <Route path="tahunajaran" element={<TahunAjaran />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}