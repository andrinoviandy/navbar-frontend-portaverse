import color from '@constants/color';
import {
  createTheme,
  defaultVariantColorsResolver,
  VariantColorsResolver,
} from '@mantine/core';

/**
 * Responsible for customizing the variant colors of the components.
 *
 * - The `input` parameter is an object that contains the following properties:
 *  - `variant` (string): The variant of the component.
 *  - `color` (DefaultMantineColor): The color of the component.
 *  - `theme` (MantineTheme): The theme of the component.
 *  - `autoContrast` (boolean): A boolean value that indicates whether the component should have an auto contrast.
 *  - `gradient` (MantineGradient): The gradient of the component.
 *
 * Full documentation: https://mantine.dev/styles/variants-sizes/
 */

const variantColorResolver: VariantColorsResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  if (input.variant === 'primary') {
    return {
      background: color.primary.main,
      hover: color.primary.hover,
      color: color.base.white,
      border: 'none',
    };
  }

  return defaultResolvedColors;
};

const theme = createTheme({
  variantColorResolver,
  colors: {
    primary: [
      '#CBEBFF',
      '#88D2FF',
      '#4EBCFF',
      '#1CA9FF',
      '#0096F9',
      '#0080D3',
      '#016DB2',
      '#005B96',
      '#004C7D',
      '#003F68',
      '#003456',
      '#C9F3FB',
    ],
  },
  primaryColor: 'primary',
});

export default theme;
