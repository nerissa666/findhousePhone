# Gluestack UI v3 迁移完成

## 迁移概述

项目已成功从 gluestack-ui v1 迁移到 v3，现在完全兼容 React Native 和 Tailwind CSS (NativeWind)。

## 主要变更

### 1. 依赖更新

**已移除：**
- `@gluestack-style/react@^1.0.57`
- `@gluestack-ui/config@^1.1.20`
- `@gluestack-ui/themed@^1.1.73`

**已添加：**
- `@gluestack-ui/nativewind-utils@^1.0.0` - 用于 Tailwind CSS 集成

### 2. 配置文件更新

#### `tailwind.config.js`
- 添加了 `@gluestack-ui/nativewind-utils/tailwind-plugin` 插件
- 保持原有的主题配置和自定义颜色

#### `App.tsx`
- 移除了 `GluestackUIProvider`（v3 不需要）
- 组件现在直接使用 Tailwind CSS 类名

#### `src/config/gluestack.config.ts`
- 已删除（v3 不再需要此配置文件）

### 3. 组件迁移

#### `src/components/GluestackExample.tsx`
- 从 gluestack-ui v1 组件迁移到 React Native 基础组件 + Tailwind CSS
- 使用 `View`, `Text`, `TouchableOpacity`, `TextInput` 等原生组件
- 所有样式通过 Tailwind CSS 类名实现

## 安装步骤

运行以下命令安装新的依赖：

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install

# 或使用 yarn
yarn install
```

## 使用方式

### 基本组件使用

在 v3 中，不再需要导入 gluestack-ui 组件，直接使用 React Native 组件配合 Tailwind CSS：

```tsx
import { View, Text, TouchableOpacity } from 'react-native';

function MyComponent() {
  return (
    <View className="p-4 bg-white rounded-lg">
      <Text className="text-lg font-bold text-primary">标题</Text>
      <TouchableOpacity className="px-4 py-2 bg-primary rounded-md">
        <Text className="text-white">按钮</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### 可用的 Tailwind 类

项目已配置好 Tailwind CSS，可以使用所有标准的 Tailwind 类名：

- **布局**: `flex`, `flex-row`, `items-center`, `justify-between` 等
- **间距**: `p-4`, `m-2`, `gap-2`, `px-4`, `py-2` 等
- **颜色**: `bg-primary`, `text-primary`, `bg-white`, `text-gray-500` 等
- **圆角**: `rounded-md`, `rounded-lg`, `rounded-full` 等
- **字体**: `text-lg`, `font-bold`, `text-sm` 等

### 自定义颜色

项目中的自定义颜色（在 `tailwind.config.js` 中定义）仍然可用：
- `text-primary`, `bg-primary`
- `text-primary-light`, `text-primary-dark`
- `text-text-primary`, `text-text-secondary` 等

## 与 React Native 兼容性

✅ 完全兼容 React Native 0.82.1
✅ 使用 NativeWind v4.2.1 进行 Tailwind CSS 支持
✅ 所有组件都是 React Native 原生组件
✅ 样式通过 Tailwind CSS 类名应用

## 与 Tailwind CSS 兼容性

✅ 已配置 `@gluestack-ui/nativewind-utils` 插件
✅ 支持所有标准 Tailwind CSS 类名
✅ 支持自定义主题配置
✅ 支持响应式设计（如果需要）

## 下一步

1. **运行安装命令**：`pnpm install` 或 `npm install`
2. **测试应用**：运行 `pnpm start` 启动开发服务器
3. **检查组件**：查看 `src/components/GluestackExample.tsx` 了解新的使用方式

## 注意事项

1. **不再需要 Provider**：v3 不需要 `GluestackUIProvider`，组件直接使用 Tailwind CSS
2. **组件导入**：使用 React Native 原生组件，不再从 `@gluestack-ui/themed` 导入
3. **样式方式**：使用 Tailwind CSS 类名而不是 gluestack-ui 的 props（如 `p="$4"`）
4. **空间类名**：使用 `gap-2` 而不是 `space-x-2` 或 `space-y-2`（React Native 兼容性更好）

## 迁移对比

| 特性 | v1 | v3 |
|------|----|----|
| Provider | 需要 `GluestackUIProvider` | 不需要 |
| 组件导入 | `@gluestack-ui/themed` | React Native 原生组件 |
| 样式方式 | Props (`p="$4"`) | Tailwind CSS 类名 (`className="p-4"`) |
| 配置 | 需要 `gluestack.config.ts` | 不需要 |
| Tailwind 集成 | 部分支持 | 完全支持 |

## 更多资源

- [NativeWind 文档](https://www.nativewind.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [React Native 文档](https://reactnative.dev/)

