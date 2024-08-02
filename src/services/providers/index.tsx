import NiceModal from '@ebay/nice-modal-react';
import useIsAuthenticated from '@hooks/useIsAuthenticated';
import { MantineProvider } from '@mantine/core';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import theme from '../../theme';

/**
 * Responsible for providing the context of the application.
 */

function Provider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = `${import.meta.env.VITE_SSO_URL}/login`;
    }
  }, [isAuthenticated]);

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <NiceModal.Provider>
          {/* <MobileBanner /> */}
          {children}
        </NiceModal.Provider>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default Provider;
