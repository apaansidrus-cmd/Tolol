import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { Home, Archive, Users, Settings, Search } from 'lucide-react';
import data from './data.json';
import './index.css';

const jamiyyahList = ["AS-SA'IDIYYAH","AL-AZIZIYYAH","AL-ISHOMIYYAH","AL-AZHAR","AL-FATHIYYAH","AL-FALAHIYYAH","AL-ALIYYAH","AL-MUSTHOFA","AL-AQSHO","AZ-ZAMZAMIYYAH"];

function App(){
  const [page, setPage] = useState('beranda');
  const [search, setSearch] = useState('');
  const [kategori, setKategori] = useState('Semua');

  const hasil = data.pelanggar.filter(p => 
    (kategori === 'Semua' || p.jamiyyah === kategori) &&
    p.nama.toLowerCase().includes(search.toLowerCase())
  );

  const Navbar = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2">
      <button onClick={()=>setPage('beranda')} className={`flex flex-col items-center ${page==='beranda'?'text-biru':'text-gray-500'}`}><Home size={20}/><span className="text-xs">Beranda</span></button>
      <button onClick={()=>setPage('quran')} className={`flex flex-col items-center ${page==='quran'?'text-biru':'text-gray-500'}`}><Archive size={20}/><span className="text-xs">Arsip</span></button>
      <button onClick={()=>setPage('data')} className={`flex flex-col items-center ${page==='data'?'text-biru':'text-gray-500'}`}><Users size={20}/><span className="text-xs">Pelanggar</span></button>
      <button onClick={()=>setPage('setting')} className={`flex flex-col items-center ${page==='setting'?'text-biru':'text-gray-500'}`}><Settings size={20}/><span className="text-xs">Pengaturan</span></button>
    </div>
  )

  return(
    <div className="pb-20">
      <div className="bg-biru text-white p-4 text-center">
        <h1 className="font-bold text-lg">KEAMANAN HMC LIRBOYO</h1>
      </div>

      {page==='beranda' && (
        <div className="p-4">
          <h2 className="text-xl font-bold text-biru">ARSIP PELANGGARAN</h2>
          <p className="text-gray-600 mb-4">Temukan data anak yang melanggar disini !</p>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari data anak yang melanggar..." className="w-full p-2 border rounded mb-2"/>
          <select value={kategori} onChange={e=>setKategori(e.target.value)} className="w-full p-2 border rounded mb-2">
            <option>Semua Kategori</option>
            {jamiyyahList.map(j=><option key={j}>{j}</option>)}
          </select>
          <button className="w-full bg-biru text-white p-2 rounded font-bold">Cari</button>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            {jamiyyahList.map(j=><div key={j} className="bg-white p-2 rounded shadow text-center text-sm">{j}</div>)}
          </div>

          <div className="mt-4 space-y-2">
            {hasil.map(p=>(
              <div key={p.id} className="bg-white p-3 rounded shadow">
                <p className="font-bold">{p.nama}</p>
                <p className="text-sm text-gray-600">{p.jamiyyah} - Kelas {p.kelas}</p>
                <p className="text-sm text-red-600">{p.pelanggaran}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {page==='quran' && (
        <div className="p-4">
          <h2 className="text-xl font-bold text-biru mb-4">AL-QUR'AN & TAFSIR DIGITAL</h2>
          <div className="grid grid-cols-2 gap-2">
            {data.surat.map(s=>(
              <div key={s.no} className="bg-white p-3 rounded shadow">
                <p className="font-bold">{s.no}. {s.latin}</p>
                <p className="text-right text-lg">{s.arab}</p>
                <p className="text-xs text-gray-500">{s.tempat} - {s.ayat} ayat</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {page==='data' && (
        <div className="p-4">
          <h2 className="text-xl font-bold text-biru mb-4">DATA PELANGGAR</h2>
          <div className="flex gap-2 overflow-x-auto mb-4">
            {jamiyyahList.map(j=><button key={j} onClick={()=>setKategori(j)} className="bg-biru text-white px-3 py-1 rounded text-xs whitespace-nowrap">{j}</button>)}
          </div>
          {data.pelanggar.filter(p=>p.jamiyyah===kategori).map(p=>(
            <div key={p.id} className="bg-white p-3 rounded shadow mb-2">{p.nama} - Kelas {p.kelas}</div>
          ))}
        </div>
      )}

      {page==='setting' && (
        <div className="p-4">
          <h2 className="text-xl font-bold text-biru mb-4">PENGATURAN & AKUN</h2>
          <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-bold mb-2">Upload Penanganan Pelanggar</h3>
            <input placeholder="Nama" className="w-full p-2 border rounded mb-2"/>
            <input placeholder="Jam'iyyah" className="w-full p-2 border rounded mb-2"/>
            <input placeholder="Asal" className="w-full p-2 border rounded mb-2"/>
            <input placeholder="Kelas" className="w-full p-2 border rounded mb-2"/>
            <input placeholder="Pelanggar Kategori" className="w-full p-2 border rounded mb-2"/>
            <button className="w-full bg-biru text-white p-2 rounded">Kirim</button>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-bold">Tentang Aplikasi</h3>
            <p className="text-sm text-gray-600">Aplikasi arsip data pelanggaran santri HMC Lirboyo. Versi 1.0.0</p>
          </div>
        </div>
      )}

      <Navbar/>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>)
