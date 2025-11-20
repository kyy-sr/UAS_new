import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';

function TodoForm({ onSubmit, initialData, isDarkMode }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || '');
      setStartDate(new Date(initialData.start_date));
      setEndDate(new Date(initialData.end_date));
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, start_date: startDate.toISOString().split('T')[0], end_date: endDate.toISOString().split('T')[0] });
    setTitle('');
    setDescription('');
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4 animate-fade-in relative z-20">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className={`w-full p-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${isDarkMode ? 'bg-gray-700 text-white placeholder-pink-400' : 'bg-white text-black placeholder-pink-500'}`}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows="3"
        className={`w-full p-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${isDarkMode ? 'bg-gray-700 text-white placeholder-pink-400' : 'bg-white text-black placeholder-pink-500'}`}
      />
      <div className="relative z-40">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Start Date"
          className={`w-full p-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          required
          popperClassName="z-50"
          popperPlacement="bottom-start"
        />
        <FaCalendarAlt className={`absolute right-3 top-3 ${isDarkMode ? 'text-pink-400' : 'text-pink-500'}`} />
      </div>
      <div className="relative z-30">
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="End Date"
          className={`w-full p-3 border-2 border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
          required
          popperClassName="z-50"
          popperPlacement="bottom-start"
        />
        <FaCalendarAlt className={`absolute right-3 top-3 ${isDarkMode ? 'text-pink-400' : 'text-pink-500'}`} />
      </div>
      <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl transition-all shadow-lg">
        {initialData ? 'Update' : 'Add'} Todo
      </button>
    </form>
  );
}

export default TodoForm;
