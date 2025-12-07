# React 组件变量作用域详解

## 📍 变量定义位置的区别

### 1. 组件外面定义的变量（模块级变量）

```tsx
// ✅ 在组件外面定义
const list = [];

export default function HomeScreen() {
  return <View>...</View>;
}
```

**特点：**

- ✅ **只创建一次**：在模块加载时创建，整个应用生命周期只创建一次
- ✅ **所有实例共享**：如果多个组件实例使用同一个模块，它们共享同一个变量
- ✅ **不会在重新渲染时重置**：组件重新渲染时，变量保持之前的值
- ⚠️ **可能导致状态污染**：如果多个组件实例共享，一个组件修改会影响其他组件

### 2. 组件里面定义的变量（函数级变量）

```tsx
export default function HomeScreen() {
  // ✅ 在组件里面定义
  const list2 = [];

  return <View>...</View>;
}
```

**特点：**

- ✅ **每次渲染都重新创建**：组件每次重新渲染时，都会创建新的变量
- ✅ **每个实例独立**：每个组件实例都有自己的变量副本
- ✅ **不会保留之前的值**：重新渲染时，变量会被重置为初始值
- ⚠️ **性能开销**：频繁重新创建可能影响性能（但通常可以忽略）

## 🔍 实际示例对比

### 示例 1：计数器问题

```tsx
// ❌ 错误：组件外面定义，所有实例共享
let count = 0;

export default function Counter() {
  const increment = () => {
    count++; // 所有 Counter 实例共享同一个 count
    console.log(count);
  };

  return <Button onPress={increment}>Count: {count}</Button>;
}

// 如果有两个 Counter 组件，它们会共享 count，导致问题
```

```tsx
// ✅ 正确：使用 useState
export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1); // 每个实例独立
  };

  return <Button onPress={increment}>Count: {count}</Button>;
}
```

### 示例 2：数组/对象操作

```tsx
// ❌ 错误：组件外面定义，会累积数据
const items = [];

export default function TodoList() {
  const addItem = () => {
    items.push('New Item'); // 每次渲染都会添加，不会清空
  };

  return <View>...</View>;
}
```

```tsx
// ✅ 正确：组件里面定义，每次渲染重置
export default function TodoList() {
  const items = []; // 每次渲染都是新数组

  // 但这样也不行，因为每次渲染都会重置
  // 应该使用 useState
  const [items, setItems] = useState([]);

  return <View>...</View>;
}
```

## 📊 对比表格

| 特性             | 组件外面定义          | 组件里面定义        |
| ---------------- | --------------------- | ------------------- |
| **创建时机**     | 模块加载时（一次）    | 每次渲染时          |
| **实例共享**     | ✅ 所有实例共享       | ❌ 每个实例独立     |
| **值保留**       | ✅ 重新渲染后保留     | ❌ 重新渲染后重置   |
| **性能**         | ✅ 更好（只创建一次） | ⚠️ 稍差（每次创建） |
| **状态污染风险** | ⚠️ 高（共享状态）     | ✅ 低（独立状态）   |
| **适用场景**     | 常量、配置、工具函数  | 临时变量、计算值    |

## ✅ 最佳实践

### 1. 组件外面定义（适合）

```tsx
// ✅ 常量配置
const API_URL = 'https://api.example.com';
const MAX_ITEMS = 10;

// ✅ 工具函数
const formatDate = (date: Date) => {
  return date.toLocaleDateString();
};

// ✅ 静态数据（不会改变）
const MENU_ITEMS = [
  { id: 1, name: '首页' },
  { id: 2, name: '找房' },
];

export default function HomeScreen() {
  // 使用 MENU_ITEMS
  return <View>...</View>;
}
```

### 2. 组件里面定义（适合）

```tsx
export default function HomeScreen() {
  // ✅ 临时计算值
  const filteredItems = items.filter(item => item.active);

  // ✅ 基于 props 的计算
  const displayName = props.name || 'Guest';

  // ✅ 临时变量
  const list2 = [];

  return <View>...</View>;
}
```

### 3. 使用 useState（适合需要保持状态的情况）

```tsx
export default function HomeScreen() {
  // ✅ 需要保持状态的数据
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);

  return <View>...</View>;
}
```

### 4. 使用 useMemo/useCallback（适合需要缓存的情况）

```tsx
export default function HomeScreen({ items }) {
  // ✅ 缓存计算结果，避免每次渲染都重新计算
  const filteredItems = useMemo(() => {
    return items.filter(item => item.active);
  }, [items]);

  return <View>...</View>;
}
```

## 🎯 你的代码分析

```tsx
const list = []; // 组件外面定义

export default function HomeScreen(_props: HomeScreenProps): React.JSX.Element {
  const list2 = []; // 组件里面定义

  return (
    <ScrollView style={styles.container}>
      <Carousel />
      <Menu />
      <GroupRent />
      <News />
    </ScrollView>
  );
}
```

**分析：**

1. **`list`（组件外面）**

   - 只创建一次
   - 如果多个 HomeScreen 实例，它们共享同一个 `list`
   - 重新渲染时，`list` 保持之前的值
   - 如果修改 `list`，会影响所有实例

2. **`list2`（组件里面）**
   - 每次渲染都创建新数组
   - 每个 HomeScreen 实例有独立的 `list2`
   - 重新渲染时，`list2` 重置为空数组
   - 修改 `list2` 只影响当前实例

## ⚠️ 常见错误

### 错误 1：在组件外面定义可变状态

```tsx
// ❌ 错误
let count = 0;

export default function Counter() {
  return (
    <Button onPress={() => count++}>
      {count} {/* 不会触发重新渲染！ */}
    </Button>
  );
}
```

### 错误 2：在组件里面定义但期望保持值

```tsx
// ❌ 错误
export default function Counter() {
  let count = 0; // 每次渲染都重置为 0

  return (
    <Button onPress={() => count++}>
      {count} {/* 永远是 0！ */}
    </Button>
  );
}
```

### 正确做法

```tsx
// ✅ 正确
export default function Counter() {
  const [count, setCount] = useState(0);

  return <Button onPress={() => setCount(count + 1)}>{count}</Button>;
}
```

## 📝 总结

- **组件外面**：适合常量、配置、工具函数（不会改变的数据）
- **组件里面**：适合临时变量、计算值（每次渲染需要重新计算的）
- **useState**：适合需要保持状态的数据（需要在渲染之间保持的值）
- **useMemo/useCallback**：适合需要缓存的计算结果（避免重复计算）
