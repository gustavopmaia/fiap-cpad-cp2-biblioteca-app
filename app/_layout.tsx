import { useEffect } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';

import { BooksProvider } from '../books-context';
import { AuthProvider, useAuth } from '../context/AuthContext';

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

export default function Layout() {
  return (
    <AuthProvider>
      <BooksProvider>
        <AuthRedirect />
        <Stack screenOptions={screenOptions}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="livro/[id]"
            options={{
              title: 'Detalhes do Livro',
              headerBackButtonDisplayMode: 'minimal',
            }}
          />
        </Stack>
      </BooksProvider>
    </AuthProvider>
  );
}

const screenOptions = {
  headerStyle: {
    backgroundColor: '#0F1115',
  },
  headerTitleStyle: {
    color: '#FFFFFF',
    fontWeight: '700' as const,
  },
  headerTintColor: '#E83D84',
  contentStyle: {
    backgroundColor: '#0F1115',
  },
};
