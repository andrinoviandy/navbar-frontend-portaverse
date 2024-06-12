import getUserCookie from '@utils/cookie';

/**
 * Responsible for checking if the user is authenticated.
 * @returns {boolean} The result of the check.
 */

export default function useIsAuthenticated(): boolean {
  const userCookie = getUserCookie();

  if (!userCookie) {
    return false;
  }

  // const validatedUser = userCookieSchema.safeParse(user);

  return (
    // validatedUser.success &&
    userCookie.expire_token >= Number(new Date()) / 1000
  );
}
