import React, { useState } from "react";
import Aduca from "../../assets/Aduca.png";

const ProfileSekolah = () => {
  const [isEdit, setIsEdit] = useState(false);

  const [data, setData] = useState({
    nama: "",
    npsn: "0912374",
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
    <div className="min-h-screen flex flex-col font-sans pl-64 bg-gray-100">
      <main className="flex-1 pt-20 pb-10 px-8 mr-50">
        <div className="w-full">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
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
                      <h2 className="text-xl font-semibold text-gray-800">
                        {data.nama}
                      </h2>
                      <p className="text-sm text-gray-500">NPSN: {data.npsn}</p>
                    </>
                  )}
                </div>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => setIsEdit(!isEdit)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
              >
                {isEdit ? "Simpan" : "Edit Profil"}
              </button>
            </div>

            <hr className="mb-6" />

            {/* DETAIL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <p className="font-semibold">Alamat:</p>
                {isEdit ? (
                  <input
                    name="alamat"
                    value={data.alamat}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  <p>{data.alamat}</p>
                )}
              </div>

              <div>
                <p className="font-semibold">Telepon:</p>
                {isEdit ? (
                  <input
                    name="telepon"
                    value={data.telepon}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  <p>{data.telepon}</p>
                )}
              </div>

              <div>
                <p className="font-semibold">Email:</p>
                {isEdit ? (
                  <input
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  <p>{data.email}</p>
                )}
              </div>

              <div>
                <p className="font-semibold">Website:</p>
                {isEdit ? (
                  <input
                    name="website"
                    value={data.website}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  <p className="text-blue-600">{data.website}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <p className="font-semibold">Kepala Sekolah:</p>
                {isEdit ? (
                  <input
                    name="kepala"
                    value={data.kepala}
                    onChange={handleChange}
                    className="border p-1 rounded w-full"
                  />
                ) : (
                  <p>{data.kepala}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSekolah;
