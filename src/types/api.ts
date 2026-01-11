/**
 * API 相关类型定义
 */

// API 响应基础结构
// 支持多种格式：直接返回数据、或包装在 body/data 中
export type ApiResponse<T = unknown> = T; // 直接返回数据（如数组）

// // 从 ApiResponse 中提取实际数据的辅助类型
// export type ExtractApiData<T> = T extends { body: infer U }
//   ? U
//   : T extends { data: infer U }
//   ? U
//   : T;

// // 从 ApiResponse 中提取实际数据的辅助函数
// export function extractApiData<T>(response: ApiResponse<T>): T {
//   // 如果 response 本身就是数组或基本类型，直接返回
//   if (!response || typeof response !== 'object' || Array.isArray(response)) {
//     return response as T;
//   }
//   // 检查是否有 body 属性
//   if ('body' in response) {
//     return (response as { body: T }).body;
//   }
//   // 检查是否有 data 属性
//   if ('data' in response) {
//     return (response as { data: T }).data;
//   }
//   // 否则直接返回（可能是直接的数据）
//   return response as T;
// }

// 登录请求参数
export interface LoginRequest {
  username: string;
  password: string;
}

// 注册请求参数
export interface RegisterRequest {
  username: string;
  password: string;
}

// 登录响应数据
export interface LoginResponse {
  token: string;
  user: User;
}

// 注册响应数据
export interface RegisterResponse {
  token?: string;
  user?: User;
  message?: string;
}

// 用户信息
export type User = Readonly<{
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
}>;

// 更新用户信息请求
export type UpdateUserRequest = Partial<{
  name: string;
  email: string;
  avatar: string;
  phone: string;
}>;

// 查询房屋入参信息
type BaseHouseQueryParams = {
  cityId: string;
  area: string;
  subway: string;
  rentType: boolean;
  price: number;
  more: string;
  roomType: string;
  oriented: string;
  characteristic: string;
  floor: string;
  end: number;
  start: number;
}
export type HouseQueryParams =
  { cityId: string } &
  Partial<Omit<BaseHouseQueryParams, 'cityId'>>;

// 房屋信息
export interface House {
  houseImg: string;
  title: string;
  tags: string[];
  price: number;
  desc: string;
  houseCode: string;
}

// 房屋列表查询参数
export type HouseListParams = Partial<{
  page: number;
  pageSize: number;
  city: string;
  priceRange: string;
  areaRange: string;
  keyword: string;
}>;

// 房屋列表响应（根据后端实际返回结构）
export interface HouseListResponse {
  list: House[];
  count: number; // 后端返回的是 count，不是 total
}

// 房屋列表响应（标准分页格式，如果后端支持）
export interface HouseListResponsePaginated {
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

// 菜单项
export interface MenuItem {
  name: string;
  icon: string;
  navigator: string;
  params?: Record<string, any>;
}

// 租房小组
export interface Group {
  id: number;
  title: string;
  desc: string;
  imgSrc: string;
}

// 新闻
export interface News {
  id: number;
  title: string;
  imgSrc: string;
  from: string;
  date: string;
}

// 收藏响应
export interface FavoriteResponse {
  isFavorite?: boolean;
  message?: string;
}