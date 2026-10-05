import { useCallback, useEffect, useState } from 'react';
import * as api from '../api';

// All server talking + list state lives here, so the components stay simple.
export default function useQuests(notify) {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);   // first fetch
  const [loadError, setLoadError] = useState(null);
  const [busyIds, setBusyIds] = useState([]);     // quests with a request in flight

  const setBusy = (id, on) =>
    setBusyIds((ids) => (on ? [...ids, id] : ids.filter((x) => x !== id)));

  // READ: GET /mongo-tasks
  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      setQuests(await api.getTasks());
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(); // runs on page load, so data always comes from MongoDB
  }, [load]);

  // CREATE (optimistic): show it now, confirm with the server after.
  const addQuest = async (data) => {
    const tempId = `temp-${Date.now()}`;
    const temp = {
      _id: tempId,
      ...data,
      completed: false,
      createdAt: new Date().toISOString(),
      pending: true,
    };
    setQuests((list) => [temp, ...list]);

    try {
      const saved = await api.createTask(data);            // POST
      setQuests((list) => list.map((q) => (q._id === tempId ? saved : q)));
      notify('success', 'Quest accepted');
      return true;
    } catch (err) {
      setQuests((list) => list.filter((q) => q._id !== tempId)); // rollback
      notify('error', `Quest not saved: ${err.message}`);
      return false;
    }
  };

  // UPDATE: wait for the server, then replace the item with the server's copy.
  const updateQuest = async (id, changes, successMessage) => {
    setBusy(id, true);
    try {
      const updated = await api.updateTask(id, changes);   // PUT
      setQuests((list) => list.map((q) => (q._id === id ? updated : q)));
      if (successMessage) notify('success', successMessage);
      return true;
    } catch (err) {
      notify('error', `Update failed: ${err.message}`);
      return false;
    } finally {
      setBusy(id, false);
    }
  };

  // DELETE: remove from the list only after the server says OK.
  const removeQuest = async (id) => {
    setBusy(id, true);
    try {
      await api.deleteTask(id);                            // DELETE
      setQuests((list) => list.filter((q) => q._id !== id));
      notify('success', 'Quest deleted');
      return true;
    } catch (err) {
      notify('error', `Delete failed: ${err.message}`);
      return false;
    } finally {
      setBusy(id, false);
    }
  };

  return { quests, loading, loadError, busyIds, reload: load, addQuest, updateQuest, removeQuest };
}
