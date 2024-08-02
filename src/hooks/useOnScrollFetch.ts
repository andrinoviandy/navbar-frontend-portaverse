import { RefObject, useEffect } from 'react';

export default function useOnScrollFetch(
  hasNextPage: boolean,
  fetchNextPage: () => void,
  containerRef: RefObject<HTMLDivElement> | null = null,
  direction: string = 'vertical',
  disabled: boolean = false
) {
  useEffect(() => {
    let fetching = false;
    const element = containerRef?.current
      ? containerRef.current
      : document;

    const onScroll: EventListener = async (e: Event) => {
      if (disabled) return;
      const {
        scrollHeight,
        scrollWidth,
        scrollTop,
        scrollLeft,
        clientHeight,
        clientWidth,
      } = containerRef?.current
        ? containerRef.current
        : ((e.target as Document).scrollingElement as Element);

      const triggerCond = (() => {
        switch (direction) {
          case 'horizontal':
            return scrollWidth - scrollLeft <= clientWidth * 1.25;
          case 'vertical':
          default:
            return scrollHeight - scrollTop <= clientHeight * 1.25;
        }
      })();

      if (!fetching && triggerCond) {
        fetching = true;

        if (hasNextPage) await fetchNextPage();

        fetching = false;
      }
    };

    element?.addEventListener('scroll', onScroll);

    return () => {
      element?.removeEventListener('scroll', onScroll);
    };
  }, [hasNextPage, disabled, direction, fetchNextPage, containerRef]);
}
