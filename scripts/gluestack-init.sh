#!/bin/bash

# Gluestack UI v3 初始化脚本
# 自动确认所有提示

cd "$(dirname "$0")/.."

echo "正在初始化 gluestack-ui v3..."
echo ""

# 使用 expect 或直接通过管道输入
# 注意：这需要 expect 工具，如果没有可以手动操作
if command -v expect &> /dev/null; then
    expect << EOF
spawn npx gluestack-ui init
expect {
    "continue?" {
        send "\r"
        exp_continue
    }
    "Continue?" {
        send "\r"
        exp_continue
    }
    eof
}
EOF
else
    # 如果没有 expect，提供手动指导
    echo "请手动在终端中运行以下命令："
    echo "npx gluestack-ui init"
    echo ""
    echo "当出现提示时："
    echo "1. 选择 'Yes' (按 Enter 或方向键)"
    echo "2. 再次选择 'Yes' 确认继续"
    echo ""
    echo "或者安装 expect 工具："
    echo "brew install expect  # macOS"
    echo "sudo apt-get install expect  # Linux"
fi

