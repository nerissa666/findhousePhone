/**
 * 用户状态 Slice
 * 管理用户信息和认证状态
 *
 * 使用 createAsyncThunk 处理异步操作（如登录、获取用户信息）
 */

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { userApi, tokenManager } from '../../services';
import type { User, UserState } from '../../types';

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

/**
 * 异步 Thunk：登录用户
 *
 * createAsyncThunk 的作用：
 * 1. 自动生成三种 action types: pending, fulfilled, rejected
 * 2. 自动处理 loading 状态
 * 3. 统一错误处理
 * 4. 让异步操作可以像同步 action 一样使用
 *
 * 注意：
 * - 'user/login' 是 Redux action type（用于 Redux 内部标识），不是后端接口地址
 * - 真正的后端接口地址是 '/auth/login'，定义在 apiService.ts 的 userApi.login() 中
 */
export const loginUser = createAsyncThunk(
  'user/login', // ← 这是 Redux action type，不是后端接口地址
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      // 这里调用的是真正的后端接口：POST /auth/login
      // 定义在 src/services/apiService.ts 的 userApi.login()
      const response = (await userApi.login(username, password)) as unknown as {
        token: string;
        user: User;
      };
      // 保存 token 到本地存储
      await tokenManager.setToken(response.token);
      return response.user;
    } catch (error) {
      // 返回错误信息，而不是抛出异常
      return rejectWithValue(
        error instanceof Error ? error.message : '登录失败',
      );
    }
  },
);

/**
 * 异步 Thunk：获取用户信息
 *
 * 注意：
 * - 'user/fetchUserInfo' 是 Redux action type（用于 Redux 内部标识），不是后端接口地址
 * - 真正的后端接口地址是 '/user/info'，定义在 apiService.ts 的 userApi.getUserInfo() 中
 * - createAsyncThunk 会自动生成三种 action types：
 *   - 'user/fetchUserInfo/pending' - 请求开始
 *   - 'user/fetchUserInfo/fulfilled' - 请求成功
 *   - 'user/fetchUserInfo/rejected' - 请求失败
 */
export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo', // ← 这是 Redux action type，不是后端接口地址
  async (_, { rejectWithValue }) => {
    try {
      // 这里调用的是真正的后端接口：GET /user/info
      // 定义在 src/services/apiService.ts 的 userApi.getUserInfo()
      const user = (await userApi.getUserInfo()) as unknown as User;
      return user;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : '获取用户信息失败',
      );
    }
  },
);

/**
 * 异步 Thunk：登出
 */
export const logoutUser = createAsyncThunk('user/logout', async () => {
  await tokenManager.removeToken();
  // 返回 null 表示清除用户信息
  return null;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 同步 action：直接设置用户信息
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    // 同步 action：清除用户信息
    clearUser: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    // 同步 action：清除错误
    clearError: state => {
      state.error = null;
    },
  },
  // extraReducers：处理异步 thunk 的 action
  extraReducers: builder => {
    // 处理 loginUser
    builder
      .addCase(loginUser.pending, state => {
        // 登录开始：设置 loading 状态
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // 登录成功：保存用户信息
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        // 登录失败：保存错误信息
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });

    // 处理 fetchUserInfo
    builder
      .addCase(fetchUserInfo.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // 处理 logoutUser
    builder
      .addCase(logoutUser.pending, state => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      });
  },
});

export const { setUser, clearUser, clearError } = userSlice.actions;
export default userSlice.reducer;
