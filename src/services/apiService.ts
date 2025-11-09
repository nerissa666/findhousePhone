/**
 * API 服务示例
 * 定义具体的 API 请求方法
 */

import api from './api';
import type {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  User,
  UpdateUserRequest,
  HouseListParams,
  HouseListResponse,
  House,
  UploadResponse,
} from '../types';

// 用户相关 API
export const userApi = {
  // 登录
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', {
      username,
      password,
    } as LoginRequest);
    return response as unknown as LoginResponse;
  },

  // 获取用户信息
  getUserInfo: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/user/info');
    return response as unknown as User;
  },

  // 更新用户信息
  updateUserInfo: async (data: UpdateUserRequest): Promise<User> => {
    const response = await api.put<ApiResponse<User>>('/user/info', data);
    return response as unknown as User;
  },
};

// 示例：房屋相关 API（根据项目名称推测）
export const houseApi = {
  // 获取房屋列表
  getHouseList: async (
    params?: HouseListParams,
  ): Promise<HouseListResponse> => {
    const response = await api.get<ApiResponse<HouseListResponse>>('/houses', {
      params,
    });
    return response as unknown as HouseListResponse;
  },

  // 获取房屋详情
  getHouseDetail: async (id: string | number): Promise<House> => {
    const response = await api.get<ApiResponse<House>>(`/houses/${id}`);
    return response as unknown as House;
  },

  // 搜索房屋
  searchHouses: async (keyword: string): Promise<House[]> => {
    const response = await api.get<ApiResponse<House[]>>('/houses/search', {
      params: { keyword },
    });
    return response as unknown as House[];
  },
};

// 通用 API 方法
export const commonApi = {
  // 上传文件
  uploadFile: async (
    file: { uri: string; type: string; name: string },
    onUploadProgress?: (progress: number) => void,
  ): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file as unknown as Blob);

    const response = await api.post<ApiResponse<UploadResponse>>(
      '/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          if (onUploadProgress && progressEvent.total) {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            onUploadProgress(progress);
          }
        },
      },
    );
    return response as unknown as UploadResponse;
  },
};
