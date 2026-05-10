import React from 'react';
import { Pressable, Text } from 'react-native';

const CustomButton = ({ title, onPress, className = "" }) => {
    return (
        <Pressable
            className={`px-6 py-3 rounded-full bg-primary active:bg-secondary justify-center items-center ${className}`}
            onPress={onPress}>
            <Text className="text-text font-semibold text-lg">{title}</Text>
        </Pressable>
    );
};

export default CustomButton;