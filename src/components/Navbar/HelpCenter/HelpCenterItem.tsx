import { Icon } from '@iconify/react';
import { Menu } from '@mantine/core';

import { HelpCenterMenuProps } from './index.types';

interface HelpCenterItemProps {
  menu: HelpCenterMenuProps;
}

/**
 * Responsible for rendering a single item in the help center menu.
 *
 * - Responsible for the styles of the help center menu item.
 */

function HelpCenterItem({ menu }: HelpCenterItemProps) {
  return (
    <Menu.Item
      component="a"
      href={menu.route}
      target="_blank"
      className="hover:bg-base-background/50"
    >
      <div className="flex items-center justify-start gap-4">
        <div className="rounded-md bg-base-background p-2">
          <Icon
            icon={menu.icon}
            fontSize={32}
            className="text-primary-main"
          />
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

export default HelpCenterItem;
