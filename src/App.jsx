import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import Login from "./pages/login/Login";
import Dashboard from "./dashboard/Dashboard";
import ProfileSekolah from "./dashboard/manajemenSekolah/ProfileSekolah";
import DataWaliKelas from "./dashboard/manajemenSiswa/kesiswaan/DataWaliKelas";
import ManajemenGuru from "./dashboard/manajemenGuru/ManajemenGuru";
import ManajemenSiswa from "./dashboard/manajemenSiswa/ManajemenSiswa";
import ManajemenKeuangan from "./dashboard/manajemenKeuangan/ManajemenKeuangan";
import LaporanBukuBesar from "./dashboard/manajemenKeuangan/LaporanBukuBesar";
import ManajemenPerputakaan from "./dashboard/perpustakaanDigital/ManajemenPerpustkaan";
import MataPelajaran from "./dashboard/manajemenGuru/MataPelajaran";
import SettingLokasi from "./dashboard/manajemenSekolah/SettingLokasi";
import DataSiswa from "./dashboard/manajemenSiswa/kesiswaan/dataSiswa/DataSiswa";
import DataKelas from "./dashboard/manajemenSiswa/kesiswaan/dataKelas/DataKelas";
import TahunAjaran from "./dashboard/manajemenSiswa/kesiswaan/TahunAjaran";
import Semester from "./dashboard/manajemenSiswa/e-raport/Semester";
import Tambahsiswa from "./dashboard/manajemenSiswa/kesiswaan/dataSiswa/AddDataSiswa";
import EditSiswa from "./dashboard/manajemenSiswa/kesiswaan/dataSiswa/EditDataSiswa";
import Extrakulikuler from "./dashboard/manajemenSiswa/kegiatan/extrakulikuler";
import Layout from "./component/sideBar/Layout";
import "./App.css";
import JadwalMengajar from "./dashboard/manajemenGuru/JadwalMengajar";
import DistribusiJam from "./dashboard/manajemenGuru/DistribusiJam";
import RiwayatMengajar from "./dashboard/manajemenGuru/RiwayatMengajar";
import DataJurusan from "./dashboard/manajemenSiswa/kesiswaan/dataJurusan/DataJurusan";
import KenaikanKelas from "./dashboard/manajemenSiswa/kesiswaan/KenaikanKelas";
import JenisSemester from "./dashboard/manajemenSiswa/e-raport/JenisSemester";
import AspekPenilaian from "./dashboard/manajemenSiswa/e-raport/AspekPenilaian";
import AbsensiHarian from "./dashboard/absensi/absensiharian";
import RekapAbsensi from "./dashboard/absensi/rekapabsensi";
import AbsensiMapel from "./dashboard/absensi/absensimapel";
import DataRaport from "./dashboard/manajemenSiswa/e-raport/DataRaport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/dashboard" element={<Layout />}>
          <Route path="datasiswa" element={<DataSiswa />} />
          <Route path="walikelas" element={<DataWaliKelas />} />
          <Route path="Semester" element={<Semester />} />
          <Route
            path="/dashboard/ekstrakurikuler"
            element={<Extrakulikuler />}
          />

          <Route path="siswa" element={<ManajemenSiswa />} />
          <Route path="guru" element={<ManajemenGuru />} />
          <Route path="/dashboard/mapel" element={<MataPelajaran />} />
          <Route path="/dashboard/distribusijam" element={<DistribusiJam />} />
          <Route path="/dashboard/RiwayatMengajar" element={<RiwayatMengajar />} />
          <Route
            path="/dashboard/JadwalMengajar"
            element={<JadwalMengajar />}
          />
          <Route path="datajurusan" element={<DataJurusan />} />
          <Route path="/dashboard/tambah-siswa" element={<Tambahsiswa />} />
          <Route path="/dashboard/edit-siswa/:id" element={<EditSiswa />} />
          <Route path="kenaikankelas" element={<KenaikanKelas />} />
          <Route path="keuangan" element={<ManajemenKeuangan />} />
          <Route path="LaporanBukuBesar" element={<LaporanBukuBesar />} />
          <Route path="perpustakaan" element={<ManajemenPerputakaan />} />
          <Route path="profileSekolah" element={<ProfileSekolah />} />
          <Route path="settinglokasi" element={<SettingLokasi />} />
          <Route path="datakelas" element={<DataKelas />} />
          <Route path="tahunajaran" element={<TahunAjaran />} />
          <Route path="jenissemester" element={<JenisSemester />} />
          <Route path="absensiharian" element={<AbsensiHarian />} />
          <Route path="rekapabsensi" element={<RekapAbsensi />} />
          <Route path="absensimapel" element={<AbsensiMapel />} />
          <Route path="aspekpenilaian" element={<AspekPenilaian />} />
          <Route path="dataraport" element={<DataRaport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
