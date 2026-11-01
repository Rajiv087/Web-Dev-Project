import { useEffect, useRef, useState } from 'react';
import Button from './Button.jsx';
import Panel from './Panel.jsx';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'completed', label: 'Completed' },
];

const EMPTY_TEXT = {
  all: 'No tasks yet. Add one above.',
  active: 'Nothing left to do.',
  completed: 'No completed tasks yet.',
};

function TaskItem({ task, selected, onToggle, onSelect, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.text);
  const editRef = useRef(null);

  useEffect(() => {
    if (editing) editRef.current?.select();
  }, [editing]);

  const startEdit = () => {
    setDraft(task.text);
    setEditing(true);
  };

  const saveEdit = () => {
    if (onEdit(task.text, draft)) setEditing(false);
  };

  return (
    <div
      className={`task-item${selected ? ' task-item--selected' : ''}`}
    >
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.text)}
        aria-label={`Mark "${task.text}" as ${task.done ? 'active' : 'completed'}`}
        className="task-checkbox"
      />

      {editing ? (
        <>
          <input
            ref={editRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveEdit();
              if (e.key === 'Escape') setEditing(false);
            }}
            aria-label="Edit task"
            className="task-edit-input"
            autoFocus
          />
          <div className="task-actions">
            <Button size="sm" onClick={saveEdit}>
              Save
            </Button>
            <Button size="sm" onClick={() => setEditing(false)}>
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <>
          <span
            className={`task-text${task.done ? ' task-text--done' : ''}`}
          >
            {task.text}
          </span>
          <div className="task-actions">
            {!task.done && (
              <Button
                size="sm"
                aria-pressed={selected}
                onClick={() => onSelect(task.text)}
              >
                {selected ? 'Selected' : 'Select'}
              </Button>
            )}
            <Button size="sm" onClick={startEdit}>
              Edit
            </Button>
            <Button size="sm" onClick={() => onDelete(task.text)}>
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default function TaskList({
  tasks,
  selectedTask,
  onAdd,
  onSelect,
  onDelete,
  onToggle,
  onEdit,
  onClearCompleted,
}) {
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');

  const submit = () => {
    // onAdd returns true when the task was accepted
    if (onAdd(text)) setText('');
  };

  const activeCount = tasks.filter((t) => !t.done).length;
  const completedCount = tasks.length - activeCount;
  const visible = tasks.filter((t) =>
    filter === 'active' ? !t.done : filter === 'completed' ? t.done : true
  );

  return (
    <Panel
      title="Task List"
      large
      className="panel--tasks"
    >
      <div className="task-add">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder="Add a new task..."
          className="text-input text-input--task"
        />
        <Button size="add" onClick={submit}>
          Add
        </Button>
      </div>

      <div
        role="tablist"
        aria-label="Filter tasks"
        className="filters"
      >
        {FILTERS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={filter === id}
            onClick={() => setFilter(id)}
            className={`filter-tab${filter === id ? ' filter-tab--active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="task-scroll">
        {visible.length === 0 ? (
          <p className="task-empty">
            {EMPTY_TEXT[filter]}
          </p>
        ) : (
          visible.map((task) => (
            <TaskItem
              key={task.text}
              task={task}
              selected={task.text === selectedTask}
              onToggle={onToggle}
              onSelect={onSelect}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        )}
      </div>

      <div className="task-footer">
        <span>
          {activeCount} {activeCount === 1 ? 'task' : 'tasks'} left
        </span>
        {completedCount > 0 && (
          <Button size="sm" onClick={onClearCompleted}>
            Clear completed
          </Button>
        )}
      </div>
    </Panel>
  );
}
