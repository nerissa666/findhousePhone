const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');
const fs = require('fs');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// 自定义 resolver 函数
const customResolver = (context, realModuleName, platform, moduleName) => {
    // 只处理 @/ 路径别名，其他所有模块（包括 @babel/runtime）使用默认解析器
    if (realModuleName && realModuleName.startsWith('@/')) {
        const aliasPath = realModuleName.replace('@/', '');
        const srcPath = path.resolve(__dirname, 'src', aliasPath);

        // 尝试解析文件（支持多种扩展名）
        const extensions = [
            '.ios.js',
            '.android.js',
            '.native.js',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
        ];

        for (const ext of extensions) {
            const fullPath = srcPath + ext;
            if (fs.existsSync(fullPath)) {
                return {
                    filePath: fullPath,
                    type: 'sourceFile',
                };
            }
        }

        // 尝试作为目录（查找 index 文件）
        if (fs.existsSync(srcPath)) {
            try {
                if (fs.statSync(srcPath).isDirectory()) {
                    for (const ext of extensions) {
                        const indexPath = path.join(srcPath, 'index' + ext);
                        if (fs.existsSync(indexPath)) {
                            return {
                                filePath: indexPath,
                                type: 'sourceFile',
                            };
                        }
                    }
                }
            } catch (e) {
                // 忽略错误，继续使用默认解析器
            }
        }
    }

    // 对于所有其他模块（包括 @babel/runtime），使用默认解析器
    return context.resolveRequest(context, realModuleName, platform, moduleName);
};

const config = {
    resolver: {
        ...defaultConfig.resolver,
        sourceExts: [...defaultConfig.resolver.sourceExts, 'css'],
        resolveRequest: customResolver,
    },
};

module.exports = withNativeWind(
    mergeConfig(defaultConfig, config),
    { input: './global.css' }
);
