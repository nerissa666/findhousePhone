# Tailwind CSS 在 React Native 中的使用指南

本项目已配置 **NativeWind v4**，可以在 React Native 中使用 Tailwind CSS 类名。

## 📦 已安装的依赖

- `nativewind` (v4.2.1) - Tailwind CSS for React Native
- `tailwindcss` (v3.4.18) - Tailwind CSS 核心库 ⚠️ **注意：NativeWind v4 只支持 Tailwind CSS v3**
- `react-native-css-interop` (v0.2.1) - CSS 互操作支持

> **版本兼容性说明：** NativeWind v4 目前只支持 Tailwind CSS v3.x，不支持 v4.x。如果安装的是 Tailwind CSS v4，需要降级到 v3。

## ✅ 配置完成

1. ✅ `tailwind.config.js` - 已配置 NativeWind preset
2. ✅ `babel.config.js` - 已添加 NativeWind babel preset
3. ✅ `metro.config.js` - 已配置 CSS 支持
4. ✅ `global.css` - 已创建全局样式文件
5. ✅ `App.tsx` - 已导入全局样式

## 🚀 使用方法

### 方法 1：使用 `className` 属性（推荐）

```tsx
import { View, Text } from 'react-native';

export default function MyComponent() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-blue-500">Hello Tailwind!</Text>
      <View className="mt-4 p-4 bg-gray-100 rounded-lg">
        <Text className="text-gray-700">这是一个卡片</Text>
      </View>
    </View>
  );
}
```

### 方法 2：使用 `styled()` 函数

```tsx
import { styled } from 'nativewind';
import { View, Text } from 'react-native';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function MyComponent() {
  return (
    <StyledView className="flex-1 items-center justify-center">
      <StyledText className="text-xl font-bold">Styled Component</StyledText>
    </StyledView>
  );
}
```

### 方法 3：与 Gluestack UI 结合使用

Gluestack UI 组件也支持 Tailwind 类名：

```tsx
import { Box, Text } from '@gluestack-ui/themed';

export default function MyComponent() {
  return (
    <Box className="p-4 bg-blue-100 rounded-lg">
      <Text className="text-lg font-semibold text-blue-800">
        Gluestack + Tailwind
      </Text>
    </Box>
  );
}
```

## 📝 常用 Tailwind 类名

### 布局 (Layout)

```tsx
// Flexbox
className = 'flex-1'; // flex: 1
className = 'flex-row'; // flexDirection: 'row'
className = 'flex-col'; // flexDirection: 'column'
className = 'items-center'; // alignItems: 'center'
className = 'justify-center'; // justifyContent: 'center'
className = 'justify-between'; // justifyContent: 'space-between'
```

### 间距 (Spacing)

```tsx
className = 'p-4'; // padding: 16px
className = 'px-4'; // paddingHorizontal: 16px
className = 'py-2'; // paddingVertical: 8px
className = 'm-4'; // margin: 16px
className = 'mt-2'; // marginTop: 8px
className = 'mb-4'; // marginBottom: 16px
className = 'mx-auto'; // marginHorizontal: 'auto'
```

### 尺寸 (Sizing)

```tsx
className = 'w-full'; // width: '100%'
className = 'h-screen'; // height: '100%'
className = 'w-64'; // width: 256px
className = 'h-32'; // height: 128px
```

### 颜色 (Colors)

```tsx
className = 'bg-white'; // backgroundColor: '#fff'
className = 'bg-blue-500'; // backgroundColor: '#3b82f6'
className = 'text-gray-800'; // color: '#1f2937'
className = 'text-red-500'; // color: '#ef4444'
className = 'border-gray-300'; // borderColor: '#d1d5db'
```

### 文字 (Typography)

```tsx
className = 'text-sm'; // fontSize: 14px
className = 'text-lg'; // fontSize: 18px
className = 'text-xl'; // fontSize: 20px
className = 'text-2xl'; // fontSize: 24px
className = 'font-bold'; // fontWeight: '700'
className = 'font-semibold'; // fontWeight: '600'
className = 'text-center'; // textAlign: 'center'
```

### 圆角 (Border Radius)

```tsx
className = 'rounded'; // borderRadius: 4px
className = 'rounded-lg'; // borderRadius: 8px
className = 'rounded-xl'; // borderRadius: 12px
className = 'rounded-full'; // borderRadius: 9999px
```

### 阴影 (Shadow)

```tsx
className = 'shadow-sm'; // 小阴影
className = 'shadow'; // 默认阴影
className = 'shadow-lg'; // 大阴影
className = 'shadow-xl'; // 超大阴影
```

### 边框 (Border)

```tsx
className = 'border'; // borderWidth: 1
className = 'border-2'; // borderWidth: 2
className = 'border-gray-300'; // borderColor: '#d1d5db'
className = 'border-t'; // borderTopWidth: 1
className = 'border-b-2'; // borderBottomWidth: 2
```

## ⚠️ 注意事项

### 1. React Native 不支持的功能

以下 Web CSS 功能在 React Native 中**不支持**：

- ❌ `hover:` 伪类
- ❌ `focus:` 伪类
- ❌ `media queries` (响应式设计)
- ❌ CSS Grid
- ❌ `position: fixed`
- ❌ `z-index` (使用 `elevation` 在 Android 上)

### 2. 平台特定样式

```tsx
// 使用条件渲染处理平台差异
import { Platform } from 'react-native';

<View className={Platform.OS === 'ios' ? 'bg-blue-100' : 'bg-blue-200'}>
  {/* 内容 */}
</View>;
```

### 3. 性能优化

- 避免在循环中动态生成类名
- 对于频繁更新的样式，考虑使用 StyleSheet
- 使用 `useMemo` 缓存复杂的类名组合

```tsx
import { useMemo } from 'react';

const dynamicClasses = useMemo(() => {
  return `bg-${color}-500 p-${padding}`;
}, [color, padding]);
```

## 🔧 自定义配置

在 `tailwind.config.js` 中可以扩展主题：

```javascript
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#21b97a',
        secondary: '#ff5199',
      },
      spacing: {
        18: '72px',
        88: '352px',
      },
    },
  },
  plugins: [],
};
```

## 📚 更多资源

- [NativeWind 官方文档](https://www.nativewind.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [React Native 样式文档](https://reactnative.dev/docs/style)

## 🎯 示例组件

查看 `src/components/TailwindExample.tsx` 获取完整的使用示例。
