/**
 * 自动导入的类型声明
 *
 * 注意：Babel 插件会在编译时自动注入导入语句
 * 这个文件只是为了 TypeScript 类型检查，让 IDE 能识别这些全局变量
 *
 * 实际运行时，Babel 会将这些转换为真正的 import 语句
 */

// 使用三斜线指令引用类型定义
/// <reference types="react" />
/// <reference types="react-native" />

// 声明全局变量（这些会在编译时被 Babel 插件转换为实际的导入）
declare const React: typeof import('react').default;
declare const View: typeof import('react-native').View;
declare const Text: typeof import('react-native').Text;
declare const ScrollView: typeof import('react-native').ScrollView;
declare const Image: typeof import('react-native').Image;
declare const TouchableOpacity: typeof import('react-native').TouchableOpacity;
declare const StyleSheet: typeof import('react-native').StyleSheet;
declare const SafeAreaView: typeof import('react-native').SafeAreaView;

// React Hooks
declare const useState: typeof import('react').useState;
declare const useEffect: typeof import('react').useEffect;
declare const useCallback: typeof import('react').useCallback;
declare const useMemo: typeof import('react').useMemo;
declare const useRef: typeof import('react').useRef;
declare const useContext: typeof import('react').useContext;
