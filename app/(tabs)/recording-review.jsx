import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable } from 'react-native';
import {
    PlayIcon,
    PauseIcon,
    TrashIcon,
    StarIcon,
    PlusCircleIcon
} from "react-native-heroicons/solid";
import Toast from '../../components/Toast';
import { colors } from '../../styles/colors';

const initialRecordings = [
    { id: '1', name: 'Meeting with John', date: 'Oct 2, 2025', duration: '0:45', isFavorite: false, clipType: 'Role' },
    { id: '2', name: 'Voice of Mom', date: 'Oct 1, 2025', duration: '0:30', isFavorite: true, clipType: 'Whose Voice' },
    { id: '3', name: 'Grocery List', date: 'Sep 30, 2025', duration: '0:15', isFavorite: false, clipType: 'Other' },
];

const RecordingReviewScreen = () => {
    const [recordings, setRecordings] = useState(initialRecordings);
    const [isPlaying, setIsPlaying] = useState(null);
    const [newClipName, setNewClipName] = useState('');
    const [newClipType, setNewClipType] = useState('');

    const handlePlayPause = (id) => {
        setIsPlaying(isPlaying === id ? null : id);
        Toast.show({ type: 'info', text1: isPlaying === id ? 'Playback Paused' : 'Playback Started' });
    };

    const handleFavorite = (id) => {
        setRecordings(
            recordings.map((rec) =>
                rec.id === id ? { ...rec, isFavorite: !rec.isFavorite } : rec
            )
        );
        Toast.show({ type: 'info', text1: 'Favorite updated!' });
    };

    const handleDelete = (id) => {
        setRecordings(recordings.filter((rec) => rec.id !== id));
        Toast.show({ type: 'success', text1: 'Recording deleted.' });
    };

    const handleAddClip = () => {
        if (newClipName.length > 0 && newClipType.length > 0) {
            const newClip = {
                id: Date.now().toString(),
                name: newClipName,
                date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                duration: '0:20', // Example duration
                isFavorite: false,
                clipType: newClipType,
            };
            setRecordings([newClip, ...recordings]);
            setNewClipName('');
            setNewClipType('');
            Toast.show({ type: 'success', text1: 'Clip added successfully!' });
        } else {
            Toast.show({ type: 'error', text1: 'Please fill all fields for the new clip.' });
        }
    };

    return (
        <ScrollView className="flex-1 bg-background p-6">
            <Text className="text-3xl font-bold text-text mb-6">
                Recordings
            </Text>

            {/* Manual Recording Section */}
            <View className="mb-8 p-4 bg-surface rounded-xl shadow-lg">
                <Text className="text-xl font-bold text-text mb-4">
                    Record a New Clip (10-30s)
                </Text>
                <TextInput
                    className="w-full h-12 px-4 rounded-xl bg-background text-text mb-4 border border-surface"
                    placeholder="Enter clip name (e.g., 'Mom's voice')"
                    placeholderTextColor={colors.subtle}
                    value={newClipName}
                    onChangeText={setNewClipName}
                />
                <TextInput
                    className="w-full h-12 px-4 rounded-xl bg-background text-text mb-4 border border-surface"
                    placeholder="Enter type (e.g., 'Role', 'Voice')"
                    placeholderTextColor={colors.subtle}
                    value={newClipType}
                    onChangeText={setNewClipType}
                />
                <Pressable
                    className="w-full py-4 bg-primary rounded-xl flex-row justify-center items-center active:bg-secondary"
                    onPress={handleAddClip}>
                    <PlusCircleIcon size={24} color="white" className="mr-2" />
                    <Text className="text-text text-lg font-bold">Start Recording</Text>
                </Pressable>
            </View>

            {/* Recordings List */}
            <Text className="text-2xl font-bold text-text mb-4">
                My Recordings ({recordings.length})
            </Text>
            {recordings.map((recording) => (
                <View
                    key={recording.id}
                    className="flex-row items-center p-4 bg-surface rounded-xl mb-3 shadow-md"
                >
                    <Pressable
                        className="w-12 h-12 rounded-full bg-primary justify-center items-center"
                        onPress={() => handlePlayPause(recording.id)}
                    >
                        {isPlaying === recording.id ? (
                            <PauseIcon size={24} color="white" />
                        ) : (
                            <PlayIcon size={24} color="white" />
                        )}
                    </Pressable>
                    <View className="flex-1 mx-4">
                        <Text className="text-lg font-semibold text-text">{recording.name}</Text>
                        <Text className="text-sm text-subtle mt-1">{recording.date} • {recording.duration}</Text>
                        <Text className="text-xs text-accent mt-1">{recording.clipType}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Pressable onPress={() => handleFavorite(recording.id)} className="p-2">
                            <StarIcon
                                size={24}
                                color={recording.isFavorite ? colors.warning : colors.subtle}
                            />
                        </Pressable>
                        <Pressable onPress={() => handleDelete(recording.id)} className="p-2 ml-2">
                            <TrashIcon size={24} color={colors.error} />
                        </Pressable>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

export default RecordingReviewScreen;