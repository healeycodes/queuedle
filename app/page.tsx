'use client';

import { useState, useEffect } from 'react';
import { GameState, GRID_SIZE, QUEUE_SIZE, VISIBLE_QUEUE_SIZE, SlideDirection } from './types';
import Grid from './components/Grid';
import QueueDisplay from './components/QueueDisplay';
import { handleSlide } from './utils/gameLogic';
import { getCurrentDaySeed, generateValidGameState } from './utils/seededRandom';
import { findWords, calculateWordScore, getWordsFromHighlights } from './utils/wordDetection';

// Initialize game state with seeded random
const getInitialGameState = (): GameState => {
  const seed = getCurrentDaySeed();
  const { grid, queue, attempt } = generateValidGameState(seed);
  console.log(`[Queuedle] Required ${attempt} attempts to generate a valid board`);
  const wordHighlights = findWords(grid);
  const wordScore = calculateWordScore(wordHighlights);
  const score = wordScore;
  const words = getWordsFromHighlights(grid, wordHighlights);

  return {
    grid,
    queue,
    score,
    wordScore,
    moves: 0,
    restrictions: {
      rows: {
        left: Array(GRID_SIZE).fill(false),
        right: Array(GRID_SIZE).fill(false)
      },
      columns: {
        up: Array(GRID_SIZE).fill(false),
        down: Array(GRID_SIZE).fill(false)
      }
    },
    wordHighlights,
    words
  };
};

// Helper to get Queuedle day number (24 May 2025 is day 1)
const getQueuedleDayNumber = () => {
  const msPerDay = 24 * 60 * 60 * 1000;
  const firstDay = new Date(2025, 4, 24).getTime(); // Months are 0-indexed: 4 = May
  const now = new Date();
  const todayLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.floor((todayLocal - firstDay) / msPerDay) + 1;
};

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(getInitialGameState);

  // Check for new day at midnight UTC
  useEffect(() => {
    const checkNewDay = () => {
      const currentSeed = getCurrentDaySeed();
      const lastSeed = localStorage.getItem('lastGameSeed');
      
      if (lastSeed !== currentSeed.toString()) {
        localStorage.setItem('lastGameSeed', currentSeed.toString());
        setGameState(getInitialGameState());
      }
    };

    // Check immediately and then every minute
    checkNewDay();
    const interval = setInterval(checkNewDay, 60000);
    return () => clearInterval(interval);
  }, []);

  const onSlide = (direction: SlideDirection, index: number) => {
    setGameState(prevState => {
      const nextState = handleSlide(prevState, direction, index);
      return {
        ...nextState,
        words: getWordsFromHighlights(nextState.grid, nextState.wordHighlights)
      };
    });
  };

  return (
    <main className="min-h-screen p-2 flex flex-col items-center bg-gray-50">
      <p className="text-md text-gray-700 mb-4 font-bold">
        Queuedle #{getQueuedleDayNumber()} by <a className="text-blue-500" href="https://twitter.com/healeycodes">@healeycodes</a>
      </p>
      <p className="max-w-xs mx-auto text-md text-gray-700 mb-6 text-left">
      Slide rows or columns to form words, pulling letters from the queue. Each row or column can only slide in one direction. No need to use all tiles — solve for the highest score.
      </p>
      
      <div className="mb-20">
        <QueueDisplay 
          queue={gameState.queue} 
          totalLetters={gameState.queue.length}
        />
      </div>

      <div className="mb-20">
        <Grid 
          grid={gameState.grid}
          onSlide={onSlide}
          restrictions={gameState.restrictions}
          wordHighlights={gameState.wordHighlights}
          disableAll={gameState.queue.length === 0}
        />
      </div>

      <div className="text-md font-medium text-gray-700 mb-4">
        Words: {gameState.words.join(', ') || '...'}<br />
        Score: {gameState.score}<br />
        Moves: {gameState.moves}
      </div>

      <div className="text-md font-medium text-gray-400 mb-2">
        Each letter in a word: 1 point<br />
        Word list: Scrabble (TWL06-US 3+)
      </div>
    </main>
  );
}
