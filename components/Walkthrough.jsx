import { Link } from "expo-router";
import { Dimensions, Image, Pressable, Text, View } from "react-native";

const { width } = Dimensions.get("window");

const Walkthrough = ({ step, onNext, onSkip }) => {
  const walkthroughData = [
    {
      image: require("../assets/images/carison.png"),
      title: "Welcome to Carison",
      description:
        "Your AI memory assistant. Carison is a smart pendant that captures life’s moments for you.",
    },
    {
      image: require("../assets/images/carison.png"),
      title: "Record & Save Memories",
      description:
        "Simply tap the pendant to record. Your audio is instantly saved to your personal Google Drive.",
    },
    {
      image: require("../assets/images/carison.png"),
      title: "Effortless Recall",
      description:
        "Ask Carison about your recordings. Get instant, AI-powered summaries and answers to your queries.",
    },
  ];

  const currentStep = walkthroughData[step - 1];

  return (
    <View className="flex-1 items-center justify-center p-6 bg-background">
      <View className="flex-1 justify-center items-center">
        <Image
          source={currentStep.image}
          className="w-full h-80 mb-8"
          resizeMode="contain"
        />
        <Text className="text-3xl font-bold text-text mb-4 text-center">
          {currentStep.title}
        </Text>
        <Text className="text-subtle text-lg text-center leading-relaxed">
          {currentStep.description}
        </Text>
      </View>

      <View className="flex-row justify-between w-full mt-auto mb-8">
        <View className="flex-row">
          {walkthroughData.map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === step - 1 ? "bg-primary" : "bg-subtle"
              }`}
            />
          ))}
        </View>
        {step < walkthroughData.length ? (
          <Pressable onPress={onNext}>
            <Text className="text-primary text-lg font-bold">Next</Text>
          </Pressable>
        ) : (
          <Link href="/(auth)/" asChild>
            <Pressable>
              <Text className="text-primary text-lg font-bold">
                Get Started
              </Text>
            </Pressable>
          </Link>
        )}
      </View>
      <Link href="/(auth)/" asChild>
        <Pressable className="absolute bottom-16 right-6">
          <Text className="text-subtle text-sm">Skip</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default Walkthrough;
