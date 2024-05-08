import { forwardRef, useMemo } from 'react';

import cn from '../../utils/cn';

interface ActionContainerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

/**
 * Responsible for rendering the action container.
 *
 * - Responsible for the container styles.
 */

const ActionContainer = forwardRef<
  HTMLButtonElement,
  ActionContainerProps
>((props, ref) => {
  const { children, isActive, className, ...rest } = props;

  const isActiveDropdown = useMemo(
    () => !!props?.['aria-expanded'],
    [props]
  );

  return (
    <button
      ref={ref}
      {...rest}
      type="button"
      style={{ width: '2.5rem', height: '2.5rem' }}
      className={cn(
        'mx-auto flex cursor-pointer select-none items-center justify-center rounded-md transition-all duration-150',
        'hover:bg-base-background hover:text-primary-main',
        isActive || isActiveDropdown
          ? 'bg-base-background text-primary-main'
          : 'text-base-darkGray',
        className
      )}
    >
      {children}
    </button>
  );
});

ActionContainer.displayName = 'ActionContainer';

export default ActionContainer;
