import { UseInfiniteQueryResult } from '@tanstack/react-query';
import { useRef } from 'react';

import useOnScrollFetch from './useOnScrollFetch';

export default function useInfiniteQuery(
  reactQueryObj: UseInfiniteQueryResult,
  orientation: 'vertical' | 'horizontal' = 'vertical',
  disabled: boolean = false
) {
  const ref = useRef<HTMLDivElement>(null);
  const { hasNextPage, fetchNextPage, ...rest } = reactQueryObj;

  useOnScrollFetch(
    hasNextPage,
    fetchNextPage,
    ref,
    orientation,
    disabled
  );

  return { ref, ...rest };
}
