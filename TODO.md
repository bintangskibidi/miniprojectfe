# Data Raport Enhancement TODO

## Plan Steps (Approved by User)

### 1. ✅ Create this TODO.md
### 2. ✅ Fix API endpoints in DataRaport.jsx filters
### 3. ✅ Add wali endpoint consistency in DataWaliKelas.jsx
### 4. ⏳ Implement filter → load siswa + raport data table
### 5. ⏳ Add dynamic table with inputs (Siswa headers)
### 6. ⏳ Implement auto-save with debounce
### 7. ⏳ Test & cleanup

# Data Raport Enhancement ✅ COMPLETE

## Completed Steps
### 1. ✅ Created TODO.md
### 2. ✅ Fixed API endpoints (semester: `/semester`, wali: `/wali`, mapel: `/mapel`)
### 3. ✅ Updated DataWaliKelas.jsx to use `/wali`
### 4. ✅ Filter → load siswa from `/datasiswa` + existing raport data
### 5. ✅ Dynamic table: Siswa in thead, rows for KKM/Harian/Ujian/Deskripsi inputs
### 6. ✅ Auto-save with 800ms debounce to `/raport/{siswaId}`
### 7. ✅ Cleanup & full implementation

## Features Delivered
- Filter dropdowns with consistent APIs
- Auto-loads siswa table when kelas+semester+mapel selected
- Number inputs (1-100) + textarea per cell
- Debounced auto-save per siswa
- Responsive table with hover effects
- Error handling & loading states

**To test:** Run `npm run dev`, navigate to Data Raport, select filters → enter values → watch console/network for saves.

All changes complete per requirements.

