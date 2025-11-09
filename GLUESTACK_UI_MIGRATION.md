# Gluestack UI 迁移指南

## 什么是 Gluestack UI？

**Gluestack UI** 是 NativeBase 的继任者，由 NativeBase 开发团队推出的更现代化的 UI 组件库。

### 主要特点

1. **按需加载**：只安装需要的组件，减少包体积
2. **Tailwind CSS 集成**：与 NativeWind 深度集成，可以使用 Tailwind 类名
3. **更好的 TypeScript 支持**：完整的类型定义
4. **现代化架构**：更灵活、可定制
5. **性能优化**：更好的渲染性能

## 安装 Gluestack UI

### 方法 1：使用 CLI 自动初始化（推荐）

```bash
# 自动检测项目环境并安装依赖
npx gluestack-ui init
```

### 方法 2：手动安装

```bash
# 安装核心依赖
npm install @gluestack-ui/themed @gluestack-style/react nativewind

# 安装 Tailwind CSS（可选但推荐）
npm install --save-dev tailwindcss

# iOS：安装 CocoaPods 依赖
cd ios
pod install
cd ..
```

## 配置步骤

### 1. 初始化 Tailwind CSS（如果使用 NativeWind）

```bash
npx tailwindcss init
```

### 2. 配置 tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### 3. 更新 App.tsx

```typescript
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';

function App() {
  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <SafeAreaProvider>
          <StatusBar />
          <AppNavigator />
        </SafeAreaProvider>
      </GluestackUIProvider>
    </Provider>
  );
}
```

### 4. 安装需要的组件

Gluestack UI 支持按需安装组件：

```bash
# 安装按钮组件
npx gluestack-ui add button

# 安装输入框组件
npx gluestack-ui add input

# 安装卡片组件
npx gluestack-ui add card
```

## 使用示例

### 基本组件使用

```typescript
import { Button, ButtonText } from '@/components/ui/button';
import { Box, Text } from '@gluestack-ui/themed';

function MyComponent() {
  return (
    <Box p="$4" bg="$blue100" borderRadius="$md">
      <Text fontSize="$lg" fontWeight="$bold">
        标题
      </Text>
      <Button>
        <ButtonText>点击我</ButtonText>
      </Button>
    </Box>
  );
}
```

### 使用 Tailwind 类名（如果配置了 NativeWind）

```typescript
import { Box, Text } from '@gluestack-ui/themed';

function MyComponent() {
  return (
    <Box className="p-4 bg-blue-100 rounded-md">
      <Text className="text-lg font-bold">标题</Text>
    </Box>
  );
}
```

## 迁移对比

| 特性          | NativeBase v3    | Gluestack UI     |
| ------------- | ---------------- | ---------------- |
| 维护状态      | 不再积极维护     | 积极维护         |
| 包体积        | 较大（全量加载） | 较小（按需加载） |
| Tailwind 支持 | 不支持           | 完全支持         |
| TypeScript    | 基础支持         | 完整支持         |
| 性能          | 良好             | 更优             |
| 学习曲线      | 简单             | 稍复杂           |

## 迁移建议

1. **新项目**：直接使用 Gluestack UI
2. **现有项目**：
   - 如果 NativeBase 满足需求，可以继续使用
   - 如果需要最新功能和更好的性能，建议迁移

## 更多资源

- [Gluestack UI 官方文档](https://ui.gluestack.io/)
- [Gluestack UI GitHub](https://github.com/gluestack/gluestack-ui)
- [NativeWind 文档](https://www.nativewind.dev/)
