#!/bin/bash

# 清理 Metro bundler 和 React Native 缓存

cd "$(dirname "$0")/.."

echo "🧹 清理 Metro bundler 缓存..."

# 清理 Metro 缓存
rm -rf /tmp/metro-* 2>/dev/null
rm -rf /tmp/haste-* 2>/dev/null
rm -rf $TMPDIR/metro-* 2>/dev/null
rm -rf $TMPDIR/haste-* 2>/dev/null
rm -rf $TMPDIR/react-* 2>/dev/null

# 清理 watchman（如果安装了）
if command -v watchman &> /dev/null; then
    echo "🧹 清理 Watchman..."
    watchman watch-del-all 2>/dev/null
fi

# 清理 node_modules 缓存
rm -rf node_modules/.cache 2>/dev/null

# 清理 iOS build
echo "🧹 清理 iOS build..."
rm -rf ios/build 2>/dev/null

# 清理 Android build
echo "🧹 清理 Android build..."
rm -rf android/build 2>/dev/null
rm -rf android/app/build 2>/dev/null

echo "✅ 缓存清理完成！"
echo ""
echo "现在请运行："
echo "  pnpm start --reset-cache"
echo "或者"
echo "  npx react-native start --reset-cache"

