// TestComponent.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherInfo = () => {
    return (
        <View style={styles.container}>
            <Text>Puyallup</Text>
            <Text>Hazy</Text>
            <Text>Feels Like 88</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
        top: "10%"
    },
});


export default WeatherInfo;
