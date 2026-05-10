import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { PaperAirplaneIcon } from "react-native-heroicons/solid";
import { colors } from '../../styles/colors';

const MemoryChatScreen = () => {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Hello! I am Carison, your personal memory assistant. How can I help you recall your memories today?', sender: 'ai' },
        { id: '2', text: 'Tell me about my meeting with John last week.', sender: 'user' },
        { id: '3', text: 'Based on your recordings, you discussed the new product roadmap and confirmed a deadline for Friday. The key action items were to finalize the design mockups and present them to the marketing team.', sender: 'ai' },
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() === '') return;

        const newMessages = [...messages, { id: Date.now().toString(), text: input, sender: 'user' }];
        setMessages(newMessages);
        setInput('');

        // Simulating an AI response
        setTimeout(() => {
            const botResponse = `I don't have enough information to answer that based on your memories. Please be more specific.`;
            setMessages((prev) => [
                ...prev,
                { id: Date.now().toString() + 'bot', text: botResponse, sender: 'ai' },
            ]);
        }, 1500);
    };

    return (
        <View className="flex-1 bg-background">
            <View className="p-6">
                <Text className="text-3xl font-bold text-text">
                    Ask Carison
                </Text>
                <Text className="text-sm text-subtle mt-1">
                    Query your recorded memories.
                </Text>
            </View>
            <ScrollView className="flex-1 p-4 mb-4">
                {messages.map((msg) => (
                    <View
                        key={msg.id}
                        className={`flex-row mb-4 ${
                            msg.sender === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                    >
                        <View
                            className={`p-4 rounded-3xl max-w-[80%] ${
                                msg.sender === 'user' ? 'bg-primary self-end' : 'bg-surface self-start'
                            }`}
                        >
                            <Text className="text-text">{msg.text}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={100}
                className="p-4"
            >
                <View className="flex-row items-center bg-surface rounded-full shadow-lg p-2">
                    <TextInput
                        className="flex-1 px-4 text-text"
                        placeholder="Ask Carison about your memories..."
                        placeholderTextColor={colors.subtle}
                        value={input}
                        onChangeText={setInput}
                        onKeyPress={({ nativeEvent }) => {
                            if (nativeEvent.key === 'Enter' && !nativeEvent.shiftKey) {
                                handleSend();
                            }
                        }}
                    />
                    <Pressable
                        className="bg-primary p-3 rounded-full active:bg-secondary"
                        onPress={handleSend}
                    >
                        <PaperAirplaneIcon size={24} color="white" />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default MemoryChatScreen;