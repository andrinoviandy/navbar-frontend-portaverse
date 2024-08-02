import { Icon } from '@iconify/react';

import { Document } from '../index.types';

interface DocumentTypeItemProps {
  data: Document;
}

function DocumentTypeItem({ data }: DocumentTypeItemProps) {
  const documentTitle = document.createElement('div');
  documentTitle.innerHTML = data.display;
  const parsedDocument =
    documentTitle.textContent || documentTitle.innerText || '';
  return (
    <div className="flex items-center gap-2 text-sm text-base-text">
      <Icon
        icon="pajamas:doc-text"
        className="text-primary-main"
        width={16}
        height={16}
      />
      <span className="flex items-center gap-1">
        <p className="font-medium">{parsedDocument}</p>
        <p className="text-xs font-light">
          .{data.describe.type_file}
        </p>
      </span>
    </div>
  );
}

export default DocumentTypeItem;
