import { useEffect, useMemo, useRef, useState } from 'react';
import useQuests from './hooks/useQuests';
import useToasts from './hooks/useToasts';
import { getProgress } from './utils';
import HeroPanel from './components/HeroPanel';
import QuestList from './components/QuestList';
import QuestForm from './components/QuestForm';
import ConfirmDialog from './components/ConfirmDialog';
import Toasts from './components/Toasts';

export default function App() {
  const { toasts, notify, dismiss } = useToasts();
  const { quests, loading, loadError, busyIds, reload, addQuest, updateQuest, removeQuest } = useQuests(notify);

  const [form, setForm] = useState(null);        // { mode: 'create' | 'edit', quest?, draft? }
  const [toDelete, setToDelete] = useState(null); // quest waiting for delete confirmation
  const [deleting, setDeleting] = useState(false);

  // Numbers shown in the hero panel
  const progress = useMemo(() => getProgress(quests), [quests]);
  const stats = useMemo(() => {
    const real = quests.filter((q) => !q.pending);
    return {
      active: real.filter((q) => !q.completed).length,
      cleared: real.filter((q) => q.completed).length,
      bosses: real.filter((q) => !q.completed && q.priority === 'high').length,
    };
  }, [quests]);

  // Level-up message (skipped for the very first load)
  const lastLevel = useRef(null);
  useEffect(() => {
    if (loading) return;
    if (lastLevel.current !== null && progress.level > lastLevel.current) {
      notify('levelup', `Level up! You are now level ${progress.level}`);
    }
    lastLevel.current = progress.level;
  }, [progress.level, loading, notify]);

  const handleToggle = (quest) =>
    updateQuest(quest._id, { completed: !quest.completed }, quest.completed ? 'Quest reopened' : 'Quest cleared');

  const handleSubmit = async (data) => {
    if (form.mode === 'edit') {
      const ok = await updateQuest(form.quest._id, data, 'Quest updated');
      if (ok) setForm(null);                 // stay open if it failed, so nothing is lost
    } else {
      setForm(null);                         // optimistic: close right away
      const ok = await addQuest(data);
      if (!ok) setForm({ mode: 'create', draft: data }); // failed: bring the form back
    }
  };

  const confirmDelete = async () => {
    setDeleting(true);
    const ok = await removeQuest(toDelete._id);
    setDeleting(false);
    if (ok) setToDelete(null);
  };

  return (
    <div className="app">
      <HeroPanel progress={progress} stats={stats} />

      <main className="window board">
        <header className="board-head">
          <h1>Quest Log</h1>
          <button className="btn" onClick={() => setForm({ mode: 'create' })}>New quest</button>
        </header>

        <QuestList
          quests={quests}
          loading={loading}
          loadError={loadError}
          busyIds={busyIds}
          onRetry={reload}
          onToggle={handleToggle}
          onEdit={(quest) => setForm({ mode: 'edit', quest })}
          onDelete={setToDelete}
        />
      </main>

      {form && (
        <QuestForm
          key={form.quest?._id || form.draft?.title || 'new'}
          mode={form.mode}
          initial={form.quest || form.draft}
          onSubmit={handleSubmit}
          onClose={() => setForm(null)}
        />
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete this quest?"
          message={`"${toDelete.title}" will be removed from the database. This cannot be undone.`}
          confirmLabel="Delete quest"
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}

      <Toasts toasts={toasts} onDismiss={dismiss} />
    </div>
  );
}
