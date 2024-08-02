import { Icon } from '@iconify/react';

import { Variant } from './index.type';

interface ClearSearchTextInputMantineProps {
  value: unknown;
  onClear: () => void;
  variant: Variant;
}

export default function ClearSearchTextInputMantine({
  value,
  onClear,
  variant = 'search',
}: ClearSearchTextInputMantineProps) {
  const iconProp = {
    search: {
      icon: 'akar-icons:search',
      color: '#003F80',
      width: undefined,
    },
    select: {
      icon: 'akar-icons:chevron-down',
      color: undefined,
      width: undefined,
    },
    date: {
      icon: 'ic:round-date-range',
      color: '#C1C7CD',
      width: 20,
    },
    none: {},
  };

  if (
    !value ||
    (Array.isArray(value) && !value?.[0] && !value?.[1])
  ) {
    if (variant === 'none') return null;
    return (
      <Icon
        icon={iconProp[variant].icon}
        width={iconProp[variant].width || 12}
        color={iconProp[variant].color}
      />
    );
  }

  return (
    <button
      type="button"
      className="cursor-pointer"
      onClick={onClear}
    >
      <Icon icon="bi:x" width={20} color="#868e96" />{' '}
    </button>
  );
}
