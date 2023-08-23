import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput, Modal } from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Font Awesome icons
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';


const WeatherInfo = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    const [updatingLocation, setUpdatingLocation] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchLocation, setSearchLocation] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);

    const handleSearchOptionSelect = () => {
        setModalVisible(true);
    };

    const handleSearchInputChange = (text) => {
        setSearchLocation(text);
    };

    const handleSearchSubmit = async () => {
        await setPostalCode(searchLocation); // Update postalCode state with entered value
        setIsSearching(false);
        setSearchLocation('');
        setModalVisible(false);
        updateWeather(searchLocation); // Pass the updated searchLocation
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };
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
        let zipCode = address[0].postalCode;
        setPostalCode(zipCode);
    };
    const fetchData = async () => {
        await fetchPostalCode();

        const data = await getWeatherData(postalCode);

        if (data) {
            const extractedInfo = extractWeatherInfo(data);
            setWeatherData(extractedInfo);

        }
    };

    useEffect(() => {
        const initializeApp = async () => {
            try {
                await fetchPostalCode();
                const data = await getWeatherData(postalCode);
                if (data) {
                    const extractedInfo = extractWeatherInfo(data);
                    setWeatherData(extractedInfo);
                }
                const degree = await data.current.temp_f
                console.log('degree= ' + degree)

                let imagePath;
                if (degree >= -100 && degree <= 50) {
                    imagePath = require('../assets/clothes/men/norain/0-50/1.png');
                } if (degree >= 51 && degree <= 60) {
                    imagePath = require('../assets/clothes/men/norain/50-60/1.png');
                }
                if (degree >= 61 && degree <= 80) {
                    imagePath = require('../assets/clothes/men/norain/60-80/1.png');
                } else if (degree > 80) {
                    imagePath = require('../assets/clothes/men/norain/80-90/1.png');
                }
                // Fetch weather data and update the state using setWeatherData
                // After setting the data, immediately call the callback function
            } catch (error) {
                console.error('Error initializing app:', error);
            }
        };

        initializeApp();
    }, [postalCode]); // Added postalCode as a dependency

    const updateWeather = async (location) => {
        setUpdatingLocation(true);
        const data = await getWeatherData(location); // Fetch weather data based on the passed location
        if (data) {
            const extractedInfo = extractWeatherInfo(data);
            setWeatherData(extractedInfo);
        }
        setUpdatingLocation(false);
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
            width: '100%',
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
            position: 'absolute',
            right: 0,
            top: 0
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        modalContent: {
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            width: '80%',
        },
        searchInput: {
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
        },
        searchButton: {
            backgroundColor: '#1665E1',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignItems: 'center',
            marginBottom: 10,
        },
        closeButton: {
            backgroundColor: 'red',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            alignItems: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <Menu style={styles.buttonContainer}>
                <MenuTrigger>
                    <Icon name="search" size={25} color="black" />
                </MenuTrigger>
                <MenuOptions>
                    <MenuOption onSelect={fetchData} text="My Location" />
                    <MenuOption onSelect={handleSearchOptionSelect}>
                        <Text>Search</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
            {weatherData ? (
                <>
                    <Text style={styles.cityName}>{weatherData.location}</Text>
                    <Text style={styles.condition}>{weatherData.condition}</Text>
                    <Text style={styles.temperature}>{weatherData.temperature}°F</Text>
                    <Text style={styles.recommendation}>{weatherData.recommendation}</Text>
                </>
            ) : (
                <Text>Loading weather data...</Text>
            )}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Enter location"
                            value={searchLocation}
                            onChangeText={handleSearchInputChange}
                        />
                        <TouchableOpacity onPress={handleSearchSubmit} style={styles.searchButton}>
                            <Text>Search</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Image
                source={require('../assets/clothes/men/norain/60-80/1.png')}
                style={styles.image}
                resizeMode="contain"
            />
        </View>

    );
};
export default WeatherInfo;
