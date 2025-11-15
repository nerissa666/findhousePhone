/**
 * 轮播图组件
 * 使用 ScrollView + pagingEnabled 实现，最简单的方式
 * 从 /home/swiper 接口获取数据
 */

import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import api from '../services/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CAROUSEL_HEIGHT = 200;

// 轮播图数据类型
interface SwiperItem {
  id: number;
  imgSrc: string;
  alt: string;
}

export default function Carousel(): React.JSX.Element {
  const [swiperData, setSwiperData] = useState<SwiperItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);

  // 获取轮播图数据
  useEffect(() => {
    const fetchSwiperData = async () => {
      try {
        setLoading(true);
        setError(null);
        // 直接调用 API，处理特殊响应格式
        // 响应拦截器会返回 data，可能是 { description, status, body } 格式
        const response = await api.get<any>('/home/swiper');
        // 处理响应数据：可能是 { description, status, body } 格式
        let data: SwiperItem[] = [];
        if (response && typeof response === 'object') {
          // 检查是否是 { body: [...] } 格式
          if ('body' in response && Array.isArray(response.body)) {
            data = response.body;
          } else if (Array.isArray(response)) {
            // 如果响应拦截器已经处理成数组
            data = response;
          }
        }
        setSwiperData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '加载轮播图失败');
        console.error('获取轮播图失败:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSwiperData();
  }, []);

  // 自动轮播
  useEffect(() => {
    if (swiperData.length <= 1) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % swiperData.length;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * SCREEN_WIDTH,
        animated: true,
      });
    }, 3000); // 每 3 秒切换

    return () => clearInterval(timer);
  }, [currentIndex, swiperData.length]);

  // 处理滚动，更新当前索引
  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  // 拼接图片 URL（imgSrc 是相对路径，需要拼接基础 URL）
  const getImageUrl = (imgSrc: string): string => {
    // 如果已经是完整 URL，直接返回
    if (imgSrc.startsWith('http://') || imgSrc.startsWith('https://')) {
      return imgSrc;
    }
    // 从配置文件获取图片基础 URL
    const { IMAGE_BASE_URL } = require('../config/env');
    const baseUrl = IMAGE_BASE_URL;
    const path = imgSrc.startsWith('/') ? imgSrc : `/${imgSrc}`;
    return `${baseUrl}${path}`;
  };

  // 加载状态
  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  // 错误状态
  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // 空数据
  if (swiperData.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.emptyText}>暂无轮播图</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 轮播图 ScrollView - 最简单的实现方式 */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled // 关键：启用分页
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {swiperData.map(item => (
          <View key={item.id} style={styles.imageContainer}>
            <Image
              source={{ uri: getImageUrl(item.imgSrc) }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      {/* 底部指示器 */}
      {swiperData.length > 1 && (
        <View style={styles.indicatorContainer}>
          {swiperData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                index === currentIndex && styles.indicatorActive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: CAROUSEL_HEIGHT,
    backgroundColor: '#fff',
    position: 'relative',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: SCREEN_WIDTH,
    height: CAROUSEL_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  indicatorActive: {
    width: 20,
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 14,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
  },
  emptyText: {
    color: '#999',
    fontSize: 14,
  },
});
