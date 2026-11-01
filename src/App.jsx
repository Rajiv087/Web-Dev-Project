import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { migrateLegacyData, toUserId } from './utils.js';
import Background from './components/Background.jsx';
import NameModal from './components/NameModal.jsx';
import Dashboard from './components/Dashboard.jsx';
import Footer from './components/Footer.jsx';

// Runs once at startup: moves data saved before per-user support
// into the account of the name that was saved with it.
migrateLegacyData();

export default function App() {
  // Last name typed (used to prefill the welcome page). Background is a device setting.
  const [username, setUsername] = useLocalStorage('dashboard_user', '');
  const [isFirstBackground, setIsFirstBackground] = useLocalStorage(
    'isFirstBackground',
    true
  );
  // In-memory only, so the welcome page shows on every page load
  const [started, setStarted] = useState(false);

  return (
    <>
      <Background first={isFirstBackground} />

      <div className="app">
        {username && started ? (
          <Dashboard
            key={toUserId(username)}
            userId={toUserId(username)}
            username={username}
            onToggleBackground={() => setIsFirstBackground((v) => !v)}
            onSwitchUser={() => setStarted(false)}
          />
        ) : (
          <NameModal
            initialName={username}
            onSave={(name) => {
              setUsername(name);
              setStarted(true);
            }}
          />
        )}

        <Footer />
      </div>
    </>
  );
}
