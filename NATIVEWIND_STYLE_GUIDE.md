# NativeWind 样式使用指南

## ❓ 为什么不能混用 `className` 和 `style`？

### 技术原因

1. **NativeWind 的工作原理**

   - NativeWind 在编译时（通过 Babel）将 `className` 转换为 React Native 的 `style` 对象
   - 当同时使用 `className` 和 `style` 时，NativeWind 需要合并这两个样式源
   - 这个合并过程可能触发底层的工作机制（Worklets），导致初始化错误

2. **Worklets 错误**

   - Worklets 是 React Native Reanimated 等库使用的性能优化机制
   - NativeWind v4 在某些情况下会尝试使用 Worklets 来处理动态样式
   - 当 `className` 和 `style` 混用时，可能会触发 Worklets 初始化，但环境可能未正确配置

3. **样式合并冲突**
   - React Native 的样式合并是浅合并，不是深度合并
   - 如果 `className` 和 `style` 都设置了相同的属性（如 `backgroundColor`），可能会产生冲突

## ✅ 正确的使用方式

### 方式 1：只使用 `className`（推荐）

```tsx
// ✅ 正确：只使用 className
<View className="w-16 h-16 bg-blue-500 rounded-lg" />
```

### 方式 2：只使用 `style`（传统方式）

```tsx
// ✅ 正确：只使用 style
<View
  style={{ width: 64, height: 64, backgroundColor: '#3b82f6', borderRadius: 8 }}
/>
```

### 方式 3：使用 StyleSheet + 动态值

```tsx
// ✅ 正确：使用 StyleSheet 处理动态值
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
});

<View style={[styles.container, { backgroundColor: color.value }]} />;
```

### 方式 4：条件 className（动态样式）

```tsx
// ✅ 正确：使用条件 className
<View
  className={`w-16 h-16 rounded-lg ${
    isActive ? 'bg-green-500' : 'bg-gray-300'
  }`}
/>
```

## ❌ 错误的使用方式

### 错误示例 1：混用 className 和 style

```tsx
// ❌ 错误：可能导致 Worklets 错误
<View
  className="w-16 h-16 rounded-lg"
  style={{ backgroundColor: color.value }}
/>
```

### 错误示例 2：在同一个元素上混用

```tsx
// ❌ 错误：样式冲突
<View
  className="bg-blue-500"
  style={{ backgroundColor: '#ff0000' }} // 会覆盖 className 的 backgroundColor
/>
```

## 🔧 实际解决方案

### 场景：需要动态颜色值

**问题代码：**

```tsx
// ❌ 这样会报错
<View className="w-4 h-4 rounded" style={{ backgroundColor: color.value }} />
```

**解决方案 1：使用 StyleSheet（推荐）**

```tsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  colorIndicator: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
});

<View style={[styles.colorIndicator, { backgroundColor: color.value }]} />;
```

**解决方案 2：完全使用 style**

```tsx
<View
  style={{
    width: 16,
    height: 16,
    borderRadius: 4,
    backgroundColor: color.value,
  }}
/>
```

**解决方案 3：使用 Tailwind 配置动态颜色**

```tsx
// 在 tailwind.config.js 中定义颜色
module.exports = {
  theme: {
    extend: {
      colors: {
        'dynamic-color': 'var(--dynamic-color)', // 需要额外配置
      },
    },
  },
};
```

## 📝 最佳实践

1. **优先使用 `className`**

   - 对于静态样式，优先使用 Tailwind 的 `className`
   - 代码更简洁，性能更好

2. **动态值使用 `style`**

   - 对于运行时动态计算的值（如用户选择的颜色），使用 `style`
   - 但不要同时使用 `className` 和 `style` 在同一个元素上

3. **使用 StyleSheet 处理复杂样式**

   - 对于需要动态值的复杂样式，使用 `StyleSheet.create`
   - 这样可以避免 Worklets 错误

4. **分离静态和动态样式**
   - 静态部分用 `className`
   - 动态部分用 `style`，但放在不同的元素上

```tsx
// ✅ 正确：分离静态和动态
<View className="p-4 rounded-lg">
  <View style={{ backgroundColor: dynamicColor }} />
</View>
```

## 🎯 总结

- **不要**在同一个元素上同时使用 `className` 和 `style`
- **可以**在不同元素上分别使用
- **推荐**使用 `StyleSheet` 处理需要动态值的样式
- **优先**使用 `className` 处理静态样式
