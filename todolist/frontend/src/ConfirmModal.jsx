import React from 'react';

function ConfirmModal({ isOpen, onConfirm, onCancel, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-yellow-300 p-6 rounded-3xl shadow-2xl max-w-sm w-full mx-4 text-center font-['Fredoka_One']">
        <h2 className="text-2xl font-bold text-black mb-4">Konfirmasi</h2>
        <p className="text-black mb-6">{message}</p>
        <div className="flex justify-center space-x-4">
          <button onClick={onConfirm} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition-all">Yes!</button>
          <button onClick={onCancel} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all">Gajadi hehe</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;