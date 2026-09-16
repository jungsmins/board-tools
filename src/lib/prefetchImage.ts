export function prefetchImage(src: string) {
  if (typeof window === 'undefined') return;

  const img = new window.Image();
  img.src = src;
}
