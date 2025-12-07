# TypeScript 类型推断详解：`Awaited<ReturnType<typeof fetchGroups>>`

## 代码示例

```typescript
const fetchGroups = () => api.get<Group[]>('/home/groups', {
  params: { area: 'AREA|88cff55c-aaa4-e2e0' },
});

const [groupList, setGroupList] = useState<Awaited<ReturnType<typeof fetchGroups>>>([]);
```

## 逐步解析

### 第一步：`typeof fetchGroups`

**作用**：获取 `fetchGroups` 变量的类型（函数类型）

**结果**：
```typescript
typeof fetchGroups
// 推断为：
() => Promise<Group[]>
```

**解释**：
- `fetchGroups` 是一个函数
- `typeof` 操作符获取这个函数的类型签名
- 因为 `api.get<Group[]>` 返回 `Promise<Group[]>`（根据 api.ts 中的定义）
- 所以 `fetchGroups` 的类型是 `() => Promise<Group[]>`

---

### 第二步：`ReturnType<typeof fetchGroups>`

**作用**：提取函数类型的返回类型

**语法**：
```typescript
ReturnType<T> // T 必须是一个函数类型
```

**结果**：
```typescript
ReturnType<typeof fetchGroups>
// = ReturnType<() => Promise<Group[]>>
// 推断为：
Promise<Group[]>
```

**解释**：
- `ReturnType` 是 TypeScript 内置的工具类型
- 它接受一个函数类型，返回该函数的返回类型
- `() => Promise<Group[]>` 的返回类型是 `Promise<Group[]>`
- 所以结果是 `Promise<Group[]>`

---

### 第三步：`Awaited<Promise<Group[]>>`

**作用**：提取 Promise 中的实际类型（"解开" Promise）

**语法**：
```typescript
Awaited<T> // T 可以是 Promise 或嵌套的 Promise
```

**结果**：
```typescript
Awaited<Promise<Group[]>>
// 推断为：
Group[]
```

**解释**：
- `Awaited` 是 TypeScript 4.5+ 引入的工具类型
- 它用于提取 Promise 中的实际值类型
- `Promise<Group[]>` 中的实际类型是 `Group[]`
- 所以最终结果是 `Group[]`

---

## 完整推导过程

```
1. fetchGroups 的定义：
   const fetchGroups = () => api.get<Group[]>(...)
   
2. typeof fetchGroups：
   → () => Promise<Group[]>
   
3. ReturnType<typeof fetchGroups>：
   → ReturnType<() => Promise<Group[]>>
   → Promise<Group[]>
   
4. Awaited<ReturnType<typeof fetchGroups>>：
   → Awaited<Promise<Group[]>>
   → Group[]
   
5. 最终结果：
   useState<Group[]>([])
```

## TypeScript 内置工具类型说明

### 它们是内置的吗？

**是的！** `ReturnType` 和 `Awaited` 都是 **TypeScript 内置的工具类型（Utility Types）**，无需导入即可使用。

- **`ReturnType`**：TypeScript 2.8+ 引入
- **`Awaited`**：TypeScript 4.5+ 引入
- **`typeof`**：TypeScript 原生操作符

### TypeScript 内置工具类型列表

TypeScript 提供了许多内置工具类型，常用的包括：

| 工具类型 | 版本 | 作用 |
|---------|------|------|
| `Partial<T>` | 2.1+ | 将所有属性变为可选 |
| `Required<T>` | 2.8+ | 将所有属性变为必需 |
| `Readonly<T>` | 2.1+ | 将所有属性变为只读 |
| `Pick<T, K>` | 2.1+ | 选择部分属性 |
| `Omit<T, K>` | 3.5+ | 排除部分属性 |
| `Record<K, T>` | 2.1+ | 创建对象类型 |
| `Exclude<T, U>` | 2.8+ | 从类型中排除 |
| `Extract<T, U>` | 2.8+ | 从类型中提取 |
| `NonNullable<T>` | 2.8+ | 排除 null 和 undefined |
| **`ReturnType<T>`** | **2.8+** | **提取函数返回类型** |
| **`Awaited<T>`** | **4.5+** | **提取 Promise 中的类型** |

## 为什么需要这三个工具类型？

### 1. `typeof` - 获取值的类型
```typescript
const num = 42;
type NumType = typeof num; // number

const func = () => "hello";
type FuncType = typeof func; // () => string
```

### 2. `ReturnType` - 提取函数返回类型
```typescript
function getUser() {
  return { name: "John", age: 30 };
}

type User = ReturnType<typeof getUser>;
// User = { name: string; age: number }
```

### 3. `Awaited` - 提取 Promise 中的类型
```typescript
type PromiseString = Promise<string>;
type StringType = Awaited<PromiseString>; // string

type NestedPromise = Promise<Promise<number>>;
type NumberType = Awaited<NestedPromise>; // number
```

## 实际应用场景

### 场景 1：自动推断 API 响应类型
```typescript
// 只需在 API 调用中定义一次类型
const fetchUsers = () => api.get<User[]>('/users');

// useState 类型自动推断
const [users, setUsers] = useState<Awaited<ReturnType<typeof fetchUsers>>>([]);
// users 的类型自动为 User[]
```

### 场景 2：避免类型重复定义
```typescript
// ❌ 不好的方式：类型重复定义
const [users, setUsers] = useState<User[]>([]);
api.get<User[]>('/users').then(setUsers);

// ✅ 好的方式：类型只定义一次
const fetchUsers = () => api.get<User[]>('/users');
const [users, setUsers] = useState<Awaited<ReturnType<typeof fetchUsers>>>([]);
```

## 类型推断的优势

1. **单一数据源**：类型只在一个地方定义（`api.get<Group[]>`）
2. **自动同步**：如果修改 API 调用的类型，`useState` 的类型会自动更新
3. **类型安全**：TypeScript 会确保类型一致性
4. **减少错误**：避免手动类型定义时的拼写错误

## 总结

`Awaited<ReturnType<typeof fetchGroups>>` 的工作原理：

1. **`typeof fetchGroups`** → 获取函数类型 `() => Promise<Group[]>`
2. **`ReturnType<...>`** → 提取返回类型 `Promise<Group[]>`
3. **`Awaited<...>`** → 提取 Promise 中的类型 `Group[]`

最终结果：`Group[]` ✅

## 重要提示

### 这些工具类型是 TypeScript 内置的

- ✅ **无需导入**：直接使用，不需要 `import` 语句
- ✅ **类型级别**：它们在编译时工作，不是运行时函数
- ✅ **零成本**：不会增加 JavaScript 代码体积

### 版本要求

- `ReturnType`：需要 TypeScript 2.8+
- `Awaited`：需要 TypeScript 4.5+
- 项目当前 TypeScript 版本：5.8.3 ✅（完全支持）

### 使用示例

```typescript
// ✅ 正确：直接使用，无需导入
type Result = Awaited<ReturnType<typeof fetchData>>;

// ❌ 错误：不需要导入
import { ReturnType, Awaited } from 'typescript'; // 不需要！
```

