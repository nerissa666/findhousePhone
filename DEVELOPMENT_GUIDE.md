# React Native 开发指南

## ✅ 应用已成功启动！

看到 `success Successfully launched the app` 表示应用已经成功安装并启动。

## 🎯 接下来做什么

### 1. 查看应用界面

应用现在应该显示在 iPhone 16 Pro 模拟器上。你应该能看到：

- React Native 的欢迎界面
- 显示 "App.tsx" 模板内容
- 底部有开发提示信息

### 2. 开发模式功能

#### 热重载（Hot Reload）

- 修改代码后，应用会自动刷新
- 保存文件（Cmd + S）后，模拟器会自动更新

#### 开发者菜单

在模拟器中按 `Cmd + D` 或 `Cmd + Ctrl + Z` 打开开发者菜单，可以：

- **Reload** - 重新加载应用
- **Debug** - 开启调试模式
- **Show Inspector** - 显示元素检查器
- **Enable Fast Refresh** - 启用快速刷新
- **Show Perf Monitor** - 显示性能监控

#### 摇一摇手势

在模拟器中：`Device` → `Shake` 或按 `Cmd + Ctrl + Z` 打开开发者菜单

### 3. 开始开发

#### 修改代码

编辑 `App.tsx` 文件，保存后应用会自动更新：

```typescript
// App.tsx
import { Text, View } from 'react-native';

function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>你好，React Native！</Text>
    </View>
  );
}

export default App;
```

#### 添加新组件

创建新文件，例如 `src/components/HomeScreen.tsx`：

```typescript
import { View, Text, StyleSheet } from 'react-native';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>首页</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

### 4. 常用开发命令

#### 启动 Metro Bundler

```bash
cd /Users/xgx/Desktop/project/findhousePhone
npm start
# 或
pnpm start
```

#### 运行 iOS 应用

```bash
npm run ios
# 或
pnpm ios
```

#### 运行 Android 应用

```bash
npm run android
# 或
pnpm android
```

#### 清理缓存

如果遇到问题，可以清理缓存：

```bash
# 清理 Metro bundler 缓存
npm start -- --reset-cache

# 清理 iOS 构建缓存
cd ios
xcodebuild clean -workspace findhousePhone.xcworkspace -scheme findhousePhone

# 清理所有缓存
rm -rf node_modules
npm install
cd ios
pod install
```

### 5. 调试技巧

#### 查看日志

- 在终端中运行 `npm start` 的窗口可以看到所有日志
- 在 Xcode 中：`View` → `Debug Area` → `Show Debug Area` 查看原生日志

#### React DevTools

安装 React DevTools 进行调试：

```bash
npm install -g react-devtools
react-devtools
```

#### 断点调试

1. 在 Xcode 中打开 `findhousePhone.xcworkspace`
2. 在代码中设置断点
3. 运行应用，断点会自动触发

### 6. 项目结构

```
findhousePhone/
├── App.tsx              # 主应用入口
├── src/                 # 源代码目录（建议创建）
│   ├── components/      # 组件
│   ├── screens/         # 页面
│   ├── navigation/      # 导航配置
│   ├── services/        # API 服务
│   └── utils/           # 工具函数
├── ios/                 # iOS 原生代码
├── android/             # Android 原生代码
├── package.json         # 依赖配置
└── tsconfig.json        # TypeScript 配置
```

### 7. 添加依赖

#### 安装 npm 包

```bash
npm install <package-name>
# 或
pnpm add <package-name>
```

#### 安装需要原生代码的包

某些包需要额外的原生配置：

```bash
# 安装包
npm install <package-name>

# iOS：重新安装 CocoaPods 依赖
cd ios
pod install
cd ..

# Android：通常会自动链接，但有时需要手动配置
```

### 8. 性能优化

#### 启用 Hermes 引擎

Hermes 是 React Native 的 JavaScript 引擎，已默认启用，提供更好的性能。

#### 使用 Fast Refresh

确保 `Fast Refresh` 已启用（默认开启），可以快速看到代码更改。

### 9. 常见问题

#### 问题 1：应用不更新

```bash
# 重新加载
# 在模拟器中按 Cmd + D，选择 "Reload"
# 或重启 Metro bundler
npm start -- --reset-cache
```

#### 问题 2：红屏错误

- 查看错误信息
- 检查代码语法
- 查看 Metro bundler 终端的详细错误

#### 问题 3：原生模块错误

```bash
# 重新安装依赖
cd ios
pod install
cd ..
npm start -- --reset-cache
```

#### 问题 4：构建失败

```bash
# 清理构建
cd ios
xcodebuild clean -workspace findhousePhone.xcworkspace -scheme findhousePhone
pod install
cd ..
```

### 10. 导航设置（React Navigation）

#### 安装依赖

React Navigation 已经安装并配置完成。如果需要在其他项目中安装，使用以下命令：

```bash
# 安装核心包
npm install @react-navigation/native @react-navigation/native-stack

