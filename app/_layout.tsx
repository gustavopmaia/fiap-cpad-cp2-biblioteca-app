import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={screenOptions}>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="livro/[id]"
        options={{
          title: "Detalhes do Livro",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}

const screenOptions = {
  headerStyle: {
    backgroundColor: "#0F1115",
  },
  headerTitleStyle: {
    color: "#FFFFFF",
    fontWeight: "700" as const,
  },
  headerTintColor: "#E83D84",
  contentStyle: {
    backgroundColor: "#0F1115",
  },
};
