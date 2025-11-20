import React, { useState, useEffect, useRef } from 'react';
import Login from './Login';
import SplashScreen from './SplashScreen';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import ConfirmModal from './ConfirmModal';
import ReportModal from './ReportModal';
import LogoutModal from './LogoutModal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [todos, setTodos] = useState([
    { id: 1, title: 'Belajar React', description: 'Pelajari komponen dan hooks', start_date: '2023-10-01', end_date: '2023-10-05', done: false },
    { id: 2, title: 'Buat API', description: 'Setup backend dengan Express', start_date: '2023-10-02', end_date: '2023-10-10', done: false }
  ]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isLoggedIn && audioRef.current) {
      audioRef.current.play().catch(err => console.log('Autoplay blocked:', err));
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoading(true);
  };

  const handleSplashFinish = () => {
    setIsLoading(false);
    setIsLoggedIn(true);
  };

  const addTodo = (todo) => {
    if (!todo.start_date || !todo.end_date) {
      alert('isi dulu jir ￣へ￣');
      return;
    }
    setTodos([...todos, { ...todo, id: Date.now(), done: false }]);
  };

  const updateTodo = (id, updatedTodo) => {
    if (!updatedTodo.start_date || !updatedTodo.end_date) {
      alert('isi dulu jir ￣へ￣');
      return;
    }
    setTodos(todos.map(t => t.id === id ? { ...t, ...updatedTodo } : t));
    setEditingTodo(null);
  };

  const deleteTodo = (id) => {
    setModalMessage('Yakin mau di hapus?? (。﹏。*)');
    setPendingDeleteId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (pendingDeleteId) {
      setTodos(todos.filter(t => t.id !== pendingDeleteId));
    }
    setIsModalOpen(false);
    setPendingDeleteId(null);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setPendingDeleteId(null);
  };

  const markAsDone = (id) => {
    setTodos(todos.map(t => t.id === id ? { ...t, done: true } : t));
    setTimeout(() => {
      setTodos(todos.filter(t => t.id !== id));
    }, 500);
  };

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    setIsLoggedIn(false);
    setIsLogoutModalOpen(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const cancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const toggleMode = () => setIsDarkMode(!isDarkMode);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  };

  if (!isLoggedIn && !isLoading) {
    return <Login onLogin={handleLogin} />;
  }

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-8 transition-all duration-500 font-['Fredoka_One'] relative overflow-hidden animate-fade-in ${isDarkMode ? 'bg-gradient-to-br from-black to-gray-900 text-white' : 'bg-gradient-to-br from-blue-200 to-cyan-200 text-black'}`}>
      <audio ref={audioRef} loop>
        <source src="/lofi.mp3" type="audio/mpeg" />
      </audio>
      {/* Awan Gerak Lebih Banyak */}
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${isDarkMode ? 'text-white' : 'text-gray-300'}`}>
        <div className="absolute top-20 left-10 animate-float">
          <svg width="100" height="60" viewBox="0 0 100 60">
            <ellipse cx="50" cy="30" rx="40" ry="20" fill="currentColor" opacity="0.5" />
            <ellipse cx="30" cy="25" rx="25" ry="15" fill="currentColor" opacity="0.7" />
            <ellipse cx="70" cy="25" rx="25" ry="15" fill="currentColor" opacity="0.7" />
          </svg>
        </div>
        <div className="absolute top-40 right-20 animate-float-delay">
          <svg width="120" height="70" viewBox="0 0 120 70">
            <ellipse cx="60" cy="35" rx="50" ry="25" fill="currentColor" opacity="0.4" />
            <ellipse cx="35" cy="30" rx="30" ry="18" fill="currentColor" opacity="0.6" />
            <ellipse cx="85" cy="30" rx="30" ry="18" fill="currentColor" opacity="0.6" />
          </svg>
        </div>
        <div className="absolute top-60 left-1/2 animate-float" style={{ transform: 'translateX(-50%)' }}>
          <svg width="80" height="50" viewBox="0 0 80 50">
            <ellipse cx="40" cy="25" rx="35" ry="18" fill="currentColor" opacity="0.6" />
            <ellipse cx="25" cy="20" rx="20" ry="12" fill="currentColor" opacity="0.8" />
            <ellipse cx="55" cy="20" rx="20" ry="12" fill="currentColor" opacity="0.8" />
          </svg>
        </div>
        <div className="absolute bottom-40 left-20 animate-float-delay">
          <svg width="90" height="55" viewBox="0 0 90 55">
            <ellipse cx="45" cy="27" rx="38" ry="20" fill="currentColor" opacity="0.5" />
            <ellipse cx="30" cy="22" rx="22" ry="14" fill="currentColor" opacity="0.7" />
            <ellipse cx="60" cy="22" rx="22" ry="14" fill="currentColor" opacity="0.7" />
          </svg>
        </div>
        <div className="absolute bottom-20 right-10 animate-float">
          <svg width="110" height="65" viewBox="0 0 110 65">
            <ellipse cx="55" cy="32" rx="45" ry="22" fill="currentColor" opacity="0.4" />
            <ellipse cx="35" cy="27" rx="28" ry="16" fill="currentColor" opacity="0.6" />
            <ellipse cx="75" cy="27" rx="28" ry="16" fill="currentColor" opacity="0.6" />
          </svg>
        </div>
      </div>
      <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-300 rounded-lg shadow-lg transform rotate-12 animate-fade-in"></div>
      <div className="absolute bottom-20 right-20 w-20 h-20 bg-pink-300 rounded-lg shadow-lg transform -rotate-6 animate-fade-in" style={{ animationDelay: '0.5s' }}></div>
      <button onClick={handleLogout} className={`absolute top-4 right-16 px-4 py-2 rounded-full transition-all z-50 ${isDarkMode ? 'bg-red-400 hover:bg-red-500 text-white' : 'bg-red-400 hover:bg-red-500 text-white'}`}>
        Logout
      </button>
      <button onClick={() => setIsReportModalOpen(true)} className={`absolute top-4 left-4 px-4 py-2 rounded-full transition-all z-50 ${isDarkMode ? 'bg-red-400 hover:bg-red-500 text-white' : 'bg-red-400 hover:bg-red-500 text-white'}`}>
        Lapor Kesalahan
      </button>
      <button onClick={toggleMusic} className={`absolute top-16 right-4 px-4 py-2 rounded-full transition-all z-50 ${isDarkMode ? 'bg-green-400 hover:bg-green-500 text-white' : 'bg-green-400 hover:bg-green-500 text-white'}`}>
        {audioRef.current && !audioRef.current.paused ? '🔊' : '🔇'}
      </button>
      <button onClick={toggleMode} className={`absolute bottom-4 right-4 px-4 py-2 rounded-full transition-all z-50 ${isDarkMode ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'bg-pink-400 hover:bg-pink-500 text-white'}`}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className={`bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-2xl animate-fade-in z-10 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}>
        <h1 className={`text-4xl font-bold text-center mb-8 drop-shadow-lg ${isDarkMode ? 'text-white' : 'text-black'}`}>To-Do List</h1>
        <TodoForm onSubmit={editingTodo ? (todo) => updateTodo(editingTodo.id, todo) : addTodo} initialData={editingTodo} isDarkMode={isDarkMode} />
        <TodoList todos={todos} onEdit={setEditingTodo} onDelete={deleteTodo} onMarkAsDone={markAsDone} isDarkMode={isDarkMode} />
      </div>
      <ConfirmModal isOpen={isModalOpen} onConfirm={confirmDelete} onCancel={cancelDelete} message={modalMessage} />
      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
      <LogoutModal isOpen={isLogoutModalOpen} onConfirm={confirmLogout} onCancel={cancelLogout} />
    </div>
  );
}

export default App;
