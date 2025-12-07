import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { GluestackImage } from './ui';
import api from '../services/api';
import { News } from '../types/api';
import { IMAGE_BASE_URL } from '../config/env';

export default () => {
  const fetchNews = () => api.get<News[]>('/home/news');
  const [news, setNews] = useState<Awaited<ReturnType<typeof fetchNews>>>([]);
  useEffect(() => {
    fetchNews().then(setNews);
  }, []);
  return (
    <>
      {news.map(({ id, title, imgSrc, from, date }) => (
        <View key={id} className="flex-row gap-5 items-center mb-4">
          <GluestackImage
            source={{ uri: IMAGE_BASE_URL + imgSrc }}
            alt="news image"
            // aspect-square - 宽高比为1:1
            className="w-1/3 aspect-square rounded"
            resizeMode="cover"
          />
          <View className="flex-1 gap-20 text-sm">
            <Text className='font-medium'>{title}</Text>
            <View className="flex-row gap-3 justify-between">
              <Text className='text-gray-500'>{from}</Text>
              <Text className='text-gray-500'>{date}</Text>
            </View>
          </View>
        </View>
      ))}
    </>
  );
};
