import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FirstPage from './screens/FirstPage';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  return (
    <MenuProvider>

      <View style={styles.container}>
        <FirstPage />
      </View></MenuProvider>
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
