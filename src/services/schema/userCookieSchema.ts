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
    .nullish(),
  employee: z.object({
    employee_id: z.number().nullish(),
    employee_number: z.string().nullish(),
    is_official_account: z.boolean().nullish(),
    name: z.union([z.string(), z.null()]).nullish(),
    group: z
      .object({
        group_id: z.number().nullish(),
        name: z.string().nullish(),
      })
      .nullish(),
    group_master: z.object({}).nullish(),
    profile_picture: z.string().url().nullish(),
    social_employee_profile: z
      .object({
        social_employee_profile_id: z.number().nullish(),
      })
      .nullish(),
    position_name: z.string().nullish(),
  }),
  is_first_time_login: z.boolean(),
  expire_token: z.number(),
  vendor: z
    .object({
      vendor_member_id: z.number().nullish(),
      vendor_id: z.number().nullish(),
      photo_profile: z.string().nullish(),
      name: z.string().nullish(),
    })
    .nullish(),
  subcon: z
    .object({
      subcon_member_id: z.number().nullish(),
      subcon_id: z.number().nullish(),
      photo_profile: z.string().nullish(),
      name: z.string().nullish(),
    })
    .nullish(),
});

export type UserCookieType = z.infer<typeof userCookieSchema>;
