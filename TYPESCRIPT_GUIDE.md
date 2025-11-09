# TypeScript 使用指南

## ✅ 项目已支持 TypeScript！

你的项目已经配置好了 TypeScript，可以直接使用。

## 📋 当前配置

### 已安装的依赖

- ✅ `typescript` - TypeScript 编译器
- ✅ `@types/react` - React 类型定义
- ✅ `@types/react-test-renderer` - 测试类型定义
- ✅ `@react-native/typescript-config` - React Native TypeScript 配置

### 配置文件

- ✅ `tsconfig.json` - TypeScript 配置
- ✅ `App.tsx` - 已经是 TypeScript 文件

## 🚀 如何使用 TypeScript

### 1. 基本类型注解

#### 函数组件

```typescript
import React from 'react';
import { View, Text } from 'react-native';

// 方式 1：使用 React.JSX.Element
function MyComponent(): React.JSX.Element {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}

// 方式 2：使用 React.FC（函数组件）
const MyComponent: React.FC = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

// 方式 3：带 Props 类型
interface MyComponentProps {
  title: string;
  count?: number; // 可选属性
}

function MyComponent({
  title,
  count = 0,
}: MyComponentProps): React.JSX.Element {
  return (
    <View>
      <Text>{title}</Text>
      <Text>Count: {count}</Text>
    </View>
  );
}
```

#### Props 类型定义

```typescript
// 定义 Props 接口
interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

function Button({ title, onPress, disabled = false, style }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={style}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
```

#### State 类型

```typescript
// 使用 useState 的类型推断
const [count, setCount] = useState<number>(0);
const [name, setName] = useState<string>('');
const [user, setUser] = useState<User | null>(null);

// 复杂对象类型
interface User {
  id: number;
  name: string;
  email: string;
}

const [users, setUsers] = useState<User[]>([]);
```

### 2. 创建类型定义文件

#### 创建 `src/types/index.ts`

```typescript
// 用户类型
export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
}

// API 响应类型
export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

// 房屋类型（示例）
export interface House {
  id: number;
  title: string;
  price: number;
  area: number;
  location: string;
  images: string[];
}
```

#### 使用类型

```typescript
import { User, House } from './src/types';

function UserProfile({ user }: { user: User }) {
  return <Text>{user.username}</Text>;
}
```

### 3. 组件 Props 类型

```typescript
import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CardProps {
  title: string;
  description?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}

export function Card({
  title,
  description,
  style,
  titleStyle,
}: CardProps): React.JSX.Element {
  return (
    <View style={[styles.card, style]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {description && <Text>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
```

### 4. Hooks 类型

```typescript
import { useState, useEffect, useCallback } from 'react';

// useState 类型
const [count, setCount] = useState<number>(0);
const [loading, setLoading] = useState<boolean>(false);
const [data, setData] = useState<User[]>([]);

// useEffect 类型（通常不需要显式类型）
useEffect(() => {
  // 自动推断
}, []);

// useCallback 类型
const handlePress = useCallback<(id: number) => void>(id => {
  console.log(id);
}, []);

// useMemo 类型
const memoizedValue = useMemo<number>(() => {
  return expensiveCalculation();
}, [deps]);
```

### 5. 事件处理类型

```typescript
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

// TextInput onChange
const handleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
  const text = e.nativeEvent.text;
  // ...
};

// 或使用更简洁的方式
const handleChangeText = (text: string) => {
  // text 已经是 string 类型
};

// TouchableOpacity onPress
const handlePress = () => {
  // 不需要参数类型
};
```

### 6. 导航类型（如果使用 React Navigation）

```typescript
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Detail: { id: number };
  Profile: { userId: string };
};

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

function HomeScreen({ navigation, route }: HomeScreenProps) {
  // navigation 和 route 都有完整的类型支持
  navigation.navigate('Detail', { id: 123 });
}
```

### 7. API 调用类型

```typescript
// 定义 API 响应类型
interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}

// 使用 fetch
async function login(
  username: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

// 使用 axios（如果安装了）
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
});

interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

async function getUser(id: number): Promise<User> {
  const response = await api.get<ApiResponse<User>>(`/users/${id}`);
  return response.data.data;
}
```

### 8. 样式类型

```typescript
import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';

// 单个样式类型
const containerStyle: ViewStyle = {
  flex: 1,
  padding: 16,
};

// 样式表类型
const styles = StyleSheet.create<{
  container: ViewStyle;
  title: TextStyle;
  image: ImageStyle;
}>({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100,
  },
});
```

## 🔧 TypeScript 配置

### tsconfig.json 说明

```json
{
  "extends": "@react-native/typescript-config",
  "compilerOptions": {
    // 严格模式（可选，但推荐）
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,

    // 其他选项
    "jsx": "react-native",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "ios", "android"]
}
```

## 📝 最佳实践

### 1. 使用接口定义 Props

```typescript
// ✅ 推荐
interface Props {
  title: string;
}

// ❌ 不推荐
function Component(props: any) {}
```

### 2. 使用类型而不是接口（根据场景）

```typescript
// 接口：用于对象形状
interface User {
  name: string;
}

// 类型：用于联合、交叉等
type Status = 'loading' | 'success' | 'error';
type UserWithStatus = User & { status: Status };
```

### 3. 避免使用 `any`

```typescript
// ❌ 避免
function process(data: any) {}

// ✅ 使用具体类型
function process(data: User) {}
function process(data: unknown) {} // 如果类型未知
```

### 4. 使用类型断言（谨慎）

```typescript
// 只在确定类型时使用
const value = data as User;

// 或使用类型守卫
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null && 'name' in obj;
}
```

## 🛠️ 类型检查命令

### 检查类型错误

```bash
# 检查所有 TypeScript 文件
npx tsc --noEmit

# 检查特定文件
npx tsc --noEmit App.tsx

# 在 CI/CD 中使用
npm run type-check
```

### 添加类型检查脚本

在 `package.json` 中添加：

```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch"
  }
}
```

## 📚 常用类型

### React Native 常用类型

```typescript
import {
  ViewStyle, // View 样式
  TextStyle, // Text 样式
  ImageStyle, // Image 样式
  FlexStyle, // Flex 布局样式
} from 'react-native';
```

### React 常用类型

```typescript
import {
  ReactNode, // 子元素类型
  ComponentProps, // 组件 Props 类型
  FC, // 函数组件类型
} from 'react';
```

## 🎯 下一步

1. **添加类型注解**：给现有代码添加类型
2. **创建类型文件**：在 `src/types/` 目录下定义类型
3. **启用严格模式**：在 `tsconfig.json` 中启用 `strict: true`
4. **使用类型检查**：运行 `npx tsc --noEmit` 检查类型错误


## 💡 提示

- TypeScript 会在开发时提供类型提示和错误检查
- 使用 VS Code 等编辑器可以获得更好的类型提示
- 逐步添加类型，不需要一次性完成
- 遇到类型错误时，先理解错误信息，再修复

## 🔗 参考资源

- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [React Native TypeScript](https://reactnative.dev/docs/typescript)
