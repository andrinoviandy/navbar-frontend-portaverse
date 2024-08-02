import MODAL_IDS from '@constants/modalIds';
import NiceModal from '@ebay/nice-modal-react';

export default function showSuccessDialog({
  message,
  title,
}: {
  message: string;
  title: string;
}) {
  NiceModal.show(MODAL_IDS.GENERAL.SUCCESS, { message, title });
  setTimeout(() => {
    NiceModal.hide(MODAL_IDS.GENERAL.SUCCESS);
    setTimeout(() => {
      NiceModal.remove(MODAL_IDS.GENERAL.SUCCESS);
    }, 500);
  }, 3000);
}
