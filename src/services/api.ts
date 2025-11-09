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

// API 基础配置
const BASE_URL = __DEV__
  ? 'http://localhost:3000/api' // 开发环境
  : 'https://api.example.com'; // 生产环境

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

// 响应拦截器
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // 对响应数据做处理
    const { data } = response;

    // 如果后端返回的数据格式是 { code, data, message }
    if (data && typeof data === 'object' && 'code' in data) {
      if (data.code === 200 || data.code === 0) {
        return data.data || data;
      } else {
        // 业务错误
        return Promise.reject(new Error(data.message || '请求失败'));
      }
    }

    return data;
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
          const message = (data as any)?.message || `请求失败 (${status})`;
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

export default api;
