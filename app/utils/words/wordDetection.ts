import { WordHighlight } from '../../types/game';
import { isValidWord } from './dictionary';

export const findWords = (grid: string[][]): WordHighlight[] => {
  const highlights: WordHighlight[] = [];
  // Check horizontal words
  for (let row = 0; row < grid.length; row++) {
    for (let start = 0; start < grid[row].length - 2; start++) {
      for (let end = start + 2; end < grid[row].length; end++) {
        const word = grid[row].slice(start, end + 1).join('').toLowerCase();
        if (isValidWord(word)) {
          highlights.push({
            start: start,
            end: end,
            direction: 'horizontal',
            row: row,
            col: start
          });
        }
      }
    }
  }
  // Check vertical words
  for (let col = 0; col < grid[0].length; col++) {
    for (let start = 0; start < grid.length - 2; start++) {
      for (let end = start + 2; end < grid.length; end++) {
        const word = grid.slice(start, end + 1)
          .map(row => row[col])
          .join('')
          .toLowerCase();
        if (isValidWord(word)) {
          highlights.push({
            start: start,
            end: end,
            direction: 'vertical',
            row: start,
            col: col
          });
        }
      }
    }
  }
  return highlights;
};

export const calculateWordScore = (highlights: WordHighlight[]): number => {
  return highlights.reduce((score, highlight) => {
    const wordLength = highlight.end - highlight.start + 1;
    return score + wordLength;
  }, 0);
};

// Given a grid and highlights, return the list of word strings (in uppercase)
export const getWordsFromHighlights = (grid: string[][], highlights: WordHighlight[]): string[] => {
  return highlights.map(h => {
    if (h.direction === 'horizontal') {
      return grid[h.row].slice(h.start, h.end + 1).join('').toUpperCase();
    } else {
      return grid.slice(h.start, h.end + 1).map(row => row[h.col]).join('').toUpperCase();
    }
  });
}; 