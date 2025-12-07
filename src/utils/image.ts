// 拼接图片 URL（imgSrc 是相对路径，需要拼接基础 URL）
export function getImageUrl(imgSrc: string): string {
  // 如果已经是完整 URL，直接返回
  if (imgSrc.startsWith('http://') || imgSrc.startsWith('https://')) {
    return imgSrc;
  }
  // 从配置文件获取图片基础 URL
  const { IMAGE_BASE_URL } = require('../config/env');
  const baseUrl = IMAGE_BASE_URL;
  const path = imgSrc.startsWith('/') ? imgSrc : `/${imgSrc}`;
  return `${baseUrl}${path}`;
}
