import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Avatar } from './ui';
import api from '../services/api';
import { Group } from '../types/api';
import { IMAGE_BASE_URL } from '../config/env';

export default () => {
  // 类型从 API 调用中自动推断，只需在 api.get 中定义一次类型
  const fetchGroups = () => api.get<Group[]>('/home/groups', {
    params: {
      area: 'AREA|88cff55c-aaa4-e2e0',
    },
  });

  /**
   * ReturnType 和 Awaited 是 TypeScript 内置的工具类型（Utility Types）
   * useState 的类型自动从 fetchGroups 的返回类型中推断
   * */
  const [groupList, setGroupList] = useState<Awaited<ReturnType<typeof fetchGroups>>>([]);

  useEffect(() => {
    fetchGroups().then(setGroupList);
  }, []);
  return (
    <View className="flex-row flex-wrap gap-6">
      {groupList.map(item => (
        <View key={item.id} className="flex-row gap-3 items-center flex-1 min-w-[45%]">
          <View className="gap-3 flex-1 text-sm">
            <Text className="font-semibold">{item.title}</Text>
            <Text className="text-gray-500">{item.desc}</Text>
          </View>
          <Avatar className="w-12 h-12 rounded-full overflow-hidden items-center justify-center bg-gray-200">
            <Avatar.Image
              source={{
                uri: item.imgSrc.startsWith('http')
                  ? item.imgSrc
                  : `${IMAGE_BASE_URL}${item.imgSrc}`,
              }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          </Avatar>
        </View>
      ))}
    </View>
  );
};
