/**
 * Axios API 配置
 * 包含请求拦截器、响应拦截器和错误处理
 */

import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../config/env';

// API 基础配置
const BASE_URL = API_BASE_URL;

// Token 存储键名
const TOKEN_KEY = '@auth_token';

// 创建 axios 实例
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10秒超时
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // 从 AsyncStorage 获取 token
      const token = await AsyncStorage.getItem(TOKEN_KEY);

      if (token && config.headers) {
        // 添加 Authorization header
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('获取 token 失败:', error);
    }

    // 可以在这里添加其他请求前的处理，比如添加时间戳等
    if (config.params) {
      config.params._t = Date.now();
    }

    return config;
  },
  (error: AxiosError) => {
    // 请求错误处理
    console.error('请求错误:', error);
    return Promise.reject(error);
  },
);

// API 响应数据结构
interface ApiResponseWrapper {
  body?: unknown;
  description?: string;
  status?: number;
}

// 业务响应数据结构（包含 code 的情况）
interface BusinessResponse {
  code: number;
  data?: unknown;
  message?: string;
}

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做处理
    console.log(response, 'response api');
    const responseData = response.data as ApiResponseWrapper;
    const body = responseData.body;

    // 如果后端返回的数据格式是 { code, data, message }
    if (body && typeof body === 'object' && 'code' in body) {
      const businessResponse = body as BusinessResponse;
      if (businessResponse.code === 200 || businessResponse.code === 0) {
        // 返回处理后的数据，但保持 response 结构以便类型系统识别
        return {
          ...response,
          data: businessResponse.data || body,
        } as AxiosResponse;
      } else {
        // 业务错误
        return Promise.reject(
          new Error(responseData.description || businessResponse.message || '请求失败'),
        );
      }
    }

    // 返回处理后的数据
    return {
      ...response,
      data: body || responseData,
    } as AxiosResponse;
  },
  async (error: AxiosError) => {
    // 响应错误处理
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // 未授权，清除 token 并跳转到登录页
          await AsyncStorage.removeItem(TOKEN_KEY);
          // 可以在这里触发导航到登录页
          // navigationRef.navigate('Login');
          return Promise.reject(new Error('登录已过期，请重新登录'));

        case 403:
          return Promise.reject(new Error('没有权限访问该资源'));

        case 404:
          return Promise.reject(new Error('请求的资源不存在'));

        case 500:
          return Promise.reject(new Error('服务器错误，请稍后重试'));

        default:
          const errorData = data as { message?: string; description?: string } | undefined;
          const message = errorData?.message || errorData?.description || `请求失败 (${status})`;
          return Promise.reject(new Error(message));
      }
    } else if (error.request) {
      // 请求已发出但没有收到响应
      return Promise.reject(new Error('网络连接失败，请检查网络设置'));
    } else {
      // 其他错误
      return Promise.reject(error);
    }
  },
);

// 导出 token 管理方法
export const tokenManager = {
  setToken: async (token: string) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('保存 token 失败:', error);
    }
  },

  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('获取 token 失败:', error);
      return null;
    }
  },

  removeToken: async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('删除 token 失败:', error);
    }
  },
};

// 创建类型安全的 API 包装器接口
interface TypedApiInstance {
  get<T>(
    url: string,
    config?: Partial<InternalAxiosRequestConfig>,
  ): Promise<T>;
  post<T>(
    url: string,
    data?: Record<string, string | number | boolean | null>,
    config?: Partial<InternalAxiosRequestConfig>,
  ): Promise<T>;
  put<T>(
    url: string,
    data?: Record<string, string | number | boolean | null>,
    config?: Partial<InternalAxiosRequestConfig>,
  ): Promise<T>;
  delete<T>(
    url: string,
    config?: Partial<InternalAxiosRequestConfig>,
  ): Promise<T>;
  patch<T>(
    url: string,
    data?: Record<string, string | number | boolean | null>,
    config?: Partial<InternalAxiosRequestConfig>,
  ): Promise<T>;
}

// 类型安全的 API 实例
const typedApi: TypedApiInstance = {
  get: <T>(url: string, config?: Partial<InternalAxiosRequestConfig>) => {
    return api.get<T, AxiosResponse<T>>(url, config as InternalAxiosRequestConfig).then(
      response => response.data as T,
    );
  },
  post: <T>(
    url: string,
    data?: Record<string, string | number | boolean | null>,
    config?: Partial<InternalAxiosRequestConfig>,
  ) => {
    return api.post<T, AxiosResponse<T>>(url, data, config as InternalAxiosRequestConfig).then(
      response => response.data as T,
    );
  },
  put: <T>(
    url: string,
    data?: Record<string, string | number | boolean | null>,
    config?: Partial<InternalAxiosRequestConfig>,
  ) => {
    return api.put<T, AxiosResponse<T>>(url, data, config as InternalAxiosRequestConfig).then(
      response => response.data as T,
    );
  },
  delete: <T>(url: string, config?: Partial<InternalAxiosRequestConfig>) => {
    return api.delete<T, AxiosResponse<T>>(url, config as InternalAxiosRequestConfig).then(
      response => response.data as T,
    );
  },
  patch: <T>(
    url: string,
    data?: Record<string, string | number | boolean | null>,
    config?: Partial<InternalAxiosRequestConfig>,
  ) => {
    return api.patch<T, AxiosResponse<T>>(url, data, config as InternalAxiosRequestConfig).then(
      response => response.data as T,
    );
  },
};

export default typedApi;
