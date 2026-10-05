import { useCallback, useState } from 'react';

let nextId = 1;

// type: 'success' | 'error' | 'levelup'
export default function useToasts() {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (type, message) => {
      const id = nextId++;
      setToasts((list) => [...list, { id, type, message }]);
      setTimeout(() => dismiss(id), type === 'error' ? 5000 : 3000);
    },
    [dismiss]
  );

  return { toasts, notify, dismiss };
}
