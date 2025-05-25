import { GridProps } from '../types';
import Tile from './Tile';
import ArrowButton from './ArrowButton';

// Constants for tile sizing (must match Tile component)
const TILE_SIZE = 44; // px, matches w-11 h-11
const TILE_MARGIN = 4; // px, matches m-1
const TILE_PADDING = 6; // px, matches p-1.5
const TILE_TOTAL = TILE_SIZE + TILE_MARGIN * 2; // 52px

// Helper to get outline style for a word
function getOutlineStyle(highlight: GridProps['wordHighlights'][number]) {
  if (highlight.direction === 'horizontal') {
    return {
      left: highlight.start * TILE_TOTAL,
      top: highlight.row * TILE_TOTAL,
      width: (highlight.end - highlight.start + 1) * TILE_TOTAL,
      height: TILE_TOTAL,
    };
  } else {
    return {
      left: highlight.col * TILE_TOTAL,
      top: highlight.start * TILE_TOTAL,
      width: TILE_TOTAL,
      height: (highlight.end - highlight.start + 1) * TILE_TOTAL,
    };
  }
}

export default function Grid({ grid, onSlide, restrictions, wordHighlights, disableAll = false }: GridProps & { disableAll?: boolean }) {
  return (
    <div className="relative" style={{ width: 5 * TILE_TOTAL, height: 5 * TILE_TOTAL }}>
      {/* Outlines */}
      {wordHighlights.map((h, idx) => (
        <div
          key={idx}
          className="absolute border-4 border-blue-300 rounded-lg pointer-events-none"
          style={{
            ...getOutlineStyle(h),
            boxSizing: 'border-box',
            zIndex: 1,
          }}
        />
      ))}

      {/* Column arrows (top) */}
      <div className="flex justify-center space-x-2 mb-2" style={{ position: 'absolute', top: -TILE_TOTAL, left: 0, width: '100%' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`up-${i}`} className="w-11 flex justify-center">
            <ArrowButton
              direction="down"
              index={i}
              onClick={() => onSlide('down', i)}
              disabled={disableAll || restrictions.columns.down[i]}
            />
          </div>
        ))}
      </div>

      <div className="flex" style={{ position: 'absolute', left: -TILE_TOTAL, top: 0, height: '100%' }}>
        {/* Row arrows (left) */}
        <div className="flex flex-col justify-center space-y-2 mr-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`left-${i}`} className="h-11 flex items-center">
              <ArrowButton
                direction="right"
                index={i}
                onClick={() => onSlide('right', i)}
                disabled={disableAll || restrictions.rows.right[i]}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5" style={{ position: 'relative', zIndex: 2 }}>
        {grid.map((row, i) =>
          row.map((letter, j) => (
            <Tile
              key={`${i}-${j}`}
              letter={letter}
            />
          ))
        )}
      </div>

      <div className="flex" style={{ position: 'absolute', right: -TILE_TOTAL, top: 0, height: '100%' }}>
        {/* Row arrows (right) */}
        <div className="flex flex-col justify-center space-y-2 ml-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={`right-${i}`} className="h-11 flex items-center">
              <ArrowButton
                direction="left"
                index={i}
                onClick={() => onSlide('left', i)}
                disabled={disableAll || restrictions.rows.left[i]}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Column arrows (bottom) */}
      <div className="flex justify-center space-x-2 mt-2" style={{ position: 'absolute', bottom: -TILE_TOTAL, left: 0, width: '100%' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={`down-${i}`} className="w-11 flex justify-center">
            <ArrowButton
              direction="up"
              index={i}
              onClick={() => onSlide('up', i)}
              disabled={disableAll || restrictions.columns.up[i]}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 