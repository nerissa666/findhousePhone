# pod install 完成后的步骤

## ✅ 1. 验证安装是否成功

```bash
cd /Users/xgx/Desktop/project/findhousePhone/ios

# 检查 Podfile.lock 是否存在（表示安装成功）
ls -la Podfile.lock

# 检查 Pods 目录是否已创建
ls -la Pods/ | head -20

# 检查 .xcworkspace 文件是否存在（重要！）
ls -la *.xcworkspace

```

## ✅ 2. 验证 Xcode 工作区

**重要**：React Native 项目必须使用 `.xcworkspace` 文件打开，而不是 `.xcodeproj`！

```bash
# 确认工作区文件存在
ls -la findhousePhone.xcworkspace
```

## ✅ 3. 在 Xcode 中打开项目（可选）

如果你想在 Xcode 中查看或调试：

```bash
# 使用命令行打开 Xcode 工作区
open findhousePhone.xcworkspace
```

**注意**：

- ✅ 使用 `findhousePhone.xcworkspace`（工作区）
- ❌ 不要使用 `findhousePhone.xcodeproj`（项目文件）

## ✅ 4. 运行 iOS 应用

### 方法 1：使用 React Native CLI（推荐）

```bash
# 回到项目根目录
cd /Users/xgx/Desktop/project/findhousePhone

# 启动 Metro bundler（在一个终端窗口）
npm start
# 或
yarn start

# 在另一个终端窗口运行 iOS 应用
npm run ios
# 或
yarn ios
```

### 方法 2：使用 Xcode

1. 打开 `findhousePhone.xcworkspace`（不是 `.xcodeproj`）
2. 选择目标设备（模拟器或真机）
3. 点击运行按钮（▶️）或按 `Cmd + R`

### 方法 3：使用命令行直接运行

```bash
cd /Users/xgx/Desktop/project/findhousePhone

# 运行 iOS 应用（会自动启动 Metro bundler）
npx react-native run-ios

# 或指定模拟器
npx react-native run-ios --simulator="iPhone 15 Pro"
```

## ✅ 5. 检查常见问题

### 问题 1：找不到 .xcworkspace

如果 `pod install` 完成但没有生成 `.xcworkspace`：

```bash
cd /Users/xgx/Desktop/project/findhousePhone/ios
pod install --repo-update
```

### 问题 2：Xcode 构建错误

如果遇到构建错误：

```bash
# 清理构建缓存
cd /Users/xgx/Desktop/project/findhousePhone/ios
xcodebuild clean -workspace findhousePhone.xcworkspace -scheme findhousePhone

# 重新安装依赖
pod deintegrate
pod install
```

### 问题 3：Metro bundler 连接问题

确保 Metro bundler 正在运行：

```bash
cd /Users/xgx/Desktop/project/findhousePhone
npm start -- --reset-cache
```

## ✅ 6. 后续开发流程

### 日常开发

```bash
# 1. 启动 Metro bundler
cd /Users/xgx/Desktop/project/findhousePhone
npm start

# 2. 在另一个终端运行应用
npm run ios
```

### 添加新的原生依赖

如果以后需要添加新的 CocoaPods 依赖：

```bash
cd /Users/xgx/Desktop/project/findhousePhone/ios

# 编辑 Podfile，添加新依赖
# 然后运行
pod install
```

### 更新依赖

```bash
cd /Users/xgx/Desktop/project/findhousePhone/ios

# 更新 CocoaPods 仓库
pod repo update

# 更新项目依赖
pod update
```

## 📝 检查清单

- [ ] `Podfile.lock` 文件已生成
- [ ] `Pods/` 目录存在且包含依赖
- [ ] `findhousePhone.xcworkspace` 文件存在
- [ ] 可以在 Xcode 中打开工作区
- [ ] 应用可以成功构建和运行

## 🎉 完成！

如果以上步骤都成功，你的 React Native iOS 项目就可以正常开发了！
