# Babel 错误故障排除指南

## 问题描述

React Native 项目一开始运行正常，但过了一段时间后启动时开始报 Babel 错误。

## 常见原因

### 1. **版本冲突**（最常见，特别是使用 pnpm）

`@babel/core` 版本与 `@react-native/babel-preset` 不匹配。例如：

- 错误：`npm error invalid: @babel/core@7.28.5` 与 `@react-native/babel-preset@0.82.1` 冲突
- 原因：`package.json` 中指定的 `@babel/core` 版本与 React Native preset 要求的版本不一致

**快速修复：**

1. **更新 package.json**：将 `@babel/core` 版本更新为 `^7.28.5`，并添加 `pnpm.overrides`
2. **更新 .npmrc**（如果使用 pnpm）：添加 `node-linker=hoisted` 和 `public-hoist-pattern[]=*@react-native*`
3. **清除并重新安装依赖**：
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

### 2. **缓存问题**

Metro bundler 和 Babel 的缓存可能损坏或过期。

### 3. **依赖不一致**

node_modules 可能损坏或版本不匹配。

### 4. **Babel 配置问题**

NativeWind v4 的配置可能需要调整。

## 解决方案（按顺序尝试）

### 方案 0: 修复版本冲突（如果遇到 ELSPROBLEMS 错误）

如果看到类似 `npm error code ELSPROBLEMS` 或 `npm error invalid: @babel/core` 的错误：

**步骤 1：更新 package.json**

```json
{
  "devDependencies": {
    "@babel/core": "^7.28.5" // 确保版本与 @react-native/babel-preset 兼容
  },
  "pnpm": {
    "overrides": {
      "@babel/core": "^7.28.5" // 强制统一版本（仅 pnpm）
    }
  }
}
```

**步骤 2：更新 .npmrc（如果使用 pnpm）**

```
node-linker=hoisted
public-hoist-pattern[]=*babel*
public-hoist-pattern[]=*@babel*
public-hoist-pattern[]=*@react-native*
```

**步骤 3：清除并重新安装**

```bash
# 检查需要的版本
pnpm why @babel/core  # 或 npm why @babel/core

# 清除并重新安装
rm -rf node_modules
rm -rf pnpm-lock.yaml  # 或 package-lock.json / yarn.lock
pnpm install  # 或 npm install / yarn install

# 验证没有错误
npm ls @babel/core

# 清除缓存并重启
pnpm start -- --reset-cache
```

### 方案 1: 清除缓存（推荐首先尝试）

```bash
# 停止当前的 Metro bundler (Ctrl+C)

# 清除 Metro 缓存并重启
npm start -- --reset-cache

# 或者使用 yarn
yarn start --reset-cache

# 或者使用 pnpm
pnpm start --reset-cache
```

### 方案 2: 清除所有缓存和临时文件

```bash
# 清除 Metro 缓存
rm -rf /tmp/metro-*
rm -rf /tmp/haste-*

# 清除 watchman 缓存（如果安装了）
watchman watch-del-all

# 清除 npm/yarn/pnpm 缓存
npm cache clean --force
# 或
yarn cache clean
# 或
pnpm store prune

# 清除 node_modules 并重新安装
rm -rf node_modules
rm -rf package-lock.json  # 或 yarn.lock / pnpm-lock.yaml

# 重新安装依赖
npm install
# 或
yarn install
# 或
pnpm install
```

### 方案 3: 检查并修复 Babel 配置

确保 `babel.config.js` 配置正确：

```javascript
module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    'nativewind/babel', // NativeWind v4 应该放在 presets 中
  ],
  plugins: [],
};
```

**注意：** NativeWind v4 应该放在 `presets` 中，而不是 `plugins` 中。

### 方案 4: 检查依赖版本兼容性

确保所有 Babel 相关依赖版本兼容：

```bash
# 检查 Babel 相关依赖
npm list @babel/core @babel/preset-env @react-native/babel-preset

# 如果发现版本冲突，可以尝试更新
npm update @babel/core @babel/preset-env @react-native/babel-preset
```

