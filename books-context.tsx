import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { books as initialBooks } from "./books";
import type { Books } from "./books";

const BOOKS_KEY = "@app:books";

type BooksContextData = {
  books: Books;
  rentBook: (id: number) => void;
  returnBook: (id: number) => void;
};

const BooksContext = createContext<BooksContextData | null>(null);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState(initialBooks);

  useEffect(() => {
    AsyncStorage.getItem(BOOKS_KEY).then((data) => {
      if (data) setBooks(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  }, [books]);

  function rentBook(id: number) {
    setBooks((current) => ({
      ...current,
      [id]: {
        ...current[id],
        isRent: true,
      },
    }));
  }

  function returnBook(id: number) {
    setBooks((current) => ({
      ...current,
      [id]: {
        ...current[id],
        isRent: false,
      },
    }));
  }

  return (
    <BooksContext.Provider value={{ books, rentBook, returnBook }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);

  if (!context) {
    throw new Error("useBooks precisa estar dentro de BooksProvider");
  }

  return context;
}
