// The backend only has "priority" (low / medium / high).
// In the game theme we show it as difficulty and give each one some XP.
export const DIFFICULTY = {
  low: { label: 'Easy', xp: 10 },
  medium: { label: 'Normal', xp: 25 },
  high: { label: 'Boss', xp: 50 },
};

export const XP_PER_LEVEL = 100;
export const RANKS = ['Rookie', 'Squire', 'Knight', 'Champion', 'Legend'];

export const xpFor = (priority) => (DIFFICULTY[priority] || DIFFICULTY.low).xp;

// XP is not stored in the database. We calculate it from completed tasks.
export function getProgress(quests) {
  const totalXp = quests
    .filter((q) => q.completed && !q.pending)
    .reduce((sum, q) => sum + xpFor(q.priority), 0);
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  return {
    totalXp,
    level,
    xpInLevel: totalXp % XP_PER_LEVEL,
    rank: RANKS[Math.min(level - 1, RANKS.length - 1)],
  };
}
