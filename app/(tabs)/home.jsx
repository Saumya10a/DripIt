import { Link } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import {
    Battery50Icon,
    CloudArrowUpIcon,
    MicrophoneIcon,
    SparklesIcon,
    WifiIcon,
} from "react-native-heroicons/outline";
import { colors } from "../../styles/colors";

const HomeScreen = () => {
  const features = [
    {
      icon: <MicrophoneIcon size={32} color="white" />,
      title: "Capture Moments",
      description:
        "Effortlessly record conversations and ideas with a single tap.",
    },
    {
      icon: <CloudArrowUpIcon size={32} color="white" />,
      title: "Cloud Sync",
      description:
        "Your recordings automatically sync to your private Google Drive.",
    },
    {
      icon: <WifiIcon size={32} color="white" />,
      title: "Smart Connectivity",
      description:
        "Seamlessly connects to your home Wi-Fi for quick, secure uploads.",
    },
    {
      icon: <Battery50Icon size={32} color="white" />,
      title: "Long-lasting Battery",
      description:
        "Track your pendant’s battery life and get notified for a recharge.",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-background p-6">
      <View className="mb-8">
        <Text className="text-4xl font-bold text-text">Welcome back.</Text>
        <Text className="text-xl font-bold text-primary mt-2">
          Carison is ready.
        </Text>
      </View>

      <View className="relative w-full aspect-video rounded-3xl overflow-hidden mb-8">
        <Image
          source={require("../../assets/images/carison.png")}
          className="w-full h-full object-cover"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-black/50 justify-center items-center p-4">
          <Text className="text-2xl font-bold text-text text-center">
            Your personal memory assistant
          </Text>
          <Text className="text-sm text-subtle text-center mt-2">
            Carison: the one that cares about you like a son.
          </Text>
        </View>
      </View>

      <Text className="text-2xl font-bold text-text mb-4">Core Features</Text>
      <View className="flex-row flex-wrap justify-between">
        {features.map((feature, index) => (
          <View
            key={index}
            className="w-[48%] bg-surface rounded-xl p-4 mb-4 items-center shadow-lg"
          >
            <View className="w-12 h-12 rounded-full bg-primary/20 items-center justify-center">
              {feature.icon}
            </View>
            <Text className="text-text font-semibold mt-4 text-center">
              {feature.title}
            </Text>
            <Text className="text-subtle text-xs text-center mt-2">
              {feature.description}
            </Text>
          </View>
        ))}
      </View>

      <View className="my-8 w-full">
        <Text className="text-2xl font-bold text-text mb-4">Quick Actions</Text>
        <View className="flex-row justify-between">
          <Link href="/(tabs)/memory-chat" asChild>
            <Pressable className="flex-1 mx-1 bg-surface p-4 rounded-xl items-center shadow-md">
              <SparklesIcon size={28} color={colors.accent} />
              <Text className="text-text mt-2 font-medium">Ask Carison</Text>
            </Pressable>
          </Link>
          <Link href="/(tabs)/recording-review" asChild>
            <Pressable className="flex-1 mx-1 bg-surface p-4 rounded-xl items-center shadow-md">
              <MicrophoneIcon size={28} color={colors.primary} />
              <Text className="text-text mt-2 font-medium">New Clip</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
