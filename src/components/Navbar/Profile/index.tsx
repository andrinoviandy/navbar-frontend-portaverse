/* eslint-disable @typescript-eslint/naming-convention */
import useLogout from '@hooks/useLogout';
import useUserCookie from '@hooks/useUserCookie';
import { Icon } from '@iconify/react';
import { Avatar, Popover, UnstyledButton } from '@mantine/core';

import ProfileDropdown from './ProfileDropdown';

/**
 * Responsible for rendering the profile component.
 *
 * - Responsible for the profile component styles.
 * - Responsible for passing the user, initials, handleLogout, and isLoading props to the ProfileDropdown component.
 */

function Profile() {
  const { user, initials } = useUserCookie();
  const { employee } = user || {};
  const { name, profile_picture, position_name, employee_number } =
    employee || {};

  const { handleLogout, isLoading } = useLogout();

  return (
    <Popover
      position="bottom-end"
      offset={27.5}
      width={400}
      radius="md"
    >
      <Popover.Target>
        <UnstyledButton className="flex items-center justify-center gap-1.5 border">
          <Avatar
            // src="https://project-kms-s3-sg.s3.ap-southeast-1.amazonaws.com/files/1b265674fb7987648d4d38f9f8225a6f?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYUAFN2WMWC7Y32K3%2F20240327%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240327T023002Z&X-Amz-Expires=900&X-Amz-Signature=16dc0e8fef66e9ae691af9caffe3f0f8afa5dc84b92d07b8ae2887b7bb59ccb1&X-Amz-SignedHeaders=host"
            src={profile_picture as string}
            alt={name}
            size={28}
          >
            {initials}
          </Avatar>
          <Icon
            icon="ep:arrow-down-bold"
            width={13}
            className="text-base-darkGray"
          />
        </UnstyledButton>
      </Popover.Target>

      <ProfileDropdown
        name={name}
        position_name={position_name}
        employee_number={employee_number}
        profile_picture={profile_picture}
        initials={initials}
        handleLogout={handleLogout}
        isLoading={isLoading}
      />
    </Popover>
  );
}

export default Profile;
