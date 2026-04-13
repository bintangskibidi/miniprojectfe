import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
 
import DataWaliKelas from "./component/DataWaliKelas";
=======
import ManajemenGuru from "./component/manajemenguru";
import DashboardGuru from "./component/dashboardguru";
 
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
 
        <Route path="/WaliKelas" element={<DataWaliKelas />} />
 
        <Route path="/manajemenguru" element={<ManajemenGuru />} />
        <Route path="/dashboardguru" element={<DashboardGuru />} />
 
      </Routes>
    </BrowserRouter>
  );
}

export default App;