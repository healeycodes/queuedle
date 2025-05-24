import { QueueDisplayProps } from '../types';
import { VISIBLE_QUEUE_SIZE } from '../types';

export default function QueueDisplay({ queue, totalLetters }: QueueDisplayProps) {
  return (
    <div className="flex flex-col items-center">    
      <div className="text-md font-medium text-gray-700 mb-2">
        Queued Letters ({totalLetters}/15)
      </div>
      <div className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-gray-200 min-h-[3.5rem]">
        {queue.slice(0, VISIBLE_QUEUE_SIZE).map((letter, index) => (
          <div
            key={index}
            className={`
              w-11 h-11 flex items-center justify-center
              bg-gray-50 border-2 border-gray-200 rounded-lg
              text-xl font-bold
              ${index > 0 ? 'opacity-50' : ''}
              transition-opacity duration-200
            `}
          >
            {letter.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
} 