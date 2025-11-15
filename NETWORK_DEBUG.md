# React Native 网络请求调试指南

## 📱 查看网络请求的方法

### 方法 1: 控制台日志（已配置）✅

项目已配置详细的网络请求日志，在开发环境下会自动打印：

#### 请求日志格式
```
🌐 [API Request] {
  method: 'GET',
  url: '/home/swiper',
  baseURL: 'https://124.71.203.87/findhouseServer',
  fullURL: 'https://124.71.203.87/findhouseServer/home/swiper',
  params: {...},
  data: {...},
  headers: {...}
}
```

#### 响应日志格式
```
✅ [API Response] {
  method: 'GET',
  url: '/home/swiper',
  status: 200,
  statusText: 'OK',
  data: {...},
  headers: {...},
  time: '2024-01-01T12:00:00.000Z'
}
```

#### 错误日志格式
```
❌ [API Error Response] {
  method: 'GET',
  url: '/home/swiper',
  status: 404,
  data: {...}
}
```

**查看方式：**
- 在 Metro bundler 终端窗口查看
- 在 Xcode 控制台查看（iOS）
- 在 Android Studio Logcat 查看（Android）

---

### 方法 2: React Native Debugger

React Native Debugger 是一个强大的调试工具，可以查看网络请求。

#### 安装
```bash
# 使用 Homebrew 安装（macOS）
brew install --cask react-native-debugger

# 或从 GitHub 下载
# https://github.com/jhen0409/react-native-debugger/releases
```

#### 使用步骤
1. 启动 React Native Debugger
2. 在应用中打开开发者菜单（摇一摇设备或按 `Cmd + D`）
3. 选择 "Debug" 或 "Open Debugger"
4. 在 React Native Debugger 中：
   - 打开 **Network** 标签页
   - 查看所有网络请求
   - 可以查看请求详情、响应数据、请求头等

#### 功能特点
- ✅ 查看所有 HTTP 请求
- ✅ 查看请求和响应详情
- ✅ 查看请求时间
- ✅ 过滤和搜索请求
- ✅ 复制请求为 cURL 命令

---

### 方法 3: Flipper（推荐）⭐

Flipper 是 Meta 开发的调试工具，功能强大。

#### 安装
```bash
# macOS
brew install --cask flipper

# 或从官网下载
# https://fbflipper.com/
```

#### 配置项目

1. 安装 Flipper 插件：
```bash
npm install react-native-flipper --save-dev
```

2. 在 `src/services/api.ts` 中添加 Flipper 网络插件：

```typescript
// 在文件顶部添加
import { addPlugin } from 'react-native-flipper';

// 在 axios 实例创建后添加
if (__DEV__) {
  // Flipper 网络插件
  addPlugin({
    getId() {
      return 'Network';
    },
    onConnect(connection) {
      // 请求拦截
      api.interceptors.request.use(
        (config) => {
          connection.send('newRequest', {
            id: Date.now().toString(),
            url: config.url,
            method: config.method,
            headers: config.headers,
            data: config.data,
          });
          return config;
        }
      );

      // 响应拦截
      api.interceptors.response.use(
        (response) => {
          connection.send('newResponse', {
            id: Date.now().toString(),
            status: response.status,
            headers: response.headers,
            data: response.data,
          });
          return response;
        }
      );
    },
    onDisconnect() {},
  });
}
```

#### 使用步骤
1. 启动 Flipper
2. 运行 React Native 应用
3. 在 Flipper 中选择你的设备
4. 打开 **Network** 插件
5. 查看所有网络请求

---

### 方法 4: Chrome DevTools

使用 Chrome DevTools 查看网络请求。

#### 使用步骤
1. 在应用中打开开发者菜单（摇一摇设备或按 `Cmd + D`）
2. 选择 "Debug" 或 "Open Debugger"
3. Chrome 会自动打开调试页面
4. 打开 Chrome DevTools（`Cmd + Option + I`）
5. 切换到 **Network** 标签页
6. 查看所有网络请求

**注意：** 这种方式在 React Native 0.62+ 版本中可能不可用，推荐使用其他方法。

---

### 方法 5: 使用 axios 拦截器（已实现）✅

项目已在 `src/services/api.ts` 中配置了详细的请求/响应拦截器，会自动记录：

- ✅ 请求方法、URL、参数、数据、请求头
- ✅ 响应状态、数据、响应头
- ✅ 错误信息
- ✅ 时间戳

**查看位置：**
- Metro bundler 终端
- Xcode 控制台（iOS）
- Android Studio Logcat（Android）

---

## 🔧 临时禁用日志

如果不想看到日志，可以在 `src/services/api.ts` 中修改：

```typescript
// 将 __DEV__ 改为 false，或添加条件
const ENABLE_NETWORK_LOG = false; // 设置为 false 禁用日志

if (__DEV__ && ENABLE_NETWORK_LOG) {
  console.log('🌐 [API Request]', {...});
}
```

---

## 📊 推荐方案

### 开发阶段
- **首选：** 控制台日志（已配置）✅
- **补充：** React Native Debugger 或 Flipper

### 生产环境
- 自动禁用日志（`__DEV__` 为 `false`）
- 可以添加错误上报服务

---

## 🎯 快速开始

1. **查看控制台日志：**
   ```bash
   # 启动 Metro bundler
   npm start
   
   # 在终端查看日志
   ```

2. **使用 React Native Debugger：**
   ```bash
   # 安装
   brew install --cask react-native-debugger
   
   # 启动应用后，在开发者菜单选择 "Debug"
   ```

3. **使用 Flipper：**
   ```bash
   # 安装
   brew install --cask flipper
   
   # 启动 Flipper，然后运行应用
   ```

---

## 📝 示例输出

### 成功的请求
```
🌐 [API Request] {
  method: 'GET',
  url: '/home/swiper',
  fullURL: 'https://124.71.203.87/findhouseServer/home/swiper',
  headers: { Authorization: 'Bearer xxx' }
}

✅ [API Response] {
  method: 'GET',
  url: '/home/swiper',
  status: 200,
  data: { description: '请求成功', status: 200, body: [...] }
}
```

### 失败的请求
```
🌐 [API Request] {
  method: 'GET',
  url: '/home/swiper',
  fullURL: 'https://124.71.203.87/findhouseServer/home/swiper'
}

❌ [API Error Response] {
  method: 'GET',
  url: '/home/swiper',
  status: 404,
  data: { message: '资源不存在' }
}
```

---

## 🔗 相关资源

- [React Native Debugger](https://github.com/jhen0409/react-native-debugger)
- [Flipper](https://fbflipper.com/)
- [Axios 拦截器文档](https://axios-http.com/docs/interceptors)
- [React Native 调试文档](https://reactnative.dev/docs/debugging)

