import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { Button } from 'react-native-paper';
import { launchImageLibrary, MediaType, ImagePickerResponse, Asset } from 'react-native-image-picker';
import api from '../services/api';
import { colors } from '../theme/colors';
import { fontSize, spacing, borderRadius } from '../theme';
import IconFont from '../components/IconFont';
import { getImageUrl } from '../utils/image';
import { useParams } from '@/hooks/usePublishHouseParams';
import { supportingIconMap } from '@/constants/consts';
interface FormData {
  title: string;
  community: string;
  communityCode: string;
  price: string;
  size: string;
  roomType: string;
  floor: string;
  oriented: string;
  supporting: string[];
  description: string;
  houseImg: string[];
  line: string;
}

interface CommunityItem {
  community: string;
  communityName: string;
  city: string;
  cityName: string;
  area: string;
  areaName: string;
  street: string;
  streetName: string;
}

export default () => {
  // const { currentCity } = useCityStore();
  const { params, loading: paramsLoading, error: paramsError } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    community: '',
    communityCode: '',
    price: '',
    size: '',
    roomType: '',
    floor: '',
    oriented: '',
    supporting: [],
    description: '',
    houseImg: [],
    line: 'true',
  });
  const [communitySearchText, setCommunitySearchText] = useState('');
  const [communityOptions, setCommunityOptions] = useState<CommunityItem[]>([]);
  const debounceTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSettingCommunityRef = React.useRef(false);

  useEffect(() => {
    if (paramsError) {
      Alert.alert('错误', paramsError);
    }
  }, [paramsError]);

  useEffect(() => {
    if (isSettingCommunityRef.current) {
      isSettingCommunityRef.current = false;
      return
    }

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!communitySearchText.trim()) {
      setCommunityOptions([]);
      return;
    }

    debounceTimerRef.current = setTimeout(async () => {
      try {
        const res = await api.get<CommunityItem[]>('/area/community', {
          params: { name: communitySearchText.trim(), id: 'AREA|88cff55c-aaa4-e2e0' },
        });
        setCommunityOptions(res || []);
      } catch (error) {
        setCommunityOptions([]);
        Alert.alert('错误', error instanceof Error ? error.message : '搜索社区失败');
      }
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [communitySearchText]);

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'community') {
      setCommunitySearchText(value);
    }
  }, []);

  const handleCommunitySelect = useCallback((community: CommunityItem) => {
    setFormData(prev => ({
      ...prev,
      community: community.communityName,
      communityCode: community.community,
    }));
    isSettingCommunityRef.current = true;
    setCommunitySearchText(community.communityName);
    setCommunityOptions([]);
  }, []);

  const handlePickerSelect = useCallback((type: 'roomType' | 'floor' | 'oriented', value: string) => {
    setFormData(prev => ({ ...prev, [type]: value }));
  }, []);

  const handleSupportingToggle = useCallback((value: string) => {
    setFormData(prev => {
      const index = prev.supporting.indexOf(value);
      if (index > -1) {
        return {
          ...prev,
          supporting: prev.supporting.filter(v => v !== value),
        };
      } else {
        return {
          ...prev,
          supporting: [...prev.supporting, value],
        };
      }
    });
  }, []);

  const handlePickImage = useCallback(() => {
    launchImageLibrary(
      {
        mediaType: 'mixed' as MediaType,
        quality: 0.8,
        selectionLimit: 9 - formData.houseImg.length,
      },
      async (response: ImagePickerResponse) => {
        if (response.didCancel || !response.assets || response.assets.length === 0) {
          return;
        }

        const uploadPromises = response.assets.map(async (asset: Asset) => {
          try {
            if (!asset.uri) return null;

            const uploadFormData = new FormData();
            const fileUri = asset.uri;
            const fileName = asset.fileName || fileUri.split('/').pop() || `image_${Date.now()}.jpg`;
            const fileType = asset.type || 'image/jpeg';

            uploadFormData.append('file', {
              uri: fileUri,
              type: fileType,
              name: fileName,
            } as any);

            const res = await (api.post as any)('/houses/image', uploadFormData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });

            let imageUrl: string;
            if (Array.isArray(res)) {
              imageUrl = res[0];
            } else if (res?.body && Array.isArray(res.body)) {
              imageUrl = res.body[0];
            } else if (res?.body && typeof res.body === 'string') {
              imageUrl = res.body;
            } else if (typeof res === 'string') {
              imageUrl = res;
            } else {
              imageUrl = (res as any)?.data?.[0] || (res as any)?.[0] || '';
            }

            if (!imageUrl) {
              return null;
            }

            const fullImageUrl = getImageUrl(imageUrl);
            return fullImageUrl;
          } catch (error) {
            Alert.alert('错误', error instanceof Error ? error.message : '图片上传失败，请重试');
            return null;
          }
        });

        const uploadedUrls = await Promise.all(uploadPromises);
        const validUrls = uploadedUrls.filter((url: string | null): url is string => url !== null);

        if (validUrls.length > 0) {
          setFormData(prev => ({
            ...prev,
            houseImg: [...prev.houseImg, ...validUrls],
          }));
        }
      }
    );
  }, [formData.houseImg.length]);

  const handleRemoveImage = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      houseImg: prev.houseImg.filter((_, i) => i !== index),
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!formData.title) {
      Alert.alert('提示', '请输入标题');
      return;
    }
    if (!formData.community) {
      Alert.alert('提示', '请输入小区名称');
      return;
    }
    if (!formData.price) {
      Alert.alert('提示', '请输入租金');
      return;
    }
    if (!formData.size) {
      Alert.alert('提示', '请输入建筑面积');
      return;
    }

    try {
      setLoading(true);
      if (!formData.communityCode) {
        Alert.alert('提示', '请选择小区');
        return;
      }
      const submitData: Record<string, any> = {
        title: formData.title,
        description: formData.description || '',
        community: formData.communityCode,
        price: String(formData.price),
        size: String(formData.size),
        roomType: formData.roomType || null,
        floor: formData.floor || null,
        oriented: formData.oriented || null,
        supporting: formData.supporting.length > 0 ? formData.supporting.join('|') : '',
        houseImg: formData.houseImg.length > 0 ? formData.houseImg.join('|') : '',
        line: formData.line || 'true',
      };
      await api.post('/user/houses', submitData);
      Alert.alert('成功', '房源发布成功', [
        { text: '确定', onPress: () => { } },
      ]);
    } catch (error: any) {
      Alert.alert('错误', error instanceof Error ? error.message : '发布房源失败，请重试');
    } finally {
      setLoading(false);
    }
  }, [formData]);

  const handleReset = useCallback(() => {
    setFormData({
      title: '',
      community: '',
      communityCode: '',
      price: '',
      size: '',
      roomType: '',
      floor: '',
      oriented: '',
      supporting: [],
      description: '',
      houseImg: [],
      line: 'true',
    });
    setCommunitySearchText('');
    setCommunityOptions([]);
  }, []);



  if (paramsLoading && !params) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primaryLighterprimary} />
        <Text style={styles.loadingText}>加载中...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.formItem}>
          <Text style={styles.label}>标题</Text>
          <TextInput
            style={styles.input}
            placeholder="请输入标题，例如：整租 小区名 2室 5000元"
            value={formData.title}
            onChangeText={(value) => handleInputChange('title', value)}
            maxLength={100}
          />
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>小区名称</Text>
          <View style={styles.communityContainer}>
            <TextInput
              style={styles.input}
              placeholder="请输入小区名称搜索"
              value={communitySearchText}
              onChangeText={setCommunitySearchText}
            />
            {communityOptions.length > 0 && (
              <View style={styles.communityDropdown}>
                {communityOptions.map((item, index) => (
                  <Pressable
                    key={`${item.community}-${index}`}
                    style={styles.communityDropdownItem}
                    onPress={() => handleCommunitySelect(item)}
                  >
                    <Text style={styles.communityDropdownItemText}>
                      {item.communityName}
                    </Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>租金</Text>
          <View style={styles.inputWithUnit}>
            <TextInput
              style={[styles.input, styles.inputWithUnitInput]}
              placeholder="请输入租金"
              value={formData.price}
              onChangeText={(value) => handleInputChange('price', value)}
              keyboardType="numeric"
            />
            <Text style={styles.unit}>￥/月</Text>
          </View>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>建筑面积</Text>
          <View style={styles.inputWithUnit}>
            <TextInput
              style={[styles.input, styles.inputWithUnitInput]}
              placeholder="请输入建筑面积"
              value={formData.size}
              onChangeText={(value) => handleInputChange('size', value)}
              keyboardType="numeric"
            />
            <Text style={styles.unit}>㎡</Text>
          </View>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>户型</Text>
          <View style={styles.optionsContainer}>
            {params?.roomType.map((option) => {
              const isSelected = formData.roomType === option.value;
              return (
                <Pressable
                  key={option.value}
                  style={[
                    styles.optionChip,
                    isSelected && styles.optionChipSelected,
                  ]}
                  onPress={() => handlePickerSelect('roomType', option.value)}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      isSelected && styles.optionChipTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>楼层</Text>
          <View style={styles.optionsContainer}>
            {params?.floor.map((option) => {
              const isSelected = formData.floor === option.value;
              return (
                <Pressable
                  key={option.value}
                  style={[
                    styles.optionChip,
                    isSelected && styles.optionChipSelected,
                  ]}
                  onPress={() => handlePickerSelect('floor', option.value)}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      isSelected && styles.optionChipTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>朝向</Text>
          <View style={styles.optionsContainer}>
            {params?.oriented.map((option) => {
              const isSelected = formData.oriented === option.value;
              return (
                <Pressable
                  key={option.value}
                  style={[
                    styles.optionChip,
                    isSelected && styles.optionChipSelected,
                  ]}
                  onPress={() => handlePickerSelect('oriented', option.value)}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      isSelected && styles.optionChipTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>房屋配套</Text>
          <View style={styles.supportingContainer}>
            {params?.supporting.map((option) => {
              const isSelected = formData.supporting.includes(option.value);
              const iconName = supportingIconMap[option.label] || 'house';
              return (
                <Pressable
                  key={option.value}
                  style={[
                    styles.supportingItem,
                    isSelected && styles.supportingItemSelected,
                  ]}
                  onPress={() => handleSupportingToggle(option.value)}
                >
                  <View style={styles.supportingIconContainer}>
                    <IconFont
                      name={iconName}
                      size={20}
                      color={isSelected ? colors.primaryLighterprimary : colors.textSecondary}
                    />
                  </View>
                  <Text
                    style={[
                      styles.supportingText,
                      isSelected && styles.supportingTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>房屋图片/视频</Text>
          <View style={styles.imageContainer}>
            {formData.houseImg.map((url, index) => {
              const imageUri = getImageUrl(url);
              return (
                <View key={`${url}-${index}`} style={styles.imageItem}>
                  <Image source={{ uri: imageUri }} style={styles.image} />
                  <Pressable
                    style={styles.removeImageButton}
                    onPress={() => handleRemoveImage(index)}
                  >
                    <Text style={styles.removeImageText}>×</Text>
                  </Pressable>
                </View>
              );
            })}
            <Pressable style={styles.addImageButton} onPress={handlePickImage}>
              <IconFont name="add" size={24} color={colors.textSecondary} />
              <Text style={styles.addImageText}>添加</Text>
            </Pressable>
          </View>
        </View>

        <View style={[styles.formItem, styles.lastFormItem]}>
          <Text style={styles.label}>房屋描述</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="请输入房屋描述"
            value={formData.description}
            onChangeText={(value) => handleInputChange('description', value)}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          mode="outlined"
          onPress={handleReset}
          style={styles.resetButton}
          textColor={colors.primaryLighterprimary}
        >
          取消
        </Button>
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitButton}
          buttonColor={colors.primaryLighterprimary}
          textColor={colors.textWhite}
          loading={loading}
        >
          提交
        </Button>
      </View>

    </View>
  );
};

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
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 0,
  },
  formItem: {
    marginBottom: 0,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.bgPrimary,
  },
  lastFormItem: {
    borderBottomWidth: 0,
  },
  label: {
    fontSize: fontSize.base,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  input: {
    paddingHorizontal: 0,
    paddingVertical: spacing.sm,
    fontSize: fontSize.base,
    color: colors.textPrimary,
    backgroundColor: 'transparent',
  },
  placeholder: {
    color: colors.textTertiary,
  },
  inputWithUnit: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  inputWithUnitInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  unit: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
  },
  pickerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    paddingVertical: spacing.sm,
    backgroundColor: 'transparent',
  },
  arrow: {
    fontSize: fontSize.xl,
    color: colors.textTertiary,
    marginLeft: spacing.sm,
  },
  textArea: {
    minHeight: 100,
    paddingTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.md,
    gap: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
    backgroundColor: colors.bgPrimary,
  },
  resetButton: {
    flex: 1,
    borderColor: colors.primaryLighterprimary,
  },
  submitButton: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: colors.bgPrimary,
    margin: spacing.lg,
    borderRadius: borderRadius.lg,
    maxHeight: '75%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
    backgroundColor: colors.bgPrimary,
  },
  modalTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  modalCloseButton: {
    padding: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  modalScrollView: {
    maxHeight: 400,
  },
  modalScrollContent: {
    paddingBottom: 0,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
    minHeight: 56,
  },
  lastOptionItem: {
    borderBottomWidth: 0,
  },
  optionItemSelected: {
    backgroundColor: colors.primaryLighter,
  },
  optionText: {
    fontSize: fontSize.base,
    color: colors.textPrimary,
    flex: 1,
  },
  optionTextSelected: {
    color: colors.primaryLighterprimary,
    fontWeight: '600',
  },
  checkmarkContainer: {
    marginLeft: spacing.md,
  },
  communityContainer: {
    position: 'relative',
  },
  communityDropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.bgPrimary,
    borderRadius: borderRadius.md,
    marginTop: 4,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  communityDropdownItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  communityDropdownItemText: {
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  supportingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  supportingItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    minWidth: 70,
  },
  supportingItemSelected: {
  },
  supportingIconContainer: {
    marginBottom: spacing.xs / 2,
  },
  supportingText: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  supportingTextSelected: {
    color: colors.primaryLighterprimary,
    fontWeight: '600',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  optionChip: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.bgPrimary,
  },
  optionChipSelected: {
    borderColor: colors.primaryLighterprimary,
    backgroundColor: colors.primaryLighter,
  },
  optionChipText: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  optionChipTextSelected: {
    color: colors.primaryLighterprimary,
    fontWeight: '600',
  },
  selectedCommunity: {
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
  },
  selectedCommunityText: {
    fontSize: fontSize.sm,
    color: colors.primaryLighterprimary,
    fontWeight: '600',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  imageItem: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: colors.textWhite,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  addImageButton: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgPrimary,
  },
  addImageText: {
    marginTop: spacing.xs,
    fontSize: fontSize.xs,
    color: colors.textSecondary,
  },
});
