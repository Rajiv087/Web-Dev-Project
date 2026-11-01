export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copy">&copy; Orbit</p>
      <ul className="footer__links">
        <li>
          <a
            href="https://github.com/Forzy19/Orbit_Dashboard"
            target="_blank"
            rel="noreferrer"
            className="footer__link"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="mailto:dashboard.orbit@gmail.com"
            className="footer__link"
          >
            Reach out to us
          </a>
        </li>
      </ul>
    </footer>
  );
}
