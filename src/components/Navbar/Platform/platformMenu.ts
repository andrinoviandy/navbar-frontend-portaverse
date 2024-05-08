import { PlatformMenuProps } from './index.types';

const PLATFORM_MENU: PlatformMenuProps[] = [
  {
    title: 'KMS',
    content: 'Media bersosialisasi antar sesama portizen',
    route: import.meta.env.VITE_KMS_URL || '',
  },
  {
    title: 'LMS',
    content: 'Eksplorasi materi pembelajaran sesuai minat dan bakat',
    route: import.meta.env.VITE_LMS_URL || '',
  },
  {
    title: 'TMS',
    content:
      'Ketahui target capaian perusahaan dan temukan pengembangan diri',
    route: import.meta.env.VITE_TMS_URL || '',
  },
  {
    title: 'CMS',
    content: '',
    route: import.meta.env.VITE_CMS_URL || '',
  },
  {
    title: 'IMS',
    content: '',
    route: import.meta.env.VITE_IMS_URL || '',
  },
];

export default PLATFORM_MENU;
