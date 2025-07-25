export default function TileComponent({ tileLabel, handleClick }) {
  return (
    <button className="calculator-tile" onClick={handleClick} role="button" aria-label={tileLabel}>
      {tileLabel}
    </button>
  );
}
