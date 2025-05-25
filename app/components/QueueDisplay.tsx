import { QueueDisplayProps } from '../types';
import { VISIBLE_QUEUE_SIZE } from '../types';

export default function QueueDisplay({ queue, totalLetters }: QueueDisplayProps) {
  return (
    <div className="flex flex-col items-center">    
      <div className="text-md font-medium text-gray-700 mb-2">
        Queued Letters ({totalLetters}/15)
      </div>
      <div className="flex items-center space-x-2 bg-white p-3 rounded-lg shadow-sm border border-gray-200 min-h-[3.5rem]">
        {Array.from({ length: VISIBLE_QUEUE_SIZE }).map((_, index) => (
          <div
            key={index}
            className={`
              w-11 h-11 flex items-center justify-center
              bg-[#f5e6c5] rounded-lg
              text-xl font-bold
              transition-opacity duration-200
              ${index > 0 ? 'opacity-50' : ''}
              ${queue[index] ? '' : 'invisible'}
            `}
          >
            {queue[index] ? queue[index].toUpperCase() : ''}
          </div>
        ))}
      </div>
    </div>
  );
} 