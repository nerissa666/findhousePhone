# CSS 变量使用指南

## ✅ 已定义的 CSS 变量

项目已在 `global.css` 中定义了 CSS 变量，可以在 Tailwind CSS 类名中使用。

## 📝 变量列表

### 主题颜色

```css
--color-primary: #21b97a        /* 主题绿色 */
--color-primary-dark: #1a8f5e   /* 主题绿色（深色） */
--color-primary-light: #4dd4a3  /* 主题绿色（浅色） */
```

### 文本颜色

```css
--color-text-primary: #333     /* 主要文本 */
--color-text-secondary: #666   /* 次要文本 */
--color-text-tertiary: #999     /* 三级文本 */
--color-text-white: #ffffff     /* 白色文本 */
```

### 背景颜色

```css
--color-bg-primary: #ffffff     /* 主要背景 */
--color-bg-secondary: #f5f5f5  /* 次要背景 */
--color-bg-tertiary: #f0f0f0    /* 三级背景 */
```

### 边框颜色

```css
--color-border: #e5e5e5         /* 默认边框 */
--color-border-light: #f0f0f0   /* 浅色边框 */
--color-border-dark: #d1d1d1    /* 深色边框 */
```

### 功能颜色

```css
--color-success: #52c41a        /* 成功 */
--color-warning: #faad14        /* 警告 */
--color-error: #ff4d4f          /* 错误 */
--color-info: #1890ff           /* 信息 */
```

### 间距

```css
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 24px
--spacing-xl: 32px
```

### 圆角

```css
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 16px
--radius-full: 9999px
```

### 字体大小

```css
--font-size-xs: 12px
--font-size-sm: 14px
--font-size-base: 16px
--font-size-lg: 18px
--font-size-xl: 20px
--font-size-2xl: 24px
--font-size-3xl: 30px
```

## 🎯 使用方法

### 方法 1：使用 Tailwind 类名（推荐）

```tsx
import { View, Text } from 'react-native';

export default function MyComponent() {
  return (
    <View className="bg-primary p-md rounded-lg">
      <Text className="text-text-primary text-base">使用主题色和 CSS 变量</Text>
    </View>
  );
}
```

### 方法 2：直接使用 CSS 变量名

```tsx
// 注意：在 React Native 中，CSS 变量需要通过 Tailwind 配置才能使用
// 直接使用 var() 在 className 中可能不工作
```

## 📋 可用的 Tailwind 类名

### 颜色

```tsx
// 主题色
className = 'bg-primary'; // 主题绿色背景
className = 'text-primary'; // 主题绿色文字
className = 'border-primary'; // 主题绿色边框

// 文本颜色
className = 'text-text-primary'; // 主要文本色
className = 'text-text-secondary'; // 次要文本色
className = 'text-text-tertiary'; // 三级文本色

// 背景颜色
className = 'bg-bg-primary'; // 主要背景
className = 'bg-bg-secondary'; // 次要背景

// 功能颜色
className = 'bg-success'; // 成功色
className = 'bg-warning'; // 警告色
className = 'bg-error'; // 错误色
className = 'bg-info'; // 信息色
```

### 间距

```tsx
className = 'p-xs'; // padding: 4px
className = 'p-sm'; // padding: 8px
className = 'p-md'; // padding: 16px
className = 'p-lg'; // padding: 24px
className = 'p-xl'; // padding: 32px

className = 'm-xs'; // margin: 4px
className = 'm-sm'; // margin: 8px
// ... 同样适用于 px-, py-, mx-, my- 等
```

### 圆角

```tsx
className = 'rounded-sm'; // 4px
className = 'rounded-md'; // 8px
className = 'rounded-lg'; // 12px
className = 'rounded-xl'; // 16px
className = 'rounded-full'; // 9999px
```

### 字体大小

```tsx
className = 'text-xs'; // 12px
className = 'text-sm'; // 14px
className = 'text-base'; // 16px
className = 'text-lg'; // 18px
className = 'text-xl'; // 20px
className = 'text-2xl'; // 24px
className = 'text-3xl'; // 30px
```

## 🎨 实际使用示例

### 示例 1：按钮组件

```tsx
<Pressable className="bg-primary px-lg py-md rounded-lg">
  <Text className="text-text-white text-base font-semibold">确认</Text>
</Pressable>
```

### 示例 2：卡片组件

```tsx
<View className="bg-bg-primary p-lg rounded-lg border border-border shadow-md">
  <Text className="text-text-primary text-lg font-bold mb-sm">标题</Text>
  <Text className="text-text-secondary text-base">内容</Text>
</View>
```

### 示例 3：状态提示

```tsx
<View className="bg-success p-md rounded-md">
  <Text className="text-text-white text-sm">操作成功</Text>
</View>
```

## 🔧 自定义 CSS 变量

如果需要添加新的 CSS 变量：

1. 在 `global.css` 中添加变量定义：

```css
:root {
  --color-custom: #ff0000;
}
```

2. 在 `tailwind.config.js` 中添加到 theme.extend：

```javascript
theme: {
  extend: {
    colors: {
      custom: 'var(--color-custom)',
    },
  },
}
```

3. 在代码中使用：

```tsx
<View className="bg-custom">...</View>
```

## ⚠️ 注意事项

1. **React Native 限制**

   - CSS 变量在 React Native 中需要通过 Tailwind 配置才能使用
   - 不能直接在 `style` 属性中使用 `var(--color-primary)`
   - 必须通过 Tailwind 类名使用

2. **变量更新**

   - 修改 CSS 变量后需要重启 Metro bundler
   - 修改 Tailwind 配置后也需要重启

3. **性能**
   - CSS 变量在 NativeWind 中会被编译为实际值
   - 不会影响运行时性能

## 📚 更多信息

- [Tailwind CSS 自定义配置](https://tailwindcss.com/docs/theme)
- [NativeWind 文档](https://www.nativewind.dev/)
