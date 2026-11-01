import { useEffect, useRef, useState } from 'react';
import Button from './Button.jsx';
import Panel from './Panel.jsx';
import { formatTime } from '../utils.js';

// App gives this component `key={selectedTask}`, so picking another task
// remounts it: the timer stops and resets, just like the original behaviour.
export default function TimeTracker({ selectedTask, onSave, onError }) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const startRef = useRef(0);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const start = () => {
    if (!selectedTask) {
      onError('Please select a task first');
      return;
    }
    startRef.current = Date.now() - elapsed * 1000;
    setRunning(true);
  };

  const pause = () => {
    if (!selectedTask) return;
    setRunning(false);
  };

  // Reset saves the elapsed time to the task, then zeroes the clock
  const reset = () => {
    if (!selectedTask) return;
    setRunning(false);
    if (elapsed > 0) onSave(selectedTask, elapsed);
    setElapsed(0);
  };

  return (
    <Panel title="Time Tracker" className="panel--timer">
      <h2 className="timer-display">
        {formatTime(elapsed)}
      </h2>
      <div className="timer-controls">
        <Button size="timer" onClick={start}>
          Start
        </Button>
        <Button size="timer" onClick={pause}>
          Pause
        </Button>
        <Button size="timer" onClick={reset}>
          Reset
        </Button>
      </div>
    </Panel>
  );
}
