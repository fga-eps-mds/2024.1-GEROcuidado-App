import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { database } from './src/db';
import AppNavigator from './AppNavigator'; // ajuste o caminho conforme necessário




export default function App() {
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F1F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

AppRegistry.registerComponent('GEROCuidado', () => App);
