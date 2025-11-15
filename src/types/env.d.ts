/**
 * 环境变量类型声明
 * react-native-dotenv 会自动注入这些变量
 */

declare module '@env' {
  export const API_BASE_URL: string;
  export const IMAGE_BASE_URL: string;
  export const ENV: string;
}
