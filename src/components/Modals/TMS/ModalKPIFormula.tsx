/* eslint-disable react/jsx-props-no-spreading */
import MODAL_IDS from '@constants/modalIds';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Button, Textarea } from '@mantine/core';
import closeNiceModal from '@utils/closeNiceModal';

import SectionModalTemplate from '../Templates/SectionModal';

interface ModalKPIFormulaProps {
  value: string;
}

const ModalKPIFormula = NiceModal.create(
  ({ value }: ModalKPIFormulaProps) => {
    const modalId = MODAL_IDS.TMS.SMARTPLAN.KPI_FORMULA;
    const modal = useModal(modalId);

    return (
      <SectionModalTemplate
        title="Formula KPI"
        isOpen={modal.visible}
        handleClose={() => closeNiceModal(modalId)}
        withCloseButton
        footerElement={
          <Button onClick={() => closeNiceModal(modalId)}>
            Tutup
          </Button>
        }
      >
        <div className="flex max-h-[40vh] flex-col gap-5 overflow-y-auto p-5">
          <Textarea
            placeholder="Tidak ada formula"
            value={value}
            readOnly
            minRows={5}
          />
        </div>
      </SectionModalTemplate>
    );
  }
);

export default ModalKPIFormula;
