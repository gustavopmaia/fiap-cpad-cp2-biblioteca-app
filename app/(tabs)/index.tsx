import { useState } from "react";
import { router } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useBooks } from "../../context/BooksContext";
import { useTheme, themes } from "../../context/ThemeContext";
import BookCard from "../../components/BookCard";

type Colors = typeof themes.dark;

export default function Home() {
  const { books, toggleFavorite } = useBooks();
  const { colors } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [soFavoritos, setSoFavoritos] = useState(false);

  const booksList = Object.values(books).filter((book) => {
    const matchSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFav = soFavoritos ? book.isFavorite : true;
    return matchSearch && matchFav;
  });

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

      <TouchableOpacity
        style={[s.filtroFav, soFavoritos && s.filtroFavAtivo]}
        onPress={() => setSoFavoritos((v) => !v)}
      >
        <Ionicons
          name={soFavoritos ? "heart" : "heart-outline"}
          size={16}
          color={soFavoritos ? "#FFF" : colors.accent}
        />
        <Text style={[s.filtroFavTexto, soFavoritos && s.filtroFavTextoAtivo]}>
          Favoritos
        </Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={s.list}>
        {booksList.length === 0 && (
          <Text style={s.emptyText}>Nenhum resultado encontrado.</Text>
        )}
        {booksList.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            colors={colors}
            onPress={() => router.push(`/livro/${book.id}`)}
            onFavorite={() => toggleFavorite(book.id)}
          />
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
    filtroFav: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 12,
      alignSelf: "flex-start",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.accent,
    },
    filtroFavAtivo: {
      backgroundColor: colors.accent,
    },
    filtroFavTexto: {
      fontSize: 13,
      color: colors.accent,
      fontWeight: "600",
    },
    filtroFavTextoAtivo: {
      color: "#FFF",
    },
    emptyText: {
      marginTop: 32,
      textAlign: "center",
      fontSize: 14,
      color: colors.textMuted,
    },
    list: {
      marginTop: 14,
      gap: 12,
      paddingBottom: 40,
    },
  });
