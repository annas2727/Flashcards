import React, { useEffect } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  question: string;
  answer: string;
  flipped: boolean;
  onFlip: () => void;
};

export default function Flashcard({
  question,
  answer,
  flipped,
  onFlip,
}: Props) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(flipped ? 180 : 0, {
      duration: 300,
    });
  }, [flipped]);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${rotation.value}deg` },
    ],
    opacity: rotation.value > 90 ? 0 : 1,
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1000 },
      { rotateY: `${rotation.value + 180}deg` },
    ],
    opacity: rotation.value > 90 ? 1 : 0,
  }));

  return (
    <Pressable onPress={onFlip}>
      <View style={styles.container}>
        <Animated.View style={[styles.card, frontStyle]}>
          <Text style={styles.title}>Question</Text>
          <Text style={styles.text}>{question}</Text>
        </Animated.View>

        <Animated.View style={[styles.card, styles.back, backStyle]}>
          <Text style={styles.title}>Answer</Text>
          <Text style={styles.text}>{answer}</Text>
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 220,
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backfaceVisibility: "hidden",
    elevation: 4,
  },
  back: {
    backgroundColor: "#dbeafe",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    textAlign: "center",
  },
});