# 安装原生依赖
npm install react-native-screens react-native-safe-area-context

# iOS：安装 CocoaPods 依赖
cd ios
pod install
cd ..
```

#### 项目结构

导航相关的文件已创建在以下位置：

```
src/
├── navigation/
│   └── AppNavigator.tsx    # 导航配置（Stack Navigator）
└── screens/
    ├── HomeScreen.tsx       # 首页
    └── DetailsScreen.tsx    # 详情页
```

#### 使用导航

**在页面中导航：**

```typescript
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ navigation }: HomeScreenProps) {
  // 导航到详情页
  navigation.navigate('Details', {
    itemId: 1,
    title: '项目详情',
  });

  // 返回上一页
  navigation.goBack();

  // 返回首页
  navigation.navigate('Home');
}
```

**添加新页面：**

1. 在 `src/screens/` 创建新页面组件
2. 在 `src/navigation/AppNavigator.tsx` 中添加路由：

```typescript
// 1. 导入新页面
import { NewScreen } from '../screens/NewScreen';

// 2. 在 RootStackParamList 中添加类型
export type RootStackParamList = {
  Home: undefined;
  Details: { itemId: number; title?: string };
  NewScreen: { param1: string }; // 新页面参数类型
};

// 3. 在 Stack.Navigator 中添加 Screen
<Stack.Screen
  name="NewScreen"
  component={NewScreen}
  options={{ title: '新页面' }}
/>;
```

#### 导航类型

- **Stack Navigator**：堆栈导航（已配置），适合页面层级导航
- **Tab Navigator**：标签导航，适合底部/顶部标签栏
- **Drawer Navigator**：抽屉导航，适合侧边栏菜单

#### 更多资源

- [React Navigation 官方文档](https://reactnavigation.org/)
- [React Navigation 中文文档](https://reactnavigation.org/docs/getting-started)

### 11. 状态管理（Redux Toolkit）

#### 安装依赖

Redux Toolkit 已经安装并配置完成。如果需要在其他项目中安装，使用以下命令：

```bash
# 安装 Redux Toolkit 和 React Redux
npm install @reduxjs/toolkit react-redux
```

#### 项目结构

Redux 相关的文件已创建在以下位置：

```
src/
├── store/
│   ├── store.ts              # Redux store 配置
│   ├── hooks.ts              # 类型安全的 Redux hooks
│   └── slices/
│       ├── counterSlice.ts   # 计数器示例 slice
│       └── userSlice.ts      # 用户状态 slice
└── components/
    └── CounterExample.tsx    # Redux 使用示例组件
```

#### 使用 Redux

**在组件中读取状态：**

```typescript
import { useAppSelector } from '../store/hooks';

function MyComponent() {
  // 获取计数器值
  const count = useAppSelector(state => state.counter.value);

  // 获取用户信息
  const user = useAppSelector(state => state.user.user);
  const isAuthenticated = useAppSelector(state => state.user.isAuthenticated);

  return <Text>计数: {count}</Text>;
}
```

**在组件中派发 actions：**

```typescript
import { useAppDispatch } from '../store/hooks';
import { increment, decrement, setUser } from '../store/slices/counterSlice';

