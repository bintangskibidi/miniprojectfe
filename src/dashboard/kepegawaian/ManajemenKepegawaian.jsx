import {
  UsersIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Sen", hadir: 10 },
  { name: "Sel", hadir: 12 },
  { name: "Rab", hadir: 9 },
  { name: "Kam", hadir: 14 },
  { name: "Jum", hadir: 13 },
  { name: "Sab", hadir: 8 },
  { name: "Min", hadir: 6 },
];

const Card = ({ title, value, icon: Icon, color }) => (
  <div className={`rounded-xl p-5 text-white shadow ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
      <Icon className="w-8 h-8 opacity-80" />
    </div>
  </div>
);

export default function Kepegawaian() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-4">
        Dashboard Manajemen Kepegawaian
      </h1>

      {/* Cards utama */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card
          title="Total Pegawai"
          value="17"
          icon={UsersIcon}
          color="bg-gradient-to-r from-purple-500 to-indigo-500"
        />
        <Card
          title="Kehadiran Bulan Ini"
          value="0%"
          icon={UsersIcon}
          color="bg-green-600"
        />
        <Card
          title="Pengajuan Lembur/Cuti"
          value="0"
          icon={DocumentTextIcon}
          color="bg-cyan-500"
        />
        <Card
          title="Payroll Diproses"
          value="0"
          icon={CurrencyDollarIcon}
          color="bg-yellow-500"
        />
      </div>

      {/* Cards tambahan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card
          title="Pegawai Belum Input Kinerja"
          value="1"
          icon={ExclamationTriangleIcon}
          color="bg-yellow-500"
        />
        <Card
          title="Total Guru"
          value="15"
          icon={UsersIcon}
          color="bg-blue-600"
        />
        <Card
          title="Total Staff"
          value="1"
          icon={UsersIcon}
          color="bg-yellow-500"
        />
      </div>

      {/* Grafik */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-semibold mb-4">Grafik Absensi (7 Hari)</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="hadir"
              stroke="#2563eb"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}