export default function DirectionArrow({
  direction,
}: {
  direction: 'left' | 'right';
}) {
  return <div>{direction === 'left' ? '<-' : '->'}</div>;
}
