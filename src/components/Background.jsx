import cosmic from '../assets/cosmic-symmetry.jpg';
import waves from '../assets/wave-gradient.jpg';

const layerClass = (visible) =>
  `background-layer${visible ? ' background-layer--visible' : ''}`;

// Two stacked layers cross-fade (CSS can't animate background-image itself).
export default function Background({ first }) {
  return (
    <>
      <div
        aria-hidden="true"
        className={layerClass(first)}
        style={{ backgroundImage: `url(${cosmic})` }}
      />
      <div
        aria-hidden="true"
        className={layerClass(!first)}
        style={{ backgroundImage: `url(${waves})` }}
      />
      <div aria-hidden="true" className="background-overlay" />
    </>
  );
}
