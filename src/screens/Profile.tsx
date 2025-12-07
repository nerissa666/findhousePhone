import React from 'react';
import { View, Text, Pressable } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type {
  RootStackParamList,
  TabParamList,
} from '@/navigation/AppNavigator';

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function Profile({ navigation }: ProfileScreenProps) {
  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-6">个人中心</Text>

      <View className="bg-white rounded-lg p-4 shadow-sm mb-4">
        {/* 图标预览入口 */}
        <Pressable
          onPress={() => navigation.navigate('PreviewIcon')}
          className="flex-row items-center justify-between py-3 border-b border-gray-100"
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
              <Text className="text-green-600 text-lg">🎨</Text>
            </View>
            <View>
              <Text className="text-base font-medium text-gray-800">
                图标预览
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                查看所有可用的图标
              </Text>
            </View>
          </View>
          <Text className="text-gray-400">›</Text>
        </Pressable>

        {/* 详情页入口 */}
        <Pressable
          onPress={() =>
            navigation.navigate('Details', {
              itemId: 123,
              title: '示例详情页',
            })
          }
          className="flex-row items-center justify-between py-3"
        >
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Text className="text-blue-600 text-lg">📄</Text>
            </View>
            <View>
              <Text className="text-base font-medium text-gray-800">
                详情页
              </Text>
              <Text className="text-sm text-gray-500 mt-1">查看详情页示例</Text>
            </View>
          </View>
          <Text className="text-gray-400">›</Text>
        </Pressable>
      </View>
    </View>
  );
}
