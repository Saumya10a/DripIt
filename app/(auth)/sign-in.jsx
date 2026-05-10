import React from 'react';
import { View, Text } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { router } from 'expo-router';

const SignInScreen = () => {
    const handleAuth = () => {
        router.replace('/(tabs)/home'); // Navigate to the main app
    };

    return (
        <View className="flex-1 justify-center items-center bg-background p-6">
            <AuthForm isSignUp={false} onAuth={handleAuth} />
        </View>
    );
};

export default SignInScreen;