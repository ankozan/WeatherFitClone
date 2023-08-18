import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FirstPage from './screens/FirstPage';

export default function App() {
  return (
    <View style={styles.container}>
      <FirstPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f2f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
