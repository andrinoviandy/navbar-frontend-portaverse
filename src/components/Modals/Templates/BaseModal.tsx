import { Modal } from '@mantine/core';
import { ReactNode } from 'react';

interface BaseModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
  width?: number | string;
}

export default function BaseModalTemplate({
  isOpen,
  handleClose,
  children,
  width = '40vw',
}: BaseModalProps) {
  return (
    <Modal
      opened={isOpen}
      onClose={handleClose}
      size={width}
      centered
      padding={0}
      overlayProps={{ opacity: 0.1 }}
      transitionProps={{ duration: 300 }}
      radius="md"
      classNames={{ body: 'p-6' }}
      zIndex={50}
    >
      {children}
    </Modal>
  );
}
