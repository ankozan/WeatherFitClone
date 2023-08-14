// FirstPage.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import WeatherInfo from '../components/WeatherInfo';

const FirstPage = () => {
    return (
        <View style={styles.container}>
            <WeatherInfo />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FirstPage;
