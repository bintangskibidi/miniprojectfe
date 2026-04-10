import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import Login from "./component/Login";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;