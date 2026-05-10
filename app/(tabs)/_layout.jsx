import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';
import { colors } from '../../styles/colors';
import {
    HomeIcon,
    PencilIcon,
    ListBulletIcon,
    SparklesIcon,
    Cog6ToothIcon
} from "react-native-heroicons/solid";

const TabIcon = ({ icon: Icon, color, name, focused }) => {
    return (
        <View className="items-center justify-center gap-1">
            <Icon color={color} size={24} />
            <Text
                className={`text-xs ${focused ? 'text-primary' : 'text-subtle'}`}
                style={{ color: focused ? colors.primary : colors.subtle }}
            >
                {name}
            </Text>
        </View>
    );
};

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.subtle,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopWidth: 0,
                    height: 80,
                    paddingTop: 10
                },
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={HomeIcon} color={color} name="Home" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="memory-chat"
                options={{
                    title: 'Ask Carison',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={SparklesIcon} color={color} name="Ask" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="recording-review"
                options={{
                    title: 'Recordings',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={ListBulletIcon} color={color} name="Recordings" focused={focused} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon icon={Cog6ToothIcon} color={color} name="Settings" focused={focused} />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;