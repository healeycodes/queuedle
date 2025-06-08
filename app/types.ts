// Re-export all types from the new organized structure
export * from './types/game';
export * from './types/components';

// Re-export constants for backward compatibility
export { GRID_SIZE, QUEUE_SIZE, VISIBLE_QUEUE_SIZE, MIN_WORD_LENGTH, POINTS_PER_LETTER } from './constants'; 