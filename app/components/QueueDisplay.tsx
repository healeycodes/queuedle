import { QueueDisplayProps } from '../types';
import { VISIBLE_QUEUE_SIZE } from '../types';
import { motion } from 'framer-motion';

export default function QueueDisplay({ queue, totalLetters, isLoading = false }: QueueDisplayProps & { isLoading?: boolean }) {
  return (
    <div className="flex flex-col items-center">    
      {(!(!isLoading && queue.length === 0)) && (
        <div className="text-md font-medium text-gray-700 mb-2">
          Queued Letters ({totalLetters}/15)
        </div>
      )}
      <div className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-gray-200 min-w-[68px] min-h-[68px]">
        {isLoading
          ? Array.from({ length: VISIBLE_QUEUE_SIZE }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: !isLoading && index > 0 ? 0.35 : 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.05 * index }}
                className={`
                  w-11 h-11 flex items-center justify-center
                  bg-[#f5e6c5] rounded-lg
                  text-xl font-bold
                  transition-opacity duration-200
                  ${index > 0 ? 'opacity-35' : ''}
                `}
              >
                {/* blank tile for loading */}
              </motion.div>
            ))
          : queue.length > 0
            ? queue.slice(0, VISIBLE_QUEUE_SIZE).map((letter, index) => (
                letter ? (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: !isLoading && index > 0 ? 0.35 : 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.05 * index }}
                    className={`
                      w-11 h-11 flex items-center justify-center
                      bg-[#f5e6c5] rounded-lg
                      text-xl font-bold
                      transition-opacity duration-200
                      ${index > 0 ? 'opacity-35' : ''}
                    `}
                  >
                    {letter.toUpperCase()}
                  </motion.div>
                ) : null
              ))
            : null
        }
      </div>
    </div>
  );
} 