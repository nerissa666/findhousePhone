# iOS 启动指南

## 问题
启动 iOS 时遇到错误：
```
error Cannot start server in new windows because no terminal app was specified
```

## 解决方案

### 方法 1：分两个终端窗口启动（推荐）

**终端 1 - 启动 Metro Bundler：**
```bash
cd /Users/xgx/Desktop/project/findhousePhone
pnpm start -- --reset-cache
```

**终端 2 - 启动 iOS 应用：**
```bash
cd /Users/xgx/Desktop/project/findhousePhone
pnpm ios
```

### 方法 2：使用 --terminal 参数

```bash
pnpm ios -- --terminal "Terminal.app"
```

或者指定其他终端应用：
```bash
pnpm ios -- --terminal "iTerm.app"
```

### 方法 3：在后台启动 Metro

```bash
# 启动 Metro bundler 在后台
pnpm start -- --reset-cache &

# 然后运行 iOS
pnpm ios
```

## 验证 Metro 是否运行

```bash
curl http://localhost:8081/status
```

如果返回 `packager-status:running`，说明 Metro 正在运行。

## 常见问题

### 端口 8081 被占用

```bash
# 查找并终止占用端口的进程
lsof -ti:8081 | xargs kill -9

# 或者使用不同端口
pnpm start -- --port 8082
```

### 清除缓存

```bash
# 清除 Metro 缓存
pnpm start -- --reset-cache

# 清除 iOS 构建缓存
cd ios
rm -rf build
pod install
cd ..
```



