
import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = total > 0 ? ((current) / total) * 100 : 0;

  return (
    <div className="w-full bg-slate-300 rounded-full h-6 border-2 border-slate-500 shadow-inner">
      <div
        className="bg-green-500 h-full rounded-full text-xs font-bold text-white text-center transition-all duration-500 flex items-center justify-center"
        style={{ width: `${percentage}%` }}
      >
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

export default ProgressBar;