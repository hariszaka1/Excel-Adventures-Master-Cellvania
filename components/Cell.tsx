import React from 'react';
import { CellData } from '../types';

interface CellProps {
  data: CellData;
  isActive: boolean;
  isHeader: boolean;
  onClick: () => void;
  onValueChange: (value: string) => void;
}

const Cell: React.FC<CellProps> = ({ data, isActive, isHeader, onClick, onValueChange }) => {
  const baseClasses = 'w-28 h-10 border border-slate-300 flex items-center justify-center text-sm transition-all duration-150';
  
  if (isHeader) {
    return (
      <div className={`${baseClasses} bg-slate-200 text-slate-600 font-bold`}>
        {data.value}
      </div>
    );
  }

  const activeClasses = isActive ? 'ring-4 ring-blue-500 ring-inset z-10' : 'hover:bg-blue-100';
  const editableClasses = data.isEditable !== false ? 'cursor-pointer' : 'bg-slate-100 text-slate-500 cursor-not-allowed';

  return (
    <div
      className={`${baseClasses} ${activeClasses} ${editableClasses} bg-white`}
      onClick={data.isEditable !== false ? onClick : undefined}
    >
      {isActive && data.isEditable !== false ? (
        <input
          type="text"
          value={data.value}
          onChange={(e) => onValueChange(e.target.value)}
          className="w-full h-full bg-transparent text-center outline-none text-black"
          autoFocus
          onFocus={(e) => e.target.select()}
        />
      ) : (
        <span className="truncate px-2">{data.value}</span>
      )}
    </div>
  );
};

export default Cell;
