import {
  GroupedData,
  ResponseData,
  TransformedItem,
} from '@components/Navbar/SearchBar/index.types';
import { useDebouncedValue } from '@mantine/hooks';
import {
  BASE_PROXY,
  SEARCH_ENGINE_ENDPOINT,
} from '@services/api/endpoint';
import { useMemo } from 'react';

import useNetworks, { GenericQueryResponse } from './useNetworks';

const translatedTypes = {
  socmed: 'Social Media',
  employee: 'Pekerja',
  post: 'Post',
  survey: 'Survei',
  document: 'Dokumen',
  course: 'Kursus',
  trainer: 'Trainer',
};

/**
 * Responsible for handling the global search.
 *
 * @param searchInput - The search input.
 */

export default function useSearchGlobal(searchInput: string) {
  const [debounceQuery] = useDebouncedValue(searchInput, 500);
  const { query } = useNetworks(BASE_PROXY.searchEngine);

  const { data, isLoading } = query<
    GenericQueryResponse<ResponseData[]>
  >(
    SEARCH_ENGINE_ENDPOINT.GET.spotlight,
    {
      queryKey: ['searchQuery', debounceQuery],
    },
    {
      params: {
        page: 1,
        search: debounceQuery,
      },
    }
  );

  const transformedData = useMemo(() => {
    if (data) {
      return data.data?.reduce<GroupedData[]>((acc, item) => {
        const groupIndex = acc.findIndex(
          (group) => group.group === translatedTypes[item.type]
        );
        const transformedItem: TransformedItem = {
          label: item.display,
          value: item.id.toString(),
          data: item,
        };

        if (groupIndex >= 0) {
          acc[groupIndex].items.push(transformedItem);
        } else {
          acc.push({
            group: translatedTypes[item.type],
            items: [transformedItem],
          });
        }

        return acc;
      }, []);
    }
    return [];
  }, [data]);

  return { transformedData, isLoading };
}
