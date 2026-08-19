export default function Footer() {
  return (
    <footer
      className={
        'relative flex flex-col items-center justify-center gap-2 bg-brand-900 py-12'
      }
    >
      <p className='text-xl text-surface'>보드툴즈</p>
      <a
        href='mailto:boardtools@gmail.com'
        className='text-sm text-surface/70 underline-offset-4 transition hover:text-accent hover:underline'
      >
        boardtools@gmail.com
      </a>
    </footer>
  );
}
