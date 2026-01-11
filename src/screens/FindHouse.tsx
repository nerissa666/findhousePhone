import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Pressable, Alert } from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { TabParamList } from '../navigation/AppNavigator';
import { GluestackImage } from '../components/ui';
import { Chip, FAB } from 'react-native-paper';
import api from '../services/api';
import { House, HouseQueryParams, HouseListResponse } from '@/types/api';
import { colors } from '../theme/colors';
import { IMAGE_BASE_URL } from '../config/env';
import SearchBarNav from '../components/SearchBarNav';
import CityPicker from '../components/CityPicker';
import HouseFilter, { FilterValues } from '../components/HouseFilter';
import { City } from '../types/cpnts';
import { Icon } from 'react-native-paper';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { setCurrentCity } from '../store/slices/citySlice';

type FindHouseNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type FindHouseRouteProp = BottomTabScreenProps<TabParamList, 'FindHouse'>['route'];

export default () => {
  const navigation = useNavigation<FindHouseNavigationProp>();
  const route = useRoute<FindHouseRouteProp>();
  const routeParams = route.params;
  const dispatch = useAppDispatch();
  const storeCurrentCity = useAppSelector(state => state.city.currentCity);
  
  // 使用本地 state 管理当前城市，初始值从 store 获取
  const [selectedCity, setSelectedCity] = useState<City>(storeCurrentCity);
  // 使用 ref 保存最新的城市，用于离开页面时同步
  const selectedCityRef = useRef<City>(storeCurrentCity);

  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [citySearchResults, setCitySearchResults] = useState<City[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterValues, setFilterValues] = useState<FilterValues>({
    rentType: routeParams?.rentType || null,
    price: null,
    roomType: null,
    oriented: null,
    floor: null,
    characteristic: null,
    area: null,
    subway: null,
  });
  const total = useRef<number>(0);
  const currentPage = useRef<number>(1);
  const pageSize = 20;
  const loadingMoreRef = useRef<boolean>(false);
  const flatListRef = useRef<FlatList>(null);

  const loadHousesRef = useRef<((isRefresh?: boolean) => Promise<void>) | null>(null);

  loadHousesRef.current = async (isRefresh = false) => {
    if (loading || loadingMore || loadingMoreRef.current) {
      return;
    }

    if (isRefresh) {
      setLoading(true);
      currentPage.current = 1;
    } else {
      setLoadingMore(true);
      loadingMoreRef.current = true;
    }

    try {
      const moreParts: string[] = [];

      const params: HouseQueryParams = {
        cityId: selectedCity.value,
        start: currentPage.current * pageSize + 1,
        end: (currentPage.current + 1) * pageSize,
      };

      if (filterValues.rentType && filterValues.rentType !== 'null') {
        params.rentType = filterValues.rentType === 'true';
        moreParts.push(filterValues.rentType);
      }
      if (filterValues.price && filterValues.price !== 'null') {
        params.price = Number(filterValues.price.replace('PRICE|', ''));
        moreParts.push(filterValues.price);
      }
      if (filterValues.roomType && filterValues.roomType !== 'null') {
        params.roomType = filterValues.roomType;
        moreParts.push(filterValues.roomType);
      }
      if (filterValues.oriented && filterValues.oriented !== 'null') {
        params.oriented = filterValues.oriented;
        moreParts.push(filterValues.oriented);
      }
      if (filterValues.floor && filterValues.floor !== 'null') {
        params.floor = filterValues.floor;
        moreParts.push(filterValues.floor);
      }
      if (filterValues.characteristic && filterValues.characteristic !== 'null') {
        params.characteristic = filterValues.characteristic;
        moreParts.push(filterValues.characteristic);
      }
      if (filterValues.area && filterValues.area !== 'null') {
        params.area = filterValues.area;
        moreParts.push(filterValues.area);
      }
      if (filterValues.subway && filterValues.subway !== 'null') {
        params.subway = filterValues.subway;
        moreParts.push(filterValues.subway);
      }
      if (moreParts.length > 0) {
        params.more = moreParts.join(',');
      }

      const { list, count } = await api.get<HouseListResponse>('/houses', { params });
      total.current = count;

      if (isRefresh) {
        setHouses(list);
        if (list.length === 0) {
          return;
        }
      } else {
        if (list.length === 0) {
          return;
        }
        setHouses(prev => {
          const existingCodes = new Set(prev.map(h => h.houseCode));
          const newHouses = list.filter(h => !existingCodes.has(h.houseCode));
          return [...prev, ...newHouses];
        });
      }

      currentPage.current += 1;
    } catch (error) {
      Alert.alert('错误', error instanceof Error ? error.message : '加载房屋列表失败');
    } finally {
      setLoading(false);
      setLoadingMore(false);
      loadingMoreRef.current = false;
    }
  };

  useEffect(() => {
    if (showCityPicker) {
      return;
    }
    currentPage.current = 1;
    loadHousesRef.current?.(true);
  }, [
    selectedCity.value,
    searchText,
    showCityPicker,
    filterValues.rentType,
    filterValues.price,
    filterValues.roomType,
    filterValues.oriented,
    filterValues.floor,
    filterValues.characteristic,
    filterValues.area,
    filterValues.subway,
  ]);

  useEffect(() => {
    // 当 showCityPicker 变化时，清空输入框内容
    setSearchText('');
  }, [showCityPicker]);

  useEffect(() => {
    // 当路由参数变化时，更新筛选条件
    if (routeParams?.rentType !== undefined) {
      setFilterValues(prev => ({
        ...prev,
        rentType: routeParams.rentType || null,
      }));
    }
  }, [routeParams?.rentType]);

  const getImageUri = useCallback((houseImg: string | null | undefined): string => {
    if (!houseImg) {
      return 'https://via.placeholder.com/300x300?text=No+Image';
    }
    if (houseImg.startsWith('http://') || houseImg.startsWith('https://')) {
      return houseImg;
    }
    return `${IMAGE_BASE_URL}${houseImg.startsWith('/') ? houseImg : `/${houseImg}`}`;
  }, []);

  const renderItem = useCallback(({ item }: { item: House }) => {
    const imageUri = getImageUri(item.houseImg);

    return (
      <Pressable
        className='flex-row gap-3 bg-white p-3 border-b border-[#f0f0f0]'
        onPress={() => {
          navigation.navigate('Details', { houseCode: item.houseCode });
        }}
      >
        <GluestackImage
          source={{ uri: imageUri }}
          alt="house image"
          className="w-1/3 aspect-square rounded py-2"
          resizeMode="cover"
        />
        <View className='flex-1 flex-col gap-4 '>
          <Text
            className='text-[15px] font-medium'
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.title}
          </Text>
          <Text className='text-[13px] text-[#999]'>{item.desc}</Text>
          <View className='flex-row gap-2 flex-wrap'>
            {
              item.tags.map((tag, index) => (
                <Chip
                  key={`${item.houseCode}-tag-${index}-${tag}`}
                  compact
                  style={styles.chip}
                  textStyle={styles.chipText}
                  children={tag}
                />
              ))
            }
          </View>
          <Text className='text-custom-red font-medium text-xs'><Text className='text-base'>{item.price}</Text>元/月</Text>
        </View>
      </Pressable>
    );
  }, [getImageUri, navigation]);

  const handleScroll = useCallback((event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollTop(offsetY > 300);
  }, []);

  const scrollToTop = useCallback(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, []);

  const handleLoadMore = useCallback(() => {
    if (loadingMoreRef.current) {
      return;
    }

    if (houses.length >= total.current && total.current > 0) {
      return;
    }

    if (!loadingMore && !loading && houses.length > 0) {
      if (loadHousesRef.current) {
        loadHousesRef.current(false);
      }
    }
  }, [loadingMore, loading, houses.length]);

  const ListFooterComponent = useMemo(() => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={colors.primaryLighterprimary} />
        <Text style={styles.footerText}>加载更多...</Text>
      </View>
    );
  }, [loadingMore]);

  const ListEmptyComponent = useMemo(() => {
    if (loading) return null;
    return (
      <View style={styles.empty}>
        <View style={styles.emptyIconContainer}>
          <Icon source="inbox-outline" size={64} color={colors.primaryLight} />
        </View>
        <Text style={styles.emptyTitle}>暂无房源</Text>
        <Text style={styles.emptyText}>换个城市或搜索条件试试吧</Text>
      </View>
    );
  }, [loading]);

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const handleLocationPress = useCallback(() => {
    navigation.navigate('MyMap');
  }, [navigation]);

  const handleCitySelect = useCallback(
    (city: City) => {
      setSelectedCity(city);
      selectedCityRef.current = city;
    },
    []
  );

  // 当用户离开页面时，将当前城市同步到 store
  useFocusEffect(
    useCallback(() => {
      return () => {
        // 页面失去焦点时（离开页面），同步到 store
        dispatch(setCurrentCity(selectedCityRef.current));
      };
    }, [dispatch])
  );

  if (loading && houses.length === 0) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primaryLighterprimary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBarNav
          placeholder={showCityPicker ? '搜索城市' : '搜索小区'}
          value={searchText}
          onChangeText={setSearchText}
          onSearch={handleSearch}
          cityName={selectedCity.label}
          onCityPress={() => setShowCityPicker(true)}
          isFocused={showCityPicker}
          onPress={() => setShowCityPicker(false)}
          onBackPress={() => {
            if (showCityPicker) {
              setShowCityPicker(false);
            }
          }}
          showCityPicker={showCityPicker}
          selectedCity={selectedCity}
          onCitySearchResult={(cities) => {
            setCitySearchResults(cities);
          }}
          rightIcons={[
            {
              name: 'filter',
              onPress: () => setShowFilter(true),
              color: colors.textPrimary,
            },
            {
              name: 'map',
              onPress: handleLocationPress,
              color: colors.textPrimary,
            },
          ]}
        />
        <CityPicker
          visible={showCityPicker}
          onClose={() => {
            setShowCityPicker(false);
            setCitySearchResults([]);
            setSearchText('');
          }}
          onSelect={handleCitySelect}
          currentCity={selectedCity}
          {...(citySearchResults.length > 0 && { data: citySearchResults })}
        />
        <HouseFilter
          visible={showFilter}
          onClose={() => setShowFilter(false)}
          onConfirm={(filters) => {
            setFilterValues(filters);
            currentPage.current = 1;
            loadHousesRef.current?.(true);
          }}
          cityId={selectedCity.value}
          initialFilters={filterValues}
        />
      </View>
      <FlatList
        ref={flatListRef}
        data={houses}
        renderItem={renderItem}
        keyExtractor={(item) => item.houseCode}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        maintainVisibleContentPosition={null}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
      />
      {(showScrollTop || showCityPicker) && (
        <FAB
          icon='arrow-up-bold'
          mode="flat"
          size="small"
          style={styles.fab}
          onPress={scrollToTop}
          color={colors.textTertiary}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: 'relative',
    zIndex: 1000,
  },
  chip: {
    alignSelf: 'flex-start',
    padding: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    minWidth: 0,
    minHeight: 0,
    backgroundColor: colors.primaryLighter,
  },
  chipText: {
    fontSize: 10,
    lineHeight: 10,
    margin: 0,
    padding: 0,
    color: colors.primaryLighterprimary,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    minHeight: 400,
  },
  emptyIconContainer: {
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  emptyText: {
    color: colors.textTertiary,
    fontSize: 14,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: 'transparent',
  },
});
