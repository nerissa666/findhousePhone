#!/bin/bash

# iOS 构建前自动修复脚本
# 解决 "The sandbox is not in sync with the Podfile.lock" 错误

set -e

echo "🔧 修复 iOS 依赖同步问题..."

# 设置编码
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# 进入 iOS 目录
cd "$(dirname "$0")/../ios" || exit 1

# 检查 pod 命令
if ! command -v pod &> /dev/null; then
    if [ -f "/opt/homebrew/bin/pod" ]; then
        POD_CMD="/opt/homebrew/bin/pod"
    else
        echo "❌ 错误: 找不到 pod 命令"
        echo "请安装 CocoaPods: sudo gem install cocoapods"
        exit 1
    fi
else
    POD_CMD="pod"
fi

# 运行 pod install
echo "📦 运行 pod install..."
$POD_CMD install

echo "✅ iOS 依赖已同步完成！"

