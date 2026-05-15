import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import Login from "./pages/login/Login";
import Dashboard from "./dashboard/Dashboard";
import ProfileSekolah from "./dashboard/manajemenSekolah/ProfileSekolah";
import DataAset from "./dashboard/manajemenSekolah/DataAset";
import PeminjamanAset from "./dashboard/manajemenSekolah/PeminjamanAset";
import RiwayatPeminjaman from "./dashboard/manajemenSekolah/RiwayatPeminjaman";
import MaintenanceAset from "./dashboard/manajemenSekolah/MaintenanceAset";
import DepresiasiAset from "./dashboard/manajemenSekolah/DepresiasiAset";
import SuratMenyurat from "./dashboard/manajemenSekolah/SuratMenyurat";
import KegiatanSekolah from "./dashboard/manajemenSekolah/KegiatanSekolah";
import DokumenSekolah from "./dashboard/manajemenSekolah/DokumenSekolah";
import LaporanAset from "./dashboard/manajemenSekolah/LaporanAset";
import DataWaliKelas from "./dashboard/manajemenSiswa/kesiswaan/DataWaliKelas";
import ManajemenGuru from "./dashboard/manajemenGuru/ManajemenGuru";
import ManajemenSiswa from "./dashboard/manajemenSiswa/ManajemenSiswa";
import ManajemenKeuangan from "./dashboard/manajemenKeuangan/ManajemenKeuangan";
import LaporanBukuBesar from "./dashboard/manajemenKeuangan/LaporanBukuBesar";
import LaporanJurnal from "./dashboard/manajemenKeuangan/LaporanJurnal";
import LaporanKomprehensif from "./dashboard/manajemenKeuangan/LaporanKomprehensif";
import NeracaSaldo from "./dashboard/manajemenKeuangan/NeracaSaldo";
import JurnalUmum from "./dashboard/manajemenKeuangan/JurnalUmum";
import TunggakanSiswa from "./dashboard/manajemenKeuangan/TunggakanSiswa";
import  BayarTagihan from "./dashboard/manajemenKeuangan/BayarTagihan";
import TagihanBulanIni from "./dashboard/manajemenKeuangan/TagihanBulanIni";
import RiwayatTransaksi from "./dashboard/manajemenKeuangan/RiwayatTransaksi";
import LaporanPengeluaran from "./dashboard/manajemenKeuangan/LaporanPengeluaran";
import Teller from "./dashboard/manajemenKeuangan/Teller";
import RealisasiAnggaran from "./dashboard/manajemenKeuangan/RealisasiAnggaran";
import EvaluasiAnggaran from "./dashboard/manajemenKeuangan/EvaluasiAnggaran";
import PerubahanAsetNeto from "./dashboard/manajemenKeuangan/PerubahanAsetNeto";
 
import PosisiKeuangan from "./dashboard/manajemenKeuangan/PosisiKeuangan";
import ArusKas from "./dashboard/manajemenKeuangan/ArusKas";
import LaporanPenerimaan from "./dashboard/manajemenKeuangan/LaporanPenerimaan";
import JenisPenerimaan from "./dashboard/manajemenKeuangan/JenisPenerimaan";
import JenisPengeluaran from "./dashboard/manajemenKeuangan/JenisPengeluaran";
import DataTransaksi from "./dashboard/manajemenKeuangan/DataTransaksi";
import DataPegawai from "./dashboard/kepegawaian/DataPegawai";
import KelolaIndikator from "./dashboard/kepegawaian/KelolaIndikator";
import RekapKinerja from "./dashboard/kepegawaian/RekapKinerja";
import KelolaKegiatan from "./dashboard/kepegawaian/KelolaKegiatan";
import AbsenKegiatan from "./dashboard/kepegawaian/AbsenKegiatan";
import RekapAbsenKegiatan from "./dashboard/kepegawaian/RekapAbsenKegiatan";
import Cuti from "./dashboard/kepegawaian/Cuti";
import AbsensiHarianPegawai from "./dashboard/kepegawaian/AbsensiHarianPegawai";
import SettingGajiPegawai from "./dashboard/kepegawaian/SettingGajiPegawai";
import Izin from "./dashboard/kepegawaian/Izin";
import Lembur from "./dashboard/kepegawaian/Lembur";