### 方案 5: 清理 iOS/Android 构建缓存

**iOS:**

```bash
cd ios
rm -rf build
rm -rf Pods
rm -rf Podfile.lock
pod cache clean --all
pod install
cd ..
```

**Android:**

```bash
cd android
./gradlew clean
rm -rf .gradle
rm -rf build
cd ..
```

### 方案 6: 完全重置项目（最后手段）

```bash
# 1. 清除所有缓存
rm -rf node_modules
rm -rf /tmp/metro-*
rm -rf /tmp/haste-*
watchman watch-del-all 2>/dev/null || true

# 2. 清除 iOS 缓存
cd ios
rm -rf build Pods Podfile.lock
pod cache clean --all
cd ..

# 3. 清除 Android 缓存
cd android
./gradlew clean
rm -rf .gradle build
cd ..

# 4. 重新安装依赖
npm install
# 或 yarn install / pnpm install

# 5. iOS 重新安装 pods
cd ios && pod install && cd ..

# 6. 清除 Metro 缓存并启动
npm start -- --reset-cache
```

## 常见错误类型及解决方案

### 错误 1: "Cannot find module '@babel/core'"

```bash
npm install --save-dev @babel/core
```

### 错误 2: "Plugin/Preset files are not allowed to export objects"

- 检查 `babel.config.js` 格式是否正确
- 确保使用的是 `module.exports` 而不是 `export default`

### 错误 3: "Unknown option: .presets"

- 检查 Babel 配置文件格式
- 确保 presets 和 plugins 是数组格式

### 错误 4: NativeWind 相关错误

- 确保 NativeWind v4 配置在 `presets` 中
- 检查 `tailwind.config.js` 是否存在且配置正确

### 错误 5: "Unable to resolve module @babel/runtime/helpers/..."

**问题：** `@babel/runtime` 无法解析，通常是因为：

- `@babel/runtime` 在 `devDependencies` 中，但应该在 `dependencies` 中（运行时需要）
- 版本不匹配

**解决方案：**

1. **将 `@babel/runtime` 移到 `dependencies`**：

   ```json
   {
     "dependencies": {
       "@babel/runtime": "^7.28.4"
     },
     "devDependencies": {
       // 移除 @babel/runtime
     }
   }
   ```

2. **更新 pnpm overrides**（如果使用 pnpm）：

   ```json
   {
     "pnpm": {
       "overrides": {
         "@babel/runtime": "^7.28.4"
       }
     }
   }
   ```

3. **重新安装并清除缓存**：
   ```bash
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   pnpm start -- --reset-cache
   ```

## 预防措施

1. **定期清理缓存**

   - 每周运行一次 `npm start -- --reset-cache`

2. **锁定依赖版本**

   - 使用 `package-lock.json`、`yarn.lock` 或 `pnpm-lock.yaml`
   - 避免使用 `^` 或 `~` 在关键依赖上

3. **保持依赖更新**

   - 定期更新 React Native 和相关依赖
   - 但要注意版本兼容性

4. **使用 .npmrc 配置**
   - 确保 Babel 相关包被正确提升（hoist）
   - 你的 `.npmrc` 已经配置了：
     ```
     public-hoist-pattern[]=*babel*
     public-hoist-pattern[]=*@babel*
     ```

## 如果问题仍然存在

1. **查看完整错误信息**

   - 复制完整的错误堆栈
   - 检查错误发生在哪个文件

2. **检查 Babel 版本**

   ```bash
   npx babel --version
   ```

3. **创建最小复现示例**

   - 创建一个新的 React Native 项目
   - 逐步添加依赖，找出问题依赖

4. **查看 GitHub Issues**
   - React Native: https://github.com/facebook/react-native/issues
   - NativeWind: https://github.com/marklawlor/nativewind/issues
   - Babel: https://github.com/babel/babel/issues
