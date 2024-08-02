import useNetworks from '@hooks/useNetworks';
import { AUTH_ENDPOINT, BASE_PROXY } from '@services/api/endpoint';
import { useCallback, useState } from 'react';

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
      window.location.href = import.meta.env.VITE_SSO_URL as string;
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const handleLogout = useCallback(() => {
    setIsLoading(true);
    logout({
      endpoint: AUTH_ENDPOINT.POST.logout,
      data: undefined,
    });
  }, [logout]);

  return { handleLogout, isLoading };
}
