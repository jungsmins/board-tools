export default function Footer() {
  const edgeGradientBar = `
    after:content-['']
    after:absolute
    after:left-0
    after:right-0
    after:h-1
    after:bg-[linear-gradient(90deg,var(--color-gradient-red)_0%,var(--color-gradient-blue)_33%,var(--color-gradient-green)_66%,var(--color-gradient-yellow)_100%)]
  `;

  return (
    <footer
      className={`relative flex flex-col items-center justify-center bg-chrome py-12 after:top-0 ${edgeGradientBar}`}
    >
      <p className='text-title text-xl'>보드툴즈</p>
    </footer>
  );
}
