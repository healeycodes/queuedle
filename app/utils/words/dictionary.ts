import twl06 from '../../../data/twl06.json';

const VALID_WORDS = new Set(twl06.filter(word => word.length >= 3).map(word => word.toLowerCase()));

export const isValidWord = (word: string): boolean => {
  return VALID_WORDS.has(word.toLowerCase());
}; 