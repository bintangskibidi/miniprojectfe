import React, { useState } from "react";
import Aduca from "../../assets/Aduca.png";

const ProfileSekolah = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [data, setData] = useState({
    nama: "",
    npsn: "",
    alamat: "",
    telepon: "",
    email: "",
    website: "",
    kepala: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    // ✅ FIX: layout full + aman dari kepotong
    <div className="min-h-screen flex bg-gray-100 font-sans">
      
      {/* CONTENT */}
      <div className="flex-1 p-8">

        {/* CARD */}
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
            
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shadow">
                <img
                  src={Aduca}
                  alt="logo"
                  className="w-10 h-10 object-contain"
                />
              </div>

              <div>
                {isEdit ? (
                  <>
                    <input
                      name="nama"
                      value={data.nama}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full mb-1"
                    />
                    <input
                      name="npsn"
                      value={data.npsn}
                      onChange={handleChange}
                      className="border px-2 py-1 rounded w-full text-sm"
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {data.nama || "-"}
                    </h2>
                    <p className="text-sm text-gray-500">
                      NPSN: {data.npsn}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => setIsEdit(!isEdit)}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow hover:opacity-90"
            >
              {isEdit ? "Simpan" : "Edit Profil"}
            </button>
          </div>

          <hr className="mb-6" />

          {/* DETAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">

            <div>
              <p className="font-semibold mb-1">Alamat</p>
              {isEdit ? (
                <input
                  name="alamat"
                  value={data.alamat}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <p className="text-gray-600">{data.alamat || "-"}</p>
              )}
            </div>

            <div>
              <p className="font-semibold mb-1">Telepon</p>
              {isEdit ? (
                <input
                  name="telepon"
                  value={data.telepon}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <p className="text-gray-600">{data.telepon || "-"}</p>
              )}
            </div>

            <div>
              <p className="font-semibold mb-1">Email</p>
              {isEdit ? (
                <input
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <p className="text-gray-600">{data.email || "-"}</p>
              )}
            </div>

            <div>
              <p className="font-semibold mb-1">Website</p>
              {isEdit ? (
                <input
                  name="website"
                  value={data.website}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <p className="text-blue-600">{data.website || "-"}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <p className="font-semibold mb-1">Kepala Sekolah</p>
              {isEdit ? (
                <input
                  name="kepala"
                  value={data.kepala}
                  onChange={handleChange}
                  className="border px-2 py-1 rounded w-full"
                />
              ) : (
                <p className="text-gray-600">{data.kepala || "-"}</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSekolah;