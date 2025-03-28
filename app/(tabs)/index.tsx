import { Redirect } from 'expo-router';

export default function Index() {
  // Rediriger vers la page du jeu de morpion par défaut
  return <Redirect href="/(tabs)/tictactoe" />;
}