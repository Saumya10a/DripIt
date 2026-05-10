import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { colors } from '../styles/colors';
import Toast from './Toast';

const AuthForm = ({ isSignUp, onAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePress = async () => {
        if (!email || !password) {
            Toast.show({ type: 'error', text1: 'Missing fields', text2: 'Please fill out all fields.' });
            return;
        }

        if (isSignUp && password !== confirmPassword) {
            Toast.show({ type: 'error', text1: 'Passwords do not match', text2: 'Please re-enter your passwords.' });
            return;
        }

        // Simulating an API call for demonstration
        try {
            // In a real app, this would be your API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            Toast.show({ type: 'success', text1: isSignUp ? 'Signed up!' : 'Logged in!', text2: 'Welcome to Carison.' });
            onAuth();
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Auth failed', text2: 'Please try again.' });
        }
    };

    return (
        <View className="w-full max-w-sm p-6 rounded-3xl bg-surface shadow-lg">
            <Text className="text-3xl font-bold text-center text-text mb-8">
                {isSignUp ? 'Sign Up' : 'Sign In'}
            </Text>
            <View className="mb-4">
                <Text className="text-subtle mb-2">Email</Text>
                <TextInput
                    className="w-full h-12 px-4 rounded-xl bg-background text-text focus:border-accent border border-surface"
                    onChangeText={setEmail}
                    value={email}
                    placeholder="you@example.com"
                    placeholderTextColor={colors.subtle}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Enter') handlePress();
                    }}
                />
            </View>
            <View className="mb-4">
                <Text className="text-subtle mb-2">Password</Text>
                <TextInput
                    className="w-full h-12 px-4 rounded-xl bg-background text-text focus:border-accent border border-surface"
                    onChangeText={setPassword}
                    value={password}
                    placeholder="••••••••"
                    placeholderTextColor={colors.subtle}
                    secureTextEntry
                    onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Enter') handlePress();
                    }}
                />
            </View>
            {isSignUp && (
                <View className="mb-6">
                    <Text className="text-subtle mb-2">Confirm Password</Text>
                    <TextInput
                        className="w-full h-12 px-4 rounded-xl bg-background text-text focus:border-accent border border-surface"
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        placeholder="••••••••"
                        placeholderTextColor={colors.subtle}
                        secureTextEntry
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Enter') handlePress();
                        }}
                    />
                </View>
            )}
            <Pressable
                className="w-full py-4 bg-primary rounded-xl justify-center items-center active:bg-secondary"
                onPress={handlePress}>
                <Text className="text-text text-lg font-bold">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Text>
            </Pressable>
            <Link href={isSignUp ? '/sign-in' : '/sign-up'} asChild>
                <Pressable className="mt-4">
                    <Text className="text-center text-subtle text-sm">
                        {isSignUp ? 'Already have an account? Sign In' : 'New here? Create an account'}
                    </Text>
                </Pressable>
            </Link>
        </View>
    );
};

export default AuthForm;