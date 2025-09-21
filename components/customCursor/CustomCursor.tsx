import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current!;
    const inner = innerRef.current!;

    let mouseX = 0,
      mouseY = 0;
    let cursorX = 0,
      cursorY = 0;
    let innerX = 0,
      innerY = 0;

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;

      innerX += (mouseX - innerX) * 0.25;
      innerY += (mouseY - innerY) * 0.25;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      inner.style.transform = `translate3d(${innerX}px, ${innerY}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", move);
    animate();

    const target = document.querySelector(".enter-world-text");
    if (target) {
      target.addEventListener("mouseenter", () => {
        cursor.classList.add("bg-white", "mix-blend-difference");
        cursor.classList.remove("border", "border-white");
        inner.classList.add("bg-black");
      });
      target.addEventListener("mouseleave", () => {
        cursor.classList.remove("bg-white", "mix-blend-difference");
        cursor.classList.add("border", "border-white");
        inner.classList.remove("bg-black");
        inner.classList.add("bg-white", "opacity-70");
      });
    }

    return () => {
      document.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {/* Outer cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-12 w-12 rounded-full border border-white"
      />
      {/* Inner cursor */}
      <div
        ref={innerRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-white opacity-70"
      />
    </>
  );
}
