import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Font Awesome icons

const WeatherInfo = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [updatingLocation, setUpdatingLocation] = useState(false);

    const fetchPostalCode = async () => {
        if (Platform.OS === 'android' && !Device.isDevice) {
            setErrorMsg(
                'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
            );
            return;
        }

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync(location.coords);
        let postalCode = address[0].postalCode;
        setPostalCode(postalCode);
    };
    const fetchData = async () => {
        await fetchPostalCode();
        console.log(postalCode);
        const location = postalCode; // Replace with your desired location
        const data = await getWeatherData(location);
        if (data) {
            const extractedInfo = extractWeatherInfo(data);
            setWeatherData(extractedInfo);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateWeather = async () => {
        setUpdatingLocation(true); // Start location update

        await fetchData();

        setUpdatingLocation(false); // Location update complete
    };


    return (
        <View style={styles.container}>
            {weatherData ? (
                <>
                    <TouchableOpacity style={styles.buttonContainer} onPress={updateWeather}>
                        {updatingLocation ? (
                            <Text style={styles.updateText}>Updating Location...</Text>
                        ) : (
                            <>
                                <Text style={styles.cityName}>{weatherData.location}</Text>
                                <Icon name="search" size={25} color="black" />
                            </>
                        )}
                    </TouchableOpacity>


                    <Text style={styles.condition}>{weatherData.condition}</Text>
                    <Text style={styles.temperature}>{weatherData.temperature}°F</Text>
                    <Text style={styles.recommendation}>{weatherData.recommendation}</Text>
                </>
            ) : (
                <Text>Loading weather data...</Text>
            )}
        </View>
    );
};

// Rest of your code (getWeatherData, extractWeatherInfo, getOutfitRecommendation, styles)

async function getWeatherData(location) {
    const API_URL = "https://api.weatherapi.com/v1/current.json"
    const API_KEY = "78b83d2610dc41679a4200242230707"

    const url = `${API_URL}?key=${API_KEY}&q=${location}`;

    try {
        const response = await axios.get(url);
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

function extractWeatherInfo(data) {
    try {
        const temperature = data.current.temp_f;
        const condition = data.current.condition.text;
        const humidity = data.current.humidity;
        const location = data.location.name;
        const recommendation = getOutfitRecommendation(temperature); // Get the outfit recommendation
        return {
            temperature,
            condition,
            humidity,
            location,
            recommendation
        };
    } catch (error) {
        console.error('Error extracting weather information:', error);
        return null;
    }
}

function getOutfitRecommendation(temperature) {
    // Implement your outfit recommendation logic here
    // Return the appropriate recommendation based on the temperature
    // Example:
    if (temperature > 70) {
        return 'Wear light and breathable clothing.';
    } else if (temperature <= 70 && temperature > 50) {
        return 'Consider wearing a light jacket.';
    } else {
        return 'Bundle up with warm clothing.';
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#f3f2f2',
        borderRadius: 10,
        padding: 20,
        width: 'auto',
        top: '5%',
        marginLeft: 'auto',
        marginRight: 'auto',
        zIndex: 10,
    },
    cityName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        right: 10,
    },
    condition: {
        fontSize: 18,
        marginBottom: 5,
        fontWeight: 'bold',

    },
    temperature: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    recommendation: {
        fontSize: 16,
        fontWeight: 'bold',

    },
    buttonContainer: {
        flexDirection: 'row', // Align items horizontally
        alignItems: 'center', // Center items vertically
        padding: 10,
        backgroundColor: '#f3f2f2',
        borderRadius: 5,
        marginBottom: 10,
    },

});

export default WeatherInfo;
