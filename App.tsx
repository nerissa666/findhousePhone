/**
 * React Native App with Navigation, Redux, and Gluestack UI
 * 使用 React Navigation 进行路由管理
 * 使用 Redux Toolkit 进行状态管理
 * 使用 Gluestack UI 作为 UI 组件库（NativeBase 的继任者）
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from './src/config/gluestack.config';
import { Provider } from 'react-redux';
import { AppNavigator } from './src/navigation/AppNavigator';
import { store } from './src/store/store';

// 注意：LogBox 配置已在 index.js 中设置（在应用启动前）
// 这样可以确保在警告触发前就已经被过滤

// 使用 TypeScript 类型注解
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <GluestackUIProvider config={config}>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppNavigator />
        </SafeAreaProvider>
      </GluestackUIProvider>
    </Provider>
  );
}

export default App;
