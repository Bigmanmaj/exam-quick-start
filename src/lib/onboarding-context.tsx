import { createContext, useContext, useState, type ReactNode } from "react";
import { resultSets, resultsFor, type Book, type Chapter } from "./mock-data";

type PaymentMethod = "card" | "google" | "apple";
type Provider = "unidays" | "google" | "apple" | "email";
type ReaderTheme = "paper" | "sepia" | "ink";

type OnboardingState = {
  query: string;
  setQuery: (value: string) => void;
  selectedBook: Book;
  selectedChapter: Chapter;
  selectBook: (book: Book, chapter?: Chapter) => void;
  provider: Provider;
  setProvider: (value: Provider) => void;
  payment: PaymentMethod;
  setPayment: (value: PaymentMethod) => void;
  signedUp: boolean;
  setSignedUp: (value: boolean) => void;
  fontSize: number;
  setFontSize: (value: number) => void;
  theme: ReaderTheme;
  setTheme: (value: ReaderTheme) => void;
  bookmarked: boolean;
  setBookmarked: (value: boolean) => void;
  highlighted: boolean;
  setHighlighted: (value: boolean) => void;
  note: string;
  setNote: (value: string) => void;
  topicStatus: Record<string, "Not started" | "In progress" | "Done">;
  cycleTopic: (topic: string) => void;
};

function getInitialData() {
  const fallback = resultSets[0];
  const initialBook = fallback?.books[0];
  const initialChapter = initialBook?.chapters[0];
  if (!fallback || !initialBook || !initialChapter) throw new Error("Mock onboarding data is incomplete");
  return { fallback, initialBook, initialChapter };
}

const initial = getInitialData();

const OnboardingContext = createContext<OnboardingState | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState(initial.fallback.prompt);
  const [selectedBook, setSelectedBook] = useState<Book>(initial.initialBook);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(initial.initialChapter);
  const [provider, setProvider] = useState<Provider>("email");
  const [payment, setPayment] = useState<PaymentMethod>("card");
  const [signedUp, setSignedUp] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [theme, setTheme] = useState<ReaderTheme>("paper");
  const [bookmarked, setBookmarked] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [note, setNote] = useState("");
  const [topicStatus, setTopicStatus] = useState<Record<string, "Not started" | "In progress" | "Done">>({});

  const updateQuery = (value: string) => {
    setQuery(value);
    const next = resultsFor(value).books[0] ?? initial.initialBook;
    const chapter = next?.chapters[0];
    if (next && chapter) {
      setSelectedBook(next);
      setSelectedChapter(chapter);
    }
  };
  const selectBook = (book: Book, chapter = book.chapters[0]) => {
    if (!chapter) return;
    setSelectedBook(book);
    setSelectedChapter(chapter);
  };
  const cycleTopic = (topic: string) => setTopicStatus((current) => {
    const status = current[topic] ?? "Not started";
    return { ...current, [topic]: status === "Not started" ? "In progress" : status === "In progress" ? "Done" : "Not started" };
  });

  return <OnboardingContext.Provider value={{ query, setQuery: updateQuery, selectedBook, selectedChapter, selectBook, provider, setProvider, payment, setPayment, signedUp, setSignedUp, fontSize, setFontSize, theme, setTheme, bookmarked, setBookmarked, highlighted, setHighlighted, note, setNote, topicStatus, cycleTopic }}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const value = useContext(OnboardingContext);
  if (!value) throw new Error("useOnboarding must be used within OnboardingProvider");
  return value;
}