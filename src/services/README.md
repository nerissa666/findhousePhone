# API 服务使用指南

## 概述

本项目使用 axios 进行网络请求，已配置好请求拦截器、响应拦截器和错误处理。

## 文件结构

- `api.ts` - Axios 实例配置，包含拦截器和 token 管理
- `apiService.ts` - 具体的 API 请求方法
- `index.ts` - 统一导出

## 使用方法

### 1. 基本使用

```typescript
import { api } from '@/services';

// GET 请求
const data = await api.get('/users');

// POST 请求
const result = await api.post('/users', {
  name: 'John',
  email: 'john@example.com',
});

// PUT 请求
const updated = await api.put('/users/1', { name: 'Jane' });

// DELETE 请求
await api.delete('/users/1');
```

### 2. 使用预定义的 API 方法

```typescript
import { userApi, houseApi } from '@/services';

// 登录
try {
  const response = await userApi.login('username', 'password');
  // 保存 token
  await tokenManager.setToken(response.token);
} catch (error) {
  console.error('登录失败:', error);
}

// 获取房屋列表
const houses = await houseApi.getHouseList({ page: 1, pageSize: 10 });
```

### 3. Token 管理

```typescript
import { tokenManager } from '@/services';

// 保存 token
await tokenManager.setToken('your-token-here');

// 获取 token
const token = await tokenManager.getToken();

// 删除 token（登出时使用）
await tokenManager.removeToken();
```

### 4. 在 React 组件中使用

```typescript
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { houseApi } from '@/services';

export function HouseListScreen() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadHouses();
  }, []);

  const loadHouses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await houseApi.getHouseList({ page: 1, pageSize: 20 });
      setHouses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Text>加载中...</Text>;
  if (error) return <Text>错误: {error}</Text>;

  return (
    <View>
      {houses.map(house => (
        <Text key={house.id}>{house.name}</Text>
      ))}
    </View>
  );
}
```

### 5. 与 Redux 结合使用

#### 什么是 createAsyncThunk？

`createAsyncThunk` 是 Redux Toolkit 提供的工具，用于处理异步操作（如 API 请求）。

**为什么需要它？**

1. **自动生成三种状态**：每个异步操作会自动生成三种 action：

   - `pending`：请求开始（loading = true）
   - `fulfilled`：请求成功（保存数据）
   - `rejected`：请求失败（保存错误信息）

2. **统一的状态管理**：不需要手动管理 loading、error 状态

3. **简化代码**：相比手动写多个 action 和 reducer，代码更简洁

**对比：不使用 vs 使用 createAsyncThunk**

```typescript
// ❌ 不使用 createAsyncThunk（需要手动管理）
const loginStart = () => ({ type: 'user/loginStart' });
const loginSuccess = user => ({ type: 'user/loginSuccess', payload: user });
const loginFailure = error => ({ type: 'user/loginFailure', payload: error });

// 在组件中需要手动处理
dispatch(loginStart());
try {
  const user = await userApi.login(username, password);
  dispatch(loginSuccess(user));
} catch (error) {
  dispatch(loginFailure(error.message));
}

// ✅ 使用 createAsyncThunk（自动处理）
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username, password }) => {
    const response = await userApi.login(username, password);
    await tokenManager.setToken(response.token);
    return response.user;
  },
);

// 在组件中使用，自动处理 pending/fulfilled/rejected
dispatch(loginUser({ username, password }));
```

**完整示例：**

```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { userApi, tokenManager } from '@/services';

// 创建异步 thunk
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ username, password }: { username: string; password: string }) => {
    const response = await userApi.login(username, password);
    await tokenManager.setToken(response.token);
    return response.user;
  },
);

// 在组件中使用
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/store/slices/userSlice';

function LoginScreen() {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.user);

  const handleLogin = () => {
    // 一个 dispatch 调用，自动处理所有状态
    dispatch(loginUser({ username: 'user', password: 'pass' }));
  };

  return (
    <View>
      {loading && <Text>登录中...</Text>}
      {error && <Text>错误: {error}</Text>}
      {isAuthenticated && <Text>登录成功！</Text>}
      <Button onPress={handleLogin} title="登录" />
    </View>
  );
}
```

**在 Redux Slice 中处理异步 thunk：**

```typescript
import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './thunks'; // 导入异步 thunk

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, loading: false, error: null },
  reducers: {
    // 同步 actions...
  },
  extraReducers: builder => {
    // 处理异步 thunk 的三种状态
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
```

## 配置说明

### 修改 API 基础 URL

编辑 `src/services/api.ts` 文件中的 `BASE_URL` 常量：

```typescript
const BASE_URL = __DEV__
  ? 'http://your-dev-api.com/api' // 开发环境
  : 'https://your-prod-api.com/api'; // 生产环境
```

### 自定义拦截器

可以在 `api.ts` 中修改请求和响应拦截器，添加自定义逻辑：

- 请求拦截器：添加通用请求头、处理 token 等
- 响应拦截器：统一处理响应数据格式、错误处理等

## 错误处理

API 会自动处理以下错误：

- **401**: 未授权，自动清除 token
- **403**: 权限不足
- **404**: 资源不存在
- **500**: 服务器错误
- **网络错误**: 连接失败

所有错误都会返回一个 Error 对象，可以通过 `error.message` 获取错误信息。

## 注意事项

1. 所有 API 请求都是异步的，记得使用 `async/await` 或 `.then()`
2. 建议使用 try-catch 包裹 API 调用以处理错误
3. Token 会自动从 AsyncStorage 读取并添加到请求头
4. 401 错误会自动清除 token，你可能需要处理登录跳转逻辑
