import {
  useEffect,
  useState,
} from 'react';

function useBreakpoint() {
  const [w, setW] = useState(1200);
  useEffect(() => {
    const update = () => setW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return { mob: w < 600, tab: w < 920 };
}


export default useBreakpoint