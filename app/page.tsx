'use client';

import { useState, useEffect } from 'react';
import { GameState, SlideDirection } from './types/game';
import { GRID_SIZE, VISIBLE_QUEUE_SIZE, MS_PER_DAY, FIRST_QUEUEDLE_DAY } from './constants';
import Grid from './components/Grid';
import QueueDisplay from './components/QueueDisplay';
import { getInitialGameState, handleSlide } from './utils/game/gameLogic';
import { getCurrentDaySeed } from './utils/game/seededRandom';
import { getWordsFromHighlights } from './utils/words/wordDetection';
import { motion } from 'framer-motion';

// Helper to get Queuedle day number (24 May 2025 is day 1)
const getQueuedleDayNumber = () => {
  const firstDay = FIRST_QUEUEDLE_DAY.getTime();
  const now = new Date();
  const todayLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.floor((todayLocal - firstDay) / MS_PER_DAY) + 1;
};

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(true);
  // Track the previous words string for animation
  const [wordsText, setWordsText] = useState('');

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

  const wordsString = gameState ? gameState.words.join(', ') : '';

  useEffect(() => {
    if (!loading && gameState) {
      setWordsText(gameState.words.join(', '));
    }
  }, [loading, wordsString, gameState]);

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

  const isQueueEmpty = !loading && gameState && gameState.queue.length === 0;

  return (
    <main className="min-h-screen p-2 flex flex-col items-center bg-gray-50">
      <div className="text-md text-gray-700 mb-4 font-bold">
        Daily Queuedle #{getQueuedleDayNumber()} by <a className="text-blue-500" href="https://twitter.com/healeycodes">@healeycodes</a>
        <div className="text-md font-medium text-gray-400 mb-4">
          1: <a className="text-blue-500" href="https://healeycodes.com/how-i-made-queuedle">How I Made Queuedle</a>
          <br />
          2: <a className="text-blue-500" href="https://healeycodes.com/solving-queuedle">Solving Queuedle</a>
        </div>
      </div>
      <p className="max-w-xs mx-auto text-md text-gray-700 mb-6 text-left">
        Slide rows or columns to form words, pulling letters from the queue. Each row or column slides in one direction. No need to empty the letter queue — solve for the highest score.
      </p>
      <div className="mb-6">
        {(!isQueueEmpty) && (
          <QueueDisplay
            queue={loading || !gameState ? blankQueue : gameState.queue}
            totalLetters={loading || !gameState ? 0 : gameState.queue.length}
            isLoading={loading || !gameState}
          />
        )}
      </div>
      <div className="text-lg font-medium text-gray-700 mb-20">
        Score: {loading || !gameState ? '...' : gameState.score}<br />
        Moves: {loading || !gameState ? '...' : gameState.moves}
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
          newTile={loading || !gameState ? undefined : gameState.newTile}
        />
      </div>
      <div className="text-lg font-medium text-gray-700 mb-6">
        Words: {loading || !gameState ? '...' : (
          !wordsText.trim()
            ? '...'
            : (() => {
              if (wordsText.length <= 21) {
                return wordsText.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.08, delay: index * 0.02 }}
                  >
                    {letter}
                  </motion.span>
                ));
              }
              // Find last comma before or at 21st character
              const splitIdx = wordsText.lastIndexOf(',', 21);
              if (splitIdx === -1) {
                // No comma found, just split at 21
                return <>
                  {wordsText.slice(0, 21).split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.08, delay: index * 0.02 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  <br />
                  {wordsText.slice(21).split('').map((letter, index) => (
                    <motion.span
                      key={21 + index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.08, delay: (21 + index) * 0.02 }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </>;
              }
              // Split at the last comma
              const first = wordsText.slice(0, splitIdx + 1);
              const second = wordsText.slice(splitIdx + 1).trimStart();
              return <>
                {first.split('').map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.08, delay: index * 0.02 }}
                  >
                    {letter}
                  </motion.span>
                ))}
                <br />
                {second.split('').map((letter, index) => (
                  <motion.span
                    key={first.length + index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.08, delay: (first.length + index) * 0.02 }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </>;
            })()
        )}
      </div>
      <div className="text-md font-medium text-gray-400 mb-2">
        Each letter in a word: 1 point<br />
        Word list: Scrabble (TWL06-US 3+)
      </div>
    </main>
  );
}
