export default function FeedbackEmpty({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='w-full px-4 py-10 rounded-md border border-dashed border-feedback-border bg-feedback-surface text-feedback-text text-center'>
      {children}
    </div>
  );
}
