import { createContext, useContext, useState, type ReactNode } from "react";

import { books as initialBooks } from "./books";
import type { Books } from "./books";

type BooksContextData = {
  books: Books;
  rentBook: (id: number) => void;
  returnBook: (id: number) => void;
};

const BooksContext = createContext<BooksContextData | null>(null);

export function BooksProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState(initialBooks);

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
