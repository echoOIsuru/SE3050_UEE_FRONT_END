import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native';
import favoriteDashboard from '../assest/favoriteDashboard.png';
import FavoriteListView from '../components/FavoriteListView';

export default function Favorites({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                style={styles.logo}
                source={favoriteDashboard}
            />

            <FavoriteListView onPressFavoriteView={() => navigation.navigate('Favorites')} navigation={navigation} />

        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        width: 250,
        height: 200,
    },
});