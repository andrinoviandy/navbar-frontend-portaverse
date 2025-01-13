import { z } from 'zod';

export const userCookieSchema = z.object({
  user_id: z.number(),
  uid: z.string(),
  email: z.string().email(),
  role_code: z.array(z.union([z.string(), z.null()])),
  group_corpu_admin: z
    .array(
      z.object({
        wallet_group_corpu_id: z.number().nullish(),
        name: z.string().nullish(),
        employee_id: z.number().nullish(),
      })
    )
    .optional(),
  employee: z.object({
    employee_id: z.number(),
    employee_number: z.string().optional(),
    is_official_account: z.boolean().optional(),
    name: z.union([z.string(), z.null()]).optional(),
    group: z
      .object({
        group_id: z.number().nullish(),
        name: z.string().nullish(),
      })
      .optional(),
    group_master: z.object({}).optional(),
    profile_picture: z.string().url().optional(),
    social_employee_profile: z
      .object({
        social_employee_profile_id: z.number().optional(),
      })
      .optional(),
    position_name: z.string().optional(),
  }),
  is_first_time_login: z.boolean(),
  expire_token: z.number(),
  vendor: z
    .object({
      vendor_member_id: z.number().optional(),
      vendor_id: z.number().optional(),
      photo_profile: z.string().optional(),
      name: z.string().optional(),
    })
    .optional(),
  subcon: z
    .object({
      subcon_member_id: z.number().optional(),
      subcon_id: z.number().optional(),
      photo_profile: z.string().optional(),
      name: z.string().optional(),
    })
    .optional(),
});

export type UserCookieType = z.infer<typeof userCookieSchema>;
