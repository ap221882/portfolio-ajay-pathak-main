import {
  useEffect,
  useRef,
} from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const inner = innerRef.current;

    if (!cursor || !inner) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let innerX = 0;
    let innerY = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // Outer (laggy)
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      // Inner (faster but still eased)
      innerX += (mouseX - innerX) * 0.25;
      innerY += (mouseY - innerY) * 0.25;

      if (cursor) {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }
      if (inner) {
        inner.style.transform = `translate3d(${innerX}px, ${innerY}px, 0) translate(-50%, -50%)`;
      }

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", move);
    animate();

    return () => {
      document.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {/* Outer cursor (delayed) */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-12 w-12 rounded-full border border-white"
      />

      {/* Inner cursor (slightly delayed, smoother) */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-white opacity-70"
      />
    </>
  );
}
