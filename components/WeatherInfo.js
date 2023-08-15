import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WeatherInfo = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.cityName}>Puyallup</Text>
            <Text style={styles.condition}>Hazy</Text>
            <Text style={styles.temperature}>84°F</Text>
            <Text style={styles.feelsLike}>Feels Like 88°F</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 10,
        padding: 20,
        width: 250,
        top: '5%',

        marginLeft: 'auto',
        marginRight: 'auto',
        zIndex: 10,
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    condition: {
        fontSize: 18,
        marginBottom: 5,
    },
    temperature: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    feelsLike: {
        fontSize: 16,
    },
});

export default WeatherInfo;
