/**
 * 应用导航配置
 * 使用 React Navigation 进行页面路由管理
 * 底部导航栏 + Stack 导航
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import PreviewIcon from '../screens/PreviewIcon';
import FindHouse from '../screens/FindHouse';
import LatestNews from '../screens/LatestNews';
import Profile from '../screens/Profile';
import MyMap from '../screens/MyMap';
import PublishHouse from '../screens/PublishHouse';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MyHousesScreen from '../screens/MyHousesScreen';
import IconFont from '../components/IconFont';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, spacing } from '../theme';
// 定义导航参数类型
export type RootStackParamList = {
  MainTabs: undefined;
  Details: { itemId?: number; houseCode?: string; title?: string };
  PreviewIcon: undefined;
  MyMap: undefined;
  PublishHouse: undefined;
  Login: undefined;
  Register: undefined;
  Favorites: undefined;
  MyHouses: undefined;
};

export type TabParamList = {
  Home: React.ComponentType<any>;
  FindHouse: { rentType?: string } | undefined;
  LatestNews: React.ComponentType<any>;
  Profile: React.ComponentType<any>;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const list: Array<{
  name: keyof TabParamList;
  title: string;
  icon: string;
  component: React.ComponentType<any>;
}> = [
    {
      name: 'Home',
      title: '首页',
      icon: 'ind',
      component: HomeScreen,
    },
    {
      name: 'FindHouse',
      title: '找房',
      icon: 'findHouse',
      component: FindHouse,
    },
    {
      name: 'LatestNews',
      title: '最新资讯',
      icon: 'infom',
      component: LatestNews,
    },
    {
      name: 'Profile',
      title: '个人中心',
      icon: 'myinfo',
      component: Profile,
    },
  ];

// Tab 图标组件工厂函数
const createTabIcon =
  (iconName: string) =>
    ({ color }: { color: string }): React.JSX.Element =>
      <IconFont name={iconName} size={fontSize.lg} color={color} />;

// 底部导航栏
const TabNavigator = (): React.JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true, // 隐藏 Tab 导航的 header
        headerStyle: {
          backgroundColor: colors.bgPrimary,
          height: 70
        },
        headerTitle: '', // 隐藏标题文字
        headerTintColor: colors.textPrimary,
        tabBarActiveTintColor: colors.primaryLight,
        tabBarInactiveTintColor: colors.textTertiary,
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: fontWeight.medium,
        },
        tabBarStyle: {
          paddingBottom: spacing.xl,
          paddingTop: spacing.xs,
          height: 60,
        },
      }}
    >
      {list.map(({ name, title, icon, component }) => (
        <Tab.Screen
          key={name}
          name={name}
          component={component}
          options={{
            title: title,
            // tabBarLabel: title,
            tabBarIcon: createTabIcon(icon),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

// 主导航器（Stack + Tab）
export const AppNavigator = (): React.JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.bgPrimary,
          },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: {
            fontWeight: fontWeight.bold,
            fontSize: fontSize.base,
          },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{
            headerShown: false,
            title: '',
            headerBackTitle: '',
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: '详情页',
          }}
        />
        <Stack.Screen
          name="PreviewIcon"
          component={PreviewIcon}
          options={{
            title: '图标预览',
          }}
        />
        <Stack.Screen
          name="MyMap"
          component={MyMap}
          options={{
            title: '地图找房',
          }}
        />
        <Stack.Screen
          name="PublishHouse"
          component={PublishHouse}
          options={{
            title: '发布房源',
          }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: '登录',
          }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: '注册',
          }}
        />
        <Stack.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            title: '我的收藏',
          }}
        />
        <Stack.Screen
          name="MyHouses"
          component={MyHousesScreen}
          options={{
            title: '我的房源',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
