import { TileProps } from '../types';
import { getColorClasses } from '../utils/wordColors';

export default function Tile({ letter, isPartOfWord, wordColor }: TileProps) {
  return (
    <div 
      className={`
        w-11 h-11 flex items-center justify-center
        border-2 rounded-lg
        text-2xl font-bold
        transition-colors duration-200
        ${isPartOfWord && wordColor ? getColorClasses(wordColor) : 'bg-white border-gray-300'}
      `}
    >
      {letter.toUpperCase()}
    </div>
  );
} 