import { z } from 'zod';

export const userCookieSchema = z.object({
  user_id: z.number(),
  uid: z.string(),
  email: z.string().email(),
  role_code: z.array(
    z.union([
      z.literal('SA'),
      z.literal('USER'),
      z.literal('CRPU'),
      z.literal('SME'),
      z.literal('VNDR'),
      z.literal('SBCN'),
      z.null(),
    ])
  ),
  group_corpu_admin: z.array(
    z.object({
      wallet_group_corpu_id: z.number(),
      name: z.string(),
      employee_id: z.number(),
    })
  ),
  employee: z.object({
    employee_id: z.number(),
    employee_number: z.string(),
    is_official_account: z.boolean(),
    name: z.string(),
    group: z.object({
      group_id: z.number(),
      name: z.string(),
    }),
    profile_picture: z.string().url(),
    social_employee_profile: z.object({
      social_employee_profile_id: z.number(),
    }),
    position_name: z.string(),
  }),
  is_first_time_login: z.boolean(),
  expire_token: z.number(),
  vendor: z
    .object({
      vendor_member_id: z.number(),
      vendor_id: z.number(),
      photo_profile: z.string(),
      name: z.string(),
    })
    .optional(),
  subcon: z
    .object({
      subcon_member_id: z.number(),
      subcon_id: z.number(),
      photo_profile: z.string(),
      name: z.string(),
    })
    .optional(),
});

export type UserCookieType = z.infer<typeof userCookieSchema>;
