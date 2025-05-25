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
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeToMidnight, setTimeToMidnight] = useState('');

  // Helper to calculate time until local midnight
  const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const diffMs = midnight.getTime() - now.getTime();
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h${minutes}m`;
  };

  // Update countdown every minute
  useEffect(() => {
    setTimeToMidnight(getTimeUntilMidnight());
    const interval = setInterval(() => {
      setTimeToMidnight(getTimeUntilMidnight());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Only initialize game state on mount
  useEffect(() => {
    const initialize = () => {
      const state = getInitialGameState();
      setGameState(state);
      setLoading(false);
      localStorage.setItem('lastGameSeed', getCurrentDaySeed().toString());
    };
    initialize();
  }, []);

  const onSlide = (direction: SlideDirection, index: number) => {
    if (!gameState) return;
    setGameState(prevState => {
      if (!prevState) return prevState;
      const nextState = handleSlide(prevState, direction, index);
      return {
        ...nextState,
        words: getWordsFromHighlights(nextState.grid, nextState.wordHighlights)
      };
    });
  };

  // Blank grid and queue for loading state
  const blankGrid = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''));
  const blankQueue = Array(VISIBLE_QUEUE_SIZE).fill('');

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
          queue={loading || !gameState ? blankQueue : gameState.queue} 
          totalLetters={loading || !gameState ? 0 : gameState.queue.length}
        />
      </div>
      <div className="mb-20">
        <Grid 
          grid={loading || !gameState ? blankGrid : gameState.grid}
          onSlide={onSlide}
          restrictions={loading || !gameState ? {
            rows: { left: Array(GRID_SIZE).fill(true), right: Array(GRID_SIZE).fill(true) },
            columns: { up: Array(GRID_SIZE).fill(true), down: Array(GRID_SIZE).fill(true) }
          } : gameState.restrictions}
          wordHighlights={loading || !gameState ? [] : gameState.wordHighlights}
          disableAll={loading || !gameState || gameState.queue.length === 0}
        />
      </div>
      <div className="text-md font-medium text-gray-700 mb-6">
        Words: {loading || !gameState ? '...' : (gameState.words.join(', ') || '...')}<br />
        Score: {loading || !gameState ? '...' : gameState.score}<br />
        Moves: {loading || !gameState ? '...' : gameState.moves}
      </div>
      <div className="text-md font-medium text-gray-700 mb-6">
      The next Queuedle starts in {timeToMidnight}.
      </div>
      <div className="text-md font-medium text-gray-400 mb-2">
        Each letter in a word: 1 point<br />
        Word list: Scrabble (TWL06-US 3+)
      </div>
    </main>
  );
}
