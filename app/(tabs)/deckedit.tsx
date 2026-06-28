import { useState } from "react";
import {
  Button,
  FlatList,
  TextInput,
  View
} from "react-native";
import { useDeck } from "../context/deckcontext";

export default function DeckEdit() {
  const {
    deck,
    addCard,
    updateCard,
    removeCard,
  } = useDeck();

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <View style={{ flex: 1, padding: 20 }}>

      <TextInput
        placeholder="Question"
        value={question}
        onChangeText={setQuestion}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
      />

      <TextInput
        placeholder="Answer"
        value={answer}
        onChangeText={setAnswer}
        style={{
          borderWidth: 1,
          marginBottom: 10,
          padding: 10,
        }}
      />

      <Button
        title="Add Card"
        onPress={() => {
          if (!question || !answer) return;

          addCard({
            question,
            answer,
          });

          setQuestion("");
          setAnswer("");
        }}
      />

      <FlatList
        style={{ marginTop: 20 }}
        data={deck}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
  <View
    style={{
      borderWidth: 1,
      padding: 10,
      marginBottom: 12,
    }}
  >
    <TextInput
      value={item.question}
      onChangeText={(text) =>
        updateCard(index, {
              ...item,
              question: text,
            })
          }
          style={{
            borderBottomWidth: 1,
            marginBottom: 8,
          }}
        />

        <TextInput
          value={item.answer}
          onChangeText={(text) =>
            updateCard(index, {
              ...item,
              answer: text,
            })
          }
          style={{
            borderBottomWidth: 1,
            marginBottom: 8,
          }}
        />

        <Button
          title="Delete"
          color="red"
          onPress={() => removeCard(index)}
        />
      </View>
    )}
      />
    </View>
  );
}