import SMEIcon from '@components/Icon/SMEBadge';
import ProfilePicture from '@components/ProfilePicture';
import { Icon } from '@iconify/react';
import trimString from '@utils/string';

interface EmployeeTypeItemProps {
  avatar: string;
  withAvatar?: boolean;
  isSME?: boolean;
  employeeName: string;
  employeeNumber: string;
  positionName?: string;
}

function EmployeeTypeItem({
  avatar,
  withAvatar = false,
  isSME = true,
  employeeName,
  employeeNumber,
  positionName,
}: EmployeeTypeItemProps) {
  return (
    <div className="flex max-w-full items-center gap-2 text-base-text">
      <div>
        {withAvatar ? (
          <ProfilePicture
            imageUrl={avatar}
            alt={employeeName}
            withBadge={isSME}
            badgeIcon={<SMEIcon size={12} />}
          />
        ) : (
          <Icon
            width={24}
            height={24}
            icon="bx:user-circle"
            className="text-primary-main"
          />
        )}
      </div>
      <div className="flex w-full items-center gap-1 text-sm font-medium">
        <p className="font-medium">{employeeName}</p>
        <span className="flex items-center gap-1 font-light">
          <p className="text-xs"> &bull; {employeeNumber}</p>
          <p>
            {positionName && <> &bull; {trimString(positionName)}</>}
          </p>
        </span>
      </div>
    </div>
  );
}

export default EmployeeTypeItem;
