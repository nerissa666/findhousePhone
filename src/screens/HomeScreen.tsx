/**
 * 首页组件
 */

import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Carousel from '../components/Carousel';
import Menu from '../components/Menu';
import GroupRent from '../components/GroupRent';
import News from '../components/News';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen(_props: HomeScreenProps): React.JSX.Element {
  return (
    <ScrollView style={styles.container}>
      <Carousel />
      <Menu />
      <GroupRent />
      <News />
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
  section: {
    marginBottom: 20,
  },
});
