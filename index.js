/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import { enableScreens } from 'react-native-screens';
import App from './App';
import { name as appName } from './app.json';

// 在开发环境中忽略特定警告（在应用启动前设置，必须在所有导入之后）
if (__DEV__) {
    // 忽略 SafeAreaView 弃用警告（来自 Gluestack UI 库内部）
    // 使用多种匹配方式确保能捕获警告
    LogBox.ignoreLogs([
        // 精确匹配
        'SafeAreaView has been deprecated',
        'SafeAreaView has been deprecated and will be removed in a future release',
        // 正则表达式匹配（更灵活）
        /SafeAreaView.*deprecated/i,
        /SafeAreaView.*will be removed/i,
        /Please use 'react-native-safe-area-context'/i,
        /react-native-safe-area-context/i,
    ]);

    // 如果上面的方法不起作用，可以尝试拦截 console.warn
    const originalWarn = console.warn;
    console.warn = (...args) => {
        const message = args.join(' ');
        if (message.includes('SafeAreaView') && message.includes('deprecated')) {
            return; // 忽略这个警告
        }
        originalWarn.apply(console, args);
    };
}

// 启用原生屏幕支持（React Navigation 需要）
enableScreens();

AppRegistry.registerComponent(appName, () => App);
