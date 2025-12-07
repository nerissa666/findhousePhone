# Gluestack UI 组件统一封装

## 概述

这个目录提供了 Gluestack UI 组件的统一封装，避免在每个组件中重复创建 `createAvatar`、`createButton` 等工厂函数。

## 使用方法

### 导入组件

```tsx
// 方式1：按需导入
import { Avatar, Button, GluestackImage } from '@/components/ui';

// 方式2：统一导入
import UI from '@/components/ui';
// 使用：<UI.Avatar>...</UI.Avatar>
```

### 组件列表

#### Avatar 头像组件

```tsx
import { Avatar } from '@/components/ui';

<Avatar className="w-12 h-12 rounded-full">
  <Avatar.Image source={{ uri: 'https://...' }} />
  <Avatar.FallbackText>JD</Avatar.FallbackText>
  <Avatar.Badge />
</Avatar>
```

#### Button 按钮组件

```tsx
import { Button } from '@/components/ui';

<Button onPress={() => {}} className="px-4 py-2 bg-primary rounded-md">
  <Button.Text className="text-white">点击</Button.Text>
</Button>
```

#### GluestackImage 图片组件

```tsx
import { GluestackImage } from '@/components/ui';

<GluestackImage 
  source={{ uri: 'https://...' }} 
  alt="图片描述"
  className="w-full h-48 rounded-lg"
/>
```

#### Input 输入框组件

```tsx
import { Input } from '@/components/ui';

<Input className="border border-gray-300 rounded-md">
  <Input.Input placeholder="请输入..." />
</Input>
```

#### GluestackPressable 可点击组件

```tsx
import { GluestackPressable } from '@/components/ui';

<GluestackPressable 
  onPress={() => {}} 
  className="p-4 bg-primary rounded-md"
>
  <Text>点击我</Text>
</GluestackPressable>
```

## 优势

1. **统一管理**：所有 Gluestack UI 组件在一个地方创建和配置
2. **避免重复**：不需要在每个组件中重复调用 `createXXX` 函数
3. **易于维护**：如果需要修改组件配置，只需在一个地方修改
4. **类型安全**：所有组件都有完整的 TypeScript 类型定义
5. **向后兼容**：保持与原有代码的兼容性

## 迁移指南

### 之前

```tsx
import { createAvatar } from '@gluestack-ui/core';
import { View, Text, Image } from 'react-native';

const Avatar = createAvatar({
  Root: View,
  Badge: View,
  Group: View,
  Image: Image,
  FallbackText: Text,
});
```

### 现在

```tsx
import { Avatar } from '@/components/ui';
```

## 添加新组件

如果需要添加新的 Gluestack UI 组件，只需在 `index.tsx` 中添加：

```tsx
import { createNewComponent } from '@gluestack-ui/core';

export const NewComponent = createNewComponent({
  Root: View,
  // ... 其他配置
});
```

然后在 `export default` 中导出即可。

