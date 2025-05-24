// Rainbow colors for word highlighting
export const RAINBOW_COLORS = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
] as const;

export type RainbowColor = typeof RAINBOW_COLORS[number];

// Get color based on word position (0-based index)
export const getColorForPosition = (position: number): RainbowColor => {
  return RAINBOW_COLORS[position % RAINBOW_COLORS.length];
};

// Get Tailwind color classes for a given color
export const getColorClasses = (color: RainbowColor) => {
  switch (color) {
    case 'red': return 'border-red-500 bg-red-50';
    case 'orange': return 'border-orange-500 bg-orange-50';
    case 'yellow': return 'border-yellow-500 bg-yellow-50';
    case 'green': return 'border-green-500 bg-green-50';
    case 'blue': return 'border-blue-500 bg-blue-50';
    case 'purple': return 'border-purple-500 bg-purple-50';
  }
}; 