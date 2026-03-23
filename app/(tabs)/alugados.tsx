import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useBooks } from "../../books-context";

export default function RentedBooksPage() {
  const { books, returnBook } = useBooks();
  const rentedBooks = Object.values(books).filter((book) => book.isRent);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Livros alugados</Text>

      {rentedBooks.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum livro alugado.</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.list}>
          {rentedBooks.map((book) => (
            <View key={book.id} style={styles.card}>
              <Image source={{ uri: book.image }} style={styles.image} />

              <View style={styles.content}>
                <Text style={styles.bookName}>{book.title}</Text>
                <Text style={styles.author}>{book.author}</Text>
              </View>

              <TouchableOpacity
                style={styles.removeButton}
                activeOpacity={0.85}
                onPress={() => returnBook(book.id)}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1115",
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  emptyText: {
    marginTop: 18,
    fontSize: 14,
    color: "#C7C7CC",
  },
  list: {
    marginTop: 18,
    gap: 12,
    paddingBottom: 40,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#181C23",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#262B36",
  },
  image: {
    width: 60,
    height: 84,
    borderRadius: 10,
    backgroundColor: "#262B36",
    marginRight: 14,
  },
  content: {
    flex: 1,
  },
  bookName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  author: {
    marginTop: 6,
    fontSize: 13,
    color: "#C7C7CC",
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E83D84",
    alignItems: "center",
    justifyContent: "center",
  },
  removeButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
