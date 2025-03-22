import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorMsg = ({ message, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    //navigate('/orders');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-full max-w-md p-6 bg-white border rounded-3xl relative">
        <div className="text-center">
          <div className="text-red-600 text-4xl font-semibold font-['Public Sans'] leading-10">ERROR</div>
        </div>
        <div className="text-center mt-4">
          <div className="text-gray-500 text-xl font-light font-['Noto Sans'] leading-5">{message}</div>
        </div>
        <button 
          className="absolute top-4 right-4 text-black hover:bg-gray-100 rounded-full p-1 transition-colors duration-200" 
          onClick={handleClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ErrorMsg;