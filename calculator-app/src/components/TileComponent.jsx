export default function TileComponent({ tileLabel, handleClick, description }) {
  return (
    <button className="calculator-tile" onClick={handleClick} role="button" aria-label={description}>
      {tileLabel}
    </button>
  );
}
