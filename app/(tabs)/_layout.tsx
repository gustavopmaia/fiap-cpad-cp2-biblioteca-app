import { TouchableOpacity } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

export default function TabsLayout() {
  const { logout } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity onPress={logout} style={{ marginRight: 16 }}>
            <Ionicons name="log-out-outline" size={24} color="#E83D84" />
          </TouchableOpacity>
        ),
        headerStyle: {
          backgroundColor: "#0F1115",
        },
        headerTitleStyle: {
          color: "#FFFFFF",
          fontWeight: "700",
        },
        headerTintColor: "#E83D84",
        tabBarStyle: {
          backgroundColor: "#12161D",
          borderTopColor: "#262B36",
          height: 62,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: "#E83D84",
        tabBarInactiveTintColor: "#8E8E93",
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
