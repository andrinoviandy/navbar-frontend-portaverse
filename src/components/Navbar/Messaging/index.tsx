import { Icon } from '@iconify/react';

import ActionContainer from '../ActionContainer';

/**
 * Responsible for rendering the messaging action.
 */

function Messaging() {
  const url = `${import.meta.env.VITE_KMS_URL}/messaging`;

  return (
    <a href={url} aria-label="Messaging">
      <ActionContainer>
        <Icon icon="ph:chat-circle" fontSize={25} />
      </ActionContainer>
    </a>
  );
}

export default Messaging;
