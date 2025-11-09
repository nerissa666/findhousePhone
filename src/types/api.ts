/**
 * API 相关类型定义
 */

// API 响应基础结构
export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

// 登录请求参数
export interface LoginRequest {
  username: string;
  password: string;
}

// 登录响应数据
export interface LoginResponse {
  token: string;
  user: User;
}

// 用户信息
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

// 更新用户信息请求
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  avatar?: string;
  phone?: string;
}

// 房屋信息
export interface House {
  id: string | number;
  title: string;
  description?: string;
  price: number;
  city: string;
  address: string;
  area: number;
  rooms?: number;
  images?: string[];
  createdAt?: string;
  updatedAt?: string;
}

// 房屋列表查询参数
export interface HouseListParams {
  page?: number;
  pageSize?: number;
  city?: string;
  priceRange?: string;
  areaRange?: string;
  keyword?: string;
}

// 房屋列表响应
export interface HouseListResponse {
  list: House[];
  total: number;
  page: number;
  pageSize: number;
}

// 文件上传响应
export interface UploadResponse {
  url: string;
  filename?: string;
  size?: number;
}

// 分页响应基础结构
export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
