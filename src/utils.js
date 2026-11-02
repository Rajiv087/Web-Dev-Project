const pad = (n) => String(n).padStart(2, '0');

export function formatTime(totalSeconds) {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

export function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function recentDailyAverage(dailyTimes, days = 7) {
  const now = new Date();
  let sum = 0;
  for (let i = 0; i < days; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    sum += dailyTimes[dateKey(d)] || 0;
  }
  return Math.floor(sum / days);
}

export function getGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export const toUserId = (name) => name.trim().toLowerCase();

export const userStorageKey = (userId, name) => `orbit:${userId}:${name}`;

const LEGACY_KEYS = ['task_list', 'task_times', 'daily_times', 'cleared_time'];

export function migrateLegacyData() {
  try {
    if (localStorage.getItem('orbit_migrated_v2')) return;
    const savedName = JSON.parse(localStorage.getItem('dashboard_user'));
    if (typeof savedName === 'string' && savedName.trim()) {
      const userId = toUserId(savedName);
      for (const key of LEGACY_KEYS) {
        const value = localStorage.getItem(key);
        const target = userStorageKey(userId, key);
        if (value !== null && localStorage.getItem(target) === null) {
          localStorage.setItem(target, value);
        }
        localStorage.removeItem(key);
      }
    }
    localStorage.setItem('orbit_migrated_v2', '1');
  } catch {
  }
}
