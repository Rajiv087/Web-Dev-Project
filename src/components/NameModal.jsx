import { useEffect, useRef, useState } from 'react';
import Button from './Button.jsx';

export default function NameModal({ initialName = '', onSave }) {
  const [name, setName] = useState(initialName);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const submit = () => {
    const trimmed = name.trim();
    if (trimmed) onSave(trimmed);
  };

  return (
    <div className="welcome">
      <div className="welcome__box">
        <h2 className="welcome__title">Welcome!</h2>
        <p className="welcome__subtitle">What should we call you?</p>
        <div className="welcome__form">
          <input
            ref={inputRef}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="E.g., Alex"
            className="text-input text-input--welcome"
          />
          <Button size="hero" onClick={submit}>
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
