import { WordHighlight } from '../types';
import { isValidWord } from './dictionary';
import { getColorForPosition } from './wordColors';

export const findWords = (grid: string[][]): WordHighlight[] => {
  const highlights: WordHighlight[] = [];
  let wordCount = 0;
  
  // Check horizontal words
  for (let row = 0; row < grid.length; row++) {
    for (let start = 0; start < grid[row].length - 2; start++) {
      for (let end = start + 2; end < grid[row].length; end++) {
        const word = grid[row].slice(start, end + 1).join('').toLowerCase();
        if (isValidWord(word)) {
          // Check if this is a complete word (not part of a longer word)
          const isStartOfWord = start === 0 || !isValidWord(grid[row].slice(start - 1, end + 1).join('').toLowerCase());
          const isEndOfWord = end === grid[row].length - 1 || !isValidWord(grid[row].slice(start, end + 2).join('').toLowerCase());
          
          if (isStartOfWord && isEndOfWord) {
            highlights.push({
              start: start,
              end: end,
              direction: 'horizontal',
              color: getColorForPosition(wordCount),
              row: row,
              col: start  // Use start as the column for horizontal words
            });
            wordCount++;
          }
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
          // Check if this is a complete word (not part of a longer word)
          const isStartOfWord = start === 0 || !isValidWord(
            grid.slice(start - 1, end + 1)
              .map(row => row[col])
              .join('')
              .toLowerCase()
          );
          const isEndOfWord = end === grid.length - 1 || !isValidWord(
            grid.slice(start, end + 2)
              .map(row => row[col])
              .join('')
              .toLowerCase()
          );
          
          if (isStartOfWord && isEndOfWord) {
            highlights.push({
              start: start,
              end: end,
              direction: 'vertical',
              color: getColorForPosition(wordCount),
              row: start,  // Use start as the row for vertical words
              col: col
            });
            wordCount++;
          }
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