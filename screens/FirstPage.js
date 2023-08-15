// FirstPage.js
import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import WeatherInfo from '../components/WeatherInfo';

const FirstPage = () => {
    return (
        <View style={styles.container}>
            <WeatherInfo />
            <Image
                source={require('../assets/man2.png')}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 525, // Adjust the image width as needed
        height: 800, // Adjust the image height as needed
    },
});

export default FirstPage;
