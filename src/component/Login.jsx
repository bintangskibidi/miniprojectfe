import React, { useState } from "react";
import logo from "../assets/EduSys.png"; 
import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import Swal from 'sweetalert2';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
  
    Swal.fire({
  position: "center",
  icon: "success",
  title: "berhasil login",
  showConfirmButton: false,
  timer: 1500
});
  };

  return (
    <div className="flex min-h-screen">

      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-orange-800 text-white w-1/2 p-10 py-12">
        <img src={logo} alt="Logo" className="w-40 mb-6" />
        <h1 className="text-3xl font-bold mb-2 text-center">
          EduSys || Sistem Manajemen Sekolah
        </h1>
        <p className="text-sm opacity-80 font-semibold text-center text-xl">
          Cepat dan Tanggap
        </p>
      </div>

      {/* Kanan form login */}
      <div className="flex flex-col justify-center items-center w-1/2 p- bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-8">Login Ke Aplikasi</h2>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6"
          autoComplete="off"
        >
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Masukkan email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>

      <div className="relative">
  <label
    htmlFor="password"
    className="block mb-2 text-sm font-medium text-gray-700"
  >
    Password
  </label>

  <input
    type={showPassword ? "text" : "password"}
    name="password"
    id="password"
    placeholder="Masukkan password"
    value={formData.password}
    onChange={handleChange}
    required
    className="w-full px-4 py-2 pr-10 rounded bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-gray-900 focus:outline-none my-12"
  >
    {showPassword ? (
      <RiEyeLine size={20} />
    ) : (
      <RiEyeOffLine size={20} />
    )}
  </button>
</div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="h-4 w-4 text-indigo-600 rounded border-gray-300"
            />
            <label
              htmlFor="remember"
              className="ml-2 text-sm text-gray-700 select-none"
            >
              Ingatkan Saya
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded transition"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}