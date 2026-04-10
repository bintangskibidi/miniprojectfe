import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Tambahkan ini untuk navigasi
import logo from "../assets/EduSys.png"; 
import { RiEyeLine, RiEyeOffLine, RiLoginBoxLine } from "@remixicon/react";
import Swal from 'sweetalert2';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Inisialisasi navigasi

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi data spesifik sesuai permintaan Anda
    if (formData.email !== "nabil@gmail.com" || formData.password !== "password123") {
      Swal.fire({
        icon: "error",
        title: "Login Gagal",
        text: "Email atau Password salah!",
        confirmButtonColor: "#4f46e5"
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Jika API mengembalikan data (seperti token), Anda bisa menyimpannya di sini
        // const data = await response.json();
        // localStorage.setItem("token", data.access_token);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil Login",
          text: "Selamat datang kembali di EduSys!",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'rounded-xl'
          }
        });

       
        setTimeout(() => {
          navigate("/Dashboard");
        }, 1500);

      } else {
        throw new Error("Gagal terhubung ke server");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Kesalahan Koneksi",
        text: "Gagal menghubungi server API. Pastikan backend berjalan.",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
     
      <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-indigo-900 via-blue-800 to-orange-500 text-white w-1/2 p-12 relative overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-orange-400 opacity-20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <img src={logo} alt="Logo" className="w-30 mx-auto mb-8 drop-shadow-2xl animate-float" />
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
            Aduca <span className="text-orange-300">||</span> EduSys
          </h1>
          <div className="h-1 w-20 bg-orange-400 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl font-light italic opacity-90">
            "Solusi Digital Manajemen Sekolah yang Cepat, Tanggap, dan Terintegrasi."
          </p>
        </div>
      </div>

      {/* Sisi Kanan: Form Login */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 sm:p-12">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Selamat Datang</h2>
            <p className="text-gray-500 mt-2">Silakan masuk ke akun Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
                Alamat Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="nama@gmail.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" title="password" className="block mb-2 text-sm font-semibold text-gray-700">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <RiEyeLine size={20} /> : <RiEyeOffLine size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-600 cursor-pointer select-none">
                  Ingat saya
                </label>
              </div>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                Lupa password?
              </a>
            </div>

            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-indigo-200"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <RiLoginBoxLine className="h-5 w-5 text-indigo-300 group-hover:text-white transition-colors" />
              </span>
              Masuk
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-gray-400 uppercase tracking-widest">
            © 2026 EduSys Management
          </p>
        </div>
      </div>
    </div>
  );
}