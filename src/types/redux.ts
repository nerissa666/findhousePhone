/**
 * Redux 相关类型定义
 */

import { User } from './api';

// 用户状态
export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// 计数器状态
export interface CounterState {
  value: number;
}

// Root State 类型（会在 store.ts 中扩展）
export interface RootState {
  user: UserState;
  counter: CounterState;
}
