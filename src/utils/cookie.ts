import { userCookieSchema } from '@services/schema/userCookieSchema';
import Cookies from 'js-cookie';

export default function getUserCookie() {
  const userCookie = Cookies.get('user');

  if (!userCookie) return undefined;

  const user = JSON.parse(userCookie.replace(/^j:/, ''));
  const validatedUser = userCookieSchema.safeParse(user);

  return validatedUser.success ? validatedUser.data : undefined;
}
