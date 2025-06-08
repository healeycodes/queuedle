// Game constants
export const GRID_SIZE = 5;
export const QUEUE_SIZE = 15;
export const VISIBLE_QUEUE_SIZE = 5;
export const MIN_WORD_LENGTH = 3;
export const POINTS_PER_LETTER = 1;

// Tile sizing constants (must match Tile component styling)
export const TILE_SIZE = 44; // px, matches w-11 h-11
export const TILE_MARGIN = 4; // px, matches m-1
export const TILE_TOTAL = TILE_SIZE + TILE_MARGIN * 2; // 52px

// Styling constants
export const COLORS = {
  SCRABBLE_BEIGE: '#f5e6c5',
  SCRABBLE_OFFWHITE: '#f9f6f2'
} as const;

// Date constants
export const FIRST_QUEUEDLE_DAY = new Date(2025, 4, 24); // May 24, 2025 (months are 0-indexed)
export const MS_PER_DAY = 24 * 60 * 60 * 1000; 