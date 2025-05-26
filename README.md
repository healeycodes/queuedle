# Queuedle

Queuedle is a daily word sliding puzzle game. Slide rows and columns of a 5x5 letter grid to form valid English words, using a queue of upcoming letters. Each move consumes a letter from the queue, and each row or column can only be slid in one direction per game. The goal is to form as many words as possible for the highest score. No need to use every letter from the queue.

<br>

<img src="https://github.com/healeycodes/queuedle/blob/main/public/preview.png" alt="A screenshot of a game of queuedle." width="360px">

<br>

## Tech Stack
- [Next.js](https://nextjs.org/) (React, TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Motion](https://www.npmjs.com/package/framer-motion) for animation
- Custom game logic and seeded randomization

<br>

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
