import { Score, DrawResult } from './types';

interface DrawConfig {
  mode: 'random' | 'algorithmic';
  prizePool: number;
  participants: { userId: string; userName: string; scores: Score[] }[];
}

const PRIZE_SPLIT = { 5: 0.40, 4: 0.35, 3: 0.25 };

export function executeDraw(config: DrawConfig): DrawResult[] {
  const { mode, prizePool, participants } = config;
  if (participants.length < 3) return [];

  let selected: typeof participants;

  if (mode === 'random') {
    selected = shuffleArray([...participants]);
  } else {
    // Algorithmic: weight by score frequency/consistency
    selected = [...participants].sort((a, b) => {
      const avgA = a.scores.reduce((s, sc) => s + sc.value, 0) / (a.scores.length || 1);
      const avgB = b.scores.reduce((s, sc) => s + sc.value, 0) / (b.scores.length || 1);
      return avgB - avgA;
    });
  }

  const matchTypes: (5 | 4 | 3)[] = [5, 4, 3];
  return matchTypes.map((matchType, i) => ({
    matchType,
    userId: selected[i].userId,
    userName: selected[i].userName,
    prize: Math.round(prizePool * PRIZE_SPLIT[matchType]),
    verified: false,
    paymentStatus: 'pending' as const,
  }));
}

function shuffleArray<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
