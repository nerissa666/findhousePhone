/**
 * IconFont 使用示例
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconFont from './IconFont';

export function IconFontExample(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>IconFont 使用示例</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>基础使用</Text>
        <View style={styles.row}>
          <IconFont name="edit" size={24} color="#333" />
          <IconFont name="message" size={24} color="#6200ee" />
          <IconFont name="share" size={24} color="#21b97a" />
          <IconFont name="map" size={24} color="#ff6b6b" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>不同大小</Text>
        <View style={styles.row}>
          <IconFont name="findHouse" size={16} color="#333" />
          <IconFont name="findHouse" size={24} color="#333" />
          <IconFont name="findHouse" size={32} color="#333" />
          <IconFont name="findHouse" size={40} color="#333" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>在按钮中使用</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button}>
            <IconFont name="add" size={20} color="#fff" />
            <Text style={styles.buttonText}>添加</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <IconFont name="share" size={20} color="#fff" />
            <Text style={styles.buttonText}>分享</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>常用图标</Text>
        <View style={styles.iconGrid}>
          <View style={styles.iconItem}>
            <IconFont name="house" size={24} color="#333" />
            <Text style={styles.iconLabel}>房子</Text>
          </View>
          <View style={styles.iconItem}>
            <IconFont name="back" size={24} color="#333" />
            <Text style={styles.iconLabel}>返回</Text>
          </View>
          <View style={styles.iconItem}>
            <IconFont name="arrow" size={24} color="#333" />
            <Text style={styles.iconLabel}>箭头</Text>
          </View>
          <View style={styles.iconItem}>
            <IconFont name="seach" size={24} color="#333" />
            <Text style={styles.iconLabel}>搜索</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#21b97a',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
    gap: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  iconItem: {
    alignItems: 'center',
    width: 80,
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
});
