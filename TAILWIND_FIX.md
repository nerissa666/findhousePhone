# Tailwind CSS 配置修复指南

## 问题

1. 无法解析 `./global.css` 模块
2. **NativeWind only supports Tailwind CSS v3** 错误

## 已完成的修复

1. ✅ **降级 Tailwind CSS 到 v3.4.18**（NativeWind v4 只支持 Tailwind CSS v3）
2. ✅ 更新了 `metro.config.js`，添加了 CSS 文件扩展名支持
3. ✅ 确认 `global.css` 文件存在于项目根目录
4. ✅ 确认 `App.tsx` 中正确导入了 CSS 文件

## 解决步骤

### 1. 停止当前的 Metro bundler

如果 Metro bundler 正在运行，请先停止它（按 `Ctrl+C` 或 `Cmd+C`）

### 2. 清除所有缓存并重启

```bash
# 清除 Metro 缓存
npm start -- --reset-cache

# 或者使用 yarn
yarn start --reset-cache
```

### 3. 如果问题仍然存在，尝试以下步骤：

#### 选项 A: 完全清除缓存

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

#### 选项 B: 重新安装依赖

```bash
# 删除 node_modules 和锁文件
rm -rf node_modules
rm -rf pnpm-lock.yaml  # 或 yarn.lock / package-lock.json

# 重新安装
pnpm install  # 或 npm install / yarn install

# 重启 Metro
npm start -- --reset-cache
```

#### 选项 C: iOS 特定清理（如果使用 iOS）

```bash
cd ios
rm -rf Pods
rm -rf Podfile.lock
pod install
cd ..

# 然后重启 Metro
npm start -- --reset-cache
```

### 4. 重新运行应用

```bash
# iOS
npm run ios

# Android
npm run android
```

## 验证配置

确保以下文件配置正确：

1. **metro.config.js** - 已更新，包含 CSS 支持
2. **babel.config.js** - 包含 `nativewind/babel` preset
3. **tailwind.config.js** - 包含 `nativewind/preset`
4. **global.css** - 存在于项目根目录
5. **App.tsx** - 导入了 `./global.css`

## 如果问题仍然存在

1. 检查 `global.css` 文件是否在项目根目录（与 `App.tsx` 同级）
2. 检查文件权限：`ls -la global.css`
3. 尝试使用绝对路径导入（不推荐，但可以测试）：
   ```tsx
   import '/Users/xgx/Desktop/project/findhousePhone/global.css';
   ```
4. 检查 NativeWind 版本是否兼容：
   ```bash
   npm list nativewind tailwindcss
   ```

## 版本兼容性说明

**重要：** NativeWind v4 只支持 Tailwind CSS v3，不支持 v4！

- ✅ NativeWind: v4.2.1
- ✅ Tailwind CSS: v3.4.18（已降级）
- ❌ Tailwind CSS v4.x（不兼容）

如果将来需要升级到 Tailwind CSS v4，需要等待 NativeWind 支持，或者考虑使用其他方案。

## 当前配置状态

- ✅ Tailwind CSS 已降级到 v3.4.18
- ✅ Metro 配置已更新
- ✅ CSS 文件扩展名已添加到 sourceExts
- ✅ NativeWind preset 已配置
- ✅ Babel 配置已包含 NativeWind

现在只需要清除缓存并重启即可！
