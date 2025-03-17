import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

export default function EmojiSticker({ imageSize, stickerSource }) {
    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            scaleImage.value = scaleImage.value === imageSize ? imageSize * 2 : imageSize;
        });

    const drag = Gesture.Pan().onChange(event => {
        translateX.value += event.changeX;
        translateY.value += event.changeY;
    });

    const imageStyle = useAnimatedStyle(() => ({
        width: withSpring(scaleImage.value),
        height: withSpring(scaleImage.value),
    }));

    const containerStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
        ],
    }));

    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle /* ,{top: -350} solo si es intencional */]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.Image
                        source={stickerSource}
                        resizeMode="contain"
                        style={imageStyle}
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}
