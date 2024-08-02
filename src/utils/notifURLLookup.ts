/* eslint-disable camelcase */
import {
  NotifItem,
  NotifItemData,
  NotifItemSocialMention,
} from '@components/Navbar/Notification/index.types';
import MODAL_IDS from '@constants/modalIds';
import NiceModal from '@ebay/nice-modal-react';

import getUserCookie from './cookie';
import createPlatformHref from './platformURL';

const notifURLLookup = (
  type: string,
  id: string | number,
  data: NotifItemData,
  notifData: NotifItem
) => {
  const user = getUserCookie();
  const vendorId = user?.vendor?.vendor_id;
  const { bast_course_id, x, z } = notifData;

  const lookupObj: {
    [key: string]: {
      payload: unknown;
      action: string;
      modalId?: string;
      modalProps?: object;
    };
  } = {
    COMMUNITY_ADD_COREMEMBER: {
      payload: createPlatformHref('KMS', `/communities/${id}`),
      action: 'redirect',
    },
    COMMUNITY_AGENDA_ADD_COMITEE: {
      payload: createPlatformHref(
        'KMS',
        `/communities/${id}/${data || id}`
      ),
      action: 'redirect',
    },
    COMMUNITY_AGENDA_ADD_NOTETAKER: {
      payload: createPlatformHref(
        'KMS',
        `/communities/${id}/${data || id}`
      ),
      action: 'redirect',
    },
    COMMUNITY_AGENDA_ADD_SPEAKER: {
      payload: createPlatformHref(
        'KMS',
        `/communities/${id}/${data || id}`
      ),
      action: 'redirect',
    },
    COMMUNITY_REMINDER_AGENDA: {
      payload: createPlatformHref(
        'KMS',
        `/communities/${id}/${data || id}`
      ),
      action: 'redirect',
    },
    COURSE_PUBLISH_COURSE: {
      payload: createPlatformHref(
        'LMS',
        `/course-pool/course/${data}/standard-information`
      ),
      action: 'redirect',
    },
    COURSE_BUY_COURSE: {
      payload: createPlatformHref('LMS', `/dashboard/${data}`),
      action: 'redirect',
    },
    COURSE_CLAIM_REJECTED: {
      payload: data,
      action: 'open-modal',
      modalId: MODAL_IDS.LMS.DASHBOARD.DECLINE_EXT_COURSE_CLAIM,
      modalProps: { note: data },
    },
    COURSE_CLAIM_SUCCEED: {
      payload: createPlatformHref(
        'LMS',
        '/dashboard#subinfo_claim-lh'
      ),
      action: 'redirect',
    },
    COURSE_COURSE_NEED_APPROVAL: {
      payload: createPlatformHref('LMS', '/course-pool/request'),
      action: 'redirect',
    },
    COURSE_CANCEL_NOT_ENOUGH_PARTICIPANT: {
      payload: createPlatformHref('LMS', '/dashboard/group'),
      action: 'redirect',
    },
    COURSE_COURSE_NEED_APPROVAL_VENDOR_REVISION: {
      payload: createPlatformHref(
        'LMS',
        `/vendor-management/${vendorId}#course-procurement`
      ),
      action: 'redirect',
    },
    COURSE_ENROLLMENT_APPROVED_BY_SUPERIOR: {
      payload: createPlatformHref('LMS', '/dashboard/group'),
      action: 'redirect',
    },
    COURSE_ENROLLMENT_APPROVED_BY_WALLET_ADMIN: {
      payload: createPlatformHref(
        'LMS',
        '/dashboard/group#approvals_approval-wallet'
      ),
      action: 'redirect',
    },
    COURSE_ENROLLMENT_REJECTED_BY_SUPERIOR: {
      payload: createPlatformHref(
        'LMS',
        '/dashboard/group#approvals'
      ),
      action: 'redirect',
    },
    COURSE_ENROLLMENT_REJECTED_BY_WALLET_ADMIN: {
      payload: createPlatformHref(
        'LMS',
        '/dashboard/group#approvals_approval-wallet'
      ),
      action: 'redirect',
    },
    COURSE_ENROLLMENT_REQUEST_TO_SUPERIOR: {
      payload: createPlatformHref(
        'LMS',
        '/dashboard/group#approvals'
      ),
      action: 'redirect',
    },
    COURSE_ENROLLMENT_REQUEST_TO_WALLET_ADMIN: {
      payload: createPlatformHref(
        'LMS',
        '/dashboard/group#approvals_approval-wallet'
      ),
      action: 'redirect',
    },
    COURSE_INVITATION: {
      payload: createPlatformHref('LMS', '/explore/request'),
      action: 'redirect',
    },
    COURSE_PUBLICATION_TARGETED: {
      payload: createPlatformHref('LMS', `/explore/${data}`),
      action: 'redirect',
    },
    // COURSE_PUBLICATION_TARGETED_TO_RANK_ID: {
    //   payload: createPlatformHref("LMS",)/???`,
    //   action: "redirect",
    // },
    COURSE_REQUEST_CANCELLED: {
      payload: createPlatformHref('LMS', '/explore/request#_mine'),
      action: 'redirect',
    },
    COURSE_REQUEST_COURSE_ACCEPT_BY_VENDOR: {
      payload: createPlatformHref('LMS', '/explore/request#_mine'),
      action: 'redirect',
    },
    COURSE_REMINDER: {
      payload: createPlatformHref('LMS', `/dashboard/${data}`),
      action: 'redirect',
    },
    COURSE_REQUEST_PUBLISHED: {
      payload: createPlatformHref('LMS', `explore/${data}`),
      action: 'redirect',
    },
    COURSE_REQUEST_PROCESSED: {
      payload: createPlatformHref('LMS', '/explore/request#_mine'),
      action: 'redirect',
    },
    KMAP_ADD_COLLABORATOR_KMAP: {
      payload: createPlatformHref('KMS', '/kmap'),
      action: 'redirect',
    },
    KMAP_ADD_COLLABORATOR_KMAP_OBJECTIVE: {
      payload: createPlatformHref('KMS', '/kmap'),
      action: 'redirect',
    },
    KMAP_ADD_SME_KMAP: {
      payload: createPlatformHref('KMS', '/kmap'),
      action: 'redirect',
    },
    KMAP_COMMENT_KMAP: {
      payload: createPlatformHref('KMS', '/kmap'),
      action: 'redirect',
    },
    KMAP_COMMENT_KMAP_OBJECTIVE: {
      payload: createPlatformHref('KMS', '/kmap'),
      action: 'redirect',
    },
    REPOSITORY_ADD_COLLABORATOR: {
      payload: createPlatformHref('KMS', '/repository'),
      action: 'redirect',
    },
    SIGNATURE_MANAGEMENT_INVITE: {
      payload: createPlatformHref('LMS', '/signature-management'),
      action: 'redirect',
    },
    SIGNATURE_MANAGEMENT_EDIT: {
      payload: createPlatformHref('LMS', '/signature-management'),
      action: 'redirect',
    },
    SIGNATURE_MANAGEMENT_REINVITE: {
      payload: createPlatformHref('LMS', '/signature-management'),
      action: 'redirect',
    },
    SOCIAL_COMMENT_POST: {
      payload: createPlatformHref('KMS', `/home?post=${data}`),
      action: 'redirect',
    },
    SOCIAL_FOLLOW: {
      payload: createPlatformHref('KMS', `/home/detail/${id}`),
      action: 'redirect',
    },
    SOCIAL_LIKE_POST: {
      payload: createPlatformHref('KMS', `/home?post=${data}`),
      action: 'redirect',
    },
    SOCIAL_MENTION: {
      payload: createPlatformHref('KMS', `/home?post=${data}`),
      action: 'redirect',
    },
    SOCIAL_MENTION_POST: {
      payload: createPlatformHref('KMS', `/home?post=${data}`),
      action: 'redirect',
    },
    SOCIAL_MENTION_COMMENT: {
      payload: createPlatformHref(
        'KMS',
        `/home?post=${(data as NotifItemSocialMention)?.post_id}&comment=${(data as NotifItemSocialMention)?.comment_id}`
      ),
      action: 'redirect',
    },
    FORUM_QUESTION_POST: {
      payload: createPlatformHref(
        'KMS',
        `/ask-expert?tab=questions&id=${data}`
      ),
      action: 'redirect',
    },
    FORUM_QUESTION_COMMENT_POST: {
      payload: createPlatformHref(
        'KMS',
        `/ask-expert?tab=answers&id=${data}`
      ),
      action: 'redirect',
    },

    // BAST NOTIFICATIONS
    'BAST_CREATE_NEED_INSPECTOR_1.1': {
      payload: createPlatformHref(
        'LMS',
        `/vendor-management/${vendorId}/bast/${bast_course_id}`
      ),
      action: 'redirect',
    },
    'BAST_HAS_ACCEPTED_INSPECTOR_1.x_NEED_ADD_DOCS_CREATOR': {
      payload: createPlatformHref(
        'LMS',
        `/vendor-management/${vendorId}/bast/${bast_course_id}`
      ),
      action: 'redirect',
    },
    'BAST_HAS_ACCEPTED_INSPECTOR_1.x_NEED_INSPECTOR_1.x': {
      payload: createPlatformHref(
        'LMS',
        `/vendor-management/${vendorId}/bast/${bast_course_id}`
      ),
      action: 'redirect',
    },
    'BAST_HAS_ACCEPTED_INSPECTOR_2.x_NEED_INSPECTOR_2.x': {
      payload: createPlatformHref(
        'LMS',
        `/vendor-management/${vendorId}/bast/${bast_course_id}`
      ),
      action: 'redirect',
    },
    BAST_HAS_REJECTED_NEED_REVISION: {
      payload: createPlatformHref(
        'LMS',
        `/vendor-management/${vendorId}/bast/${bast_course_id}`
      ),
      action: 'redirect',
    },
    'BAST_HAS_SIGNED_APPROVAL_1_NEED_INSPECTOR_2.1': {
      payload: createPlatformHref(
        'LMS',
        `/vendor-management/${vendorId}/bast/${bast_course_id}`
      ),
      action: 'redirect',
    },
    BAST_NEED_SIGNED_APPROVAL_1: {
      payload: createPlatformHref(
        'LMS',
        `/vendor-management/${vendorId}/bast/${bast_course_id}`
      ),
      action: 'redirect',
    },
    BAST_NEED_SIGNED_APPROVAL_2: {
      payload: createPlatformHref(
        'LMS',
        `/vendor-management/${vendorId}/bast/${bast_course_id}`
      ),
      action: 'redirect',
    },
    BAST_ACCEPTANCE_DONE: {
      payload: createPlatformHref(
        'LMS',
        `/vendor-management/${vendorId}/bast/${bast_course_id}`
      ),
      action: 'redirect',
    },
    CCMM_MEMBER_LIMIT_CHANGE_AGENT: {
      payload: createPlatformHref(
        'CMS',
        `/change-catalyst-member-management`
      ),
      action: 'redirect',
    },
    CCMM_MEMBER_LIMIT_CHANGE_CHAMPION: {
      payload: createPlatformHref(
        'CMS',
        `/change-catalyst-member-management`
      ),
      action: 'redirect',
    },
    CCMM_MEMBER_LIMIT_AGENT_LESS: {
      payload: createPlatformHref(
        'CMS',
        `/change-catalyst-member-management?main_tab=member-setting&list_tab=CHANGE_AGENT`
      ),
      action: 'redirect',
    },
    CCMM_MEMBER_LIMIT_AGENT_MORE: {
      payload: createPlatformHref(
        'CMS',
        `/change-catalyst-member-management?main_tab=member-setting&list_tab=CHANGE_AGENT`
      ),
      action: 'redirect',
    },
    CCMM_MEMBER_LIMIT_CHAMPION_LESS: {
      payload: createPlatformHref(
        'CMS',
        `/change-catalyst-member-management?main_tab=member-setting&list_tab=CHANGE_CHAMPION`
      ),
      action: 'redirect',
    },
    CCMM_MEMBER_LIMIT_CHAMPION_MORE: {
      payload: createPlatformHref(
        'CMS',
        `/change-catalyst-member-management?main_tab=member-setting&list_tab=CHANGE_CHAMPION`
      ),
      action: 'redirect',
    },
    CCMM_MEMBER_TOTAL_MUTATION: {
      payload: createPlatformHref(
        'CMS',
        `/change-catalyst-member-management?main_tab=member-setting&list_tab=PROMOTION`
      ),
      action: 'redirect',
    },
    CCMM_MEMBER_GET_MUTATION: {
      payload: createPlatformHref(
        'CMS',
        `/change-catalyst-member-management?main_tab=member-setting&list_tab=${z}&search_member=${x}`
      ),
      action: 'redirect',
    },
  };

  const { payload, action, modalId, modalProps } =
    lookupObj?.[type] || {};

  if (action === 'redirect') {
    window.location.href = payload as string;
  }
  if (action === 'open-modal') {
    NiceModal.show(modalId as string, modalProps);
  }
};

export default notifURLLookup;
