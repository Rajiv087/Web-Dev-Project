import orbitIcon from '../assets/orbit.svg';
import Button from './Button.jsx';

export default function NavBar({ onToggleBackground, onSwitchUser }) {
  return (
    <nav className="navbar">
      <div className="navbar__brand">
        <img
          src={orbitIcon}
          alt="Orbit logo"
          className="navbar__logo"
        />
        <span className="navbar__title">
          Orbit
        </span>
      </div>
      <div className="navbar__actions">
        <Button size="nav" onClick={onSwitchUser}>
          Switch user
        </Button>
        <Button size="nav" onClick={onToggleBackground}>
          Background
        </Button>
      </div>
    </nav>
  );
}
