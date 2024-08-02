import axiosMainClient from '@configs/axios';
import { AxiosError, AxiosRequestConfig } from 'axios';

const apiService = {
  request: async <T>(
    baseURL: string,
    method: string,
    endpoint: string,
    data: unknown,
    axiosConfigs: AxiosRequestConfig = {}
  ): Promise<T> => {
    try {
      const res = await axiosMainClient(baseURL).request<T>({
        method,
        url: endpoint,
        data,
        ...axiosConfigs,
      });
      return res.data;
    } catch (err) {
      const error = err as Error | AxiosError;
      throw error;
    }
  },
};

export default apiService;
