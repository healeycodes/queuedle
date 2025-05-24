import { GridProps, GameState, WordHighlight } from '../types';
import Tile from './Tile';
import ArrowButton from './ArrowButton';

export default function Grid({ grid, onSlide, restrictions, wordHighlights }: GridProps) {
  const isTileInWord = (row: number, col: number) => {
    return wordHighlights.some(highlight => {
      if (highlight.direction === 'horizontal') {
        return row === highlight.row && col >= highlight.start && col <= highlight.end;
      } else {
        return col === highlight.col && row >= highlight.start && row <= highlight.end;
      }
    });
  };

  const getTileColor = (row: number, col: number) => {
    const highlight = wordHighlights.find(h => {
      if (h.direction === 'horizontal') {
        return row === h.row && col >= h.start && col <= h.end;
      } else {
        return col === h.col && row >= h.start && row <= h.end;
      }
    });
    return highlight?.color;
  };

  return (
    <div className="relative">
      {/* Column arrows (top) */}
      <div className="flex justify-center space-x-2 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`up-${i}`} className="w-11 flex justify-center">
            <ArrowButton
              direction="down"
              index={i}
              onClick={() => onSlide('down', i)}
              disabled={restrictions.columns.down[i]}
            />
          </div>
        ))}
      </div>

      <div className="flex">
        {/* Row arrows (left) */}
        <div className="flex flex-col justify-center space-y-2 mr-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`left-${i}`} className="h-11 flex items-center">
              <ArrowButton
                direction="right"
                index={i}
                onClick={() => onSlide('right', i)}
                disabled={restrictions.rows.right[i]}
              />
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-5 gap-2">
          {grid.map((row, i) =>
            row.map((letter, j) => (
              <Tile
                key={`${i}-${j}`}
                letter={letter}
                isPartOfWord={isTileInWord(i, j)}
                wordColor={getTileColor(i, j)}
              />
            ))
          )}
        </div>

        {/* Row arrows (right) */}
        <div className="flex flex-col justify-center space-y-2 ml-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`right-${i}`} className="h-11 flex items-center">
              <ArrowButton
                direction="left"
                index={i}
                onClick={() => onSlide('left', i)}
                disabled={restrictions.rows.left[i]}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Column arrows (bottom) */}
      <div className="flex justify-center space-x-2 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`down-${i}`} className="w-11 flex justify-center">
            <ArrowButton
              direction="up"
              index={i}
              onClick={() => onSlide('up', i)}
              disabled={restrictions.columns.up[i]}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 