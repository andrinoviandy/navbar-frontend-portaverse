import { Icon } from '@iconify/react';
import trimString from '@utils/string';

import { Post, Survey } from '../index.types';

interface PostTypeItemProps {
  data: Post | Survey;
}

function PostTypeItem({ data }: PostTypeItemProps) {
  const postContent = document.createElement('div');
  postContent.innerHTML = data.display;
  const parsedContent =
    postContent.textContent || postContent.innerText || '';

  return (
    <div className="flex items-center gap-2 text-sm text-base-text">
      <Icon
        icon="bi:file-post"
        className="text-primary-main"
        width={16}
        height={16}
      />
      <span className="flex items-center gap-1 text-xs">
        <p className="font-medium">{trimString(parsedContent)}</p>
        <p className="font-light">- {data.describe.category_post}</p>
      </span>
    </div>
  );
}

export default PostTypeItem;
