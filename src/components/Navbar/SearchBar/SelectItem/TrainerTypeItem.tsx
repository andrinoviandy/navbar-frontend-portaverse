import SMEIcon from '@components/Icon/SMEBadge';
import ProfilePicture from '@components/ProfilePicture';

import { Trainer } from '../index.types';

interface TrainerTypeItemProps {
  data: Trainer;
}

const TRAINER_TYPE: Record<string, string> = {
  External: 'Eksternal',
  Internal: 'Internal',
};

function TrainerTypeItem({ data }: TrainerTypeItemProps) {
  const initials = data.display
    .split(' ')
    .map((namePart: string) => namePart[0])
    .join('');

  return (
    <div className="flex items-center gap-2 text-sm text-base-text">
      <ProfilePicture
        imageUrl={data.describe.avatar}
        alt={data.display}
        withBadge={data.describe.is_sme}
        badgeIcon={<SMEIcon size={12} />}
        initials={initials}
      />
      <span className="flex items-center gap-1">
        <p className="font-medium">{data.display}</p>
        <p className="text-xs font-light">
          - {TRAINER_TYPE[data.describe.type_trainer]}
        </p>
      </span>
    </div>
  );
}

export default TrainerTypeItem;
