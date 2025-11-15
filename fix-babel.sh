#!/bin/bash

# React Native Babel 错误快速修复脚本
# 使用方法: ./fix-babel.sh

set -e

echo "🔧 开始修复 Babel 错误..."
echo ""

# 1. 停止 Metro bundler（如果正在运行）
echo "📦 步骤 1: 检查并停止 Metro bundler..."
pkill -f "react-native.*start" || true
pkill -f "metro" || true
sleep 2

# 2. 清除 Metro 缓存
echo "🧹 步骤 2: 清除 Metro 缓存..."
rm -rf /tmp/metro-* 2>/dev/null || true
rm -rf /tmp/haste-* 2>/dev/null || true
rm -rf $TMPDIR/metro-* 2>/dev/null || true
rm -rf $TMPDIR/haste-* 2>/dev/null || true
echo "✅ Metro 缓存已清除"

# 3. 清除 watchman 缓存（如果安装了）
echo "👀 步骤 3: 清除 watchman 缓存..."
if command -v watchman &> /dev/null; then
    watchman watch-del-all 2>/dev/null || true
    echo "✅ Watchman 缓存已清除"
else
    echo "⏭️  Watchman 未安装，跳过"
fi

# 4. 清除 npm/yarn/pnpm 缓存
echo "📚 步骤 4: 清除包管理器缓存..."
if [ -f "package-lock.json" ]; then
    npm cache clean --force
    echo "✅ npm 缓存已清除"
elif [ -f "yarn.lock" ]; then
    yarn cache clean
    echo "✅ yarn 缓存已清除"
elif [ -f "pnpm-lock.yaml" ]; then
    pnpm store prune
    echo "✅ pnpm 缓存已清除"
fi

# 5. 清除 node_modules（可选，取消注释以启用）
# echo "🗑️  步骤 5: 清除 node_modules..."
# rm -rf node_modules
# echo "✅ node_modules 已清除"
# echo "📥 重新安装依赖..."
# if [ -f "package-lock.json" ]; then
#     npm install
# elif [ -f "yarn.lock" ]; then
#     yarn install
# elif [ -f "pnpm-lock.yaml" ]; then
#     pnpm install
# fi

# 6. 清除 iOS 构建缓存
if [ -d "ios" ]; then
    echo "🍎 步骤 6: 清除 iOS 构建缓存..."
    cd ios
    rm -rf build 2>/dev/null || true
    rm -rf Pods 2>/dev/null || true
    rm -rf Podfile.lock 2>/dev/null || true
    if command -v pod &> /dev/null; then
        pod cache clean --all 2>/dev/null || true
    fi
    cd ..
    echo "✅ iOS 缓存已清除"
fi

# 7. 清除 Android 构建缓存
if [ -d "android" ]; then
    echo "🤖 步骤 7: 清除 Android 构建缓存..."
    cd android
    if [ -f "gradlew" ]; then
        ./gradlew clean 2>/dev/null || true
    fi
    rm -rf .gradle 2>/dev/null || true
    rm -rf build 2>/dev/null || true
    cd ..
    echo "✅ Android 缓存已清除"
fi

echo ""
echo "✨ 修复完成！"
echo ""
echo "📝 下一步："
echo "   1. 运行: npm start -- --reset-cache"
echo "   2. 如果问题仍然存在，请运行完整重置："
echo "      - 取消注释脚本中的步骤 5（清除 node_modules）"
echo "      - 重新运行此脚本"
echo ""

