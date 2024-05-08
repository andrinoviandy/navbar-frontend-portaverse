import ErrorToast from '@components/Toasts/ErrorToast';
import SuccessToast from '@components/Toasts/SuccessToast';
import MODAL_IDS from '@constants/modalIds';
import { ModalDef } from '@ebay/nice-modal-react';

import Confirmations from './Confirmations';
import ModalDeclineExtCourseClaim from './LMS/ModalDeclineExtCourseClaim';
import ModalKPIFormula from './TMS/ModalKPIFormula';

export default function ModalPortal() {
  return (
    <>
      {/* GENERAL */}
      <ModalDef
        id={MODAL_IDS.GENERAL.CONFIRMATION}
        component={Confirmations}
      />
      <ModalDef id={MODAL_IDS.GENERAL.ERROR} component={ErrorToast} />
      <ModalDef
        id={MODAL_IDS.GENERAL.SUCCESS}
        component={SuccessToast}
      />

      {/* LMS Modals */}
      <ModalDef
        id={MODAL_IDS.LMS.DASHBOARD.DECLINE_EXT_COURSE_CLAIM}
        component={ModalDeclineExtCourseClaim}
      />

      {/* TMS Modals */}
      <ModalDef
        id={MODAL_IDS.TMS.SMARTPLAN.KPI_FORMULA}
        component={ModalKPIFormula}
      />
    </>
  );
}
