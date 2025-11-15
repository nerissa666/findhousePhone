# 环境变量配置指南

项目使用配置文件方式管理环境变量，避免 Babel 插件兼容性问题。

## 📁 文件说明

- `.env` - 实际环境变量文件（**不要提交到 Git**）
- `.env.example` - 环境变量模板文件（**可以提交到 Git**）

## 🔧 配置的环境变量

在 `.env` 文件中定义：

```env
# API 配置
API_BASE_URL=https://124.71.203.87/findhouseServer
IMAGE_BASE_URL=https://124.71.203.87

# 环境标识
ENV=development
```

## 📝 使用方法

### 在代码中使用环境变量

```typescript
import { API_BASE_URL, IMAGE_BASE_URL, ENV } from '../config/env';

// 使用环境变量
const apiUrl = API_BASE_URL;
const imageUrl = IMAGE_BASE_URL;
```

### 当前使用位置

1. **`src/services/api.ts`** - 使用 `API_BASE_URL` 作为 API 基础地址
2. **`src/components/Carousel.tsx`** - 使用 `IMAGE_BASE_URL` 拼接图片 URL

## ⚙️ 配置说明

### 配置文件位置

环境变量配置在 `src/config/env.ts` 文件中：

```typescript
const ENV_CONFIG = {
  API_BASE_URL: 'https://124.71.203.87/findhouseServer',
  IMAGE_BASE_URL: 'https://124.71.203.87',
  ENV: __DEV__ ? 'development' : 'production',
};
```

### 修改配置

直接编辑 `src/config/env.ts` 文件即可修改环境变量，无需重启 Metro bundler（热重载会自动更新）。

## 🔄 切换环境

### 开发环境

创建 `.env.development`：

```env
API_BASE_URL=http://localhost:3000/api
IMAGE_BASE_URL=http://localhost:3000
ENV=development
```

### 生产环境

创建 `.env.production`：

```env
API_BASE_URL=https://api.production.com
IMAGE_BASE_URL=https://cdn.production.com
ENV=production
```

## ⚠️ 注意事项

1. **不要提交 `.env` 文件到 Git**

   - `.env` 已添加到 `.gitignore`
   - 只提交 `.env.example` 作为模板

2. **修改环境变量后需要重启**

   - 修改 `.env` 文件后，需要重启 Metro bundler

   ```bash
   npm start -- --reset-cache
   ```

3. **iOS 需要重新构建**

   - 修改环境变量后，iOS 应用需要重新构建

   ```bash
   npm run ios
   ```

4. **Android 需要重新构建**
   - 修改环境变量后，Android 应用需要重新构建
   ```bash
   npm run android
   ```

## 🎯 最佳实践

- ✅ 使用 `.env.example` 作为模板，团队成员可以复制创建自己的 `.env`
- ✅ 敏感信息（如 API keys）不要提交到 Git
- ✅ 不同环境使用不同的 `.env` 文件
- ✅ 在 CI/CD 中使用环境变量注入，而不是提交 `.env` 文件

## 📚 相关文件

- `src/config/env.ts` - 环境变量配置文件
- `.env` - 环境变量参考文件（可选，用于文档）
- `.env.example` - 环境变量模板文件
