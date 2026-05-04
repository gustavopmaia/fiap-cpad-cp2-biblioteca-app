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
import { Ionicons } from "@expo/vector-icons";

import { useBooks } from "../../books-context";
import { useTheme, themes } from "../../context/ThemeContext";

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
          <TouchableOpacity
            key={book.id}
            style={[s.card, book.isRent && s.cardAlugado]}
            activeOpacity={0.85}
            onPress={() => router.push(`/livro/${book.id}`)}
          >
            <View>
              <Image source={{ uri: book.image }} style={s.image} />
              {book.isRent && (
                <View style={s.imageBadge}>
                  <Text style={s.imageBadgeTexto}>ALUGADO</Text>
                </View>
              )}
            </View>

            <View style={s.content}>
              <Text style={s.bookName}>{book.title}</Text>
              <Text style={s.author}>{book.author}</Text>
              <Text style={s.year}>Ano de lançamento: {book.year}</Text>
              {book.isRent && (
                <View style={s.statusBadge}>
                  <Ionicons name="time-outline" size={12} color="#FFF" />
                  <Text style={s.statusBadgeTexto}>Indisponível</Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={() => toggleFavorite(book.id)}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name={book.isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={book.isFavorite ? colors.accent : colors.textMuted}
              />
            </TouchableOpacity>
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
    filtroFav: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      gap: 6,
      marginTop: 12,
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
    card: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      padding: 14,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    cardAlugado: {
      borderColor: colors.accent,
      opacity: 0.75,
    },
    image: {
      width: 70,
      height: 100,
      borderRadius: 10,
      backgroundColor: colors.imageBg,
      marginRight: 14,
    },
    imageBadge: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 14,
      backgroundColor: colors.accent,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      paddingVertical: 3,
      alignItems: "center",
    },
    imageBadgeTexto: {
      color: "#FFF",
      fontSize: 9,
      fontWeight: "800",
      letterSpacing: 0.5,
    },
    statusBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      marginTop: 8,
      alignSelf: "flex-start",
      backgroundColor: colors.accent,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 6,
    },
    statusBadgeTexto: {
      color: "#FFF",
      fontSize: 11,
      fontWeight: "700",
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
