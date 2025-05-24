import { ArrowButtonProps } from '../types';
import { ArrowBigDown, ArrowBigUp, ArrowBigLeft, ArrowBigRight } from 'lucide-react';

export default function ArrowButton({ direction, index, onClick, disabled }: ArrowButtonProps) {
  const getArrowIcon = () => {
    switch (direction) {
      case 'left': return <ArrowBigLeft className="w-6 h-6" />;
      case 'right': return <ArrowBigRight className="w-6 h-6" />;
      case 'up': return <ArrowBigUp className="w-6 h-6" />;
      case 'down': return <ArrowBigDown className="w-6 h-6" />;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-10 h-10 flex items-center justify-center
        rounded-md
        ${disabled 
          ? 'bg-gray-200 text-gray-300 cursor-not-allowed' 
          : 'bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer'
        }
        transition-colors duration-200
      `}
    >
      {getArrowIcon()}
    </button>
  );
} 