import { HelpCenterMenuProps } from './index.types';

const HELP_CENTER_MENU: HelpCenterMenuProps[] = [
  {
    title: 'Frequently Asked Question',
    content:
      'Akses portaverse FAQ portal untuk lebih lanjut terkait fitur Portaverse',
    icon: 'fluent:chat-bubbles-question-16-filled',
    route:
      'http://docs-portaverse.pelindo.co.id',
  },
  {
    title: 'Portaverse IT Management',
    content: `Menemukan masalah pada aplikasi Portaverse? Silahkan
    lapor kami`,
    icon: 'jam:triangle-danger-f',
    route:
      'https://portaverse.atlassian.net/servicedesk/customer/portal/3/group/-1',
  },
  {
    title: 'Whatsapp',
    content: `Ada pertanyaan seputar penggunaan Portaverse?
    Silahkan kontak Porta via Whatsapp`,
    icon: 'fluent:call-24-filled',
    route:
      'https://api.whatsapp.com/send/?phone=%2B6281911111375&text&type=phone_number&app_absent=0',
  },
];

export default HELP_CENTER_MENU;
