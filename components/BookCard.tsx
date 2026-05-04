import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Book } from "../data/books";
import type { themes } from "../context/ThemeContext";

type Colors = typeof themes.dark;

type Props = {
  book: Book;
  colors: Colors;
  onPress: () => void;
  onFavorite: () => void;
};

export default function BookCard({ book, colors, onPress, onFavorite }: Props) {
  const s = styles(colors);

  return (
    <TouchableOpacity
      style={[s.card, book.isRent && s.cardAlugado]}
      activeOpacity={0.85}
      onPress={onPress}
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
        onPress={onFavorite}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name={book.isFavorite ? "heart" : "heart-outline"}
          size={24}
          color={book.isFavorite ? colors.accent : colors.textMuted}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = (colors: Colors) =>
  StyleSheet.create({
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
  });
