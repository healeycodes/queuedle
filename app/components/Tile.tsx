import { TileProps } from '../types';
import { motion } from 'framer-motion';

export default function Tile({ letter, isNew }: TileProps) {
  if (isNew) {
    return (
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
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
      </motion.div>
    );
  }
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