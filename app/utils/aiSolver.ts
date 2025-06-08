import { getInitialGameState } from './game/gameLogic';
import { GameState, SlideDirection } from '../types/game';
import { GRID_SIZE } from '../constants';
import { handleSlide } from './game/gameLogic';
import { findWords } from './words/wordDetection';
import { calculateWordScore } from './words/wordDetection';

export type Move = { direction: SlideDirection; index: number };

// Simple max-heap priority queue for nodes
class PriorityQueue<T> {
    private heap: { item: T; priority: number }[] = [];

    enqueue(item: T, priority: number) {
        this.heap.push({ item, priority });
        this.bubbleUp();
    }

    dequeue(): T | undefined {
        if (this.heap.length === 0) return undefined;
        const top = this.heap[0].item;
        const end = this.heap.pop();
        if (this.heap.length > 0 && end) {
            this.heap[0] = end;
            this.bubbleDown();
        }
        return top;
    }

    get length() {
        return this.heap.length;
    }

    private bubbleUp() {
        let idx = this.heap.length - 1;
        const element = this.heap[idx];
        while (idx > 0) {
            const parentIdx = Math.floor((idx - 1) / 2);
            const parent = this.heap[parentIdx];
            if (element.priority <= parent.priority) break;
            this.heap[idx] = parent;
            this.heap[parentIdx] = element;
            idx = parentIdx;
        }
    }

    private bubbleDown() {
        let idx = 0;
        const length = this.heap.length;
        const element = this.heap[0];
        while (true) {
            const leftChildIdx = 2 * idx + 1;
            const rightChildIdx = 2 * idx + 2;
            let swap: number | null = null;
            if (leftChildIdx < length) {
                if (this.heap[leftChildIdx].priority > element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                if (
                    this.heap[rightChildIdx].priority >
                    (swap === null ? element.priority : this.heap[leftChildIdx].priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.heap[idx] = this.heap[swap];
            this.heap[swap] = element;
            idx = swap;
        }
    }
}

// Evaluation function
function evaluateState(state: GameState): number {
    return calculateWordScore(findWords(state.grid));
}

// Generate all valid moves for a given state
function getValidMoves(state: GameState): Move[] {
    const moves: Move[] = [];
    if (state.queue.length === 0) return moves;
    for (let i = 0; i < GRID_SIZE; i++) {
        if (!state.restrictions.rows.left[i]) moves.push({ direction: 'left', index: i });
        if (!state.restrictions.rows.right[i]) moves.push({ direction: 'right', index: i });
        if (!state.restrictions.columns.up[i]) moves.push({ direction: 'up', index: i });
        if (!state.restrictions.columns.down[i]) moves.push({ direction: 'down', index: i });
    }
    return moves;
}

// Helper to hash a state (grid + queue + restrictions)
function hashState(state: GameState): number {
    let hash = 2166136261; // FNV-1a offset basis

    // Hash grid letters
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        const code = state.grid[i][j].charCodeAt(0) - 97; // 'a' = 0
        hash ^= code & 0x1F;
        hash = Math.imul(hash, 16777619);
      }
    }

    return hash;
}

type Node = { state: GameState; moves: Move[]; score: number };

// Best-first search for Queuedle
export function bestFirstSearch(
    initialState: GameState,
    maxNodes: number = 500_000
): { bestState: GameState; moveSequence: Move[] } {
    let nodesExpanded = 0;
    const initialNode: Node = {
        state: initialState,
        moves: [],
        score: evaluateState(initialState)
    };

    // Three key data structures for best-first search
    const queue = new PriorityQueue<Node>();  // Nodes sorted by score
    const visited = new Set<number>();        // Avoid cycles
    let bestNode = initialNode;               // Track best node found so far

    queue.enqueue(initialNode, initialNode.score);

    // Always explore the highest-scoring node next
    while (queue.length > 0 && nodesExpanded < maxNodes) {
        if (nodesExpanded % 50_000 === 0) {
            console.log(`[Queuedle] Expanded ${nodesExpanded}/${maxNodes} nodes, queue length: ${queue.length}`);
        }

        const node = queue.dequeue()!;
        nodesExpanded++;

        if (node.state.score > bestNode.state.score) {
            bestNode = node;
        }

        // Skip if we've already explored this state
        const hash = hashState(node.state);
        if (visited.has(hash)) {
            continue;
        }
        visited.add(hash);

        // Generate all possible next moves and add to queue
        for (const move of getValidMoves(node.state)) {
            const nextState = handleSlide(node.state, move.direction, move.index);
            const score = evaluateState(nextState) + (15 - node.moves.length);
            queue.enqueue({
                state: nextState,
                moves: [...node.moves, move], score
            }, score);
        }
    }

    return { bestState: bestNode.state, moveSequence: bestNode.moves };
}

const initialState = getInitialGameState();
const start = performance.now();
const { bestState, moveSequence } = bestFirstSearch(initialState);
const end = performance.now();
console.log(`[Queuedle] Moves: ${moveSequence.length}`);
console.log(`[Queuedle] Score: ${bestState.score}`);
console.log(`[Queuedle] Time taken: ${end - start}ms`);

