/**
 * 首页组件
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { CounterExample } from '@/components/CounterExample';
import { GluestackExample } from '@/components/GluestackExample';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: HomeScreenProps): React.JSX.Element {
  const handleNavigateToDetails = (itemId: number) => {
    navigation.navigate('Details', {
      itemId,
      title: `项目 ${itemId}`,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>欢迎使用 React Navigation</Text>
        <Text style={styles.subtitle}>
          这是一个使用 React Navigation 设置的导航示例
        </Text>

        {/* Gluestack UI 组件示例 */}
        <View style={styles.section}>
          <GluestackExample />
        </View>

        <View style={styles.divider} />

        {/* Redux 状态管理示例 */}
        <View style={styles.section}>
          <CounterExample />
        </View>

        <View style={styles.divider} />

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigateToDetails(1)}
          >
            <Text style={styles.buttonText}>查看详情 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigateToDetails(2)}
          >
            <Text style={styles.buttonText}>查看详情 2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleNavigateToDetails(3)}
          >
            <Text style={styles.buttonText}>查看详情 3</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  buttonContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
