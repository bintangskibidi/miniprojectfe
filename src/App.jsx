import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import ProfileSekolah from "./component/ManajemenSekolah/ProfileSekolah";
import DataWaliKelas from "./component/DataWaliKelas";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manajemen-sekolah" element={<ProfileSekolah />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
