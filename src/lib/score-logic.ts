import { Score } from './types';

const MAX_SCORES = 5;

export function addScore(scores: Score[], newScore: Omit<Score, 'id' | 'createdAt'>): Score[] {
  const score: Score = {
    ...newScore,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const sorted = [...scores, score].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return sorted.slice(0, MAX_SCORES);
}

export function getAverageScore(scores: Score[]): number {
  if (scores.length === 0) return 0;
  return Math.round(scores.reduce((sum, s) => sum + s.value, 0) / scores.length);
}

export function getHighestScore(scores: Score[]): number {
  if (scores.length === 0) return 0;
  return Math.max(...scores.map(s => s.value));
}

export function validateScore(value: number): boolean {
  return Number.isInteger(value) && value >= 1 && value <= 45;
}
