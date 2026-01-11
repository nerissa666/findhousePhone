/**
 * IconFont 图标组件
 * 基于 iconfont 字体文件
 */

import React from 'react';
import { Text, TextProps } from 'react-native';

// 图标名称到 Unicode 的映射
// 从 iconfont.css 中提取
export const iconMap: Record<string, string> = {
  edit: '\ue936',
  'head-bot': '\ue937',
  'head-top': '\ue938',
  Collection: '\ue939',
  ask: '\ue93a',
  message: '\ue93b',
  metro: '\ue933',
  report: '\ue932',
  maLoca: '\ue934',
  share: '\ue935',
  map: '\ue900',
  ind: '\ue901', // 首页
  my: '\ue902', // 我的
  mess: '\ue903',
  findHouse: '\ue904',
  arrow: '\ue905',
  seach: '\ue906',
  ref: '\ue907',
  vid: '\ue908',
  order: '\ue909',
  myinfo: '\ue90a',
  record: '\ue90b',
  cust: '\ue90c',
  air: '\ue90d',
  broadband: '\ue90e',
  gas: '\ue90f',
  Heat: '\ue910',
  eval: '\ue911',
  heater: '\ue912',
  sofa: '\ue913',
  set: '\ue914',
  identity: '\ue915',
  coll: '\ue916',
  wash: '\ue917',
  wardrobe: '\ue918',
  back: '\ue919',
  infom: '\ue91a',
  auth: '\ue91b',
  pic: '\ue91c',
  morey: '\ue91d',
  time: '\ue91f',
  ok: '\ue920',
  pho: '\ue921',
  cls: '\ue922',
  add: '\ue923',
  expression: '\ue924',
  problem: '\ue925',
  成交订单: '\ue926',
  error: '\ue927',
  backTop: '\ue928',
  backBot: '\ue929',
  backRit: '\ue92a',
  房子: '\ue92b',
  海外: '\ue92c',
  计算器: '\ue92d',
  箭头向上: '\ue92e',
  箭头向右: '\ue92f',
  箭头向左: '\ue930',
  house: '\ue931',
};

export interface IconFontProps extends Omit<TextProps, 'style'> {
  name: string; // 图标名称
  size?: number; // 图标大小，默认 16
  color?: string; // 图标颜色，默认 '#333'
  style?: TextProps['style']; // 自定义样式
}

/**
 * IconFont 图标组件
 * @param name - 图标名称（对应 iconfont.css 中的类名，去掉 .icon- 前缀）
 * @param size - 图标大小，默认 16
 * @param color - 图标颜色，默认 '#333'
 * @param style - 自定义样式
 */
export default function IconFont({
  name,
  size = 16,
  color = '#333',
  style,
  ...props
}: IconFontProps): React.JSX.Element {
  const unicode = iconMap[name];
  if (!unicode) {
    return <Text>?</Text>;
  }

  // 字体文件中的 Family Name 是 'icomoon'
  // iOS 上必须使用这个名称
  const fontFamily = 'icomoon';

  return (
    <Text
      style={[
        {
          fontFamily,
          fontStyle: 'normal',
          textAlign: 'center',
          fontSize: size,
          color,
        },
        style,
      ]}
      {...props}
    >
      {unicode}
    </Text>
  );
}

// 注意：如果 iconfont 不行，尝试将上面的 fontFamilyOptions[0] 改为 fontFamilyOptions[1] (icomoon)