function MyComponent() {
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleSetUser = () => {
    dispatch(
      setUser({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      }),
    );
  };

  return (
    <TouchableOpacity onPress={handleIncrement}>
      <Text>增加</Text>
    </TouchableOpacity>
  );
}
```

#### 创建新的 Slice

1. 在 `src/store/slices/` 创建新的 slice 文件：

```typescript
// src/store/slices/todoSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: Date.now().toString(),
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(t => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { addTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
```

2. 在 `src/store/store.ts` 中注册 reducer：

```typescript
import todoReducer from './slices/todoSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    todos: todoReducer, // 添加新的 reducer
  },
});
```

#### Redux 最佳实践

1. **使用 Redux Toolkit**：简化 Redux 代码，减少样板代码
2. **类型安全**：使用 `useAppSelector` 和 `useAppDispatch` 替代原生的 hooks
3. **Slice 组织**：按功能模块组织 slice，保持代码清晰
4. **异步操作**：使用 `createAsyncThunk` 处理异步操作（API 调用等）

#### 异步操作示例

```typescript
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// 创建异步 thunk
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string) => {
    const response = await fetch(`/api/users/${userId}`);
    return response.json();
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
```

#### 更多资源

- [Redux Toolkit 官方文档](https://redux-toolkit.js.org/)
- [React Redux 文档](https://react-redux.js.org/)
- [Redux 中文文档](https://cn.redux.js.org/)

### 12. UI 组件库（NativeBase）

#### 安装依赖

NativeBase 已经安装并配置完成。如果需要在其他项目中安装，使用以下命令：

```bash
# 安装 NativeBase 和依赖
npm install native-base react-native-svg --legacy-peer-deps

# iOS：安装 CocoaPods 依赖
cd ios
pod install
cd ..
```

**注意**：由于依赖冲突，需要使用 `--legacy-peer-deps` 标志。

#### 项目结构

NativeBase 相关的文件已创建在以下位置：

```
src/
└── components/
    └── NativeBaseExample.tsx    # NativeBase 使用示例组件
```

#### 使用 NativeBase

**基本组件示例：**

```typescript
import { Box, Text, Button, VStack, HStack } from 'native-base';

function MyComponent() {
  return (
    <Box p={4} bg="white" borderRadius="md">
      <VStack space={4}>
        <Text fontSize="lg" fontWeight="bold">
          标题
        </Text>
        <Button colorScheme="primary">点击我</Button>
      </VStack>
    </Box>
  );
}
```

#### 常用组件

**布局组件：**

```typescript
import { Box, VStack, HStack, Center, Flex } from 'native-base';

// Box - 基础容器
<Box p={4} bg="primary.100" borderRadius="md">
  内容
</Box>

// VStack - 垂直布局
<VStack space={4}>
  <Text>项目 1</Text>
  <Text>项目 2</Text>
</VStack>

// HStack - 水平布局
<HStack space={2}>
  <Button>按钮 1</Button>
  <Button>按钮 2</Button>
</HStack>
```

**表单组件：**

```typescript
import { Input, FormControl, TextArea, Select, Checkbox } from 'native-base';

<FormControl>
  <FormControl.Label>用户名</FormControl.Label>
  <Input placeholder="请输入用户名" />
  <FormControl.HelperText>请输入您的用户名</FormControl.HelperText>
  <FormControl.ErrorMessage>用户名不能为空</FormControl.ErrorMessage>
</FormControl>;
```

**按钮组件：**

```typescript
import { Button, IconButton } from 'native-base';

// 基础按钮
<Button colorScheme="primary" size="lg">
  主要按钮
</Button>

// 不同变体
<Button variant="outline">轮廓按钮</Button>
<Button variant="ghost">幽灵按钮</Button>
<Button variant="link">链接按钮</Button>

// 不同颜色方案
<Button colorScheme="success">成功</Button>
<Button colorScheme="error">错误</Button>
<Button colorScheme="warning">警告</Button>
```

**文本组件：**

```typescript
import { Text, Heading } from 'native-base';

<Heading size="xl">大标题</Heading>
<Heading size="lg">中标题</Heading>
<Text fontSize="md">普通文本</Text>
<Text fontSize="sm" color="gray.500">
  小号灰色文本
</Text>
```

**徽章和状态：**

```typescript
import { Badge, Alert, Spinner } from 'native-base';

<Badge colorScheme="success">成功</Badge>
<Badge colorScheme="error">错误</Badge>

<Alert status="info">
  <Alert.Icon />
  <Alert.Title>提示信息</Alert.Title>
</Alert>

<Spinner size="lg" color="primary.500" />
```

#### 主题定制

NativeBase 支持主题定制，可以在 `App.tsx` 中配置：

```typescript
import { NativeBaseProvider, extendTheme } from 'native-base';

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e3f2fd',
      100: '#bbdefb',
      // ... 更多颜色
      900: '#0d47a1',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
});

function App() {
  return (
    <NativeBaseProvider theme={theme}>{/* 应用内容 */}</NativeBaseProvider>
  );
}
```

#### 响应式设计

NativeBase 支持响应式断点：

```typescript
<Box
  width={{
    base: '100%',
    md: '50%',
    lg: '25%',
  }}
>
  响应式宽度
</Box>
```

#### 与 Redux 集成

NativeBase 组件可以与 Redux 状态完美配合：

```typescript
import { useAppSelector } from '../store/hooks';
import { Box, Text, Button } from 'native-base';

