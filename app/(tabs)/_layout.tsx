import { TouchableOpacity, View } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function TabsLayout() {
  const { logout } = useAuth();
  const { theme, colors, toggleTheme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <View style={{ flexDirection: "row", gap: 16, marginRight: 16 }}>
            <TouchableOpacity onPress={toggleTheme}>
              <Ionicons
                name={theme === "dark" ? "sunny-outline" : "moon-outline"}
                size={24}
                color="#E83D84"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <Ionicons name="log-out-outline" size={24} color="#E83D84" />
            </TouchableOpacity>
          </View>
        ),
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text, fontWeight: "700" },
        headerTintColor: colors.accent,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textMuted,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Biblioteca Virtual",
          tabBarLabel: "Início",
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="alugados"
        options={{
          title: "Livros Alugados",
          tabBarLabel: "Alugados",
          tabBarIcon: ({ color, size }) => <Ionicons name="book" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
