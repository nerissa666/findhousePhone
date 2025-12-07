/** @type {import('tailwindcss').Config} */
const gluestackPlugin = require('@gluestack-ui/nativewind-utils/tailwind-plugin');

module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    presets: [require('nativewind/preset')],
    plugins: [gluestackPlugin],
    theme: {
        extend: {
            colors: {
                // 使用 CSS 变量定义的颜色
                primary: 'var(--color-primary)',
                'primary-dark': 'var(--color-primary-dark)',
                'primary-light': 'var(--color-primary-light)',

                // 文本颜色
                'text-primary': 'var(--color-text-primary)',
                'text-secondary': 'var(--color-text-secondary)',
                'text-tertiary': 'var(--color-text-tertiary)',
                'text-white': 'var(--color-text-white)',
                'text-gray': 'var(--color-text-gray)',

                // 背景颜色
                'bg-primary': 'var(--color-bg-primary)',
                'bg-secondary': 'var(--color-bg-secondary)',
                'bg-tertiary': 'var(--color-bg-tertiary)',

                // 边框颜色
                border: 'var(--color-border)',
                'border-light': 'var(--color-border-light)',
                'border-dark': 'var(--color-border-dark)',

                // 功能颜色
                success: 'var(--color-success)',
                warning: 'var(--color-warning)',
                error: 'var(--color-error)',
                info: 'var(--color-info)',

                // 保留原有的自定义颜色（兼容性）
                'custom-black': '#333',
                'custom-green': '#21b97a',
                'custom-blue': '#1890ff',
                'custom-red': '#ff4d4f',
                'custom-orange': '#ff9800',
                'custom-gray': '#999',
            },
            spacing: {
                xs: 'var(--spacing-xs)',
                sm: 'var(--spacing-sm)',
                md: 'var(--spacing-md)',
                lg: 'var(--spacing-lg)',
                xl: 'var(--spacing-xl)',
            },
            borderRadius: {
                sm: 'var(--radius-sm)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
                xl: 'var(--radius-xl)',
                full: 'var(--radius-full)',
            },
            fontSize: {
                xs: 'var(--font-size-xs)',
                sm: 'var(--font-size-sm)',
                base: 'var(--font-size-base)',
                lg: 'var(--font-size-lg)',
                xl: 'var(--font-size-xl)',
                '2xl': 'var(--font-size-2xl)',
                '3xl': 'var(--font-size-3xl)',
            },
            boxShadow: {
                sm: 'var(--shadow-sm)',
                md: 'var(--shadow-md)',
                lg: 'var(--shadow-lg)',
                xl: 'var(--shadow-xl)',
            },
        },
    },
};

