const BASE_URL = {
  KMS: import.meta.env.VITE_KMS_URL,
  LMS: import.meta.env.VITE_LMS_URL,
  TMS: import.meta.env.VITE_TMS_URL,
  CMS: import.meta.env.VITE_CMS_URL,
  IMS: import.meta.env.VITE_IMS_URL,
  SSO: import.meta.env.VITE_SSO_URL,
};

export default function createPlatformHref(
  base: keyof typeof BASE_URL,
  path: string
): string {
  return `${BASE_URL[base]}${path}`;
}
