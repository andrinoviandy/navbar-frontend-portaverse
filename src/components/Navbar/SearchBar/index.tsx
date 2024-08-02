import useSearchGlobal from '@hooks/useSearchGlobal';
import { Icon } from '@iconify/react';
import { Loader, Select } from '@mantine/core';
import { useState } from 'react';

import SelectItem from './SelectItem';

/**
 * Responsible for rendering the search bar in the navbar.
 *
 * - Responsible for the styles of the search bar.
 */

function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const { transformedData, isLoading } = useSearchGlobal(searchInput);

  return (
    <Select
      classNames={{
        root: 'w-[750px] rounded-md',
        input: 'border-0',
        dropdown: 'shadow-popover mt-4',
        groupLabel: 'text-md',
        option: 'focus-visible:bg-base-background',
      }}
      styles={{
        option: {
          '&:focusVisible': {
            backgroundColor: '#000000',
          },
        },
      }}
      leftSection={
        <Icon
          icon="ic:baseline-search"
          className="text-primary-main"
          width={20}
        />
      }
      rightSection={<div />}
      searchable
      placeholder="Cari sesuatu"
      searchValue={searchInput}
      onSearchChange={setSearchInput}
      nothingFoundMessage={
        isLoading ? (
          <div className="flex w-full items-center justify-center">
            <Loader />
          </div>
        ) : (
          'No options'
        )
      }
      data={transformedData || []}
      // data={
      //   data?.data.map((item) => ({
      //     label: item.display,
      //     value: item.id.toString(),
      //     data: item,
      //   })) || []
      // }
      renderOption={SelectItem}
    />
  );
}

export default SearchBar;
