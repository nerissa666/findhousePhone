/**
 * 首页组件
 */

import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button } from '../components/ui';
import Carousel from '../components/Carousel';
import Menu from '../components/Menu';
import GroupRent from '../components/GroupRent';
import News from '../components/News';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type {
  RootStackParamList,
  TabParamList,
} from '../navigation/AppNavigator';
import FragmentWrap from '../components/FragmentWrap';
type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;
const list = [
  {
    name: '整租',
    icon: '房子',
    navigator: 'FindHouse',
    params: { rentType: 'true' },
  },
  {
    name: '合租',
    icon: 'my',
    navigator: 'FindHouse',
    params: { rentType: 'false' },
  },
  {
    name: '地图找房',
    icon: 'map',
    navigator: 'MyMap',
  },
  {
    name: '去出租',
    icon: 'house',
    navigator: 'PublishHouse',
  },
];
export default function HomeScreen(_props: HomeScreenProps): React.JSX.Element {
  return (
    <ScrollView style={styles.container} className="bg-white">
      <Carousel />
      <Menu list={list} />
      <FragmentWrap
        title="租房小组"
        extra={
          <Button onPress={() => { }} className="px-3 py-1 rounded-md">
            <Button.Text className="text-sm">更多</Button.Text>
          </Button>
        }
      >
        <GroupRent />
      </FragmentWrap>
      <FragmentWrap
        title="最新资讯"
      >
        <News />
      </FragmentWrap>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor 已通过 className="bg-white" 设置，避免覆盖
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
