import React from 'react';

function LogoutModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-yellow-300 p-6 rounded-3xl shadow-2xl max-w-sm w-full text-center font-['Fredoka_One']">
        <img src="https://via.placeholder.com/100x100?text=Logout+Image" alt="Logout" className="mx-auto mb-4 rounded-2xl" /> {/* Ganti dengan image asli */}
        <h2 className="text-2xl font-bold text-black mb-4">Yakin Logout?</h2>
        <div className="flex justify-center space-x-4">
          <button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-all">Ya</button>
          <button onClick={onCancel} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all">Tidak</button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;