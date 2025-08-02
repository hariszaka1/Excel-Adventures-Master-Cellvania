
import React from 'react';

interface FeedbackModalProps {
  title: string;
  message: string;
  buttonText: string;
  onButtonClick: () => void;
  show: boolean;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ title, message, buttonText, onButtonClick, show }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-yellow-100 rounded-2xl border-8 border-yellow-400 p-8 m-4 max-w-lg w-full text-center shadow-2xl transform transition-all animate-jump-in">
        <h2 className="text-3xl font-bold text-slate-800 font-pixel mb-4">{title}</h2>
        <p className="text-slate-700 text-lg mb-8">{message}</p>
        <button
          onClick={onButtonClick}
          className="bg-green-500 text-white font-bold py-4 px-8 rounded-lg text-2xl shadow-lg hover:bg-green-600 transform hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6"/><path d="M22 11.5A10 10 0 0 0 3.5 12.5"/><path d="M2 12.5a10 10 0 0 0 18.5-1"/></svg>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default FeedbackModal;
