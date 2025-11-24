import React from 'react';

function ReportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-yellow-300 p-6 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center font-['Fredoka_One']">
        <h2 className="text-2xl font-bold text-black mb-4">Lapor Kesalahan</h2>
        <p className="text-black mb-6">Jika ada kesalahan, silakan <a href="https://youtu.be/xvFZjo5PgG0?si=Nte6c5ZjKPcgsfkY" className="text-blue-500 underline">klik untuk laporan</a> dan isi formulir.</p>
        <button onClick={onClose} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all">Tutup</button>
      </div>
    </div>
  );
}

export default ReportModal;