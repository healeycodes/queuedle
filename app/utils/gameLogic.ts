import { GameState, SlideDirection } from '../types';
import { findWords, calculateWordScore } from './wordDetection';

// Helper to create a new array with a value inserted at a specific index
const insertAt = <T>(arr: T[], index: number, value: T): T[] => {
  const newArr = [...arr];
  newArr.splice(index, 0, value);
  return newArr;
};

// Helper to remove a value at a specific index
const removeAt = <T>(arr: T[], index: number): T[] => {
  const newArr = [...arr];
  newArr.splice(index, 1);
  return newArr;
};

export const slideRow = (
  grid: string[][],
  rowIndex: number,
  direction: 'left' | 'right',
  newLetter: string
): string[][] => {
  const newGrid = grid.map(row => [...row]);
  const row = [...newGrid[rowIndex]];

  if (direction === 'left') {
    // Remove first letter and add new letter at end
    row.shift();
    row.push(newLetter);
  } else {
    // Remove last letter and add new letter at start
    row.pop();
    row.unshift(newLetter);
  }

  newGrid[rowIndex] = row;
  return newGrid;
};

export const slideColumn = (
  grid: string[][],
  colIndex: number,
  direction: 'up' | 'down',
  newLetter: string
): string[][] => {
  const newGrid = grid.map(row => [...row]);
  
  if (direction === 'up') {
    // Remove top letter and add new letter at bottom
    for (let i = 0; i < grid.length - 1; i++) {
      newGrid[i][colIndex] = newGrid[i + 1][colIndex];
    }
    newGrid[grid.length - 1][colIndex] = newLetter;
  } else {
    // Remove bottom letter and add new letter at top
    for (let i = grid.length - 1; i > 0; i--) {
      newGrid[i][colIndex] = newGrid[i - 1][colIndex];
    }
    newGrid[0][colIndex] = newLetter;
  }

  return newGrid;
};

export const updateRestrictions = (
  restrictions: GameState['restrictions'],
  direction: SlideDirection,
  index: number
): GameState['restrictions'] => {
  const newRestrictions = {
    rows: {
      left: [...restrictions.rows.left],
      right: [...restrictions.rows.right]
    },
    columns: {
      up: [...restrictions.columns.up],
      down: [...restrictions.columns.down]
    }
  };

  switch (direction) {
    case 'left':
      newRestrictions.rows.right[index] = true;
      break;
    case 'right':
      newRestrictions.rows.left[index] = true;
      break;
    case 'up':
      newRestrictions.columns.down[index] = true;
      break;
    case 'down':
      newRestrictions.columns.up[index] = true;
      break;
  }

  return newRestrictions;
};

export const handleSlide = (
  gameState: GameState,
  direction: SlideDirection,
  index: number
): GameState => {
  const { grid, queue, restrictions } = gameState;
  
  // Get the next letter from the queue
  const [nextLetter, ...remainingQueue] = queue;
  
  // Update the grid based on direction
  const newGrid = direction === 'left' || direction === 'right'
    ? slideRow(grid, index, direction, nextLetter)
    : slideColumn(grid, index, direction, nextLetter);

  // Update restrictions
  const newRestrictions = updateRestrictions(restrictions, direction, index);

  // Find words and calculate score
  const wordHighlights = findWords(newGrid);
  const wordScore = calculateWordScore(wordHighlights);
  const movePenalty = 0.5;
  const newScore = wordScore - (gameState.moves + 1) * movePenalty;

  return {
    ...gameState,
    grid: newGrid,
    queue: remainingQueue,
    restrictions: newRestrictions,
    wordHighlights,
    score: newScore,
    wordScore,
    movePenalty: (gameState.moves + 1) * movePenalty,
    moves: gameState.moves + 1
  };
}; 