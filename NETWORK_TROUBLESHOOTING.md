# 网络连接问题排查指南

## 🔍 问题：Network Error - 网络连接失败

### 常见原因

1. **SSL 证书过期或无效**
2. **iOS ATS (App Transport Security) 限制**
3. **Android 网络安全配置**
4. **服务器地址不可达**
5. **模拟器/设备网络配置问题**

---

## ✅ 已修复的配置

### iOS 配置（Info.plist）

已更新 `ios/findhousePhone/Info.plist`，允许：
- ✅ 允许任意 HTTPS 连接（开发环境）
- ✅ 允许特定域名的异常配置
- ✅ 允许本地网络连接

### 配置说明

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>  <!-- 允许任意 HTTPS 连接 -->
    <key>NSExceptionDomains</key>
    <dict>
        <key>124.71.203.87</key>
        <dict>
            <key>NSExceptionAllowsInsecureHTTPLoads</key>
            <true/>  <!-- 允许该域名的 HTTP 连接 -->
            <key>NSExceptionRequiresForwardSecrecy</key>
            <false/>  <!-- 不要求前向保密 -->
            <key>NSIncludesSubdomains</key>
            <true/>  <!-- 包含子域名 -->
        </dict>
    </dict>
</dict>
```

---

## 🔧 其他解决方案

### 方案 1: 使用 HTTP（仅开发环境，不推荐）

如果服务器支持 HTTP，可以临时使用：

```typescript
// src/config/env.ts
API_BASE_URL: 'http://124.71.203.87/findhouseServer',
```

**注意：** 需要确保 iOS Info.plist 中允许 HTTP 连接。

### 方案 2: 修复服务器 SSL 证书

联系服务器管理员更新 SSL 证书，这是最佳解决方案。

### 方案 3: 使用代理或 VPN

如果服务器在特定网络环境中，可能需要：
- 配置代理
- 使用 VPN
- 确保设备/模拟器可以访问服务器

---

## 🧪 测试网络连接

### 1. 测试服务器是否可达

```bash
# 测试 HTTPS 连接
curl -I https://124.71.203.87/findhouseServer/home/swiper

# 测试 HTTP 连接（如果支持）
curl -I http://124.71.203.87/findhouseServer/home/swiper

# 忽略 SSL 证书验证（仅测试）
curl -k https://124.71.203.87/findhouseServer/home/swiper
```

### 2. 检查网络日志

在应用中查看详细的网络请求日志：

```
🌐 [API Request] {
  method: 'GET',
  url: '/home/swiper',
  fullURL: 'https://124.71.203.87/findhouseServer/home/swiper',
  ...
}

❌ [API Network Error] {
  message: '网络连接失败',
  error: 'Network Error',
  ...
}
```

### 3. 检查 iOS 模拟器网络

```bash
# 在模拟器中测试网络
# 打开 Safari，访问 https://124.71.203.87
```

---

## 📱 Android 配置（如果需要）

如果 Android 也遇到类似问题，需要配置网络安全：

### 1. 创建网络安全配置文件

创建 `android/app/src/main/res/xml/network_security_config.xml`：

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" />
        </trust-anchors>
    </base-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="true">124.71.203.87</domain>
    </domain-config>
</network-security-config>
```

### 2. 在 AndroidManifest.xml 中引用

```xml
<application
    android:networkSecurityConfig="@xml/network_security_config"
    ...>
</application>
```

---

## 🔄 重新构建应用

修改 iOS Info.plist 后，需要重新构建应用：

```bash
# iOS
cd ios
pod install
cd ..
npm run ios

# 或使用 Xcode
# 1. 打开 ios/findhousePhone.xcworkspace
# 2. Product → Clean Build Folder (Shift + Cmd + K)
# 3. Product → Run (Cmd + R)
```

---

## ⚠️ 安全注意事项

### 生产环境

**重要：** 当前配置允许不安全的 HTTPS 连接，仅适用于开发环境。

生产环境应该：
1. ✅ 使用有效的 SSL 证书
2. ✅ 移除 `NSAllowsArbitraryLoads`
3. ✅ 只配置必要的域名异常
4. ✅ 使用 HTTPS 而不是 HTTP

### 开发环境

当前配置允许：
- 任意 HTTPS 连接（包括证书过期的）
- 特定域名的 HTTP 连接
- 本地网络连接

这些配置仅用于开发调试。

---

## 🎯 快速检查清单

- [ ] iOS Info.plist 已更新
- [ ] 重新构建了 iOS 应用
- [ ] 服务器地址正确
- [ ] 网络连接正常（可以访问其他网站）
- [ ] 查看控制台日志确认错误详情
- [ ] 测试服务器是否可达（使用 curl）

---

## 📞 如果问题仍然存在

1. **检查服务器状态**
   - 确认服务器是否运行
   - 确认端口是否正确
   - 确认防火墙设置

2. **检查网络环境**
   - 模拟器/设备是否可以访问互联网
   - 是否需要代理或 VPN
   - 网络是否有限制

3. **查看详细错误日志**
   - 在 `src/services/api.ts` 中已配置详细日志
   - 查看控制台输出的完整错误信息

4. **联系服务器管理员**
   - 更新 SSL 证书
   - 确认服务器配置正确

---

## 📚 相关资源

- [iOS ATS 文档](https://developer.apple.com/documentation/security/preventing_insecure_network_connections)
- [Android 网络安全配置](https://developer.android.com/training/articles/security-config)
- [Axios 错误处理](https://axios-http.com/docs/handling_errors)

