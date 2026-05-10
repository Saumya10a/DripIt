import React, { useState } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import Walkthrough from '../components/Walkthrough';

const WalkthroughScreen = () => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    const handleNext = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            router.replace('/(auth)');
        }
    };

    const handleSkip = () => {
        router.replace('/(auth)');
    };

    return (
        <View className="flex-1 bg-background">
            <Walkthrough step={step} onNext={handleNext} onSkip={handleSkip} />
        </View>
    );
};

export default WalkthroughScreen;