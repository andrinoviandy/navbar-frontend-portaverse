import color from '@constants/color';
import MODAL_IDS from '@constants/modalIds';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Icon } from '@iconify/react';
import { Dialog } from '@mantine/core';

interface SuccessToastProps {
  message?: string;
  title?: string;
}

const SuccessToast = NiceModal.create(
  ({ message, title }: SuccessToastProps) => {
    const modal = useModal(MODAL_IDS.GENERAL.SUCCESS);

    return (
      <Dialog
        opened={modal.visible}
        withCloseButton
        onClose={modal.hide}
        position={{ bottom: 20, left: 75 }}
        transitionProps={{
          duration: 250,
          transition: 'slide-up',
        }}
        classNames={{
          root: 'flex items-center gap-4 border-l-success-main border-l-4',
          closeButton: 'my-1',
        }}
      >
        <Icon
          icon="akar-icons:circle-check-fill"
          color={color.success.main}
          width={35}
          className="shrink-0"
        />
        <div className="flex flex-col">
          <span className="text-base font-semibold">
            {title || 'Berhasil'}
          </span>
          <span className="mr-5 text-sm">{message}</span>
        </div>
      </Dialog>
    );
  }
);

export default SuccessToast;
