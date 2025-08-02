
import React from 'react';
import { AvatarExpression } from '../types';

interface AvatarProps {
  expression: AvatarExpression;
}

const Avatar: React.FC<AvatarProps> = ({ expression }) => {
  const expressions: Record<AvatarExpression, React.ReactNode> = {
    idle: (
      <>
        <circle cx="12" cy="10" r="1" fill="currentColor" />
        <circle cx="20" cy="10" r="1" fill="currentColor" />
        <path d="M13 18 C15 19, 17 19, 19 18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
    happy: (
      <>
        <path d="M9 10 C9.5 8, 10.5 8, 11 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M17 10 C17.5 8, 18.5 8, 19 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M12 16 Q16 20, 20 16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
    thinking: (
      <>
        <circle cx="12" cy="10" r="1" fill="currentColor" />
        <circle cx="20" cy="10" r="1" fill="currentColor" />
        <path d="M13 18 L 19 18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
    correct: (
      <>
        <path d="M9 10 C9.5 8, 10.5 8, 11 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M17 10 C17.5 8, 18.5 8, 19 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M12 18 C 14 20, 18 20, 20 18" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
    incorrect: (
      <>
        <path d="M10 9 L12 11 M12 9 L10 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 9 L20 11 M20 9 L18 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M13 19 C15 18, 17 18, 19 19" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    ),
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 bg-blue-300 rounded-full border-4 border-slate-700 shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center text-slate-800">
          <svg viewBox="0 0 32 32" className="w-24 h-24">
            {expressions[expression]}
          </svg>
        </div>
        {/* Wizard Hat */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-0 h-0
          border-l-[40px] border-l-transparent
          border-r-[40px] border-r-transparent
          border-b-[80px] border-b-blue-600 transform rotate-[15deg]
          shadow-md">
        </div>
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-blue-500 rounded-full border-2 border-slate-700"></div>
      </div>
      <p className="mt-4 text-lg font-bold text-slate-800 font-pixel">Cel-dor</p>
    </div>
  );
};

export default Avatar;
