# 路径别名配置指南

## ✅ 已配置路径别名

项目已配置 `@` 作为 `src` 目录的别名，可以使用以下方式导入：

```tsx
// ✅ 使用路径别名
import { MenuItem } from '@/types/api';
import { Button } from '@/components/Button';
import { store } from '@/store/store';

// ❌ 不使用别名（相对路径）
import { MenuItem } from '../types/api';
import { Button } from './Button';
import { store } from '../store/store';
```

## 📁 配置详情

### 1. TypeScript 配置 (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

**作用：** 让 TypeScript 识别 `@` 别名，提供类型检查和自动补全

### 2. Babel 配置 (`babel.config.js`)

```javascript
plugins: [
  [
    'module-resolver',
    {
      root: ['./'],
      alias: {
        '@': './src',
      },
      extensions: [
        '.ios.js',
        '.android.js',
        '.js',
        '.jsx',
        '.json',
        '.tsx',
        '.ts',
      ],
    },
  ],
];
```

**作用：** 在编译时将 `@` 路径转换为实际路径

### 3. Metro 配置

Metro 会自动使用 Babel 的配置，无需额外设置。

## 🎯 使用示例

### 示例 1：导入类型

```tsx
// ✅ 使用别名
import { MenuItem, ApiResponse } from '@/types/api';

// ❌ 相对路径
import { MenuItem, ApiResponse } from '../types/api';
```

### 示例 2：导入组件

```tsx
// ✅ 使用别名
import IconFont from '@/components/IconFont';
import Menu from '@/components/Menu';

// ❌ 相对路径
import IconFont from '../components/IconFont';
import Menu from '../components/Menu';
```

### 示例 3：导入工具函数

```tsx
// ✅ 使用别名
import { formatDate } from '@/utils/date';
import { validateEmail } from '@/utils/validation';

// ❌ 相对路径
import { formatDate } from '../../utils/date';
import { validateEmail } from '../../utils/validation';
```

### 示例 4：导入 Redux Store

```tsx
// ✅ 使用别名
import { store } from '@/store/store';
import { useAppSelector } from '@/store/hooks';

// ❌ 相对路径
import { store } from '../store/store';
import { useAppSelector } from '../store/hooks';
```

## 📝 路径映射表

| 别名路径               | 实际路径                     |
| ---------------------- | ---------------------------- |
| `@/types/api`          | `src/types/api.ts`           |
| `@/components/Button`  | `src/components/Button.tsx`  |
| `@/store/store`        | `src/store/store.ts`         |
| `@/utils/date`         | `src/utils/date.ts`          |
| `@/screens/HomeScreen` | `src/screens/HomeScreen.tsx` |

## ⚠️ 注意事项

1. **重启 Metro Bundler**

   - 修改 Babel 配置后，需要重启 Metro bundler：

   ```bash
   npm start -- --reset-cache
   ```

2. **IDE 支持**

   - VS Code 和大多数 IDE 会自动识别 `tsconfig.json` 中的路径配置
   - 如果 IDE 不识别，可能需要重启 IDE

3. **文件扩展名**

   - 导入时可以省略 `.ts`、`.tsx`、`.js`、`.jsx` 扩展名
   - Babel 会自动解析正确的文件

4. **相对路径仍然可用**
   - 路径别名是可选的，相对路径仍然可以正常工作
   - 可以根据项目需要选择使用

## 🔧 故障排除

### 问题 1：TypeScript 报错 "Cannot find module"

**解决方案：**

1. 检查 `tsconfig.json` 中的 `paths` 配置是否正确
2. 重启 TypeScript 服务器（VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"）

### 问题 2：运行时找不到模块

**解决方案：**

1. 检查 `babel.config.js` 中的 `module-resolver` 配置
2. 清除缓存并重启 Metro：
   ```bash
   npm start -- --reset-cache
   ```

### 问题 3：IDE 不识别路径别名

**解决方案：**

1. 确保 `tsconfig.json` 配置正确
2. 重启 IDE
3. 检查 IDE 的 TypeScript 版本设置

## 🎉 优势

使用路径别名的好处：

1. **更清晰的导入路径**

   - 不需要计算相对路径层级（`../../../`）
   - 代码更易读和维护

2. **重构更方便**

   - 移动文件时不需要更新所有导入路径
   - 路径别名保持不变

3. **避免路径错误**

   - 减少因相对路径计算错误导致的导入失败

4. **统一的导入风格**
   - 所有导入都从 `@/` 开始，风格统一

## 📚 更多信息

- [babel-plugin-module-resolver 文档](https://github.com/tleunen/babel-plugin-module-resolver)
- [TypeScript 路径映射文档](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
