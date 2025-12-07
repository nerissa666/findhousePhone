# React Native 静态资源存放指南

## 📁 静态文件存放位置

React Native **没有**像 Web 开发（Next.js、Create React App）那样的 `public` 文件夹。静态资源的存放方式如下：

### 推荐目录结构

```
findhousePhone/
├── assets/              # 静态资源目录（推荐）
│   ├── images/          # 图片资源
│   │   ├── logo.png
│   │   ├── icons/
│   │   └── backgrounds/
│   ├── fonts/           # 字体文件
│   │   ├── CustomFont.ttf
│   │   └── IconFont.ttf
│   ├── data/            # JSON 等数据文件
│   │   └── config.json
│   └── videos/          # 视频文件（可选）
│
└── src/
    └── assets/          # 或者放在 src 目录下（也可以）
        ├── images/
        └── fonts/
```

### 方式 1：项目根目录的 `assets/` 文件夹（推荐）

**创建目录：**

```bash
mkdir -p assets/images assets/fonts assets/data
```

**使用方式：**

```typescript
// 图片
import logo from '../assets/images/logo.png';
<Image source={logo} />

// 或使用 require
<Image source={require('../assets/images/logo.png')} />

// JSON 数据
import config from '../assets/data/config.json';
```

### 方式 2：放在 `src/assets/` 目录下

**创建目录：**

```bash
mkdir -p src/assets/images src/assets/fonts
```

**使用方式：**

```typescript
import logo from './assets/images/logo.png';
<Image source={logo} />;
```

## 📸 图片资源

### 存放位置

- `assets/images/` 或 `src/assets/images/`

### 使用方式

**方式 1：使用 require（推荐）**

```typescript
<Image source={require('../assets/images/logo.png')} />
```

**方式 2：使用 import**

```typescript
import logo from '../assets/images/logo.png';
<Image source={logo} />;
```

### require vs import 的区别

| 特性         | require                             | import                                 |
| ------------ | ----------------------------------- | -------------------------------------- |
| **语法**     | 函数调用：`require('path')`         | ES6 模块语法：`import ... from 'path'` |
| **位置**     | 可以在函数内、条件语句中使用        | 必须在文件顶部，静态声明               |
| **动态加载** | ✅ 支持（但路径必须是字符串字面量） | ❌ 不支持，必须静态                    |
| **条件加载** | ✅ 可以在 if/switch 中使用          | ❌ 不能在条件语句中使用                |
| **类型检查** | ⚠️ TypeScript 类型推断较弱          | ✅ 更好的 TypeScript 支持              |
| **代码组织** | 可以在使用处就近引用                | 集中在文件顶部，更清晰                 |
| **打包优化** | 相同（都会被打包）                  | 相同（都会被打包）                     |
| **推荐场景** | 动态选择图片、条件加载              | 固定使用的图片、更好的代码组织         |

**详细说明：**

1. **动态加载能力**

   ```typescript
   // ✅ require - 可以在函数中使用
   const getImage = (type: string) => {
     switch (type) {
       case 'home':
         return require('../assets/images/home.png');
       case 'profile':
         return require('../assets/images/profile.png');
       default:
         return require('../assets/images/default.png');
     }
   };

   // ❌ import - 不能在条件语句中使用
   // if (condition) {
   //   import logo from '../assets/images/logo.png'; // 语法错误！
   // }
   ```

2. **路径限制**

   ```typescript
   // ✅ require - 路径必须是字符串字面量
   const image = require('../assets/images/logo.png');

   // ❌ require - 不能使用变量路径
   const path = '../assets/images/logo.png';
   const image = require(path); // 运行时错误！

   // ✅ import - 路径也必须是静态的
   import logo from '../assets/images/logo.png';
   ```

3. **代码组织**

   ```typescript
   // require - 可以在使用处就近引用
   function MyComponent() {
     return <Image source={require('../assets/images/logo.png')} />;
   }

   // import - 集中在文件顶部，更清晰
   import logo from '../assets/images/logo.png';

   function MyComponent() {
     return <Image source={logo} />;
   }
   ```

