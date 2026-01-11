import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import api from '../services/api';
import { House } from '../types/api';
import { colors } from '../theme/colors';
import { fontSize, spacing, borderRadius } from '../theme';
import { Chip } from 'react-native-paper';
import { getImageUrl } from '../utils/image';
import SearchBarNav from '../components/SearchBarNav';
import CityPicker from '../components/CityPicker';
import { City } from '../types/cpnts';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setCurrentCity } from '../store/slices/citySlice';

type MyMapScreenProps = NativeStackScreenProps<RootStackParamList, 'MyMap'>;

export default function MyMap({ navigation }: MyMapScreenProps) {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(state => state.city.currentCity);
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [citySearchResults, setCitySearchResults] = useState<City[]>([]);

  const loadHouses = useCallback(async () => {
    if (!selectedCity.value) return;

    try {
      setLoading(true);
      const res = await api.get<{ body?: House[] } | House[]>(`/area/map`, {
        params: { id: selectedCity.value },
      });
      const data = (res as any).body || res;
      setHouses(Array.isArray(data) ? data : []);
    } catch (error) {
      Alert.alert('错误', error instanceof Error ? error.message : '获取房源列表失败');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [selectedCity.value]);

  useEffect(() => {
    loadHouses();
  }, [loadHouses]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadHouses();
  }, [loadHouses]);

  const handleCitySelect = (city: City) => {
    dispatch(setCurrentCity(city));
    setShowCityPicker(false);
  };

  const handleCitySearchResult = (cities: City[]) => {
    setCitySearchResults(cities);
  };

  const handleHousePress = (house: House) => {
    navigation.navigate('Details', { houseCode: house.houseCode });
  };

  const renderItem = ({ item }: { item: House }) => {
    const imageUri = getImageUrl(item.houseImg);
    const validTags = (item.tags || []).filter(tag => tag).slice(0, 3);

    return (
      <Pressable
        style={styles.houseItem}
        onPress={() => handleHousePress(item)}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.houseImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.houseImage} />
        )}
        <View style={styles.houseInfo}>
          <Text style={styles.houseTitle} numberOfLines={1}>
            {item.title || '无标题'}
          </Text>
          {validTags.length > 0 && (
            <View style={styles.tagsContainer}>
              {validTags.map((tag, index) => (
                <Chip
                  key={`tag-${item.houseCode}-${index}-${tag}`}
                  compact
                  style={styles.tag}
                  textStyle={styles.tagText}
                >
                  {tag}
                </Chip>
              ))}
            </View>
          )}
          <Text style={styles.houseDesc} numberOfLines={2}>
            {item.desc}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>
              <Text style={styles.priceValue}>{item.price}</Text>元/月
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBarNav
        placeholder="搜索城市"
        showCityPicker={showCityPicker}
        selectedCity={selectedCity}
        onPress={() => setShowCityPicker(!showCityPicker)}
        onCitySearchResult={handleCitySearchResult}
      />
      {showCityPicker && (
        <CityPicker
          visible={showCityPicker}
          currentCity={selectedCity}
          onSelect={handleCitySelect}
          onClose={() => setShowCityPicker(false)}
          data={citySearchResults.length > 0 ? citySearchResults : []}
        />
      )}
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primaryLighterprimary} />
          <Text style={styles.loadingText}>加载中...</Text>
        </View>
      ) : (
        <FlatList
          data={houses}
          renderItem={renderItem}
          keyExtractor={(item) => item.houseCode}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primaryLighterprimary]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>该区域暂无房源</Text>
            </View>
          }
          contentContainerStyle={houses.length === 0 ? styles.emptyList : undefined}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgPrimary,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: fontSize.base,
    color: colors.textSecondary,
  },
  houseItem: {
    flexDirection: 'row',
    backgroundColor: colors.bgPrimary,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  houseImage: {
    width: 120,
    height: 120,
    backgroundColor: colors.bgSecondary,
  },
  houseInfo: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  houseTitle: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.xs,
  },
  tag: {
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    height: 20,
  },
  tagText: {
    fontSize: fontSize.xs,
  },
  houseDesc: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  price: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.primaryLighterprimary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyText: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
  },
  emptyList: {
    flexGrow: 1,
  },
});
