import { useEffect, useRef } from 'react';
import Button from './Button.jsx';

// Modal error dialog: dimmed backdrop, closes via the OK button or Esc.
export default function ErrorPopup({ message, onClose }) {
  const okRef = useRef(null);

  useEffect(() => {
    if (!message) return;
    okRef.current?.focus();
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="modal-backdrop">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="error-title"
        aria-describedby="error-message"
        className="modal"
      >
        <h2 id="error-title" className="modal__title">
          Oops!
        </h2>
        <p id="error-message" className="modal__message">
          {message}
        </p>
        <Button ref={okRef} size="task" onClick={onClose}>
          OK
        </Button>
      </div>
    </div>
  );
}
