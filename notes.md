# Queuedle - Word Sliding Game

## Game Overview
Queuedle is a word puzzle game where players slide rows and columns of letters to form words. The game features a 5x5 grid of letters and a queue of upcoming letters that players can use to make moves.

## Core Mechanics

### Grid System
- 5x5 grid of letters
- Letters can be slid horizontally (left/right) or vertically (up/down)
- Each move consumes one letter from the queue
- Letters that slide off the grid are replaced by the next letter in the queue

### Movement Restrictions
- Once a row is slid left, it cannot be slid right again
- Once a row is slid right, it cannot be slid left again
- Once a column is slid up, it cannot be slid down again
- Once a column is slid down, it cannot be slid up again
- These restrictions create strategic depth and prevent infinite loops

### Word Formation
- Words can be formed horizontally or vertically
- Minimum word length is 3 letters
- Words must be valid English words (checked against a dictionary)
- Words are highlighted with different colors when formed
- Multiple words can be formed in a single move

### Scoring System
- Each letter in a formed word is worth 1 point
- Each move incurs a penalty of 0.25 points
- Final score = Sum of word lengths - (0.25 × number of moves)

### Letter Queue
- Queue size is 15 letters total
- Only first 3 letters are visible at a time
- Letters are consumed in order (FIFO)
- Queue is displayed above the grid with count (e.g., "Next Letters (15/15)")
- Future letters are shown with a fade effect
- Queue display maintains height even when empty

### Seeded Random System
- Game state is seeded based on the current UTC day
- Same seed produces the same initial board and queue for all players
- New game starts at midnight UTC each day
- Browser's local time is used to determine the current day
- Initial board and 15-letter queue are generated from the seed
- Ensures all players get the same puzzle each day

## Technical Implementation

### State Management
The game state is managed through a React state object containing:
- Grid: 2D array of letters
- Queue: Array of upcoming letters
- Score: Current game score
- Moves: Number of moves made
- Restrictions: Tracking of row/column slide restrictions
- WordHighlights: Array of currently formed words and their positions

### Core Components
1. Grid: Main 5x5 game board
2. Tile: Individual letter tile with highlighting
3. ArrowButton: Control buttons for sliding
4. QueueDisplay: Shows upcoming letters
5. ScoreDisplay: Shows current score and moves

### Game Logic
1. Sliding Mechanics:
   - Row sliding: Shifts letters and adds new letter from queue
   - Column sliding: Shifts letters and adds new letter from queue
   - Updates restrictions after each move

2. Word Detection:
   - Checks both horizontal and vertical words
   - Validates words against dictionary
   - Prevents counting sub-words of longer words
   - Assigns unique colors to different words

3. Scoring:
   - Calculates points based on word lengths
   - Applies move penalty
   - Updates total score

### Visual Features
- Rainbow gradient borders for word highlighting
- Disabled states for restricted moves
- Fade effects for future queue letters
- Responsive design for different screen sizes

## Game Flow
1. Game initializes with a 5x5 grid and 3-letter queue
2. Player makes moves by sliding rows/columns
3. Each move:
   - Consumes a letter from the queue
   - Updates the grid
   - Checks for word formation
   - Updates score
   - Updates restrictions
4. Game continues until player decides to stop

## Technical Stack
- Next.js for the framework
- TypeScript for type safety
- Tailwind CSS for styling
- React for UI components
- Custom game logic implementation
