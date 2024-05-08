/* eslint-disable import/prefer-default-export */
import { create } from 'zustand';

type NotifPlatforms = 'all' | 'lms' | 'kms' | 'tms' | 'ims' | 'cms';
type NotifPlatformObj = {
  all?: number;
  lms?: number;
  kms?: number;
  tms?: number;
  ims?: number;
  cms?: number;
};
interface NotifState {
  unread: NotifPlatformObj;
  increaseUnread: (by: number, platform: NotifPlatforms) => void;
  setUnread: (unreadObj: NotifPlatformObj) => void;
}

export const useNotifStore = create<NotifState>((set) => ({
  unread: {
    all: 0,
    lms: 0,
    kms: 0,
    tms: 0,
    ims: 0,
    cms: 0,
  },
  increaseUnread: (by, platform) =>
    set((state) => {
      // If specific platform is increased, then also increase 'all'
      if (platform !== 'all') {
        return {
          unread: {
            ...state.unread,
            all: state.unread.all! + by,
            [platform]: state.unread[platform]! + by,
          },
        };
      }
      return {
        unread: {
          ...state.unread,
          [platform]: state.unread[platform]! + by,
        },
      };
    }),
  setUnread: (newUnread) =>
    set((state) => ({
      unread: {
        ...state.unread,
        ...newUnread,
      },
    })),
}));
