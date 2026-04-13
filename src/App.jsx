import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard";
import DataWaliKelas from "./component/DataWaliKelas";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/ambabord" element={<Dashboard />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/WaliKelas" element={<DataWaliKelas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;