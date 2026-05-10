import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';
import { colors } from '../styles/colors';

let toastRef = React.createRef();

const Toast = () => {
    const [toast, setToast] = useState(null);
    const translateY = useSharedValue(100);

    const show = (options) => {
        setToast(options);
    };

    const hide = () => {
        setToast(null);
    };

    useEffect(() => {
        if (toast) {
            translateY.value = withTiming(0, {
                duration: 300,
                easing: Easing.out(Easing.quad),
            });
            const timer = setTimeout(() => {
                translateY.value = withTiming(100, {
                    duration: 300,
                    easing: Easing.in(Easing.quad),
                }, (finished) => {
                    if (finished) {
                        hide();
                    }
                });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
            opacity: toast ? 1 : 0,
        };
    });

    if (!toast) return null;

    const getToastColor = () => {
        switch (toast.type) {
            case 'success':
                return colors.success;
            case 'error':
                return colors.error;
            case 'warning':
                return colors.warning;
            default:
                return colors.primary;
        }
    };

    return (
        <Animated.View style={[styles.container, animatedStyle, { backgroundColor: getToastColor() }]}>
            <View style={styles.content}>
                <Text style={styles.text1}>{toast.text1}</Text>
                {toast.text2 && <Text style={styles.text2}>{toast.text2}</Text>}
            </View>
        </Animated.View>
    );
};

Toast.show = (options) => {
    if (toastRef.current) {
        toastRef.current.show(options);
    }
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 50,
        left: 20,
        right: 20,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    content: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    text1: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
    },
    text2: {
        fontSize: 14,
        color: colors.text,
        marginTop: 5,
        textAlign: 'center',
    },
});

export default Toast;