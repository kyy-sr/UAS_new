import React, { useState } from 'react';

function TodoList({ todos, onEdit, onDelete, onMarkAsDone, isDarkMode }) {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const colors = ['bg-yellow-300', 'bg-pink-300', 'bg-blue-300', 'bg-green-300'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Gap lebih besar */}
      {todos.filter(todo => !todo.done).map((todo, index) => (
        <div key={todo.id} className={`p-6 rounded-2xl shadow-lg transform rotate-1 hover:rotate-0 transition-all duration-300 animate-fade-in min-h-[200px] ${colors[index % colors.length]} ${isDarkMode ? 'text-black' : 'text-black'}`} style={{ animationDelay: `${index * 0.2}s` }}> {/* Padding dan min-height lebih besar */}
          <h3 className="text-xl font-semibold mb-2">{todo.title}</h3>
          <p className="text-sm mb-2">Start: {todo.start_date} | End: {todo.end_date}</p>
          {expandedId === todo.id && (
            <p className="text-sm mb-4 italic animate-slide-in">{todo.description}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-4"> {/* Flex-wrap agar tombol wrap jika perlu */}
            <button onClick={() => toggleExpand(todo.id)} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full transition-all">
              {expandedId === todo.id ? 'Collapse' : 'Expand'}
            </button>
            <button onClick={() => onEdit(todo)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full transition-all">Edit</button>
            <button onClick={() => onMarkAsDone(todo.id)} className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-full transition-all">Done</button>
            <button onClick={() => onDelete(todo.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full transition-all">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;