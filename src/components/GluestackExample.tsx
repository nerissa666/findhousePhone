/**
 * Gluestack UI 组件使用示例
 * 演示常用的 Gluestack UI 组件
 */

import React from 'react';
import {
  Box,
  Text,
  Button,
  ButtonText,
  VStack,
  HStack,
  Input,
  InputField,
  Heading,
  Divider,
  Badge,
  BadgeText,
  Pressable,
  Card,
} from '@gluestack-ui/themed';
import { useAppSelector } from '../store/hooks';

export function GluestackExample(): React.JSX.Element {
  const count = useAppSelector(state => state.counter.value);

  return (
    <Card
      p="$4"
      m="$2"
      borderRadius="$lg"
      bg="$white"
      shadowColor="$black"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={3.84}
      elevation={5}
    >
      <VStack space="md">
        <Heading size="md" color="$primary600">
          Gluestack UI 组件示例
        </Heading>

        <Divider />

        {/* 文本和标题 */}
        <VStack space="sm">
          <Text size="lg" fontWeight="$bold">
            文本组件
          </Text>
          <Text>普通文本</Text>
          <Text color="$primary600">主色文本</Text>
          <Text size="sm" color="$gray500">
            小号灰色文本
          </Text>
        </VStack>

        <Divider />

        {/* 按钮 */}
        <VStack space="sm">
          <Text size="lg" fontWeight="$bold">
            按钮组件
          </Text>
          <HStack space="sm">
            <Button size="sm" variant="solid" action="primary">
              <ButtonText>主要</ButtonText>
            </Button>
            <Button size="sm" variant="outline" action="secondary">
              <ButtonText>次要</ButtonText>
            </Button>
            <Button size="sm" variant="solid" action="positive">
              <ButtonText>成功</ButtonText>
            </Button>
          </HStack>
        </VStack>

        <Divider />

        {/* 输入框 */}
        <VStack space="sm">
          <Text size="lg" fontWeight="$bold">
            表单组件
          </Text>
          <Input variant="outline" size="md">
            <InputField placeholder="请输入用户名" />
          </Input>
          <Input variant="outline" size="md">
            <InputField type="password" placeholder="请输入密码" />
          </Input>
        </VStack>

        <Divider />

        {/* Badge 和状态 */}
        <VStack space="sm">
          <Text size="lg" fontWeight="$bold">
            徽章和状态
          </Text>
          <HStack space="sm" alignItems="center">
            <Badge action="success" variant="solid">
              <BadgeText>成功</BadgeText>
            </Badge>
            <Badge action="error" variant="solid">
              <BadgeText>错误</BadgeText>
            </Badge>
            <Badge action="warning" variant="solid">
              <BadgeText>警告</BadgeText>
            </Badge>
            <Badge action="info" variant="solid">
              <BadgeText>信息</BadgeText>
            </Badge>
          </HStack>
          <Text>
            Redux 计数器值: <Text fontWeight="$bold">{count}</Text>
          </Text>
        </VStack>

        <Divider />

        {/* 可点击区域 */}
        <VStack space="sm">
          <Text size="lg" fontWeight="$bold">
            交互组件
          </Text>
          <Pressable
            onPress={() => console.log('Pressed!')}
            bg="$primary100"
            p="$3"
            borderRadius="$md"
          >
            <Text color="$primary700" textAlign="center">
              点击我
            </Text>
          </Pressable>
        </VStack>

        {/* Tailwind 类名示例（如果配置了 NativeWind） */}
        <Divider />
        <VStack space="sm">
          <Text size="lg" fontWeight="$bold">
            Tailwind CSS 支持
          </Text>
          <Box p="$4" bg="$blue100" borderRadius="$md">
            <Text size="lg" fontWeight="$bold" color="$blue800">
              使用 Gluestack UI 属性
            </Text>
          </Box>
        </VStack>
      </VStack>
    </Card>
  );
}
