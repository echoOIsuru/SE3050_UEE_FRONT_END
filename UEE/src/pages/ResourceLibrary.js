import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import resourceLibraryDashboard from '../assest/resourceLibraryDashboard.png';
import ListView from '../components/ListView';

export default function ResourceLibrary({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                style={styles.logo}
                source={resourceLibraryDashboard}
            />

            <ListView onPressFavoriteView={() => navigation.navigate('Favorites')} />

        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 380,
        height: 300,
    },
});