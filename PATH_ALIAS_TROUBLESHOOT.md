# 路径别名故障排除指南

## 当前问题

Metro bundler 无法解析 `@/screens/HomeScreen` 路径别名

## 已尝试的解决方案

1. ✅ 安装了 `babel-plugin-module-resolver`
2. ✅ 配置了 `babel.config.js`
3. ✅ 配置了 `tsconfig.json`
4. ✅ 更新了 `metro.config.js`
5. ✅ 确认文件存在

## 最新配置

### babel.config.js

```javascript
module.exports = {
  presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
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
  ],
};
```

## 必须执行的步骤

### 1. 完全停止 Metro bundler

- 确保没有任何 Metro 进程在运行
- 检查所有终端窗口

### 2. 清除所有缓存

```bash
cd /Users/xgx/Desktop/project/findhousePhone

# 清除 Metro 缓存
rm -rf node_modules/.cache
rm -rf /tmp/metro-*
rm -rf /tmp/haste-*

# 清除 watchman（如果安装了）
watchman watch-del-all

# 清除 React Native 缓存
rm -rf $TMPDIR/react-*
rm -rf $TMPDIR/metro-*
```

### 3. 重新安装依赖（可选但推荐）

```bash
# 删除 node_modules
rm -rf node_modules

# 重新安装
pnpm install
```

### 4. 重启 Metro

```bash
pnpm start -- --reset-cache
```

### 5. 在另一个终端运行应用

```bash
# iOS
pnpm run ios

# Android
pnpm run android
```

## 如果仍然不工作

### 方案 A：临时使用相对路径

如果急需运行应用，可以临时改回相对路径：

```tsx
import HomeScreen from '../screens/HomeScreen';
```

### 方案 B：检查是否有其他 Babel 配置

```bash
# 检查是否有其他配置文件
ls -la | grep babel
ls -la | grep .babelrc
```

### 方案 C：验证 Babel 配置

```bash
# 检查 Babel 是否能正确加载配置
node -e "console.log(require('./babel.config.js'))"
```

### 方案 D：检查文件权限

```bash
ls -la src/screens/HomeScreen.tsx
# 确保文件可读
```

## 常见问题

### Q: 为什么配置看起来正确但还是不工作？

A: Metro bundler 的缓存非常顽固，需要完全清除所有缓存

### Q: 是否需要配置 Metro 的 resolver？

A: 通常不需要，Babel 的 module-resolver 插件应该足够。但如果需要，可以在 metro.config.js 中添加。

### Q: 插件顺序重要吗？

A: 是的，`module-resolver` 应该在其他插件之前，但在 presets 之后。

## 验证配置是否生效

创建一个测试文件来验证：

```tsx
// test-import.tsx
import HomeScreen from '@/screens/HomeScreen';
console.log('Import successful:', HomeScreen);
```

如果这个文件能正常导入，说明配置生效。