import InputNilaiKinerja from "./dashboard/kepegawaian/InputNilaiKinerja";
import TransaksiJurnal from "./dashboard/manajemenKeuangan/TransaksiJurnal";
import TransaksiPenerimaan from "./dashboard/manajemenKeuangan/TransaksiPenerimaan";
import JenisPembayaran from "./dashboard/manajemenKeuangan/JenisPembayaran";
import RekapPembayaran from "./dashboard/manajemenKeuangan/RekapPembayaran";
import RekapTagihan from "./dashboard/manajemenKeuangan/RekapTagihan";
import RekapPerTanggal from "./dashboard/manajemenKeuangan/RekapPerTanggal";
import RekapPerSiswa from "./dashboard/manajemenKeuangan/RekapPerSiswa";
import RealisasiPenerimaan from "./dashboard/manajemenKeuangan/RealisasiPenerimaan";
import RealisasiBelanja from "./dashboard/manajemenKeuangan/RealisasiBelanja";
import SettingPagu from "./dashboard/manajemenKeuangan/SettingPagu";
import APBSinduk from "./dashboard/manajemenKeuangan/APBSinduk";
import APBSDetail from "./dashboard/manajemenKeuangan/APBSDetail";
import TarifPembayaranSiswa from "./dashboard/manajemenKeuangan/TarifPembayaranSiswa";
import RiwayatTabunganSiswa from "./dashboard/manajemenKeuangan/RiwayatTabunganSiswa";
import ManajemenPerputakaan from "./dashboard/perpustakaanDigital/ManajemenPerpustkaan";
import LaporanBuku from "./dashboard/perpustakaanDigital/LaporanBuku";
import LaporanDenda from "./dashboard/perpustakaanDigital/LaporanDenda";
import LaporanPeminjamanBuku from "./dashboard/perpustakaanDigital/LaporanPeminjamanBuku";
import LaporanPengembalianbuku from "./dashboard/perpustakaanDigital/LaporanPengembalianBuku";
import DataBuku from "./dashboard/perpustakaanDigital/DataBuku";
import PeminjamanBuku from "./dashboard/perpustakaanDigital/PeminjamanBuku";
import PengembalianBuku from "./dashboard/perpustakaanDigital/PengembalianBuku";
import SettingDenda from "./dashboard/perpustakaanDigital/SettingDenda";
 
import MataPelajaran from "./dashboard/manajemenGuru/MataPelajaran";
import SettingLokasi from "./dashboard/manajemenSekolah/SettingLokasi";
import DataSiswa from "./dashboard/manajemenSiswa/kesiswaan/dataSiswa/DataSiswa";
import DataKelas from "./dashboard/manajemenSiswa/kesiswaan/dataKelas/DataKelas";
import TahunAjaran from "./dashboard/manajemenSiswa/kesiswaan/TahunAjaran";
import Semester from "./dashboard/manajemenSiswa/e-raport/Semester";
import Tambahsiswa from "./dashboard/manajemenSiswa/kesiswaan/dataSiswa/AddDataSiswa";
import EditSiswa from "./dashboard/manajemenSiswa/kesiswaan/dataSiswa/EditDataSiswa";
import Extrakulikuler from "./dashboard/manajemenSiswa/kegiatan/extrakulikuler";
import Layout from "./component/sideBar/Layout";
import "./App.css";
import JadwalMengajar from "./dashboard/manajemenGuru/JadwalMengajar";
import DistribusiJam from "./dashboard/manajemenGuru/DistribusiJam";
import RiwayatMengajar from "./dashboard/manajemenGuru/RiwayatMengajar";
import DataJurusan from "./dashboard/manajemenSiswa/kesiswaan/dataJurusan/DataJurusan";
import KenaikanKelas from "./dashboard/manajemenSiswa/kesiswaan/KenaikanKelas";
import JenisSemester from "./dashboard/manajemenSiswa/e-raport/JenisSemester";
import AspekPenilaian from "./dashboard/manajemenSiswa/e-raport/AspekPenilaian";
import AbsensiHarian from "./dashboard/absensi/absensiharian";
import RekapAbsensi from "./dashboard/absensi/rekapabsensi";
import AbsensiMapel from "./dashboard/absensi/absensimapel";
import DataRaport from "./dashboard/manajemenSiswa/e-raport/DataRaport";

import ManajemenKepegawaian from "./dashboard/kepegawaian/ManajemenKepegawaian"
import Presensi from "./dashboard/absensi/presensi";
import RiwayatGaji from "./dashboard/kepegawaian/RiwayatGaji";
import KriteriaKehadiran from "./dashboard/kepegawaian/KriteriaKehadiran";

