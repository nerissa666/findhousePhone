import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, Image } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type {
  RootStackParamList,
  TabParamList,
} from '../navigation/AppNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchUserInfo, logoutUser } from '../store/slices/userSlice';
import { colors } from '../theme/colors';
import { fontSize, spacing, borderRadius } from '../theme';
import { Button } from 'react-native-paper';
import { getImageUrl } from '../utils/image';

type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Profile'>,
  NativeStackScreenProps<RootStackParamList>
>;

export default function Profile({ navigation }: ProfileScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated, loading } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchUserInfo());
    }
  }, [isAuthenticated, dispatch]);

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
  };

  return (
    <ScrollView style={styles.container}>
      {isAuthenticated && user ? (
        <View style={styles.content}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: user.avatar ? getImageUrl(user.avatar) : 'https://via.placeholder.com/80' }}
              style={styles.avatar}
            />
            <Text style={styles.userName}>{user.name}</Text>
            {user.email && <Text style={styles.userEmail}>{user.email}</Text>}
            {user.phone && <Text style={styles.userPhone}>{user.phone}</Text>}
          </View>

          <View style={styles.menuSection}>
            <Pressable
              style={styles.menuItem}
              onPress={() => navigation.navigate('Favorites')}
            >
              <Text style={styles.menuText}>我的收藏</Text>
              <Text style={styles.menuArrow}>›</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => navigation.navigate('MyHouses')}
            >
              <Text style={styles.menuText}>我的房源</Text>
              <Text style={styles.menuArrow}>›</Text>
            </Pressable>

            <Pressable
              style={styles.menuItem}
              onPress={() => navigation.navigate('PreviewIcon')}
            >
              <Text style={styles.menuText}>图标预览</Text>
              <Text style={styles.menuArrow}>›</Text>
            </Pressable>
          </View>

          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.logoutButton}
            textColor={colors.textPrimary}
          >
            退出登录
          </Button>
        </View>
      ) : (
        <View style={styles.content}>
          <View style={styles.loginPrompt}>
            <Text style={styles.loginTitle}>欢迎使用租房App</Text>
            <Text style={styles.loginSubtitle}>登录后可以查看收藏、发布房源等功能</Text>
          </View>

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.loginButton}
            buttonColor={colors.primaryLighterprimary}
            textColor={colors.textWhite}
          >
            登录
          </Button>

          <Button
            mode="outlined"
            onPress={handleRegister}
            style={styles.registerButton}
            textColor={colors.primaryLighterprimary}
          >
            注册
          </Button>

          <View style={styles.menuSection}>
            <Pressable
              style={styles.menuItem}
              onPress={() => navigation.navigate('PreviewIcon')}
            >
              <Text style={styles.menuText}>图标预览</Text>
              <Text style={styles.menuArrow}>›</Text>
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  content: {
    padding: spacing.lg,
  },
  userInfo: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: spacing.md,
    backgroundColor: colors.bgSecondary,
  },
  userName: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  userPhone: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  loginPrompt: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    marginBottom: spacing.xl,
  },
  loginTitle: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  loginSubtitle: {
    fontSize: fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  loginButton: {
    marginBottom: spacing.md,
    paddingVertical: spacing.xs,
  },
  registerButton: {
    marginBottom: spacing.lg,
    paddingVertical: spacing.xs,
  },
  logoutButton: {
    marginTop: spacing.xl,
    paddingVertical: spacing.xs,
  },
  menuSection: {
    backgroundColor: colors.bgPrimary,
    borderRadius: borderRadius.md,
    marginTop: spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuText: {
    fontSize: fontSize.base,
    color: colors.textPrimary,
  },
  menuArrow: {
    fontSize: fontSize.xl,
    color: colors.textTertiary,
  },
});
