import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import News from '../components/News';

export default () => {
  return (
    <ScrollView style={styles.container} className="bg-white">
      <View style={styles.content}>
        <News />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});
