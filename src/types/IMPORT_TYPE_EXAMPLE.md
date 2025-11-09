# `import type` 详解：避免运行时导入

## 核心概念

`import type` 告诉 TypeScript 编译器：**这些导入只在类型检查时使用，编译后会被完全移除**。

## 实际对比示例

### 示例 1：类型导入 vs 普通导入

#### TypeScript 源代码

```typescript
// ========== 文件：src/types/api.ts ==========
export interface User {
  id: string;
  name: string;
}

export const DEFAULT_USER_NAME = 'Guest'; // 这是一个值，不是类型

// ========== 文件：src/components/UserComponent.tsx ==========

// ❌ 方式 1：普通 import（不推荐，如果只用于类型）
import { User } from '@/types';
function getUser(): User {
  return { id: '1', name: 'John' };
}

// ✅ 方式 2：import type（推荐，只用于类型时）
import type { User } from '@/types';
function getUser(): User {
  return { id: '1', name: 'John' };
}
```

#### 编译后的 JavaScript 代码

```javascript
// ❌ 方式 1：普通 import - 会保留导入语句
import { User } from '@/types'; // ← 这个导入是多余的！User 是类型，运行时不存在
function getUser() {
  return { id: '1', name: 'John' };
}

// ✅ 方式 2：import type - 完全移除
function getUser() {
  return { id: '1', name: 'John' };
}
```

**结果：** 使用 `import type` 可以减少打包体积，因为不会引入不必要的运行时导入。

---

### 示例 2：混合导入（类型 + 值）

```typescript
// ========== 文件：src/services/apiService.ts ==========
export interface ApiResponse<T> {
  code: number;
  data: T;
}

export const API_TIMEOUT = 10000; // 值

// ========== 文件：src/utils/apiHelper.ts ==========

// ✅ 正确：分别导入类型和值
import type { ApiResponse } from '@/services/apiService'; // 类型
import { API_TIMEOUT } from '@/services/apiService'; // 值

function handleResponse<T>(response: ApiResponse<T>): T {
  // 使用类型
  return response.data;
}

function makeRequest() {
  // 使用值
  const timeout = API_TIMEOUT;
  // ...
}
```

**编译后：**

```javascript
// 只有值会被保留，类型会被移除
import { API_TIMEOUT } from '@/services/apiService';

function handleResponse(response) {
  return response.data;
}

function makeRequest() {
  const timeout = API_TIMEOUT;
  // ...
}
```

---

### 示例 3：错误用法

```typescript
// ❌ 错误：不能对值使用 import type
import type { API_TIMEOUT } from '@/services/apiService';

function makeRequest() {
  const timeout = API_TIMEOUT; // ❌ 错误！API_TIMEOUT 在运行时不存在
  // ...
}
```

**TypeScript 会报错：**

```
error TS1361: 'API_TIMEOUT' cannot be used as a value because it was imported using 'import type'.
```

---

## 为什么这很重要？

### 1. **减少打包体积**

```typescript
// 如果 types.ts 文件很大，包含很多类型定义
// 使用 import type 可以避免将这些类型定义打包到最终代码中
import type { User, House, ApiResponse, LoginRequest, ... } from '@/types';
```

### 2. **避免循环依赖**

```typescript
// 文件 A
import type { TypeFromB } from './B'; // 纯类型导入，不会造成运行时循环依赖

// 文件 B
import type { TypeFromA } from './A'; // 可以安全地互相引用类型
```

### 3. **清晰的代码意图**

```typescript
// 一眼就能看出：User 只用于类型，不会在运行时使用
import type { User } from '@/types';

// 一眼就能看出：userApi 是运行时需要的值
import { userApi } from '@/services';
```

---

## 最佳实践

### ✅ 推荐做法

```typescript
// 1. 只用于类型时，使用 import type
import type { User, House } from '@/types';

// 2. 需要运行时值时，使用普通 import
import { userApi, tokenManager } from '@/services';

// 3. 混合使用时，分开写
import { API_BASE_URL } from '@/config';
import type { ApiResponse } from '@/types';
```

### ❌ 避免的做法

```typescript
// ❌ 不要对值使用 import type
import type { API_BASE_URL } from '@/config';

// ❌ 不要对类型使用普通 import（如果只用于类型）
import { User } from '@/types'; // 应该用 import type
```

---

## 总结

| 场景             | 使用方式      | 原因                         |
| ---------------- | ------------- | ---------------------------- |
| 只用于类型注解   | `import type` | 编译后会被移除，减少打包体积 |
| 需要运行时使用   | 普通 `import` | 运行时需要访问实际值         |
| 同时需要类型和值 | 分开导入      | 代码更清晰，意图更明确       |

**记住：** `import type` = "这只是类型，编译后请删除"
