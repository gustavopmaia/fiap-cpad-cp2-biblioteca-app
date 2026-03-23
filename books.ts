export type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
  image: string;
  description: string;
  isRent: boolean;
};

export type Books = {
  [key: number]: Book;
};

export const books: Books = {
  1: {
    id: 1,
    title: "Livro 1",
    author: "Gabriel Fidalgo",
    year: 1234,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    description: "Um livro de exemplo para mostrar os detalhes na nova tela.",
    isRent: false,
  },
  2: {
    id: 2,
    title: "Teste 2",
    author: "Gustavo Maia",
    year: 1234,
    image:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=900&q=80",
    description: "Outro livro da lista, agora com uma descrição simples.",
    isRent: false,
  },
  3: {
    id: 3,
    title: "Teste 3",
    author: "Gustavo Rossi",
    year: 1234,
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80",
    description: "Esse livro serve para testar a navegação entre as páginas.",
    isRent: false,
  },
  4: {
    id: 4,
    title: "Teste 4",
    author: "Pedro Lima",
    year: 1234,
    image:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=900&q=80",
    description: "Mais um item de exemplo para completar a listagem.",
    isRent: false,
  },
};
