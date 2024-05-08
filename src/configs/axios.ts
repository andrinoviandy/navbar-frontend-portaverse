import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';

function createAxiosClient(
  serviceBaseURL: string,
  timeout: number = 20000
): AxiosInstance {
  const axiosClient = axios.create({
    baseURL: serviceBaseURL,
    timeout,
  });

  axiosClient.defaults.timeout = timeout;

  return axiosClient;
}

function addRequestInterceptor(axiosClient: AxiosInstance) {
  axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const newConfig = { ...config };
      newConfig.withCredentials = true;

      return newConfig;
    },
    (error: AxiosError) => Promise.reject(error)
  );
}

function addResponseInterceptor(axiosClient: AxiosInstance) {
  axiosClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error?.response?.status === 401) {
        window.location.href = '/';
      }
      // eslint-disable-next-line no-console
      console.error(
        'Looks like there was a problem. Status Code: ',
        error?.response?.status
      );
      return Promise.reject(error);
    }
  );
}

export default function axiosMainClient(
  serviceBaseURL: string,
  timeout: number = 20000
) {
  const axiosClient = createAxiosClient(serviceBaseURL, timeout);
  addRequestInterceptor(axiosClient);
  addResponseInterceptor(axiosClient);

  return axiosClient;
}
