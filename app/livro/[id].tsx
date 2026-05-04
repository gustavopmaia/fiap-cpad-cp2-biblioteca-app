import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useBooks } from "../../context/BooksContext";
import { useTheme, themes } from "../../context/ThemeContext";

type Colors = typeof themes.dark;

export default function BookPage() {
  const { books, rentBook } = useBooks();
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const bookId = Number(Array.isArray(id) ? id[0] : id);
  const book = books[bookId];

  const [loading, setLoading] = useState(false);

  const s = styles(colors);

  async function handleRentBook() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    rentBook(book.id);
    setLoading(false);
  }

  if (!book) {
    return (
      <View style={s.notFound}>
        <Text style={s.notFoundText}>Livro não encontrado.</Text>
        <TouchableOpacity style={s.backButton} onPress={() => router.replace("/")}>
          <Text style={s.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={s.container}>
      <Image source={{ uri: book.image }} style={s.image} />
      <Text style={s.title}>{book.title}</Text>
      <Text style={s.author}>{book.author}</Text>
      <Text style={s.year}>Ano de lançamento: {book.year}</Text>
      <Text style={s.description}>{book.description}</Text>

      {book.isRent && (
        <View style={s.alugadoBanner}>
          <Ionicons name="time-outline" size={20} color="#FFF" />
          <View>
            <Text style={s.alugadoBannerTitulo}>Livro indisponível</Text>
            <Text style={s.alugadoBannerSub}>Este exemplar está alugado no momento</Text>
          </View>
        </View>
      )}

      <TouchableOpacity
        style={[s.button, (book.isRent || loading) && s.buttonDisabled]}
        activeOpacity={0.85}
        disabled={book.isRent || loading}
        onPress={handleRentBook}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={s.buttonText}>
            {book.isRent ? "Indisponível para aluguel" : "Alugar livro"}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      padding: 20,
      paddingBottom: 40,
      backgroundColor: colors.background,
    },
    image: {
      width: "100%",
      height: 320,
      borderRadius: 16,
      backgroundColor: colors.imageBg,
      marginBottom: 20,
    },
    title: {
      fontSize: 28,
      fontWeight: "700",
      color: colors.text,
    },
    author: {
      marginTop: 8,
      fontSize: 16,
      color: colors.textSecondary,
    },
    year: {
      marginTop: 8,
      fontSize: 13,
      color: colors.textMuted,
    },
    description: {
      marginTop: 20,
      fontSize: 15,
      lineHeight: 24,
      color: colors.textSecondary,
    },
    alugadoBanner: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginTop: 20,
      backgroundColor: colors.accent,
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
      backgroundColor: colors.accent,
      borderRadius: 16,
      paddingVertical: 16,
      alignItems: "center",
    },
    buttonDisabled: {
      backgroundColor: colors.textMuted,
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
      backgroundColor: colors.background,
    },
    notFoundText: {
      fontSize: 20,
      fontWeight: "700",
      color: colors.text,
    },
    backButton: {
      marginTop: 20,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.accent,
      paddingVertical: 16,
      alignItems: "center",
    },
    backButtonText: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "600",
    },
  });
