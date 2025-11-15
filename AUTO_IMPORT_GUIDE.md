# 自动导入配置指南

项目已配置 `babel-plugin-auto-import`，可以自动导入常用的 React 和 React Native 模块，无需手动编写 import 语句。

## ✅ 已配置的自动导入

### React

- `React` - React 核心库（默认导入）

### React Native 组件

- `View`
- `Text`
- `ScrollView`
- `Image`
- `TouchableOpacity`
- `StyleSheet`
- `SafeAreaView`

### React Hooks

- `useState`
- `useEffect`
- `useCallback`
- `useMemo`
- `useRef`
- `useContext`

## 📝 使用示例

### 之前（需要手动导入）

```typescript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

export default function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Mounted');
  }, []);

  return (
    <View style={styles.container}>
      <Text>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

### 现在（自动导入）

```typescript
// 无需任何导入语句！

export default function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Mounted');
  }, []);

  return (
    <View style={styles.container}>
      <Text>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

## ⚙️ 配置位置

自动导入配置在 `babel.config.js` 中：

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'babel-plugin-auto-import',
      {
        declarations: [
          // React 自动导入
          {
            default: 'React',
            path: 'react',
          },
          // React Native 常用组件
          {
            members: [
              'View',
              'Text',
              'ScrollView',
              'Image',
              'TouchableOpacity',
              'StyleSheet',
              'SafeAreaView',
            ],
            path: 'react-native',
          },
          // React Hooks
          {
            members: [
              'useState',
              'useEffect',
              'useCallback',
              'useMemo',
              'useRef',
              'useContext',
            ],
            path: 'react',
          },
        ],
      },
    ],
  ],
};
```

## 🔧 添加更多自动导入

如果需要添加更多自动导入，编辑 `babel.config.js`：

```javascript
{
  members: ['新组件1', '新组件2'],
  path: 'react-native', // 或其他包路径
}
```

## ⚠️ 重要提示

**当前状态**：`babel-plugin-auto-import` 已安装并配置，但可能需要在某些情况下手动导入以确保代码正常运行。

**推荐做法**：保留导入语句，这样既能通过 TypeScript 类型检查，又能确保运行时正常工作。Babel 插件会处理重复导入，不会造成问题。

## ⚠️ 注意事项

1. **TypeScript 类型检查**：

   - Babel 插件会在编译时自动注入导入语句
   - TypeScript 类型检查器可能仍然会报错（因为它在编译前运行）
   - **解决方案**：已配置 ESLint 全局变量，ESLint 不会报错；TypeScript 类型检查可以通过类型声明文件支持
   - **实际使用**：建议保留导入语句，确保代码稳定运行

2. **ESLint 配置**（已完成）：

   项目已配置 ESLint 支持自动导入的全局变量，配置文件在 `.eslintrc.js`：

   ```javascript
   module.exports = {
     root: true,
     extends: '@react-native',
     globals: {
       // React 自动导入
       React: 'readonly',
       // React Native 组件自动导入
       View: 'readonly',
       Text: 'readonly',
       ScrollView: 'readonly',
       Image: 'readonly',
       TouchableOpacity: 'readonly',
       StyleSheet: 'readonly',
       SafeAreaView: 'readonly',
       // React Hooks 自动导入
       useState: 'readonly',
       useEffect: 'readonly',
       useCallback: 'readonly',
       useMemo: 'readonly',
       useRef: 'readonly',
       useContext: 'readonly',
     },
     rules: {
       // 允许使用未定义的变量（因为 Babel 插件会自动注入）
       'no-undef': 'off',
     },
   };
   ```

   **配置说明**：

   - `globals`：声明全局变量，告诉 ESLint 这些变量是存在的
   - `'readonly'`：表示这些变量是只读的，不能被重新赋值
   - `'no-undef': 'off'`：关闭未定义变量的检查（因为 Babel 会在编译时注入）

3. **TypeScript 类型支持**（已完成）：

   类型声明文件在 `src/types/auto-imports.d.ts`，TypeScript 会自动识别这些全局类型。

4. **重启 Metro**：修改 Babel 配置后需要重启 Metro bundler

   ```bash
   npm start -- --reset-cache
   ```

5. **推荐做法**（TypeScript 项目）：

   ```typescript
   // 方式 1：保留导入（推荐，TypeScript 友好）
   import { View, Text } from 'react-native';
   // Babel 会处理，不会重复导入

   // 方式 2：使用自动导入（需要配置 ESLint）
   // 直接使用，无需导入
   ```

6. **明确导入仍然有效**：如果需要，仍然可以手动导入，不会冲突

## 🎯 最佳实践

- ✅ **使用自动导入**：对于常用的 React Native 组件和 Hooks
- ✅ **手动导入**：对于不常用的组件或第三方库
- ✅ **保持一致性**：在团队中统一使用自动导入，避免混用

## 📚 相关文件

- `babel.config.js` - Babel 配置
- `src/types/auto-imports.d.ts` - TypeScript 类型声明
