import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';

import { BooksProvider } from '../books-context';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';

function AuthRedirect() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuth = segments[0] === '(auth)';

    if (!user && !inAuth) {
      router.replace('/(auth)/login');
    } else if (user && inAuth) {
      router.replace('/(tabs)');
    }
  }, [user, isLoading, segments]);

  return null;
}

function AppStack() {
  const { colors } = useTheme();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text, fontWeight: '700' as const },
        headerTintColor: colors.accent,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="livro/[id]"
        options={{ title: 'Detalhes do Livro', headerBackButtonDisplayMode: 'minimal' }}
      />
    </Stack>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BooksProvider>
          <AuthRedirect />
          <AppStack />
        </BooksProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
