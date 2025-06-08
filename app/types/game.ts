// Game state interfaces
export interface GameState {
  grid: string[][];
  queue: string[];
  score: number;
  wordScore: number;
  moves: number;
  restrictions: SlideRestrictions;
  wordHighlights: WordHighlight[];
  words: string[]; // List of currently detected words
  newTile?: { row: number; col: number }; // Coordinates of the newly inserted tile
}

export interface SlideRestrictions {
  rows: {
    left: boolean[];  // Array of 5 booleans for each row
    right: boolean[]; // Array of 5 booleans for each row
  };
  columns: {
    up: boolean[];    // Array of 5 booleans for each column
    down: boolean[];  // Array of 5 booleans for each column
  };
}

// Word highlight interfaces
export interface BaseWordHighlight {
  start: number;
  end: number;
}

export interface HorizontalWordHighlight extends BaseWordHighlight {
  direction: 'horizontal';
  row: number;
}

export interface VerticalWordHighlight extends BaseWordHighlight {
  direction: 'vertical';
  col: number;
}

export interface WordHighlight {
  start: number;
  end: number;
  direction: 'horizontal' | 'vertical';
  row: number;
  col: number;
}

// Utility types
export type SlideDirection = 'left' | 'right' | 'up' | 'down';

// Type guard functions
export function isHorizontalHighlight(highlight: WordHighlight): highlight is WordHighlight & { direction: 'horizontal'; row: number } {
  return highlight.direction === 'horizontal' && highlight.row !== undefined;
}

export function isVerticalHighlight(highlight: WordHighlight): highlight is WordHighlight & { direction: 'vertical'; col: number } {
  return highlight.direction === 'vertical' && highlight.col !== undefined;
} 