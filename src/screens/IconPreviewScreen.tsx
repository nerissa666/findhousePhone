/**
 * 图标预览页面
 * 展示所有可用的 IconFont 图标
 */

import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import IconFont, { iconMap } from '@/components/IconFont';
import { RootStackParamList } from '@/navigation/AppNavigator';

type IconPreviewScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PreviewIcon'
>;

// 图标标签映射（可选，用于显示中文标签）
const iconLabelMap: Record<string, string> = {
  edit: '编辑',
  'head-bot': '头部底部',
  'head-top': '头部顶部',
  Collection: '收藏',
  ask: '询问',
  message: '消息',
  metro: '地铁',
  report: '报告',
  maLoca: '位置',
  share: '分享',
  map: '地图',
  ind: '首页',
  my: '我的',
  mess: '消息',
  findHouse: '找房',
  arrow: '箭头',
  seach: '搜索',
  ref: '刷新',
  vid: '视频',
  order: '订单',
  myinfo: '我的信息',
  record: '记录',
  cust: '客户',
  air: '空调',
  broadband: '宽带',
  gas: '燃气',
  Heat: '暖气',
  eval: '评价',
  heater: '加热器',
  sofa: '沙发',
  set: '设置',
  identity: '身份',
  coll: '收藏',
  wash: '洗衣机',
  wardrobe: '衣柜',
  back: '返回',
  infom: '信息',
  auth: '认证',
  pic: '图片',
  morey: '更多',
  time: '时间',
  ok: '确定',
  pho: '电话',
  cls: '关闭',
  add: '添加',
  expression: '表情',
  problem: '问题',
  成交订单: '成交订单',
  error: '错误',
  backTop: '返回顶部',
  backBot: '返回底部',
  backRit: '返回右侧',
  房子: '房子',
  海外: '海外',
  计算器: '计算器',
  箭头向上: '箭头向上',
  箭头向右: '箭头向右',
  箭头向左: '箭头向左',
  house: '房子',
};

// 从 iconMap 自动生成图标列表
const iconList = Object.keys(iconMap).map(name => ({
  name,
  label: iconLabelMap[name] || name,
}));

export function IconPreviewScreen({
  navigation: _navigation,
}: IconPreviewScreenProps): React.JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [selectedSize, setSelectedSize] = useState(24);
  const [selectedColor, setSelectedColor] = useState('#333');

  // 过滤图标
  const filteredIcons = iconList.filter(
    icon =>
      icon.name.toLowerCase().includes(searchText.toLowerCase()) ||
      icon.label.toLowerCase().includes(searchText.toLowerCase()),
  );

  // 颜色选项
  const colorOptions = [
    { name: '黑色', value: '#333' },
    { name: '主题绿', value: '#21b97a' },
    { name: '蓝色', value: '#1890ff' },
    { name: '红色', value: '#ff4d4f' },
    { name: '橙色', value: '#ff9800' },
    { name: '灰色', value: '#999' },
  ];

  // 尺寸选项
  const sizeOptions = [16, 20, 24, 32, 40, 48];

  return (
    <View className="flex-1 bg-gray-50">
      {/* 搜索栏 */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <TextInput
          className="bg-gray-100 rounded-lg px-4 py-2 text-base"
          placeholder="搜索图标名称或标签..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
      </View>

      {/* 控制栏 */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        {/* 尺寸选择 */}
        <View className="mb-3">
          <Text className="text-sm text-gray-600 mb-2">图标尺寸:</Text>
          <View className="flex-row flex-wrap gap-2">
            {sizeOptions.map(size => (
              <Pressable
                key={size}
                onPress={() => setSelectedSize(size)}
                className={`px-3 py-1 rounded ${
                  selectedSize === size ? 'bg-green-500' : 'bg-gray-200'
                }`}
              >
                <Text
                  className={`text-sm ${
                    selectedSize === size ? 'text-white' : 'text-gray-700'
                  }`}
                >
                  {size}px
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 颜色选择 */}
        <View>
          <Text className="text-sm text-gray-600 mb-2">图标颜色:</Text>
          <View className="flex-row flex-wrap gap-2">
            {colorOptions.map(color => (
              <Pressable
                key={color.value}
                onPress={() => setSelectedColor(color.value)}
                className={`px-3 py-1 rounded border ${
                  selectedColor === color.value
                    ? 'border-green-500 border-2'
                    : 'border-gray-300'
                }`}
              >
                <View className="flex-row items-center gap-2">
                  <View
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: color.value }}
                  />
                  <Text className="text-sm text-gray-700">{color.name}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      {/* 统计信息 */}
      <View className="bg-white px-4 py-2 border-b border-gray-200">
        <Text className="text-sm text-gray-600">
          共找到 {filteredIcons.length} 个图标
          {searchText && ` (搜索: "${searchText}")`}
        </Text>
      </View>

      {/* 图标网格 */}
      <ScrollView className="flex-1">
        <View className="p-4">
          <View className="flex-row flex-wrap gap-4 justify-between">
            {filteredIcons.map(icon => (
              <Pressable
                key={icon.name}
                className="w-[30%] items-center mb-4 p-3 bg-white rounded-lg shadow-sm"
                onPress={() => {
                  // 可以添加复制图标名称的功能
                  console.log('图标名称:', icon.name);
                }}
              >
                <View className="w-16 h-16 items-center justify-center mb-2 bg-gray-50 rounded-lg">
                  <IconFont
                    name={icon.name}
                    size={selectedSize}
                    color={selectedColor}
                  />
                </View>
                <Text className="text-xs text-gray-700 text-center mb-1 font-medium">
                  {icon.name}
                </Text>
                <Text className="text-xs text-gray-500 text-center">
                  {icon.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* 空状态 */}
      {filteredIcons.length === 0 && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-400 text-lg mb-2">未找到匹配的图标</Text>
          <Text className="text-gray-400 text-sm">尝试使用其他关键词搜索</Text>
        </View>
      )}
    </View>
  );
}
