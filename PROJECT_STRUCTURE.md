# React Native 项目结构说明

## 📁 目录结构概览

```
findhousePhone/
├── src/              # JavaScript/TypeScript 代码（跨平台）
├── ios/              # iOS 原生代码和配置
├── android/          # Android 原生代码和配置
├── App.tsx           # 应用入口
├── package.json      # 依赖管理
└── ...
```

## 🎯 各目录的作用

### 1. `src/` 目录 - JavaScript/TypeScript 代码（跨平台）

**用途**：存放所有 JavaScript/TypeScript 业务代码，这些代码可以在 iOS 和 Android 上共享。

**包含内容**：
```
src/
├── components/       # 可复用组件
├── screens/          # 页面组件
├── navigation/       # 导航配置
├── services/         # API 服务
├── types/            # TypeScript 类型定义
└── utils/            # 工具函数
```

**特点**：
- ✅ **跨平台**：同一份代码在 iOS 和 Android 上运行
- ✅ **业务逻辑**：包含所有应用的核心功能
- ✅ **可维护**：大部分开发工作都在这里

**示例**：
```typescript
// src/components/Button.tsx
import { TouchableOpacity, Text } from 'react-native';

export function Button({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
```

---

### 2. `ios/` 目录 - iOS 原生代码和配置

**用途**：存放 iOS 平台的原生代码、配置文件和构建系统。

**包含内容**：
```
ios/
├── findhousePhone/              # iOS 应用主目录
│   ├── AppDelegate.swift        # 应用入口（Swift）
│   ├── Info.plist              # 应用配置
│   ├── LaunchScreen.storyboard  # 启动画面
│   └── Images.xcassets/        # 图标和图片资源
├── findhousePhone.xcodeproj/   # Xcode 项目文件
├── findhousePhone.xcworkspace/  # Xcode 工作区（包含 CocoaPods）
├── Podfile                      # CocoaPods 依赖配置
├── Podfile.lock                 # 依赖版本锁定
└── Pods/                       # CocoaPods 安装的依赖
```

**主要文件说明**：

#### `AppDelegate.swift` - iOS 应用入口
```swift
// 这是 iOS 应用的入口点
// 负责启动 React Native 和连接原生代码
class AppDelegate: UIResponder, UIApplicationDelegate {
  func application(...) -> Bool {
    // 启动 React Native
    factory.startReactNative(
      withModuleName: "findhousePhone",  // 对应 index.js 中的 AppRegistry
      in: window,
      launchOptions: launchOptions
    )
    return true
  }
}
```

#### `Info.plist` - iOS 应用配置
- 应用名称、版本号
- 权限配置（相机、位置、通知等）
- URL Schemes
- 支持的设备方向

#### `Podfile` - CocoaPods 依赖管理
```ruby
# iOS 原生依赖配置
target 'findhousePhone' do
  use_react_native!
  # 其他原生依赖...
end
```

**什么时候需要修改 `ios/` 目录**：
- 🔧 配置应用权限（相机、位置等）
- 🔧 修改应用图标和启动画面
- 🔧 集成需要原生代码的第三方库
- 🔧 配置推送通知、深度链接等
- 🔧 修改应用名称、Bundle ID
- 🔧 性能优化、原生模块开发

**示例场景**：
```swift
// 需要访问相机时，在 Info.plist 中添加：
// <key>NSCameraUsageDescription</key>
// <string>需要访问相机来拍照</string>

// 在原生代码中实现相机功能
```

---

### 3. `android/` 目录 - Android 原生代码和配置

**用途**：存放 Android 平台的原生代码、配置文件和构建系统。

**包含内容**：
```
android/
├── app/
│   ├── src/main/
│   │   ├── java/com/findhousephone/
│   │   │   ├── MainActivity.kt      # 应用入口（Kotlin）
│   │   │   └── MainApplication.kt    # 应用配置
│   │   ├── AndroidManifest.xml      # 应用配置
│   │   └── res/                     # 资源文件（图标、字符串等）
│   └── build.gradle                 # 应用构建配置
├── build.gradle                     # 项目构建配置
├── gradle/                          # Gradle 构建工具
└── settings.gradle                  # 项目设置
```

**主要文件说明**：

#### `MainActivity.kt` - Android 应用入口
```kotlin
// 这是 Android 应用的入口 Activity
class MainActivity : ReactActivity() {
  // 返回 JavaScript 中注册的主组件名称
  override fun getMainComponentName(): String = "findhousePhone"
}
```

#### `AndroidManifest.xml` - Android 应用配置
```xml
<!-- 应用权限、Activity 配置等 -->
<manifest>
  <uses-permission android:name="android.permission.CAMERA" />
  <application>
    <activity android:name=".MainActivity" />
  </application>
</manifest>
```

#### `build.gradle` - 构建配置
```gradle
// Android 依赖和构建配置
dependencies {
  implementation "com.facebook.react:react-native"
  // 其他依赖...
}
```

**什么时候需要修改 `android/` 目录**：
- 🔧 配置应用权限
- 🔧 修改应用图标和启动画面
- 🔧 集成需要原生代码的第三方库
- 🔧 配置推送通知、深度链接等
- 🔧 修改应用名称、包名
- 🔧 性能优化、原生模块开发

---

## 🔗 它们之间的关系

### React Native 架构

