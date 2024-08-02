import { Icon } from '@iconify/react';

import { Course } from '../index.types';

interface CourseTypeItemProps {
  data: Course;
}

const COURSE_TYPES: Record<string, string> = {
  IL: 'Individual Learning',
  GL: 'Group Learning',
};

function CourseTypeItem({ data }: CourseTypeItemProps) {
  const courseType = COURSE_TYPES[data.describe.type_course];

  return (
    <div className="flex items-center gap-2 text-sm text-base-text">
      <Icon
        icon="fluent:learning-app-20-regular"
        className="text-primary-main"
        width={16}
        height={16}
      />
      <span className="flex items-center gap-1">
        <p className="font-medium">{data.display}</p>
        <p className="text-xs font-light">- {courseType}</p>
      </span>
    </div>
  );
}

export default CourseTypeItem;
