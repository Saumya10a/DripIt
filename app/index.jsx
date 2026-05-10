import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { View } from 'react-native';
import AnimatedLogo from '../components/AnimatedLogo';
import { colors } from '../styles/colors';

const Index = () => {
    const isFirstTimeUser = true; // Use a state or AsyncStorage to manage this
    
    useEffect(() => {
        const timer = setTimeout(() => {
            // After animation, redirect
            if (isFirstTimeUser) {
                // In a real app, you would save this state to AsyncStorage
                // and then navigate to walkthrough only on first launch
                // For this example, we'll just redirect to the walkthrough
                // to show the flow.
            }
        }, 3000); // 3-second loader
        return () => clearTimeout(timer);
    }, []);

    // For demonstration, we'll directly redirect after a delay
    // to show the flow. In a real app, you'd have a state to control this.
    // Here we're using a simple timer.
    return (
        <View className="flex-1 justify-center items-center bg-background">
            <AnimatedLogo />
            {isFirstTimeUser && <Redirect href="/walkthrough" />}
            {!isFirstTimeUser && <Redirect href="/(tabs)/home" />}
        </View>
    );
};

export default Index;