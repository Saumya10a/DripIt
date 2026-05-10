import { Stack } from 'expo-router';
import { View } from 'react-native';
import Toast from '../components/Toast';
import { colors } from '../styles/colors';
import { useState } from 'react';

const RootLayout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage auth state

    return (
        <View className="flex-1 bg-background">
            <Stack>
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="walkthrough" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
            <Toast />
        </View>
    );
};

export default RootLayout;