import { Stack } from "expo-router";

import { BooksProvider } from "../books-context";

export default function Layout() {
  return (
    <BooksProvider>
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
    </BooksProvider>
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
