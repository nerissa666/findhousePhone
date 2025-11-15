# 环境变量问题排查

## 问题：Unable to resolve module @env

如果遇到 `@env` 模块无法解析的错误，请按以下步骤操作：

### 1. 清除 Metro 缓存并重启

```bash
# 停止当前的 Metro bundler (Ctrl+C)

# 清除缓存并重启
npm start -- --reset-cache
```

### 2. 确认 Babel 配置

检查 `babel.config.js` 中 `react-native-dotenv` 插件配置：

```javascript
[
  'module:react-native-dotenv',
  {
    moduleName: '@env',
    path: '.env',
    safe: false,
    allowUndefined: true,
  },
];
```

**重要：** 插件必须在 `presets` 之后，但在其他插件之前。

### 3. 确认 .env 文件存在

```bash
# 检查 .env 文件
cat .env
```

应该看到：

```
API_BASE_URL=https://124.71.203.87/findhouseServer
IMAGE_BASE_URL=https://124.71.203.87
ENV=development
```

### 4. 重新构建应用

**iOS:**

```bash
# 清理并重新构建
cd ios
rm -rf build
pod install
cd ..
npm run ios
```

**Android:**

```bash
# 清理并重新构建
cd android
./gradlew clean
cd ..
npm run android
```

### 5. 如果仍然无法解析

可以临时使用直接读取的方式（不推荐，但可以快速验证）：

```typescript
// 临时方案：直接读取 .env 文件内容
const API_BASE_URL = 'https://124.71.203.87/findhouseServer';
```

### 6. 验证 Babel 插件是否工作

创建一个测试文件验证：

```typescript
// test-env.ts
import { API_BASE_URL } from '@env';
console.log('API_BASE_URL:', API_BASE_URL);
```

如果编译后能看到正确的值，说明插件工作正常。

## 常见问题

1. **Metro bundler 缓存问题**

   - 解决：`npm start -- --reset-cache`

2. **Babel 插件顺序问题**

   - 解决：确保 `react-native-dotenv` 在 `presets` 之后

3. **.env 文件路径问题**

   - 解决：确保 `.env` 文件在项目根目录

4. **TypeScript 类型问题**
   - 解决：确保 `src/types/env.d.ts` 文件存在
