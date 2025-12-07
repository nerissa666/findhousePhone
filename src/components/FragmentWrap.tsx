import React from 'react';
import { View, Text } from 'react-native';

interface FragmentWrapProps {
    title?: string;
    extra?: React.ReactNode;
    children?: React.ReactNode;
}

export default ({ title, extra, children }: FragmentWrapProps): React.JSX.Element => {
    return (
        <View className="my-4 px-4">
            {(title || extra) && (
                <View className="flex-row justify-between items-center mb-6">
                    {title && <Text className="text-base font-[500]">{title}</Text>}
                    {extra && <View>{extra}</View>}
                </View>
            )}
            {children}
        </View>
    );
};