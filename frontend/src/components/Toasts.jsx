export default function Toasts({ toasts, onDismiss }) {
  return (
    <div className="toasts" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`window toast toast-${t.type}`}
          role={t.type === 'error' ? 'alert' : 'status'}
        >
          <span>{t.message}</span>
          <button className="icon-btn" onClick={() => onDismiss(t.id)} aria-label="Dismiss message">
            x
          </button>
        </div>
      ))}
    </div>
  );
}
