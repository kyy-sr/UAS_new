import React, { useEffect } from 'react';

function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 detik loadinggg
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-cyan-200 font-['Fredoka_One']">
      <div className="text-center">
        <img src="download (9).jpeg" alt="Loading" className="mx-auto mb-4 rounded-2xl shadow-lg animate-fade-in animate-bounce" />
        <h1 className="text-4xl font-bold text-black animate-pulse mb-4">Loading...</h1>
        <p className="text-2xl text-black animate-fade-in">Selamat mengerjakan tugas :D</p>
      </div>
    </div>
  );
}

export default SplashScreen;