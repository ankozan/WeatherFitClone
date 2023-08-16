import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
    const [errorMsg, setErrorMsg] = useState(null);
    const [postalCode, setPostalCode] = useState(null);
    useEffect(() => {
        fetchPostalCode();
    }, []);
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


    return (
        <View style={styles.container}>
            <Text style={styles.paragraph}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    paragraph: {
        fontSize: 18,
        textAlign: 'center',
    },
});
