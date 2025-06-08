# 🧩 Queuedle
> My blog posts:
> - [How I Made Queuedle](https://healeycodes.com/how-i-made-queuedle)
> - [Solving Queuedle](https://healeycodes.com/solving-queuedle)

<br>

A daily word sliding puzzle game – play it on [queuedle.com](https://queuedle.com).

Slide rows and columns of a 5x5 letter grid to form valid English words, using a queue of upcoming letters. Each move consumes a letter from the queue, and each row or column can only be slid in one direction per game. The goal is to form as many words as possible for the highest score.

<br>

<img src="https://github.com/healeycodes/queuedle/blob/main/public/preview.png" alt="A screenshot of a game of queuedle." width="360px">

<br>

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

<br>

## AI Solver

To run the AI solver that finds optimal solutions for the daily puzzle:

```bash
npm run solver
```

The solver uses a best-first search algorithm to explore possible moves and find high-scoring solutions. It will output the best move sequence and final score to the console.

Lots more info about the solver in [my blog post](https://healeycodes.com/solving-queuedle).

<br>

## Tech Stack
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Motion](https://www.npmjs.com/package/framer-motion) (for a few animations)
