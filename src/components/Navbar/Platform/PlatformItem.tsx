import { Menu } from '@mantine/core';
import cn from '@utils/cn';

import { PlatformMenuProps } from './index.types';

interface PlatformItemProps {
  menu: PlatformMenuProps;
  platform?: string;
}

/**
 * Responsible for rendering a single item in the platform menu.
 *
 * - Responsible for the styles of the platform menu item.
 */

function PlatformItem({ menu, platform }: PlatformItemProps) {
  return (
    <Menu.Item
      component="a"
      href={platform === menu.title ? undefined : menu.route}
      target="_blank"
      className={
        platform === menu.title
          ? 'cursor-default bg-base-background'
          : ''
      }
    >
      <div
        className={cn(
          'flex items-center justify-start gap-4 disabled:opacity-100'
        )}
      >
        <div className="flex size-10 justify-center rounded-md bg-primary-main p-2 text-base-white">
          <span>{menu.title}</span>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-base-text">
            {menu.title}
          </h4>
          <p className="text-xs font-normal text-base-text">
            {menu.content}
          </p>
        </div>
      </div>
    </Menu.Item>
  );
}

export default PlatformItem;
