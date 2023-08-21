// FirstPage.js
import React from 'react';
import { Image, View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import WeatherInfo from '../components/WeatherInfo';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Font Awesome icons

const FirstPage = () => {
    return (
        <View style={styles.container}>

            <WeatherInfo />
            <Image
                source={require('../assets/60-70-norain-men-removebg.png')}
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
        height: '60%', // Adjust the image height as needed
        top: 100,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 55,
        left: 90,
        zIndex: 1,
    },
    buttonText: {
        color: 'white',
        marginLeft: 5,
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.5,
    },
});

export default FirstPage;
