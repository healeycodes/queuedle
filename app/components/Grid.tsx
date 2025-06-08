import { GridProps } from '../types/components';
import { TILE_TOTAL } from '../constants';
import Tile from './Tile';
import ArrowButton from './ArrowButton';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to get outline style for a word
function getOutlineStyle(highlight: GridProps['wordHighlights'][number]) {
  const OUTLINE_OFFSET = 2; // px
  if (highlight.direction === 'horizontal') {
    return {
      left: highlight.start * TILE_TOTAL - OUTLINE_OFFSET,
      top: highlight.row * TILE_TOTAL - OUTLINE_OFFSET,
      width: (highlight.end - highlight.start + 1) * TILE_TOTAL + OUTLINE_OFFSET * 2,
      height: TILE_TOTAL + OUTLINE_OFFSET * 2,
    };
  } else {
    return {
      left: highlight.col * TILE_TOTAL - OUTLINE_OFFSET,
      top: highlight.start * TILE_TOTAL - OUTLINE_OFFSET,
      width: TILE_TOTAL + OUTLINE_OFFSET * 2,
      height: (highlight.end - highlight.start + 1) * TILE_TOTAL + OUTLINE_OFFSET * 2,
    };
  }
}

export default function Grid({ grid, onSlide, restrictions, wordHighlights, disableAll = false, newTile }: GridProps & { disableAll?: boolean, newTile?: { row: number, col: number } }) {
  return (
    <div className="relative" style={{ width: 5 * TILE_TOTAL, height: 5 * TILE_TOTAL }}>
      {/* Outlines */}
      <AnimatePresence initial={false}>
        {wordHighlights.map((h) => (
          <motion.div
            key={h.direction + '-' + h.row + '-' + h.col + '-' + h.start + '-' + h.end}
            className="absolute border-4 border-blue-300 rounded-lg pointer-events-none"
            style={{
              ...getOutlineStyle(h),
              boxSizing: 'border-box',
              zIndex: 1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </AnimatePresence>

      {/* Column arrows (top) */}
      <div className="flex justify-center space-x-2 mb-2" style={{ position: 'absolute', top: -TILE_TOTAL, left: 0, width: '100%' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`up-${i}`}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.05 * i }}
            className="w-11 flex justify-center"
          >
            <ArrowButton
              direction="down"
              index={i}
              onClick={() => onSlide('down', i)}
              disabled={disableAll || restrictions.columns.down[i]}
            />
          </motion.div>
        ))}
      </div>

      <div className="flex" style={{ position: 'absolute', left: -TILE_TOTAL, top: 0, height: '100%' }}>
        {/* Row arrows (left) */}
        <div className="flex flex-col justify-center space-y-2 mr-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`left-${i}`}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.05 * i }}
              className="h-11 flex items-center"
            >
              <ArrowButton
                direction="right"
                index={i}
                onClick={() => onSlide('right', i)}
                disabled={disableAll || restrictions.rows.right[i]}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5" style={{ position: 'relative', zIndex: 2 }}>
        {grid.map((row, i) =>
          row.map((letter, j) => {
            const isNew = !!(newTile && newTile.row === i && newTile.col === j);
            return (
              <motion.div
                key={`${i}-${j}`}
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.05 * (i * 5 + j) }}
              >
                <Tile
                  key={isNew ? `new-${i}-${j}-${letter}` : `${i}-${j}`}
                  letter={letter}
                  isNew={isNew}
                />
              </motion.div>
            );
          })
        )}
      </div>

      <div className="flex" style={{ position: 'absolute', right: -TILE_TOTAL, top: 0, height: '100%' }}>
        {/* Row arrows (right) */}
        <div className="flex flex-col justify-center space-y-2 ml-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`right-${i}`}
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.05 * i }}
              className="h-11 flex items-center"
            >
              <ArrowButton
                direction="left"
                index={i}
                onClick={() => onSlide('left', i)}
                disabled={disableAll || restrictions.rows.left[i]}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Column arrows (bottom) */}
      <div className="flex justify-center space-x-2 mt-2" style={{ position: 'absolute', bottom: -TILE_TOTAL, left: 0, width: '100%' }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`down-${i}`}
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 0.05 * i }}
            className="w-11 flex justify-center"
          >
            <ArrowButton
              direction="up"
              index={i}
              onClick={() => onSlide('up', i)}
              disabled={disableAll || restrictions.columns.up[i]}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
} 