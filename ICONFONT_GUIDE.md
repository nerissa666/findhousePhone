# React Native 使用 IconFont 指南

## 📋 概述

React Native 中使用 iconfont 需要：

1. 字体文件（.ttf）
2. 将字体链接到原生项目
3. 创建图标组件来使用 Unicode 编码

## 📁 文件结构

你的 iconfont 文件已经放在：

```
src/assets/fonts/
├── iconfont.ttf        # 字体文件
├── iconfont.css        # CSS 文件（包含 Unicode 编码）
└── bed/
    └── iconfont.ttf    # 另一个字体文件
```

## 🔧 配置步骤

### 步骤 1：创建 react-native.config.js

在项目根目录创建 `react-native.config.js`：

```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/'], // 指定字体文件目录
};
```

### 步骤 2：链接字体文件

运行以下命令将字体链接到原生项目：

```bash
npx react-native-asset
```

**注意：** 如果命令不存在，可以手动配置（见下方）。

### 步骤 3：创建图标组件

创建 `src/components/IconFont.tsx` 组件来使用图标。

## 📝 使用方式

### 方式 1：使用 IconFont 组件（推荐）

```typescript
import IconFont from '../components/IconFont';

<IconFont name="edit" size={24} color="#333" />
<IconFont name="message" size={20} color="#6200ee" />
```

### 方式 2：直接使用 Text 组件

```typescript
<Text style={{ fontFamily: 'iconfont', fontSize: 24 }}>
  {'\ue936'} {/* edit 图标的 Unicode */}
</Text>
```

## 🎨 图标映射

从 `iconfont.css` 中提取的图标映射关系：

| CSS 类名           | Unicode  | 说明     |
| ------------------ | -------- | -------- |
| `.icon-edit`       | `\ue936` | 编辑     |
| `.icon-head-bot`   | `\ue937` | 头部底部 |
| `.icon-head-top`   | `\ue938` | 头部顶部 |
| `.icon-Collection` | `\ue939` | 收藏     |
| `.icon-ask`        | `\ue93a` | 询问     |
| `.icon-message`    | `\ue93b` | 消息     |
| `.icon-metro`      | `\ue933` | 地铁     |
| `.icon-report`     | `\ue932` | 报告     |

（完整列表见 `src/components/IconFont.tsx`）

## ⚠️ 注意事项

1. **字体名称**：确保字体名称与 CSS 中的 `font-family` 一致（通常是 `iconfont`）
2. **Unicode 编码**：使用 `\u` 前缀，如 `\ue936`
3. **字体链接**：每次添加新字体后需要重新运行 `npx react-native-asset`
4. **iOS 配置**：确保 `Info.plist` 中包含了字体文件
5. **Android 配置**：字体文件会自动放在 `android/app/src/main/assets/fonts/`

## 🔍 故障排除

### 问题 1：图标显示为方块或问号

**原因：** 字体未正确链接

**解决：**

```bash
# 重新链接字体
npx react-native-asset

# iOS 需要重新构建
cd ios && pod install && cd ..

# 重新启动应用
npm run ios
```

### 问题 2：字体名称不匹配

**检查：**

1. 打开字体文件（.ttf）查看实际字体名称
2. 确保 `fontFamily` 与字体名称一致

### 问题 3：某些图标不显示

**原因：** Unicode 编码可能不正确

**解决：** 检查 `iconfont.css` 中的 `content` 值，确保使用正确的 Unicode

## 📚 相关资源

- [React Native 字体文档](https://github.com/react-native-community/cli/blob/main/docs/assets.md)
- [IconFont 官网](https://www.iconfont.cn/)
