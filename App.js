import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { database } from './src/db';
import TelaInicial from './src/components/TelaInicial';
import Login from './src/components/Login';

export default function App() {
  return (
    <View style={styles.container}>
      <TelaInicial/>
    </View>
  );
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
