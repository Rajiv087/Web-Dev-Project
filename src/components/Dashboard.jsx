import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { dateKey, getGreeting, userStorageKey } from '../utils.js';
import NavBar from './NavBar.jsx';
import TaskList from './TaskList.jsx';
import TimeTracker from './TimeTracker.jsx';
import Statistics from './Statistics.jsx';
import ErrorPopup from './ErrorPopup.jsx';

const normalizeTasks = (value) =>
  Array.isArray(value)
    ? value.map((t) => (typeof t === 'string' ? { text: t, done: false } : t))
    : [];

export default function Dashboard({
  userId,
  username,
  onToggleBackground,
  onSwitchUser,
}) {
  const k = (name) => userStorageKey(userId, name);
  const [tasks, setTasks] = useLocalStorage(k('task_list'), [], normalizeTasks);
  const [taskTimes, setTaskTimes] = useLocalStorage(k('task_times'), {});
  const [dailyTimes, setDailyTimes] = useLocalStorage(k('daily_times'), {});
  const [clearedTime, setClearedTime] = useLocalStorage(k('cleared_time'), 0);
  const [selectedTask, setSelectedTask] = useState(null);
  const [error, setError] = useState(null);

  const addTask = (text) => {
    const task = text.trim();
    if (!task) {
      setError('Please enter a task!');
      return false;
    }
    if (tasks.some((t) => t.text === task)) {
      setError('That task already exists.');
      return false;
    }
    setTasks([...tasks, { text: task, done: false }]);
    return true;
  };

  const deleteTask = (task) => {
    setTasks(tasks.filter((t) => t.text !== task));
    setClearedTime((c) => c + (taskTimes[task] || 0));
    setTaskTimes(({ [task]: _removed, ...rest }) => rest);
    if (selectedTask === task) setSelectedTask(null);
  };

  const toggleTask = (task) => {
    setTasks(tasks.map((t) => (t.text === task ? { ...t, done: !t.done } : t)));
    if (selectedTask === task) setSelectedTask(null);
  };

  const editTask = (oldText, newText) => {
    const next = newText.trim();
    if (!next) {
      setError('Task cannot be empty.');
      return false;
    }
    if (next === oldText) return true;
    if (tasks.some((t) => t.text === next)) {
      setError('That task already exists.');
      return false;
    }
    setTasks(tasks.map((t) => (t.text === oldText ? { ...t, text: next } : t)));
    setTaskTimes(({ [oldText]: moved, ...rest }) =>
      moved === undefined ? rest : { ...rest, [next]: moved }
    );
    if (selectedTask === oldText) setSelectedTask(next);
    return true;
  };

  const clearCompleted = () => {
    const removed = tasks.filter((t) => t.done).map((t) => t.text);
    setTasks(tasks.filter((t) => !t.done));
    setClearedTime((c) => c + removed.reduce((sum, k) => sum + (taskTimes[k] || 0), 0));
    setTaskTimes((prev) =>
      Object.fromEntries(Object.entries(prev).filter(([k]) => !removed.includes(k)))
    );
    if (removed.includes(selectedTask)) setSelectedTask(null);
  };

  const saveTime = (task, seconds) => {
    setTaskTimes((prev) => ({ ...prev, [task]: (prev[task] || 0) + seconds }));
    setDailyTimes((prev) => {
      const key = dateKey();
      return { ...prev, [key]: (prev[key] || 0) + seconds };
    });
  };

  return (
    <main>
      <ErrorPopup message={error} onClose={() => setError(null)} />
      <NavBar
        onToggleBackground={onToggleBackground}
        onSwitchUser={onSwitchUser}
      />

      <div className="tagline">
        <p>Let every moment revolve around your goals.</p>
      </div>

      <header className="greeting">
        <h1 className="greeting__title">
          {getGreeting()}, {username}!
        </h1>
      </header>

      <div className="panel-row panel-row--tasks">
        <TaskList
          tasks={tasks}
          selectedTask={selectedTask}
          onAdd={addTask}
          onSelect={setSelectedTask}
          onDelete={deleteTask}
          onToggle={toggleTask}
          onEdit={editTask}
          onClearCompleted={clearCompleted}
        />
        <TimeTracker
          key={selectedTask ?? 'none'}
          selectedTask={selectedTask}
          onSave={saveTime}
          onError={setError}
        />
      </div>

      <div className="panel-row panel-row--stats">
        <Statistics
          tasks={tasks}
          taskTimes={taskTimes}
          clearedTime={clearedTime}
          dailyTimes={dailyTimes}
        />
      </div>
    </main>
  );
}
