# Queuedle

Queuedle is a daily word sliding puzzle game. Slide rows and columns of a 5x5 letter grid to form valid English words, using a queue of upcoming letters. Each move consumes a letter from the queue, and each row or column can only be slid in one direction per game. The goal is to form as many words as possible for the highest score.

## Gameplay
- 5x5 grid of letters
- Slide rows (left/right) or columns (up/down) to shift letters
- Each move uses the next letter from a 15-letter queue (FIFO)
- Once a row/column is slid in one direction, it cannot be slid the opposite way
- Words (min. 3 letters) can be formed horizontally or vertically
- Words are checked against the Scrabble (TWL06-US) dictionary
- Each letter in a word scores 1 point
- The puzzle is the same for all players each day (seeded by UTC date)

## Visuals
- Words are highlighted with a soft blue outline
- Scrabble-inspired color theme
- Responsive, mobile-friendly design

## Tech Stack
- [Next.js](https://nextjs.org/) (React, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- Custom game logic and seeded randomization

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## License
MIT
