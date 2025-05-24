'use client';

import { useState, useEffect } from 'react';
import { GameState, GRID_SIZE, QUEUE_SIZE, VISIBLE_QUEUE_SIZE, SlideDirection } from './types';
import Grid from './components/Grid';
import QueueDisplay from './components/QueueDisplay';
import { handleSlide } from './utils/gameLogic';
import { getCurrentDaySeed, generateGameState } from './utils/seededRandom';

// Initialize game state with seeded random
const getInitialGameState = (): GameState => {
  const seed = getCurrentDaySeed();
  const { grid, queue } = generateGameState(seed);
  
  return {
    grid,
    queue,
    score: 0,
    wordScore: 0,
    movePenalty: 0,
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
    wordHighlights: []
  };
};

// Helper to get Queuedle day number (24 May 2025 is day 1)
const getQueuedleDayNumber = () => {
  const msPerDay = 24 * 60 * 60 * 1000;
  const firstDay = Date.UTC(2025, 4, 24); // Months are 0-indexed: 4 = May
  const now = new Date();
  const todayUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.floor((todayUTC - firstDay) / msPerDay) + 1;
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
    setGameState(prevState => handleSlide(prevState, direction, index));
  };

  return (
    <main className="min-h-screen p-2 flex flex-col items-center bg-gray-50">
      <p className="text-md text-gray-700 mb-4 font-bold">
        Queuedle #{getQueuedleDayNumber()} by <a className="text-blue-500" href="https://twitter.com/healeycodes">@healeycodes</a>
      </p>
      <p className="max-w-xs mx-auto text-md text-gray-700 mb-6 text-left">
        Slide rows or columns to form words, using the queue of upcoming letters. Each move inserts and shifts the grid. No need to use all tiles — solve for the highest score.
      </p>
      
      <div className="mb-6">
        <QueueDisplay 
          queue={gameState.queue} 
          totalLetters={gameState.queue.length}
        />
      </div>

      <div className="mb-6">
        <Grid 
          grid={gameState.grid}
          onSlide={onSlide}
          restrictions={gameState.restrictions}
          wordHighlights={gameState.wordHighlights}
        />
      </div>

      <div className="text-md font-medium text-gray-700 mb-4">
        Score: {gameState.score.toFixed(1)} ({gameState.wordScore.toFixed(0)} - {gameState.movePenalty.toFixed(1)})
      </div>

      <div className="text-md font-medium text-gray-400 mb-2">
        Each letter in a word: 1 point<br />
        Each move: -0.25 points<br />
        Word list: Scrabble (TWL06-US)
      </div>
    </main>
  );
}
