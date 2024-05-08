import ClearSearchTextInputMantine from '.';
import { Variant } from './index.type';

const getClearableProps = (
  value: unknown,
  onClear: () => void,
  variant: Variant = 'search'
) => ({
  rightSection: (
    <ClearSearchTextInputMantine
      value={value}
      onClear={onClear}
      variant={variant}
    />
  ),
  styles: {
    rightSection: { pointerEvents: !value ? 'none' : undefined },
  },
});

export default getClearableProps;