function MyComponent() {
  const count = useAppSelector(state => state.counter.value);

  return (
    <Box>
      <Text>计数: {count}</Text>
      <Button onPress={() => dispatch(increment())}>增加</Button>
    </Box>
  );
}
```

#### 更多组件

NativeBase 还提供：

- **Card** - 卡片组件
- **Modal** - 模态框
- **Toast** - 提示消息
- **Drawer** - 抽屉菜单
- **Tabs** - 标签页
- **Avatar** - 头像
- **Image** - 图片
- **Icon** - 图标
- 等等...

#### 更多资源

- [NativeBase 官方文档](https://docs.nativebase.io/)
- [NativeBase 组件库](https://docs.nativebase.io/components)
- [NativeBase 主题定制](https://docs.nativebase.io/customizing-theme)

**注意**：NativeBase v3 已演变为 **gluestack-ui**，这是由 NativeBase 团队推出的更现代化的 UI 组件库。

**什么是 gluestack-ui？**

- NativeBase 的继任者，更现代化、性能更好
- 支持按需加载组件，减少包体积
- 与 Tailwind CSS（NativeWind）深度集成
- 更好的 TypeScript 支持

**如何迁移到 gluestack-ui？**

1. 运行 `npx gluestack-ui init` 自动初始化
2. 或查看 `GLUESTACK_UI_MIGRATION.md` 了解详细迁移步骤

**选择建议：**

- **继续使用 NativeBase**：如果当前功能已满足需求
- **迁移到 gluestack-ui**：如果需要最新功能、更好的性能和 Tailwind 支持

### 13. UI 组件库（Gluestack UI）✅ 已迁移

#### 迁移完成

项目已成功从 NativeBase 迁移到 **Gluestack UI**！

#### 已安装的依赖

- `@gluestack-ui/themed` - Gluestack UI 核心库
- `@gluestack-ui/config` - 主题配置
- `@gluestack-style/react` - 样式系统
- `nativewind` - Tailwind CSS for React Native
- `tailwindcss` - Tailwind CSS

#### 项目结构

```
findhousePhone/
├── App.tsx                    # 已配置 GluestackUIProvider
├── global.css                 # Tailwind CSS 全局样式
├── tailwind.config.js         # Tailwind 配置
├── babel.config.js            # 已添加 NativeWind 插件
└── src/
    └── components/
        └── GluestackExample.tsx  # Gluestack UI 使用示例
```

#### 使用 Gluestack UI

**基本组件：**

```typescript
import { Box, Text, Button, ButtonText, VStack } from '@gluestack-ui/themed';

function MyComponent() {
  return (
    <Box p="$4" bg="$white" borderRadius="$md">
      <VStack space="md">
        <Text size="lg" fontWeight="$bold">
          标题
        </Text>
        <Button action="primary">
          <ButtonText>点击我</ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
```

**使用 Tailwind 类名：**

```typescript
import { Box, Text } from '@gluestack-ui/themed';

function MyComponent() {
  return (
    <Box className="p-4 bg-blue-100 rounded-md">
      <Text className="text-lg font-bold">标题</Text>
    </Box>
  );
}
```

#### 与 Redux 集成

Gluestack UI 组件可以与 Redux 状态完美配合：

```typescript
import { useAppSelector } from '../store/hooks';
import { Box, Text, Button, ButtonText } from '@gluestack-ui/themed';

function MyComponent() {
  const count = useAppSelector(state => state.counter.value);

  return (
    <Box>
      <Text>计数: {count}</Text>
      <Button onPress={() => dispatch(increment())}>
        <ButtonText>增加</ButtonText>
      </Button>
    </Box>
  );
}
```

#### 常用组件

- **Box** - 基础容器
- **Text** - 文本组件
- **Button / ButtonText** - 按钮
- **Input / InputField** - 输入框
- **Card** - 卡片
- **Badge / BadgeText** - 徽章
- **VStack / HStack** - 布局组件
- **Divider** - 分割线
- **Pressable** - 可点击区域

#### 更多资源

- [Gluestack UI 官方文档](https://ui.gluestack.io/)
- [Gluestack UI GitHub](https://github.com/gluestack/gluestack-ui)
- [NativeWind 文档](https://www.nativewind.dev/)

### 14. 下一步建议

1. ✅ **设置导航**：已完成 React Navigation 配置
2. ✅ **状态管理**：已完成 Redux Toolkit 配置
3. ✅ **UI 组件库**：已完成 Gluestack UI 迁移
4. **API 集成**：设置 axios 或 fetch 进行网络请求
5. **类型安全**：充分利用 TypeScript 的类型检查

## 🎉 恭喜！

你的 React Native 应用已经成功运行！现在可以开始开发了。

## 📚 学习资源

- [React Native 官方文档](https://reactnative.dev/)
- [React Native 中文网](https://www.react-native.cn/)
- [Expo 文档](https://docs.expo.dev/)（如果使用 Expo）

## 💡 提示

- 保持 Metro bundler 运行（`npm start`）
- 使用热重载快速开发
- 定期提交代码到 Git
- 测试不同设备和 iOS 版本
