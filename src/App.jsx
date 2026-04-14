import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./component/landingPage/LandingPage";
import Login from "./pages/login/Login";
import Dashboard from "./dashboard/Dashboard";
import ProfileSekolah from "./dashboard/manajemenSekolah/ProfileSekolah";
import DataWaliKelas from "./dashboard/manajemenSiswa/DataWaliKelas";
import ManajemenGuru from "./dashboard/manajemenGuru/ManajemenGuru";
import ManajemenSiswa from "./dashboard/manajemenSiswa/ManajemenSiswa";
import ManajemenKeuangan from "./dashboard/manajemenKeuangan/ManajemenKeuangan";
import ManajemenPerputakaan from "./dashboard/perpustakaanDigital/ManajemenPerpustkaan"
import Layout from "./component/sideBar/Layout";
 
import "./App.css";

function App() {
  return (
   <BrowserRouter>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />

    {/* ✅ Layout jadi parent */}
    <Route path="/dashboard" element={<Layout />}>
      {/* halaman utama dashboard */}
      <Route index element={<Dashboard />} />

      <Route path="walikelas" element={<DataWaliKelas />} />
      <Route path="siswa" element={<ManajemenSiswa />} />
      <Route path="guru" element={<ManajemenGuru />} />
      <Route path="keuangan" element={<ManajemenKeuangan />} />
      <Route path="perpustakaan" element={<ManajemenPerputakaan />} />
      <Route path="profilSekolah" element={<ProfileSekolah />} />
    </Route>
  </Routes>
</BrowserRouter>
  );
}

export default App;
