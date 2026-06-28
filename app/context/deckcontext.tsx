import React, { createContext, useContext, useState } from "react";

export type Card = {
  question: string;
  answer: string;
};

type DeckContextType = {
  deck: Card[];
  addCard: (card: Card) => void;
  updateCard: (index: number, card: Card) => void;
  removeCard: (index: number) => void;
};

const DeckContext = createContext<DeckContextType | undefined>(undefined);

const initialDeck: Card[] = [
  {
    question: "Hello",
    answer: "Tere",
  },
  {
    question: "Goodbye",
    answer: "Head aega",
  }
];

export function DeckProvider({ children }: { children: React.ReactNode }) {
  const [deck, setDeck] = useState(initialDeck);

  function addCard(card: Card) {
    setDeck((old) => [...old, card]);
  }

  function updateCard(index: number, card: Card) {
    setDeck((old) =>
      old.map((c, i) => (i === index ? card : c))
    );
  }

  function removeCard(index: number) {
    setDeck((old) => old.filter((_, i) => i !== index));
  }

  return (
    <DeckContext.Provider
      value={{
        deck,
        addCard,
        updateCard,
        removeCard,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
}

export function useDeck() {
  const context = useContext(DeckContext);

  if (!context) {
    throw new Error("useDeck must be used inside DeckProvider");
  }

  return context;
}