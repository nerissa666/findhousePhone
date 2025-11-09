# 手动安装 CocoaPods 指南

## 方法 1：使用 Bundle（推荐，项目已有 Gemfile）

项目已经配置了 `Gemfile`，这是最简单的方法：

```bash
cd /Users/xgx/Desktop/project/findhousePhone

# 1. 安装 bundle（如果还没安装）
gem install bundler

# 2. 安装项目依赖（包括 CocoaPods）
bundle install

# 3. 使用 bundle 执行 pod install
cd ios
bundle exec pod install
```

## 方法 2：直接下载 .gem 文件安装

### 步骤 1：下载 CocoaPods gem 文件

访问以下链接下载：

- https://rubygems.org/gems/cocoapods
- 或使用命令行下载：

```bash
# 创建临时目录
mkdir -p ~/Downloads/cocoapods_install
cd ~/Downloads/cocoapods_install

# 下载 CocoaPods gem 文件（最新版本）
curl -L -o cocoapods.gem https://rubygems.org/downloads/cocoapods-1.15.2.gem

# 或者使用国内镜像
curl -L -o cocoapods.gem https://gems.ruby-china.com/downloads/cocoapods-1.15.2.gem
```

### 步骤 2：安装依赖

CocoaPods 需要一些依赖，先安装：

```bash
# 安装依赖 gem
gem install activesupport -v 6.1.7.5
gem install xcodeproj -v 1.25.0
gem install concurrent-ruby -v 1.3.3
gem install bigdecimal
gem install logger
gem install benchmark
gem install mutex_m
```

### 步骤 3：安装 CocoaPods

```bash
# 从本地 gem 文件安装
sudo gem install ~/Downloads/cocoapods_install/cocoapods.gem

# 或者如果下载到当前目录
sudo gem install cocoapods.gem
```

## 方法 3：使用国内镜像加速安装

你已经配置了国内镜像，可以直接使用：

```bash
# 确保使用国内镜像
gem sources --remove https://rubygems.org/
gem sources --add https://gems.ruby-china.com/

# 验证镜像源
gem sources -l

# 安装 CocoaPods（使用国内镜像，应该会快一些）
sudo gem install cocoapods

# 如果还是慢，可以指定版本安装
sudo gem install cocoapods -v 1.15.2
```

## 方法 4：分步安装依赖（如果网络不稳定）

```bash
# 1. 先安装基础依赖
sudo gem install activesupport -v 6.1.7.5
sudo gem install xcodeproj -v 1.25.0
sudo gem install concurrent-ruby -v 1.3.3

# 2. 再安装 CocoaPods
sudo gem install cocoapods -v 1.15.2
```

## 方法 5：使用 Homebrew（如果网络正常）

```bash
# 等待 Homebrew 安装完成（可能需要几分钟）
brew install cocoapods
```

## 验证安装

安装完成后，验证：

```bash
# 检查版本
pod --version

# 或者使用 bundle
bundle exec pod --version
```

## 安装 iOS 依赖

安装 CocoaPods 后，安装项目依赖：

```bash
cd /Users/xgx/Desktop/project/findhousePhone/ios

# 使用 pod install
pod install

# 或使用 bundle
bundle exec pod install
```

## 常见问题

### 问题 1：权限错误

```bash
# 使用 sudo
sudo gem install cocoapods

# 或安装到用户目录（不需要 sudo）
gem install cocoapods --user-install
export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH"
```

### 问题 2：版本冲突

```bash
# 安装特定版本
sudo gem install cocoapods -v 1.15.2
```

### 问题 3：网络超时

```bash
# 增加超时时间
sudo gem install cocoapods --timeout 300
```

## 推荐方案

**最推荐使用方法 1（Bundle）**，因为：

- 项目已有 Gemfile 配置
- 不需要 sudo 权限
- 版本管理更清晰
- 团队协作更方便
