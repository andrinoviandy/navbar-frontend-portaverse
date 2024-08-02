import { Icon } from '@iconify/react';
import { Menu } from '@mantine/core';

import HelpCenterItem from './HelpCenterItem';
import HELP_CENTER_MENU from './helpCenterMenu';
import ActionContainer from '../ActionContainer';

/**
 * Responsible for rendering the help center menu.
 *
 * - Responsible for the container styles.
 * - Responsible for taking a list of `HELP_CENTER_MENU` and rendering them as `HelpCenterItem`s.
 * - Responsible for passing the `menu` prop to the `HelpCenterItem` component.
 */

function HelpCenter() {
  return (
    <Menu position="bottom-end" offset={27.5} width={400} radius="md">
      <Menu.Target>
        <ActionContainer>
          <Icon icon="mingcute:service-fill" fontSize={25} />
        </ActionContainer>
      </Menu.Target>
      <Menu.Dropdown className="min-h-40 w-[410px] rounded-xl p-4 shadow-popover">
        {HELP_CENTER_MENU.map((menu) => (
          <HelpCenterItem menu={menu} key={menu.title} />
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default HelpCenter;
