function isDevelopmentEnvironment(): boolean {
  return import.meta.env.DEV;
}

function generateEnvKey(url: string): string {
  return url.split('/')[2].toUpperCase().replace(/-/g, '_');
}

function getEnvironmentURL(url: string): string {
  if (isDevelopmentEnvironment()) {
    return url;
  }

  const envKey = generateEnvKey(url);
  return import.meta.env[`VITE_API_${envKey}_SERVICE_URL`] as string;
}

/**
 * Responsible for returning the base URL of the API.
 */

export default function baseURL(url: string): string {
  return (
    import.meta.env.VITE_API_GATEWAY_URL || getEnvironmentURL(url)
  );
}
