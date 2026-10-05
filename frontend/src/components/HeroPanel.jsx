import { XP_PER_LEVEL } from '../utils';

// 12 x 14 pixel knight. Each letter is one colour.
const SPRITE = [
  '....rrrr....',
  '...hhhhhh...',
  '..hhhhhhhh..',
  '..hddhhddh..',
  '..hhhhhhhh..',
  '..hhddddhh..',
  '...bbbbbb...',
  '..bbbssbbb..',
  '.bbbbssbbbb.',
  '.sbbbbbbbbs.',
  '..bbbbbbbb..',
  '..bb....bb..',
  '..bb....bb..',
  '..dd....dd..',
];
const COLORS = { r: '#ff6a5e', h: '#d6dcff', d: '#0b1033', b: '#4f6bff', s: '#ffd23f' };

function Knight() {
  return (
    <svg className="knight" viewBox="0 0 12 14" shapeRendering="crispEdges" role="img" aria-label="Your hero">
      {SPRITE.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={COLORS[ch]} />
        )
      )}
    </svg>
  );
}

export default function HeroPanel({ progress, stats }) {
  const { level, rank, xpInLevel, totalXp } = progress;
  return (
    <aside className="window hero" aria-label="Hero status">
      <Knight />
      <h2 className="hero-level">Level {level}</h2>
      <p className="hero-rank">{rank}</p>

      <div className="xp" role="progressbar" aria-valuemin="0" aria-valuemax={XP_PER_LEVEL} aria-valuenow={xpInLevel} aria-label="Experience">
        <div className="xp-fill" style={{ width: `${xpInLevel}%` }} />
      </div>
      <p className="xp-text">
        {xpInLevel} / {XP_PER_LEVEL} XP
      </p>
      <p className="xp-total">Total earned: {totalXp} XP</p>

      <dl className="stats">
        <div><dt>Active quests</dt><dd>{stats.active}</dd></div>
        <div><dt>Cleared</dt><dd>{stats.cleared}</dd></div>
        <div><dt>Bosses left</dt><dd>{stats.bosses}</dd></div>
      </dl>
    </aside>
  );
}
