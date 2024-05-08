import { userCookieSchema } from '@services/schema/userCookieSchema';
import Cookie from 'js-cookie';

/**
 * Responsible for checking if the user is authenticated.
 * @returns {boolean} The result of the check.
 */

export default function useIsAuthenticated(): boolean {
  const userCookie = Cookie.get('user');

  if (!userCookie) {
    return false;
  }

  const user = JSON.parse(userCookie.replace(/^j:/, ''));

  const validatedUser = userCookieSchema.safeParse(user);

  return (
    validatedUser.success &&
    validatedUser.data.expire_token >= Number(new Date()) / 1000
  );
}
