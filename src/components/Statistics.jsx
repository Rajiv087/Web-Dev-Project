import Panel from './Panel.jsx';
import { dateKey, formatTime, recentDailyAverage } from '../utils.js';

export default function Statistics({ tasks, taskTimes, dailyTimes, clearedTime = 0 }) {
  const today = dailyTimes[dateKey()] || 0;
  const average = recentDailyAverage(dailyTimes, 7);

  return (
    <Panel title="Statistics" className="panel--stats">
      <ul className="stats-summary">
        <li>Total time today: {formatTime(today)}</li>
        <li>Daily average (this week): {formatTime(average)}</li>
      </ul>
      {tasks.map(({ text: task }) => (
        <p key={task} className="stats-task">
          {task}: {formatTime(taskTimes[task] || 0)}
        </p>
      ))}
      {clearedTime > 0 && (
        <p className="stats-cleared">
          Cleared tasks: {formatTime(clearedTime)}
        </p>
      )}
    </Panel>
  );
}
