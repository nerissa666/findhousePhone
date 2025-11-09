# TypeScript 类型定义

本项目使用严格的 TypeScript 类型检查，确保代码的类型安全。

## 类型文件结构

```
src/types/
├── api.ts      # API 相关类型定义
├── redux.ts    # Redux 相关类型定义
├── index.ts    # 统一导出
└── README.md   # 本文档
```

## 使用方式

### 导入类型

```typescript
import type { User, House, ApiResponse } from '@/types';
```

### 类型定义说明

#### API 类型 (`api.ts`)

- `ApiResponse<T>` - API 响应基础结构
- `LoginRequest` - 登录请求参数
- `LoginResponse` - 登录响应数据
- `User` - 用户信息
- `House` - 房屋信息
- `HouseListParams` - 房屋列表查询参数
- `UploadResponse` - 文件上传响应

#### Redux 类型 (`redux.ts`)

- `UserState` - 用户状态
- `CounterState` - 计数器状态
- `RootState` - 根状态类型（由 store.ts 自动生成）

## 类型安全最佳实践

1. **避免使用 `any` 类型**

   ```typescript
   // ❌ 不好
   function processData(data: any) { ... }

   // ✅ 好
   function processData(data: User) { ... }
   ```

2. **使用类型导入（`import type`）**

   ```typescript
   // ✅ 使用 type 关键字，避免运行时导入
   import type { User } from '@/types';

   // ❌ 普通导入（会在运行时导入）
   import { User } from '@/types';
   ```

   **为什么使用 `import type`？**

   `import type` 是 TypeScript 3.8+ 引入的特性，它告诉编译器：

   - ✅ **只在类型检查时使用**：这些导入只在编译时用于类型检查
   - ✅ **不会出现在编译后的代码中**：编译成 JavaScript 时会被完全移除
   - ✅ **减少打包体积**：不会引入不必要的运行时依赖
   - ✅ **避免循环依赖问题**：纯类型导入不会造成运行时循环依赖

   **编译后的代码对比：**

   ```typescript
   // TypeScript 源代码

   // 方式 1：使用 import type（推荐）
   import type { User } from '@/types';
   function getUser(): User { ... }

   // 方式 2：普通 import
   import { User } from '@/types';
   function getUser(): User { ... }
   ```

   ```javascript
   // 编译后的 JavaScript 代码

   // 方式 1：import type - 完全移除，没有运行时导入
   function getUser() { ... }

   // 方式 2：普通 import - 会保留导入语句（即使只用于类型）
   import { User } from '@/types';  // ❌ 这个导入是多余的！
   function getUser() { ... }
   ```

   **什么时候使用 `import type`？**

   - ✅ **只用于类型注解时**：函数参数、返回值、变量类型等

   ```typescript
   import type { User } from '@/types';

   function processUser(user: User): User {
     // 只用于类型
     return user;
   }
   ```

   - ❌ **需要运行时使用值时**：不能使用 `import type`

   ```typescript
   // ❌ 错误：不能使用 import type，因为需要运行时访问
   import type { API_BASE_URL } from '@/config'; // 这是值，不是类型

   // ✅ 正确：使用普通 import
   import { API_BASE_URL } from '@/config';
   const url = API_BASE_URL; // 运行时需要使用
   ```

   **混合导入：**

   ```typescript
   // 同时导入类型和值
   import { userApi, tokenManager } from '@/services'; // 值
   import type { User, LoginResponse } from '@/types'; // 类型
   ```

3. **为函数参数和返回值添加类型**

   ```typescript
   // ✅ 明确的类型定义
   async function getUser(id: string): Promise<User> {
     // ...
   }
   ```

4. **使用类型断言时要谨慎**
   ```typescript
   // ⚠️ 仅在必要时使用，并添加注释说明原因
   const data = response as unknown as User;
   ```

## 运行类型检查

```bash
# 检查所有类型错误
npm run type-check

# 监听模式（开发时使用）
npm run type-check:watch
```

## TypeScript 配置

项目的 `tsconfig.json` 启用了以下严格模式：

- `strict: true` - 启用所有严格类型检查
- `noImplicitAny: true` - 禁止隐式 any
- `strictNullChecks: true` - 严格的 null 检查
- `noUnusedLocals: true` - 检查未使用的局部变量
- `noUnusedParameters: true` - 检查未使用的参数
- `noImplicitReturns: true` - 检查函数返回值

更多配置请查看 `tsconfig.json`。
