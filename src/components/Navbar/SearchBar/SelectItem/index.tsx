/* eslint-disable react/function-component-definition */
import { Anchor, ComboboxItem, SelectProps } from '@mantine/core';
import { useMemo } from 'react';

import CourseTypeItem from './CourseTypeItem';
import DocumentTypeItem from './DocumentTypeItem';
import EmployeeTypeItem from './EmployeeTypeItem';
import PostTypeItem from './PostTypeItem';
import TrainerTypeItem from './TrainerTypeItem';
import {
  Course,
  Document,
  Employee,
  Post,
  ResponseData,
  Socmed,
  Survey,
  Trainer,
} from '../index.types';

interface ExtendedComboboxItem extends ComboboxItem {
  data?: ResponseData;
}

const mapGroup = {
  socmed: {
    group: 'Sosial Media Profile',
    render: (data: Socmed) => (
      <EmployeeTypeItem
        avatar={data.describe.social_media_avatar}
        employeeName={data.display}
        employeeNumber={data.describe.nipp}
      />
    ),
  },
  employee: {
    group: 'Pegawai',
    render: (data: Employee) => (
      <EmployeeTypeItem
        avatar={data.describe.avatar}
        isSME={data.describe.is_sme}
        withAvatar
        employeeName={data.display}
        employeeNumber={data.describe.nipp}
        positionName={data.describe.position}
      />
    ),
  },
  post: {
    group: 'Post',
    render: (data: Post) => <PostTypeItem data={data} />,
  },
  survey: {
    group: 'Survey',
    render: (data: Survey) => <PostTypeItem data={data} />,
  },
  document: {
    group: 'Dokumen',
    render: (data: Document) => <DocumentTypeItem data={data} />,
    href: '/document',
  },
  course: {
    group: 'Kursus',
    render: (data: Course) => <CourseTypeItem data={data} />,
  },
  trainer: {
    group: 'Trainer',
    render: (data: Trainer) => <TrainerTypeItem data={data} />,
  },
};

const SelectItem: SelectProps['renderOption'] = ({ option }) => {
  const typedOption = useMemo(
    () => ({ ...option }) as ExtendedComboboxItem,
    [option]
  );
  const renderItem = useMemo(() => {
    if (typedOption.data?.type === 'socmed')
      return mapGroup.socmed?.render(typedOption.data as Socmed);
    if (typedOption.data?.type === 'employee')
      return mapGroup.employee?.render(typedOption.data as Employee);
    if (typedOption.data?.type === 'post')
      return mapGroup.post?.render(typedOption.data as Post);
    if (typedOption.data?.type === 'document')
      return mapGroup.document?.render(typedOption.data as Document);
    if (typedOption.data?.type === 'course')
      return mapGroup.course?.render(typedOption.data as Course);
    if (typedOption.data?.type === 'trainer')
      return mapGroup.trainer?.render(typedOption.data as Trainer);
    return null;
  }, [typedOption]);

  return (
    <Anchor
      rel="noopener noreferrer"
      className="no-underline hover:no-underline"
    >
      {renderItem}
    </Anchor>
  );
};

export default SelectItem;
