type LabelProps = {
  htmlFor: string;
  label: string;
};

export default function Label({ htmlFor, label }: LabelProps) {
  return (
    <label htmlFor={htmlFor}>
      <span className='text-sm font-bold text-ink'>{label}</span>
    </label>
  );
}
