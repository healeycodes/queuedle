import { TileProps } from '../types';

export default function Tile({ letter }: TileProps) {
  return (
    <div 
      className={`
        m-1 p-1.5
        w-11 h-11 flex items-center justify-center
        rounded-lg
        text-2xl font-bold
        transition-colors duration-200
        bg-[#f5e6c5]
      `}
    >
      {letter.toUpperCase()}
    </div>
  );
} 