import Aplikasi from "./dashboard/aplikasi/Aplikasi"
import InformasiLembaga from "./dashboard/aplikasi/InformasiLembaga"
import BannerAplikasi from "./dashboard/aplikasi/BannerAplikasi"
import SettingUser from "./dashboard/aplikasi/SettingUser"
import BackupData from "./dashboard/aplikasi/BackupData"
import SettingAbsensiGPS from "./dashboard/aplikasi/SettingAbsensiGPS"
 import SettingKomponenGaji from "./dashboard/kepegawaian/SettingKomponenGaji";
 import ManajemenTanggal from "./dashboard/kepegawaian/ManajemenTanggal";
import DanaPensiunPegawai from "./dashboard/kepegawaian/DanaPensiunPegawai";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
         <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/dashboard" element={<Layout />}>
        

          <Route path="datasiswa" element={<DataSiswa />} />
          <Route path="walikelas" element={<DataWaliKelas />} />
          <Route path="Semester" element={<Semester />} />
          <Route
            path="/dashboard/ekstrakurikuler"
            element={<Extrakulikuler />}
          />

          <Route path="siswa" element={<ManajemenSiswa />} />
          <Route path="guru" element={<ManajemenGuru />} />
          <Route path="/dashboard/mapel" element={<MataPelajaran />} />
          <Route path="/dashboard/distribusijam" element={<DistribusiJam />} />
          <Route path="/dashboard/RiwayatMengajar" element={<RiwayatMengajar />} />
          <Route
            path="/dashboard/JadwalMengajar"
            element={<JadwalMengajar />}
          />
          <Route path="datajurusan" element={<DataJurusan />} />
          <Route path="/dashboard/tambah-siswa" element={<Tambahsiswa />} />
          <Route path="/dashboard/edit-siswa/:id" element={<EditSiswa />} />
          <Route path="kenaikankelas" element={<KenaikanKelas />} />
          <Route path="keuangan" element={<ManajemenKeuangan />} />
          <Route path="kepegawaian" element={<ManajemenKepegawaian />} />
          <Route path="AbsenKegiatan" element={<AbsenKegiatan />} />
          <Route path="Cuti" element={<Cuti />} />
          <Route path="RekapAbsensiHarian" element={<AbsensiHarianPegawai />} />
          <Route path="SettingGajiPegawai" element={<SettingGajiPegawai />} />
          <Route path="Izin" element={<Izin />} />
          <Route path="Lembur" element={<Lembur />} />
          <Route path="RekapAbsenKegiatan" element={<RekapAbsenKegiatan />} />
          <Route path="KelolaKegiatan" element={<KelolaKegiatan />} />
          <Route path="LaporanBukuBesar" element={<LaporanBukuBesar />} />
          <Route path="NeracaSaldo" element={<NeracaSaldo />} />
          <Route path="JurnalUmum" element={<JurnalUmum />} />
          <Route path="aplikasi" element={<Aplikasi />} />
          <Route path="kegiatansekolah" element={<KegiatanSekolah />} />
          <Route path="SuratMenyurat" element={<SuratMenyurat />} />
          <Route path="DokumenSekolah" element={<DokumenSekolah />} />
          <Route path="DepresiasiAset" element={<DepresiasiAset />} />
          <Route path="LaporanAset" element={<LaporanAset />} />
          <Route path="DataAset" element={<DataAset />} />
          <Route path="RiwayatGaji" element={<RiwayatGaji />} />
          <Route path="DanaPensiunPegawai" element={<DanaPensiunPegawai />} />
          <Route path="ManajemenTanggal" element={<ManajemenTanggal />} />
          <Route path="KriteriaKehadiran" element={<KriteriaKehadiran />} />
          <Route path="SettingKomponenGaji" element={<SettingKomponenGaji />} />
          <Route path="RekapKinerja" element={<RekapKinerja />} />
          <Route path="KelolaIndikator" element={<KelolaIndikator />} />
          <Route path="InputNilaiKinerja" element={<InputNilaiKinerja />} />
          <Route path="PeminjamanAset" element={<PeminjamanAset />} />
          <Route path="MaintenanceAset" element={<MaintenanceAset />} />
          <Route path="RiwayatPeminjaman" element={<RiwayatPeminjaman />} />
          <Route path="BannerAplikasi" element={<BannerAplikasi />} />
          <Route path="InformasiLembaga" element={<InformasiLembaga />} />
          <Route path="SettingUser" element={<SettingUser />} />
          <Route path="SettingAbsensiGPS" element={<SettingAbsensiGPS />} />
          <Route path="BackupData" element={<BackupData />} />
          <Route path="LaporanJurnal" element={<LaporanJurnal />} />
          <Route path="LaporanKomprehensif" element={<LaporanKomprehensif />} />
          <Route path="Teller" element={<Teller />} />
          <Route path="RealisasiPenerimaan" element={<RealisasiPenerimaan />} />
          <Route path="RealisasiBelanja" element={<RealisasiBelanja />} />
          <Route path="SettingPagu" element={<SettingPagu />} />
          <Route path="APBSinduk" element={<APBSinduk />} />
          <Route path="APBSDetail" element={<APBSDetail />} />
          <Route path="ArusKas" element={<ArusKas />} />
          <Route path="RealisasiAnggaran" element={<RealisasiAnggaran/>} />
          <Route path="EvaluasiAnggaran" element={<EvaluasiAnggaran />} />
          <Route path="PosisiKeuangan" element={<PosisiKeuangan />} />
          <Route path="LaporanKomprehensif" element={<LaporanKomprehensif />} />
          <Route path="PerubahanAsetNeto" element={<PerubahanAsetNeto />} />
          <Route path="JenisPenerimaan" element={<JenisPenerimaan />} />
          <Route path="JenisPengeluaran" element={<JenisPengeluaran />} />
          <Route path="DataTransaksi" element={<DataTransaksi />} />
          <Route path="DataPegawai" element={<DataPegawai />} />
          <Route path="TransaksiJurnal" element={<TransaksiJurnal />} />
          <Route path="TransaksiPenerimaan" element={<TransaksiPenerimaan />} />
          <Route path="JenisPembayaran" element={<JenisPembayaran />} />
          <Route path="RekapTagihan" element={<RekapTagihan />} />
          <Route path="RekapSiswa" element={<RekapPerSiswa />} />
          <Route path="RekapPembayaran" element={<RekapPembayaran />} />
          <Route path="RekapTanggal" element={<RekapPerTanggal />} />
          <Route path="TarifPembayaranSiswa" element={<TarifPembayaranSiswa />} />
          <Route path="TunggakanSiswa" element={<TunggakanSiswa />} />
          <Route path="BayarTagihan" element={<BayarTagihan />} />
          <Route path="TagihanBulanIni" element={<TagihanBulanIni />} />
          <Route path="RiwayatTransaksi" element={<RiwayatTransaksi />} />
          <Route path="RiwayatTabunganSiswa" element={<RiwayatTabunganSiswa />} />
          <Route path="TransaksiPengeluaran" element={<LaporanPengeluaran />} />
          <Route path="LaporanPenerimaan" element={<LaporanPenerimaan />} />
          <Route path="perpustakaan" element={<ManajemenPerputakaan />} />
          <Route path="databuku" element={<DataBuku />} />
          <Route path="LaporanBuku" element={<LaporanBuku />} />
          <Route path="LaporanDenda" element={<LaporanDenda />} />
          <Route path="LaporanPeminjamanBuku" element={<LaporanPeminjamanBuku />} />
          <Route path="LaporanPengembalianBuku" element={<LaporanPengembalianbuku />} />
          <Route path="PeminjamanBuku" element={<PeminjamanBuku />} />
          <Route path="PengembalianBuku" element={<PengembalianBuku />} />
          <Route path="SettingDenda" element={<SettingDenda />} />
          <Route path="PeminjamanBuku" element={<PeminjamanBuku />} />
          <Route path="profileSekolah" element={<ProfileSekolah />} />
          <Route path="settinglokasi" element={<SettingLokasi />} />
          <Route path="datakelas" element={<DataKelas />} />
          <Route path="tahunajaran" element={<TahunAjaran />} />
          <Route path="jenissemester" element={<JenisSemester />} />
          <Route path="absensiharian" element={<AbsensiHarian />} />
          <Route path="presensi" element={<Presensi />} />
          <Route path="rekapabsensi" element={<RekapAbsensi />} />
          <Route path="absensimapel" element={<AbsensiMapel />} />
          <Route path="aspekpenilaian" element={<AspekPenilaian />} />
          <Route path="dataraport" element={<DataRaport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
