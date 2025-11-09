/**
 * Redux 使用示例组件
 * 演示如何在组件中使用 Redux 状态和 actions
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from '../store/slices/counterSlice';

export function CounterExample(): React.JSX.Element {
  // 使用类型安全的 hooks 获取状态和 dispatch
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redux 计数器示例</Text>
      <Text style={styles.counter}>{count}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.decrementButton]}
          onPress={() => dispatch(decrement())}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={() => dispatch(reset())}
        >
          <Text style={styles.buttonText}>重置</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.incrementButton]}
          onPress={() => dispatch(increment())}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.button, styles.amountButton]}
        onPress={() => dispatch(incrementByAmount(5))}
      >
        <Text style={styles.buttonText}>+5</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  counter: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  incrementButton: {
    backgroundColor: '#4caf50',
  },
  decrementButton: {
    backgroundColor: '#f44336',
  },
  resetButton: {
    backgroundColor: '#ff9800',
  },
  amountButton: {
    backgroundColor: '#2196f3',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