4. **TypeScript 支持**

   ```typescript
   // require - 需要类型断言或配置
   const logo = require('../assets/images/logo.png') as number;

   // import - 更好的类型推断（需要配置 types/assets.d.ts）
   import logo from '../assets/images/logo.png';
   // logo 的类型会被正确推断
   ```

**推荐使用场景：**

- **使用 require**：当需要根据条件动态选择图片时
- **使用 import**：当图片固定使用，希望代码更清晰、类型更安全时

**方式 3：网络图片（不需要放在本地）**

```typescript
<Image source={{ uri: 'https://example.com/image.png' }} />
```

### 图片命名规范

- 使用小写字母和连字符：`home-icon.png`
- 避免空格和特殊字符
- 支持格式：`.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`

## 🔤 字体文件

### 存放位置

- `assets/fonts/` 或 `src/assets/fonts/`

### 配置方式

**1. 创建 `react-native.config.js`（如果还没有）**

```javascript
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./assets/fonts/'], // 指定字体文件目录
};
```

**2. 链接字体（自动）**

```bash
npx react-native-asset
```

**3. 使用字体**

```typescript
const styles = StyleSheet.create({
  text: {
    fontFamily: 'CustomFont', // 字体文件名（不含扩展名）
    fontSize: 16,
  },
});
```

## 📄 JSON 和其他数据文件

### 存放位置

- `assets/data/` 或 `src/assets/data/`

### 使用方式

```typescript
// 导入 JSON
import config from '../assets/data/config.json';

// 或使用 require
const config = require('../assets/data/config.json');
```

## 🎬 视频文件

### 存放位置

- `assets/videos/` 或 `src/assets/videos/`

### 使用方式

```typescript
import { Video } from 'react-native-video';

<Video source={require('../assets/videos/intro.mp4')} style={styles.video} />;
```

## 📋 最佳实践

### 1. 目录结构建议

```
assets/
├── images/
│   ├── icons/          # 图标
│   ├── logos/          # Logo
│   ├── backgrounds/    # 背景图
│   └── placeholders/   # 占位图
├── fonts/
│   ├── Regular/
│   ├── Bold/
│   └── Light/
└── data/
    └── config.json
```

### 2. 图片优化

- 使用适当的分辨率（@2x, @3x 用于不同屏幕密度）
- iOS 会自动选择：`icon.png`, `icon@2x.png`, `icon@3x.png`
- Android 使用不同文件夹：`drawable-mdpi/`, `drawable-hdpi/`, `drawable-xhdpi/`

### 3. 资源引用路径

**相对路径示例：**

```typescript
// 从 src/components/Button.tsx 引用
import icon from '../../assets/images/icons/home.png';

// 从 src/screens/HomeScreen.tsx 引用
import logo from '../assets/images/logo.png';
```

### 4. 动态加载图片

```typescript
// 根据条件动态加载
const getImage = (name: string) => {
  const images: { [key: string]: any } = {
    home: require('../assets/images/home.png'),
    profile: require('../assets/images/profile.png'),
  };
  return images[name];
};

<Image source={getImage('home')} />;
```

## ⚠️ 注意事项

1. **不要使用绝对路径**：React Native 不支持 `/assets/...` 这样的绝对路径
2. **require 路径必须静态**：`require()` 的参数必须是字符串字面量，不能是变量
3. **图片大小**：大图片会影响应用体积，考虑使用网络图片或压缩
4. **字体文件**：需要运行 `npx react-native-asset` 来链接字体
5. **TypeScript 支持**：可能需要配置类型声明

## 🔧 TypeScript 配置（可选）

如果需要 TypeScript 支持图片导入，创建 `src/types/assets.d.ts`：

```typescript
declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.json' {
  const value: any;
  export default value;
}
```

## 📚 相关资源

- [React Native 图片文档](https://reactnative.dev/docs/images)
- [React Native 字体文档](https://github.com/react-native-community/cli/blob/main/docs/assets.md)
