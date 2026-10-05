import { DIFFICULTY } from '../utils';

export default function QuestItem({ quest, busy, onToggle, onEdit, onDelete }) {
  const diff = DIFFICULTY[quest.priority] || DIFFICULTY.low;
  const locked = busy || quest.pending; // no actions while a request is running
  const date = new Date(quest.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

  return (
    <li className={`quest diff-${quest.priority} ${quest.completed ? 'done' : ''} ${quest.pending ? 'pending' : ''}`}>
      <button
        className="check"
        onClick={() => onToggle(quest)}
        disabled={locked}
        aria-pressed={quest.completed}
        aria-label={quest.completed ? `Mark "${quest.title}" as active` : `Complete "${quest.title}"`}
      >
        {quest.completed ? 'X' : ''}
      </button>

      <div className="quest-body">
        <h3>{quest.title}</h3>
        {quest.description && <p className="quest-desc">{quest.description}</p>}
        <p className="quest-meta">
          <span className="tag">{diff.label}, {diff.xp} XP</span>
          <span>Added {date}</span>
          {quest.pending && <span className="saving">Saving...</span>}
          {busy && <span className="saving">Working...</span>}
        </p>
      </div>

      <div className="quest-actions">
        <button className="btn ghost small" onClick={() => onEdit(quest)} disabled={locked}>Edit</button>
        <button className="btn danger small" onClick={() => onDelete(quest)} disabled={locked}>Delete</button>
      </div>
    </li>
  );
}
