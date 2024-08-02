import { Menu } from '@mantine/core';

import PlatformItem from './PlatformItem';
import PLATFORM_MENU from './platformMenu';
import ActionContainer from '../ActionContainer';

interface PlatformProps {
  platform?: string;
}

/**
 * Responsible for rendering the platform menu.
 *
 * - Responsible for the container styles.
 * - Responsible for taking a list of `PLATFORM_MENU` and rendering them as `PlatformItem`s.
 * - Responsible for passing the `menu` prop to the `PlatformItem` component.
 */

function Platform({ platform }: PlatformProps) {
  return (
    <Menu position="bottom-end" offset={27.5} width={400} radius="md">
      <Menu.Target>
        <ActionContainer>
          <span className="text-sm font-semibold">{platform}</span>
        </ActionContainer>
      </Menu.Target>
      <Menu.Dropdown className="min-h-40 w-[410px] rounded-xl p-4 shadow-popover">
        {PLATFORM_MENU.map((menu) => (
          <PlatformItem
            key={menu.title}
            menu={menu}
            platform={platform}
          />
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default Platform;
