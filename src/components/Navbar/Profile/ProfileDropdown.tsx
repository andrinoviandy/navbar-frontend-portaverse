import { Icon } from '@iconify/react';
import {
  Avatar,
  Divider,
  LoadingOverlay,
  Popover,
  UnstyledButton,
} from '@mantine/core';

interface ProfileDropdownProps {
  name?: string;
  position_name?: string;
  employee_number?: string;
  profile_picture?: string;
  initials?: string;
  handleLogout: () => void;
  isLoading: boolean;
}

/**
 * Responsible for rendering the profile dropdown.
 *
 * - Responsible for the profile dropdown styles.
 * - Responsible for taking the user's name, position, employee number, profile picture, and initials.
 * - Responsible for handling the logout.
 */

function ProfileDropdown({
  name,
  position_name,
  employee_number,
  profile_picture,
  initials,
  handleLogout,
  isLoading,
}: ProfileDropdownProps) {
  return (
    <Popover.Dropdown
      className="rounded-xl p-0 shadow-popover"
      w={320}
    >
      <div className="flex gap-3 p-4">
        <Avatar
          // src="https://project-kms-s3-sg.s3.ap-southeast-1.amazonaws.com/files/1b265674fb7987648d4d38f9f8225a6f?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYUAFN2WMWC7Y32K3%2F20240327%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20240327T023002Z&X-Amz-Expires=900&X-Amz-Signature=16dc0e8fef66e9ae691af9caffe3f0f8afa5dc84b92d07b8ae2887b7bb59ccb1&X-Amz-SignedHeaders=host"
          src={profile_picture as string}
          alt={name}
          size={40}
        >
          {initials}
        </Avatar>
        <div>
          <p className="break-words text-lg font-semibold">{name}</p>
          <p className="font-semibold text-base-darkGray">
            {position_name || '-'}
          </p>
          <p className="text-base-darkGray">
            NIPP : {employee_number || '-'}
          </p>
        </div>
      </div>
      <Divider />
      <div className="hover:bg-base-background">
        <UnstyledButton
          className="flex w-full items-center gap-2 p-4 text-danger-main"
          onClick={handleLogout}
          disabled={isLoading}
        >
          <LoadingOverlay visible={isLoading} />
          <Icon icon="radix-icons:exit" />
          <p className="font-medium">Sign Out</p>
        </UnstyledButton>
      </div>
    </Popover.Dropdown>
  );
}

export default ProfileDropdown;
