/**
 * Gluestack UI 组件统一封装
 * 
 * 将所有 gluestack-ui 的 create 函数统一封装，避免在每个组件中重复创建
 * 使用时直接从 @/components/ui 导入即可
 */

import {
    View,
    Text,
    Image,
    Pressable,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import {
    createAvatar,
    createButton,
    createImage,
    createInput,
    createPressable,
} from '@gluestack-ui/core';

/**
 * Avatar 组件
 * 使用方式：
 * <Avatar className="w-12 h-12 rounded-full">
 *   <Avatar.Image source={{ uri: '...' }} />
 *   <Avatar.FallbackText>JD</Avatar.FallbackText>
 *   <Avatar.Badge />
 * </Avatar>
 */
export const Avatar = createAvatar({
    Root: View,
    Badge: View,
    Group: View,
    Image: Image,
    FallbackText: Text,
});

/**
 * Button 组件
 * 使用方式：
 * <Button onPress={() => {}} className="px-4 py-2 bg-primary rounded-md">
 *   <Button.Text className="text-white">点击</Button.Text>
 * </Button>
 */
export const Button = createButton({
    Root: Pressable,
    Text: Text,
    Group: View,
    Spinner: ActivityIndicator, // 使用 ActivityIndicator 作为加载状态
    Icon: View, // 图标占位
});

/**
 * Image 组件（增强版）
 * 使用方式：
 * <GluestackImage source={{ uri: '...' }} alt="description" />
 */
export const GluestackImage = createImage({
    Root: Image,
});

/**
 * Input 组件
 * 使用方式：
 * <Input className="border border-gray-300 rounded-md px-3 py-2">
 *   <Input.Input placeholder="请输入..." />
 * </Input>
 */
export const Input = createInput({
    Root: View,
    Icon: View,
    Slot: View,
    Input: TextInput,
});

/**
 * Pressable 组件（增强版）
 * 使用方式：
 * <GluestackPressable onPress={() => {}} className="p-4 bg-primary rounded-md">
 *   <Text>点击</Text>
 * </GluestackPressable>
 */
export const GluestackPressable = createPressable({
    Root: Pressable,
});

// 导出所有组件，方便统一导入
export default {
    Avatar,
    Button,
    GluestackImage,
    Input,
    GluestackPressable,
};

