import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Image, Pressable, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import api from '../services/api';
import { userApi } from '../services/apiService';
import { colors } from '../theme/colors';
import { fontSize, spacing, borderRadius } from '../theme';
import { IMAGE_BASE_URL } from '../config/env';
import { Chip, Button, FAB } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Icon } from 'react-native-paper';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export interface HouseDetail {
  houseImg: string | string[];
  title: string;
  tags: string[];
  price: number;
  desc: string;
  houseCode: string;
  roomType?: string;
  size?: number;
  renovation?: string;
  oriented?: string[];
  floor?: string;
  community?: string;
  coord?: {
    latitude: string;
    longitude: string;
  };
  supporting?: string[];
  description?: string;
}

export function DetailsScreen({
  route,
  navigation,
}: DetailsScreenProps): React.JSX.Element {
  const { houseCode, itemId, title } = route.params;
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [houseDetail, setHouseDetail] = useState<HouseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    const fetchHouseDetail = async () => {
      if (!houseCode) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await api.get<{ body?: HouseDetail } | HouseDetail>(`/houses/${houseCode}`);
        const data = (res as any).body || res;
        setHouseDetail(data as HouseDetail);
      } catch (error) {
        Alert.alert('错误', error instanceof Error ? error.message : '获取房屋详情失败');
      } finally {
        setLoading(false);
      }
    };

    fetchHouseDetail();
  }, [houseCode]);

  const getImageUri = (houseImg: string | string[] | null | undefined): string => {
    if (!houseImg) {
      return 'https://via.placeholder.com/300x300?text=No+Image';
    }
    const img = Array.isArray(houseImg) ? houseImg[0] : houseImg;
    if (img.startsWith('http://') || img.startsWith('https://')) {
      return img;
    }
    return `${IMAGE_BASE_URL}${img.startsWith('/') ? img : `/${img}`}`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryLighterprimary} />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  if (!houseDetail) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorText}>未找到房屋信息</Text>
        </View>
      </View>
    );
  }

  const imageUri = getImageUri(houseDetail.houseImg);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{houseDetail.title}</Text>
            {isAuthenticated && (
              <Pressable
                onPress={handleToggleFavorite}
                disabled={favoriteLoading}
                style={styles.favoriteButton}
              >
                <Icon
                  source={isFavorite ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite ? '#ff4444' : colors.textSecondary}
                />
              </Pressable>
            )}
          </View>

        <View style={styles.tagsContainer}>
          {houseDetail.tags.map((tag, index) => (
            <Chip
              key={`tag-${index}-${tag}`}
              compact
              style={styles.chip}
              textStyle={styles.chipText}
            >
              {tag}
            </Chip>
          ))}
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            <Text style={styles.priceValue}>{houseDetail.price}</Text>元/月
          </Text>
        </View>

        {houseDetail.roomType && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>房型：</Text>
            <Text style={styles.infoValue}>{houseDetail.roomType}</Text>
          </View>
        )}

        {houseDetail.size && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>面积：</Text>
            <Text style={styles.infoValue}>{houseDetail.size}平米</Text>
          </View>
        )}

        {houseDetail.renovation && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>装修：</Text>
            <Text style={styles.infoValue}>{houseDetail.renovation}</Text>
          </View>
        )}

        {houseDetail.oriented && houseDetail.oriented.length > 0 && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>朝向：</Text>
            <Text style={styles.infoValue}>{houseDetail.oriented.join('、')}</Text>
          </View>
        )}

        {houseDetail.floor && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>楼层：</Text>
            <Text style={styles.infoValue}>{houseDetail.floor}</Text>
          </View>
        )}

        {houseDetail.community && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>小区：</Text>
            <Text style={styles.infoValue}>{houseDetail.community}</Text>
          </View>
        )}

        {houseDetail.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>房源描述</Text>
            <Text style={styles.description}>{houseDetail.description}</Text>
          </View>
        )}

        {houseDetail.supporting && houseDetail.supporting.length > 0 && (
          <View style={styles.supportingContainer}>
            <Text style={styles.supportingTitle}>房屋配套</Text>
            <View style={styles.supportingList}>
              {houseDetail.supporting.map((item, index) => (
                <Text key={`supporting-${index}`} style={styles.supportingItem}>
                  {item}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>
      </ScrollView>
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
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: colors.bgSecondary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: spacing.md,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    flex: 1,
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  favoriteButton: {
    padding: spacing.xs,
    marginLeft: spacing.sm,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
    gap: spacing.xs,
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
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  chipText: {
    fontSize: 10,
    lineHeight: 10,
    margin: 0,
    padding: 0,
    color: colors.primaryLighterprimary,
  },
  priceContainer: {
    marginBottom: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.borderLight,
  },
  price: {
    fontSize: fontSize.lg,
    color: colors.primaryLighterprimary,
    fontWeight: '600',
  },
  priceValue: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  infoLabel: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    width: 80,
  },
  infoValue: {
    fontSize: fontSize.base,
    color: colors.textPrimary,
    flex: 1,
  },
  descriptionContainer: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.md,
  },
  descriptionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: fontSize.base,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  supportingContainer: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.bgSecondary,
    borderRadius: borderRadius.md,
  },
  supportingTitle: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  supportingList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  supportingItem: {
    fontSize: fontSize.base,
    color: colors.textPrimary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    backgroundColor: colors.bgPrimary,
    borderRadius: borderRadius.sm,
  },
  errorText: {
    fontSize: fontSize.base,
    color: colors.error,
    textAlign: 'center',
  },
});
