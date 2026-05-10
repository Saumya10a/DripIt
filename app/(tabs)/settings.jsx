import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Switch } from 'react-native';
import {
    WifiIcon,
    Battery50Icon,
    Battery100Icon
} from "react-native-heroicons/solid";
import Toast from '../../components/Toast';
import { colors } from '../../styles/colors';

const SettingsScreen = () => {
    const [wifiSSID, setWifiSSID] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');
    const [batteryPercentage, setBatteryPercentage] = useState(85);
    const [isPendantConnected, setIsPendantConnected] = useState(true);

    const handleUpdateWifi = () => {
        if (!wifiSSID || !wifiPassword) {
            Toast.show({ type: 'error', text1: 'Missing fields', text2: 'Please enter both Wi-Fi details.' });
            return;
        }
        // In a real app, you would send this to the pendant via BLE
        Toast.show({ type: 'success', text1: 'Wi-Fi updated', text2: `Pendant is now connecting to ${wifiSSID}.` });
        setWifiSSID('');
        setWifiPassword('');
    };

    const handleToggleConnection = () => {
        setIsPendantConnected(!isPendantConnected);
        Toast.show({ type: isPendantConnected ? 'info' : 'success', text1: isPendantConnected ? 'Pendant Disconnected' : 'Pendant Connected' });
    };

    const getBatteryIcon = (percentage) => {
        if (percentage > 75) return <Battery100Icon size={48} color={colors.success} />;
        if (percentage > 25) return <Battery50Icon size={48} color={colors.warning} />;
        return <Battery100Icon size={48} color={colors.error} />;
    };

    return (
        <ScrollView className="flex-1 bg-background p-6">
            <Text className="text-3xl font-bold text-text mb-6">
                Settings
            </Text>

            {/* Battery Status */}
            <View className="p-6 bg-surface rounded-xl mb-6 items-center shadow-lg">
                <Text className="text-xl font-bold text-text mb-4">Carison Battery Status</Text>
                <View className="flex-row items-center justify-center">
                    {getBatteryIcon(batteryPercentage)}
                    <Text className="text-6xl font-extrabold text-text ml-4">{batteryPercentage}%</Text>
                </View>
                <Text className="text-sm text-subtle mt-4">
                    Battery life is estimated to be {Math.floor(batteryPercentage / 10)} days.
                </Text>
            </View>

            {/* Wi-Fi Settings */}
            <View className="p-6 bg-surface rounded-xl shadow-lg">
                <Text className="text-xl font-bold text-text mb-4">
                    Wi-Fi Sync Settings
                </Text>
                <View className="flex-row items-center justify-between mb-4">
                    <Text className="text-subtle text-base">Pendant Connection Status</Text>
                    <Switch
                        trackColor={{ false: colors.subtle, true: colors.primary }}
                        thumbColor={isPendantConnected ? colors.text : colors.text}
                        onValueChange={handleToggleConnection}
                        value={isPendantConnected}
                    />
                </View>
                <Text className="text-subtle mb-2">Network Name (SSID)</Text>
                <TextInput
                    className="w-full h-12 px-4 rounded-xl bg-background text-text mb-4 border border-surface"
                    placeholder="e.g., 'MyHomeWifi'"
                    placeholderTextColor={colors.subtle}
                    value={wifiSSID}
                    onChangeText={setWifiSSID}
                />
                <Text className="text-subtle mb-2">Password</Text>
                <TextInput
                    className="w-full h-12 px-4 rounded-xl bg-background text-text mb-4 border border-surface"
                    placeholder="••••••••"
                    placeholderTextColor={colors.subtle}
                    secureTextEntry
                    value={wifiPassword}
                    onChangeText={setWifiPassword}
                />
                <Pressable
                    className="w-full py-4 bg-primary rounded-xl justify-center items-center active:bg-secondary"
                    onPress={handleUpdateWifi}>
                    <Text className="text-text text-lg font-bold">Update Wi-Fi</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default SettingsScreen;