import React from 'react';

const Toast = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg flex items-center">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-lg font-bold">&times;</button>
    </div>
  );
};

export default Toast;