import React from 'react';
import { View, Text, Pressable } from 'react-native';
import IconFont from './IconFont';
import { MenuItem } from '@/types/api';
import { colors } from '../theme/colors';
import { fontSize } from '../theme';
import { useNavigation } from '@react-navigation/native';
export default function Menu({
  list,
}: {
  list: MenuItem[];
}): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-around items-center p-4 border-t border-gray-200">
      {list.map(({ name, icon, navigator, params }) => (
        <Pressable
          key={name}
          className="items-center active:opacity-70"
          onPress={() => {
            if (params) {
              navigation.navigate(navigator as never, params as never);
            } else {
              navigation.navigate(navigator as never);
            }
          }}
        >
          <View className="bg-green-50 p-3 rounded-full mb-2">
            <IconFont name={icon} size={fontSize.lg} color={colors.primary} />
          </View>
          <Text className="text-sm text-gray-700 font-medium">{name}</Text>
        </Pressable>
      ))}
    </View>
  );
}
