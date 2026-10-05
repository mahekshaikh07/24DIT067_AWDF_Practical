import { useState } from 'react';
import QuestItem from './QuestItem';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'cleared', label: 'Cleared' },
];

export default function QuestList({ quests, loading, loadError, busyIds, onRetry, onToggle, onEdit, onDelete }) {
  const [filter, setFilter] = useState('all');

  // Loading and error states for the first fetch
  if (loading) {
    return <p className="state">Loading quest log<span className="cursor">_</span></p>;
  }
  if (loadError) {
    return (
      <div className="state state-error" role="alert">
        <p>Could not load your quests.</p>
        <p className="state-detail">{loadError}</p>
        <button className="btn" onClick={onRetry}>Try again</button>
      </div>
    );
  }
  if (quests.length === 0) {
    return <p className="state">No quests yet. Press New quest to add your first one.</p>;
  }

  const counts = {
    all: quests.length,
    active: quests.filter((q) => !q.completed).length,
    cleared: quests.filter((q) => q.completed).length,
  };

  const visible = quests
    .filter((q) => (filter === 'active' ? !q.completed : filter === 'cleared' ? q.completed : true))
    // active quests first, newest first
    .sort((a, b) => Number(a.completed) - Number(b.completed) || new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <div className="tabs" role="tablist" aria-label="Filter quests">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            role="tab"
            aria-selected={filter === f.id}
            className={`tab ${filter === f.id ? 'on' : ''}`}
            onClick={() => setFilter(f.id)}
          >
            {f.label} ({counts[f.id]})
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="state">Nothing in this tab.</p>
      ) : (
        <ul className="quests">
          {visible.map((q) => (
            <QuestItem
              key={q._id}
              quest={q}
              busy={busyIds.includes(q._id)}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </>
  );
}
