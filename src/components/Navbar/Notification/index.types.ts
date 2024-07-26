export type TransformedModulesItem = {
  label: string;
  value: string;
}[];
export type ModulesData = {
  modules: string[];
};

export type NotifItemSocialMention = {
  post_id?: number;
  comment_id?: number;
};
export type NotifItemData = string | number | NotifItemSocialMention;
export type NotifItem = {
  notification_id: number;
  notification_topic_code: string;
  viewed: number;
  template: string;
  origin: string;
  module: string;
  is_global: boolean;
  send_from: number;
  reminder_at: number;
  data: NotifItemData;
  x: unknown;
  y: unknown;
  z: unknown;
  pinnedAt: string;
  title: string;
  acceptance_status: boolean | null;
  send_from_name: string;
  entities: string;
  avatar: string;
  is_sme: number;
  content: string;
  message: string;
  is_pinned: boolean;
  is_have_action: boolean;
  is_have_detail: boolean;
  bast_course_id: number;
};
export type TransformedNotifData = {
  totalPage: number;
  items: NotifItem[];
};
export type NotifData = {
  notifications: NotifItem[];
  totalPage: number;
};

export type UnreadNotifData = {
  all?: number;
  kms?: number;
  tms?: number;
  lms?: number;
  ims?: number;
  cms?: number;
};

export type BASTLogData = {
  log_id: number;
  user: string;
  as: string;
  action: string;
  on: string;
  cost_center_name: string;
}[];

export interface SocketResponse {
  message: {
    origin: string;
  };
}
