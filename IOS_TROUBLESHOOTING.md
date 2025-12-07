# iOS 构建问题故障排除

## 问题：每天重新打开都报错 "The sandbox is not in sync with the Podfile.lock"

### 原因分析

这个错误通常发生在以下情况：

1. **CocoaPods 缓存不同步**：Podfile.lock 和实际安装的 pods 不匹配
2. **依赖更新**：某些依赖包被更新或修改
3. **Xcode 缓存问题**：Xcode 的构建缓存与 CocoaPods 不同步
4. **环境变量问题**：编码设置导致 CocoaPods 解析失败

### 快速修复

#### 方法 1：使用自动修复脚本（推荐）

```bash
# 运行自动修复脚本
npm run ios:fix

# 或者直接运行 iOS（会自动修复）
npm run ios
```

#### 方法 2：手动修复

```bash
# 进入 iOS 目录
cd ios

# 设置编码（重要！）
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# 运行 pod install
/opt/homebrew/bin/pod install

# 返回项目根目录
cd ..
```

#### 方法 3：完全清理后重新安装

```bash
# 清理 iOS 构建缓存
cd ios
rm -rf build Pods Podfile.lock
rm -rf ~/Library/Developer/Xcode/DerivedData/*

# 清理 CocoaPods 缓存
pod cache clean --all

# 重新安装
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
/opt/homebrew/bin/pod install

cd ..
```

### 预防措施

1. **每次运行 iOS 前自动修复**：

   - 已配置 `npm run ios` 会自动运行 `ios:fix`
   - 或者手动运行 `npm run ios:pod`

2. **定期清理缓存**：

   ```bash
   # 清理 Xcode 缓存
   rm -rf ~/Library/Developer/Xcode/DerivedData/*

   # 清理 CocoaPods 缓存
   pod cache clean --all
   ```

3. **确保环境变量正确**：
   - 在 `~/.zshrc` 中添加：
     ```bash
     export LANG=en_US.UTF-8
     export LC_ALL=en_US.UTF-8
     ```

### 常见错误

#### 错误 1: "pod: command not found"

**解决：**

```bash
# 使用完整路径
/opt/homebrew/bin/pod install

# 或添加到 PATH
export PATH="/opt/homebrew/bin:$PATH"
```

#### 错误 2: "Unicode Normalization not appropriate for ASCII-8BIT"

**解决：**

```bash
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
pod install
```

#### 错误 3: "No such file or directory - Podfile"

**解决：**

```bash
# 确保在正确的目录
cd ios
pod install
```

### 自动化脚本

已创建 `scripts/fix-ios.sh` 脚本，可以：

- 自动检测 pod 命令位置
- 设置正确的编码环境变量
- 运行 pod install
- 提供清晰的错误提示

### 相关命令

```bash
# 查看 pod 版本
pod --version

# 更新 CocoaPods
sudo gem install cocoapods

# 查看已安装的 pods
pod list

# 更新所有 pods
pod update
```
