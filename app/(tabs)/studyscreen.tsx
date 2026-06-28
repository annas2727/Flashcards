import Flashcard from '@/components/flashcard';
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDeck } from "../context/deckcontext";


export default function StudyScreen() {
  const { deck } = useDeck();

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = deck[index];

  function nextCard() {
    if (index < deck.length - 1) {
      setFlipped(false);
      setIndex(index + 1);
    }
  }

  function previousCard() {
    if (index > 0) {
      setFlipped(false);
      setIndex(index - 1);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        {index + 1} / {deck.length}
      </Text>

      <Flashcard
        question={card.question}
        answer={card.answer}
        flipped={flipped}
        onFlip={() => setFlipped(!flipped)}
      />

      <View style={styles.buttons}>
        <Button title="Previous" onPress={previousCard} disabled={index === 0} />
        <Button
          title="Next"
          onPress={nextCard}
          disabled={index === deck.length - 1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
  },
  progress: {
    fontSize: 20,
    fontWeight: "600",
  },
  buttons: {
    flexDirection: "row",
    gap: 20,
  },
});