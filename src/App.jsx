import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./component/landingPage/LandingPage";
import Login from "./pages/login/Login";
import Dashboard from "./dashboard/Dashboard";
import ProfileSekolah from "./dashboard/manajemenSekolah/ProfileSekolah";
import DataWaliKelas from "./dashboard/manajemenSekolah/DataWaliKelas";
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
        <Route path="/dashboard" element={<Dashboard />} />

<Route path="/dashboard" element={<Layout />}>
  <Route path="siswa" element={<ManajemenSiswa />} />
  <Route path="guru" element={<ManajemenGuru />} />
  <Route path="keuangan" element={<ManajemenKeuangan />} />
  <Route path="perpustakaan" element={<ManajemenPerputakaan />} />
</Route>
          <Route path="profilSekolah" element={<ProfileSekolah />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
