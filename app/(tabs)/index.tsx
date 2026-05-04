import { useState } from "react";
import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useBooks } from "../../books-context";

export default function Home() {
  const { books } = useBooks();
  const [searchTerm, setSearchTerm] = useState("");

  const booksList = Object.values(books).filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Biblioteca Virtual</Text>

      <TextInput
        style={styles.search}
        placeholder="Buscar por título..."
        placeholderTextColor="#666"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <ScrollView contentContainerStyle={styles.list}>
        {booksList.length === 0 && (
          <Text style={styles.emptyText}>Nenhum resultado encontrado.</Text>
        )}
        {booksList.map((book) => (
          <TouchableOpacity
            key={book.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => router.push(`/livro/${book.id}`)}
          >
            <Image source={{ uri: book.image }} style={styles.image} />

            <View style={styles.content}>
              <Text style={styles.bookName}>{book.title}</Text>
              <Text style={styles.author}>{book.author}</Text>
              <Text style={styles.year}>Ano de lançamento: {book.year}</Text>
              {book.isRent && <Text style={styles.status}>Alugado</Text>}
            </View>
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
    paddingTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  search: {
    marginTop: 16,
    backgroundColor: "#181C23",
    borderWidth: 1,
    borderColor: "#262B36",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: "#FFFFFF",
  },
  emptyText: {
    marginTop: 32,
    textAlign: "center",
    fontSize: 14,
    color: "#8E8E93",
  },
  list: {
    marginTop: 18,
    gap: 12,
    paddingBottom: 40,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#181C23",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#262B36",
  },
  image: {
    width: 70,
    height: 100,
    borderRadius: 10,
    backgroundColor: "#262B36",
    marginRight: 14,
  },
  content: {
    flex: 1,
    justifyContent: "center",
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
  status: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "700",
    color: "#E83D84",
  },
});
