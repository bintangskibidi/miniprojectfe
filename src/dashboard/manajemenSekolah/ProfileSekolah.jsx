import React, { useState } from "react";
import Aduca from "../../assets/Aduca.png";
import { useNavigate } from "react-router-dom";

const ManajemenSekolah = () => {
  const navigate = useNavigate();

  // STATE DATA SEKOLAH
  const [isEdit, setIsEdit] = useState(false);

  const [data, setData] = useState({
    nama: "Sekolah Sampel Mobte",
    npsn: "0912374",
    alamat: "Jl. Lembarawa",
    telepon: "021-233-4343",
    email: "mobilecode@gmail.com",
    website: "www.acount.id",
    kepala: "Bayu Aji",
  });

  // HANDLE INPUT
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-6 bg-gradient-to-r from-orange-700 to-indigo-600 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="flex items-center gap-3 text-white">
          <img
            src={Aduca}
            alt="logo"
            className="h-12 w-12 bg-white p-1 rounded-xl"
          />
          <div>
            <h1 className="text-xl font-bold">Aduca</h1>
            <p className="text-sm opacity-80">Sistem Manajemen Digital</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
        >
          Kembali
        </button>
      </div>

      {/* CONTENT */}
      <main
        className="flex-1 pt-28 pb-10 px-6"
        style={{
          backgroundColor: "#f8fafc",
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div className="max-w-5xl mx-auto">
          
          <div className="bg-white rounded-2xl shadow-md p-6">

            {/* TOP */}
            <div className="flex justify-between items-center mb-6">
              
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center shadow">
                  <img
                    src={Aduca}
                    alt="logo sekolah"
                    className="w-14 h-14 object-contain"
                  />
                </div>

                <div>
                  {isEdit ? (
                    <>
                      <input
                        name="nama"
                        value={data.nama}
                        onChange={handleChange}
                        className="border p-1 rounded w-full mb-1"
                      />
                      <input
                        name="npsn"
                        value={data.npsn}
                        onChange={handleChange}
                        className="border p-1 rounded w-full text-sm"
                      />
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {data.nama}
                      </h2>
                      <p className="text-sm text-gray-500">
                        NPSN: {data.npsn}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* BUTTON EDIT / SIMPAN */}
              <button
                onClick={() => setIsEdit(!isEdit)}
                className="bg-gradient-to-r from-orange-500 to-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-90"
              >
                {isEdit ? "Simpan" : "Edit Profil"}
              </button>
            </div>

            <hr className="mb-6" />

            {/* DETAIL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">

              {/* ALAMAT */}
              <div className="flex items-start gap-3">
                <span className="text-red-500 text-xl">📍</span>
                <div className="w-full">
                  <p className="font-semibold">Alamat</p>
                  {isEdit ? (
                    <input
                      name="alamat"
                      value={data.alamat}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    <p className="text-gray-500">{data.alamat}</p>
                  )}
                </div>
              </div>

              {/* TELEPON */}
              <div className="flex items-start gap-3">
                <span className="text-green-500 text-xl">📞</span>
                <div className="w-full">
                  <p className="font-semibold">Telepon</p>
                  {isEdit ? (
                    <input
                      name="telepon"
                      value={data.telepon}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    <p className="text-gray-500">{data.telepon}</p>
                  )}
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex items-start gap-3">
                <span className="text-yellow-500 text-xl">✉️</span>
                <div className="w-full">
                  <p className="font-semibold">Email</p>
                  {isEdit ? (
                    <input
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    <p className="text-gray-500">{data.email}</p>
                  )}
                </div>
              </div>

              {/* WEBSITE */}
              <div className="flex items-start gap-3">
                <span className="text-blue-500 text-xl">🌐</span>
                <div className="w-full">
                  <p className="font-semibold">Website</p>
                  {isEdit ? (
                    <input
                      name="website"
                      value={data.website}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    <p className="text-indigo-600">{data.website}</p>
                  )}
                </div>
              </div>

              {/* KEPALA */}
              <div className="flex items-start gap-3 md:col-span-2">
                <span className="text-gray-500 text-xl">👤</span>
                <div className="w-full">
                  <p className="font-semibold">Kepala Sekolah</p>
                  {isEdit ? (
                    <input
                      name="kepala"
                      value={data.kepala}
                      onChange={handleChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    <p className="text-gray-500">{data.kepala}</p>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-auto bg-blue-900 text-gray-200 text-sm py-3 px-6 text-center">
        © 2024 A-Count. All rights reserved.
      </footer>
    </div>
  );
};

export default ManajemenSekolah;