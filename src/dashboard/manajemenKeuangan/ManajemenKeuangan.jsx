import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Wallet, Download, ShoppingCart, ArrowUpCircle, PieChart } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const PaymentDashboard = () => {
  const barData = {
    labels: ['Juli', 'Agustus', 'Sept', 'Okt', 'Nov', 'Des', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Juni'],
    datasets: [{
      label: 'Total Pembayaran',
      data: [0, 0, 0, 0, 0, 2560000, 580000, 0, 0, 0, 0, 0],
      backgroundColor: '#3b82f6',
    }],
  };

  const pieData = {
    labels: ['Terealisasi', 'Belum Terealisasi'],
    datasets: [{
      data: [3140000, 431230000],
      backgroundColor: ['#22c55e', '#ef4444'],
    }],
  };

  return (
    <div className="bg-gray-100 p-6 rounded-xl shadow-inner mb-10">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
        <Wallet size={20} className="text-blue-600" /> Ringkasan Pembayaran TA. 2025/2026
      </h2>
      
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Pembayaran April', val: 'Rp 0', icon: <Download className="text-blue-500" /> },
          { label: 'Penerimaan April', val: 'Rp 0', icon: <ShoppingCart className="text-green-500" /> },
          { label: 'Belanja April', val: 'Rp 0', icon: <ArrowUpCircle className="text-red-400" /> },
          { label: 'Surplus Bulan Ini', val: 'Rp 0', icon: <PieChart className="text-emerald-500" /> },
        ].map((item, i) => (
          <div key={i} className="bg-white p-4 rounded shadow-sm flex justify-between items-center border-t-4 border-blue-500">
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{item.label}</p>
              <p className="text-lg font-bold">0</p>
            </div>
            <div className="bg-gray-50 p-2 rounded-full">{item.icon}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2 bg-white rounded shadow-sm overflow-hidden border border-gray-200">
          <div className="bg-blue-600 text-white p-3 font-bold text-sm">Rincian Tunggakan</div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3">Kategori</th>
                  <th className="p-3 text-right">Nominal</th>
                  <th className="p-3 text-right">Ketetapan</th>
                  <th className="p-3 text-center">Kekurangan</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-600">
                <TableRow name="LKS Semester 1" nom="1.850.000" ket="62.200.000" kur="60.350.000" />
                <TableRow name="Kalender" nom="140.000" ket="4.020.000" kur="3.880.000" />
                <TableRow name="SPP Madrasah" nom="750.000" ket="301.500.000" kur="300.750.000" />
                <tr className="bg-gray-100 font-bold text-gray-800">
                  <td className="p-3 text-center">Total</td>
                  <td className="p-3 text-right">Rp 3.140.000</td>
                  <td className="p-3 text-right">Rp 434.370.000</td>
                  <td className="p-3 text-center text-red-600">Rp 431.230.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Realization Chart */}
        <div className="bg-white rounded shadow-sm p-4 border border-gray-200">
          <div className="bg-cyan-500 text-white p-2 text-center font-bold mb-6 rounded text-sm">Persentase Realisasi</div>
          <div className="h-48 flex justify-center">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ name, nom, ket, kur }) => (
  <tr>
    <td className="p-3 text-blue-600 font-semibold">{name}</td>
    <td className="p-3 text-right">Rp {nom}</td>
    <td className="p-3 text-right text-gray-400">Rp {ket}</td>
    <td className="p-3 bg-yellow-400 font-bold text-center text-gray-900">Rp {kur}</td>
  </tr>
);

export default PaymentDashboard;