import { Avatar } from '@mantine/core';
import React from 'react';

interface ProfilePictureProps {
  imageUrl: string;
  alt: string;
  withBadge?: boolean;
  badgeIcon?: React.ReactNode;
  initials?: string;
}

function ProfilePicture({
  imageUrl,
  alt,
  withBadge = false,
  badgeIcon,
  initials,
}: ProfilePictureProps) {
  return (
    <div className="relative">
      <Avatar src={imageUrl} alt={alt} size={24}>
        {initials}
      </Avatar>
      {withBadge && badgeIcon}
    </div>
  );
}

export default ProfilePicture;
