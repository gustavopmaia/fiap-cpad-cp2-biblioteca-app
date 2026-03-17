import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";

type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
};

const books: Book[] = [
  { id: 1, title: "Teste 1", author: "Gabriel Fidalgo", year: 1234 },
  { id: 2, title: "Teste 2", author: "Gustavo Maia", year: 1234 },
  { id: 3, title: "Teste 3", author: "Gustavo Rossi", year: 1234 },
  { id: 4, title: "Teste 4", author: "Pedro Lima", year: 1234 },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biblioteca Virtual</Text>

      <ScrollView contentContainerStyle={styles.list}>
        {books.map((book) => (
          <TouchableOpacity key={book.id} style={styles.card} onPress={() => {}}>
            <Text style={styles.bookName}>{book.title}</Text>
            <Text style={styles.author}>{book.author}</Text>
            <Text style={styles.year}>Ano de lançamento: {book.year}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1115",
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  subtitle: {
    fontSize: 14,
    color: "#A1A1AA",
    marginTop: 6,
    marginBottom: 24,
  },

  list: {
    marginTop: 10,
    gap: 12,
    paddingBottom: 40,
  },

  listContent: {
    gap: 12,
    paddingBottom: 24,
  },

  card: {
    backgroundColor: "#181C23",
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#262B36",
  },

  bookName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 6,
  },

  author: {
    fontSize: 14,
    color: "#C7C7CC",
  },

  year: {
    marginTop: 8,
    fontSize: 12,
    color: "#8E8E93",
  },
});
