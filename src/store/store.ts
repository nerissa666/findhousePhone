/**
 * Redux Store 配置
 * 使用 Redux Toolkit 创建 store
 */

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import userReducer from './slices/userSlice';
import paramsReducer from './slices/paramsSlice';
import cityReducer from './slices/citySlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    params: paramsReducer,
    city: cityReducer,
  },
  // 开发环境启用 Redux DevTools
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略某些 action 的序列化检查（如果需要）
        ignoredActions: [],
      },
    }),
});

// 导出类型，用于 TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
