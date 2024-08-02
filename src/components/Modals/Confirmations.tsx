import MODAL_IDS from '@constants/modalIds';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import closeNiceModal from '@utils/closeNiceModal';

import ConfirmationModalTemplate, {
  ConfirmationModalTemplateProps,
} from './Templates/ConfirmationModal';

interface ConfirmationsProps extends ConfirmationModalTemplateProps {
  handleCancel?: () => void;
}

const Confirmations = NiceModal.create(
  ({
    message,
    subMessage,
    handleConfirm,
    handleCancel,
    variant = 'safe',
    withCancel = true,
    withConfirm = true,
    labelCancel = 'Tidak',
    labelConfirm = 'Ya',
    width = '350px',
    buttonWidth,
  }: ConfirmationsProps) => {
    const modalId = MODAL_IDS.GENERAL.CONFIRMATION;
    const modal = useModal(modalId);

    return (
      <ConfirmationModalTemplate
        isOpen={modal.visible}
        variant={variant}
        message={message}
        subMessage={subMessage}
        handleClose={
          handleCancel !== undefined
            ? handleCancel
            : () => closeNiceModal(modalId)
        }
        handleConfirm={handleConfirm}
        withCancel={withCancel}
        withConfirm={withConfirm}
        labelCancel={labelCancel}
        labelConfirm={labelConfirm}
        width={width}
        buttonWidth={buttonWidth}
      />
    );
  }
);

export default Confirmations;
