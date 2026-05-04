import React, { useState } from "react";

export default function JenisPembayaran() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="bg-white border rounded-md shadow-sm">
                {/* Header */}
                <div className="border-b px-6 py-4">
                    <h1 className="text-3xl font-semibold text-gray-800">
                        Jenis Pembayaran
                    </h1>
                </div>

                {/* Form */}
                <div className="p-6">
                    <div className="border rounded-md overflow-hidden">
                        <div className="bg-gray-50 border-b px-4 py-3 text-lg font-medium text-gray-700">
                            Form Tambah Jenis Pembayaran
                        </div>

                        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Side */}
                            <div className="space-y-5">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Kode Akun Pembayaran
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan kode akun pembayaran"
                                        className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 hover focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Nama Akun Pembayaran
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Masukkan nama akun pembayaran"
                                        className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Tipe
                                    </label>
                                    <select className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Bebas</option>
                                        <option>Bulanan</option>                                    
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Pilih Status</option>
                                        <option>Aktif</option>
                                        <option>Tidak Aktif</option>
                                    </select>
                                </div>
                            </div>

                            {/* Right Side */}
                            <div className="space-y-5">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Akun Harta
                                    </label>
                                    <select className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Pilih Akun Harta</option>
                                        <option>-</option>
                                        <option>1.0.1 - Kas</option>
                                        <option>1.0.2 - Kas Di Bank</option>
                                        <option>2.0.2 - Pendapatan SPP</option>
                                        <option>4.0.4 - Pendapatan BOS</option>
                                        <option>4.0.6 -Pendapatan Kegiatan</option>
                                        <option>4.1.4 - Utang Bank</option>
                                        <option>4004 - Pendapatan Tunggakan</option>
                                        <option>5.0.1 - Beban Lainnya</option>
                                        <option>5.0.2 - Beban Operasional Guru</option>
                                        <option>5.0.9 - Beban Gaji Guru dan Karyawan</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Akun Pendapatan
                                    </label>
                                    <select className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Pilih Akun Pendapatan</option>
                                        <option>-</option>
                                        <option>1.0.1 - Kas</option>
                                        <option>1.0.2 - Kas Di Bank</option>
                                        <option>2.0.2 - Pendapatan SPP</option>
                                        <option>4.0.4 - Pendapatan BOS</option>
                                        <option>4.0.6 -Pendapatan Kegiatan</option>
                                        <option>4.1.4 - Utang Bank</option>
                                        <option>4004 - Pendapatan Tunggakan</option>
                                        <option>5.0.1 - Beban Lainnya</option>
                                        <option>5.0.2 - Beban Operasional Guru</option>
                                        <option>5.0.9 - Beban Gaji Guru dan Karyawan</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-700">
                                        Akun Hutang
                                    </label>
                                    <select className="w-full border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Pilih Akun Hutang</option>
                                        <option>-</option>
                                        <option>1.0.1 - Kas</option>
                                        <option>1.0.2 - Kas Di Bank</option>
                                        <option>2.0.2 - Pendapatan SPP</option>
                                        <option>4.0.4 - Pendapatan BOS</option>
                                        <option>4.0.6 -Pendapatan Kegiatan</option>
                                        <option>4.1.4 - Utang Bank</option>
                                        <option>4004 - Pendapatan Tunggakan</option>
                                        <option>5.0.1 - Beban Lainnya</option>
                                        <option>5.0.2 - Beban Operasional Guru</option>
                                        <option>5.0.9 - Beban Gaji Guru dan Karyawan</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Button */}
                        <div className="px-4 pb-5">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