```
┌─────────────────────────────────────────┐
│         JavaScript 层 (src/)            │
│  - 业务逻辑、UI 组件、状态管理          │
│  - 跨平台代码，iOS 和 Android 共享     │
└─────────────────────────────────────────┘
                    ↕
         React Native Bridge (桥接层)
                    ↕
┌─────────────────────────────────────────┐
│         Native 层                          │
│  ┌──────────────┐    ┌──────────────┐    │
│  │   iOS 原生   │    │ Android 原生 │    │
│  │  (ios/)      │    │  (android/)  │    │
│  │  - Swift     │    │  - Kotlin    │    │
│  │  - Objective-C│   │  - Java     │    │
│  └──────────────┘    └──────────────┘    │
└─────────────────────────────────────────┘
```

### 工作流程

1. **开发阶段**：
   - 主要在 `src/` 目录编写 JavaScript/TypeScript 代码
   - 代码通过 Metro bundler 打包
   - 通过 React Native Bridge 与原生代码通信

2. **构建阶段**：
   - iOS：使用 Xcode 编译 `ios/` 目录中的原生代码
   - Android：使用 Gradle 编译 `android/` 目录中的原生代码
   - JavaScript 代码被打包成 bundle，嵌入到原生应用中

3. **运行阶段**：
   - 原生应用启动（`AppDelegate.swift` 或 `MainActivity.kt`）
   - 加载 JavaScript bundle
   - 渲染 React Native 组件

---

## 📝 实际开发中的分工

### 90% 的开发工作：`src/` 目录

大部分时间你只需要在 `src/` 目录工作：

```typescript
// src/screens/HomeScreen.tsx
import { View, Text } from 'react-native';
import { Button } from '../components/Button';

export function HomeScreen() {
  return (
    <View>
      <Text>首页</Text>
      <Button title="点击" onPress={() => {}} />
    </View>
  );
}
```

### 10% 的开发工作：原生目录

只在需要时修改 `ios/` 或 `android/`：

#### 场景 1：配置权限
```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.CAMERA" />
```

```xml
<!-- ios/findhousePhone/Info.plist -->
<key>NSCameraUsageDescription</key>
<string>需要访问相机</string>
```

#### 场景 2：集成原生库
```bash
# 安装需要原生代码的库
npm install react-native-camera

# iOS：自动运行 pod install
cd ios && pod install

# Android：通常自动配置，有时需要手动配置
```

#### 场景 3：修改应用配置
```swift
// ios/findhousePhone/Info.plist
// 修改应用名称、版本号等
```

```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<!-- 修改应用名称、包名等 -->
```

---

## 🎯 总结

| 目录 | 用途 | 语言 | 修改频率 | 开发者需要 |
|------|------|------|----------|-----------|
| `src/` | 业务逻辑、UI | JavaScript/TypeScript | 经常 | ✅ 必须熟悉 |
| `ios/` | iOS 原生代码 | Swift/Objective-C | 偶尔 | ⚠️ 需要时了解 |
| `android/` | Android 原生代码 | Kotlin/Java | 偶尔 | ⚠️ 需要时了解 |

### 关键点

1. **`src/` 是主要工作区域**
   - 90% 的开发时间在这里
   - 跨平台代码，一次编写，两个平台运行

2. **`ios/` 和 `android/` 是原生层**
   - 只在需要原生功能时修改
   - 配置权限、集成原生库、修改应用配置等

3. **React Native Bridge 连接两者**
   - JavaScript 代码通过 Bridge 调用原生功能
   - 原生代码通过 Bridge 通知 JavaScript

4. **大部分情况下不需要修改原生代码**
   - React Native 提供了丰富的跨平台 API
   - 只有在需要特定平台功能时才需要原生代码

---

## 💡 实际例子

### 例子 1：显示一个按钮（只需要 `src/`）

```typescript
// src/components/Button.tsx
// 这个组件在 iOS 和 Android 上都能正常工作
// 不需要修改 ios/ 或 android/
```

### 例子 2：访问相机（需要原生配置）

```typescript
// src/screens/CameraScreen.tsx
import { Camera } from 'react-native-camera';

// 但需要在原生层配置权限：
// ios/findhousePhone/Info.plist - 添加相机权限
// android/app/src/main/AndroidManifest.xml - 添加相机权限
```

### 例子 3：修改应用图标（需要原生配置）

```
// 需要替换：
// ios/findhousePhone/Images.xcassets/AppIcon.appiconset/
// android/app/src/main/res/mipmap-*/ic_launcher.png
```

---

## 🚀 最佳实践

1. **优先使用跨平台方案**
   - 尽量在 `src/` 中实现功能
   - 避免不必要的原生代码

2. **原生代码最小化**
   - 只在必要时修改 `ios/` 或 `android/`
   - 使用 React Native 社区提供的库

3. **保持原生代码同步**
   - 如果修改了 iOS 配置，记得检查 Android 是否也需要
   - 保持两个平台的功能一致性

4. **版本控制**
   - `ios/` 和 `android/` 目录都应该提交到 Git
   - 但 `ios/Pods/` 和 `android/app/build/` 应该忽略

---

## 📚 参考

- [React Native 官方文档 - 项目结构](https://reactnative.dev/docs/environment-setup)
- [React Native 架构](https://reactnative.dev/docs/architecture-overview)
- [原生模块开发](https://reactnative.dev/docs/native-modules-intro)

