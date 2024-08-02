import { UserCookieType } from '@services/schema/userCookieSchema';
import getUserCookie from '@utils/cookie';

/**
 * Responsible for getting the user object and the initials of the user from the user cookie.
 * @returns { user: User | undefined; initials: string | undefined; } The user object and the initials of the user.
 */

export default function useUserCookie(): {
  user: UserCookieType | undefined;
  initials: string | undefined;
} {
  const user = getUserCookie();

  const initials = (user?.employee?.name || '')
    .split(' ')
    .map((namePart: string) => namePart[0])
    .join('');


  return { user, initials };
}
