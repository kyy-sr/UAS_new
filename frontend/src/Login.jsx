import React, { useState } from 'react';

const API_URL = 'http://localhost:5000/api/auth';

function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle login/sign up
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          alert('Password tidak cocok!');
          setIsLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          alert('Akun berhasil dibuat! Silakan login.');
          setIsSignUp(false);
          setUsername('');
          setPassword('');
          setConfirmPassword('');
        } else {
          alert(data.error || 'Gagal membuat akun');
        }
      } else {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Simpan user info ke localStorage
          localStorage.setItem('user', JSON.stringify(data.user));
          onLogin(data.user);
        } else {
          alert(data.error || 'Username atau password salah!');
        }
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan. Pastikan backend sudah berjalan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-cyan-200 font-['Fredoka_One']">
      <div className="bg-white/90 p-8 rounded-3xl shadow-2xl max-w-sm w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-black">{isSignUp ? 'Sign Up' : 'Login Dulu!'}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
            required
          />
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
              required
            />
          )}
          <button type="submit" disabled={isLoading} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl transition-all disabled:opacity-50">
            {isLoading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Login')}
          </button>
        </form>
        <p className="text-center mt-4 text-black">
          {isSignUp ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
          <button onClick={() => setIsSignUp(!isSignUp)} className="text-blue-500 hover:underline">
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;