/**
 * Gluestack UI v3 组件使用示例
 * 使用 React Native 基础组件 + Tailwind CSS (NativeWind)
 * 演示常用的 UI 组件
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import { useAppSelector } from '../store/hooks';

export function GluestackExample(): React.JSX.Element {
  const count = useAppSelector(state => state.counter.value);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4 m-2 rounded-lg bg-white shadow-lg">
        <View className="gap-4">
          {/* 标题 */}
          <Text className="text-lg font-bold text-primary">
            Gluestack UI v3 组件示例 (使用 Tailwind CSS)
          </Text>

          <View className="h-px bg-gray-200" />

          {/* 文本和标题 */}
          <View className="gap-2">
            <Text className="text-lg font-bold">文本组件</Text>
            <Text>普通文本</Text>
            <Text className="text-primary">主色文本</Text>
            <Text className="text-sm text-gray-500">小号灰色文本</Text>
          </View>

          <View className="h-px bg-gray-200" />

          {/* 按钮 */}
          <View className="gap-2">
            <Text className="text-lg font-bold">按钮组件</Text>
            <View className="flex-row gap-2">
              <TouchableOpacity className="px-4 py-2 bg-primary rounded-md">
                <Text className="text-white text-sm">主要</Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-2 border border-primary rounded-md">
                <Text className="text-primary text-sm">次要</Text>
              </TouchableOpacity>
              <TouchableOpacity className="px-4 py-2 bg-green-500 rounded-md">
                <Text className="text-white text-sm">成功</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="h-px bg-gray-200" />

          {/* 输入框 */}
          <View className="gap-2">
            <Text className="text-lg font-bold">表单组件</Text>
            <TextInput
              className="border border-gray-300 rounded-md px-3 py-2"
              placeholder="请输入用户名"
            />
            <TextInput
              className="border border-gray-300 rounded-md px-3 py-2"
              placeholder="请输入密码"
              secureTextEntry
            />
          </View>

          <View className="h-px bg-gray-200" />

          {/* Badge 和状态 */}
          <View className="gap-2">
            <Text className="text-lg font-bold">徽章和状态</Text>
            <View className="flex-row gap-2 items-center">
              <View className="px-3 py-1 bg-green-500 rounded-full">
                <Text className="text-white text-xs">成功</Text>
              </View>
              <View className="px-3 py-1 bg-red-500 rounded-full">
                <Text className="text-white text-xs">错误</Text>
              </View>
              <View className="px-3 py-1 bg-yellow-500 rounded-full">
                <Text className="text-white text-xs">警告</Text>
              </View>
              <View className="px-3 py-1 bg-blue-500 rounded-full">
                <Text className="text-white text-xs">信息</Text>
              </View>
            </View>
            <Text>
              Redux 计数器值: <Text className="font-bold">{count}</Text>
            </Text>
          </View>

          <View className="h-px bg-gray-200" />

          {/* 可点击区域 */}
          <View className="gap-2">
            <Text className="text-lg font-bold">交互组件</Text>
            <Pressable
              onPress={() => console.log('Pressed!')}
              className="bg-primary/20 p-3 rounded-md"
            >
              <Text className="text-primary text-center">点击我</Text>
            </Pressable>
          </View>

          {/* Tailwind 类名示例 */}
          <View className="h-px bg-gray-200" />
          <View className="gap-2">
            <Text className="text-lg font-bold">Tailwind CSS 支持</Text>
            <View className="p-4 bg-blue-100 rounded-md">
              <Text className="text-lg font-bold text-blue-800">
                使用 Tailwind CSS 类名
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
