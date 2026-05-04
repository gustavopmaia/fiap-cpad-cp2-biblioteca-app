import { router, useLocalSearchParams } from "expo-router";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useBooks } from "../../books-context";

export default function BookPage() {
  const { books, rentBook } = useBooks();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const bookId = Number(Array.isArray(id) ? id[0] : id);
  const book = books[bookId];

  function handleRentBook() {
    rentBook(book.id);
    Alert.alert("Sucesso", "Livro alugado com sucesso.");
  }

  if (!book) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Livro não encontrado.</Text>

        <TouchableOpacity style={styles.backButton} onPress={() => router.replace("/")}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: book.image }} style={styles.image} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Text style={styles.year}>Ano de lançamento: {book.year}</Text>
      <Text style={styles.description}>{book.description}</Text>

      {book.isRent && (
        <View style={styles.alugadoBanner}>
          <Ionicons name="time-outline" size={20} color="#FFF" />
          <View>
            <Text style={styles.alugadoBannerTitulo}>Livro indisponível</Text>
            <Text style={styles.alugadoBannerSub}>Este exemplar está alugado no momento</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, book.isRent && styles.buttonDisabled]}
        activeOpacity={0.85}
        disabled={book.isRent}
        onPress={handleRentBook}
      >
        <Text style={styles.buttonText}>{book.isRent ? "Indisponível para aluguel" : "Alugar livro"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: "#0F1115",
  },
  image: {
    width: "100%",
    height: 320,
    borderRadius: 16,
    backgroundColor: "#262B36",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  author: {
    marginTop: 8,
    fontSize: 16,
    color: "#C7C7CC",
  },
  year: {
    marginTop: 8,
    fontSize: 13,
    color: "#8E8E93",
  },
  description: {
    marginTop: 20,
    fontSize: 15,
    lineHeight: 24,
    color: "#C7C7CC",
  },
  alugadoBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
    backgroundColor: "#E83D84",
    borderRadius: 12,
    padding: 14,
  },
  alugadoBannerTitulo: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
  },
  alugadoBannerSub: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    marginTop: 2,
  },
  button: {
    marginTop: 24,
    backgroundColor: "#E83D84",
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#555962",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#0F1115",
  },
  notFoundText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  backButton: {
    marginTop: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E83D84",
    paddingVertical: 16,
    alignItems: "center",
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});
