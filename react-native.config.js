module.exports = {
    project: {
        ios: {},
        android: {},
    },
    assets: [
        './assets/fonts/', // 指定字体文件目录
        // 暂时注释掉，避免重复添加字体文件
        // 如果需要使用 react-native-paper 的 FAB，需要手动在 Xcode 中添加 MaterialCommunityIcons.ttf
        // './node_modules/react-native-vector-icons/Fonts/',
    ],
};