import { SlideDirection, SlideRestrictions, WordHighlight } from './game';

// Component props interfaces
export interface GridProps {
  grid: string[][];
  onSlide: (direction: SlideDirection, index: number) => void;
  restrictions: SlideRestrictions;
  wordHighlights: WordHighlight[];
  disableAll?: boolean;
  newTile?: { row: number; col: number };
}

export interface TileProps {
  letter: string;
  isNew?: boolean;
}

export interface ArrowButtonProps {
  direction: SlideDirection;
  index: number;
  onClick: () => void;
  disabled: boolean;
}

export interface QueueDisplayProps {
  queue: string[];
  totalLetters: number;
}

export interface ScoreDisplayProps {
  score: number;
  moves: number;
} 