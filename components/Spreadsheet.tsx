
import React from 'react';
import { GridData } from '../types';
import Cell from './Cell';

interface SpreadsheetProps {
  gridData: GridData;
  activeCell: { row: number; col: number } | null;
  onCellClick: (row: number, col: number) => void;
  onCellValueChange: (row: number, col: number, value: string) => void;
}

const Spreadsheet: React.FC<SpreadsheetProps> = ({ gridData, activeCell, onCellClick, onCellValueChange }) => {
  const colHeaders = ['', ...Array.from({ length: gridData[0]?.length || 0 }, (_, i) => String.fromCharCode(65 + i))];

  return (
    <div className="bg-white p-4 rounded-lg shadow-xl border-4 border-slate-400 overflow-x-auto">
      <div className="flex">
        {colHeaders.map((header, index) => (
          <Cell
            key={index}
            data={{ value: header }}
            isActive={false}
            isHeader={true}
            onClick={() => {}}
            onValueChange={() => {}}
          />
        ))}
      </div>
      {gridData.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          <Cell
            key={`row-header-${rowIndex}`}
            data={{ value: (rowIndex + 1).toString() }}
            isActive={false}
            isHeader={true}
            onClick={() => {}}
            onValueChange={() => {}}
          />
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              data={cell}
              isActive={activeCell?.row === rowIndex && activeCell?.col === colIndex}
              isHeader={false}
              onClick={() => onCellClick(rowIndex, colIndex)}
              onValueChange={(value) => onCellValueChange(rowIndex, colIndex, value)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Spreadsheet;
