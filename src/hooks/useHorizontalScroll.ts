import { RefObject, useEffect, useRef } from 'react';

export default function useHorizontalScroll<T>(
  ref?: RefObject<T> | undefined,
  callback?: (element: HTMLElement) => void
) {
  const newRef = useRef(null);
  const elRef = ref || newRef;
  useEffect(() => {
    const el = elRef.current as HTMLElement | null;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (+e.deltaY === 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 3,
          behavior: 'smooth',
        });
        callback?.(el);
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
    return () => {};
  }, [callback, elRef]);
  return elRef;
}
