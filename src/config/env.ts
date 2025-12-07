/**
 * 环境变量配置
 * 直接读取 .env 文件，不依赖 Babel 插件
 */

// 在 React Native 中，我们可以直接定义配置
// 或者从 .env 文件读取（需要运行时解析）

// 开发环境配置
const ENV_CONFIG = {
  // API 配置
  // API_BASE_URL: 'https://124.71.203.87/findhouseServer',
  API_BASE_URL: 'http://localhost:8080',
  // IMAGE_BASE_URL: 'https://124.71.203.87/findhouseServer',
  IMAGE_BASE_URL: 'http://localhost:8080',

  // 环境标识
  ENV: __DEV__ ? 'development' : 'production',
};

// 如果需要在运行时读取 .env 文件，可以使用以下方式
// 注意：React Native 中读取文件需要额外配置

export const API_BASE_URL = ENV_CONFIG.API_BASE_URL;
export const IMAGE_BASE_URL = ENV_CONFIG.IMAGE_BASE_URL;
export const ENV = ENV_CONFIG.ENV;

// 导出默认配置对象
export default ENV_CONFIG;
