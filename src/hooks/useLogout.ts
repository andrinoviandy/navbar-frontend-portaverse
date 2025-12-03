import useNetworks from '@hooks/useNetworks';
import { AUTH_ENDPOINT, BASE_PROXY } from '@services/api/endpoint';
import { useCallback, useState } from 'react';
import Cookies from 'js-cookie';

/**
 * Responsible for handling the logout.
 * @returns { handleLogout: () => void; isLoading: boolean; } The handleLogout function and the isLoading state.
 */

export default function useLogout(): {
  handleLogout: () => void;
  isLoading: boolean;
} {
  const [isLoading, setIsLoading] = useState(false);
  const { mutation } = useNetworks(BASE_PROXY.auth);

  const { mutate: logout } = mutation('post', {
    onSuccess: () => {
      // window.location.href = import.meta.env.VITE_SSO_URL as string;
      window.location.href = "http://localhost:3000";
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const logoutSso = async () => {
    const refreshToken = Cookies.get("refreshTokenSso")
    const idToken = Cookies.get("idTokenSso")
    if (idToken) {
      const tokenUrl = `https://keycloak-qa.ilcs.co.id/realms/pelindo/protocol/openid-connect/logout`;
      const params = new URLSearchParams();

      params.append("client_id", "portaverse-web-local");
      params.append("client_secret", "");
      // if (CLIENT_SECRET) params.append("client_secret", CLIENT_SECRET);
      if (refreshToken) params.append("refresh_token", refreshToken);
      if (idToken) params.append("id_token_hint", idToken);

      await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      Cookies.remove("accessTokenSso")
      Cookies.remove("idTokenSso")
      Cookies.remove("refreshToken")
      Cookies.remove("refreshTokenSso")
      Cookies.remove("smartkmsystemAuthClient")
      Cookies.remove("session_id")
    }
  }

  const handleLogout = useCallback(() => {
    setIsLoading(true);
    if (Cookies.get("refreshTokenSso") || Cookies.get("idTokenSso")) {
      logoutSso()
    }
    logout({
      endpoint: AUTH_ENDPOINT.POST.logout,
      data: undefined,
    });
  }, [logout]);

  return { handleLogout, isLoading };
}
