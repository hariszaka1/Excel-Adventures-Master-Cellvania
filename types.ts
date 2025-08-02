export type AvatarExpression = 'idle' | 'happy' | 'thinking' | 'correct' | 'incorrect';

export type GameState = 'start_screen' | 'playing' | 'game_complete';

export interface CellData {
  value: string;
  isEditable?: boolean;
}

export type GridData = CellData[][];

export interface Level {
  id: number;
  title: string;
  instruction: string;
  hint: string;
  initialGrid: GridData;
  validate: (grid: GridData, activeCell: { row: number; col: number } | null) => boolean;
  successMessage: string;
}