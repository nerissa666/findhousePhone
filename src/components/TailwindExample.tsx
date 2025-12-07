/**
 * Tailwind CSS 使用示例组件
 * 演示在 React Native 中使用 Tailwind CSS 类名
 */

import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';

export function TailwindExample(): React.JSX.Element {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* 标题区域 */}
      <View className="bg-blue-500 p-6 pt-12">
        <Text className="text-3xl font-bold text-white text-center">
          Tailwind CSS 示例
        </Text>
        <Text className="text-blue-100 text-center mt-2">
          在 React Native 中使用 Tailwind 类名
        </Text>
      </View>

      {/* 内容区域 */}
      <View className="p-4">
        {/* 卡片示例 */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-lg">
          <Text className="text-xl font-bold text-gray-800 mb-2">卡片组件</Text>
          <Text className="text-gray-600">
            这是一个使用 Tailwind 类名创建的卡片，包含圆角、内边距和阴影效果。
          </Text>
        </View>

        {/* Flexbox 布局示例 */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-lg">
          <Text className="text-xl font-bold text-gray-800 mb-3">
            Flexbox 布局
          </Text>
          <View className="flex-row justify-between items-center">
            <View className="bg-blue-100 p-3 rounded-lg">
              <Text className="text-blue-800 font-semibold">左</Text>
            </View>
            <View className="bg-green-100 p-3 rounded-lg">
              <Text className="text-green-800 font-semibold">中</Text>
            </View>
            <View className="bg-purple-100 p-3 rounded-lg">
              <Text className="text-purple-800 font-semibold">右</Text>
            </View>
          </View>
        </View>

        {/* 按钮示例 */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-lg">
          <Text className="text-xl font-bold text-gray-800 mb-3">按钮样式</Text>
          <View className="gap-3">
            <Pressable className="bg-blue-500 py-3 px-6 rounded-lg active:bg-blue-600">
              <Text className="text-white text-center font-semibold">
                主要按钮
              </Text>
            </Pressable>
            <Pressable className="bg-green-500 py-3 px-6 rounded-lg active:bg-green-600">
              <Text className="text-white text-center font-semibold">
                成功按钮
              </Text>
            </Pressable>
            <Pressable className="border-2 border-gray-300 py-3 px-6 rounded-lg active:bg-gray-100">
              <Text className="text-gray-700 text-center font-semibold">
                边框按钮
              </Text>
            </Pressable>
          </View>
        </View>

        {/* 文字样式示例 */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-lg">
          <Text className="text-xl font-bold text-gray-800 mb-3">文字样式</Text>
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            大标题 (text-2xl, font-bold)
          </Text>
          <Text className="text-lg font-semibold text-gray-700 mb-1">
            中标题 (text-lg, font-semibold)
          </Text>
          <Text className="text-base text-gray-600 mb-1">正文 (text-base)</Text>
          <Text className="text-sm text-gray-500">
            小字 (text-sm, text-gray-500)
          </Text>
        </View>

        {/* 颜色示例 */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-lg">
          <Text className="text-xl font-bold text-gray-800 mb-3">颜色系统</Text>
          <View className="flex-row flex-wrap gap-2">
            <View className="bg-red-500 w-16 h-16 rounded-lg items-center justify-center">
              <Text className="text-white text-xs font-bold">Red</Text>
            </View>
            <View className="bg-blue-500 w-16 h-16 rounded-lg items-center justify-center">
              <Text className="text-white text-xs font-bold">Blue</Text>
            </View>
            <View className="bg-green-500 w-16 h-16 rounded-lg items-center justify-center">
              <Text className="text-white text-xs font-bold">Green</Text>
            </View>
            <View className="bg-yellow-500 w-16 h-16 rounded-lg items-center justify-center">
              <Text className="text-white text-xs font-bold">Yellow</Text>
            </View>
            <View className="bg-purple-500 w-16 h-16 rounded-lg items-center justify-center">
              <Text className="text-white text-xs font-bold">Purple</Text>
            </View>
            <View className="bg-pink-500 w-16 h-16 rounded-lg items-center justify-center">
              <Text className="text-white text-xs font-bold">Pink</Text>
            </View>
          </View>
        </View>

        {/* 间距示例 */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-lg">
          <Text className="text-xl font-bold text-gray-800 mb-3">间距系统</Text>
          <View className="gap-2">
            <View className="bg-blue-100 p-1 rounded">
              <Text className="text-xs">p-1 (4px)</Text>
            </View>
            <View className="bg-blue-200 p-2 rounded">
              <Text className="text-xs">p-2 (8px)</Text>
            </View>
            <View className="bg-blue-300 p-4 rounded">
              <Text className="text-xs">p-4 (16px)</Text>
            </View>
            <View className="bg-blue-400 p-6 rounded">
              <Text className="text-xs text-white">p-6 (24px)</Text>
            </View>
          </View>
        </View>

        {/* 圆角示例 */}
        <View className="bg-white rounded-xl p-4 mb-4 shadow-lg">
          <Text className="text-xl font-bold text-gray-800 mb-3">圆角样式</Text>
          <View className="flex-row gap-3 items-center">
            <View className="bg-blue-500 w-16 h-16 rounded items-center justify-center">
              <Text className="text-white text-xs">rounded</Text>
            </View>
            <View className="bg-green-500 w-16 h-16 rounded-lg items-center justify-center">
              <Text className="text-white text-xs">rounded-lg</Text>
            </View>
            <View className="bg-purple-500 w-16 h-16 rounded-xl items-center justify-center">
              <Text className="text-white text-xs">rounded-xl</Text>
            </View>
            <View className="bg-pink-500 w-16 h-16 rounded-full items-center justify-center">
              <Text className="text-white text-xs">rounded-full</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
