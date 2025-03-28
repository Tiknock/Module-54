import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '../hooks/useThemeContext';
import { Provider } from 'react-redux';
import { store } from '../src/store/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: false 
            }} 
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
} 