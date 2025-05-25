// Simple seeded random number generator
export class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  // Generate a random number between 0 and 1
  next(): number {
    this.seed = (this.seed * 16807) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  // Generate a random integer between min (inclusive) and max (inclusive)
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
}

// Scrabble tile frequencies (total: 100 tiles)
const SCRABBLE_TILES = [
  { letter: 'a', count: 9 },
  { letter: 'b', count: 2 },
  { letter: 'c', count: 2 },
  { letter: 'd', count: 4 },
  { letter: 'e', count: 12 },
  { letter: 'f', count: 2 },
  { letter: 'g', count: 3 },
  { letter: 'h', count: 2 },
  { letter: 'i', count: 9 },
  { letter: 'j', count: 1 },
  { letter: 'k', count: 1 },
  { letter: 'l', count: 4 },
  { letter: 'm', count: 2 },
  { letter: 'n', count: 6 },
  { letter: 'o', count: 8 },
  { letter: 'p', count: 2 },
  { letter: 'q', count: 1 },
  { letter: 'r', count: 6 },
  { letter: 's', count: 4 },
  { letter: 't', count: 6 },
  { letter: 'u', count: 4 },
  { letter: 'v', count: 2 },
  { letter: 'w', count: 2 },
  { letter: 'x', count: 1 },
  { letter: 'y', count: 2 },
  { letter: 'z', count: 1 }
];

// Get the current local day as a seed
export const getCurrentDaySeed = (): number => {
  const now = new Date();
  const localDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return localDate.getTime();
};

// Generate a random letter based on Scrabble tile frequencies
const getRandomScrabbleLetter = (random: SeededRandom): string => {
  const totalTiles = SCRABBLE_TILES.reduce((sum, tile) => sum + tile.count, 0);
  let randomValue = random.nextInt(0, totalTiles - 1);
  
  for (const tile of SCRABBLE_TILES) {
    if (randomValue < tile.count) {
      return tile.letter;
    }
    randomValue -= tile.count;
  }
  
  // Fallback to 'e' if something goes wrong
  return 'e';
};

// Generate initial game state using the seed
export const generateGameState = (seed: number) => {
  const random = new SeededRandom(seed);
  
  // Generate 5x5 grid
  const grid = Array(5).fill(null).map(() => 
    Array(5).fill(null).map(() => getRandomScrabbleLetter(random))
  );
  
  // Generate 15-letter queue
  const queue = Array(15).fill(null).map(() => getRandomScrabbleLetter(random));
  
  return { grid, queue };
};

import { findWords } from './wordDetection';

// Generate a valid game state with no words on the board
export const generateValidGameState = (baseSeed: number) => {
  let attempt = 0;
  while (true) {
    const seed = baseSeed + attempt;
    const { grid, queue } = generateGameState(seed);
    const highlights = findWords(grid);
    if (highlights.length === 0) {
      return { grid, queue, attempt };
    }
    attempt++;
  }
}; 