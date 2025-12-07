# 路径别名问题修复指南

## 问题

Metro bundler 无法解析 `@/screens/HomeScreen` 路径别名

## 已完成的修复

1. ✅ 更新了 `metro.config.js`，添加了路径别名配置
2. ✅ 确认文件存在：`src/screens/HomeScreen.tsx`

## 解决步骤

### 1. 停止当前的 Metro bundler

如果 Metro bundler 正在运行，请先停止它（按 `Ctrl+C` 或 `Cmd+C`）

### 2. 清除所有缓存并重启

```bash
# 清除 Metro 缓存
npm start -- --reset-cache

# 或者使用 pnpm
pnpm start -- --reset-cache
```

### 3. 如果问题仍然存在，尝试完全清除缓存

```bash
# 清除 Metro 缓存
rm -rf node_modules/.cache
rm -rf /tmp/metro-*
rm -rf /tmp/haste-*

# 清除 watchman（如果安装了）
watchman watch-del-all

# 重新启动
npm start -- --reset-cache
```

### 4. 验证配置

确保以下配置正确：

1. **babel.config.js** - 已配置 `module-resolver` 插件
2. **metro.config.js** - 已添加 `alias` 和 `watchFolders` 配置
3. **tsconfig.json** - 已配置 `paths` 映射

## 当前配置

### metro.config.js

```javascript
const config = {
  resolver: {
    sourceExts: [...defaultConfig.resolver.sourceExts, 'css'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  watchFolders: [path.resolve(__dirname)],
};
```

### babel.config.js

```javascript
plugins: [
  [
    'module-resolver',
    {
      root: ['./'],
      alias: {
        '@': './src',
      },
      extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json', '.tsx', '.ts'],
    },
  ],
],
```

## 如果问题仍然存在

1. 检查 `babel-plugin-module-resolver` 是否已安装：

   ```bash
   pnpm list babel-plugin-module-resolver
   ```

2. 确认文件路径正确：

   ```bash
   ls -la src/screens/HomeScreen.tsx
   ```

3. 尝试使用绝对路径测试：

   ```tsx
   // 临时测试
   import HomeScreen from '/Users/xgx/Desktop/project/findhousePhone/src/screens/HomeScreen';
   ```

4. 检查 Babel 配置是否正确加载：
   - 确保 `babel.config.js` 在项目根目录
   - 确保没有其他 Babel 配置文件覆盖它

## 注意事项

- Metro 的路径别名解析主要依赖 Babel 的 `module-resolver` 插件
- 修改配置后必须清除缓存并重启 Metro
- 确保 `babel-plugin-module-resolver` 已正确安装
