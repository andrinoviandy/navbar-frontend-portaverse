/* eslint-disable react/jsx-props-no-spreading */
import MODAL_IDS from '@constants/modalIds';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import useNetworks from '@hooks/useNetworks';
import { Button, Textarea } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { BASE_PROXY, COURSE_ENDPOINT } from '@services/api/endpoint';
import closeNiceModal from '@utils/closeNiceModal';
import showSuccessDialog from '@utils/showSuccessDialog';
import { z } from 'zod';

import SectionModalTemplate from '../Templates/SectionModal';

interface ModalDeclineExtCourseClaimProps {
  courseClaimIds: string[] | number[];
  onSuccess?: () => void;
  note?: string;
}

const ModalDeclineExtCourseClaim = NiceModal.create(
  ({
    courseClaimIds,
    onSuccess,
    note,
  }: ModalDeclineExtCourseClaimProps) => {
    const modalId = MODAL_IDS.LMS.DASHBOARD.DECLINE_EXT_COURSE_CLAIM;
    const modal = useModal(modalId);

    const form = useForm({
      initialValues: {
        note: note || '',
      },
      validate: zodResolver(
        z.object({
          note: z.string(),
        })
      ),
    });

    const { mutation } = useNetworks(BASE_PROXY.course);

    const { mutateAsync, isPending: isLoadingAction } =
      mutation('put');

    const handleDecline = async () => {
      const promises = courseClaimIds.map((id) => {
        return mutateAsync({
          endpoint: COURSE_ENDPOINT.PUT.updateExtCourseClaim(id),
          data: { note: form.values.note },
          axiosConfigs: {
            params: {
              status: 'Ditolak',
            },
          },
        });
      });
      await Promise.all(promises).then(() => {
        showSuccessDialog({
          title: 'Berhasil',
          message: 'Penolakan klaim learning hour berhasil diajukan',
        });
        closeNiceModal(
          MODAL_IDS.LMS.DASHBOARD.DECLINE_EXT_COURSE_CLAIM
        );
        onSuccess?.();
      });
    };

    const showConfirmation = () => {
      NiceModal.show(MODAL_IDS.GENERAL.CONFIRMATION, {
        message: 'Klaim Learning Hour',
        subMessage:
          'Anda yakin ingin menolak klaim learning hour ini?',
        variant: 'danger',
        labelCancel: 'Tinjau Ulang',
        labelConfirm: 'Ya, Saya Yakin',
        handleConfirm: () =>
          closeNiceModal(MODAL_IDS.GENERAL.CONFIRMATION).then(() =>
            handleDecline()
          ),
      });
    };

    return (
      <SectionModalTemplate
        title={
          note
            ? 'Alasan Penolakan Klaim'
            : 'Tolak Klaim Learning Hour'
        }
        isOpen={modal.visible}
        withCloseButton
        handleClose={() => closeNiceModal(modalId)}
        withFooter
        footerElement={
          <>
            <Button
              variant={note ? 'filled' : 'outline'}
              onClick={() => closeNiceModal(modalId)}
              disabled={isLoadingAction}
            >
              {note ? 'Tutup' : 'Batalkan'}
            </Button>
            {!note && (
              <Button
                onClick={showConfirmation}
                disabled={!form.isValid() || !!note}
                loading={isLoadingAction}
              >
                Kirim Penolakan
              </Button>
            )}
          </>
        }
      >
        <div className="max-h-[50vh] overflow-y-auto p-5">
          <Textarea
            label="Alasan Penolakan"
            placeholder="Tuliskan alasan penolakan Anda..."
            {...form.getInputProps('note')}
            classNames={{ input: 'resize-y' }}
            minRows={5}
            disabled={!!note}
          />
        </div>
      </SectionModalTemplate>
    );
  }
);
export default ModalDeclineExtCourseClaim;
