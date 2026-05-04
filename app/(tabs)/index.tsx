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
import { useTheme, themes } from "../../context/ThemeContext";

type Colors = typeof themes.dark;

export default function Home() {
  const { books } = useBooks();
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");

  const booksList = Object.values(books).filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const s = styles(colors);

  return (
    <View style={s.container}>
      <Text style={s.title}>Biblioteca Virtual</Text>

      <TextInput
        style={s.search}
        placeholder="Buscar por título..."
        placeholderTextColor={colors.textMuted}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <ScrollView contentContainerStyle={s.list}>
        {booksList.length === 0 && (
          <Text style={s.emptyText}>Nenhum resultado encontrado.</Text>
        )}
        {booksList.map((book) => (
          <TouchableOpacity
            key={book.id}
            style={s.card}
            activeOpacity={0.85}
            onPress={() => router.push(`/livro/${book.id}`)}
          >
            <Image source={{ uri: book.image }} style={s.image} />

            <View style={s.content}>
              <Text style={s.bookName}>{book.title}</Text>
              <Text style={s.author}>{book.author}</Text>
              <Text style={s.year}>Ano de lançamento: {book.year}</Text>
              {book.isRent && <Text style={s.status}>Alugado</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 20,
      paddingTop: 24,
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: colors.text,
    },
    search: {
      marginTop: 16,
      backgroundColor: colors.inputBg,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 10,
      paddingHorizontal: 14,
      paddingVertical: 10,
      fontSize: 15,
      color: colors.text,
    },
    emptyText: {
      marginTop: 32,
      textAlign: "center",
      fontSize: 14,
      color: colors.textMuted,
    },
    list: {
      marginTop: 18,
      gap: 12,
      paddingBottom: 40,
    },
    card: {
      flexDirection: "row",
      backgroundColor: colors.card,
      padding: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    image: {
      width: 70,
      height: 100,
      borderRadius: 10,
      backgroundColor: colors.imageBg,
      marginRight: 14,
    },
    content: {
      flex: 1,
      justifyContent: "center",
    },
    bookName: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
      marginBottom: 6,
    },
    author: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    year: {
      marginTop: 8,
      fontSize: 12,
      color: colors.textMuted,
    },
    status: {
      marginTop: 8,
      fontSize: 12,
      fontWeight: "700",
      color: colors.accent,
    },
  });
