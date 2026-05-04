export type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
  image: string;
  description: string;
  isRent: boolean;
  isFavorite: boolean;
};

export type Books = {
  [key: number]: Book;
};

export const books: Books = {
  1: {
    id: 1,
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
    image: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg",
    description:
      "Um guia de boas práticas para escrever código limpo, legível e fácil de manter. Robert Martin apresenta princípios, padrões e técnicas usadas por profissionais para produzir código de qualidade — referência padrão na área.",
    isRent: false,
    isFavorite: false,
  },
  2: {
    id: 2,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt e David Thomas",
    year: 1999,
    image: "https://covers.openlibrary.org/b/isbn/9780201616224-L.jpg",
    description:
      "Uma visão abrangente sobre a mentalidade e prática do desenvolvimento de software. Cobre desde filosofia de carreira até técnicas concretas, ensinando como ser um desenvolvedor de verdade — não apenas um técnico.",
    isRent: false,
    isFavorite: false,
  },
  3: {
    id: 3,
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    year: 1994,
    image: "https://covers.openlibrary.org/b/isbn/9780201633610-L.jpg",
    description:
      "O clássico da arquitetura de software, também conhecido como 'Gang of Four'. Apresenta 23 padrões de projeto orientado a objetos que resolvem problemas recorrentes de design — leitura obrigatória para quem pensa em arquitetura.",
    isRent: false,
    isFavorite: false,
  },
  4: {
    id: 4,
    title: "You Don't Know JS (Yet)",
    author: "Kyle Simpson",
    year: 2015,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4jZtjaMvLU0hqGTEYfZN43_foA3zn4nFEXA&s",
    description:
      "Uma série que mergulha fundo nos mecanismos internos do JavaScript — escopo, closures, this, protótipos e mais. Perfeito para quem trabalha com React Native e quer entender de verdade a linguagem por baixo.",
    isRent: false,
    isFavorite: false,
  },
};
