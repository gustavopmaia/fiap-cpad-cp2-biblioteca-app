import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useBooks } from "../../books-context";
import { useTheme, themes } from "../../context/ThemeContext";

type Colors = typeof themes.dark;

export default function RentedBooksPage() {
  const { books, returnBook } = useBooks();
  const { colors } = useTheme();
  const rentedBooks = Object.values(books).filter((book) => book.isRent);

  const s = styles(colors);

  return (
    <View style={s.container}>
      <Text style={s.title}>Livros alugados</Text>

      {rentedBooks.length === 0 ? (
        <Text style={s.emptyText}>Nenhum livro alugado.</Text>
      ) : (
        <ScrollView contentContainerStyle={s.list}>
          {rentedBooks.map((book) => (
            <View key={book.id} style={s.card}>
              <Image source={{ uri: book.image }} style={s.image} />

              <View style={s.content}>
                <Text style={s.bookName}>{book.title}</Text>
                <Text style={s.author}>{book.author}</Text>
              </View>

              <TouchableOpacity
                style={s.removeButton}
                activeOpacity={0.85}
                onPress={() => returnBook(book.id)}
              >
                <Text style={s.removeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
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
    emptyText: {
      marginTop: 18,
      fontSize: 14,
      color: colors.textSecondary,
    },
    list: {
      marginTop: 18,
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
    image: {
      width: 60,
      height: 84,
      borderRadius: 10,
      backgroundColor: colors.imageBg,
      marginRight: 14,
    },
    content: {
      flex: 1,
    },
    bookName: {
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
    },
    author: {
      marginTop: 6,
      fontSize: 13,
      color: colors.textSecondary,
    },
    removeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: colors.accent,
      alignItems: "center",
      justifyContent: "center",
    },
    removeButtonText: {
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "700",
    },
  });
