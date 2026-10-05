import { useEffect, useRef, useState } from 'react';
import { DIFFICULTY } from '../utils';

// Used for both "New quest" and "Edit quest".
export default function QuestForm({ mode, initial, onSubmit, onClose }) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [priority, setPriority] = useState(initial?.priority || 'low');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && !saving && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, saving]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (!cleanTitle) {
      setError('Give your quest a title.');
      return;
    }
    setSaving(true);
    await onSubmit({ title: cleanTitle, description: description.trim(), priority });
    setSaving(false);
  };

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && !saving && onClose()}>
      <form className="window modal" onSubmit={handleSubmit} role="dialog" aria-modal="true" aria-labelledby="form-title">
        <h2 id="form-title">{mode === 'edit' ? 'Edit quest' : 'New quest'}</h2>

        <label className="field">
          <span>Title</span>
          <input
            ref={titleRef}
            value={title}
            maxLength={80}
            onChange={(e) => { setTitle(e.target.value); setError(''); }}
            placeholder="Finish practical 6 report"
          />
        </label>
        {error && <p className="field-error" role="alert">{error}</p>}

        <label className="field">
          <span>Details (optional)</span>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Anything you need to remember"
          />
        </label>

        <fieldset className="field diff-pick">
          <legend>Difficulty</legend>
          {Object.entries(DIFFICULTY).map(([value, d]) => (
            <label key={value}>
              <input type="radio" name="priority" value={value} checked={priority === value} onChange={() => setPriority(value)} />
              <span className={`diff-opt diff-opt-${value}`}>{d.label}<small>{d.xp} XP</small></span>
            </label>
          ))}
        </fieldset>

        <div className="modal-actions">
          <button type="button" className="btn ghost" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" className="btn" disabled={saving}>
            {saving ? 'Saving...' : mode === 'edit' ? 'Save changes' : 'Accept quest'}
          </button>
        </div>
      </form>
    </div>
  );
}
